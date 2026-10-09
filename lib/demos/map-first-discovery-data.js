/**
 * Copy and demo data for /projects/map-first-discovery, Rin's write-up of
 * Mapiva, the Melbourne startup he co-founded. Strings are bilingual
 * ({ en, zh }), en-AU first, so no shared locale file is touched.
 *
 * Mapiva's code is private and the app is still in development, so the page
 * repeats only what the mapiva entries in lib/career-data.js and
 * lib/projects-data.js already say in public: co-founder and Dev Lead since
 * August 2025, a map-first app for discovering people and events nearby, an
 * Expo React Native client on a Django, Rust and PostgreSQL backend shipped
 * through GitHub Actions, the 2026–27 development plan, code review for a
 * part-time team, age checks at sign-up, approximate locations for other
 * people's pins, and a beta planned for early 2027. No screens, repo links,
 * endpoints, hosts, team names or brand assets.
 *
 * The demo (components/demos/map-first-discovery) is a concept illustration
 * written fresh for this site. Every person, event and time is synthetic and
 * generated in the browser from a fixed seed. The map is a hand-drawn sketch:
 * the coordinates below are approximate and only good enough to read as inner
 * Melbourne. Suburb names are public place names.
 */

// Tech tags are proper nouns: single source, identical in every locale.
export const STACK = ["React Native", "Expo", "Django", "Rust", "PostgreSQL", "GitHub Actions"];

export const COPY = {
  metaTitle: {
    en: "Mapiva: map-first social discovery · Write-up · rin.contact",
    zh: "Mapiva：以地图为核心的社交发现 · 手记 · rin.contact",
  },
  metaDescription: {
    en: "Rin Huang's write-up of Mapiva, the Melbourne startup he co-founded to build a map-first app for discovering people and events nearby. Includes a concept demo of radius search, pin grouping and approximate locations, built with synthetic data.",
    zh: "黄孙创宇（Rin）对 Mapiva 的介绍。Mapiva 是他在墨尔本联合创办的初创公司，在做一款以地图为核心、用来发现附近的人和活动的应用。页面附有一个概念演示，用合成数据展示范围搜索、标记合并和大致位置。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Write-up · Startup", zh: "手记 · 初创" },
  fullName: { en: "Map-first social discovery", zh: "以地图为核心的社交发现" },
  tagline: {
    en: "An app that opens on a map of what is happening around you, so finding people and things to do starts from where you are.",
    zh: "一款打开就是地图的应用。先看看身边正在发生什么，再去找附近的人和活动。",
  },
  status: {
    en: "Co-founder and Dev Lead since August 2025 · beta planned for early 2027",
    zh: "2025 年 8 月起任联合创始人兼开发负责人 · 计划 2027 年初公测",
  },
  notice: {
    en: "Mapiva is a startup I co-founded, and the app is still in development. This page is my own write-up. The demo below is a concept illustration written fresh for this site, with synthetic people and events. It is not the app's code, and nothing in it comes from the app, its users or its brand.",
    zh: "Mapiva 是我联合创办的初创公司，应用还在开发中。本页是我个人的介绍。下面的演示是专门为这个网站写的概念示意，里面的人和活动都是合成的。它不是应用本身的代码，也没有任何内容来自应用、用户或品牌。",
  },
  tryDemo: { en: "Try the demo", zh: "试试演示" },

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "Finding something to do nearby is harder than it sounds. Events are spread across different apps, pages and group chats, and most social apps are built around a feed of posts rather than a place. When you are new to a city, or just free for an afternoon, the question you actually have is what is happening near me right now. A list is a poor way to answer that. A map is a good one.",
        zh: "想在附近找点事做，比听起来难。活动信息散落在不同的应用、网页和群聊里，大多数社交应用围绕的是一条信息流，而不是一个地方。刚到一座城市，或者只是某个下午有空，真正想问的是：我附近现在有什么？列表很难回答这个问题，地图却很合适。",
      },
      {
        en: "A map of people is also a privacy problem. Showing where someone is, even roughly, has to be designed with care from the first day rather than patched on later.",
        zh: "但一张标着人的地图，本身就是一个隐私问题。哪怕只显示一个人的大致位置，也要从第一天起认真设计，而不是事后再补。",
      },
    ],
  },

  idea: {
    title: { en: "The idea", zh: "这个想法" },
    intro: {
      en: "Mapiva is a mobile app for iOS and Android that helps people discover what is nearby and connect. The idea fits in three steps.",
      zh: "Mapiva 是一款 iOS 和 Android 手机应用，帮人发现身边的人和活动，并建立联系。这个想法三步就能说清楚。",
    },
    steps: [
      {
        title: { en: "Start from the map", zh: "从地图开始" },
        body: {
          en: "The app opens on a map of the area around you, not a feed. What is close by is what you see first.",
          zh: "打开应用，先看到的是你周围的地图，而不是信息流。离你近的东西最先出现。",
        },
      },
      {
        title: { en: "See who and what is near", zh: "看看附近有谁、有什么" },
        body: {
          en: "People and events show up as pins, so you can tell at a glance what is within reach this afternoon.",
          zh: "人和活动都以标记的形式出现在地图上，今天下午能去哪儿，一眼就看得出来。",
        },
      },
      {
        title: { en: "Connect", zh: "建立联系" },
        body: {
          en: "When something catches your eye, you can find out more and connect with the people behind it.",
          zh: "看到感兴趣的，就点开了解更多，再和背后的人联系。",
        },
      },
    ],
  },

  privacy: {
    title: { en: "Privacy from the start", zh: "从一开始就考虑隐私" },
    intro: {
      en: "Privacy is part of the design from the start, and two choices shape it most.",
      zh: "隐私从一开始就是设计的一部分，其中有两点影响最大。",
    },
    points: [
      {
        en: "Age checks at sign-up, so the people on the map are old enough to be there.",
        zh: "注册时核验年龄，确保地图上的人都达到了使用年龄。",
      },
      {
        en: "Approximate locations for other people's pins. You can see that someone is nearby without seeing exactly where they are.",
        zh: "他人的地图标记只显示大致位置。你能知道附近有人，但看不到对方确切在哪里。",
      },
    ],
    body: [
      {
        en: "One simple way to make a location approximate is to snap it to a grid. The map is divided into fixed squares, and a person's pin is drawn at the centre of the square they are in, never at their real position. The demo below works this way, so you can try different square sizes and see what changes.",
        zh: "要让位置变成“大致”的，有个简单的办法：把它吸附到网格上。地图被分成固定的方格，一个人的标记画在他所在方格的中心，而不是真实位置。下面的演示就是这样做的，你可以换几种方格大小，看看有什么变化。",
      },
      {
        en: "The grid has to stay fixed. If each request added fresh random noise instead, someone patient could collect many readings and average them back to the real spot. A fixed grid gives the same answer every time, so there is nothing to average. Moving your own pin around does not help either, because the most it can tell you is which square a person is in.",
        zh: "网格必须固定不变。如果每次请求都随机加一点噪声，有耐心的人可以收集很多次结果，取个平均值就能还原真实位置。固定的网格每次给出的答案都一样，没有什么可以平均。挪动自己的位置也没用，最多只能知道对方在哪个方格里。",
      },
    ],
    note: {
      en: "This shows the idea only. It is not a description of how the app implements it.",
      zh: "这里只是示意思路，并不代表应用的具体实现。",
    },
  },

  demo: {
    title: { en: "Try it: who and what is nearby", zh: "试一试：附近有谁、有什么" },
    notice: {
      en: "Concept illustration, not the real system. Every person, event and time below is synthetic, generated in your browser from a fixed seed. The map is a simplified sketch of inner Melbourne drawn for this page, so streets, parks and the shoreline are approximate. Nothing is stored or sent anywhere.",
      zh: "概念示意，并非真实系统。下面所有的人、活动和时间都是合成的，由你的浏览器用固定的随机种子生成。地图是为本页画的墨尔本内城简图，街道、公园和海岸线都只是大致位置。不会保存或发送任何数据。",
    },
    intro: {
      en: "It is a Saturday afternoon and you are near Carlton. Move your pin, change the search radius and watch the nearby list update. Then switch on the grid to see where people really are and where their pins are drawn.",
      zh: "假设现在是周六下午，你在卡尔顿附近。挪动你的位置，调整搜索半径，看看附近的列表怎么变化。再打开网格，看看每个人真实在哪里，他们的标记又画在了哪里。",
    },
  },

  build: {
    title: { en: "How it is built", zh: "怎么搭建的" },
    glance: [
      {
        k: { en: "Role", zh: "角色" },
        v: { en: "Co-founder and Dev Lead", zh: "联合创始人兼开发负责人" },
      },
      { k: { en: "Since", zh: "开始" }, v: { en: "August 2025", zh: "2025 年 8 月" } },
      { k: { en: "Team", zh: "团队" }, v: { en: "Small, part-time", zh: "小型兼职团队" } },
      { k: { en: "Next", zh: "下一步" }, v: { en: "Beta in early 2027", zh: "2027 年初公测" } },
    ],
    body: [
      {
        en: "The app is built with Expo and React Native, so one codebase serves both iOS and Android. It runs on a backend built with Django and Rust over PostgreSQL, and changes ship through GitHub Actions.",
        zh: "应用用 Expo 和 React Native 开发，一套代码同时支持 iOS 和 Android。后端用 Django 和 Rust 搭建，数据存放在 PostgreSQL 里，改动通过 GitHub Actions 持续集成和交付。",
      },
    ],
    roleTitle: { en: "My role", zh: "我的角色" },
    role: [
      {
        en: "I co-founded Mapiva and lead its development. As Dev Lead I own the technical architecture and lead code review for a small part-time engineering team.",
        zh: "我联合创办了 Mapiva，负责开发工作。作为开发负责人，我负责整体技术架构，也负责一支小型兼职工程团队的代码评审。",
      },
      {
        en: "I also wrote the 2026–27 development plan, which sets the scope of the beta and the criteria it has to meet before release. I do all of this alongside my day job.",
        zh: "我还写了 2026–27 年的开发计划，定下公测的范围，以及发布前必须达到的标准。这些都是在本职工作之外完成的。",
      },
    ],
  },

  next: {
    title: { en: "What's next", zh: "接下来" },
    body: {
      en: "The team is working towards a beta in early 2027, with its scope and release criteria set out in the development plan.",
      zh: "团队正朝着 2027 年初的公测推进，公测的范围和发布标准都写在开发计划里。",
    },
  },

  footerNote: {
    en: "Mapiva's code is private, so this page has no source links or screenshots. The demo is written fresh for this site.",
    zh: "Mapiva 的代码不公开，所以本页没有源码链接和截图。演示是专门为这个网站写的。",
  },
  career: { en: "Career", zh: "履历" },
  stackLabel: { en: "Stack", zh: "技术栈" },
};

/** Every string the demo shows. {name} placeholders are filled with lib/fill. */
export const DEMO = {
  synthetic: { en: "Synthetic data · simplified map", zh: "合成数据 · 简化地图" },
  clock: { en: "Synthetic clock: Saturday, 2:00 pm", zh: "合成时钟：周六下午 2:00" },
  mapRole: { en: "map", zh: "地图" },
  mapName: { en: "Map of inner Melbourne", zh: "墨尔本内城地图" },
  mapHelp: {
    en: "Click the map or use the arrow keys to move your pin. Hold Shift to move further. Press + or - to zoom.",
    zh: "点击地图，或用方向键挪动你的位置，按住 Shift 移动得更远。按 + 或 - 缩放。",
  },
  startNear: { en: "Jump to", zh: "跳到" },
  radius: { en: "Search radius", zh: "搜索半径" },
  show: { en: "Show", zh: "显示" },
  showAll: { en: "Both", zh: "全部" },
  showPeople: { en: "People", zh: "人" },
  showEvents: { en: "Events", zh: "活动" },
  precision: { en: "Pin precision for people", zh: "他人标记的精度" },
  group: { en: "Group nearby pins", zh: "合并相邻的标记" },
  reveal: {
    en: "Show the grid and true positions (only this demo can)",
    zh: "显示网格和真实位置（只有这个演示做得到）",
  },
  zoomIn: { en: "Zoom in", zh: "放大" },
  zoomOut: { en: "Zoom out", zh: "缩小" },
  zoomLevel: { en: "Zoom {n} of {total}", zh: "缩放 {n}/{total}" },
  centre: { en: "Centre on me", zh: "回到我的位置" },
  reset: { en: "Reset", zh: "重置" },
  feedTitle: { en: "Nearby now", zh: "附近此刻" },
  feedEmpty: {
    en: "Nothing within {radius}. Try a bigger radius or move your pin.",
    zh: "{radius}以内什么也没有。试试扩大半径，或者挪动你的位置。",
  },
  showMore: { en: "Show {n} more", zh: "再显示 {n} 条" },
  kindPerson: { en: "Person", zh: "人" },
  kindEvent: { en: "Event", zh: "活动" },
  within: { en: "within {d}", zh: "{d}以内" },
  about: { en: "about {d} away", zh: "约 {d}" },
  into: { en: "into {list}", zh: "喜欢{list}" },
  and: { en: " and ", zh: "和" },
  onNow: { en: "on now, until {time}", zh: "正在进行，{time} 结束" },
  startsIn: { en: "starts in {n} min", zh: "{n} 分钟后开始" },
  startsAt: { en: "starts at {time}", zh: "{time} 开始" },
  near: { en: "near {place}", zh: "{place}附近" },
  metres: { en: "{n} m", zh: "{n} 米" },
  km: { en: "{n} km", zh: "{n} 公里" },
  am: { en: "{t} am", zh: "上午 {t}" },
  pm: { en: "{t} pm", zh: "下午 {t}" },
  stats: {
    people: { en: "People in range", zh: "范围内的人" },
    events: { en: "Events in range", zh: "范围内的活动" },
    precision: { en: "People shown to", zh: "他人位置精度" },
  },
  legend: {
    you: { en: "You", zh: "你" },
    person: { en: "Person, approximate", zh: "人，大致位置" },
    event: { en: "Event", zh: "活动" },
    group: { en: "Group of pins", zh: "合并的标记" },
    truth: { en: "True position, demo only", zh: "真实位置，仅演示可见" },
  },
  summary: {
    en: "{people} and {events} within {radius} of you, near {place}. People are shown to the nearest {cell} square.",
    zh: "你在{place}附近，{radius}以内有{people}、{events}。他人位置精确到 {cell}的方格。",
  },
  /** Counts for the summary: `one` when there is exactly one, `other` otherwise. */
  peopleCount: {
    one: { en: "1 person", zh: " 1 个人" },
    other: { en: "{n} people", zh: " {n} 个人" },
  },
  eventCount: {
    one: { en: "1 event", zh: "1 个活动" },
    other: { en: "{n} events", zh: "{n} 个活动" },
  },
  inBay: {
    en: "That spot is in the water, so your pin stays where it was.",
    zh: "那里是水面，你的位置保持不变。",
  },
  edge: { en: "That is the edge of this map.", zh: "已经到地图边缘了。" },
  groupTitle: { en: "{n} pins here. Click to zoom in.", zh: "这里有 {n} 个标记，点击放大。" },
  cellTitle: {
    en: "{n} people share this square, so they show as one pin.",
    zh: "{n} 个人在同一个方格里，所以显示成一个标记。",
  },
  youTitle: { en: "You", zh: "你" },
  bay: { en: "Port Phillip Bay", zh: "菲利普港湾" },
  apiTitle: { en: "What the app would ask for", zh: "应用会向服务器要什么" },
  apiNote: {
    en: "Illustrative only. A made-up endpoint showing the shape a nearby search could return for the view above. People come back with an approximate location and a rounded distance. Events happen at public places, so they come back with their exact location.",
    zh: "仅作示意。这是一个虚构的接口，展示上面这次附近搜索可能返回的数据结构。人返回的是大致位置和取整后的距离。活动在公共场所举行，所以返回确切位置。",
  },
  request: { en: "Request", zh: "请求" },
  response: { en: "Response", zh: "响应" },
  apiShowing: {
    en: "Showing {n} of {total} items.",
    zh: "共 {total} 条，这里显示 {n} 条。",
  },
};

// ── Synthetic world ─────────────────────────────────────────────────────────
// All coordinates are [lat, lng], approximate and hand-placed.

/** The map's origin (Melbourne CBD). Distances are metres east and north of it. */
export const ORIGIN = { lat: -37.8136, lng: 144.9631 };

/** The demo's fixed "now": Saturday 10 October 2026, 2:00 pm in Melbourne (AEDT). */
export const NOW_UTC = Date.UTC(2026, 9, 10, 3, 0, 0);
export const NOW_MINUTES = 14 * 60;

export const START_PLACE = "carlton";

/** Suburb anchors. `major` labels show at the widest zoom, the rest from zoom 2. */
export const PLACES = [
  {
    id: "cbd",
    at: [-37.8136, 144.9631],
    people: 9,
    major: true,
    en: "the CBD",
    zh: "市中心",
    label: { en: "CBD", zh: "市中心" },
  },
  { id: "carlton", at: [-37.8001, 144.9671], people: 6, major: true, en: "Carlton", zh: "卡尔顿" },
  { id: "fitzroy", at: [-37.7984, 144.978], people: 6, major: true, en: "Fitzroy", zh: "菲茨罗伊" },
  { id: "collingwood", at: [-37.8022, 144.988], people: 4, en: "Collingwood", zh: "科林伍德" },
  { id: "abbotsford", at: [-37.804, 145.0], people: 2, en: "Abbotsford", zh: "阿伯茨福德" },
  { id: "richmond", at: [-37.823, 144.998], people: 5, major: true, en: "Richmond", zh: "里士满" },
  {
    id: "southYarra",
    at: [-37.838, 144.992],
    people: 4,
    major: true,
    en: "South Yarra",
    zh: "南亚拉",
  },
  { id: "prahran", at: [-37.851, 144.993], people: 3, en: "Prahran", zh: "普拉兰" },
  {
    id: "stKilda",
    at: [-37.8676, 144.9809],
    people: 5,
    major: true,
    en: "St Kilda",
    zh: "圣基尔达",
  },
  {
    id: "southMelbourne",
    at: [-37.833, 144.958],
    people: 3,
    en: "South Melbourne",
    zh: "南墨尔本",
  },
  { id: "portMelbourne", at: [-37.8355, 144.942], people: 3, en: "Port Melbourne", zh: "墨尔本港" },
  { id: "southbank", at: [-37.824, 144.964], people: 4, en: "Southbank", zh: "南岸" },
  {
    id: "docklands",
    at: [-37.816, 144.946],
    people: 3,
    major: true,
    en: "Docklands",
    zh: "达克兰",
  },
  {
    id: "northMelbourne",
    at: [-37.799, 144.946],
    people: 3,
    en: "North Melbourne",
    zh: "北墨尔本",
  },
  {
    id: "brunswick",
    at: [-37.77, 144.961],
    people: 5,
    major: true,
    en: "Brunswick",
    zh: "布伦瑞克",
  },
  { id: "northcote", at: [-37.7745, 144.999], people: 3, en: "Northcote", zh: "诺斯科特" },
  {
    id: "footscray",
    at: [-37.8, 144.8995],
    people: 4,
    major: true,
    en: "Footscray",
    zh: "福茨克雷",
  },
];

/** The places the "Jump to" menu offers, in menu order. */
export const JUMP_PLACES = [
  "carlton",
  "cbd",
  "fitzroy",
  "richmond",
  "southYarra",
  "stKilda",
  "docklands",
  "brunswick",
  "footscray",
];

/** Port Phillip Bay's northern shore, closed into a polygon far to the south. */
export const BAY = [
  [-37.96, 144.86],
  [-37.868, 144.86],
  [-37.864, 144.889],
  [-37.866, 144.903],
  [-37.861, 144.912],
  [-37.849, 144.91],
  [-37.842, 144.912],
  [-37.841, 144.922],
  [-37.843, 144.934],
  [-37.847, 144.946],
  [-37.852, 144.957],
  [-37.859, 144.965],
  [-37.865, 144.972],
  [-37.873, 144.977],
  [-37.884, 144.981],
  [-37.9, 144.986],
  [-37.96, 144.995],
];

export const RIVERS = [
  // The Yarra, from its mouth upstream to Kew.
  [
    [-37.842, 144.912],
    [-37.835, 144.903],
    [-37.827, 144.9],
    [-37.8195, 144.906],
    [-37.8215, 144.918],
    [-37.8235, 144.93],
    [-37.8225, 144.942],
    [-37.8212, 144.952],
    [-37.8195, 144.962],
    [-37.8188, 144.968],
    [-37.821, 144.976],
    [-37.826, 144.984],
    [-37.833, 144.99],
    [-37.8372, 144.998],
    [-37.833, 145.007],
    [-37.823, 145.011],
    [-37.813, 145.007],
    [-37.804, 145.004],
    [-37.7975, 145.0],
    [-37.792, 145.01],
    [-37.788, 145.03],
  ],
  // The Maribyrnong, from the Yarra north past Footscray.
  [
    [-37.8195, 144.906],
    [-37.811, 144.909],
    [-37.802, 144.908],
    [-37.793, 144.906],
    [-37.787, 144.898],
    [-37.778, 144.893],
  ],
];

/** Parks as ellipses: centre [lat, lng] and radii in metres (east-west, north-south). */
export const PARKS = [
  { at: [-37.788, 144.951], rx: 650, ry: 850 },
  { at: [-37.784, 144.961], rx: 220, ry: 600 },
  { at: [-37.8055, 144.9715], rx: 200, ry: 250 },
  { at: [-37.8135, 144.9795], rx: 260, ry: 220 },
  { at: [-37.8105, 144.9545], rx: 140, ry: 150 },
  { at: [-37.83, 144.979], rx: 450, ry: 650 },
  { at: [-37.82, 144.984], rx: 380, ry: 280 },
  { at: [-37.845, 144.967], rx: 600, ry: 1100 },
  { at: [-37.785, 144.983], rx: 200, ry: 250 },
  { at: [-37.79, 145.005], rx: 500, ry: 450 },
];

/** Albert Park Lake, drawn as water on top of its park. */
export const LAKES = [{ at: [-37.845, 144.969], rx: 300, ry: 750 }];

/** The Hoddle Grid's corners: Flinders and Spencer, Flinders and Spring, then the La Trobe side. */
export const CBD_GRID = {
  sw: [-37.821, 144.9548],
  se: [-37.816, 144.972],
  ne: [-37.8092, 144.9689],
  nw: [-37.8142, 144.9517],
  long: 5,
  cross: 9,
};

/** Made-up first names. Each person also gets a made-up initial. */
export const NAMES = [
  "Ari",
  "Bea",
  "Cal",
  "Dani",
  "Eli",
  "Fern",
  "Gus",
  "Hana",
  "Ivy",
  "Jas",
  "Kit",
  "Lou",
  "Max",
  "Nell",
  "Oli",
  "Pip",
  "Rae",
  "Sam",
  "Tam",
  "Uma",
  "Vic",
  "Wes",
  "Xia",
  "Yun",
  "Zoe",
  "Abi",
  "Ben",
  "Cam",
  "Dee",
  "Eve",
  "Fai",
  "Gil",
  "Hal",
  "Ira",
  "Jo",
  "Kai",
];

export const INTERESTS = [
  { id: "running", en: "running", zh: "跑步" },
  { id: "coffee", en: "coffee", zh: "咖啡" },
  { id: "board-games", en: "board games", zh: "桌游" },
  { id: "live-music", en: "live music", zh: "现场音乐" },
  { id: "climbing", en: "climbing", zh: "攀岩" },
  { id: "cooking", en: "cooking", zh: "做饭" },
  { id: "books", en: "books", zh: "读书" },
  { id: "cycling", en: "cycling", zh: "骑行" },
  { id: "sketching", en: "sketching", zh: "速写" },
  { id: "photography", en: "photography", zh: "摄影" },
  { id: "film", en: "film", zh: "电影" },
  { id: "gardening", en: "gardening", zh: "园艺" },
];

/**
 * Made-up events. `start` is minutes from the demo's 2:00 pm (negative means
 * it has already started), `length` is in minutes. Each sits near its place.
 */
export const EVENTS = [
  { place: "carlton", start: -30, length: 180, en: "Board games afternoon", zh: "桌游下午" },
  { place: "carlton", start: 60, length: 120, en: "Chess in the park", zh: "公园下棋" },
  { place: "fitzroy", start: 120, length: 150, en: "Open mic", zh: "开放麦" },
  { place: "collingwood", start: 45, length: 120, en: "Pottery taster", zh: "陶艺体验课" },
  { place: "cbd", start: 30, length: 90, en: "Language exchange", zh: "语言交换" },
  { place: "cbd", start: 90, length: 90, en: "Sketch walk", zh: "速写散步" },
  { place: "southYarra", start: -60, length: 180, en: "Picnic in the gardens", zh: "花园野餐" },
  { place: "brunswick", start: 0, length: 120, en: "Book swap", zh: "换书会" },
  { place: "abbotsford", start: 150, length: 120, en: "Bouldering social", zh: "抱石聚会" },
  { place: "richmond", start: 270, length: 120, en: "Trivia night", zh: "知识问答之夜" },
  { place: "footscray", start: 60, length: 120, en: "Dumpling workshop", zh: "包饺子工作坊" },
  { place: "docklands", start: 15, length: 120, en: "Photo walk", zh: "摄影散步" },
  { place: "northcote", start: -15, length: 150, en: "Plant swap", zh: "植物交换会" },
  { place: "stKilda", start: -45, length: 120, en: "Beach clean-up", zh: "海滩清洁" },
  { place: "southMelbourne", start: 210, length: 120, en: "Jazz jam", zh: "爵士即兴" },
  { place: "prahran", start: 240, length: 150, en: "Film club", zh: "电影俱乐部" },
  { place: "northMelbourne", start: -20, length: 90, en: "Coffee walk", zh: "咖啡散步" },
  { place: "portMelbourne", start: 270, length: 60, en: "Sunset run", zh: "日落跑" },
];
