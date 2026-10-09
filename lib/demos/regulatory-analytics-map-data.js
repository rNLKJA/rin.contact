/**
 * Copy for /projects/regulatory-analytics-map, Rin's write-up of his analytics
 * work in the Prevention Team at Consumer and Business Services (CBS), plus the
 * strings for its concept demo. Every string is bilingual ({ en, zh }), en-AU
 * first, so no shared locale file is touched.
 *
 * Facts come only from what is already public on the site: the 'cbs' project
 * card in lib/projects-data.js and the 'cbs' role in lib/career-data.js. The
 * headline figures are read from that role at build time (see the page's
 * getStaticProps), so the two never drift apart. Nothing here comes from CBS
 * systems, reports or briefing material.
 *
 * The demo (components/demos/regulatory-analytics-map) is a concept
 * illustration. Its areas, populations, IRSD scores and counts are synthetic,
 * generated in the browser from a fixed seed, and it is not the system Rin
 * worked on.
 */

// Tech tags are proper nouns: single source, identical in every locale.
export const STACK = [
  "Power BI",
  "DAX",
  "Power Query",
  "Python",
  "SQL Server",
  "ArcGIS",
  "Time series",
  "Regression",
  "Clustering",
  "ABS API",
  "Data SA",
];

export const COPY = {
  metaTitle: {
    en: "CBS Intelligence: regulatory analytics from the ground up · Case study · rin.contact",
    zh: "CBS 情报分析：从零搭建的监管数据分析 · 案例 · rin.contact",
  },
  metaDescription: {
    en: "How Rin Huang built the first analytics capability in the Prevention Team at Consumer and Business Services, South Australia's consumer and business regulator, and what it changed. Includes a concept map with synthetic data.",
    zh: "黄孙创宇（Rin）在南澳消费者与商业服务局（CBS）预防组从零搭建数据分析能力的经过和成效。页面附有一个使用合成数据的概念地图演示。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Case study · Government analytics", zh: "案例 · 政府数据分析" },
  subtitle: {
    en: "Regulatory analytics from the ground up",
    zh: "从零搭建的监管数据分析",
  },
  tagline: {
    en: "At South Australia's consumer and business regulator, I built the Prevention Team's first analytics capability. It brought ABS, SA Health, ACCC and Data SA figures together into dashboards, reports and maps that senior management and the Minister's office used.",
    zh: "我在南澳的消费者与商业监管机构为预防组搭建了第一套数据分析能力，把 ABS、SA Health、ACCC 和 Data SA 的数据整合成仪表板、报告和地图，供高级管理层和部长办公室使用。",
  },
  status: {
    en: "ASO4 Intelligence & Coordination Officer, January 2025 to March 2026",
    zh: "ASO4 情报与协调官，2025 年 1 月至 2026 年 3 月",
  },
  notice: {
    en: "This is my own write-up. It repeats only what my public career summary already says, and it shares no internal data, reports or briefing material. The demo further down is a concept illustration with synthetic data. It is not the system I worked on, and it is not CBS data.",
    zh: "这是我个人的项目回顾，内容只限于我公开履历里已经写过的部分，不涉及任何内部数据、报告或简报材料。下方的演示是一个使用合成数据的概念示意，既不是我参与的系统，也不是 CBS 的数据。",
  },
  jump: { en: "Try the concept demo", zh: "试试概念演示" },

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "Consumer and Business Services (CBS) is South Australia's consumer and business regulator. It covers tobacco and vaping, building work, product safety and consumer law. I joined the Prevention Team in Compliance and Enforcement in January 2025, in my first full-time role, and the team had no analytics capability of its own.",
        zh: "消费者与商业服务局（CBS）是南澳的消费者与商业监管机构，管辖范围包括烟草与电子烟、建筑施工、产品安全和消费者法。2025 年 1 月，我加入合规与执法处的预防组，这是我的第一份全职工作。当时团队还没有属于自己的数据分析能力。",
      },
      {
        en: "A regulator cannot inspect everywhere at once, so it has to choose. The 1,500+ licensed sites in the tobacco and e-cigarette schedule had to be weighed against legislation, resourcing, strategy and politics. The reasons also had to hold up when senior management or the Minister's office asked for them, often within 24 to 72 hours.",
        zh: "监管机构不可能同时检查所有地方，只能有所取舍。烟草与电子烟检查排期里有 1,500 多个持牌场所，需要在立法、资源、战略和政治几方面的优先级之间权衡。当高级管理层或部长办公室问起时，这些理由还得站得住，而且常常要在 24 到 72 小时内给出。",
      },
    ],
  },

  what: {
    title: { en: "What I built", zh: "我做了什么" },
    intro: {
      en: "The work grew into four parts, and each one made the next easier to trust.",
      zh: "这份工作慢慢形成了四个部分，每一部分都让下一部分更值得信赖。",
    },
    steps: [
      {
        title: { en: "A risk-based schedule", zh: "基于风险的检查排期" },
        body: {
          en: "I designed the inspection scheduling framework for Tobacco and E-Cigarette Products Act compliance across 1,500+ licensed sites, and worked through the trade-offs with the Senior Management Team.",
          zh: "我为《烟草与电子烟产品法》合规设计了检查排期框架，覆盖 1,500 多个持牌场所，并与高级管理团队一起权衡其中的取舍。",
        },
      },
      {
        title: { en: "Data that lines up", zh: "对得上的数据" },
        body: {
          en: "I built extraction and validation workflows across 6+ sources, including ABS, SA Health, ACCC and Data SA. One Python check compared 3,000+ raw files against Salesforce records.",
          zh: "我在 6 个以上的数据源之间搭建了数据提取和校验流程，包括 ABS、SA Health、ACCC 和 Data SA。其中一项 Python 校验把 3,000 多份原始文件与 Salesforce 记录逐一核对。",
        },
      },
      {
        title: { en: "Analysis people can read", zh: "看得懂的分析" },
        body: {
          en: "I analysed 400+ inspections with time series, clustering and multivariate methods, wrote the quarterly Compliance and Enforcement report, and built Power BI dashboards and GIS maps for senior management.",
          zh: "我用时间序列、聚类和多元统计方法分析了 400 多次检查，撰写季度合规与执法报告，并为高级管理层制作 Power BI 仪表板和 GIS 地图。",
        },
      },
      {
        title: { en: "Answers on a deadline", zh: "按时给出的答案" },
        body: {
          en: "I answered 24+ urgent requests for ministerial briefings and Cabinet within 24 to 72 hours, and wrote the SOPs that keep each method repeatable.",
          zh: "我在 24 至 72 小时内完成了 24 项以上部长简报和内阁的紧急数据请求，并编写了标准作业程序（SOP），让每种方法都能重复使用。",
        },
      },
    ],
  },

  impact: {
    title: { en: "The impact", zh: "带来的改变" },
    intro: {
      en: "When I moved on in March 2026, the methods were written down as SOPs, so the team could keep producing the same numbers the same way. These are the figures from my career summary.",
      zh: "2026 年 3 月我离开时，这些方法都已经写成了 SOP，团队可以继续用同样的方法得出同样的数字。下面的数字来自我的履历。",
    },
    points: [
      {
        en: "Data-sharing MOUs with SAPOL, the Illicit Tobacco and E-cigarette Commissioner and federal regulators, a first for the team.",
        zh: "与 SAPOL、非法烟草与电子烟专员及联邦监管机构建立数据共享谅解备忘录（MOU），在团队内尚属首次。",
      },
      {
        en: "Dashboards and GIS maps that senior management and the Minister's office used for reporting.",
        zh: "高级管理层和部长办公室用于汇报的仪表板和 GIS 地图。",
      },
      {
        en: "An intelligence product, developed with colleagues, that detected fraudulent licence applications through document metadata and applicant network mapping.",
        zh: "与同事共同开发的一项情报产品，通过文件元数据和申请人关系网络识别伪造的执照申请。",
      },
    ],
  },

  build: {
    title: { en: "How it was built", zh: "怎么做的" },
    glance: [
      {
        k: { en: "Role", zh: "职位" },
        v: { en: "ASO4 Intelligence & Coordination Officer", zh: "ASO4 情报与协调官" },
      },
      {
        k: { en: "Team", zh: "团队" },
        v: { en: "Prevention Team, Compliance & Enforcement", zh: "合规与执法处 预防组" },
      },
      {
        k: { en: "Period", zh: "时间" },
        v: { en: "Jan 2025 to Mar 2026", zh: "2025 年 1 月至 2026 年 3 月" },
      },
      {
        k: { en: "Read by", zh: "使用者" },
        v: {
          en: "Senior management and the Minister's office",
          zh: "高级管理层和部长办公室",
        },
      },
    ],
    body: [
      {
        en: "Most of the early work was plumbing. Before any chart could be trusted, a site had to mean the same thing in every source, so I wrote the extraction and validation steps first and checked the counts against the system of record.",
        zh: "前期的工作大多是在铺管道。图表要可信，同一个场所在每个数据源里就得指同一个对象，所以我先写好数据提取和校验步骤，再把数量和记录系统逐一核对。",
      },
      {
        en: "The analysis itself used plain, explainable methods. Time series showed the trends, clustering grouped similar sites, and regression put a number on a relationship when one was needed. Power BI and DAX carried the dashboards, and ArcGIS carried the maps.",
        zh: "分析本身用的是朴素、讲得清楚的方法：用时间序列看趋势，用聚类把相似的场所归到一起，需要量化某种关系时再用回归。仪表板用 Power BI 和 DAX，地图用 ArcGIS。",
      },
      {
        en: "I wrote the methods up as SOPs, so the next urgent request could be answered the same way by whoever picked it up.",
        zh: "我把这些方法写成了 SOP，下一次紧急请求不管由谁接手，都能用同样的方法回答。",
      },
    ],
  },

  demo: {
    title: {
      en: "Concept demo: a regulatory map in miniature",
      zh: "概念演示：缩小版的监管地图",
    },
    notice: {
      en: "Concept illustration with synthetic data. The 24 areas, their populations, IRSD scores and counts are generated in your browser from a fixed seed. They are not real councils, not CBS data and not the system I worked on at CBS.",
      zh: "这是使用合成数据的概念示意。下面 24 个区域的人口、IRSD 分数和各项数量都由你的浏览器按固定种子生成，不是真实的地方政府区域，不是 CBS 的数据，也不是我在 CBS 参与的系统。",
    },
    intro: {
      en: "A public-data version of this idea would join ABS SEIFA scores and adult population by local government area with published counts of licensed gaming venues and machines. SEIFA's IRSD is an index where a lower score means more disadvantage. The demo walks the same steps with made-up areas. Start with raw counts, switch to a rate per 10,000 adults, then look at how far each area sits from the trend line.",
      zh: "如果用公开数据来做，这个想法会把各地方政府区域的 ABS SEIFA 分数和成年人口，与公开发布的持牌博彩场所数和博彩机数合在一起。SEIFA 中的 IRSD 是一个指数，分数越低代表越弱势。演示用虚构的区域走一遍同样的步骤：先看原始数量，再换成每万名成年人的比率，最后看每个区域离趋势线有多远。",
    },
  },

  learned: {
    title: { en: "What I learned", zh: "我的收获" },
    body: [
      {
        en: "The analysis was rarely the slow part. Agreeing on what a number meant, checking that two systems counted the same thing and writing the method down took most of the time. That work paid back every time a request arrived with a 24-hour deadline.",
        zh: "分析本身很少是最慢的环节。真正花时间的是就一个数字的含义达成一致、核对两个系统是否在数同一样东西，再把方法写下来。每当有请求要求 24 小时内答复时，这些功夫都会得到回报。",
      },
      {
        en: "I also learned to show the denominator. A raw count usually tracks population, so a map of counts mostly shows where people live. A rate, and the gap from what you would expect, start to say something about risk. The demo above is a small version of that lesson.",
        zh: "我还学会了把分母摆出来。原始数量通常跟着人口走，所以一张数量地图主要显示的是人住在哪里。换成比率，再看与预期的差距，才开始说明风险在哪里。上面的演示就是这个道理的缩小版。",
      },
    ],
  },

  footerNote: {
    en: "The role itself, with the same figures, is on my career page.",
    zh: "这份工作的完整经历和同样的数字也写在我的履历页上。",
  },
  career: { en: "Career", zh: "履历" },
};

/** Region names for the synthetic tile map. Codes (N1, C2 ...) are locale-neutral. */
export const REGIONS = {
  north: { en: "North", zh: "北区" },
  west: { en: "West", zh: "西区" },
  central: { en: "Central", zh: "中区" },
  east: { en: "East", zh: "东区" },
  south: { en: "South", zh: "南区" },
  regional: { en: "Regional", zh: "乡郊" },
};

/** Strings for the demo itself. Templates use {name} placeholders (lib/fill.js). */
export const DEMO = {
  synthetic: { en: "Synthetic data · seed {seed}", zh: "合成数据 · 种子 {seed}" },
  areaName: { en: "{region} {n}", zh: "{region} {n}" },

  measure: { en: "Measure", zh: "指标" },
  measures: {
    venues: { en: "Gaming venues", zh: "博彩场所" },
    machines: { en: "Gaming machines", zh: "博彩机" },
  },
  view: { en: "Shade the map by", zh: "地图着色依据" },
  views: {
    count: { en: "Count", zh: "数量" },
    rate: { en: "Per 10,000 adults", zh: "每万名成年人" },
    gap: { en: "Gap from trend", zh: "偏离趋势" },
  },
  small: {
    en: "Leave out areas with fewer than 10,000 adults",
    zh: "排除成年人口不足 1 万的区域",
  },
  smallHint: {
    en: "Rates in small areas jump around, because one venue more or less moves them a lot.",
    zh: "小区域的比率波动很大，多一家或少一家场所都会让数字明显变化。",
  },
  reshuffle: { en: "New synthetic sample", zh: "换一组合成数据" },
  reset: { en: "Back to seed {seed}", zh: "回到种子 {seed}" },
  reshuffled: {
    en: "New synthetic sample, seed {seed}.",
    zh: "已换一组合成数据，种子 {seed}。",
  },
  selectedStatus: { en: "Selected {name}.", zh: "已选择{name}。" },

  mapLabel: {
    en: "Tile map of 24 synthetic areas: {measure}, {view}",
    zh: "24 个合成区域的方格地图：{measure}，{view}",
  },
  mapHelp: {
    en: "Each square is one area, the same size whatever its population, and the layout is a sketch rather than a real map. Use the arrow keys to move between areas.",
    zh: "每个方格代表一个区域，不论人口多少都画成一样大，布局只是示意，并非真实地图。可用方向键在区域之间移动。",
  },
  legendLow: { en: "Lower", zh: "较低" },
  legendHigh: { en: "Higher", zh: "较高" },
  legendBelow: { en: "Below trend", zh: "低于趋势" },
  legendAbove: { en: "Above trend", zh: "高于趋势" },
  legendFlag: {
    en: "Red outline and ▲: more than 1.5 standard deviations above the trend line",
    zh: "红色边框和 ▲：比趋势线高出 1.5 个标准差以上",
  },
  legendExcluded: {
    en: "Dashed: left out of the trend line",
    zh: "虚线：未纳入趋势线",
  },

  // Readable values, by measure and view.
  count: {
    venues: { en: "{n} venues", zh: "{n} 家场所" },
    machines: { en: "{n} machines", zh: "{n} 台博彩机" },
  },
  rate: {
    venues: { en: "{r} venues per 10,000 adults", zh: "每万名成年人 {r} 家场所" },
    machines: { en: "{r} machines per 10,000 adults", zh: "每万名成年人 {r} 台博彩机" },
  },
  gapValue: { en: "{z} SD from trend", zh: "偏离趋势 {z} 个标准差" },
  gapShort: { en: "{z} SD", zh: "{z} 个标准差" },
  tileLabel: { en: "{name}, {value}, IRSD {irsd}", zh: "{name}，{value}，IRSD {irsd}" },
  tileAbove: { en: ", above the trend line", zh: "，高于趋势线" },
  tileExcluded: { en: ", left out of the trend line", zh: "，未纳入趋势线" },

  selected: { en: "Selected area", zh: "所选区域" },
  fields: {
    adults: { en: "Adults", zh: "成年人口" },
    irsd: { en: "IRSD score", zh: "IRSD 分数" },
    venues: { en: "Venues", zh: "场所" },
    machines: { en: "Machines", zh: "博彩机" },
    rate: { en: "Per 10,000 adults", zh: "每万名成年人" },
    expected: { en: "Trend line predicts", zh: "趋势线预测" },
    gap: { en: "Gap from trend", zh: "偏离趋势" },
  },
  verdict: {
    above: {
      en: "Above what its IRSD score predicts. Worth a closer look, but not a finding.",
      zh: "高于其 IRSD 分数的预测值。值得进一步查看，但不构成结论。",
    },
    below: {
      en: "Below what its IRSD score predicts.",
      zh: "低于其 IRSD 分数的预测值。",
    },
    near: {
      en: "Close to what its IRSD score predicts.",
      zh: "与其 IRSD 分数的预测值接近。",
    },
    excluded: {
      en: "Left out of the trend line because it has fewer than 10,000 adults.",
      zh: "成年人口不足 1 万，未纳入趋势线。",
    },
  },

  scatter: { en: "Rate against disadvantage", zh: "比率与弱势程度" },
  yAxis: {
    venues: { en: "Venues per 10,000 adults", zh: "每万名成年人的场所数" },
    machines: { en: "Machines per 10,000 adults", zh: "每万名成年人的博彩机数" },
  },
  xAxis: {
    en: "IRSD score (lower means more disadvantaged)",
    zh: "IRSD 分数（越低越弱势）",
  },
  scatterDesc: {
    en: "Scatter plot of {n} areas in the fit, {measure} per 10,000 adults against IRSD score, with a straight trend line. {fit} The selected area is {name}.",
    zh: "散点图：纳入拟合的 {n} 个区域，纵轴为每万名成年人的{measure}，横轴为 IRSD 分数，并画有一条直线趋势线。{fit}所选区域是{name}。",
  },
  measureLower: {
    venues: { en: "venues", zh: "场所数" },
    machines: { en: "machines", zh: "博彩机数" },
  },
  fitMore: {
    en: "In this sample, each 100-point drop in IRSD goes with {b} more {measure} per 10,000 adults (95% interval {lo} to {hi}). The line explains {r2} of the variation between areas.",
    zh: "在这组样本里，IRSD 每下降 100 分，每万名成年人的{measure}平均多 {b}（95% 区间 {lo} 至 {hi}）。这条线解释了区域之间 {r2} 的差异。",
  },
  fitFewer: {
    en: "In this sample, each 100-point drop in IRSD goes with {b} fewer {measure} per 10,000 adults (95% interval {lo} to {hi}). The line explains {r2} of the variation between areas.",
    zh: "在这组样本里，IRSD 每下降 100 分，每万名成年人的{measure}平均少 {b}（95% 区间 {lo} 至 {hi}）。这条线解释了区域之间 {r2} 的差异。",
  },
  stats: {
    n: { en: "Areas in the fit", zh: "纳入拟合的区域" },
    effect: { en: "Per 100-point IRSD drop", zh: "IRSD 每降 100 分" },
    r2: { en: "R²", zh: "R²" },
    flagged: { en: "Above the trend", zh: "高于趋势" },
  },
  caveat: {
    en: "A trend line shows association, not cause. Disadvantage, venue numbers and population tend to move together, and a real analysis would test other explanations before anyone acted on it.",
    zh: "趋势线只说明相关，不代表因果。弱势程度、场所数量和人口往往一起变化，真正的分析在任何人据此行动之前，都会先检验其他解释。",
  },

  compare: { en: "Same data, three questions", zh: "同一份数据，三个问题" },
  compareCols: {
    count: { en: "Highest count", zh: "数量最多" },
    rate: { en: "Highest rate", zh: "比率最高" },
    gap: { en: "Furthest above trend", zh: "高于趋势最多" },
  },
  compareNote: {
    en: "Counts mostly follow population. Rates and the gap from trend can point somewhere else, so the question you ask shapes the answer. Choose an area to select it on the map.",
    zh: "数量主要跟着人口走。比率和偏离趋势可能指向别的区域，所以问什么问题决定了得到什么答案。点选任一区域，即可在地图上选中它。",
  },
  compareSelect: { en: "Select {name}, {value}", zh: "选择{name}，{value}" },

  table: { en: "Show the synthetic table", zh: "查看合成数据表" },
  tableCaption: {
    en: "All 24 synthetic areas for the chosen measure",
    zh: "所选指标下全部 24 个合成区域",
  },
  columns: {
    area: { en: "Area", zh: "区域" },
    adults: { en: "Adults", zh: "成年人口" },
    irsd: { en: "IRSD", zh: "IRSD" },
    count: { en: "Count", zh: "数量" },
    rate: { en: "Per 10k", zh: "每万人" },
    expected: { en: "Trend", zh: "趋势预测" },
    gap: { en: "Gap (SD)", zh: "偏差（标准差）" },
  },
  notInFit: { en: "not in fit", zh: "未纳入" },

  helpline: {
    en: "If gambling is affecting you or someone close to you, the National Gambling Helpline is free and confidential on 1800 858 858.",
    zh: "如果博彩正在影响你或你身边的人，可拨打免费且保密的全国博彩求助热线 1800 858 858。",
  },
};
