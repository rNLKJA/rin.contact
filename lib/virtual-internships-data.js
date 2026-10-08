/**
 * Forage virtual experience programmes for /projects/virtual-internships.
 *
 * Facts come from each programme's own repository (rNLKJA, all private): the
 * README for the business question, methods and tools, and Rin's own commit
 * dates for `from` / `to` (YYYY-MM). Eight of the twelve repos keep only the task
 * briefs because the work was submitted on Forage, so their `did` text stays at
 * the level of the modules as set and makes no claims about results.
 *
 * No company logos, datasets, briefs, certificates or repo links: company and
 * programme names appear as text only. Copy is bilingual ({ en, zh }), en-AU first.
 */

export const AREAS = ["analytics", "ml", "visualisation", "engineering", "consulting"];

export const COPY = {
  label: { en: "Projects · Forage", zh: "项目 · Forage" },
  title: { en: "Virtual internships", zh: "虚拟实习" },
  intro: {
    en: "Forage virtual experience programmes: self-paced job simulations designed by each company.",
    zh: "Forage 虚拟实习项目：由各家公司设计、可以按自己节奏完成的工作模拟。",
  },
  note: {
    en: "These were not jobs. Each programme is a free set of tasks that a company publishes on Forage, and I worked through them in my own time between October 2022 and August 2023. They showed me how analysts, data scientists and consultants frame a business problem before they touch the data. Some repos only kept the task briefs because my submissions went straight to Forage, so those cards describe the modules as they were set.",
    zh: "这些不是正式工作。每个项目都是公司在 Forage 上免费发布的一组任务，我在 2022 年 10 月到 2023 年 8 月之间利用业余时间完成。它们让我看到分析师、数据科学家和咨询顾问在碰数据之前，是怎样先把业务问题想清楚的。有几个仓库只留下了任务说明，因为作业是直接在 Forage 上提交的，所以这些卡片按任务原本的设置来描述。",
  },
  glance: [
    { k: { en: "Programmes", zh: "项目数" }, v: { en: "12", zh: "12" } },
    { k: { en: "Companies", zh: "公司数" }, v: { en: "11", zh: "11" } },
    {
      k: { en: "Period", zh: "时间" },
      v: { en: "Oct 2022 – Aug 2023", zh: "2022.10 – 2023.08" },
    },
    { k: { en: "Format", zh: "形式" }, v: { en: "Self-paced", zh: "自主完成" } },
  ],
  filterLabel: { en: "Skill area", zh: "技能方向" },
  all: { en: "All", zh: "全部" },
  showing: {
    en: "Showing {shown} of {total} programmes",
    zh: "显示 {shown} / {total} 个项目",
  },
  question: { en: "Business question", zh: "业务问题" },
  did: { en: "What I did", zh: "我做了什么" },
  tools: { en: "Tools", zh: "工具" },
  deliverable: { en: "Deliverable", zh: "交付物" },
  footerNote: {
    en: "Company names appear as text only. No logos, datasets, briefs or certificates are hosted here.",
    zh: "公司名称只以文字出现。本页不收录任何标志、数据集、任务说明或证书。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  metaTitle: {
    en: "Virtual Internships (Forage) · Projects · rin.contact",
    zh: "虚拟实习（Forage）· 项目 · rin.contact",
  },
  metaDescription: {
    en: "Twelve Forage virtual experience programmes Rin Huang completed between 2022 and 2023, from KPMG, BCG, British Airways, Quantium, Tata, Cognizant, GE Aviation, Accenture, Red Bull, PwC and Standard Bank. Each card covers the business question, methods, tools and deliverable.",
    zh: "Rin Huang 在 2022 到 2023 年间完成的十二个 Forage 虚拟实习项目，来自 KPMG、BCG、英国航空、Quantium、Tata、Cognizant、GE 航空、埃森哲、红牛、普华永道和标准银行。每张卡片写明业务问题、方法、工具和交付物。",
  },
  ogTitle: { en: "Virtual Internships (Forage) · Rin Huang", zh: "虚拟实习（Forage）· Rin Huang" },
};

export const AREA_LABELS = {
  analytics: { en: "Analytics", zh: "数据分析" },
  ml: { en: "Machine learning", zh: "机器学习" },
  visualisation: { en: "Visualisation", zh: "可视化" },
  engineering: { en: "Data engineering", zh: "数据工程" },
  consulting: { en: "Sales and consulting", zh: "销售与咨询" },
};

export const DELIVERABLE_LABELS = {
  model: { en: "Model", zh: "模型" },
  dashboard: { en: "Dashboard", zh: "仪表板" },
  deck: { en: "Deck", zh: "演示文稿" },
  report: { en: "Report", zh: "报告" },
  email: { en: "Client email", zh: "客户邮件" },
  video: { en: "Video", zh: "视频" },
  code: { en: "Code", zh: "代码" },
};

// Newest first. `from` / `to` are Rin's first and last own commits (YYYY-MM).
export const PROGRAMMES = [
  {
    id: "pwc-digital-intelligence",
    company: { en: "PwC", zh: "普华永道" },
    programme: { en: "Digital Intelligence", zh: "数字智能" },
    from: "2023-08",
    to: "2023-08",
    areas: ["ml"],
    deliverables: ["model", "code"],
    tools: ["Python", "pandas", "scikit-learn", "SHAP"],
    question: {
      en: "A retail bank uses a model to choose which clients to phone about term deposits. Can we explain why it makes each call?",
      zh: "一家零售银行用模型决定给哪些客户打电话推销定期存款。我们能不能解释它每一次为什么这样判断？",
    },
    did: {
      en: "I trained a cross-validated logistic regression on the public UCI Bank Marketing data, about 41,000 campaign records, and checked it with a confusion matrix and a classification report. I then used SHAP to show which features drive the predictions overall, and drew force plots that explain the prediction for individual clients.",
      zh: "我在公开的 UCI Bank Marketing 数据（约 41,000 条营销记录）上训练了带交叉验证的逻辑回归，用混淆矩阵和分类报告检查效果。然后用 SHAP 看哪些特征在整体上影响预测，再画出单个客户的 force plot，解释模型对这个人为什么给出这个结果。",
    },
  },
  {
    id: "ge-aviation",
    company: { en: "GE Aviation", zh: "GE 航空" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-11",
    to: "2022-12",
    areas: ["engineering", "visualisation"],
    deliverables: ["dashboard"],
    tools: ["Excel", "Tableau"],
    question: {
      en: "How can engine, manufacturing and airport data be combined into one table, and are machined parts staying within their design tolerances?",
      zh: "怎样把发动机、制造和机场数据合成一张表？加工出来的零件是否都在设计公差之内？",
    },
    did: {
      en: "The first task joins full-flight engine data from four airlines with manufacturing and airport lookup tables. One airline stored a temperature reading in Rankine, so it has to be converted before the merge. The second task turns the combined data into run charts and KPI tables that show whether parts were made inside specification.",
      zh: "第一个任务把四家航空公司的整段飞行发动机数据，和制造数据、机场对照表连接起来。其中一家航空公司的温度读数用的是兰氏温标，合并前要先换算。第二个任务用合并后的数据做运行图和 KPI 表，看零件是否在规格范围内生产。",
    },
  },
  {
    id: "british-airways",
    company: { en: "British Airways", zh: "英国航空" },
    programme: { en: "Data Science", zh: "数据科学" },
    from: "2022-11",
    to: "2022-11",
    areas: ["ml", "engineering", "analytics"],
    deliverables: ["code", "model", "deck"],
    tools: [
      "Python",
      "BeautifulSoup",
      "pandas",
      "VADER",
      "Hugging Face Transformers",
      "scikit-learn",
      "statsmodels",
      "Plotly",
    ],
    question: {
      en: "What do travellers say about the airline, and can we predict which customers will go on to complete a booking?",
      zh: "旅客怎么评价这家航空公司？能不能预测哪些客户最后会完成预订？",
    },
    did: {
      en: "I wrote a threaded scraper with requests and BeautifulSoup to collect airline reviews from Skytrax, then cleaned the text and scored its sentiment with VADER and a Hugging Face Transformers pipeline. For the second task I prepared the customer booking data, fitted an OLS baseline and a neural network classifier, and read off which features mattered most. Each task ended in a one-slide summary.",
      zh: "我用 requests 和 BeautifulSoup 写了一个多线程爬虫，从 Skytrax 抓取航空公司评论，清洗文本后用 VADER 和 Hugging Face Transformers 做情感打分。第二个任务里，我整理了客户预订数据，先拟合一个 OLS 基线，再训练神经网络分类器，最后看哪些特征最重要。两个任务各用一页幻灯片收尾。",
    },
  },
  {
    id: "bcg",
    company: { en: "BCG", zh: "BCG" },
    programme: { en: "Data Science & Analytics", zh: "数据科学与分析" },
    from: "2022-11",
    to: "2022-11",
    areas: ["ml", "analytics"],
    deliverables: ["email", "model", "deck"],
    tools: ["Python", "pandas", "scikit-learn", "Matplotlib", "seaborn"],
    question: {
      en: "PowerCo, a European gas and electricity utility, was losing small and medium business customers. Was price sensitivity driving that churn?",
      zh: "欧洲燃气与电力公司 PowerCo 的中小企业客户在不断流失。这种流失是不是由价格敏感度造成的？",
    },
    did: {
      en: "The four modules take the question from a hypothesis to an executive summary. I framed the data needs in an email to the associate director, explored the customer and pricing data, engineered features such as the gap between December and January off-peak prices, and trained a random forest to predict churn. The last step was a one-slide summary for a steering committee.",
      zh: "四个模块把这个问题从一个假设一路带到高管摘要。我先给副总监写邮件，说明需要哪些数据，然后探索客户和价格数据，构造了 12 月与 1 月非高峰电价之差这类特征，再训练随机森林预测流失。最后一步是给指导委员会做一页摘要。",
    },
  },
  {
    id: "cognizant",
    company: { en: "Cognizant", zh: "Cognizant" },
    programme: { en: "Artificial Intelligence", zh: "人工智能" },
    from: "2022-11",
    to: "2022-11",
    areas: ["ml", "engineering"],
    deliverables: ["email", "deck", "model", "code"],
    tools: ["Python", "pandas", "scikit-learn", "Google Colab"],
    question: {
      en: "Gala Groceries sells highly perishable stock. Can sales and sensor data predict hourly stock levels well enough to guide what it orders from suppliers?",
      zh: "Gala Groceries 卖的大多是容易变质的生鲜。能不能用销售数据和传感器数据，按小时预测库存，从而更聪明地向供应商订货？",
    },
    did: {
      en: "The five modules run from exploratory analysis to production. I explored sample sales data and emailed the findings, planned the data model on a single slide, and combined sales, stock sensor and storage temperature data into a predictive model. I then turned the notebook into a Python module that trains the model and reports its performance, and a final quality check looked at how it would hold up in live use.",
      zh: "五个模块从探索性分析一直走到上线。我先探索样本销售数据，用邮件汇报发现，再用一页幻灯片规划数据模型，然后把销售、库存传感器和储存温度数据合在一起建预测模型。之后把 notebook 改写成一个 Python 模块，负责训练模型并输出性能指标。最后一步质量检查，看模型在实际使用中表现如何。",
    },
  },
  {
    id: "accenture",
    company: { en: "Accenture North America", zh: "埃森哲北美" },
    programme: { en: "Data Analytics and Visualisation", zh: "数据分析与可视化" },
    from: "2022-11",
    to: "2022-11",
    areas: ["analytics", "visualisation", "consulting"],
    deliverables: ["deck", "video"],
    tools: ["Excel", "PowerPoint"],
    question: {
      en: "Social Buzz, a fictional social media company, wanted to know which content categories draw the most positive engagement.",
      zh: "虚构的社交媒体公司 Social Buzz 想知道，哪些内容类别带来的正面互动最多。",
    },
    did: {
      en: "I picked the relevant tables from seven data sets, cleaned them and merged them on their keys into one table in Excel. I then ranked the content categories by their combined reaction scores, built a deck of about ten slides that tells the story, and recorded the presentation for the client.",
      zh: "我从七个数据集里挑出相关的表，在 Excel 里清洗后按主键合并成一张表。然后按反应得分的总和给内容类别排名，做了一份十页左右讲清楚来龙去脉的演示文稿，并录成给客户的汇报视频。",
    },
  },
  {
    id: "red-bull",
    company: { en: "Red Bull", zh: "红牛" },
    programme: { en: "On-Premise Sales", zh: "现饮渠道销售" },
    from: "2022-11",
    to: "2022-11",
    areas: ["consulting", "analytics"],
    deliverables: ["deck", "video"],
    tools: ["Excel", "PowerPoint"],
    question: {
      en: "Which bar and restaurant accounts are growing or slipping, and how do you win back an account that is lagging?",
      zh: "哪些酒吧和餐厅客户在增长，哪些在下滑？一个表现落后的客户，要怎么争取回来？",
    },
    did: {
      en: "I worked out compound annual growth rates on five years of account sales volume in Excel and sliced them by account type, year, promotion programme and product range. The findings went into a short deck. For the second module I used an active listening framework to answer an account owner's price and demand objections in a recorded voice message.",
      zh: "我在 Excel 里用五年的客户销量计算复合年增长率，再按客户类型、年份、促销计划和产品组合拆开来看。结论整理成一份简短的演示文稿。第二个模块里，我用一套积极倾听的方法，录了一段语音留言，回应店主对价格和需求的顾虑。",
    },
  },
  {
    id: "pwc-power-bi",
    company: { en: "PwC Switzerland", zh: "普华永道瑞士" },
    programme: { en: "Power BI", zh: "Power BI" },
    from: "2022-11",
    to: "2022-11",
    areas: ["visualisation", "consulting"],
    deliverables: ["dashboard", "email"],
    tools: ["Power BI", "DAX", "Excel"],
    question: {
      en: "A telecom client needed clear answers on call centre performance, customer churn and gender balance in its leadership.",
      zh: "一家电信客户想弄清楚三件事：呼叫中心的表现、客户流失，以及管理层的性别平衡。",
    },
    did: {
      en: "For each brief I worked back from the stakeholder's question to the KPIs that answer it, then built a Power BI dashboard with DAX measures. The churn and diversity tasks closed with a written recommendation to the client.",
      zh: "每个任务我都先从对方的问题倒推出能回答它的 KPI，再用 Power BI 和 DAX 度量值做仪表板。客户流失和多元化两个任务最后还附了一份给客户的书面建议。",
    },
  },
  {
    id: "standard-bank",
    company: { en: "Standard Bank", zh: "标准银行" },
    programme: { en: "Data Science", zh: "数据科学" },
    from: "2022-11",
    to: "2022-11",
    areas: ["ml", "consulting"],
    deliverables: ["model", "deck", "video"],
    tools: ["SQL", "Python", "pandas", "scikit-learn", "AutoML"],
    question: {
      en: "Loan officers took two to three days to review each home loan application. Can machine learning assess credit risk the moment someone applies?",
      zh: "信贷员审核一份房贷申请要两到三天。机器学习能不能在申请人提交的那一刻就评估信用风险？",
    },
    did: {
      en: "I followed the CRISP-DM process. I started with SQL to understand the data, then compared an AutoML run against a bespoke scikit-learn model for predicting loan default. The last two modules turned the work into a story for a home loans manager with little technical background, delivered as a five to ten minute video presentation.",
      zh: "整个过程按 CRISP-DM 走。先用 SQL 理解数据，再比较 AutoML 和自己手写的 scikit-learn 模型在预测贷款违约上的表现。最后两个模块把这些工作讲成一个故事，讲给技术背景不多的房贷经理听，形式是一段五到十分钟的视频汇报。",
    },
  },
  {
    id: "kpmg",
    company: { en: "KPMG", zh: "KPMG" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-10",
    to: "2022-11",
    areas: ["analytics", "visualisation"],
    deliverables: ["email", "deck", "dashboard"],
    tools: ["Python", "pandas", "Jupyter", "Tableau", "PowerPoint"],
    question: {
      en: "Sprocket Central, a bikes and cycling accessories retailer, wanted to know which of 1,000 new customers its marketing team should target first.",
      zh: "自行车及配件零售商 Sprocket Central 想知道，营销团队应该优先联系 1,000 位新客户里的哪些人。",
    },
    did: {
      en: "I checked four worksheets of customer and transaction data in pandas and wrote the client an email about the quality issues I found, such as missing values, inconsistent gender entries and a birth date in 1843. I then set out a three-phase approach in a short deck and finished with a Tableau dashboard of customer segments and trends.",
      zh: "我先用 pandas 检查了四张客户和交易数据表，给客户写邮件说明发现的数据质量问题，比如缺失值、性别字段写法不统一，还有一个 1843 年的出生日期。然后用一份简短的演示文稿说明分三步走的分析思路，最后做了一个展示客户分群和趋势的 Tableau 仪表板。",
    },
  },
  {
    id: "quantium",
    company: { en: "Quantium", zh: "Quantium" },
    programme: { en: "Data Analytics", zh: "数据分析" },
    from: "2022-10",
    to: "2022-11",
    areas: ["analytics"],
    deliverables: ["report"],
    tools: ["Python", "pandas", "R"],
    question: {
      en: "Which shoppers drive chip sales at a large supermarket chain, and did a new store layout trial lift sales?",
      zh: "在一家大型连锁超市里，哪些顾客撑起了薯片的销量？新的门店陈列试点有没有带动销售？",
    },
    did: {
      en: "I cleaned the transaction and customer data, derived pack size and brand, and segmented shoppers by life stage and premium status in pandas. For the trial I matched each trial store with a control store on sales correlation and magnitude, then tested the uplift in R. The findings went into a client report structured with the Pyramid Principle.",
      zh: "我先用 pandas 清洗交易和客户数据，提取包装规格和品牌，再按人生阶段和消费档次给顾客分群。试点部分，我按销售额的相关性和量级为每家试点门店找一家对照门店，再用 R 检验销售提升是否显著。结论按金字塔原理写成给客户的报告。",
    },
  },
  {
    id: "tata",
    company: { en: "Tata", zh: "Tata" },
    programme: { en: "Data Visualisation", zh: "数据可视化" },
    from: "2022-10",
    to: "2022-10",
    areas: ["visualisation"],
    deliverables: ["dashboard"],
    tools: ["Python", "pandas", "Tableau"],
    question: {
      en: "The CEO and CMO of an online retailer wanted to know what drives revenue and where to expand next.",
      zh: "一家网店的 CEO 和 CMO 想知道收入靠什么驱动，下一步该往哪里扩张。",
    },
    did: {
      en: "I drafted separate questions for the CEO and the CMO before building any charts, then matched each question to a chart type and wrote down why. I cleaned the UCI Online Retail data in pandas by dropping returns and invalid prices, and built the answers as Tableau dashboards.",
      zh: "动手画图之前，我先分别为 CEO 和 CMO 列出他们关心的问题，再给每个问题选合适的图表类型，并写下理由。然后用 pandas 清洗 UCI Online Retail 数据，去掉退货和无效价格，最后在 Tableau 里做成仪表板来回答这些问题。",
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

/** "2022-10" to "Oct 2022" (en) or "2022 年 10 月" (zh). Ranges collapse a shared year. */
export function formatPeriod(from, to, lang) {
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  if (lang === "zh") {
    if (from === to) return `${fy} 年 ${fm} 月`;
    if (fy === ty) return `${fy} 年 ${fm} – ${tm} 月`;
    return `${fy} 年 ${fm} 月 – ${ty} 年 ${tm} 月`;
  }
  if (from === to) return `${MONTHS_EN[fm - 1]} ${fy}`;
  if (fy === ty) return `${MONTHS_EN[fm - 1]} – ${MONTHS_EN[tm - 1]} ${fy}`;
  return `${MONTHS_EN[fm - 1]} ${fy} – ${MONTHS_EN[tm - 1]} ${ty}`;
}
