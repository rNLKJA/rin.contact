/**
 * The sandbox's state and rules for /projects/order-system-sandbox, in plain
 * JavaScript. Nothing is stored or sent: state lives in memory and resets on
 * reload.
 *
 * The rules copy the shape of the private app's shared Zod schemas and order
 * service, written fresh here with no shared code:
 * - An order needs at least one lunch or dinner, and a member or a walk-in name
 *   (the two refinements on the order schema, checked in that order).
 * - A member's meals come off their card, and a card cannot go below zero. The
 *   balance is checked before anything is saved, and a card that reaches zero
 *   is used up.
 * - Lunch and dinner become two separate orders. Each moves pending, prepared,
 *   delivered, a prepared order can go back to pending, and delivered and
 *   cancelled are final.
 * - Cancelling returns the meals to the card, or voids the walk-in payment, in
 *   the same step as the status change.
 * - Spending must be above zero with at most two decimal places, and needs a
 *   description of 1 to 512 characters.
 * - Each sign-up line carries a key, so entering the same line twice never
 *   doubles an order (the app uses an idempotency key for the same reason).
 */
import { fill } from "@/lib/fill";
import {
  DEMO as D,
  MEMBERS,
  PACKS,
  SEED_EXPENSE,
  SIGNUP,
  WALK_IN_CENTS,
} from "@/lib/demos/order-system-sandbox-data";

export const MEAL_TYPES = ["lunch", "dinner"];
export const STATUSES = ["pending", "prepared", "delivered"];
const NEXT = { pending: "prepared", prepared: "delivered" };
const LOG_LIMIT = 12;
export const DESC_MAX = 512;

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** 8640 -> "$86.40", -1250 -> "-$12.50". Written by hand so server and client agree. */
export function money(cents) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = String(Math.floor(abs / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}$${whole}.${String(abs % 100).padStart(2, "0")}`;
}

const count = (n, one, many, lang) => (n === 1 ? one[lang] : fill(many[lang], { n }));
export const mealsText = (n, lang) => count(n, D.mealOne, D.mealMany, lang);
export const ordersText = (n, lang) => count(n, D.orderOne, D.orderMany, lang);
export const linesText = (n, lang) => count(n, D.lineOne, D.lineMany, lang);

const MEMBER_BY_ID = Object.fromEntries(MEMBERS.map((m) => [m.id, m]));

/** A member's name in the visitor's language, or the walk-in name as typed. */
export const nameOf = ({ memberId, guest }, lang) =>
  memberId ? MEMBER_BY_ID[memberId].name[lang] : guest;

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

/**
 * Spending amount, as the app's amount schema has it: a number above zero with
 * at most two decimal places. Returns cents, or null when the input breaks the
 * rule. A leading "$" is allowed.
 */
export function parseAmount(raw) {
  const s = String(raw ?? "")
    .trim()
    .replace(/^\$/, "");
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(s)) return null;
  const [whole, frac = ""] = s.split(".");
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return cents > 0 ? cents : null;
}

const NUMBERING = /^\s*\d{1,3}\s*[.)、．]\s*/;
const WALK_IN = /[（(]\s*(?:walk[\s-]?in|散客)\s*[)）]/i;
const WORD_TOKENS = /^(?:(?:lunch|dinner|午餐|晚餐|午|晚|l|d)[x×*]?\d{1,3})+$/i;
const CJK_TAIL = /^(.*?)((?:(?:午餐|晚餐|午|晚)\d{1,3})+)$/;
const ONE_TOKEN = /(lunch|dinner|午餐|晚餐|午|晚|l|d)[x×*]?(\d{1,3})/gi;
const IS_LUNCH = /^(?:lunch|午餐|午|l)$/i;

/**
 * Read one sign-up line such as "3. Coco L1 D1", "可可 午1 晚1" or
 * "Sam (walk-in) L1". Meal counts are read from the end of the line and the
 * rest is the name. Returns null for a blank line or an empty numbered slot.
 */
export function parseLine(raw) {
  let body = String(raw).replace(NUMBERING, "").trim();
  if (!body) return null;
  const walkIn = WALK_IN.test(body);
  body = body.replace(WALK_IN, " ").replace(/\s+/g, " ").trim();
  const words = body ? body.split(" ") : [];
  let tokens = [];
  while (words.length && WORD_TOKENS.test(words[words.length - 1])) {
    tokens.unshift(words.pop());
  }
  if (!tokens.length && words.length) {
    // Chinese counts often follow the name with no space: "可可午1晚1".
    const tail = words[words.length - 1].match(CJK_TAIL);
    if (tail && tail[1]) {
      words[words.length - 1] = tail[1];
      tokens = [tail[2]];
    }
  }
  let lunch = 0;
  let dinner = 0;
  for (const word of tokens) {
    for (const [, kind, n] of word.matchAll(ONE_TOKEN)) {
      if (IS_LUNCH.test(kind)) lunch += Number(n);
      else dinner += Number(n);
    }
  }
  const name = words.join(" ");
  const key = `${walkIn ? "walk-in:" : ""}${name.toLowerCase()}|${lunch}|${dinner}`;
  return { name, walkIn, lunch, dinner, key };
}

const NAME_INDEX = new Map(
  MEMBERS.flatMap((m) => [
    [m.name.en.toLowerCase(), m.id],
    [m.name.zh.toLowerCase(), m.id],
  ])
);

/**
 * Check every line of the sign-up against the current cards, in order, before
 * anything is saved. Deductions add up down the list, so a member who appears
 * twice is checked against what the first line leaves.
 * Each row: { n, raw, key, status: ready | entered | held | skipped, ... }.
 */
export function checkSignup(text, members, enteredKeys) {
  const entered = new Set(enteredKeys);
  const left = Object.fromEntries(members.map((m) => [m.id, m.remaining]));
  const seen = new Set();
  const rows = [];
  String(text)
    .split("\n")
    .forEach((raw, i) => {
      const line = parseLine(raw);
      if (!line) return;
      const row = { n: i + 1, raw: raw.trim(), ...line, total: line.lunch + line.dinner };
      if (seen.has(line.key)) {
        rows.push({ ...row, status: "skipped", error: { code: "duplicate" } });
        return;
      }
      seen.add(line.key);
      if (entered.has(line.key)) {
        rows.push({ ...row, status: "entered" });
        return;
      }
      if (row.total <= 0) {
        rows.push({ ...row, status: "held", error: { code: "noMeals" } });
        return;
      }
      if (!line.name) {
        rows.push({ ...row, status: "held", error: { code: "noName" } });
        return;
      }
      if (line.walkIn) {
        rows.push({ ...row, status: "ready", guest: line.name, cents: row.total * WALK_IN_CENTS });
        return;
      }
      const memberId = NAME_INDEX.get(line.name.toLowerCase());
      if (!memberId) {
        rows.push({ ...row, status: "held", error: { code: "unknown" } });
        return;
      }
      const before = left[memberId];
      if (row.total > before) {
        rows.push({
          ...row,
          memberId,
          status: "held",
          error: { code: "noBalance", left: before, need: row.total },
        });
        return;
      }
      left[memberId] = before - row.total;
      rows.push({ ...row, memberId, status: "ready", before, after: left[memberId] });
    });
  return rows;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export function initState(lang) {
  return {
    seq: 1,
    text: SIGNUP[lang],
    members: MEMBERS.map(({ id, remaining }) => ({ id, remaining })),
    orders: [],
    ledger: [
      {
        id: "l0",
        kind: "expense",
        cents: SEED_EXPENSE.cents,
        desc: SEED_EXPENSE.desc,
        voided: false,
      },
    ],
    entered: [],
    log: [],
    notice: null,
  };
}

/** Append events to the log (newest first) and show them in the panel that acted. */
function commit(state, patch, events, panel) {
  let seq = patch.seq ?? state.seq;
  const stamped = events.map((e) => ({ ...e, id: `a${seq++}` }));
  return {
    ...state,
    ...patch,
    seq,
    log: [...stamped.slice().reverse(), ...state.log].slice(0, LOG_LIMIT),
    notice: { panel, events: stamped },
  };
}

/** A message that changes nothing, such as a rule that blocked an action. */
const note = (state, panel, type) => ({ ...state, notice: { panel, events: [{ type }] } });

function moveOrder(state, id, to) {
  const order = state.orders.find((o) => o.id === id);
  const orders = state.orders.map((o) => (o.id === id ? { ...o, status: to } : o));
  const type = to === "pending" ? "backToPending" : to;
  return commit(
    state,
    { orders },
    [{ type, memberId: order.memberId, guest: order.guest, meal: order.meal }],
    "kitchen"
  );
}

export function reducer(state, action) {
  switch (action.type) {
    case "text":
      return { ...state, text: action.text };

    case "topUp": {
      const pack = PACKS.find((p) => p.id === action.packId);
      const member = state.members.find((m) => m.id === action.memberId);
      if (!pack || !member) return state;
      const left = member.remaining + pack.meals;
      return commit(
        state,
        {
          seq: state.seq + 1,
          members: state.members.map((m) => (m.id === member.id ? { ...m, remaining: left } : m)),
          ledger: [
            ...state.ledger,
            {
              id: `l${state.seq}`,
              kind: "card",
              cents: pack.cents,
              memberId: member.id,
              meals: pack.meals,
              voided: false,
            },
          ],
        },
        [{ type: "topUp", memberId: member.id, n: pack.meals, cents: pack.cents, left }],
        "topUp"
      );
    }

    case "enter": {
      const ready = checkSignup(state.text, state.members, state.entered).filter(
        (r) => r.status === "ready"
      );
      if (!ready.length) return note(state, "signup", "nothing");
      let seq = state.seq;
      const remaining = Object.fromEntries(state.members.map((m) => [m.id, m.remaining]));
      const orders = [];
      const ledger = [];
      const usedUp = [];
      for (const row of ready) {
        for (const meal of MEAL_TYPES) {
          const qty = row[meal];
          if (!qty) continue;
          const order = {
            id: `o${seq++}`,
            memberId: row.memberId || null,
            guest: row.guest || null,
            meal,
            qty,
            status: "pending",
          };
          if (row.guest) {
            order.ledgerId = `l${seq++}`;
            ledger.push({
              id: order.ledgerId,
              kind: "walkIn",
              cents: qty * WALK_IN_CENTS,
              guest: row.guest,
              meals: qty,
              voided: false,
            });
          }
          orders.push(order);
        }
        if (row.memberId) {
          remaining[row.memberId] -= row.total;
          if (remaining[row.memberId] === 0) usedUp.push(row.memberId);
        }
      }
      return commit(
        state,
        {
          seq,
          members: state.members.map((m) => ({ ...m, remaining: remaining[m.id] })),
          orders: [...state.orders, ...orders],
          ledger: [...state.ledger, ...ledger],
          entered: [...state.entered, ...ready.map((r) => r.key)],
        },
        [
          { type: "entered", lines: ready.length, orders: orders.length },
          ...usedUp.map((memberId) => ({ type: "usedUp", memberId })),
        ],
        "signup"
      );
    }

    case "advance": {
      const order = state.orders.find((o) => o.id === action.id);
      if (!order) return state;
      if (order.status === "delivered") return note(state, "kitchen", "lockedDelivered");
      if (order.status === "cancelled") return note(state, "kitchen", "lockedCancelled");
      return moveOrder(state, order.id, NEXT[order.status]);
    }

    case "back": {
      const order = state.orders.find((o) => o.id === action.id);
      if (!order) return state;
      if (order.status === "delivered") return note(state, "kitchen", "lockedDelivered");
      if (order.status === "cancelled") return note(state, "kitchen", "lockedCancelled");
      if (order.status !== "prepared") return note(state, "kitchen", "noBack");
      return moveOrder(state, order.id, "pending");
    }

    case "cancel": {
      const order = state.orders.find((o) => o.id === action.id);
      if (!order) return state;
      if (order.status === "delivered") return note(state, "kitchen", "lockedDelivered");
      if (order.status === "cancelled") return note(state, "kitchen", "lockedCancelled");
      // Status, card and ledger change together, like the app's single transaction.
      const orders = state.orders.map((o) =>
        o.id === order.id ? { ...o, status: "cancelled" } : o
      );
      const who = { memberId: order.memberId, guest: order.guest, meal: order.meal };
      if (order.memberId) {
        return commit(
          state,
          {
            orders,
            members: state.members.map((m) =>
              m.id === order.memberId ? { ...m, remaining: m.remaining + order.qty } : m
            ),
          },
          [{ type: "cancelCard", ...who, qty: order.qty }],
          "kitchen"
        );
      }
      const entry = state.ledger.find((l) => l.id === order.ledgerId);
      return commit(
        state,
        {
          orders,
          ledger: state.ledger.map((l) => (l.id === order.ledgerId ? { ...l, voided: true } : l)),
        },
        [{ type: "cancelWalkIn", ...who, cents: entry ? entry.cents : 0 }],
        "kitchen"
      );
    }

    case "bulk": {
      const to = NEXT[action.from];
      const ids = state.orders.filter((o) => o.status === action.from).map((o) => o.id);
      if (!to || !ids.length) return note(state, "kitchen", "none");
      const move = new Set(ids);
      return commit(
        state,
        { orders: state.orders.map((o) => (move.has(o.id) ? { ...o, status: to } : o)) },
        [{ type: to === "prepared" ? "bulkPrepared" : "bulkDelivered", n: ids.length }],
        "kitchen"
      );
    }

    case "expense":
      return commit(
        state,
        {
          seq: state.seq + 1,
          ledger: [
            ...state.ledger,
            {
              id: `l${state.seq}`,
              kind: "expense",
              cents: action.cents,
              desc: action.desc,
              voided: false,
            },
          ],
        },
        [{ type: "expense", cents: action.cents, desc: action.desc }],
        "finance"
      );

    case "reset":
      return { ...initState(action.lang), notice: { panel: "top", events: [{ type: "reset" }] } };

    default:
      return state;
  }
}

/** The day's roll-up, recomputed from the ledger, orders and cards. */
export function rollUp(state) {
  const live = state.ledger.filter((l) => !l.voided);
  const sum = (kind) => live.filter((l) => l.kind === kind).reduce((a, l) => a + l.cents, 0);
  const cardSales = sum("card");
  const walkIns = sum("walkIn");
  const spending = sum("expense");
  return {
    cardSales,
    walkIns,
    spending,
    net: cardSales + walkIns - spending,
    delivered: state.orders.filter((o) => o.status === "delivered").reduce((a, o) => a + o.qty, 0),
    onCards: state.members.reduce((a, m) => a + m.remaining, 0),
  };
}

/** Meals (not orders) per meal type and status, for the kitchen tally. */
export function tally(orders) {
  const t = Object.fromEntries(
    MEAL_TYPES.map((meal) => [meal, Object.fromEntries(STATUSES.map((s) => [s, 0]))])
  );
  for (const o of orders) if (o.status in t[o.meal]) t[o.meal][o.status] += o.qty;
  return t;
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

const mealLower = (meal, lang) => (meal === "lunch" ? D.lunchLower : D.dinnerLower)[lang];

/** One log or notice event as a sentence in the visitor's language. */
export function describe(ev, lang) {
  const L = (o) => o[lang];
  const name = ev.memberId || ev.guest ? nameOf(ev, lang) : "";
  const meal = ev.meal ? mealLower(ev.meal, lang) : "";
  switch (ev.type) {
    case "topUp":
      return fill(L(D.log.topUp), {
        name,
        n: ev.n,
        amount: money(ev.cents),
        left: mealsText(ev.left, lang),
      });
    case "entered":
      return fill(L(D.log.entered), {
        lines: linesText(ev.lines, lang),
        orders: ordersText(ev.orders, lang),
      });
    case "usedUp":
      return fill(L(D.log.usedUp), { name });
    case "prepared":
    case "delivered":
    case "backToPending":
      return fill(L(D.log[ev.type]), { name, meal });
    case "cancelCard":
      return fill(L(D.log.cancelCard), { name, meal, meals: mealsText(ev.qty, lang) });
    case "cancelWalkIn":
      return fill(L(D.log.cancelWalkIn), { name, meal, amount: money(ev.cents) });
    case "bulkPrepared":
    case "bulkDelivered":
      return fill(L(D.log[ev.type]), { orders: ordersText(ev.n, lang) });
    case "expense":
      return fill(L(D.log.expense), { amount: money(ev.cents), desc: ev.desc });
    case "reset":
      return L(D.log.reset);
    case "nothing":
      return L(D.signup.nothing);
    case "lockedDelivered":
    case "lockedCancelled":
    case "noBack":
    case "none":
      return L(D.kitchen[ev.type]);
    default:
      return "";
  }
}

/** The notice for one panel, or an empty string. */
export const noticeFor = (state, panel, lang) =>
  state.notice?.panel === panel ? state.notice.events.map((e) => describe(e, lang)).join(" ") : "";
