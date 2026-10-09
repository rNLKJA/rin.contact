/**
 * Copy for /projects/professional-standards-reporting, Rin's write-up of his
 * work as a Senior Data Analyst (ASO7) in the Ethical and Professional
 * Standards Branch (EPSB) of South Australia Police, and for its concept demo
 * (components/demos/professional-standards-reporting). Every string is
 * bilingual ({ en, zh }), en-AU first, so no shared locale file is touched.
 *
 * Facts repeat only what the 'sapol-epsb' card (lib/projects-data.js) and the
 * 'sapol' role (lib/career-data.js) already say in public. The reports, data
 * and systems are internal, so the page names no system, shows no figure from
 * internal data and describes the kind of work only. The demo is a generic
 * concept illustration on synthetic data. Its endpoint names are made up.
 *
 * Templates use {name} placeholders, filled by lib/fill.js.
 */

// Tech tags are proper nouns: single source, identical in every locale. They
// match the card's stack.
export const STACK = [
  "Python",
  "Power BI",
  "SQL Server",
  "FastAPI",
  "Vue",
  "Statistical modelling",
];

export const COPY = {
  metaTitle: {
    en: "Professional standards reporting at SAPOL EPSB · Case study · rin.contact",
    zh: "SAPOL EPSB 职业标准报告 · 案例 · rin.contact",
  },
  metaDescription: {
    en: "How Rin Huang produces quarterly statistical reports, reviews workflows and builds API tooling as a Senior Data Analyst in the Ethical and Professional Standards Branch of South Australia Police. Includes a concept demo on synthetic data.",
    zh: "黄孙创宇（Rin）在南澳大利亚警察局职业道德与专业标准处担任高级数据分析师，负责季度统计报告、流程审查和 API 工具开发。页面附有一个使用合成数据的概念演示。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Case study · Government analytics", zh: "案例 · 政府数据分析" },
  title: { en: "EPSB Analytics", zh: "EPSB Analytics" },
  fullName: {
    en: "SAPOL · Professional standards reporting and tooling",
    zh: "SAPOL · 职业标准报告与工具",
  },
  tagline: {
    en: "I turn professional standards data into quarterly reports that can be reproduced and checked, and I build the tools that make that reporting repeatable.",
    zh: "我把职业标准相关的数据整理成能够复现、能够核查的季度报告，同时搭建让这些报告可以重复产出的工具。",
  },
  status: {
    en: "Senior Data Analyst (ASO7), South Australia Police, since March 2026",
    zh: "南澳大利亚警察局 ASO7 高级数据分析师，2026 年 3 月至今",
  },
  notice: {
    en: "This page describes the kind of work only. The reports, data and systems belong to SAPOL and stay internal, so nothing on this page comes from them. The demo further down is a concept illustration built on synthetic data. It is not the real system, and it uses none of its figures or endpoint names.",
    zh: "这个页面只介绍工作的类型。报告、数据和系统都属于 SAPOL，仅限内部使用，所以页面上没有任何内容取自其中。下方的演示是用合成数据做的概念示意，不是真实系统，也没有用到真实系统的任何数字或接口名称。",
  },
  jump: { en: "Try the concept demo", zh: "试试概念演示" },

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "The Ethical and Professional Standards Branch looks after complaints, integrity and professional standards for South Australia Police. Its numbers go to executives and oversight bodies, so they need to be right, comparable from one quarter to the next, and honest about how much they can say.",
        zh: "职业道德与专业标准处（EPSB）负责南澳大利亚警察局的投诉处理、廉政和职业标准。处里的数字要交给管理层和监督机构，所以必须准确，每个季度之间要能比较，也要老实交代这些数字到底能说明多少。",
      },
      {
        en: "Counts like these are small enough to move around by chance. A quarter can look worse than the one before without anything having changed, and a real shift can hide inside ordinary variation. A report that treats every movement as news, or one that misses a genuine change, helps nobody.",
        zh: "这类计数不大，单靠偶然就会上下波动。某个季度看起来比上个季度差，背后可能什么都没变，而真实的变化也可能藏在正常的起伏里。把每一次波动都当成新闻的报告没有用，漏掉真实变化的报告也一样没有用。",
      },
      {
        en: "The records also sit behind a large complaint-management system. Checking them one screen at a time is slow, and it is hard to show afterwards how a figure was reached.",
        zh: "这些记录还存放在一个庞大的投诉管理系统里。一屏一屏地手工核对很慢，事后也很难说清某个数字是怎么得出来的。",
      },
    ],
  },

  work: {
    title: { en: "What the work covers", zh: "工作内容" },
    items: [
      {
        title: { en: "Quarterly statistical reports", zh: "季度统计报告" },
        body: {
          en: "I produce the quarterly Use of Force and Vehicle Pursuit statistical reports for SAPOL executives. Each one has a written method, so every quarter can be reproduced and checked.",
          zh: "我按季度为 SAPOL 管理层编制警务使用武力与车辆追缉统计报告。每份报告都附有书面方法，每个季度的结果都能复现和核查。",
        },
      },
      {
        title: { en: "Workflow review", zh: "流程审查" },
        body: {
          en: "I led an end-to-end review of the branch's complaint administration workflow, from receipt to file closure. It was built from team interviews and the team's own procedure notes, and it gave branch leadership findings and recommendations.",
          zh: "我主导了处内投诉行政流程的全流程审查，从受理一直看到结案。材料来自团队访谈和团队自己的操作笔记，最后向处领导提交了审查结论和改进建议。",
        },
      },
      {
        title: { en: "Expiation notice analysis", zh: "罚款通知分析" },
        body: {
          en: "I analysed a full financial year of hand-issued expiation notices for the Expiation Notice Branch. The pipeline in Python and Power BI is reproducible, and the analysis reports only what the data can support.",
          zh: "我为罚款通知处（Expiation Notice Branch）分析了一个完整财年的人工开具罚款通知。Python 与 Power BI 搭建的流程可以复现，分析也只报告数据能够支撑的结论。",
        },
      },
      {
        title: { en: "Complaints API client", zh: "投诉系统 API 客户端" },
        body: {
          en: "I built a Python client and a web console for the complaint-management system's REST APIs. They cover more than 1,100 endpoints, so records can be queried and checked by script rather than by hand.",
          zh: "我为投诉管理系统的 REST API 编写了 Python 客户端和网页控制台，覆盖 1,100 多个接口，记录的查询和核对改由脚本完成，不再依赖手工操作。",
        },
      },
    ],
  },

  impact: {
    title: { en: "Impact", zh: "带来的变化" },
    glance: [
      {
        value: { en: "Quarterly", zh: "每季度" },
        label: {
          en: "Executive reports with a written method behind every figure",
          zh: "交给管理层的报告，每个数字背后都有书面方法",
        },
      },
      {
        value: { en: "1,100+", zh: "1,100+" },
        label: {
          en: "Complaints API endpoints reachable through one Python client",
          zh: "个投诉系统接口，可以通过同一个 Python 客户端调用",
        },
      },
      {
        value: { en: "1 FY", zh: "1 个财年" },
        label: {
          en: "Of hand-issued expiation notices analysed in a reproducible pipeline",
          zh: "的人工罚款通知，用可复现的流程完成分析",
        },
      },
      {
        value: { en: "End to end", zh: "全流程" },
        label: {
          en: "Complaint administration reviewed from receipt to file closure",
          zh: "投诉行政流程从受理到结案的完整审查",
        },
      },
    ],
    body: [
      {
        en: "The common thread is that a number should be traceable. When a figure in an executive report can be rebuilt from its method and its data, a question about it becomes a quick check rather than a long debate. When records can be pulled by script, the same check can run again next quarter without anyone redoing it by hand.",
        zh: "这些工作有一条共同的线：每个数字都应该能追溯。管理层报告里的数字只要能按方法和数据重新算出来，对它的疑问就只需要核对一下，不必争论半天。记录能用脚本取出来，下个季度就能再跑一遍同样的核对，不用有人再手工做一次。",
      },
      {
        en: "The expiation notice analysis follows the same habit. It reports only what the data can support, so the people deciding what to do next know how much weight each finding can carry. The workflow review starts from the same place for process. It was built from the team's own interviews and procedure notes, so its recommendations begin with how the work is actually done.",
        zh: "罚款通知分析也遵循同样的习惯。它只报告数据能够支撑的结论，这样做决定的人知道每条结论能承担多大的分量。流程审查在流程层面也是这个思路。它以团队自己的访谈和操作笔记为基础，所以提出的建议从工作的实际做法出发。",
      },
    ],
  },

  build: {
    title: { en: "How it is built", zh: "怎么做的" },
    glance: [
      {
        k: { en: "Reporting", zh: "报告" },
        v: { en: "Python, SQL and Power BI", zh: "Python、SQL 与 Power BI" },
      },
      {
        k: { en: "Tooling", zh: "工具" },
        v: {
          en: "Python client, FastAPI and Vue console",
          zh: "Python 客户端，FastAPI 与 Vue 控制台",
        },
      },
      {
        k: { en: "Method", zh: "方法" },
        v: { en: "Statistical modelling, written down", zh: "统计建模，并写成文档" },
      },
      {
        k: { en: "Team", zh: "团队" },
        v: { en: "Intelligence & Probity Unit", zh: "情报与廉政组" },
      },
    ],
    body: [
      {
        en: "The reporting runs as code rather than as a series of manual steps. Python does the cleaning and the statistics, and Power BI carries the visuals that executives read. A written method sits next to each report, so a quarter can be rerun and the result checked rather than taken on trust.",
        zh: "报告以代码的形式运行，不靠一连串手工步骤。Python 负责清洗数据和统计计算，Power BI 负责管理层看到的图表。每份报告旁边都有一份书面方法，任何一个季度都能重新跑一遍，结果可以核查，而不是只能相信。",
      },
      {
        en: "The API client started from a simple point. Writing a separate function for each of more than 1,100 endpoints would never keep up, so the client gives them one consistent interface. The web console, built with FastAPI and Vue, puts the same reach in front of colleagues who do not write Python.",
        zh: "API 客户端的出发点很简单。给 1,100 多个接口逐个手写函数，永远也跟不上，所以客户端给它们提供了一套统一的调用方式。用 FastAPI 和 Vue 做的网页控制台，又把同样的能力交给了不写 Python 的同事。",
      },
    ],
  },

  role: {
    title: { en: "My role", zh: "我的角色" },
    body: [
      {
        en: "I am a Senior Data Analyst (ASO7) in the Intelligence & Probity Unit of the Ethical and Professional Standards Branch, and I started in March 2026. I lead data analysis for the branch. I produce the quarterly reports, I led the workflow review, and I built the API client and its web console.",
        zh: "我是职业道德与专业标准处情报与廉政组的 ASO7 高级数据分析师，2026 年 3 月入职，负责处里的数据分析。季度报告由我编制，流程审查由我主导，API 客户端和网页控制台也是我做的。",
      },
      {
        en: "I also look after the core data that management information, strategic planning and parliamentary reporting draw on, so that everyone works from the same source.",
        zh: "我还负责维护核心数据，管理信息、战略规划和议会报告都以它为准，大家用的是同一个来源。",
      },
    ],
  },

  demo: {
    title: { en: "Concept demo", zh: "概念演示" },
    notice: {
      en: "Concept illustration only. Every number below is synthetic, generated in your browser from a seed. Nothing comes from SAPOL, its reports or its systems, and the API catalogue uses made-up endpoint names. Nothing is sent anywhere.",
      zh: "这只是概念示意。下面所有数字都是合成的，由你的浏览器根据随机种子生成。没有任何内容来自 SAPOL、它的报告或系统，API 目录里的接口名称也都是编造的。任何数据都不会发送出去。",
    },
    intro: {
      en: "The demo has two parts. The first builds a small quarterly report from synthetic counts: rates per 1,000 attendances with exact Poisson intervals, a u-chart that flags unusual quarters, and plain findings that claim only what the numbers support. The second is a toy API client. It reads a synthetic OpenAPI catalogue and turns every operation into a method, to show how one client can cover hundreds of endpoints.",
      zh: "演示分两部分。第一部分用合成计数生成一份小型季度报告，内容包括每千次出警的比率及其精确泊松区间、标出异常季度的 u 控制图，以及只说数据能支撑之事的简明结论。第二部分是一个玩具版 API 客户端。它读取一份合成的 OpenAPI 目录，把每个操作变成一个方法，展示一个客户端如何覆盖数百个接口。",
    },
  },

  footerNote: {
    en: "If you work with small counts that have to stand up in front of executives, or with an API too large to wrap by hand, I am always happy to compare notes.",
    zh: "如果你也在处理要拿到管理层面前的小计数，或者面对一个大到没法手工封装的 API，欢迎来交流。",
  },
  contact: { en: "Get in touch", zh: "联系我" },
};

/** Strings for the demo components. */
export const DEMO = {
  synthetic: {
    en: "Synthetic data · generated in your browser",
    zh: "合成数据 · 在你的浏览器中生成",
  },
  conceptOnly: {
    en: "Concept illustration, not the real system",
    zh: "概念示意，并非真实系统",
  },
  tabsLabel: { en: "Demo parts", zh: "演示内容" },
  tabs: {
    report: { en: "Quarterly report", zh: "季度报告" },
    api: { en: "API client", zh: "API 客户端" },
  },

  quarter: { en: "Y{y} Q{q}", zh: "第{y}年 Q{q}" },
  yearShort: { en: "Y{y}", zh: "第{y}年" },
  none: { en: "None", zh: "不植入" },
  and: { en: " and ", zh: " 和 " },
  separator: { en: ", ", zh: "、" },

  report: {
    dataSet: { en: "Synthetic data set", zh: "合成数据集" },
    dataSetN: { en: "Set {n}", zh: "第 {n} 组" },
    reseed: { en: "New data set", zh: "换一组数据" },
    plantAt: { en: "Plant an unusual quarter", zh: "植入一个异常季度" },
    plantSize: { en: "Size of the planted change", zh: "植入变化的幅度" },
    level: { en: "Interval level", zh: "置信水平" },
    reporting: { en: "Reporting quarter", zh: "报告季度" },
    reset: { en: "Reset", zh: "重置" },

    docTitle: { en: "Quarterly statistical report (demo)", zh: "季度统计报告（演示）" },
    docSubtitle: {
      en: "{quarter} · synthetic incidents per 1,000 attendances",
      zh: "{quarter} · 每千次出警的合成事件数",
    },
    kIncidents: { en: "Incidents", zh: "事件数" },
    kAttendances: { en: "Attendances", zh: "出警次数" },
    kRate: { en: "Rate per 1,000", zh: "每千次比率" },
    kInterval: { en: "{level} interval", zh: "{level} 置信区间" },
    findings: { en: "Findings", zh: "结论" },
    method: { en: "Method", zh: "方法" },

    headline: {
      en: "In {quarter} there were {count} incidents across {attendances} attendances, a rate of {rate} per 1,000 ({level} interval {lo} to {hi}).",
      zh: "{quarter} 共记录 {count} 起事件，出警 {attendances} 次，每千次出警 {rate} 起（{level} 置信区间 {lo} 至 {hi}）。",
    },
    chart: {
      ok: {
        en: "The rate sits inside the control limits, so on the chart this is an ordinary quarter.",
        zh: "这一比率落在控制限之内，从控制图上看，这是一个普通的季度。",
      },
      watch: {
        en: "The rate is inside the control limits but more than two standard errors from the centre line, so it is worth watching next quarter.",
        zh: "比率仍在控制限之内，但离中心线超过两个标准误，下个季度值得留意。",
      },
      above: {
        en: "The rate is above the upper control limit. That is unusual enough to look into before the report goes out.",
        zh: "比率高于控制上限。这已经足够反常，报告发出之前应该先查明原因。",
      },
      below: {
        en: "The rate is below the lower control limit. A drop like this can be real, but a change in how events are recorded looks the same, so check that first.",
        zh: "比率低于控制下限。这样的下降可能是真的，但记录方式的变化也会造成同样的结果，应该先排除这一点。",
      },
    },
    prev: {
      en: "Against the previous quarter ({other}, {otherRate} per 1,000), the rate ratio is {ratio} ({level} interval {lo} to {hi}).",
      zh: "与上一季度（{other}，每千次 {otherRate} 起）相比，比率之比为 {ratio}（{level} 置信区间 {lo} 至 {hi}）。",
    },
    year: {
      en: "Against the same quarter a year earlier ({other}, {otherRate} per 1,000), the rate ratio is {ratio} ({level} interval {lo} to {hi}).",
      zh: "与去年同季度（{other}，每千次 {otherRate} 起）相比，比率之比为 {ratio}（{level} 置信区间 {lo} 至 {hi}）。",
    },
    verdict: {
      up: {
        en: "The whole interval sits above 1, so the data support calling this a rise.",
        zh: "整个区间都高于 1，数据支持“上升”的说法。",
      },
      down: {
        en: "The whole interval sits below 1, so the data support calling this a fall.",
        zh: "整个区间都低于 1，数据支持“下降”的说法。",
      },
      flat: {
        en: "The interval includes 1, so the data do not support calling this a change.",
        zh: "区间包含 1，数据不足以说明发生了变化。",
      },
    },
    noPrev: {
      en: "There is no earlier quarter to compare with.",
      zh: "没有更早的季度可以比较。",
    },
    noYear: {
      en: "There is no quarter a year earlier to compare with.",
      zh: "没有一年前的同季度可以比较。",
    },
    flaggedSome: {
      en: "Across all twelve quarters, {list} sat outside the control limits.",
      zh: "在全部十二个季度中，{list} 落在控制限之外。",
    },
    flaggedNone: {
      en: "None of the twelve quarters sat outside the control limits.",
      zh: "十二个季度都没有落在控制限之外。",
    },
    planted: {
      en: "You planted a {size} change in {quarter}.",
      zh: "你在 {quarter} 植入了 {size} 的变化。",
    },
    caught: { en: "The chart caught it.", zh: "控制图发现了它。" },
    missed: {
      en: "The chart did not catch it, which is what happens when a change is small next to the noise.",
      zh: "控制图没有发现它。变化相对于噪声太小时，就会这样。",
    },
    methodNote: {
      en: "Rates are incidents per 1,000 attendances. Intervals are exact Poisson (Garwood) intervals. The u-chart centre line is the pooled rate across all twelve quarters, and each quarter's limits sit three standard errors either side of it, where a standard error is √(ū / n) for n thousand attendances. Rate ratios use the exact conditional binomial interval. All data are synthetic.",
      zh: "比率为每千次出警的事件数。区间采用精确泊松（Garwood）区间。u 控制图的中心线是十二个季度合并后的比率，每个季度的控制限位于中心线上下三个标准误处，其中出警 n 千次时的标准误为 √(ū / n)。比率之比采用精确的条件二项区间。所有数据均为合成数据。",
    },

    chartTitle: {
      en: "u-chart: incidents per 1,000 attendances",
      zh: "u 控制图：每千次出警的事件数",
    },
    chartDesc: {
      en: "Twelve synthetic quarters from Y1 Q1 to Y3 Q4. The centre line is {centre} per 1,000. {flagged} The table below lists every value.",
      zh: "十二个合成季度，从第1年 Q1 到第3年 Q4。中心线为每千次 {centre} 起。{flagged}下方表格列出了全部数值。",
    },
    legendCentre: { en: "Centre line", zh: "中心线" },
    legendLimits: { en: "Control limits (3 SE)", zh: "控制限（3 个标准误）" },
    legendOutside: { en: "Outside limits", zh: "超出控制限" },
    legendWatch: { en: "Beyond 2 SE, worth watching", zh: "超过 2 个标准误，值得留意" },
    legendReporting: { en: "Reporting quarter", zh: "报告季度" },

    tableCaption: {
      en: "All twelve synthetic quarters",
      zh: "全部十二个合成季度",
    },
    th: {
      quarter: { en: "Quarter", zh: "季度" },
      attendances: { en: "Attendances", zh: "出警次数" },
      incidents: { en: "Incidents", zh: "事件数" },
      rate: { en: "Rate /1,000", zh: "每千次比率" },
      interval: { en: "{level} interval", zh: "{level} 区间" },
      chart: { en: "Chart", zh: "控制图" },
    },
    status: {
      ok: { en: "Inside limits", zh: "限内" },
      watch: { en: "Watch", zh: "留意" },
      above: { en: "Above limit", zh: "高于上限" },
      below: { en: "Below limit", zh: "低于下限" },
    },
    plantedTag: { en: "planted", zh: "植入" },

    download: { en: "Download report", zh: "下载报告" },
    downloaded: { en: "Saved {file}.", zh: "已保存 {file}。" },
    live: {
      en: "Report for {quarter}: rate {rate} per 1,000, {status}.",
      zh: "{quarter} 报告：每千次 {rate} 起，{status}。",
    },
  },

  api: {
    intro: {
      en: "A synthetic OpenAPI catalogue with {endpoints} endpoints across {resources} made-up resources. The client reads the catalogue once and turns every operation into a method, so no endpoint is wrapped by hand.",
      zh: "一份合成的 OpenAPI 目录，共 {resources} 个虚构资源、{endpoints} 个接口。客户端读取一次目录，就把每个操作变成一个方法，没有任何接口需要手工封装。",
    },
    stats: {
      endpoints: { en: "Endpoints", zh: "接口" },
      resources: { en: "Resources", zh: "资源" },
      wrappers: { en: "Hand-written wrappers", zh: "手写封装" },
    },
    setup: { en: "Setting up the client", zh: "初始化客户端" },
    setupComment: {
      en: "# synthetic catalogue, no real system",
      zh: "# 合成目录，不连接任何真实系统",
    },
    search: { en: "Search endpoints", zh: "搜索接口" },
    searchHint: {
      en: "Try records, notes or export",
      zh: "试试 records、notes 或 export",
    },
    method: { en: "Method", zh: "请求方法" },
    all: { en: "All", zh: "全部" },
    group: { en: "Group", zh: "分组" },
    allGroups: { en: "All groups", zh: "全部分组" },
    groups: {
      core: { en: "Core records", zh: "核心记录" },
      people: { en: "People and teams", zh: "人员与团队" },
      workflow: { en: "Workflow", zh: "流程" },
      documents: { en: "Documents", zh: "文档" },
      reporting: { en: "Reporting", zh: "报表" },
      admin: { en: "Admin", zh: "管理" },
    },
    results: { en: "Endpoints", zh: "接口列表" },
    showing: { en: "Showing {n} of {total} matches", zh: "共 {total} 个匹配，显示 {n} 个" },
    more: { en: "Show {n} more", zh: "再显示 {n} 个" },
    noMatch: {
      en: "No endpoint matches. Try a shorter search or another method.",
      zh: "没有匹配的接口。试试更短的关键词，或换一种请求方法。",
    },
    selected: { en: "Selected endpoint", zh: "已选接口" },
    params: { en: "Parameters", zh: "参数" },
    noParams: { en: "This endpoint takes no parameters.", zh: "这个接口不需要参数。" },
    required: { en: "required", zh: "必填" },
    optional: { en: "optional", zh: "可选" },
    inPath: { en: "path", zh: "路径" },
    inQuery: { en: "query", zh: "查询" },
    integer: { en: "whole number", zh: "整数" },
    text: { en: "text", zh: "文本" },
    oneOf: { en: "one of {values}", zh: "可选值 {values}" },
    upTo: { en: "up to {n}", zh: "最大 {n}" },
    python: { en: "Python, through the client", zh: "Python 调用（通过客户端）" },
    generic: { en: "The same call, by operation name", zh: "同一个调用，按操作名" },
    run: { en: "Run (simulated)", zh: "运行（模拟）" },
    response: { en: "Simulated response", zh: "模拟响应" },
    noContent: { en: "(no content)", zh: "（无内容）" },
    before: {
      en: "Press Run to see what the client would get back. The response is made up in your browser.",
      zh: "点击“运行”，看看客户端会收到什么。响应是在你的浏览器里编造的。",
    },
    blocked: {
      en: "The client checks every call against the catalogue before anything would be sent, so these never reach a server.",
      zh: "客户端会先按目录核对每个调用，再决定是否发送，所以这些错误根本到不了服务器。",
    },
    errors: {
      required: { en: "{name} is required.", zh: "{name} 为必填项。" },
      integer: { en: "{name} must be a whole number.", zh: "{name} 必须是整数。" },
      min: { en: "{name} must be at least {limit}.", zh: "{name} 不能小于 {limit}。" },
      max: { en: "{name} must be {limit} or less.", zh: "{name} 不能大于 {limit}。" },
      enum: { en: "{name} must be one of {limit}.", zh: "{name} 只能是 {limit} 之一。" },
    },
    ran: {
      en: "Simulated {method} {path}, status {status}.",
      zh: "已模拟 {method} {path}，状态码 {status}。",
    },
    failedOne: {
      en: "Not sent. One parameter needs fixing.",
      zh: "未发送。有 1 个参数需要修改。",
    },
    failedMany: {
      en: "Not sent. {n} parameters need fixing.",
      zh: "未发送。有 {n} 个参数需要修改。",
    },
    summaries: {
      list: { en: "List {res}", zh: "列出 {res}" },
      create: { en: "Create a {one}", zh: "新建 {one}" },
      search: { en: "Search {res} with filters", zh: "按条件搜索 {res}" },
      count: { en: "Count {res}", zh: "统计 {res} 数量" },
      get: { en: "Get one {one}", zh: "获取单个 {one}" },
      replace: { en: "Replace a {one}", zh: "整体替换 {one}" },
      update: { en: "Update part of a {one}", zh: "部分更新 {one}" },
      delete: { en: "Delete a {one}", zh: "删除 {one}" },
      history: { en: "Change history of a {one}", zh: "{one} 的变更记录" },
      childList: { en: "List {child} on a {one}", zh: "列出某个 {one} 下的 {child}" },
      childCreate: { en: "Add a {childOne} to a {one}", zh: "为 {one} 添加 {childOne}" },
      childGet: { en: "Get one {childOne} on a {one}", zh: "获取 {one} 下的单个 {childOne}" },
      childDelete: { en: "Remove a {childOne} from a {one}", zh: "从 {one} 移除 {childOne}" },
    },
  },
};
