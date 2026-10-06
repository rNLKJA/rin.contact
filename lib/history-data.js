/**
 * Five versions of rin.contact, for /info/history. Same pattern as
 * coursework-data: locale-neutral facts at the top level, words under en / zh.
 *
 * Every claim here comes from the version's own branch (README, package.json,
 * commit messages) or from the Wayback Machine. Where the record is thin, the
 * copy says so instead of guessing. Screenshots and where they came from:
 *   v1  Rin's own preview image in the v1 README (March 2022), cropped to the
 *       top of the page. The Wayback capture from December 2021 has the HTML
 *       shell only, because its scripts were never archived.
 *   v2  The v2 branch rebuilt locally (Node 16, Create React App 5) in Oct 2026.
 *   v3  The v3 branch rebuilt locally the same way. Wayback holds no capture.
 *   v4  Wayback Machine capture of rin.contact, 15 May 2024.
 *   v5  rin.contact in production, October 2026.
 * lib/history-check.js guards the shape, the image sizes and the site rules.
 */

const wayback = (ts) => ({
  ts,
  url: `https://web.archive.org/web/${ts}/https://rin.contact/`,
  // The if_ form drops the archive toolbar but still rewrites asset URLs.
  frameUrl: `https://web.archive.org/web/${ts}if_/https://rin.contact/`,
});

const tree = (branch) => `https://github.com/rNLKJA/rin.contact/tree/${branch}`;

export const IMAGE_SOURCES = ["readme", "wayback", "local-build", "production"];

export const VERSIONS = [
  {
    id: "v1",
    version: "v1",
    from: "2021-10",
    to: "2022-03",
    stack: [
      "Create React App 4",
      "React 17",
      "TypeScript",
      "MUI 5",
      "framer-motion",
      "GitHub Pages",
    ],
    image: {
      src: "/images/history/v1-desktop.webp",
      w: 1389,
      h: 450,
      source: "readme",
      capturedAt: "2022-03",
    },
    archive: null,
    sourceUrl: tree("v1"),
    en: {
      title: "A first React profile",
      dates: "Oct 2021 to Mar 2022",
      changed:
        "The first rin.contact was one profile page built with Create React App and TypeScript. It held a short bio and a longer profile of my study and projects.",
      thinking:
        "I was a data science student at Melbourne and wanted a page that could grow into my CV and blog. The README admits I didn't know how long that would take, and it walks through the GitHub Pages and custom domain setup so anyone could reuse it. Chinese support sat on the to-do list with a note that I might be too lazy to add it.",
      alt: "v1 profile page from the README: a dark starry background, a left card with a round photo, the name Rin / Sunchuangyu Huang and social icons, and a right panel titled More About Me with a row of skill icons.",
    },
    zh: {
      title: "第一个 React 个人主页",
      dates: "2021 年 10 月至 2022 年 3 月",
      changed:
        "第一版是一个用 Create React App 和 TypeScript 写的个人主页，放了简介和学习、项目经历。",
      thinking:
        "当时我在墨大读数据科学，想把它慢慢做成简历加博客。README 里写着不知道要做多久，还把 GitHub Pages 和自定义域名的配置写成了教程，方便别人拿去改。中英双语在待办清单上，旁边备注说可能懒得做。",
      alt: "v1 个人主页（来自 README 截图）：深色星空背景，左边是圆形头像、名字和社交图标的卡片，右边是标题为 More About Me 的面板和一排技能图标。",
    },
  },
  {
    id: "v2",
    version: "v2",
    from: "2022-12",
    to: "2022-12",
    stack: [
      "Create React App 5",
      "React 18",
      "React Router 6",
      "Tailwind CSS 3",
      "i18next",
      "MUI 5",
      "GitHub Pages",
    ],
    image: {
      src: "/images/history/v2-desktop.webp",
      mobileSrc: "/images/history/v2-mobile.webp",
      w: 1440,
      h: 900,
      source: "local-build",
      capturedAt: "2026-10",
    },
    archive: null,
    sourceUrl: tree("v2"),
    en: {
      title: "Minimalist, and a first try at Chinese",
      dates: "Dec 2022",
      changed:
        "Version two moved to React 18 and added Tailwind CSS, React Router and i18next with English and Chinese dictionaries. Content data, translations and page components each got their own folder.",
      thinking:
        "The working branch was named for a minimalist look. In the README, the note on Chinese support changed to 'Ok I'm working on it'.",
      alt: "v2 home page: blue line-icon navigation across the top, a 'Hello! This is Rin' greeting on the left and a photo card with social icons on the right.",
    },
    zh: {
      title: "更简洁，也第一次试着做中文",
      dates: "2022 年 12 月",
      changed:
        "第二版升级到 React 18，加了 Tailwind CSS 和 React Router，还用 i18next 放了中英两套词典。内容数据、翻译和页面组件各自分了文件夹。",
      thinking:
        "分支名写的是 minimalist，方向是做得更简洁。README 里那条中文支持的备注，从“可能懒得做”改成了“在做了”。",
      alt: "v2 首页：顶部是蓝色线条图标导航，左边写着 Hello! This is Rin，右边是带社交图标的照片卡片。",
    },
  },
  {
    id: "v3",
    version: "v3",
    from: "2023-04",
    to: "2023-04",
    stack: ["Create React App 5", "React 18", "MUI 5", "Tailwind CSS", "GitHub Pages"],
    image: {
      src: "/images/history/v3-desktop.webp",
      mobileSrc: "/images/history/v3-mobile.webp",
      w: 1440,
      h: 900,
      source: "local-build",
      capturedAt: "2026-10",
    },
    archive: null,
    sourceUrl: tree("v3"),
    en: {
      title: "One page",
      dates: "Apr 2023",
      changed:
        "Version three shrank the site to a single portfolio page with an elevator pitch, projects and skills.",
      thinking:
        "The source is eleven files and the commits cover two days in April 2023. I didn't write down why at the time, so I'll leave it there.",
      alt: "v3 single page: a grey textured banner with a black-and-white portrait and the name Rin Huang, then an introduction on the left and lists of skills on the right.",
    },
    zh: {
      title: "收成一页",
      dates: "2023 年 4 月",
      changed: "第三版把网站收成一个单页作品集，只有一句话介绍、项目和技能。",
      thinking:
        "源码一共十一个文件，提交集中在 2023 年 4 月的两天里。当时没有留下为什么这么改的记录，这里就不补了。",
      alt: "v3 单页：灰色纹理横幅上是黑白肖像和 Rin Huang 的名字，下面左边是自我介绍，右边是几列技能清单。",
    },
  },
  {
    id: "v4",
    version: "v4",
    from: "2023-12",
    to: "2024-05",
    stack: ["Next.js 14", "Pages Router", "React 18", "MUI 5", "Tailwind CSS 3", "react-icons"],
    image: {
      src: "/images/history/v4-desktop.webp",
      mobileSrc: "/images/history/v4-mobile.webp",
      w: 1440,
      h: 900,
      source: "wayback",
      capturedAt: "2024-05-15",
    },
    archive: wayback("20240515114811"),
    sourceUrl: tree("v4"),
    en: {
      title: "Pawsibly Rin on Next.js",
      dates: "Dec 2023 to May 2024, online until Mar 2026",
      changed:
        "Version four was the first build on Next.js. It added real pages beyond the home page, including a blog and a data science learning path organised by week and day.",
      thinking:
        "The README calls it the fourth rebuild after months of planning, aimed at showing my data science skills and publishing what I cared about on a base that would be easy to extend. The home page was titled Pawsibly Rin and full of cat puns, which is where today's guide comes from. It then stayed online unchanged from mid 2024 to early 2026.",
      alt: "v4 home page: an rNLKJA logo and icon navigation, a large monospace headline about data analytics with two buttons, and an illustration of a girl with glasses beside a cat.",
    },
    zh: {
      title: "Next.js 上的 Pawsibly Rin",
      dates: "2023 年 12 月至 2024 年 5 月，一直在线到 2026 年 3 月",
      changed:
        "第四版第一次用 Next.js 来写，除了首页还有博客，和一条按周、按天排的数据科学学习路线。",
      thinking:
        "README 说这是想了好几个月之后的第四次重做，重点放在展示数据科学能力和发自己想写的内容，希望底子好扩展。首页标题叫 Pawsibly Rin，文案里全是猫的双关，现在带路的小猫就是从这里来的。之后它从 2024 年年中一直挂到 2026 年初，没再改过。",
      alt: "v4 首页：左上角是 rNLKJA 标志，右上角是图标导航，中间是关于数据分析的等宽字体大标题和两个按钮，下面是戴眼镜的女孩和一只猫的插画。",
    },
  },
  {
    id: "v5",
    version: "v5",
    from: "2026-03",
    to: null,
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 3",
      "Bitcount Prop Double",
      "DM Sans",
      "remark",
      "KaTeX",
      "Vercel",
    ],
    image: {
      src: "/images/history/v5-desktop.webp",
      mobileSrc: "/images/history/v5-mobile.webp",
      w: 1440,
      h: 900,
      source: "production",
      capturedAt: "2026-10",
    },
    // The March 2026 capture shows the first Nothing-style design, still on Next.js 14.
    archive: wayback("20260330075026"),
    sourceUrl: tree("v5"),
    en: {
      title: "Nothing-inspired, in two languages",
      dates: "Mar 2026 to now",
      changed:
        "In March 2026 I started a new design inspired by Nothing OS, with black, white and one red dot. In June the site moved to Next.js 16 and React 19 and gained a blog, and by the end of that month every page had a Chinese version. Since then I have added a resume built from one shared data source and my revived university coursework.",
      thinking:
        "My commit message at the time simply said I love the Nothing style. The Chinese support from the v1 to-do list finally shipped five versions later. Claude built the blog over a weekend, with the decisions staying mine.",
      alt: "v5 home page: a white Nothing-style layout with the name Rin Huang in large pixel type, a status pill, a dotted background and red accents beside the numbers on the right.",
    },
    zh: {
      title: "参考 Nothing，中英双语",
      dates: "2026 年 3 月至今",
      changed:
        "2026 年 3 月开始重新设计，参考 Nothing OS，只用黑、白和一个红点。6 月升级到 Next.js 16 和 React 19，同时上线了博客，到 6 月底每个页面都有了中文版。之后又加了从同一份数据生成的简历页，还有重新上线的大学课程作业。",
      thinking:
        "当时的提交信息直接写着 I love nothing style。v1 待办清单上的中英双语，到第五版才做完。博客是 Claude 在一个周末里搭起来的，做什么、怎么做由我决定。",
      alt: "v5 首页：白色的 Nothing 风格版面，大号像素字写着 Rin Huang，旁边有状态标签、点阵背景，右侧数字带红色点缀。",
    },
  },
];

/** The longer timeline under the deck. Dates are ISO prefixes. */
export const MILESTONES = [
  {
    date: "2021-10",
    en: "First commit of the React profile page.",
    zh: "React 个人主页的第一次提交。",
  },
  {
    date: "2022-03",
    en: "The v1 README becomes a guide to reusing the site.",
    zh: "v1 的 README 写成了一份复用教程。",
  },
  {
    date: "2022-12",
    en: "v2 adds English and Chinese dictionaries with i18next.",
    zh: "v2 用 i18next 加了中英两套词典。",
  },
  { date: "2023-04", en: "v3 trims the site to one page.", zh: "v3 把网站收成一页。" },
  {
    date: "2023-12-29",
    en: "v4 arrives on Next.js 14 as Pawsibly Rin.",
    zh: "v4 换成 Next.js 14，标题叫 Pawsibly Rin。",
  },
  { date: "2024-02", en: "The first blog post goes up.", zh: "发了第一篇博客。" },
  {
    date: "2024-05",
    to: "2026-03",
    en: "A quiet stretch. The v4 site stays online without changes.",
    zh: "安静的一段时间，v4 一直在线，没有改动。",
  },
  {
    date: "2026-03-08",
    en: "Work starts on the Nothing-inspired redesign (5.0).",
    zh: "开始做参考 Nothing 的新设计（5.0）。",
  },
  {
    date: "2026-03-13",
    en: "The /fun side pages and the /ds profile pages arrive.",
    zh: "加了 /fun 小页面和 /ds 数据科学主页。",
  },
  {
    date: "2026-06-07",
    en: "The blog returns, with an RSS feed.",
    zh: "博客重新上线，带 RSS 订阅。",
  },
  {
    date: "2026-06-08",
    en: "Next.js 16, React 19 and a Chinese version of the site.",
    zh: "升级到 Next.js 16 和 React 19，网站有了中文版。",
  },
  {
    date: "2026-07",
    en: "A performance pass trims what each page loads.",
    zh: "做了一轮性能优化，每个页面加载的内容更少了。",
  },
  {
    date: "2026-10",
    en: "The resume, the coursework portfolio and the order system, then this guide and history page (5.26.0).",
    zh: "加了简历页、课程作业集和订单系统，然后是这个导览和历史页（5.26.0）。",
  },
];
