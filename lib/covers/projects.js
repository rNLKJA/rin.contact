/**
 * Project covers (1C): a small halftone dot-matrix picture for every card in
 * lib/projects-data.js, drawn from that project's own subject.
 *
 * Each entry has a `form` (the kind of picture, exposed as data-form on the
 * page), an `alt` that says what is drawn, and `draw(F, box, rand)`, which
 * paints into a field (lib/dotmatrix/core.js) inside `box` (cell units). The
 * same draw function renders the landscape card cover and the portrait window
 * inside a case study's arch frame, so layouts are written in proportions.
 *
 * Honesty rules: where a picture uses numbers they come from the card or the
 * project's own repository (named in the comment). Where a shape only stands
 * for an idea, the alt says the sizes are illustrative. Red marks one thing
 * only: work that is current (`current: true` on the card). Nothing here
 * describes SAPOL, CBS or Moodist systems; those covers are generic forms.
 */
import {
  rect,
  disc,
  ring,
  line,
  polyline,
  polygon,
  paint,
  dotted,
  setCell,
  cover,
  sdBox,
  sdCircle,
  inPolygon,
  clearBox,
  punch,
} from "../dotmatrix/core.js";
import {
  MAINLAND,
  TASMANIA,
  CAPITALS,
  SA_BOUNDS,
  inSouthAustralia,
  projector,
} from "../dotmatrix/australia.js";

const W = (b) => b.x1 - b.x0;
const H = (b) => b.y1 - b.y0;
const U = (b, u) => b.x0 + u * W(b);
const V = (b, v) => b.y0 + v * H(b);
const wide = (b) => W(b) >= H(b) * 1.15;
const lerp = (a, c, t) => a + (c - a) * t;

/** Rounded-rectangle outline, w cells thick. */
function frame(F, x0, y0, x1, y1, r = 1, w = 0.9, v = 1, opts) {
  paint(
    F,
    (x, y) => {
      const d = sdBox(x, y, x0 + r, y0 + r, x1 - r, y1 - r) - r;
      return cover(Math.abs(d) - w / 2) * v;
    },
    opts
  );
}

/** A ring of separate dots, about `gap` cells apart, so it reads at any size. */
function dottedRing(F, cx, cy, r, v = 1, gap = 1.5) {
  const n = Math.max(6, Math.round((2 * Math.PI * r) / gap));
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    setCell(F, cx + Math.cos(a) * r, cy + Math.sin(a) * r, v);
  }
}

/** A solid 2 × 2 block of cells with its centre on the cell corner nearest (x, y). */
function block(F, x, y, v = 1) {
  const X = Math.round(x);
  const Y = Math.round(y);
  rect(F, X - 1, Y - 1, X + 1, Y + 1, v);
}

/** Land tests in (lon, lat): the mainland and Tasmania, and South Australia alone. */
const inAustralia = (lon, lat) => inPolygon(lon, lat, MAINLAND) || inPolygon(lon, lat, TASMANIA);
const inSA = (lon, lat) => inSouthAustralia(lon, lat) && inPolygon(lon, lat, MAINLAND);

/**
 * The one way every cover draws a map: each cell whose centre is on land
 * (`test`) is lit `fill`, or `shade(lon, lat, x, y)` when given, and with
 * `edge` the cells on the coast or border are lit that brighter value instead.
 */
function drawLand(F, proj, test, { fill = 0.32, edge = 0, shade } = {}) {
  const on = (x, y) => test(...proj.from(x, y));
  for (let y = 0; y < F.rows; y++) {
    for (let x = 0; x < F.cols; x++) {
      const cx = x + 0.5;
      const cy = y + 0.5;
      if (!on(cx, cy)) continue;
      const rim =
        edge && (!on(cx - 1, cy) || !on(cx + 1, cy) || !on(cx, cy - 1) || !on(cx, cy + 1));
      setCell(F, cx, cy, rim ? edge : shade ? shade(...proj.from(cx, cy), x, y) : fill);
    }
  }
}

export const PROJECT_COVERS = {
  // Levy shares by unit entitlement: the calculator's default example in
  // nsw-apartment-law (web/src/app/page.tsx) is lots 1 to 3 with entitlements
  // 1, 1 and 2. Floors are drawn in that proportion, with a disc per lot,
  // centred on its own floor, whose area is its levy share (a quarter, a
  // quarter and a half). No disc is taller than half its floor.
  "nsw-strata-law": {
    form: "levy-shares",
    alt: "A strata building whose three floors follow unit entitlements of 1, 1 and 2, with a disc per lot sized by its levy share: a quarter, a quarter and a half.",
    draw(F, b) {
      const shares = [1, 1, 2];
      const total = 4;
      const bx0 = Math.floor(b.x0);
      const bx1 = Math.floor(U(b, 0.56));
      const roofH = 2;
      const unit = Math.floor((Math.floor(b.y1) - Math.floor(b.y0) - roofH) / total);
      let y = Math.floor(b.y1) - unit * total;
      const roofTop = y - roofH;
      polygon(
        F,
        [
          [bx0 - 0.5, roofTop + roofH],
          [(bx0 + bx1) / 2, roofTop - 0.5],
          [bx1 + 0.5, roofTop + roofH],
        ],
        0.9
      );
      const floors = [];
      shares.forEach((s) => {
        const h = unit * s;
        rect(F, bx0, y, bx1, y + h - 1, (x, yy) =>
          (Math.floor(x) + Math.floor(yy)) % 2 === 0 ? 1 : 0.34
        );
        floors.push({ cy: y + h / 2 - 0.5, h, share: s / total });
        y += h;
      });
      // Disc area follows the share, so radius follows its square root; the
      // largest radius is set so every disc fits inside half its floor.
      const k = Math.min(...floors.map((f) => (f.h / 2 - 0.3) / Math.sqrt(f.share)));
      const cx = Math.floor(U(b, 0.84)) + 0.5;
      floors.forEach(({ cy, share }) => {
        const r = k * Math.sqrt(share);
        dotted(F, bx1 + 1.5, cy, cx - r - 1, cy, 2, 0.45);
        disc(F, cx, cy, r, 1);
      });
    },
  },

  // brewscope shows which packages overlap or shadow each other.
  brewscope: {
    form: "overlap",
    alt: "Two overlapping sets of Homebrew packages. The overlap, where one package shadows another, is drawn densest. The sizes are illustrative.",
    draw(F, b) {
      const r = Math.min(W(b) * 0.3, H(b) * 0.46);
      const cy = V(b, 0.5);
      const ax = U(b, 0.5) - r * 0.55;
      const bx = U(b, 0.5) + r * 0.55;
      paint(F, (x, y) => {
        const a = sdCircle(x, y, ax, cy, r);
        const c = sdCircle(x, y, bx, cy, r);
        const inA = cover(a);
        const inB = cover(c);
        if (inA > 0 && inB > 0) return Math.min(inA, inB);
        const edge = Math.max(cover(Math.abs(a) - 0.4), cover(Math.abs(c) - 0.4));
        return Math.max(edge, Math.max(inA, inB) * 0.34 * ((Math.floor(x) + Math.floor(y)) % 2));
      });
    },
  },

  // The calendar's timezone menu (web/app/page.tsx) lists nine cities plus
  // UTC. Each band is the same 9:00 to 17:00 local day on a UTC hour axis,
  // shifted by the city's standard-time offset.
  "timezone-calendar": {
    form: "tz-bands",
    alt: "Nine timezone bands, Los Angeles to Melbourne, each the same 9 to 5 local working day shifted along a 24-hour UTC axis by the city's standard-time offset.",
    draw(F, b) {
      const zones = [-8, -5, 0, 1, 8, 9, 9.5, 10, 10];
      const step = H(b) / zones.length;
      const hourW = W(b) / 24;
      zones.forEach((off, i) => {
        const y = Math.floor(b.y0 + i * step + (step - 1) / 2);
        rect(F, b.x0, y, b.x1, y + 1, 0.32);
        const start = (((9 - off) % 24) + 24) % 24;
        const x0 = b.x0 + start * hourW;
        const x1 = x0 + 8 * hourW;
        rect(F, x0, y, Math.min(x1, b.x1), y + 1, 1);
        if (x1 > b.x1) rect(F, b.x0, y, b.x0 + (x1 - b.x1), y + 1, 1);
      });
    },
  },

  // All seven weeks complete, week 7 being the course project.
  "data-engineer-bootcamp": {
    form: "pipeline-weeks",
    alt: "Seven week blocks joined like a pipeline, all seven filled.",
    draw(F, b) {
      const n = 7;
      const horiz = wide(b);
      const len = horiz ? W(b) : H(b);
      const gap = 1.5;
      const size = (len - gap * (n - 1)) / n;
      const thick = Math.min(horiz ? H(b) * 0.5 : W(b) * 0.6, size * 1.6);
      for (let i = 0; i < n; i++) {
        const a = (horiz ? b.x0 : b.y0) + i * (size + gap);
        const c = horiz ? V(b, 0.5) : U(b, 0.5);
        const box = horiz
          ? [a, c - thick / 2, a + size, c + thick / 2]
          : [c - thick / 2, a, c + thick / 2, a + size];
        rect(F, ...box, (x, y) => ((Math.floor(x) + Math.floor(y)) % 2 === 0 ? 1 : 0.55));
        if (i < n - 1) {
          if (horiz) rect(F, a + size, c - 0.5, a + size + gap, c + 0.5, 0.6);
          else rect(F, c - 0.5, a + size, c + 0.5, a + size + gap, 0.6);
        }
      }
    },
  },

  // The vault's structure: one agent contract, areas as the backbone,
  // projects tagged with an area, HQ, and small memory files.
  "life-system-template": {
    form: "vault-tree",
    alt: "A vault drawn as a tree: one agent contract at the root, then areas, projects, HQ and memory, with notes under each.",
    draw(F, b) {
      const rootX = Math.floor(U(b, 0.5));
      const y0 = Math.floor(b.y0);
      rect(F, rootX - 3, y0, rootX + 4, y0 + 2, 1);
      rect(F, rootX, y0 + 2, rootX + 1, y0 + 4, 0.7);
      const xs = [0.1, 0.37, 0.63, 0.9].map((u) => Math.floor(U(b, u)));
      rect(F, xs[0], y0 + 4, xs[3] + 1, y0 + 5, 0.7);
      const leaves = [4, 3, 2, 2];
      xs.forEach((x, i) => {
        rect(F, x, y0 + 5, x + 1, y0 + 7, 0.7);
        rect(F, x - 2, y0 + 7, x + 3, y0 + 9, i === 0 ? 1 : 0.85);
        for (let k = 0; k < leaves[i]; k++) {
          const ly = y0 + 11 + k * 2;
          if (ly >= b.y1) break;
          setCell(F, x + 0.5, ly - 0.5, 0.4);
          rect(F, x + 1, ly, x + 1 + 3 + ((i + k) % 3), ly + 1, 0.6);
        }
      });
    },
  },

  // Chat history in, one persona prompt out (the card): message bubbles from
  // a conversation funnel into a single prompt card.
  "wechat-style-distiller": {
    form: "chat-to-prompt",
    alt: "Chat bubbles from a conversation on the left funnelling into one persona prompt card on the right.",
    draw(F, b) {
      const bubbles = [
        [0, 0.7, 1],
        [0.22, 0.95, 0.6],
        [0, 0.55, 1],
        [0.3, 0.9, 0.6],
        [0, 0.75, 1],
      ];
      const colW = W(b) * 0.42;
      const step = H(b) / bubbles.length;
      const card = [U(b, 0.66), V(b, 0.12), b.x1, V(b, 0.88)];
      const mouth = [card[0] - 0.8, (card[1] + card[3]) / 2];
      bubbles.forEach(([u0, u1, v], i) => {
        const y = Math.floor(b.y0 + i * step + step / 2) + 0.5;
        const x0 = b.x0 + u0 * colW;
        const x1 = b.x0 + u1 * colW;
        rect(F, x0, y - 0.9, x1, y + 0.9, v);
        dotted(F, x1 + 1.2, y, mouth[0], mouth[1], 1.5, 0.45);
      });
      frame(F, card[0], card[1], card[2], card[3], 0.6, 0.9, 1);
      rect(F, card[0] + 1.2, card[1] + 1.5, card[2] - 1.2, card[1] + 2.5, 1);
      for (let k = 0; k < 4; k++) {
        const y = card[1] + 4.5 + k * 2;
        if (y < card[3] - 1.2)
          rect(F, card[0] + 1.2, y - 0.4, card[2] - 1.2 - (k % 2) * 3, y + 0.4, 0.6);
      }
    },
  },

  // SA and Australian government datasets: the map, with South Australia
  // drawn densest.
  "sa-au-open-data": {
    form: "atlas",
    alt: "A dot map of Australia with South Australia drawn densest.",
    draw(F, b) {
      const p = projector(b);
      drawLand(F, p, inAustralia, { shade: (lon, lat) => (inSouthAustralia(lon, lat) ? 1 : 0.32) });
    },
  },

  // Mail sorted into provider labels; 10+ categories on the card.
  "gmail-labeler": {
    form: "triage",
    alt: "Unsorted mail on the left funnelled into ten labelled lanes on the right. The lane lengths are illustrative.",
    draw(F, b, rand) {
      const lanes = 10;
      const mid = U(b, 0.36);
      const cy = V(b, 0.5);
      for (let i = 0; i < 70; i++) {
        const x = U(b, rand() * 0.26);
        const y = V(b, 0.1 + rand() * 0.8);
        setCell(F, x, y, 0.45 + rand() * 0.55);
      }
      const lh = H(b) / lanes;
      for (let i = 0; i < lanes; i++) {
        const y = b.y0 + (i + 0.5) * lh;
        line(F, mid, cy, U(b, 0.52), y, 0.5, 0.45);
        const len = 0.18 + rand() * 0.3;
        rect(F, U(b, 0.55), y - lh * 0.28, U(b, 0.55 + len), y + lh * 0.28, 1);
      }
      disc(F, mid, cy, Math.min(W(b), H(b)) * 0.06, 1);
    },
  },

  // Signal: a hash-chained audit log; the newest record is the live end.
  signal: {
    form: "audit-chain",
    alt: "A tamper-evident audit log as a chain of hashed records. The newest record, the live end of the chain, is red.",
    draw(F, b, rand) {
      const horiz = wide(b);
      const n = 4;
      const size = 6;
      const len = horiz ? W(b) : H(b);
      const gap = (len - n * size) / (n - 1);
      for (let i = 0; i < n; i++) {
        const a = Math.round((horiz ? b.x0 : b.y0) + i * (size + gap));
        const c = Math.round((horiz ? V(b, 0.5) : U(b, 0.5)) - size / 2);
        const [x0, y0] = horiz ? [a, c] : [c, a];
        const live = i === n - 1;
        frame(F, x0 + 0.5, y0 + 0.5, x0 + size - 0.5, y0 + size - 0.5, 0, 1, 1, { red: live });
        for (let gy = 1; gy < size - 1; gy++) {
          for (let gx = 1; gx < size - 1; gx++)
            if (rand() < 0.5) setCell(F, x0 + gx + 0.5, y0 + gy + 0.5, 1, live);
        }
        if (i < n - 1) {
          const mid = c + size / 2;
          if (horiz) dotted(F, a + size + 1, mid - 0.5, a + size + gap - 1, mid - 0.5, 1, 0.9);
          else dotted(F, mid - 0.5, a + size + 1, mid - 0.5, a + size + gap - 1, 1, 0.9);
        }
      }
    },
  },

  // Ten subject areas (the card's impact line).
  classbro: {
    form: "subject-hub",
    alt: "Ten subject areas around one tutor, each joined to the centre by a spoke.",
    draw(F, b) {
      const cx = U(b, 0.5);
      const cy = V(b, 0.5);
      const R = Math.min(W(b), H(b)) * 0.44;
      const rx = wide(b) ? Math.min(W(b) * 0.44, R * 1.9) : R;
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * R;
        dotted(F, cx, cy, x, y, 1.5, 0.55);
        disc(F, x, y, Math.min(W(b), H(b)) * 0.07, 1);
      }
      ring(F, cx, cy, Math.min(W(b), H(b)) * 0.13, 0.9, 1);
      disc(F, cx, cy, Math.min(W(b), H(b)) * 0.05, 1);
    },
  },

  // Four ranking systems (QS, THE and two U.S. News rankings).
  "ranking-radar": {
    form: "radar",
    alt: "A radar with four axes, one for each ranking system, three range rings and an illustrative profile.",
    draw(F, b) {
      const cx = Math.floor(U(b, 0.5)) + 0.5;
      const cy = Math.floor(V(b, 0.5)) + 0.5;
      const R = Math.floor(Math.min(W(b), H(b)) / 2);
      ring(F, cx, cy, R, 0.8, 0.8);
      ring(F, cx, cy, R * 0.66, 0.7, 0.3);
      ring(F, cx, cy, R * 0.33, 0.7, 0.3);
      dotted(F, cx - R, cy, cx + R, cy, 1, 0.45);
      dotted(F, cx, cy - R, cx, cy + R, 1, 0.45);
      const prof = [0.92, 0.6, 0.8, 0.45];
      const pts = [
        [cx, cy - R * prof[0]],
        [cx + R * prof[1], cy],
        [cx, cy + R * prof[2]],
        [cx - R * prof[3], cy],
      ];
      polygon(F, pts, 0.5);
      polyline(F, [...pts, pts[0]], 0.9, 1);
      pts.forEach(([x, y]) => disc(F, x, y, 1.1, 1));
    },
  },

  // Outlook Daily Email Summary (rNLKJA/Outlook-Mail-Counting): the Daily Log
  // sheet has 17 columns (log_columns in outlook_daily_summary.py) and one row
  // per day. Each email is counted once by its EntryID, so the envelopes an
  // earlier run counted are dim and only the new one feeds today's row.
  "outlook-daily-summary": {
    form: "daily-log",
    alt: "A row of envelopes above a Daily Log sheet of 17 columns, one per field the script writes. The envelopes an earlier run counted are dim, and the new one is bright, like today's row at the bottom of the sheet. The number of envelopes and rows is illustrative.",
    draw(F, b) {
      const n = 4;
      const top = Math.floor(b.y0);
      const envH = Math.max(5, Math.round(H(b) * 0.34));
      const gap = 2;
      const envW = (W(b) - gap * (n - 1)) / n;
      for (let i = 0; i < n; i++) {
        const x0 = Math.round(b.x0 + i * (envW + gap));
        const x1 = Math.round(b.x0 + i * (envW + gap) + envW);
        const v = i === n - 1 ? 1 : 0.38;
        frame(F, x0 + 0.5, top + 0.5, x1 - 0.5, top + envH - 0.5, 0, 0.9, v);
        const mid = [(x0 + x1) / 2, top + envH * 0.6];
        line(F, x0 + 1, top + 1, ...mid, 0.7, v);
        line(F, x1 - 1, top + 1, ...mid, 0.7, v);
      }
      // The sheet: 17 columns, a bright header row, earlier days dim, today bright.
      const cols = 17;
      const step = 2;
      const left = Math.floor(U(b, 0.5) - (step * (cols - 1)) / 2);
      const rows = [];
      for (let y = top + envH + 2; y <= Math.floor(b.y1) - 1; y += 2) rows.push(y);
      rows.forEach((y, r) => {
        const v = r === 0 || r === rows.length - 1 ? 1 : 0.38;
        for (let c = 0; c < cols; c++) setCell(F, left + c * step + 0.5, y + 0.5, v);
      });
    },
  },

  // A prepaid meal card. Current work, so today's order is red.
  "order-system": {
    form: "punch-card",
    alt: "A prepaid meal card drawn as a punch card: used meals filled, today's order red because the system is in use now, the rest still open. The counts are illustrative.",
    draw(F, b) {
      const horiz = wide(b);
      frame(
        F,
        b.x0,
        b.y0 + (horiz ? H(b) * 0.08 : 0),
        b.x1,
        b.y1 - (horiz ? H(b) * 0.08 : 0),
        1.2,
        0.8,
        1
      );
      const cols = horiz ? 6 : 3;
      const rows = horiz ? 2 : 4;
      const ix0 = b.x0 + W(b) * 0.1;
      const iy0 = b.y0 + H(b) * (horiz ? 0.38 : 0.26);
      const iw = W(b) * 0.8;
      const ih = H(b) * (horiz ? 0.46 : 0.66);
      const cw = iw / cols;
      const rh = ih / rows;
      const r = Math.min(cw, rh) * 0.34;
      rect(
        F,
        b.x0 + W(b) * 0.1,
        b.y0 + H(b) * (horiz ? 0.17 : 0.08),
        b.x0 + W(b) * 0.46,
        b.y0 + H(b) * (horiz ? 0.17 : 0.08) + 0.9,
        0.85
      );
      let n = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ix0 + (i + 0.5) * cw;
          const y = iy0 + (j + 0.5) * rh;
          if (n < 7) disc(F, x, y, r, 1);
          else if (n === 7) disc(F, x, y, r * 1.08, 1, { red: true });
          else ring(F, x, y, r - 0.3, 0.7, 0.75);
          n++;
        }
      }
    },
  },

  // Research on ethical and professional standards, still ongoing, so the
  // pivot is red. A generic form, nothing about SAPOL's work.
  "ethical-standing": {
    form: "balance",
    alt: "A level balance, standing for ethical and professional standards. The pivot is red because the research is ongoing.",
    draw(F, b) {
      const cx = Math.floor(U(b, 0.5)) + 0.5;
      const top = Math.floor(V(b, 0.12)) + 0.5;
      const half = Math.floor(Math.min(W(b) * 0.4, H(b) * 0.95));
      rect(F, cx - half, top - 0.5, cx + half, top + 0.5, 1);
      rect(F, cx - 0.5, top, cx + 0.5, b.y1 - 1, 1);
      rect(F, cx - 4.5, b.y1 - 1, cx + 4.5, b.y1, 1);
      const panY = Math.floor(V(b, 0.62)) + 0.5;
      [-1, 1].forEach((side) => {
        const x = cx + side * (half - 1);
        line(F, x, top, x - 3, panY, 0.8, 0.55);
        line(F, x, top, x + 3, panY, 0.8, 0.55);
        rect(F, x - 4, panY + 0.5, x + 4, panY + 1.5, 1);
        rect(F, x - 2.5, panY + 1.5, x + 2.5, panY + 2.5, 1);
      });
      disc(F, cx, top, 1.6, 1, { red: true });
    },
  },

  // A Python client and console over more than 1,100 complaint-management
  // API endpoints (the card). Generic: many endpoints, one client. Current.
  "sapol-epsb": {
    form: "fan-in",
    alt: "Many API endpoints converging on one client, the shape of a single client over more than 1,100 endpoints. The client is red because the work is current.",
    draw(F, b) {
      const horiz = wide(b);
      const gx1 = horiz ? U(b, 0.42) : b.x1;
      const gy1 = horiz ? b.y1 : V(b, 0.5);
      paint(F, (x, y) =>
        x >= b.x0 && x <= gx1 && y >= b.y0 && y <= gy1
          ? 0.5 + 0.5 * ((Math.floor(x) * 7 + Math.floor(y) * 3) % 5 === 0)
          : 0
      );
      const node = horiz ? [U(b, 0.88), V(b, 0.5)] : [U(b, 0.5), V(b, 0.88)];
      const n = 7;
      for (let i = 0; i < n; i++) {
        const from = horiz
          ? [gx1 + 0.8, b.y0 + ((i + 0.5) * H(b)) / n]
          : [b.x0 + ((i + 0.5) * W(b)) / n, gy1 + 0.8];
        line(F, from[0], from[1], node[0], node[1], 0.45, 0.6);
      }
      disc(F, node[0], node[1], Math.min(W(b), H(b)) * 0.11, 1, { red: true });
    },
  },

  // A two-component Gaussian mixture (the explainer's worked example).
  "em-algorithm": {
    form: "mixture",
    alt: "Two overlapping Gaussian components and the mixture they make, drawn as columns of stacked dots under the two curves.",
    draw(F, b) {
      const g = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2);
      const comp = (u) => [0.6 * g(u, 0.34, 0.11), 0.4 * g(u, 0.68, 0.09)];
      const peak = Math.max(
        ...Array.from({ length: 101 }, (_, i) => comp(i / 100)[0] + comp(i / 100)[1])
      );
      for (let x = Math.floor(b.x0); x < b.x1; x++) {
        const u = (x + 0.5 - b.x0) / W(b);
        const [a, c] = comp(u);
        const h = ((a + c) / peak) * H(b) * 0.92;
        for (let y = b.y1 - 0.5; y > b.y1 - h; y -= 1) setCell(F, x + 0.5, y, 0.55);
      }
      [0, 1].forEach((k) => {
        const pts = [];
        for (let i = 0; i <= 80; i++) {
          const u = i / 80;
          pts.push([U(b, u), b.y1 - (comp(u)[k] / peak) * H(b) * 0.92]);
        }
        polyline(F, pts, 0.75, 1);
      });
    },
  },

  // SA gaming-machine releases, FY 2009/10 to FY 2024/25: sixteen financial
  // years transcribed into one workbook. The figures are placeholders: the
  // picture shows the workbook's shape, not its numbers.
  "sa-gaming-machines": {
    form: "ledger",
    alt: "A workbook of sixteen financial years, FY 2009/10 to FY 2024/25, one column per year under a header row. The figures are placeholders.",
    draw(F, b) {
      const years = 16;
      const rows = 6;
      const x0 = Math.floor(b.x0);
      const y0 = Math.floor(b.y0);
      const labelW = 3;
      const cw = Math.floor((W(b) - labelW - 1) / years);
      const rh = Math.floor((H(b) - 3) / rows);
      rect(F, x0, y0, b.x1, y0 + 1, 1);
      for (let r = 0; r < rows; r++) {
        const y = y0 + 3 + r * rh + 0.5;
        rect(F, x0, y - 0.5, x0 + labelW, y + 0.5, 1);
        for (let c = 0; c < years; c++) {
          const x = x0 + labelW + 1 + c * cw + 0.5;
          setCell(F, x, y, (r * 5 + c * 3) % 4 === 0 ? 1 : 0.6);
        }
      }
    },
  },

  // A map-first discovery app; current work, so "you are here" is red.
  mapiva: {
    form: "map-pins",
    alt: "A street grid with people and events nearby as dots and rings of distance around a red pin, which marks the app's current work.",
    draw(F, b, rand) {
      for (let x = Math.floor(b.x0) + 3; x < b.x1; x += 7) rect(F, x, b.y0, x + 1, b.y1, 0.32);
      for (let y = Math.floor(b.y0) + 2; y < b.y1; y += 6) rect(F, b.x0, y, b.x1, y + 1, 0.32);
      const me = [Math.floor(U(b, 0.5)) + 0.5, Math.floor(V(b, 0.58)) + 0.5];
      const R = Math.min(W(b), H(b)) * 0.3;
      [1, 1.75].forEach((k) => {
        for (let a = 0; a < Math.PI * 2; a += Math.PI / (10 * k)) {
          setCell(
            F,
            me[0] + Math.cos(a) * R * k * (wide(b) ? 1.25 : 1),
            me[1] + Math.sin(a) * R * k * 0.95,
            0.5
          );
        }
      });
      for (let i = 0; i < 11; i++) {
        const a = rand() * Math.PI * 2;
        const d = R * (0.6 + rand() * 1.4);
        disc(
          F,
          me[0] + Math.cos(a) * d * (wide(b) ? 1.35 : 1),
          me[1] + Math.sin(a) * d * 0.9,
          0.9,
          1
        );
      }
      disc(F, me[0], me[1] - 2.2, 2.2, 1, { red: true });
      polygon(
        F,
        [
          [me[0] - 1.6, me[1] - 1.2],
          [me[0] + 1.6, me[1] - 1.2],
          [me[0], me[1] + 1.6],
        ],
        1,
        { red: true }
      );
      punch(F, me[0], me[1] - 2.2, 0.7);
    },
  },

  // Mock South Australian addresses (synthetic test data), denser near
  // Adelaide and thinning across the state.
  "sa-address": {
    form: "sa-scatter",
    alt: "South Australia with mock addresses scattered across it, densest around Adelaide. The points are synthetic.",
    draw(F, b, rand) {
      const p = projector(b, SA_BOUNDS);
      drawLand(F, p, inSA, { fill: 0.32, edge: 0.62 });
      const [ax, ay] = p.to(...CAPITALS.Adelaide);
      for (let i = 0; i < 160; i++) {
        const d = Math.pow(rand(), 2.2);
        const a = rand() * Math.PI * 2;
        const x = ax + Math.cos(a) * d * W(b) * 0.9;
        const y = ay + Math.sin(a) * d * H(b) * 0.9;
        const [lon, lat] = p.from(x, y);
        if (inSA(lon, lat)) setCell(F, x, y, 1);
      }
      disc(F, ax, ay, 1.1, 1);
    },
  },

  // Debate transcripts, 1960 to 2024.
  "us-political": {
    form: "transcript",
    alt: "A debate transcript as alternating lines from two speakers, above a timeline from 1960 to 2024 with a tick every four years.",
    draw(F, b, rand) {
      const axisY = b.y1 - 0.5;
      const n = Math.max(5, Math.floor((H(b) - 3) / 2));
      for (let i = 0; i < n; i++) {
        const y = b.y0 + i * 2 + 0.5;
        const left = i % 2 === 0;
        const len = W(b) * (0.35 + rand() * 0.4);
        const x0 = left ? b.x0 : b.x1 - len;
        rect(F, x0, y - 0.35, x0 + len, y + 0.35, left ? 1 : 0.55);
      }
      rect(F, b.x0, axisY - 0.2, b.x1, axisY + 0.2, 0.5);
      const ticks = (2024 - 1960) / 4;
      for (let k = 0; k <= ticks; k++) setCell(F, b.x0 + (k / ticks) * (W(b) - 0.01), axisY - 1, 1);
    },
  },

  // Regulatory analytics on a map: a generic shaded tile map of South
  // Australia with a three-step legend. Nothing from CBS data.
  cbs: {
    form: "tile-map",
    alt: "A tile map of South Australia shaded in three steps with its legend, the shape of regulatory analytics on a map. The shading is illustrative.",
    draw(F, b) {
      const mapBox = wide(b)
        ? { x0: b.x0, y0: b.y0, x1: U(b, 0.74), y1: b.y1 }
        : { ...b, y1: V(b, 0.78) };
      const p = projector(mapBox, SA_BOUNDS);
      const steps = [0.34, 0.62, 1];
      // Tiles of 2 × 2 cells, each shaded as a whole, lit only where its cells
      // fall on South Australia so the outline matches the other SA maps.
      drawLand(F, p, inSA, {
        shade: (lon, lat, x, y) => {
          const [tlon, tlat] = p.from(x - (x % 2) + 1, y - (y % 2) + 1);
          return steps[
            Math.floor(((Math.sin(tlon * 0.9 + 1) + Math.cos(tlat * 1.3) + 2) / 4) * 2.99)
          ];
        },
      });
      const lx = wide(b) ? Math.floor(U(b, 0.82)) : Math.floor(b.x0);
      const ly = wide(b) ? Math.floor(V(b, 0.24)) : Math.floor(V(b, 0.86));
      steps.forEach((v, i) => {
        if (wide(b)) rect(F, lx, ly + i * 3, lx + 2, ly + i * 3 + 2, v);
        else rect(F, lx + i * 3, ly, lx + i * 3 + 2, ly + 2, v);
        if (wide(b)) rect(F, lx + 3, ly + i * 3 + 0.5, lx + 7, ly + i * 3 + 1.5, 0.34);
      });
    },
  },

  // Revision items that cite the passages they came from.
  "lecture-revision-lab": {
    form: "cited-passages",
    alt: "Revision material drawn from cited passages: three passages in a column of notes are linked to the item that cites them.",
    draw(F, b, rand) {
      const horiz = wide(b);
      const colX1 = horiz ? U(b, 0.48) : b.x1;
      const rows = horiz ? Math.floor(H(b) / 2) : Math.floor((H(b) * 0.55) / 2);
      const lit = new Set([1, Math.floor(rows / 2), rows - 2]);
      const hits = [];
      for (let i = 0; i < rows; i++) {
        const y = b.y0 + i * 2 + 0.5;
        const len = (colX1 - b.x0) * (0.55 + rand() * 0.4);
        rect(F, b.x0, y - 0.32, b.x0 + len, y + 0.32, lit.has(i) ? 1 : 0.3);
        if (lit.has(i)) hits.push([b.x0 + len, y]);
      }
      const card = horiz
        ? [U(b, 0.66), V(b, 0.22), b.x1, V(b, 0.78)]
        : [U(b, 0.12), V(b, 0.68), U(b, 0.88), b.y1];
      frame(F, card[0], card[1], card[2], card[3], 0.6, 0.8, 1);
      for (let k = 0; k < 3; k++) {
        const y = card[1] + 1.6 + k * 1.6;
        if (y < card[3] - 1)
          rect(F, card[0] + 1.2, y - 0.3, card[2] - 1.2 - k * 1.5, y + 0.3, 0.75);
      }
      hits.forEach(([x, y]) => {
        if (horiz) dotted(F, x + 0.8, y, card[0] - 0.6, (card[1] + card[3]) / 2, 1.3, 0.8);
        else dotted(F, x, y + 0.8, (card[0] + card[2]) / 2, card[1] - 0.6, 1.3, 0.8);
      });
    },
  },

  // Patient app and clinician dashboard, as outlines only.
  moodq: {
    form: "two-screens",
    alt: "A patient phone app beside a clinician dashboard, drawn as outlines with placeholder blocks only.",
    draw(F, b) {
      const horiz = wide(b);
      const ph = horiz
        ? [b.x0, b.y0, U(b, 0.26), b.y1]
        : [U(b, 0.25), b.y0, U(b, 0.75), V(b, 0.52)];
      frame(F, ph[0], ph[1], ph[2], ph[3], 1.4, 0.8, 1);
      const pw = ph[2] - ph[0];
      for (let k = 0; k < 4; k++) {
        const y = ph[1] + 3 + k * 2.2;
        if (y < ph[3] - 2)
          rect(F, ph[0] + 1.5, y, ph[0] + 1.5 + (pw - 3) * (k % 2 ? 0.6 : 0.9), y + 1, 0.55);
      }
      rect(F, (ph[0] + ph[2]) / 2 - 1.2, ph[3] - 1.8, (ph[0] + ph[2]) / 2 + 1.2, ph[3] - 1.2, 0.8);
      const db = horiz ? [U(b, 0.34), V(b, 0.12), b.x1, V(b, 0.9)] : [b.x0, V(b, 0.6), b.x1, b.y1];
      frame(F, db[0], db[1], db[2], db[3], 0.4, 0.8, 1);
      rect(F, db[0], db[1], db[2], db[1] + 1.4, 0.85);
      const dw = db[2] - db[0];
      const bars = 6;
      for (let k = 0; k < bars; k++) {
        const x = db[0] + 2 + (k * (dw - 4)) / bars;
        const h = (db[3] - db[1] - 4) * (0.3 + 0.12 * ((k * 3) % 5));
        rect(F, x, db[3] - 1.2 - h, x + (dw - 4) / bars - 1, db[3] - 1.2, 0.45);
      }
    },
  },

  // A 96-well plate (the demo's default), filled in sample blocks of
  // 3, 3, 3 and 2 columns like the demo's example layout.
  "wehi-flow": {
    form: "well-plate",
    alt: "A 96-well plate, eight rows by twelve columns, with wells shaded by sample block and the last column empty.",
    draw(F, b) {
      const horiz = wide(b);
      const rows = horiz ? 8 : 12;
      const cols = horiz ? 12 : 8;
      frame(F, b.x0, b.y0, b.x1, b.y1, 1.2, 0.8, 0.7);
      const cw = (W(b) - 3) / cols;
      const rh = (H(b) - 2) / rows;
      const blocks = [3, 3, 3, 2];
      const shade = [1, 0.62, 1, 0.62];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const c = horiz ? i : j;
          let acc = 0;
          let blk = -1;
          for (let k = 0; k < blocks.length; k++) {
            acc += blocks[k];
            if (c < acc) {
              blk = k;
              break;
            }
          }
          const x = b.x0 + 1.5 + (i + 0.5) * cw;
          const y = b.y0 + 1 + (j + 0.5) * rh;
          setCell(F, x, y, blk >= 0 ? shade[blk] : 0.32);
        }
      }
    },
  },

  // Echo remembered a person's profile and past conversations.
  "psyckitchen-echo": {
    form: "memory-thread",
    alt: "A conversation whose earlier messages are threaded back into the newest reply, the memory Echo was built to keep.",
    draw(F, b) {
      const horiz = wide(b);
      const bubbles = horiz
        ? [
            [0.0, 0.0, 0.42, 0.26, 0.55],
            [0.3, 0.37, 0.74, 0.63, 0.55],
            [0.06, 0.74, 0.62, 1.0, 1],
          ]
        : [
            [0.0, 0.0, 0.7, 0.18, 0.55],
            [0.3, 0.27, 1.0, 0.45, 0.55],
            [0.0, 0.56, 0.9, 0.8, 1],
          ];
      bubbles.forEach(([u0, v0, u1, v1, v]) => {
        frame(F, U(b, u0), V(b, v0), U(b, u1), V(b, v1), 1, 0.8, v);
        const y = (V(b, v0) + V(b, v1)) / 2;
        rect(F, U(b, u0) + 1.6, y - 0.3, U(b, u1) - 2, y + 0.3, v * 0.7);
      });
      const tx = horiz ? U(b, 0.88) : U(b, 0.95);
      const ends = bubbles.map(([, v0, u1, v1]) => [U(b, u1), (V(b, v0) + V(b, v1)) / 2]);
      dotted(F, tx, ends[0][1], tx, ends[2][1], 1.2, 0.9);
      ends.forEach(([x, y]) => dotted(F, x + 0.8, y, tx, y, 1.2, 0.9));
      disc(F, tx, ends[2][1], 0.9, 1);
    },
  },

  // TF-IDF retrieval over about 1.2 million passages (the card).
  factcheck: {
    form: "haystack",
    alt: "A claim pulling a handful of evidence passages out of a dense field that stands for about 1.2 million Wikipedia passages.",
    draw(F, b, rand) {
      const horiz = wide(b);
      const claim = horiz ? [U(b, 0.06), V(b, 0.5)] : [U(b, 0.5), V(b, 0.06)];
      const fx0 = horiz ? U(b, 0.3) : b.x0;
      const fy0 = horiz ? b.y0 : V(b, 0.3);
      paint(F, (x, y) => (x >= fx0 && y >= fy0 && x <= b.x1 && y <= b.y1 ? 0.32 : 0));
      for (let k = 0; k < 5; k++) {
        const x = fx0 + 2 + rand() * (b.x1 - fx0 - 4);
        const y = fy0 + 2 + rand() * (b.y1 - fy0 - 4);
        punch(F, x, y, 1.9);
        dotted(F, claim[0], claim[1], x, y, 1.6, 0.62);
        disc(F, x, y, 0.95, 1);
      }
      rect(F, claim[0] - 1.6, claim[1] - 1.6, claim[0] + 1.6, claim[1] + 1.6, 1);
    },
  },

  // Interactive micro-course modules (the HEX content library).
  hex: {
    form: "learning-path",
    alt: "A winding learning path with short course modules at each stop.",
    draw(F, b) {
      const pts = [];
      const inset = 2;
      const box = { x0: b.x0 + inset, y0: b.y0 + inset, x1: b.x1 - inset, y1: b.y1 - inset };
      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        const w = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
        pts.push(wide(b) ? [U(box, t), V(box, w)] : [U(box, w), V(box, t)]);
      }
      polyline(F, pts, 0.8, 0.45);
      [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
        const [x, y] = pts[Math.round(t * 80)];
        const cx = Math.floor(x) + 0.5;
        const cy = Math.floor(y) + 0.5;
        rect(F, cx - 1.5, cy - 1.5, cx + 1.5, cy + 1.5, 1);
      });
    },
  },

  // Five index advisors racing on a live database (the card).
  "selfdriving-db": {
    form: "advisor-race",
    alt: "Five index advisors racing in five lanes towards a finish line. The distances are illustrative.",
    draw(F, b) {
      const lanes = 5;
      const horiz = wide(b);
      const len = horiz ? W(b) : H(b);
      const span = horiz ? H(b) : W(b);
      const prog = [0.88, 0.64, 0.95, 0.5, 0.74];
      for (let i = 0; i < lanes; i++) {
        const c = (horiz ? b.y0 : b.x0) + ((i + 0.5) * span) / lanes;
        const t = (span / lanes) * 0.24;
        const e = (horiz ? b.x0 : b.y1) + (horiz ? 1 : -1) * len * prog[i];
        if (horiz) {
          rect(F, b.x0, c - 0.1, b.x1, c + 0.1, 0.32);
          rect(F, b.x0, c - t, e, c + t, (x) => 0.35 + 0.65 * ((x - b.x0) / len));
        } else {
          rect(F, c - 0.1, b.y0, c + 0.1, b.y1, 0.32);
          rect(F, c - t, e, c + t, b.y1, (x, y) => 0.35 + 0.65 * ((b.y1 - y) / len));
        }
      }
      if (horiz) dotted(F, b.x1 - 0.5, b.y0, b.x1 - 0.5, b.y1, 1.5, 1);
      else dotted(F, b.x0, b.y0 + 0.5, b.x1, b.y0 + 0.5, 1.5, 1);
    },
  },

  // Twitter and Mastodon posts fused with ABS spatial data.
  "social-cloud": {
    form: "stream-fusion",
    alt: "Two social data streams, Twitter and Mastodon, merging into one spatial grid.",
    draw(F, b, rand) {
      const horiz = wide(b);
      const gx0 = horiz ? U(b, 0.56) : b.x0;
      const gy0 = horiz ? b.y0 : V(b, 0.56);
      for (let y = gy0 + 0.5; y < b.y1; y += 2) {
        for (let x = gx0 + 0.5; x < b.x1; x += 2) {
          setCell(F, x, y, 0.3 + 0.7 * Math.abs(Math.sin(x * 0.7 + y * 0.45)));
        }
      }
      const target = horiz ? [gx0 - 0.5, V(b, 0.5)] : [U(b, 0.5), gy0 - 0.5];
      [0.18, 0.82].forEach((s, k) => {
        for (let i = 0; i < 26; i++) {
          const t = i / 26;
          const jitter = (rand() - 0.5) * 1.6 * (1 - t);
          const start = horiz ? [b.x0, V(b, s)] : [U(b, s), b.y0];
          const x = lerp(start[0], target[0], t) + (horiz ? 0 : jitter);
          const y = lerp(start[1], target[1], t) + (horiz ? jitter : 0);
          setCell(F, x, y, k ? 0.65 : 1);
        }
      });
    },
  },

  // Tweet distribution across Australian cities (the card).
  "twitter-hpc": {
    form: "city-ripples",
    alt: "A dot map of Australia with each capital city marked by a dot and a ripple around it.",
    draw(F, b) {
      const p = projector(b);
      drawLand(F, p, inAustralia, { fill: 0.32 });
      Object.values(CAPITALS).forEach(([lo, la]) => {
        const [x, y] = p.to(lo, la);
        dottedRing(F, x, y, 3.5, 1, 1.8);
      });
      Object.values(CAPITALS).forEach(([lo, la]) => {
        const [x, y] = p.to(lo, la);
        disc(F, x, y, 0.9, 1);
      });
    },
  },

  // Lagged climate indices against eight staple commodities; none of the
  // eight forecast better with the climate input (the card).
  climate: {
    form: "oscillation",
    alt: "An El Niño style oscillation above eight commodities that all sit on the line of no gain: none forecast better with the climate input.",
    draw(F, b) {
      const mid = V(b, 0.3);
      const amp = H(b) * 0.26;
      const pts = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const v = 0.62 * Math.sin(t * Math.PI * 4.2) + 0.3 * Math.sin(t * Math.PI * 9.1 + 1);
        pts.push([U(b, t), mid - v * amp]);
      }
      polyline(F, pts, 1, 1);
      rect(F, b.x0, Math.floor(mid), b.x1, Math.floor(mid) + 1, 0.32);
      const y0 = Math.floor(V(b, 0.85)) + 0.5;
      rect(F, b.x0, y0 - 0.5, b.x1, y0 + 0.5, 0.3);
      for (let k = 0; k < 8; k++) disc(F, Math.floor(U(b, (k + 0.5) / 8)) + 0.5, y0, 1.2, 1);
    },
  },

  // 40 notebooks logged, 33 ran end to end, plus 8 audits (the card): the
  // audits are separate pieces of work, so they get their own row.
  "ml-gallery": {
    form: "notebook-gallery",
    alt: "Forty notebooks as forty squares, the 33 that ran end to end in full ink and the 7 that did not faint, with the eight audits as a separate row of eight hollow squares underneath.",
    draw(F, b) {
      const cols = 10;
      const rows = 4;
      const gridH = H(b) * 0.7;
      const cw = W(b) / cols;
      const rh = gridH / rows;
      for (let k = 0; k < 40; k++) {
        const x = b.x0 + ((k % cols) + 0.5) * cw;
        const y = b.y0 + (Math.floor(k / cols) + 0.5) * rh;
        block(F, x, y, k < 33 ? 1 : 0.34);
      }
      const sep = Math.floor(b.y0 + gridH) + 0.5;
      dotted(F, b.x0, sep, b.x1, sep, 2, 0.34);
      const ay = Math.floor((sep + b.y1) / 2) + 0.5;
      const aw = W(b) / 8;
      for (let k = 0; k < 8; k++) {
        const x = Math.floor(b.x0 + (k + 0.5) * aw) + 0.5;
        for (let i = -1; i <= 1; i++)
          for (let j = -1; j <= 1; j++) if (i || j) setCell(F, x + i, ay + j, 1);
      }
    },
  },

  // Cachex: a Hex-like connection game on a rhombus board (the card). One
  // player's connected stones join the left edge to the right; two of the
  // opponent's stones stand in the way.
  cachex: {
    form: "hex-board",
    alt: "A Cachex board, a Hex-like connection game, with one player's connected stones forming a path from one edge to the other.",
    draw(F, b) {
      const n = 6;
      const dx = 4;
      const dy = 3;
      const ox = Math.floor(U(b, 0.5) - ((n - 1) * dx * 1.5) / 2) + 0.5;
      const oy = Math.floor(V(b, 0.5) - ((n - 1) * dy) / 2) + 0.5;
      const at = (q, r) => [ox + q * dx + r * (dx / 2), oy + r * dy];
      // The two edges the path joins, solid; the other two, dotted.
      line(F, ...at(-0.7, -0.4), ...at(-0.7, n - 0.6), 0.6, 1);
      line(F, ...at(n - 0.3, -0.4), ...at(n - 0.3, n - 0.6), 0.6, 1);
      line(F, ...at(-0.4, -0.7), ...at(n - 0.6, -0.7), 0.5, 0.34);
      line(F, ...at(-0.4, n - 0.3), ...at(n - 0.6, n - 0.3), 0.5, 0.34);
      const path = [
        [0, 3],
        [1, 3],
        [2, 2],
        [3, 2],
        [4, 1],
        [5, 1],
      ];
      const other = ["2,3", "3,1"];
      for (let r = 0; r < n; r++) {
        for (let q = 0; q < n; q++) {
          const [x, y] = at(q, r);
          if (path.some(([pq, pr]) => pq === q && pr === r)) continue;
          if (other.includes(`${q},${r}`)) ring(F, x, y, 1.2, 0.5, 0.62);
          else setCell(F, x, y, 0.34);
        }
      }
      line(F, ...at(-0.7, path[0][1]), ...at(...path[0]), 0.7, 1);
      line(F, ...at(...path[path.length - 1]), ...at(n - 0.3, path[path.length - 1][1]), 0.7, 1);
      for (let i = 1; i < path.length; i++)
        line(F, ...at(...path[i - 1]), ...at(...path[i]), 0.7, 1);
      path.forEach(([q, r]) => disc(F, ...at(q, r), 1.4, 1));
    },
  },

  // Invite-only: a member holds at most two unused codes at a time, and a
  // code frees its slot once someone joins with it (Project-Cradle README),
  // so branches vary. Open codes are hollow, never more than two per member.
  "project-cradle": {
    form: "invite-tree",
    alt: "An invite tree growing from the root, Cradle, with members as dots and open invite codes as hollow rings, at most two per member at a time.",
    draw(F, b) {
      const s = Math.min(W(b), H(b));
      const node = (u, v) => [U(b, u), V(b, v)];
      const root = node(0.5, 0.06);
      const l1 = [node(0.16, 0.4), node(0.5, 0.4), node(0.84, 0.4)];
      const l2 = [
        [0, node(0.06, 0.74)],
        [0, node(0.26, 0.74)],
        [1, node(0.4, 0.74)],
        [1, node(0.5, 0.74)],
        [1, node(0.6, 0.74)],
        [2, node(0.78, 0.74)],
      ];
      const open = [
        [l1[2], node(0.92, 0.74)],
        [l2[0][1], node(0.06, 1)],
        [l2[3][1], node(0.46, 1)],
        [l2[3][1], node(0.55, 1)],
        [l2[5][1], node(0.78, 1)],
      ];
      l1.forEach(([x, y]) => line(F, root[0], root[1], x, y, 0.6, 0.7));
      l2.forEach(([p, [x, y]]) => line(F, l1[p][0], l1[p][1], x, y, 0.6, 0.7));
      open.forEach(([[px, py], [x, y]]) => dotted(F, px, py, x, y, 1.5, 0.4));
      disc(F, root[0], root[1], s * 0.09, 1);
      l1.forEach(([x, y]) => disc(F, x, y, s * 0.065, 1));
      l2.forEach(([, [x, y]]) => disc(F, x, y, s * 0.055, 1));
      open.forEach(([, [x, y]]) => ring(F, x, y, Math.max(1.4, s * 0.08), 0.6, 0.75));
    },
  },

  // Control charts for four assays (the card), on synthetic data like the
  // revival: a regular run of points between control limits, with the one
  // point outside them circled.
  hplc: {
    form: "control-charts",
    alt: "Control charts for four assays, each a run of points between control limits with the one point outside them circled. The points are synthetic.",
    draw(F, b, rand) {
      const cols = wide(b) ? 2 : 1;
      const rows = 4 / cols;
      const pw = W(b) / cols;
      const ph = H(b) / rows;
      for (let k = 0; k < 4; k++) {
        const x0 = b.x0 + (k % cols) * pw + (k % cols ? 1.5 : 0);
        const x1 = x0 + pw - 1.5;
        const mid = Math.floor(b.y0 + Math.floor(k / cols) * ph + ph / 2) + 0.5;
        const lim = Math.max(2, Math.floor(ph / 2) - 1);
        rect(F, x0, mid - lim - 0.5, x1, mid - lim + 0.5, 0.34);
        rect(F, x0, mid + lim - 0.5, x1, mid + lim + 0.5, 0.34);
        const n = 11;
        const out = 3 + Math.floor(rand() * (n - 5));
        const pts = [];
        for (let i = 0; i < n; i++) {
          const x = Math.floor(x0 + 0.5 + (i * (x1 - x0 - 1)) / (n - 1)) + 0.5;
          const dy =
            i === out
              ? (rand() < 0.5 ? -1 : 1) * (lim + 1)
              : Math.round((rand() - 0.5) * (lim - 0.5));
          pts.push([x, mid + dy]);
        }
        polyline(F, pts, 0.4, 0.34);
        pts.forEach(([x, y]) => setCell(F, x, y, 1));
        dottedRing(F, pts[out][0], pts[out][1], 1.6, 0.62, 1.2);
      }
    },
  },

  // A personal CRM: contact cards.
  pcrm: {
    form: "contact-cards",
    alt: "Contact cards from a personal CRM, each an avatar and two lines of detail.",
    draw(F, b) {
      const horiz = wide(b);
      const cols = horiz ? 3 : 2;
      const rows = horiz ? 2 : 3;
      const cw = W(b) / cols;
      const rh = H(b) / rows;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x0 = b.x0 + i * cw + 0.5;
          const y0 = b.y0 + j * rh + 0.5;
          const x1 = x0 + cw - 1;
          const y1 = y0 + rh - 1;
          frame(F, x0, y0, x1, y1, 0.6, 0.7, 0.85);
          const r = Math.min(cw, rh) * 0.2;
          disc(F, x0 + r + 1.2, (y0 + y1) / 2, r, 1);
          rect(F, x0 + 2 * r + 2.2, (y0 + y1) / 2 - 1.1, x1 - 1.4, (y0 + y1) / 2 - 0.4, 0.85);
          rect(
            F,
            x0 + 2 * r + 2.2,
            (y0 + y1) / 2 + 0.5,
            x1 - 1.4 - (cw - 2 * r - 4) * 0.35,
            (y0 + y1) / 2 + 1.1,
            0.45
          );
        }
      }
    },
  },

  // The 2021 regression against the route-by-hour median lookup that beat it
  // in the 2026 re-check (posts/a-lookup-table-beat-my-regression.md): hold-out
  // RMSE of 9.5 minutes against 6.2. The bars are drawn to those numbers; the
  // line and the steps beside them are icons for the two models.
  "nyc-taxi": {
    form: "line-vs-steps",
    alt: "The 2021 regression, drawn as a straight line, against the median lookup, drawn as steps, each with a bar for its hold-out error: 9.5 minutes against 6.2. The lookup's shorter bar is in full ink.",
    draw(F, b) {
      const iconW = 8;
      const bx0 = b.x0 + iconW + 3;
      const len = (v) => (b.x1 - bx0) * (v / 9.5);
      const rowH = H(b) / 2;
      [
        [9.5, 0.34],
        [6.2, 1],
      ].forEach(([v, shade], i) => {
        const top = Math.floor(b.y0 + i * rowH + 1);
        const bot = Math.floor(b.y0 + (i + 1) * rowH - 2);
        if (i === 0) dotted(F, b.x0, bot, b.x0 + iconW, top, 1.4, 1);
        else {
          const s = iconW / 3;
          const h = (bot - top) / 2;
          polyline(
            F,
            [
              [b.x0, bot],
              [b.x0 + s, bot],
              [b.x0 + s, bot - h],
              [b.x0 + 2 * s, bot - h],
              [b.x0 + 2 * s, top],
              [b.x0 + iconW, top],
            ],
            0.8,
            1
          );
        }
        rect(F, bx0, top + 0.5, bx0 + len(v), bot + 0.5, shade);
      });
    },
  },

  // Five major versions; v5 is the current one, marked by one small red
  // cluster like every other current cover.
  portfolio: {
    form: "version-stack",
    alt: "Five versions of the site stacked like layers, back to front. A red marker on the front layer, v5, shows it is the current version.",
    draw(F, b) {
      const n = 5;
      const dx = Math.floor(W(b) * 0.08);
      const dy = Math.floor(H(b) * 0.1);
      const w = Math.floor(W(b) - dx * (n - 1));
      const h = Math.floor(H(b) - dy * (n - 1));
      for (let i = 0; i < n; i++) {
        const x0 = Math.floor(b.x0) + dx * i;
        const y0 = Math.floor(b.y0) + dy * (n - 1 - i);
        const live = i === n - 1;
        clearBox(F, x0, y0, x0 + w, y0 + h);
        frame(F, x0 + 0.5, y0 + 0.5, x0 + w - 0.5, y0 + h - 0.5, 0, 1, live ? 1 : 0.34 + i * 0.1);
        if (live) {
          rect(F, x0 + 2, y0 + 2, x0 + 4, y0 + 4, 1, { red: true });
          rect(F, x0 + 6, y0 + 2.5, x0 + Math.floor(w * 0.45), y0 + 3.5, 1);
          for (let k = 0; k < 3; k++)
            rect(
              F,
              x0 + 2,
              y0 + 5 + k * 2,
              x0 + Math.floor(w * (0.85 - k * 0.18)),
              y0 + 6 + k * 2,
              0.62
            );
        }
      }
    },
  },

  // Twelve company-designed job simulations, all completed (the card).
  "virtual-internships": {
    form: "twelve-tiles",
    alt: "Twelve job simulations as twelve identical tiles, each with a tick for a completed simulation.",
    draw(F, b) {
      const horiz = wide(b);
      const cols = horiz ? 6 : 3;
      const rows = 12 / cols;
      const t = 5;
      const gx = (W(b) - cols * t) / (cols - 1);
      const gy = Math.min(2, (H(b) - rows * t) / (rows - 1));
      const top = b.y0 + (H(b) - rows * t - (rows - 1) * gy) / 2;
      const tick = [
        [1, 2],
        [2, 3],
        [3, 2],
        [3, 1],
      ];
      for (let k = 0; k < 12; k++) {
        const x0 = Math.round(b.x0 + (k % cols) * (t + gx));
        const y0 = Math.round(top + Math.floor(k / cols) * (t + gy));
        frame(F, x0 + 0.5, y0 + 0.5, x0 + t - 0.5, y0 + t - 0.5, 0, 1, 0.34);
        tick.forEach(([cx, cy]) => setCell(F, x0 + cx + 0.5, y0 + cy + 0.5, 1));
      }
    },
  },
};

/** The cover canvas, shared by the cards, the arch window and share images. */
export const COVER_GRID = { cols: 40, rows: 22, pitch: 10 };

export const coverBox = (cols, rows) => ({ x0: 2, y0: 2, x1: cols - 2, y1: rows - 2 });
