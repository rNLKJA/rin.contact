/**
 * Copy and seed data for /projects/order-system-sandbox, a concept demo of the
 * order system Rin built for his mum's meal-prep studio. Every string is
 * bilingual ({ en, zh }), en-AU first, so no shared locale file is touched.
 *
 * The real app and its repository are private because they hold real customer
 * data. This page only repeats what the order-system card (lib/projects-data.js)
 * and the case study (/projects/order-system) already say in public. The demo
 * is fully synthetic: the members, meal packs, prices, walk-in price, chat
 * messages and the expense are invented and do not reflect the studio. No real
 * names, menu, prices, places, people or source links appear here.
 *
 * The rules the demo enforces (components/demos/order-system-sandbox/rules.js)
 * copy the shape of the app's shared Zod schemas and order service in plain
 * JavaScript: an order needs at least one lunch or dinner and a member or a
 * walk-in name, a card cannot go below zero, delivered and cancelled are final,
 * cancelling returns the meals or voids the walk-in payment, and spending must
 * be above zero with at most two decimal places and a description.
 */

export const STACK = [
  "TypeScript",
  "Expo",
  "React Native",
  "Hono",
  "Turso (libSQL)",
  "Drizzle ORM",
  "Zod",
  "Vitest",
  "Turborepo",
  "Vercel",
  "GitHub Actions",
];

export const COPY = {
  metaTitle: {
    en: "Order System Sandbox: a meal-prep studio's day · Concept demo · rin.contact",
    zh: "订餐系统沙盒：订餐工作室的一天 · 概念演示 · rin.contact",
  },
  metaDescription: {
    en: "A concept demo of the order system Rin Huang built for his mum's meal-prep studio. Top up a prepaid meal card, turn a mock group-chat sign-up into orders, then watch the kitchen tally and the day's finance update. Synthetic data only.",
    zh: "黄孙创宇（Rin）为妈妈的订餐工作室开发的订餐系统的概念演示。给预付餐卡充值，把模拟的群接龙变成订单，再看出餐统计和当天的账目跟着更新。全部使用合成数据。",
  },
  ogTitle: {
    en: "Order System Sandbox · Rin Huang",
    zh: "订餐系统沙盒 · Rin Huang",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  caseStudy: { en: "Read the case study", zh: "阅读案例研究" },
  jump: { en: "Try the sandbox", zh: "试试沙盒" },
  label: { en: "Concept demo · Family business", zh: "概念演示 · 家里的小生意" },
  title: { en: "Order System Sandbox", zh: "订餐系统沙盒" },
  fullName: { en: "Meal-Prep Studio Order System", zh: "订餐会员管理系统" },
  tagline: {
    en: "One day at my mum's meal-prep studio, from the evening sign-up to the last delivery, played out on made-up members so you can try it yourself.",
    zh: "妈妈订餐工作室的一天，从晚上的接龙到最后一单送达，用虚构的会员走一遍，你可以亲手试试。",
  },
  status: {
    en: "The real app has been in production since April 2026",
    zh: "真实的应用自 2026 年 4 月起上线使用",
  },
  notice: {
    en: "This is a concept illustration, not the real system. The real app and its code are private because they hold real customer data. Everything on this page is synthetic: the members, meal counts, prices and chat messages are made up, and nothing you do here leaves your browser.",
    zh: "这是一个概念演示，不是真实的系统。真实的应用和代码都不公开，因为里面存的是真实的顾客数据。本页的一切都是合成的：会员、餐数、价格和群消息都是虚构的，你在这里的操作也不会离开你的浏览器。",
  },

  problem: {
    title: { en: "The problem", zh: "起点" },
    body: [
      {
        en: "My mum runs a small meal-prep studio. Members buy a prepaid meal card, then sign up for the next day's lunch and dinner in a group chat.",
        zh: "我妈妈经营一家小小的订餐工作室。会员先买预付餐卡，再在群里接龙，报第二天的午餐和晚餐。",
      },
      {
        en: "Before this system, each evening's sign-ups were tallied by hand and passed along by message. The day's orders, card balances, income and spending were then keyed into an Excel workbook, so the same numbers were handled more than once before the day was closed.",
        zh: "有这个系统之前，每天晚上的接龙要靠人工统计，再发消息转给下一个人。当天的订单、餐卡余额、收入和支出，最后还要录进一个 Excel 表。同一批数字，在一天结束之前要经手好几遍。",
      },
    ],
  },

  what: {
    title: { en: "What it does", zh: "它做什么" },
    intro: {
      en: "The app follows the studio's day instead of asking the studio to change. Each step is recorded once, when it happens, by the person who does it.",
      zh: "这个应用贴合工作室本来的节奏，而不是让工作室去迁就它。每一步都在发生的时候，由做这件事的人记一次。",
    },
    steps: [
      {
        title: { en: "Cards", zh: "餐卡" },
        body: {
          en: "Staff sell, renew or upgrade a member's prepaid meal card. Each card sale goes into the ledger by itself.",
          zh: "员工给会员开卡、续卡或升级餐卡。每一笔卖卡收入都会自动记账。",
        },
      },
      {
        title: { en: "Orders", zh: "订单" },
        body: {
          en: "The evening sign-up becomes the next day's orders, one at a time or as a batch. Lunch and dinner are separate orders, and each meal comes off the member's card.",
          zh: "晚上的接龙变成第二天的订单，可以一条条录，也可以批量录。午餐和晚餐是两条独立的订单，每一份都从会员的餐卡里扣。",
        },
      },
      {
        title: { en: "Kitchen", zh: "出餐" },
        body: {
          en: "A phone view moves every meal from pending to prepared to delivered. Delivered is final, so a finished order cannot be quietly changed later.",
          zh: "手机上的出餐视图把每一份餐从待出餐推到已出餐，再到已送达。已送达是终态，完成的订单不能事后被悄悄改掉。",
        },
      },
      {
        title: { en: "Finance", zh: "财务" },
        body: {
          en: "Card sales and walk-in meals post to the ledger automatically and spending is entered by hand, so the day's numbers add up without being typed a second time.",
          zh: "卖卡和散客餐费自动入账，支出手动录入，当天的数字不用再录第二遍就能对上。",
        },
      },
    ],
  },

  build: {
    title: { en: "How it is built", zh: "怎么做出来的" },
    glance: [
      { k: { en: "Role", zh: "角色" }, v: { en: "Sole developer", zh: "独立开发" } },
      { k: { en: "Started", zh: "开始" }, v: { en: "April 2026", zh: "2026 年 4 月" } },
      {
        k: { en: "Platforms", zh: "平台" },
        v: {
          en: "Web, plus iOS and Android test builds",
          zh: "网页版，另有 iOS 和 Android 测试版",
        },
      },
      { k: { en: "Status", zh: "状态" }, v: { en: "In production", zh: "已上线使用" } },
    ],
    body: [
      {
        en: "One Expo codebase builds the app for iOS, Android and the web. It talks to a Hono API on Vercel, with Turso (libSQL) as the database and Drizzle for the schema and migrations.",
        zh: "同一套 Expo 代码同时构建 iOS、Android 和网页版。应用连到部署在 Vercel 上的 Hono API，数据库用 Turso（libSQL），表结构和迁移交给 Drizzle。",
      },
      {
        en: "The rules live in a shared package of Zod schemas that the app and the API both use, so a form and the server cannot disagree about what a valid order or expense looks like. The sandbox below copies a few of those rules in plain JavaScript.",
        zh: "业务规则放在一个共享包里，用 Zod 写成校验规则，应用和 API 用的是同一套。这样表单和服务器对一张有效的订单、一笔有效的支出，理解永远一致。下面的沙盒用普通的 JavaScript 复刻了其中几条。",
      },
      {
        en: "Anything that touches a card balance and the books together, such as cancelling an order, runs in one database transaction. Card balances and the ledger cannot drift apart that way.",
        zh: "凡是同时动到餐卡余额和账本的操作，比如取消订单，都放在同一个数据库事务里完成，所以餐卡余额和账本不会对不上。",
      },
    ],
  },

  role: {
    title: { en: "My role", zh: "我的角色" },
    body: [
      {
        en: "I am the sole developer. I designed the data model and the rules, and built the app, the API and the shared package that holds the rules.",
        zh: "我是唯一的开发者。数据模型和业务规则是我设计的，应用、API 和放规则的共享包也都是我写的。",
      },
      {
        en: "I planned the work in phases tracked in Linear. Work started on 22 April 2026, and sign-in, members, cards, ordering and the kitchen view were live by 25 April. Later releases added retail sales, label printing and a full interface redesign.",
        zh: "我把工作分阶段推进，用 Linear 跟踪。项目从 2026 年 4 月 22 日开始，登录、会员、餐卡、订餐和出餐视图在 4 月 25 日前都已上线。之后又陆续加了零售、标签打印，以及整套界面的重新设计。",
      },
    ],
  },

  demoSection: {
    title: { en: "Try the sandbox", zh: "试一试" },
    intro: {
      en: "Work through the studio's day in four steps. Top up a card, enter tomorrow's sign-up from the mock group chat, move the meals through the kitchen, then check the day's roll-up. Every action lands in the activity log, the way the real app keeps an audit record.",
      zh: "分四步走完工作室的一天：给餐卡充值，把模拟群聊里明天的接龙录成订单，在出餐视图里推进每一份餐，最后看当天的汇总。每一步操作都会写进操作记录，就像真实的应用会留下审计记录一样。",
    },
  },

  leavesOut: {
    title: { en: "What the sandbox leaves out", zh: "沙盒没有包含的部分" },
    body: [
      {
        en: "The sandbox skips sign-in, staff accounts, card upgrades, retail sales and label printing. In the real app, staff enter the sign-up through a batch order form, and an automatic next-day sign-up summary is still on the list. Here the demo reads the mock chat for you so you can see the rest of the loop.",
        zh: "沙盒省略了登录、员工账号、餐卡升级、零售和标签打印。在真实的应用里，接龙是员工通过批量下单表单录入的，自动生成次日接龙汇总还在计划之中。这里由演示替你读取模拟群聊，好让你看到后面的整个流程。",
      },
      {
        en: "The members, meal packs, prices and spending are invented and say nothing about the studio or the people who use it.",
        zh: "会员、餐包、价格和支出都是虚构的，与工作室本身和使用它的人都无关。",
      },
    ],
  },

  footerNote: {
    en: "A concept demo with synthetic data. The real app and its code stay private.",
    zh: "使用合成数据的概念演示。真实的应用和代码不公开。",
  },
};

// ---------------------------------------------------------------------------
// Demo seed data. All synthetic.
// ---------------------------------------------------------------------------

/** Made-up members and the meals left on each prepaid card. */
export const MEMBERS = [
  { id: "m1", name: { en: "Ava", zh: "小安" }, remaining: 6 },
  { id: "m2", name: { en: "Ben", zh: "阿本" }, remaining: 3 },
  { id: "m3", name: { en: "Coco", zh: "可可" }, remaining: 1 },
  { id: "m4", name: { en: "Dev", zh: "大卫" }, remaining: 12 },
  { id: "m5", name: { en: "Elle", zh: "艾拉" }, remaining: 0 },
  { id: "m6", name: { en: "Finn", zh: "小凡" }, remaining: 9 },
];

/** Made-up meal packs. Prices are in cents and invented for the demo. */
export const PACKS = [
  { id: "p5", meals: 5, cents: 7000 },
  { id: "p10", meals: 10, cents: 13000 },
  { id: "p20", meals: 20, cents: 24000 },
];

/** Made-up price per meal for a walk-in guest without a card, in cents. */
export const WALK_IN_CENTS = 1600;

/** The opening spending entry in the ledger (cents). */
export const SEED_EXPENSE = {
  cents: 8640,
  desc: { en: "Groceries for tomorrow", zh: "明天的食材" },
};

/** The mock group-chat sign-up, one person per line. */
export const SIGNUP = {
  en: [
    "1. Ava L1 D1",
    "2. Ben L2",
    "3. Coco L1 D1",
    "4. Dev D1",
    "5. Elle L1",
    "6. Sam (walk-in) L1",
  ].join("\n"),
  zh: [
    "1. 小安 午1 晚1",
    "2. 阿本 午2",
    "3. 可可 午1 晚1",
    "4. 大卫 晚1",
    "5. 艾拉 午1",
    "6. 小林（散客） 午1",
  ].join("\n"),
};

// ---------------------------------------------------------------------------
// Demo interface copy. {placeholders} are filled by lib/fill.js.
// ---------------------------------------------------------------------------

export const DEMO = {
  synthetic: {
    en: "Synthetic data · Concept illustration, not the real system",
    zh: "合成数据 · 概念演示，不是真实系统",
  },
  reset: { en: "Reset sandbox", zh: "重置沙盒" },
  regionLabel: { en: "Order system sandbox", zh: "订餐系统沙盒" },
  step: { en: "Step {n}", zh: "第 {n} 步" },

  lunch: { en: "Lunch", zh: "午餐" },
  dinner: { en: "Dinner", zh: "晚餐" },
  lunchLower: { en: "lunch", zh: "午餐" },
  dinnerLower: { en: "dinner", zh: "晚餐" },
  mealOne: { en: "1 meal", zh: "1 餐" },
  mealMany: { en: "{n} meals", zh: "{n} 餐" },
  orderOne: { en: "1 order", zh: "1 张订单" },
  orderMany: { en: "{n} orders", zh: "{n} 张订单" },
  lineOne: { en: "1 line", zh: "1 行" },
  lineMany: { en: "{n} lines", zh: "{n} 行" },
  listSep: { en: ", ", zh: "，" },

  // Step 1: top up
  topUp: {
    title: { en: "Top up a card", zh: "给餐卡充值" },
    members: { en: "Members and meals left", zh: "会员和剩余餐数" },
    left: { en: "{n} left", zh: "剩 {n} 餐" },
    usedUp: { en: "Used up", zh: "已用完" },
    member: { en: "Member", zh: "会员" },
    pack: { en: "Meal pack", zh: "餐包" },
    packLabel: { en: "{meals} meals · {price}", zh: "{meals} 餐 · {price}" },
    button: { en: "Top up {name}", zh: "给{name}充值" },
    hint: {
      en: "Meals carry over, so a top-up adds to whatever is left. The sale posts to the ledger by itself.",
      zh: "剩下的餐会结转，充值是在原有餐数上加。这笔收入会自动入账。",
    },
  },

  // Step 2: sign-up to orders
  signup: {
    title: { en: "Turn the sign-up into orders", zh: "把接龙录成订单" },
    chat: { en: "Studio group chat (mock)", zh: "工作室群聊（模拟）" },
    studio: { en: "Studio", zh: "工作室" },
    pinned: {
      en: "Sign-up for tomorrow. Add your name, then L for lunch and D for dinner with how many, like Ava L1 D1.",
      zh: "明天的接龙。写上名字，午餐写“午”，晚餐写“晚”，后面跟份数，比如：小安 午1 晚1。",
    },
    field: { en: "Sign-up list, one person per line", zh: "接龙名单，每行一人" },
    help: {
      en: "Edit the list to test the rules. Write (walk-in) after a name for a guest without a card. Each line carries a key, so entering the same line twice never doubles an order.",
      zh: "可以改动名单来试试这些规则。没有餐卡的散客，在名字后面加上（散客）。每一行都带一个键，同一行录两次也不会多出订单。",
    },
    check: { en: "Check before entering", zh: "录入前检查" },
    empty: { en: "The list is empty.", zh: "名单是空的。" },
    readyCard: {
      en: "{name} · {meals} · card {before} to {after}",
      zh: "{name} · {meals} · 餐卡 {before} 变 {after}",
    },
    readyWalkIn: {
      en: "{name} · {meals} · walk-in, {amount} at {price} a meal",
      zh: "{name} · {meals} · 散客，每份 {price}，共 {amount}",
    },
    tag: {
      ready: { en: "Ready", zh: "可录入" },
      entered: { en: "Entered", zh: "已录入" },
      held: { en: "Held back", zh: "暂缓" },
      skipped: { en: "Skipped", zh: "跳过" },
    },
    errors: {
      noMeals: {
        en: "No lunch or dinner on this line. An order needs at least one.",
        zh: "这一行没有午餐也没有晚餐。一张订单至少要有一份。",
      },
      noName: {
        en: "No name on this line. An order needs a member or a walk-in name.",
        zh: "这一行没有名字。订单要选会员，或者填散客姓名。",
      },
      unknown: {
        en: "No member is called {name}. Add (walk-in) for a guest.",
        zh: "没有叫“{name}”的会员。如果是散客，请加上（散客）。",
      },
      noBalance: {
        en: "{name} has {left} left and this needs {need}. Top up first.",
        zh: "{name}还剩 {left}，这次需要 {need}。请先充值。",
      },
      duplicate: {
        en: "Same line as one above, so it only counts once.",
        zh: "和上面某一行完全相同，只算一次。",
      },
    },
    enter: { en: "Enter ready lines ({n})", zh: "录入可录的行（{n}）" },
    nothing: {
      en: "Nothing new to enter. Lines already entered are skipped, and held-back lines need fixing first.",
      zh: "没有新的可录入。已录入的行会跳过，暂缓的行要先处理好。",
    },
  },

  // Step 3: kitchen
  kitchen: {
    title: { en: "Kitchen tally", zh: "出餐统计" },
    caption: { en: "Meals for tomorrow by status", zh: "明天各状态的餐数" },
    statusCol: { en: "Status", zh: "状态" },
    status: {
      pending: { en: "Pending", zh: "待出餐" },
      prepared: { en: "Prepared", zh: "已出餐" },
      delivered: { en: "Delivered", zh: "已送达" },
      cancelled: { en: "Cancelled", zh: "已取消" },
    },
    orders: { en: "Orders", zh: "订单" },
    empty: {
      en: "No orders yet. Enter the sign-up in step 2.",
      zh: "还没有订单。先在第 2 步录入接龙。",
    },
    walkIn: { en: "walk-in", zh: "散客" },
    toPrepared: { en: "Mark prepared", zh: "标为已出餐" },
    toDelivered: { en: "Mark delivered", zh: "标为已送达" },
    final: { en: "Final", zh: "终态" },
    back: { en: "Back to pending", zh: "退回待出餐" },
    cancel: { en: "Cancel", zh: "取消" },
    actionLabel: { en: "{action}: {name}, {meal} × {qty}", zh: "{action}：{name}，{meal} × {qty}" },
    allPrepared: { en: "Prepare all pending", zh: "全部标为已出餐" },
    allDelivered: { en: "Deliver all prepared", zh: "全部标为已送达" },
    lockedDelivered: {
      en: "A delivered order is final and cannot be changed or cancelled here. In the real app an admin can correct a delivery marked by accident, and the meal goes back to the card in one transaction.",
      zh: "已送达的订单是终态，这里不能修改或取消。在真实的应用里，管理员可以纠正误标的送达，餐数会在同一个事务里退回餐卡。",
    },
    lockedCancelled: {
      en: "A cancelled order is final. Enter a new line in the sign-up instead.",
      zh: "已取消的订单是终态。如需重新下单，请在接龙里新加一行。",
    },
    none: {
      en: "No orders are at that step right now.",
      zh: "现在没有处在这一步的订单。",
    },
    noBack: {
      en: "Only a prepared order can go back to pending.",
      zh: "只有已出餐的订单才能退回待出餐。",
    },
  },

  // Step 4: finance
  finance: {
    title: { en: "The day's roll-up", zh: "当天汇总" },
    cardSales: { en: "Card sales", zh: "卖卡收入" },
    walkIns: { en: "Walk-in meals", zh: "散客餐费" },
    spending: { en: "Spending", zh: "支出" },
    net: { en: "Net for the day", zh: "当天结余" },
    delivered: { en: "Meals delivered", zh: "已送达餐数" },
    onCards: { en: "Meals still on cards", zh: "餐卡剩余餐数" },
    ledger: { en: "Ledger", zh: "流水" },
    auto: { en: "auto", zh: "自动" },
    manual: { en: "manual", zh: "手动" },
    voided: { en: "voided", zh: "已冲销" },
    cardEntry: { en: "Card top-up · {name} · {meals}", zh: "餐卡充值 · {name} · {meals}" },
    walkInEntry: { en: "Walk-in · {name} · {meals}", zh: "散客 · {name} · {meals}" },
    add: { en: "Add spending", zh: "录入支出" },
    amount: { en: "Amount ($)", zh: "金额（$）" },
    desc: { en: "What it was for", zh: "用途" },
    submit: { en: "Add", zh: "添加" },
    badAmount: {
      en: "Enter an amount above zero with no more than two decimal places.",
      zh: "请输入大于零、最多两位小数的金额。",
    },
    badDesc: {
      en: "Say what the spending was for.",
      zh: "请写明这笔支出的用途。",
    },
  },

  // Activity log
  log: {
    title: { en: "Activity log", zh: "操作记录" },
    hint: {
      en: "Newest first. The real app keeps an audit record of every change.",
      zh: "最新的在最上面。真实的应用会给每一次改动留下审计记录。",
    },
    empty: {
      en: "Nothing yet. Try a step above.",
      zh: "还没有操作。试试上面的步骤。",
    },
    topUp: {
      en: "Sold {name} a {n}-meal pack for {amount}. {name} now has {left}.",
      zh: "给{name}充值 {n} 餐，收入 {amount}。{name}现在剩 {left}。",
    },
    entered: {
      en: "Entered {lines} from the sign-up as {orders}.",
      zh: "把接龙里的 {lines}录成了 {orders}。",
    },
    usedUp: { en: "{name}'s card is now used up.", zh: "{name}的餐卡已用完。" },
    prepared: { en: "{name}'s {meal} is prepared.", zh: "{name}的{meal}已出餐。" },
    delivered: { en: "{name}'s {meal} is delivered.", zh: "{name}的{meal}已送达。" },
    backToPending: {
      en: "{name}'s {meal} is back to pending.",
      zh: "{name}的{meal}退回待出餐。",
    },
    cancelCard: {
      en: "Cancelled {name}'s {meal}, and {meals} went back to the card.",
      zh: "取消了{name}的{meal}，{meals}退回餐卡。",
    },
    cancelWalkIn: {
      en: "Cancelled {name}'s {meal}, and the walk-in payment of {amount} was voided.",
      zh: "取消了{name}的{meal}，{amount} 的散客收入已冲销。",
    },
    bulkPrepared: { en: "Marked {orders} prepared.", zh: "把 {orders}标为已出餐。" },
    bulkDelivered: { en: "Marked {orders} delivered.", zh: "把 {orders}标为已送达。" },
    expense: {
      en: "Recorded spending of {amount} for {desc}.",
      zh: "录入一笔支出 {amount}，用途：{desc}。",
    },
    reset: {
      en: "The sandbox is back to its starting data.",
      zh: "沙盒已恢复到初始数据。",
    },
  },
};
