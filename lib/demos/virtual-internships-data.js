/**
 * Copy for /projects/virtual-internships, an impact page (no live demo) for the
 * 'virtual-internships' card in lib/projects-data.js: twelve Forage job
 * simulations Rin worked through between October 2022 and August 2023. Every
 * string is bilingual ({ en, zh }), en-AU first, so no shared locale file is
 * touched.
 *
 * Sources are the twelve private repos (rNLKJA): each README for the business
 * question and the tasks as set, and Rin's own commit dates for `from` / `to`
 * (YYYY-MM). Only four repos keep Rin's own work (KPMG, British Airways, Tata
 * and PwC Digital Intelligence), so only those four have `own: true` and a
 * "what I delivered" text. The other eight keep the briefs only, because the
 * work was submitted on Forage, so their text describes the tasks as set and
 * claims no results. Within the four, steps whose work is not in the repo
 * (KPMG's dashboard, Tata's video, PwC's later modules) are named as not kept.
 *
 * No logos, company-provided data, briefs, certificates, scores or repo links.
 * Company and programme names appear as text only. Counts quoted in the copy
 * (rows, records, reviews) come from public data sets (UCI Online Retail, UCI
 * Bank Marketing, Skytrax reviews) or from Rin's own notebooks.
 */

// Skill areas, in the order the skill map shows them. `short` heads the map's
// columns, `name` is the full label for screen readers and the legend.
export const AREAS = [
  {
    id: "framing",
    short: { en: "Framing", zh: "界定" },
    name: { en: "Business framing", zh: "业务问题界定" },
  },
  {
    id: "prep",
    short: { en: "Prep", zh: "准备" },
    name: { en: "Data preparation", zh: "数据准备" },
  },
  {
    id: "analysis",
    short: { en: "Analysis", zh: "分析" },
    name: { en: "Analysis and experiments", zh: "分析与实验" },
  },
  {
    id: "models",
    short: { en: "Models", zh: "建模" },
    name: { en: "Modelling", zh: "建模" },
  },
  {
    id: "visuals",
    short: { en: "Visuals", zh: "可视化" },
    name: { en: "Visualisation", zh: "可视化" },
  },
  {
    id: "comms",
    short: { en: "Comms", zh: "沟通" },
    name: { en: "Stakeholder communication", zh: "面向业务方的沟通" },
  },
];

export const COPY = {
  metaTitle: {
    en: "Virtual Internships (Forage): what twelve job simulations built · Projects · rin.contact",
    zh: "虚拟实习（Forage）：十二个工作模拟练出了什么 · 项目 · rin.contact",
  },
  metaDescription: {
    en: "What Rin Huang took from twelve Forage job simulations between October 2022 and August 2023, from KPMG, BCG, British Airways, Quantium, Tata, Cognizant, GE Aviation, Accenture, Red Bull, PwC and Standard Bank: the business question, the work and the skills each one built.",
    zh: "Rin Huang 在 2022 年 10 月到 2023 年 8 月之间完成的十二个 Forage 工作模拟，来自 KPMG、BCG、英国航空、Quantium、Tata、Cognizant、GE 航空、埃森哲、红牛、普华永道和标准银行：每个项目的业务问题、具体工作，以及练出的能力。",
  },
  ogTitle: {
    en: "Virtual Internships (Forage) · Rin Huang",
    zh: "虚拟实习（Forage）· Rin Huang",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Projects · Forage job simulations", zh: "项目 · Forage 工作模拟" },
  title: { en: "Virtual internships", zh: "虚拟实习" },
  fullName: {
    en: "Twelve Forage job simulations · Oct 2022 – Aug 2023",
    zh: "十二个 Forage 工作模拟 · 2022.10 – 2023.08",
  },
  tagline: {
    en: "What twelve company-designed job simulations added to how I work with data, and what I actually produced.",
    zh: "十二个由企业设计的工作模拟，给我处理数据的方式带来了什么，以及我实际交出了哪些东西。",
  },
  status: { en: "Self-paced · in my own time", zh: "自主完成 · 业余时间" },
  jump: { en: "See all twelve", zh: "查看全部十二个" },
  notice: {
    en: "These were not jobs. Each Forage job simulation is a free set of tasks that a company publishes for students, and I worked through twelve of them in my own time. Only four of my repos keep my own work: KPMG, British Airways, Tata and PwC Digital Intelligence. The other eight keep only the briefs because I submitted the work on Forage, so for those I describe the tasks as set and claim no results. The repos are private, and no logos, company data, briefs or certificates are hosted here.",
    zh: "这些不是正式工作。Forage 上的每个工作模拟，都是一家公司为学生免费发布的一组任务，我利用业余时间完成了其中十二个。只有四个仓库保存了我自己的作业：KPMG、英国航空、Tata 和普华永道数字智能。另外八个仓库只留下了任务说明，因为作业是直接在 Forage 上提交的，所以这八个只按任务原本的要求来写，不声称任何结果。这些仓库都是私有的，本页也不收录任何标志、公司数据、任务说明或证书。",
  },
  glance: [
    { k: { en: "Programmes", zh: "项目数" }, v: { en: "12", zh: "12" } },
    { k: { en: "Companies", zh: "公司数" }, v: { en: "11", zh: "11" } },
    {
      k: { en: "Period", zh: "时间" },
      v: { en: "Oct 2022 – Aug 2023", zh: "2022.10 – 2023.08" },
    },
    {
      k: { en: "My work kept", zh: "保存了作业" },
      v: { en: "4 of 12 repos", zh: "12 个仓库中的 4 个" },
    },
  ],

  summary: {
    title: { en: "What the set adds up to", zh: "合起来意味着什么" },
    body: [
      {
        en: "Twelve short simulations do not make anyone a consultant or a data scientist, and I don't claim they did. What they gave me was repeated practice at the parts of the job that coursework rarely asks for: a business question owned by a real decision maker, data that has to be checked before it can be trusted, and an answer that has to fit on one slide, in one email or in a short video.",
        zh: "十二个短短的工作模拟，不会让任何人就此成为咨询顾问或数据科学家，我也不这么说。它们给我的，是反复练习课程作业里很少要求的那部分工作：业务问题背后有一个真正要拍板的人，数据要先检查过才能信，答案要能放进一页幻灯片、一封邮件或者一段短视频里。",
      },
      {
        en: "Across eleven companies the same working rhythm kept coming back, and it is still the order I work in today.",
        zh: "在十一家公司的任务里，同一套工作节奏反复出现，我到今天也还是按这个顺序做事。",
      },
    ],
    steps: [
      {
        title: { en: "Frame the question first", zh: "先把问题想清楚" },
        body: {
          en: "Most briefs open with a stakeholder and a decision, not a data set. For Tata I wrote down eight questions for the CEO and CMO before drawing a chart, and for KPMG I scoped the work in three phases before any modelling.",
          zh: "大多数任务一开头给的是一个业务方和一个要做的决定，而不是一份数据。做 Tata 时，我在画任何图之前先替 CEO 和 CMO 写下八个问题。做 KPMG 时，我在建模之前先把工作拆成三个阶段。",
        },
      },
      {
        title: { en: "Check the data before trusting it", zh: "先查数据，再用数据" },
        body: {
          en: "For KPMG my first deliverable was an email listing nine data quality issues. For Tata I removed returns and invalid prices before building any view, and the GE brief hinges on one airline that stored a temperature on a different scale.",
          zh: "KPMG 的第一份交付物，是一封列出九个数据质量问题的邮件。做 Tata 时，我先去掉退货和无效价格，再开始做图。GE 的任务关键也在于有一家航空公司用了不同的温标记录温度。",
        },
      },
      {
        title: { en: "Model, then explain", zh: "先建模，再解释" },
        body: {
          en: "For British Airways I went from scraped reviews to a booking model, and for PwC I trained a model of which bank clients to call and used SHAP to explain it, for the whole test set and for single clients. BCG, Cognizant and Standard Bank practise churn, stock and credit risk models as set.",
          zh: "做英国航空时，我从抓取的评论一路做到预订预测模型。做普华永道时，我训练了一个判断该给哪些银行客户打电话的模型，再用 SHAP 解释它，既看整个测试集，也看单个客户。BCG、Cognizant 和标准银行的任务，则按题目要求练习了客户流失、库存和信用风险模型。",
        },
      },
      {
        title: { en: "End on one page", zh: "最后落到一页纸上" },
        body: {
          en: "Almost every programme ends in a single slide, a client email or a short recorded presentation for someone without a technical background. Writing that page is the skill I use most from the set.",
          zh: "几乎每个项目都以一页幻灯片、一封客户邮件或一段简短的录制汇报收尾，对象往往没有技术背景。写好这一页，是这些项目里我用得最多的能力。",
        },
      },
    ],
  },

  map: {
    title: { en: "Skill map", zh: "能力分布" },
    intro: {
      en: "Each row is a programme and each column is a skill area it asked for. A filled square means my own work for that area is kept in the repo. A hollow square means the brief asked for it but only the brief is kept, so I claim nothing beyond the task.",
      zh: "每一行是一个项目，每一列是它要求的一类能力。实心方块表示这部分我自己的作业保存在仓库里。空心方块表示任务要求了这部分，但仓库只留下了任务说明，所以除了任务本身我不声称别的。",
    },
    caption: {
      en: "Skill areas covered by each of the twelve Forage programmes",
      zh: "十二个 Forage 项目各自涉及的能力方向",
    },
    programmeHead: { en: "Programme", zh: "项目" },
    legendOwn: { en: "My work, kept in the repo", zh: "我的作业，保存在仓库里" },
    legendSet: { en: "In the brief, work not kept", zh: "任务要求，作业未保存" },
    legendNone: { en: "Not part of the programme", zh: "不在该项目范围内" },
    total: { en: "{n}/12", zh: "{n}/12" },
    totalHead: { en: "Programmes", zh: "项目数" },
  },

  groupsSection: {
    title: { en: "The twelve, by skill area", zh: "十二个项目，按能力方向分组" },
    intro: {
      en: "Each card gives the business question, what I delivered or what the tasks asked for, and the skills it built. Dates come from my own commits in each repo.",
      zh: "每张卡片写明业务问题、我交付了什么（或者任务要求了什么），以及它练出的能力。日期来自我在各个仓库里的提交记录。",
    },
  },

  card: {
    question: { en: "Business question", zh: "业务问题" },
    workOwn: { en: "What I delivered", zh: "我交付了什么" },
    workSet: { en: "Tasks as set", zh: "任务要求" },
    outputsOwn: { en: "What I produced", zh: "我的产出" },
    outputsSet: { en: "Deliverables the brief asked for", zh: "任务要求的交付物" },
    impactOwn: { en: "Skills it built", zh: "练出的能力" },
    impactSet: { en: "Skills the tasks practise", zh: "任务练习的能力" },
    tools: { en: "Tools", zh: "工具" },
    badgeOwn: { en: "My work kept", zh: "保存了我的作业" },
    badgeSet: { en: "Brief only · no results claimed", zh: "只有任务说明 · 不声称结果" },
  },

  lookingBack: {
    title: { en: "Looking back", zh: "回头看" },
    intro: {
      en: "Re-reading my own notebooks for this page, three things stand out that I would do differently now.",
      zh: "为了写这一页，我重新翻了自己的 notebook，有三件事现在我会换一种做法。",
    },
    items: [
      {
        title: { en: "Check the baseline first", zh: "先看基线" },
        body: {
          en: "Most bookings in the British Airways data were never completed, so my classifier's accuracy was close to what always guessing “no booking” would score. I now put the class balance and a naive baseline next to any score I report.",
          zh: "英国航空的数据里，大多数预订最后都没有完成，所以我那个分类器的准确率，和一直猜“不会预订”差不多。现在我报告任何指标时，都会把类别比例和一个朴素基线放在旁边。",
        },
      },
      {
        title: {
          en: "Leave out what you only learn afterwards",
          zh: "事后才知道的信息不要放进模型",
        },
        body: {
          en: "My PwC model kept call duration as a feature, and the UCI notes warn that duration is only known once the call is over. For a real calling list I would drop it and explain the model again.",
          zh: "我在普华永道任务里的模型保留了通话时长这个特征，而 UCI 的数据说明特别提醒过，通话时长要等电话打完才知道。如果真要用来决定给谁打电话，我会去掉它，再重新解释一遍模型。",
        },
      },
      {
        title: { en: "Answer the question that was asked", zh: "回答对方真正问的问题" },
        body: {
          en: "For KPMG I proposed a recommender system, but the brief asked which of 1,000 new customers to target, and they had no purchase history. A ranked list of customers by likely value would have answered it more directly.",
          zh: "做 KPMG 时我提议做推荐系统，但任务问的是 1,000 位新客户里该优先联系谁，而这些客户没有任何购买记录。按潜在价值给客户排个序，会更直接地回答这个问题。",
        },
      },
    ],
  },

  footerNote: {
    en: "Company and programme names appear as text only. The repos are private, so there are no source links, and no logos, company-provided data, briefs, certificates or scores are hosted here.",
    zh: "公司和项目名称只以文字出现。仓库是私有的，所以没有源码链接，本页也不收录任何标志、公司提供的数据、任务说明、证书或分数。",
  },
};

// Groups in page order. Within a group, programmes with Rin's own work come first.
export const GROUPS = [
  {
    id: "quality",
    title: { en: "Data quality and joins", zh: "数据质量与数据合并" },
    intro: {
      en: "Two programmes made the data itself the deliverable: finding what is wrong with it, and joining sources that do not agree.",
      zh: "有两个项目把数据本身当成交付物：找出数据哪里有问题，以及把彼此对不上的数据源合并起来。",
    },
  },
  {
    id: "visual",
    title: { en: "Visualisation and storytelling", zh: "可视化与讲故事" },
    intro: {
      en: "Three programmes were about choosing the right view for a decision maker and telling the story around it.",
      zh: "有三个项目练的是为决策者挑选合适的图表，并围绕它把来龙去脉讲清楚。",
    },
  },
  {
    id: "commercial",
    title: { en: "Commercial analytics", zh: "商业分析" },
    intro: {
      en: "Two programmes tied the analysis to a commercial call: whether a store trial worked, and how to win back an account.",
      zh: "有两个项目把分析和一个商业决定绑在一起：门店试点到底有没有效果，以及怎样把一个客户争取回来。",
    },
  },
  {
    id: "models",
    title: { en: "Models and explainability", zh: "模型与可解释性" },
    intro: {
      en: "Five programmes asked for a predictive model. The two I kept go from raw data to an explained result, and the other three practise churn, stock and credit risk models as set.",
      zh: "有五个项目要求做预测模型。我保存下来的两个，从原始数据一路做到能解释的结果，另外三个则按题目要求练习了客户流失、库存和信用风险模型。",
    },
  },
];

// `skills` drives the skill map: 2 = my work for that area is kept in the repo,
// 1 = the brief asked for it but only the brief is kept, 0 = not part of it.
export const PROGRAMMES = [
  // Data quality and joins
  {
    id: "kpmg",
    group: "quality",
    own: true,
    company: { en: "KPMG", zh: "KPMG" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-10",
    to: "2022-11",
    skills: { framing: 2, prep: 2, analysis: 1, models: 1, visuals: 1, comms: 2 },
    tools: ["Python", "pandas", "Jupyter", "PowerPoint"],
    question: {
      en: "Sprocket Central, a bike and cycling accessories retailer, shared three tables of customer and transaction data and a list of 1,000 new customers. Which of the new customers should its marketing team target first?",
      zh: "自行车及配件零售商 Sprocket Central 提供了三张客户和交易数据表，以及一份 1,000 位新客户的名单。营销团队应该优先联系其中哪些新客户？",
    },
    work: {
      en: "I profiled the four worksheets in pandas and wrote the client an email that set out nine data quality issues, such as missing values, inconsistent gender entries, unnamed columns and a date of birth in 1843. For the second module I drafted a short deck that split the work into exploration, model development and interpretation, suggested external data such as ABS population figures, and proposed ranking metrics to judge the recommendations. The third module, a client dashboard, is not kept in the repo, so I claim nothing for it.",
      zh: "我先用 pandas 逐一检查了四张工作表，然后给客户写了一封邮件，列出九个数据质量问题，比如缺失值、性别字段写法不统一、没有列名的字段，还有一个 1843 年的出生日期。第二个模块里，我做了一份简短的演示文稿，把工作分成数据探索、模型开发和结果解读三个阶段，建议引入澳大利亚统计局的人口数据等外部数据，并提出用排序指标来评估推荐效果。第三个模块是给客户的仪表板，仓库里没有保存，所以这部分我不作任何声称。",
    },
    outputs: [
      { en: "Data quality email", zh: "数据质量邮件" },
      { en: "Exploration notebook", zh: "数据探索 notebook" },
      { en: "Approach deck", zh: "分析思路演示文稿" },
    ],
    impact: {
      en: "Treating data quality as the first deliverable, and writing it up for a client as specific issues with what each one means for the analysis.",
      zh: "把数据质量当作第一份交付物，并且写给客户时，要具体到每个问题，以及它对后续分析意味着什么。",
    },
  },
  {
    id: "ge-aviation",
    group: "quality",
    own: false,
    company: { en: "GE Aviation", zh: "GE 航空" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-11",
    to: "2022-12",
    skills: { framing: 0, prep: 1, analysis: 0, models: 0, visuals: 1, comms: 0 },
    tools: ["Excel", "Tableau"],
    question: {
      en: "How do you combine engine, manufacturing and airport data into one table analysts can use, and are machined parts staying within their design tolerances?",
      zh: "怎样把发动机、制造和机场数据合成一张分析师能直接用的表？加工出来的零件是否都在设计公差之内？",
    },
    work: {
      en: "The first module asks for the flight engine data of four airlines to be merged into one table, after adjusting a temperature column that one airline stored on a different scale, with a bonus step that joins the supply chain and bill of materials sheets with lookups. The second asks for a Tableau run chart and KPI tables that show whether each operation's measurements fall inside specification.",
      zh: "第一个模块要求把四家航空公司的整段飞行发动机数据合并成一张表，合并前要先调整其中一家用不同温标记录的温度列，另有一个加分步骤，用查找函数把供应链表和物料清单表连接起来。第二个模块要求在 Tableau 里做运行图和 KPI 表，看每道工序的测量值是否落在规格范围内。",
    },
    outputs: [
      { en: "Merged data set", zh: "合并后的数据集" },
      { en: "Run chart", zh: "运行图" },
      { en: "KPI tables", zh: "KPI 表" },
    ],
    impact: {
      en: "Spotting a unit mismatch before a merge, and reading a run chart to judge a process over time.",
      zh: "在合并数据之前发现单位不一致，以及用运行图判断一个流程随时间的表现。",
    },
  },

  // Visualisation and storytelling
  {
    id: "tata",
    group: "visual",
    own: true,
    company: { en: "Tata", zh: "Tata" },
    programme: { en: "Data Visualisation", zh: "数据可视化" },
    from: "2022-10",
    to: "2022-10",
    skills: { framing: 2, prep: 2, analysis: 2, models: 0, visuals: 2, comms: 1 },
    tools: ["Python", "pandas", "Tableau"],
    question: {
      en: "The CEO and CMO of an online retailer wanted to know what drives revenue and where the business should expand next.",
      zh: "一家网店的 CEO 和 CMO 想知道收入靠什么驱动，下一步该往哪里扩张。",
    },
    work: {
      en: "Before drawing anything, I wrote down eight questions the two leaders were likely to ask, four quantitative and four qualitative, and explored the public UCI Online Retail data to see which ones it could answer. I then chose a chart type for each of five scenarios and wrote down why, such as a line chart for monthly seasonality and a filled map for demand by country. Finally I cleaned the data in pandas by removing returns and invalid prices, which took it from about 541,900 rows to 530,100, and built the four requested views as a Tableau workbook with a dashboard. The last module, a recorded presentation, is not kept in the repo.",
      zh: "动手画图之前，我先写下这两位高管可能会问的八个问题，四个定量、四个定性，再探索公开的 UCI Online Retail 数据，看哪些问题能用它回答。接着我为五个场景各选一种图表并写下理由，比如用折线图看月度季节性，用填色地图看各国需求。最后用 pandas 清洗数据，去掉退货和无效价格，把大约 541,900 行减到 530,100 行，再在 Tableau 里把要求的四个视图做成一个带仪表板的工作簿。最后一个模块是录制汇报，仓库里没有保存。",
    },
    outputs: [
      { en: "Question list", zh: "问题清单" },
      { en: "Chart choices with reasons", zh: "图表选择及理由" },
      { en: "Cleaning notebook", zh: "数据清洗 notebook" },
      { en: "Tableau workbook", zh: "Tableau 工作簿" },
    ],
    impact: {
      en: "Writing the decision maker's questions first and choosing each chart for the question it answers, rather than starting from the data.",
      zh: "先写下决策者的问题，再按每个问题去选图表，而不是从数据出发。",
    },
  },
  {
    id: "accenture",
    group: "visual",
    own: false,
    company: { en: "Accenture North America", zh: "埃森哲北美" },
    programme: { en: "Data Analytics and Visualisation", zh: "数据分析与可视化" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 1, prep: 1, analysis: 1, models: 0, visuals: 1, comms: 1 },
    tools: ["Excel", "PowerPoint"],
    question: {
      en: "A client brief sets a business problem about content and how users react to it. Which of seven related data sets answer it, and how do you present the answer to the client?",
      zh: "一份客户简报提出了一个关于内容和用户反应的业务问题。七个相互关联的数据集里，哪些能回答它？答案又该怎样呈现给客户？",
    },
    work: {
      en: "Four modules. The first is a quiz on the business problem, the requirements and who on the team does what. The second asks for the relevant tables to be cleaned and merged on their keys into one final data set. The third asks for visualisations and a slide deck that tells a clear story, and the fourth for a recorded presentation to the client.",
      zh: "共四个模块。第一个是测验，考的是业务问题、项目要求，以及团队里谁负责什么。第二个要求挑出相关的表，清洗后按主键合并成一份最终数据集。第三个要求做可视化和一份讲清楚来龙去脉的演示文稿，第四个要求录一段给客户的汇报视频。",
    },
    outputs: [
      { en: "Merged data set", zh: "合并后的数据集" },
      { en: "Slide deck", zh: "演示文稿" },
      { en: "Video presentation", zh: "汇报视频" },
    ],
    impact: {
      en: "Reading a client brief for its requirements first, then cutting a data model down to the tables that answer them.",
      zh: "先从客户简报里读出要求，再把数据模型精简到真正能回答这些要求的几张表。",
    },
  },
  {
    id: "pwc-power-bi",
    group: "visual",
    own: false,
    company: { en: "PwC Switzerland", zh: "普华永道瑞士" },
    programme: { en: "Power BI", zh: "Power BI" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 1, prep: 0, analysis: 1, models: 0, visuals: 1, comms: 1 },
    tools: ["Power BI"],
    question: {
      en: "A telecom client wants clear answers on three things: how its call centre is performing, which customers are at risk of leaving, and why gender balance in its executive team is not improving.",
      zh: "一家电信客户想弄清楚三件事：呼叫中心表现如何，哪些客户可能流失，以及管理层的性别平衡为什么一直没有改善。",
    },
    work: {
      en: "After an introduction, three case tasks each ask for KPIs worked back from a stakeholder's question and a Power BI dashboard that shows them. The call centre task covers satisfaction, answered and abandoned calls and speed of answer. The retention task adds a short email of findings and suggested changes, and the diversity task asks for hiring, promotion, performance and turnover measures and the likely root causes of slow progress.",
      zh: "在一段介绍之后，有三个案例任务，每个都要求从业务方的问题倒推出 KPI，再用 Power BI 仪表板呈现出来。呼叫中心任务关注满意度、接通和放弃的来电，以及应答速度。客户留存任务还要求写一封简短邮件，说明发现和改进建议。多元化任务则要求计算招聘、晋升、绩效和离职方面的指标，并分析进展缓慢的可能原因。",
    },
    outputs: [
      { en: "Three dashboards", zh: "三个仪表板" },
      { en: "Retention email", zh: "客户留存邮件" },
      { en: "Root cause notes", zh: "原因分析" },
    ],
    impact: {
      en: "Working back from a stakeholder's question to the KPI that answers it, and only then to the visual.",
      zh: "从业务方的问题倒推出能回答它的 KPI，最后才考虑怎么呈现。",
    },
  },

  // Commercial analytics
  {
    id: "quantium",
    group: "commercial",
    own: false,
    company: { en: "Quantium", zh: "Quantium" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-10",
    to: "2022-11",
    skills: { framing: 0, prep: 1, analysis: 1, models: 0, visuals: 1, comms: 1 },
    tools: ["Python", "R"],
    question: {
      en: "Who buys chips at a large supermarket chain, what drives their spending, and did a new layout trialled in three stores lift sales?",
      zh: "在一家大型连锁超市里，谁在买薯片，是什么在驱动他们的消费？在三家门店试行的新陈列，有没有带动销售？",
    },
    work: {
      en: "Three modules. The first asks for checks and cleaning of transaction and customer data, derived features such as pack size and brand, and customer segments that lead to a recommendation. The second asks for a control store for each trial store, chosen with a measure such as correlation or magnitude distance, and a test of whether sales changed during the trial and what drove it. The third asks for a client report built on the Pyramid Principle.",
      zh: "共三个模块。第一个要求检查并清洗交易和客户数据，提取包装规格、品牌等特征，并做客户分群，最后给出建议。第二个要求用相关系数或量级距离之类的指标，为每家试点门店找一家对照门店，再检验试点期间销售有没有变化、变化从何而来。第三个要求按金字塔原理写一份给客户的报告。",
    },
    outputs: [
      { en: "Customer segments", zh: "客户分群" },
      { en: "Trial and control analysis", zh: "试点与对照分析" },
      { en: "Client report", zh: "客户报告" },
    ],
    impact: {
      en: "Setting up a trial and control comparison, and leading a client report with the answer rather than the method.",
      zh: "设计试点与对照的比较，以及写客户报告时先给结论，而不是先讲方法。",
    },
  },
  {
    id: "red-bull",
    group: "commercial",
    own: false,
    company: { en: "Red Bull", zh: "红牛" },
    programme: { en: "On-Premise Sales", zh: "现饮渠道销售" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 0, prep: 0, analysis: 1, models: 0, visuals: 1, comms: 1 },
    tools: ["Excel", "PowerPoint"],
    question: {
      en: "Which bar and restaurant accounts are growing or slipping, and how do you win back an account whose sales have dropped?",
      zh: "哪些酒吧和餐厅客户在增长，哪些在下滑？一个销量明显下降的客户，要怎样争取回来？",
    },
    work: {
      en: "The first module asks for the compound annual growth rate of sales volume over five years of randomly generated account data in Excel, comparisons by account type, year, promotion programme and product range, and a short deck of findings. The second asks for a short recorded video message that answers a bar owner's objections on price and demand, using an active listening framework.",
      zh: "第一个模块要求在 Excel 里，用随机生成的五年客户数据计算销量的复合年增长率，按客户类型、年份、促销计划和产品组合做比较，并整理成一份简短的演示文稿。第二个模块要求录一段简短的视频留言，用积极倾听的方法回应一位酒吧老板对价格和需求的顾虑。",
    },
    outputs: [
      { en: "CAGR analysis", zh: "复合年增长率分析" },
      { en: "Findings deck", zh: "结论演示文稿" },
      { en: "Video message", zh: "视频留言" },
    ],
    impact: {
      en: "Reading account-level trends with a commercial eye, and answering an objection by listening and reframing before making a case.",
      zh: "用商业眼光看客户层面的趋势，以及在回应异议时先倾听、再换个角度，然后才提出自己的理由。",
    },
  },

  // Models and explainability
  {
    id: "british-airways",
    group: "models",
    own: true,
    company: { en: "British Airways", zh: "英国航空" },
    programme: { en: "Data Science", zh: "数据科学" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 0, prep: 2, analysis: 2, models: 2, visuals: 2, comms: 2 },
    tools: [
      "Python",
      "requests",
      "BeautifulSoup",
      "pandas",
      "Hugging Face Transformers",
      "scikit-learn",
      "statsmodels",
      "Plotly",
    ],
    question: {
      en: "What do travellers say about the airline in public reviews, and which factors make a customer go on to complete a booking?",
      zh: "旅客在公开评论里怎么评价这家航空公司？哪些因素会让客户最后完成预订？",
    },
    work: {
      en: "I wrote a threaded scraper with requests and BeautifulSoup that walked the Skytrax A to Z of airline reviews and saved reviews for 485 airlines, about 89% of those listed. I cleaned the 1,200 British Airways reviews, labelled their sentiment with a pretrained Hugging Face model, and summarised aircraft, traveller type, seat class and sentiment on one slide. For the booking task I prepared 50,000 booking records, fitted an OLS baseline and a neural network classifier, and checked how each feature related to a completed booking. That summary also went on one slide.",
      zh: "我用 requests 和 BeautifulSoup 写了一个多线程爬虫，按 Skytrax 的航空公司索引逐个抓取评论，保存了 485 家航空公司的评论，约占所列航空公司的 89%。然后清洗了 1,200 条英国航空的评论，用一个预训练的 Hugging Face 模型标注情感，并把机型、旅客类型、舱位和情感分布汇总成一页幻灯片。预订任务里，我整理了 50,000 条预订记录，先拟合一个 OLS 基线，再训练一个神经网络分类器，并检查每个特征和完成预订之间的关系。这部分结论同样收在一页幻灯片里。",
    },
    outputs: [
      { en: "Review scraper", zh: "评论爬虫" },
      { en: "Sentiment notebook", zh: "情感分析 notebook" },
      { en: "Booking model notebook", zh: "预订模型 notebook" },
      { en: "Two one-slide summaries", zh: "两页总结幻灯片" },
    ],
    impact: {
      en: "Collecting and cleaning messy web text myself, and fitting each analysis onto one slide for a non-technical reader.",
      zh: "自己采集并清洗杂乱的网页文本，再把每项分析压缩成一页给非技术读者看的幻灯片。",
    },
  },
  {
    id: "pwc-digital-intelligence",
    group: "models",
    own: true,
    company: { en: "PwC", zh: "普华永道" },
    programme: { en: "Digital Intelligence", zh: "数字智能" },
    from: "2023-08",
    to: "2023-08",
    skills: { framing: 0, prep: 2, analysis: 0, models: 2, visuals: 2, comms: 0 },
    tools: ["Python", "pandas", "scikit-learn", "SHAP"],
    question: {
      en: "A large bank uses a model to decide which clients to phone about term deposits. Management wants to know how such a model reaches its decisions, overall and for individual clients.",
      zh: "一家大型银行用模型决定给哪些客户打电话推销定期存款。管理层想知道，这样的模型是怎样做出判断的，既要看整体，也要看单个客户。",
    },
    work: {
      en: "I trained a cross-validated logistic regression on the public UCI Bank Marketing data, 41,188 campaign records, and checked it with a confusion matrix and a classification report. I then used SHAP to rank the features that drive predictions across the test set, and drew force plots that explain the predictions for the two clients the brief named. Economic indicators, such as the number employed and the three-month Euribor rate, led both explanations. The programme lists further modules, but the repo holds only this responsible AI task, so that is all I claim.",
      zh: "我在公开的 UCI Bank Marketing 数据（41,188 条营销记录）上训练了带交叉验证的逻辑回归，用混淆矩阵和分类报告检查效果。然后用 SHAP 给整个测试集上影响预测的特征排序，再为任务指定的两位客户画出 force plot，解释模型对他们的判断。在这两位客户身上，就业人数、三个月 Euribor 利率这类经济指标都排在最前面。这个项目还列了其他模块，但仓库里只有这个负责任 AI 任务，所以我只声称这一部分。",
    },
    outputs: [
      { en: "Classification model", zh: "分类模型" },
      { en: "Global SHAP summary", zh: "全局 SHAP 汇总" },
      { en: "Two local explanations", zh: "两个单例解释" },
    ],
    impact: {
      en: "Treating an explanation, for the whole model and for one person, as part of finishing a model rather than an extra.",
      zh: "把解释模型（既解释整体，也解释单个人）当作完成一个模型的必要部分，而不是锦上添花。",
    },
  },
  {
    id: "bcg",
    group: "models",
    own: false,
    company: { en: "BCG", zh: "BCG" },
    programme: { en: "Data Science & Analytics", zh: "数据科学与分析" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 1, prep: 1, analysis: 1, models: 1, visuals: 0, comms: 1 },
    tools: ["Python", "pandas", "scikit-learn"],
    question: {
      en: "PowerCo, a European gas and electricity utility, is losing small and medium business customers. Is price sensitivity driving that churn, and would a 20% discount keep the customers most at risk?",
      zh: "欧洲燃气与电力公司 PowerCo 的中小企业客户在不断流失。这种流失是不是由价格敏感度驱动的？给最可能流失的客户 20% 的折扣，能不能把他们留住？",
    },
    work: {
      en: "Four modules take the question from a hypothesis to a steering committee. They ask for an email to the associate director on the data and models needed to test it, an exploratory analysis of customer and price data with a definition of price sensitivity, features built on the gap between December and January off-peak prices, a random forest that predicts churn with a justified choice of metrics, and a one-slide executive summary.",
      zh: "四个模块把这个问题从一个假设一路带到指导委员会。任务先要求给副总监写一封邮件，说明检验这个假设需要哪些数据和模型。接着探索客户和价格数据，并给出价格敏感度的定义。然后以 12 月与 1 月非高峰电价之差为基础构造特征，训练随机森林预测流失，并说明评估指标为什么这样选。最后做一页高管摘要。",
    },
    outputs: [
      { en: "Email to the associate director", zh: "给副总监的邮件" },
      { en: "EDA notebook", zh: "探索性分析 notebook" },
      { en: "Random forest model", zh: "随机森林模型" },
      { en: "Executive summary slide", zh: "高管摘要幻灯片" },
    ],
    impact: {
      en: "Turning a commercial hypothesis into a testable data science problem, and judging a model by what it means for the client's bottom line.",
      zh: "把一个商业假设变成可以检验的数据科学问题，并且从客户利润的角度去评判模型。",
    },
  },
  {
    id: "cognizant",
    group: "models",
    own: false,
    company: { en: "Cognizant", zh: "Cognizant" },
    programme: { en: "Artificial Intelligence", zh: "人工智能" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 1, prep: 1, analysis: 1, models: 1, visuals: 0, comms: 1 },
    tools: ["Python", "pandas", "scikit-learn", "Google Colab"],
    question: {
      en: "Gala Groceries sells highly perishable stock. Can sales and sensor data predict hourly stock levels well enough to guide what it orders from suppliers?",
      zh: "Gala Groceries 卖的大多是容易变质的生鲜。能不能用销售数据和传感器数据按小时预测库存，从而更聪明地向供应商订货？",
    },
    work: {
      en: "Five modules run from exploration to production. They ask for an exploratory analysis of sample sales data summarised in an email, a one-slide plan for which tables to use from the data model, and a model that combines sales, stock and temperature data, explained on one slide in business terms. They then ask for a documented Python module that trains the model and reports its performance, and finish with a quality assurance quiz on improving the deployed model.",
      zh: "五个模块从探索一路走到上线。任务先要求探索样本销售数据，并用一封邮件汇报。接着用一页幻灯片规划要从数据模型里用哪些表，再把销售、库存和温度数据合在一起建模，并用业务语言在一页幻灯片上解释结果。然后要求写一个带注释的 Python 模块，负责训练模型并输出性能指标，最后是一个关于如何改进已部署模型的质量保证测验。",
    },
    outputs: [
      { en: "Email", zh: "邮件" },
      { en: "Planning slide", zh: "规划幻灯片" },
      { en: "Model and results slide", zh: "模型与结果幻灯片" },
      { en: "Python module", zh: "Python 模块" },
    ],
    impact: {
      en: "Moving a model out of a notebook into a documented module another team can run, and describing its performance without technical metrics.",
      zh: "把模型从 notebook 搬进一个其他团队也能运行、带说明的模块，并且不用技术指标来描述模型表现。",
    },
  },
  {
    id: "standard-bank",
    group: "models",
    own: false,
    company: { en: "Standard Bank", zh: "标准银行" },
    programme: { en: "Data Science", zh: "数据科学" },
    from: "2022-11",
    to: "2022-11",
    skills: { framing: 1, prep: 1, analysis: 1, models: 1, visuals: 0, comms: 1 },
    tools: ["SQL", "Python", "AutoML"],
    question: {
      en: "Loan officers take two to three days to process each home loan application. Can machine learning predict whether an applicant will default, so they get an answer as soon as they apply?",
      zh: "信贷员处理一份房贷申请要两到三天。机器学习能不能预测申请人是否会违约，让他们一提交申请就能得到答复？",
    },
    work: {
      en: "The modules follow CRISP-DM. They ask for a multiple-choice SQL quiz on the data understanding stage, a notebook that answers the home loans manager's questions about the data and compares AutoML with a bespoke model, a presentation built around the data science life cycle, and a five to ten minute video for a manager with a limited technical background.",
      zh: "整个项目按 CRISP-DM 流程走。任务包括一个关于数据理解阶段的 SQL 选择题测验，一个回答房贷经理关于数据的问题、并比较 AutoML 与自建模型的 notebook，一份围绕数据科学生命周期的演示文稿，以及一段讲给技术背景有限的经理听的五到十分钟视频。",
    },
    outputs: [
      { en: "SQL quiz", zh: "SQL 测验" },
      { en: "AutoML vs bespoke notebook", zh: "AutoML 与自建模型对比 notebook" },
      { en: "Presentation", zh: "演示文稿" },
      { en: "Video", zh: "视频" },
    ],
    impact: {
      en: "Weighing AutoML against a hand-built model, and presenting the trade-off to a sponsor who is not technical.",
      zh: "权衡 AutoML 和手工搭建的模型，并把其中的取舍讲给不懂技术的项目负责人听。",
    },
  },
];

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2022-10" to "Oct 2022" (en) or "2022.10" (zh). Ranges collapse a shared year in English. */
export function formatPeriod(from, to, lang) {
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  if (lang === "zh") {
    const f = `${fy}.${String(fm).padStart(2, "0")}`;
    const t = `${ty}.${String(tm).padStart(2, "0")}`;
    return from === to ? f : `${f} – ${t}`;
  }
  if (from === to) return `${MONTHS_EN[fm - 1]} ${fy}`;
  if (fy === ty) return `${MONTHS_EN[fm - 1]} – ${MONTHS_EN[tm - 1]} ${fy}`;
  return `${MONTHS_EN[fm - 1]} ${fy} – ${MONTHS_EN[tm - 1]} ${ty}`;
}
