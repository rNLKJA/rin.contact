/**
 * Career data: the single source of truth for /career, /cv, /resume and the
 * resume terminal. Edit roles, education, credentials and skills here and every
 * surface follows, so the copies can no longer drift apart.
 *
 * Each entry keeps its locale-neutral fields (dates, logo, tools, track) at the
 * top level and its readable copy in `en` (en-AU) and `zh` (zh-Hans). Use the
 * get*() helpers to read a flat, localised object. Proper nouns (tools, system
 * names, acronyms) stay in English in both locales.
 *
 * Facts are checked against Life HQ/Career Path/Profile/career-profile.md and
 * education-history.md in Rin's vault. SAPOL bullets describe the kind of work
 * only: no figures from internal (OFFICIAL: Sensitive) data.
 */

import { durationLabel, formatAsOf, formatMonth } from "./career-format.js";

/** The date these facts were last checked. Shown on /resume and in its JSON-LD. */
export const CAREER_AS_OF = "2026-10-03";

export const PROFILE = {
  name: "Sunchuangyu (Rin) Huang",
  nameZh: "黄孙创宇",
  email: "huang@rin.contact",
  site: "rin.contact",
  linkedin: "https://www.linkedin.com/in/sunchuangyuhuang/",
  github: "https://github.com/rNLKJA",
  en: {
    headline: "Senior Data Analyst (ASO7), South Australia Police",
    subline: "Co-Founder & Dev Lead, Mapiva",
    location: "Adelaide, SA",
    sectors:
      "Policing, consumer regulation, mental-health research, medical research, climate science, startup",
    summary:
      "I turn complex government and research data into reporting that people act on, and build the tools that make that reporting repeatable. Since 2023 I have worked across policing, regulation, health and climate research and a startup, in English and Mandarin.",
    openTo: [
      "Senior data science and analytics roles",
      "AI and data governance",
      "Australia or remote",
    ],
    screening: "Current SA public sector employee · Working with Children Check",
  },
  zh: {
    headline: "南澳大利亚警察局 高级数据分析师（ASO7）",
    subline: "Mapiva 联合创始人兼开发负责人",
    location: "南澳 阿德莱德",
    sectors: "警务、消费者监管、心理健康研究、医学研究、气候科学、初创公司",
    summary:
      "我把复杂的政府与科研数据做成能直接支撑决策的报告，也搭建让这类报告可以反复产出的工具。2023 年以来，我做过警务、监管、健康与气候研究和初创公司的工作，中英文都能作为工作语言。",
    openTo: ["高级数据科学与分析岗位", "AI 与数据治理", "澳洲本地或远程"],
    screening: "南澳公共部门在职 · 儿童工作许可（WWCC）",
  },
};

// ── Roles, newest first ──────────────────────────────────────────────────────
// resumeCount: bullets shown on /resume and in its print; the rest sit behind
// "Show more". Every featured metric's bullet index must be below resumeCount.
// evidence: "internal" roles get a line saying the work products are internal.
export const ROLES = [
  {
    id: "sapol",
    year: "2026",
    start: "2026-03-23",
    end: null,
    track: "government",
    logo: "/images/sapol-logo.svg",
    noBorder: true,
    orgShort: "SAPOL",
    url: "https://www.police.sa.gov.au",
    resumeCount: 4,
    evidence: "internal",
    links: [],
    tools: ["Python", "Power BI", "SQL Server", "FastAPI", "Vue", "Statistical modelling"],
    metrics: [
      {
        value: "1,100+",
        en: "complaint-management API endpoints wrapped in one Python client",
        zh: "个投诉管理系统接口封装进同一个 Python 客户端",
        featured: 3,
        bullet: 3,
      },
    ],
    en: {
      role: "ASO7 Senior Data Analyst",
      org: "South Australia Police",
      team: "Intelligence & Probity Unit, Ethical and Professional Standards Branch (EPSB)",
      orgDesc:
        "South Australia's state police service. EPSB looks after complaints, integrity and professional standards.",
      period: "Mar 2026 – Present",
      location: "Adelaide, SA",
      tag: "Government · Analytics",
      highlight:
        "Use of Force and Vehicle Pursuit reporting · workflow review · complaints API client",
      summary:
        "I lead data analysis for the Ethical and Professional Standards Branch. My work turns complaint, investigation and workforce data into reports and advice that executives and oversight bodies can act on, and I build the tools that make that reporting repeatable.",
      bullets: [
        "Produce the quarterly Use of Force and Vehicle Pursuit statistical reports for SAPOL executives, with a written method so every quarter can be reproduced and checked.",
        "Led an end-to-end review of the branch's complaint administration workflow, from receipt to file closure, built from team interviews and the team's own procedure notes, with findings and recommendations for branch leadership.",
        "Analysed a full financial year of hand-issued expiation notices for the Expiation Notice Branch, using a reproducible Python and Power BI pipeline and reporting only what the data can support.",
        "Built a Python client and web console for the complaint-management system's REST APIs, covering more than 1,100 endpoints, so records can be queried and checked by script rather than by hand.",
        "Designed and ran a Microsoft 365 Copilot workshop for EPSB staff, and rebuilt one of the branch's intranet pages as an accessible tile layout.",
        "Keep core data as the single source of truth for management information, strategic planning and parliamentary reporting.",
      ],
    },
    zh: {
      role: "ASO7 高级数据分析师",
      org: "南澳大利亚警察局（SAPOL）",
      team: "职业道德与专业标准处（EPSB）情报与廉政组",
      orgDesc: "南澳州警察机构。EPSB 负责投诉处理、廉政与职业标准。",
      period: "2026年3月 – 至今",
      location: "南澳 阿德莱德",
      tag: "政府 · 分析",
      highlight: "使用武力与车辆追缉报告 · 流程审查 · 投诉系统 API 客户端",
      summary:
        "我负责职业道德与专业标准处的数据分析，把投诉、调查和人员数据整理成管理层和监督机构能直接拿来做决定的报告和建议，同时搭建让这些报告能够重复产出的工具。",
      bullets: [
        "按季度为 SAPOL 管理层编制警务使用武力与车辆追缉统计报告，并写明方法，每个季度的结果都能复现和核查。",
        "主导投诉行政流程的全流程审查，从受理一直看到结案。材料来自团队访谈和团队内部的操作笔记，最后向处领导提交审查结论和改进建议。",
        "为罚款通知处（Expiation Notice Branch）分析一个完整财年的人工开具罚款通知，用可复现的 Python 与 Power BI 流程，只报告数据能够支撑的结论。",
        "为投诉管理系统的 REST API 编写 Python 客户端和网页控制台，覆盖 1,100 多个接口，记录的查询和核对改由脚本完成，不再依赖手工操作。",
        "为 EPSB 同事设计并主讲 Microsoft 365 Copilot 工作坊，并把处里的一个内网页面重做成无障碍的磁贴布局。",
        "维护核心数据，作为管理信息、战略规划和议会报告的唯一可信来源。",
      ],
    },
  },
  {
    id: "mapiva",
    year: "2025",
    start: "2025-08-01",
    end: null,
    track: "engineering",
    logo: null,
    orgShort: "Mapiva",
    resumeCount: 3,
    evidence: null,
    links: [{ kind: "project", href: "/projects", en: "Projects", zh: "项目" }],
    tools: ["React Native", "Expo", "Django", "Rust", "PostgreSQL", "GitHub Actions"],
    metrics: [],
    en: {
      role: "Co-Founder & Dev Lead",
      org: "Mapiva",
      team: null,
      orgDesc:
        "A Melbourne startup building a map-first app for discovering people and events nearby.",
      period: "Aug 2025 – Present",
      note: "Alongside SAPOL",
      location: "Melbourne, VIC (remote)",
      tag: "Startup · Engineering",
      highlight: "Map-first social discovery app · beta in early 2027",
      summary:
        "I co-founded Mapiva and lead its development, from system architecture to code review, with a small part-time engineering team. The app is working towards a beta in early 2027.",
      bullets: [
        "Own the technical architecture: an Expo React Native client on a Django, Rust and PostgreSQL backend, shipped through GitHub Actions CI/CD.",
        "Wrote the 2026–27 development plan that sets the beta scope and release criteria, and lead code review for a part-time engineering team.",
        "Designing privacy in from the start, including age checks at sign-up and approximate locations for other people's map pins.",
      ],
    },
    zh: {
      role: "联合创始人兼开发负责人",
      org: "Mapiva",
      team: null,
      orgDesc: "墨尔本的初创公司，做一款以地图为核心、用来发现附近的人和活动的应用。",
      period: "2025年8月 – 至今",
      note: "与 SAPOL 并行",
      location: "维州 墨尔本（远程）",
      tag: "初创 · 工程",
      highlight: "以地图为核心的社交发现应用 · 2027 年初公测",
      summary:
        "我联合创办了 Mapiva，负责开发工作，从系统架构到代码评审，带着一支兼职工程团队推进。应用计划在 2027 年初开放公测。",
      bullets: [
        "负责整体技术架构：Expo React Native 客户端，Django、Rust 与 PostgreSQL 后端，通过 GitHub Actions 持续集成与交付。",
        "撰写 2026–27 开发计划，确定公测范围和发布标准，并负责兼职工程团队的代码评审。",
        "从一开始就把隐私写进设计，包括注册时的年龄核验，以及他人的地图标记只显示大致位置。",
      ],
    },
  },
  {
    id: "cbs",
    year: "2025",
    start: "2025-01-13",
    end: "2026-03-20",
    track: "government",
    logo: "/images/agd-logo.png",
    orgShort: "CBS",
    resumeCount: 5,
    evidence: "internal",
    links: [],
    tools: [
      "Power BI",
      "Python",
      "ArcGIS",
      "SQL Server",
      "Power Query",
      "Time series",
      "Regression",
      "Clustering",
    ],
    metrics: [
      {
        value: "1,500+",
        en: "licensed sites in the tobacco and e-cigarette inspection schedule",
        zh: "个持牌场所纳入烟草与电子烟检查排期",
        featured: 1,
        bullet: 0,
      },
      {
        value: "400+",
        en: "compliance inspections analysed",
        zh: "次合规检查完成分析",
        featured: 2,
        bullet: 1,
      },
      {
        value: "24+",
        en: "ministerial and Cabinet requests answered within 24 to 72 hours",
        zh: "项部长与内阁请求在 24 至 72 小时内完成",
        featured: 4,
        bullet: 3,
      },
      {
        value: "3,000+",
        en: "raw files validated in Python against Salesforce records",
        zh: "份原始文件用 Python 与 Salesforce 记录核对",
        featured: 6,
        bullet: 2,
      },
    ],
    en: {
      role: "ASO4 Intelligence & Coordination Officer",
      org: "Consumer and Business Services, Attorney-General's Department SA",
      team: "Prevention Team, Compliance & Enforcement",
      orgDesc:
        "South Australia's consumer and business regulator, covering tobacco and vaping, building work, product safety and consumer law.",
      period: "Jan 2025 – Mar 2026",
      location: "Adelaide, SA",
      tag: "Government · Intelligence",
      highlight: "Built the analytics capability from scratch · 1,500+ sites scheduled",
      summary:
        "My first full-time role. I built the team's analytics capability from a near-standing start, designing risk-based intelligence frameworks and compliance schedules, then backing them with statistics, dashboards and GIS maps used by senior management and the Minister's office.",
      bullets: [
        "Designed the inspection scheduling framework for Tobacco and E-Cigarette Products Act compliance across 1,500+ licensed sites, balancing legislative, resourcing, strategic and political priorities with the Senior Management Team.",
        "Analysed 400+ TEP Act inspections with time series, clustering and multivariate methods, and wrote the quarterly Compliance and Enforcement report from 6+ data sources.",
        "Built extraction and validation workflows across 6+ databases (ABS, SA Health, ACCC, Data SA and internal systems), including a Python check of 3,000+ raw files against Salesforce records.",
        "Answered 24+ urgent requests for ministerial briefings and Cabinet within 24 to 72 hours, and wrote the SOPs that keep the methods repeatable.",
        "Set up data-sharing MOUs with SAPOL, the Illicit Tobacco and E-cigarette Commissioner and federal regulators, a first for the team.",
        "Supported investigations with spatial and time-series analysis in Power BI, and co-developed an intelligence product that detected fraudulent licence applications through document metadata and applicant network mapping.",
      ],
    },
    zh: {
      role: "ASO4 情报与协调官",
      org: "南澳总检察长部 消费者与商业服务局（CBS）",
      team: "合规与执法处 预防组",
      orgDesc: "南澳的消费者与商业监管机构，覆盖烟草与电子烟、建筑施工、产品安全和消费者法。",
      period: "2025年1月 – 2026年3月",
      location: "南澳 阿德莱德",
      tag: "政府 · 情报",
      highlight: "从零搭建分析能力 · 1,500 多个场所纳入排期",
      summary:
        "这是我的第一份全职工作，团队的分析能力几乎是我从零搭起来的。我先设计基于风险的情报框架和合规检查计划，再用统计分析、仪表板和 GIS 地图做数据支撑，成果直接交给高级管理层和部长办公室使用。",
      bullets: [
        "为《烟草与电子烟产品法》合规设计检查排期框架，覆盖 1,500 多个持牌场所，与高级管理团队一起平衡立法、资源、战略和政治方面的优先级。",
        "用时间序列、聚类和多元统计方法分析 400 多次 TEP 法检查，并整合 6 个以上数据源撰写季度合规与执法报告。",
        "在 6 个以上数据库（ABS、SA Health、ACCC、Data SA 及内部系统）之间搭建数据提取和校验流程，其中用 Python 将 3,000 多份原始文件与 Salesforce 记录逐一核对。",
        "在 24 至 72 小时内完成 24 项以上部长简报和内阁的紧急数据请求，并编写标准作业程序（SOP），让分析方法可以重复使用。",
        "与 SAPOL、非法烟草与电子烟专员（ITEC）及联邦监管机构建立数据共享谅解备忘录（MOU），在团队内尚属首次。",
        "在 Power BI 中用空间分析和时间序列分析支持调查工作，并参与开发一项情报产品，通过文件元数据和申请人关系网络识别伪造的执照申请。",
      ],
    },
  },
  {
    // Psyckitchen: three roles from Jun to Dec 2024, titles and dates from Rin's LinkedIn (confirmed 10 Oct 2026). No logo: Rin asked for the Psyckitchen logo and lettering to stay off the site.
    id: "psyckitchen-cloud",
    year: "2024",
    start: "2024-10-01",
    end: "2024-12-31",
    track: "engineering",
    logo: null,
    orgShort: "Psyckitchen",
    resumeCount: 2,
    evidence: null,
    links: [],
    tools: ["Azure", "Cloud"],
    metrics: [],
    en: {
      role: "Cloud Engineer",
      org: "Psyckitchen",
      team: null,
      orgDesc: "A small Melbourne team behind a Chinese-language psychology and wellbeing brand.",
      period: "Oct 2024 – Dec 2024",
      note: "Freelance · remote",
      location: "Melbourne, VIC (remote)",
      tag: "Startup · Cloud",
      highlight: "Azure web services · uptime and performance",
      summary:
        "I looked after Psyckitchen's web services on Azure for the last three months of 2024, keeping them running and tuning them for performance and growth.",
      bullets: [
        "Managed the Azure web services and kept them up and running.",
        "Optimised the cloud infrastructure for performance and scalability.",
        "Worked with people from across the team on changes to the services.",
      ],
    },
    zh: {
      role: "云工程师（Cloud Engineer）",
      org: "Psyckitchen",
      team: null,
      orgDesc: "墨尔本的一支小团队，经营一个中文心理与身心健康品牌。",
      period: "2024年10月 – 2024年12月",
      note: "自由职业 · 远程",
      location: "维州 墨尔本（远程）",
      tag: "初创 · 云",
      highlight: "Azure 网络服务 · 稳定运行与性能",
      summary:
        "2024 年最后三个月，我负责 Psyckitchen 在 Azure 上的网络服务，保证服务稳定运行，并针对性能和扩展做优化。",
      bullets: [
        "管理 Azure 网络服务，保证服务稳定在线。",
        "优化云基础设施的性能和可扩展性。",
        "与团队里不同岗位的同事合作推进服务的调整。",
      ],
    },
  },
  {
    id: "unimelb-psychiatry",
    year: "2024",
    start: "2024-08-01",
    end: "2026-02-28",
    track: "research",
    logo: "/images/unimelb-logo.png",
    orgShort: "UniMelb",
    resumeCount: 3,
    evidence: null,
    links: [
      { kind: "project", href: "/projects/moodist", en: "Moodist write-up", zh: "Moodist 手记" },
    ],
    tools: ["Expo", "React Native", "Flask", "Python", "AWS RDS", "AWS LightSail", "CI/CD"],
    metrics: [
      {
        value: "<$500",
        en: "a month to host the whole clinical mood-tracking app",
        zh: "整个临床情绪追踪应用每月的托管费用",
        featured: 5,
        bullet: 2,
      },
    ],
    en: {
      role: "Research Assistant (RA.1), digital mental health",
      org: "University of Melbourne, Department of Psychiatry",
      team: "Department of Psychiatry",
      orgDesc:
        "A leading research university. Its Department of Psychiatry builds digital mental-health tools.",
      period: "Aug 2024 – Feb 2026",
      note: "Three phases, alongside CBS",
      location: "Parkville, VIC",
      tag: "Research · Mobile Dev",
      highlight: "Sole developer · hosting under $500/month · handed to a production team",
      summary:
        "I was the sole developer of a clinical mood-tracking app for the Department of Psychiatry. I rebuilt it in Expo React Native, built the clinician dashboard, ran the AWS infrastructure, and handed it to a professional team for production.",
      bullets: [
        "Rebuilt the app from Uniapp to Expo React Native, improving performance and cross-platform support on iOS and Android.",
        "Built the clinician dashboard from scratch for structured patient data, on a Flask (Python) backend.",
        "Kept hosting for the whole platform under $500 a month by running each service in its own Docker container on AWS LightSail, with GDPR-aligned data protection and CI/CD.",
        "Delivered in three phases between August 2024 and February 2026, ending with a handover to a professional development team for production.",
      ],
    },
    zh: {
      role: "研究助理（RA.1），数字心理健康项目",
      org: "墨尔本大学 精神病学系",
      team: "精神病学系",
      orgDesc: "澳洲顶尖研究型大学，精神病学系在开发数字心理健康工具。",
      period: "2024年8月 – 2026年2月",
      note: "分三阶段，与 CBS 并行",
      location: "维州 帕克维尔",
      tag: "研究 · 移动开发",
      highlight: "唯一开发者 · 每月托管不到 $500 · 移交专业团队上线",
      summary:
        "我是精神病学系一款临床情绪追踪应用的唯一开发者，用 Expo React Native 重建了应用，搭了临床医生仪表板，负责 AWS 基础设施运维，最后把应用移交给专业团队上线。",
      bullets: [
        "将应用从 Uniapp 重建为 Expo React Native，提升了 iOS 和 Android 上的性能与跨平台兼容性。",
        "从零搭建临床医生仪表板，用于结构化管理患者数据，后端为 Flask（Python）。",
        "把各项服务分别放进 Docker 容器、部署在 AWS LightSail 上，整个平台每月托管费用不到 $500，并落实符合 GDPR 的数据保护和 CI/CD。",
        "2024 年 8 月至 2026 年 2 月分三个阶段交付，最后移交给专业开发团队部署上线。",
      ],
    },
  },
  {
    // Psyckitchen operations role. LinkedIn names no tools, so none are listed.
    id: "psyckitchen-ops",
    year: "2024",
    start: "2024-07-01",
    end: "2024-12-31",
    track: "engineering",
    logo: null,
    orgShort: "Psyckitchen",
    resumeCount: 3,
    evidence: null,
    links: [],
    tools: [],
    metrics: [],
    en: {
      role: "Operating Officer & Organisational Development Lead",
      org: "Psyckitchen",
      team: null,
      orgDesc: "A small Melbourne team behind a Chinese-language psychology and wellbeing brand.",
      period: "Jul 2024 – Dec 2024",
      note: "Full-time · hybrid",
      location: "Melbourne, VIC (hybrid)",
      tag: "Startup · Operations",
      highlight: "Team of 20 · free tools that fit the budget · a training program",
      summary:
        "I worked with a team of 20 to give Psyckitchen a structure that helped everyone work more efficiently.",
      bullets: [
        "Worked alongside a team of 20 to put a structure in place that made day-to-day work more efficient.",
        "Chose and introduced free communication and project-management tools that fitted the budget.",
        "Helped create a training program for the team.",
      ],
    },
    zh: {
      role: "运营官兼组织发展负责人（Operating Officer & Organisational Development Lead）",
      org: "Psyckitchen",
      team: null,
      orgDesc: "墨尔本的一支小团队，经营一个中文心理与身心健康品牌。",
      period: "2024年7月 – 2024年12月",
      note: "全职 · 混合办公",
      location: "维州 墨尔本（混合办公）",
      tag: "初创 · 运营",
      highlight: "20 人团队 · 合乎预算的免费工具 · 培训计划",
      summary: "我和一支 20 人的团队一起，为 Psyckitchen 搭起一套让大家工作更高效的组织结构。",
      bullets: [
        "与 20 人的团队一起搭建组织结构，让日常工作更高效。",
        "挑选并引入合乎预算的免费沟通和项目管理工具。",
        "参与制定团队的培训计划。",
      ],
    },
  },
  {
    // Psyckitchen product role. Echo (/projects/psyckitchen-echo) was built here in June 2024.
    id: "psyckitchen-product",
    year: "2024",
    start: "2024-06-01",
    end: "2024-12-31",
    track: "engineering",
    logo: null,
    orgShort: "Psyckitchen",
    resumeCount: 3,
    evidence: null,
    links: [
      {
        kind: "project",
        href: "/projects/psyckitchen-echo",
        en: "Echo write-up",
        zh: "Echo 介绍",
      },
    ],
    tools: ["OpenAI API", "Python", "Flask", "MongoDB", "Next.js"],
    metrics: [],
    en: {
      role: "AI Product and LLM Prompt Specialist",
      org: "Psyckitchen",
      team: null,
      orgDesc: "A small Melbourne team behind a Chinese-language psychology and wellbeing brand.",
      period: "Jun 2024 – Dec 2024",
      note: "Freelance · hybrid",
      location: "Melbourne, VIC (hybrid)",
      tag: "Startup · AI Product",
      highlight: "Product ideas and prompt writing · the Echo prototype",
      summary:
        "I joined Psyckitchen on the product side and did a bit of everything, and this is where I found my feet writing prompts for large language models.",
      bullets: [
        "Came up with new product ideas and helped refine the processes behind them.",
        "Wrote and tested prompts for LLM features, including the persona for Echo, a companion chatbot prototype.",
        "Built Echo's Flask and MongoDB backend on Azure App Service and a Next.js test page in June 2024. The prototype has since ended.",
      ],
    },
    zh: {
      role: "AI 产品与大语言模型提示词专员（AI Product and LLM Prompt Specialist）",
      org: "Psyckitchen",
      team: null,
      orgDesc: "墨尔本的一支小团队，经营一个中文心理与身心健康品牌。",
      period: "2024年6月 – 2024年12月",
      note: "自由职业 · 混合办公",
      location: "维州 墨尔本（混合办公）",
      tag: "初创 · AI 产品",
      highlight: "产品构思与提示词编写 · Echo 原型",
      summary:
        "我在 Psyckitchen 从产品岗位做起，什么都参与一点，也是在这里找到了编写大语言模型提示词的感觉。",
      bullets: [
        "提出新的产品构思，并参与梳理背后的工作流程。",
        "为大语言模型功能编写和测试提示词，包括陪伴型聊天机器人原型 Echo 的人设。",
        "2024 年 6 月为 Echo 搭建了部署在 Azure App Service 上的 Flask 与 MongoDB 后端，以及一个 Next.js 测试页面。这个原型现已结束。",
      ],
    },
  },
  {
    id: "wehi",
    year: "2024",
    start: "2024-02-01",
    end: "2024-07-31",
    track: "research",
    logo: "/images/wehi-logo.png",
    orgShort: "WEHI",
    resumeCount: 2,
    evidence: null,
    links: [
      { kind: "project", href: "/projects/wehi-genomics", en: "GMM case study", zh: "GMM 案例" },
      {
        kind: "code",
        href: "https://github.com/WEHI-RCPStudentInternship/Genomics-Metadata-Multiplexing",
        en: "GMM on GitHub",
        zh: "GitHub 上的 GMM",
      },
      {
        kind: "code",
        href: "https://github.com/WEHIGenomicsRnD/celseq-sample-sheet-generator",
        en: "celseq-sample-sheet-generator on GitHub",
        zh: "GitHub 上的 celseq-sample-sheet-generator",
      },
    ],
    tools: [
      "R Shiny",
      "Python",
      "reticulate",
      "pandas",
      "Bash",
      "Git",
      "Milton HPC (built to run on)",
    ],
    metrics: [],
    en: {
      role: "Research Software Engineer",
      org: "WEHI (Walter and Eliza Hall Institute of Medical Research)",
      team: "Bioinformatics",
      orgDesc: "One of Australia's leading biomedical research institutes.",
      period: "Feb 2024 – Jul 2024",
      location: "Parkville, VIC",
      tag: "Bioinformatics · Research Software",
      highlight: "GMM sample-sheet tooling · R Shiny",
      summary:
        "Worked on Genomics Metadata Multiplexing (GMM), an R Shiny tool built to run on WEHI's Milton HPC. It builds CEL-Seq2 sample sheets for plate-based single-cell sequencing and merges FACS index-sort metadata with the plate layout.",
      bullets: [
        "Wrote the Shiny side of GMM, which merges plate layouts, FACS index-sort files and primer indexes into one CEL-Seq2 sample sheet, plus a small Python wrapper around the existing merge logic.",
        "Added test inputs with expected outputs, so the merged sample sheet could be checked against known results.",
        "Contributed a column clean-up step to WEHIGenomicsRnD/celseq-sample-sheet-generator, which was merged into its main branch.",
      ],
    },
    zh: {
      role: "研究软件工程师",
      org: "WEHI（沃尔特与伊丽莎·霍尔医学研究所）",
      team: "生物信息学",
      orgDesc: "澳洲领先的生物医学研究机构之一。",
      period: "2024年2月 – 2024年7月",
      location: "维州 帕克维尔",
      tag: "生物信息 · 科研软件",
      highlight: "GMM 样本表工具 · R Shiny",
      summary:
        "参与开发 Genomics Metadata Multiplexing（GMM），一个为 WEHI 的 Milton HPC 设计的 R Shiny 工具。它为基于孔板的单细胞测序生成 CEL-Seq2 样本表，并把 FACS 索引分选元数据和孔板布局合并在一起。",
      bullets: [
        "编写 GMM 的 Shiny 部分，把孔板布局、FACS 索引分选文件和引物索引合并成一张 CEL-Seq2 样本表，另写了一个调用现有合并逻辑的 Python 小封装。",
        "加入带预期输出的测试输入，用已知结果核对合并后的样本表。",
        "为 WEHIGenomicsRnD/celseq-sample-sheet-generator 贡献了一个清理多余列的步骤，已合并进主分支。",
      ],
    },
  },
  {
    id: "csiro",
    year: "2023",
    start: "2023-02-01",
    end: "2023-11-30",
    track: "research",
    logo: "/images/csiro-logo.png",
    noBorder: true,
    orgShort: "CSIRO",
    resumeCount: 2,
    evidence: null,
    links: [],
    tools: [
      "Python",
      "AR time series",
      "Rolling-window forecasting",
      "Statistical modelling",
      "Jupyter",
    ],
    metrics: [],
    en: {
      role: "Data Science Industrial Consultant",
      org: "CSIRO",
      team: "Climate science",
      orgDesc: "Australia's national science agency.",
      period: "Feb 2023 – Nov 2023",
      location: "Melbourne, VIC",
      tag: "Climate Science · ML",
      highlight: "ENSO and commodity volatility · food-security risk",
      summary:
        "Worked with Dr Vassili Kitsios on climate-economic research, building autoregressive time-series models to measure how ENSO amplifies commodity price volatility and, through food security, the risk of conflict.",
      bullets: [
        "Built AR time-series models with rolling-window forecasting to quantify how ENSO amplifies commodity price (log-return) volatility.",
        "Contributed to research on machine-learning estimates of how future climate risk amplifies food-security-induced conflict.",
        "Acted as the point of contact between University of Melbourne staff and CSIRO researchers.",
      ],
    },
    zh: {
      role: "数据科学产业顾问",
      org: "CSIRO（澳大利亚联邦科学与工业研究组织）",
      team: "气候科学",
      orgDesc: "澳大利亚国家科学机构。",
      period: "2023年2月 – 2023年11月",
      location: "维州 墨尔本",
      tag: "气候科学 · 机器学习",
      highlight: "ENSO 与大宗商品波动 · 粮食安全风险",
      summary:
        "与 Vassili Kitsios 博士合作开展气候与经济研究，构建自回归时间序列模型，衡量 ENSO 如何放大大宗商品价格波动，并经由粮食安全推高冲突风险。",
      bullets: [
        "构建带滚动窗口预测的自回归（AR）时间序列模型，量化 ENSO 对大宗商品价格（对数收益率）波动的放大作用。",
        "参与用机器学习估计未来气候风险如何放大粮食安全引发冲突的研究。",
        "担任墨尔本大学教职人员与 CSIRO 研究人员之间的联络人。",
      ],
    },
  },
];

// ── Education, newest first ──────────────────────────────────────────────────
const UNIMELB_LOGO = "/images/unimelb-logo.png";

export const EDUCATION = [
  {
    id: "mds",
    year: "2023–2024",
    logo: UNIMELB_LOGO,
    noBorder: true,
    secondary: false,
    resume: true,
    en: {
      role: "Master of Data Science",
      org: "University of Melbourne",
      orgDesc:
        "One of Australia's leading research universities, consistently ranked in the world's top 50.",
      period: "Feb 2023 – Jul 2024",
      location: "Parkville, VIC",
      tag: "Postgraduate · AQF Level 9",
      line: "Capstone research project with CSIRO",
      summary:
        "A rigorous program spanning statistical learning, cloud computing, Bayesian methods and applied data science, finishing with a year-long capstone research project with CSIRO.",
      bullets: [
        "Statistics: Statistical Machine Learning · Statistical Modelling for Data Science · Bayesian Statistical Learning · Multivariate Statistics for Data Science · Computational Statistics & Data Science",
        "Computing: Advanced Database Systems · Cluster and Cloud Computing · Natural Language Processing",
        "Capstone: Data Science Project Pt 1 & 2 (MAST90106/07), with CSIRO",
        "Industry: Science & Technology Internship (SCIE90017) · Communicating Science at Work",
      ],
    },
    zh: {
      role: "数据科学硕士",
      org: "墨尔本大学",
      orgDesc: "澳洲顶尖研究型大学，长期位列世界前 50。",
      period: "2023年2月 – 2024年7月",
      location: "维州 帕克维尔",
      tag: "研究生 · AQF 9 级",
      line: "与 CSIRO 合作的毕业研究项目",
      summary:
        "课程覆盖统计学习、云计算、贝叶斯方法和应用数据科学，最后是与 CSIRO 合作、为期一年的毕业研究项目。",
      bullets: [
        "统计：统计机器学习 · 数据科学统计建模 · 贝叶斯统计学习 · 数据科学多元统计 · 计算统计与数据科学",
        "计算：高级数据库系统 · 集群与云计算 · 自然语言处理",
        "毕业项目：数据科学项目第 1、2 部分（MAST90106/07），与 CSIRO 合作完成",
        "行业：科学与技术实习（SCIE90017）· 职场科学传播",
      ],
    },
  },
  {
    id: "bsc",
    year: "2019–2022",
    logo: UNIMELB_LOGO,
    noBorder: true,
    secondary: false,
    resume: true,
    en: {
      role: "Bachelor of Science, Data Science",
      org: "University of Melbourne",
      orgDesc:
        "The same university; the undergraduate degree built the mathematical and computational foundations.",
      period: "Jul 2019 – Jul 2022",
      location: "Parkville, VIC",
      tag: "Undergraduate · AQF Level 7",
      line: "Major in Data Science",
      summary:
        "Three years building mathematical, statistical and computational foundations across data science, machine learning, algorithms and software engineering.",
      bullets: [
        "Computing: Foundations of Computing · Foundations of Algorithms · Algorithms & Data Structures · Elements of Data Processing · Database Systems · Web Information Technologies · Artificial Intelligence",
        "Data Science & ML: Machine Learning · Applied Data Science · Modern Applied Statistics",
        "Mathematics & Statistics: Calculus 2 · Linear Algebra · Probability · Statistics · Discrete Maths & Operations Research · Linear Statistical Models · Techniques in Operations Research",
        "Capstone: IT Project (COMP30022), collaborative software engineering",
        "Breadth: Positive Leadership & Careers · Business Negotiations · Principles of Finance · Principles of Marketing",
      ],
    },
    zh: {
      role: "理学学士（数据科学）",
      org: "墨尔本大学",
      orgDesc: "同一所大学；本科阶段打下数学与计算基础。",
      period: "2019年7月 – 2022年7月",
      location: "维州 帕克维尔",
      tag: "本科 · AQF 7 级",
      line: "主修数据科学",
      summary: "三年时间打下数学、统计和计算基础，覆盖数据科学、机器学习、算法和软件工程。",
      bullets: [
        "计算：计算基础 · 算法基础 · 算法与数据结构 · 数据处理基础 · 数据库系统 · Web 信息技术 · 人工智能",
        "数据科学与机器学习：机器学习 · 应用数据科学 · 现代应用统计",
        "数学与统计：微积分 2 · 线性代数 · 概率 · 统计 · 离散数学与运筹学 · 线性统计模型 · 运筹学方法",
        "毕业项目：IT 项目（COMP30022），团队协作软件工程",
        "通识：积极领导力与职业 · 商务谈判 · 金融学原理 · 市场营销原理",
      ],
    },
  },
  {
    id: "trinity",
    year: "2018–2019",
    logo: "/images/trinity-logo.png",
    noBorder: true,
    secondary: false,
    en: {
      role: "Foundation Studies Program",
      org: "Trinity College, University of Melbourne",
      orgDesc:
        "Residential college of the University of Melbourne, running the university's foundation program for international students.",
      period: "Mar 2018 – May 2019",
      location: "Parkville, VIC",
      tag: "Foundation",
      summary:
        "Completed the university pathway program, building academic English and discipline breadth before the Bachelor of Science at the University of Melbourne.",
      bullets: [
        "Subjects: Mathematics 1 & 2 · Economics · Psychology · Drama · Literature · History · English for Academic Purposes",
      ],
    },
    zh: {
      role: "预科课程（Foundation Studies）",
      org: "墨尔本大学三一学院",
      orgDesc: "墨尔本大学附属寄宿学院，为国际学生开设大学预科课程。",
      period: "2018年3月 – 2019年5月",
      location: "维州 帕克维尔",
      tag: "预科",
      summary: "完成大学预科课程，为进入墨尔本大学理学学士打下学术英语和学科基础。",
      bullets: ["科目：数学 1、2 · 经济学 · 心理学 · 戏剧 · 文学 · 历史 · 学术英语"],
    },
  },
  {
    id: "anshun",
    year: "2014–2017",
    logo: "/images/anshun-highschool-logo.jpg",
    secondary: true,
    en: {
      role: "Senior High School (to Year 12)",
      org: "Anshun No. 2 Senior High School",
      orgDesc: "安顺市第二高级中学, a senior high school in Anshun, Guizhou, China.",
      period: "Sep 2014 – Mar 2017",
      location: "Anshun, Guizhou, China",
      tag: "Secondary",
      summary:
        "Studied the Chinese senior high school curriculum, leaving part-way through Year 12 in March 2017 to begin the Australian study pathway.",
      bullets: [
        "Subjects: Mathematics · Physics · Chemistry · Biology · Chinese Literature · English",
      ],
    },
    zh: {
      role: "高中（读至高三）",
      org: "安顺市第二高级中学",
      orgDesc: "贵州安顺的一所高级中学。",
      period: "2014年9月 – 2017年3月",
      location: "贵州 安顺",
      tag: "高中",
      summary: "读到高三上学期，2017 年 3 月离校，转入澳洲留学路径。",
      bullets: ["科目：数学 · 物理 · 化学 · 生物 · 语文 · 英语"],
    },
  },
];

// ── Volunteering and mentoring, newest first ─────────────────────────────────
export const VOLUNTEER = [
  {
    id: "stem-mentor-2025",
    year: "2025",
    logo: UNIMELB_LOGO,
    en: {
      role: "2025 STEM Industry Mentoring Program, Mentor",
      org: "University of Melbourne",
      orgDesc: "Industry outreach and mentoring for STEM students.",
      period: "Jul 2025 – Dec 2025",
      location: "Melbourne, VIC",
      tag: "Science & Technology",
      summary:
        "Mentored undergraduate and postgraduate STEM students through the University of Melbourne's 2025 Industry Mentoring Program, sharing industry experience across data science, analytics and software engineering so students can bridge study and professional practice.",
      bullets: [
        "Gave career guidance and industry context to students on STEM pathways.",
        "Shared practical experience in data analytics, government intelligence and research software engineering.",
        "Helped students build professional confidence and work through early-career decisions.",
      ],
    },
    zh: {
      role: "2025 STEM 行业导师计划 导师",
      org: "墨尔本大学",
      orgDesc: "面向 STEM 学生的行业交流与导师项目。",
      period: "2025年7月 – 2025年12月",
      location: "维州 墨尔本",
      tag: "科学与技术",
      summary:
        "在墨尔本大学 2025 行业导师计划中指导本科和研究生 STEM 学生，分享数据科学、数据分析和软件工程方面的行业经验，帮助他们从课堂走向职场。",
      bullets: [
        "为走 STEM 方向的学生提供职业建议和行业背景。",
        "分享数据分析、政府情报和研究软件工程的实际经验。",
        "帮助学生建立职业信心，处理职业起步阶段的选择。",
      ],
    },
  },
  {
    id: "peer-mentor-2024",
    year: "2024",
    logo: UNIMELB_LOGO,
    en: {
      role: "2024 Data Science Peer-to-Peer Mentor",
      org: "University of Melbourne",
      orgDesc: "Peer mentoring for the Master of Data Science program.",
      period: "Aug 2024 – Sep 2024",
      location: "Parkville, VIC",
      tag: "Education",
      summary:
        "Peer mentor in the Data Science Peer-to-Peer Mentoring Program, supporting new Master of Data Science students through their transition to university, and earned a verified People Leadership credential through Melbourne Plus.",
      bullets: [
        "Guided incoming Master of Data Science students through their transition to university life.",
        "Organised and joined training sessions, welcome morning teas, meet-ups and wrap-up events.",
        "Built a sense of community so students could connect and share experiences.",
        "Earned a verified People Leadership digital credential through Melbourne Plus.",
      ],
    },
    zh: {
      role: "2024 数据科学朋辈导师",
      org: "墨尔本大学",
      orgDesc: "数据科学硕士项目的朋辈导师计划。",
      period: "2024年8月 – 2024年9月",
      location: "维州 帕克维尔",
      tag: "教育",
      summary:
        "在数据科学朋辈导师项目中担任导师，帮助数据科学硕士新生适应大学生活，并通过 Melbourne Plus 获得经认证的人员领导力（People Leadership）数字证书。",
      bullets: [
        "指导数据科学硕士新生适应大学生活。",
        "组织并参加培训、迎新早茶、自发聚会和结营活动。",
        "促进学生之间的联系，营造互相交流的社群氛围。",
        "通过 Melbourne Plus 获得经认证的人员领导力数字证书。",
      ],
    },
  },
  {
    id: "feit-endeavour-2024",
    year: "2024",
    logo: UNIMELB_LOGO,
    en: {
      role: "2024 FEIT Endeavour Exhibition, Volunteer Staff",
      org: "University of Melbourne",
      orgDesc:
        "The Faculty of Engineering and Information Technology's annual student project exhibition.",
      period: "Oct 2024",
      location: "Parkville, VIC",
      tag: "Education",
      summary:
        "Volunteered as event staff for the FEIT Endeavour Exhibition, welcoming guests, managing registrations, guiding visitors and supporting project students and the Endeavour Events Team.",
      bullets: [
        "Welcomed and registered guests, handed out name tags and guided them with interactive maps.",
        "Supported project students and kept the exhibition space welcoming and informative.",
        "Promoted the People's Choice Awards and encouraged visitors to vote.",
        "Ran guest counts and pointed visitors to the QR codes for exhibition information.",
      ],
    },
    zh: {
      role: "2024 FEIT Endeavour 展览 志愿者",
      org: "墨尔本大学",
      orgDesc: "工程与信息技术学院（FEIT）一年一度的学生项目展览。",
      period: "2024年10月",
      location: "维州 帕克维尔",
      tag: "教育",
      summary:
        "在 FEIT Endeavour 展览担任活动志愿者：迎接来宾、办理签到、引导参观，并支持参展学生和活动团队。",
      bullets: [
        "迎接并登记来宾，发放胸牌，用互动地图为来宾指路。",
        "支持参展学生，维持友好、信息清晰的展区。",
        "推广观众选择奖（People's Choice Awards），鼓励来宾投票。",
        "统计来访人数，引导来宾扫码查看展览信息。",
      ],
    },
  },
  {
    id: "anu-analytics-plus-2024",
    year: "2024",
    logo: "/images/practera-logo.jpg",
    noBorder: true,
    en: {
      role: "ANU CBE Analytics Plus Program, Mentor",
      org: "Practera",
      orgDesc: "Experiential learning platform connecting students with industry projects.",
      period: "Jul 2024",
      location: "Remote",
      tag: "Education",
      summary:
        "Mentored ANU students through a three-week virtual data analytics challenge for BrandHook, sharing industry insight and keeping the team on track; earned a completer badge and strong student feedback.",
      bullets: [
        "Mentored ANU College of Business and Economics students through a three-week analytics engagement for BrandHook.",
        "Shared industry practice on data science method and communication, keeping the team focused.",
        "Helped the team prepare a final presentation that drew strong client feedback.",
        "Earned a completer badge and excellent student feedback on mentoring style.",
      ],
    },
    zh: {
      role: "ANU CBE Analytics Plus 项目 导师",
      org: "Practera",
      orgDesc: "连接学生与真实行业项目的体验式学习平台。",
      period: "2024年7月",
      location: "远程",
      tag: "教育",
      summary:
        "在为期三周的线上数据分析挑战中指导澳大利亚国立大学（ANU）学生，为客户 BrandHook 完成项目；分享行业经验、把控团队进度，获得完成徽章和学生的高度评价。",
      bullets: [
        "在三周的线上分析项目中指导 ANU 商业与经济学院学生，服务客户 BrandHook。",
        "分享数据科学方法和沟通方面的行业做法，帮助团队保持专注。",
        "协助团队准备最终汇报，汇报获得客户的积极反馈。",
        "获得完成徽章，学生对指导方式评价很高。",
      ],
    },
  },
  {
    id: "elite-talks-2017",
    year: "2017",
    logo: "/images/elite-talks-logo.png",
    en: {
      role: "Event Executive & Staff",
      org: "Elite Talks Inc.",
      orgDesc: "Events company co-organising cultural and professional summits.",
      period: "Nov 2017",
      location: "China",
      tag: "Arts & Culture",
      summary:
        "Volunteered as an event executive at a summit co-organised by Fanmo and Elite Talks, guiding visitors into the venue and keeping order and security throughout the event.",
      bullets: [
        "Guided visitors into the venue and kept order and security throughout the event.",
        "Worked in the volunteer event team for the summit co-organised by Fanmo and Elite Talks.",
      ],
    },
    zh: {
      role: "活动执行与工作人员",
      org: "Elite Talks Inc.",
      orgDesc: "联合主办文化与职业峰会的活动公司。",
      period: "2017年11月",
      location: "中国",
      tag: "文化艺术",
      summary:
        "在 Fanmo 与 Elite Talks 联合主办的峰会上担任志愿执行人员，引导观众入场，并在活动全程维持秩序与安全。",
      bullets: [
        "引导观众入场，在活动全程维持秩序与安全。",
        "作为志愿团队成员参与 Fanmo 与 Elite Talks 联合主办的峰会。",
      ],
    },
  },
];

// ── Credentials (Life HQ/Career Path/Profile/education-history.md) ───────────
// Names and issuers are proper nouns and read the same in both locales.
export const CERTS = [
  { name: "Skills Assessment: Statistician (ANZSCO 224113)", issuer: "VETASSESS", year: "2026" },
  { name: "IELTS General Training, Band 8", issuer: "IELTS", year: "2026" },
  { name: "Credentialed Community Language (Mandarin)", issuer: "NAATI", year: "2025" },
  { name: "Google UX Design", issuer: "Google", year: "2025" },
  { name: "Google Business Intelligence", issuer: "Google", year: "2025", resume: true },
  { name: "Google Project Management", issuer: "Google", year: "2025" },
  { name: "OSINT Fundamentals", issuer: "TCM Security", year: "2025" },
  { name: "Neo4j Certified Professional", issuer: "Neo4j", year: "2025", resume: true },
  { name: "Neo4j Graph Data Science", issuer: "Neo4j", year: "2025" },
  { name: "Melbourne Plus: People Leadership", issuer: "University of Melbourne", year: "2024" },
  { name: "Melbourne Plus: Innovation", issuer: "University of Melbourne", year: "2024" },
  { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: "2024", resume: true },
  { name: "AI-Powered Productivity for Tech Roles", issuer: "Maven", year: "2024" },
  { name: "Analytics Plus Mentor (ANU CBE)", issuer: "Practera", year: "2024" },
  { name: "Advanced Google Analytics", issuer: "Google", year: "2024" },
  { name: "Google Analytics Individual Qualification (GAIQ)", issuer: "Google", year: "2024" },
  {
    name: "Agile Project Management Professional Certificate",
    issuer: "Atlassian",
    year: "2024",
  },
  { name: "Career Essentials in GitHub", issuer: "GitHub", year: "2024" },
  {
    name: "Advanced SQL for Data Scientists",
    issuer: "LinkedIn Learning",
    year: "2024",
    resume: true,
  },
  { name: "Google IT Automation with Python", issuer: "Google", year: "2022" },
  { name: "Agile with Atlassian Jira", issuer: "Atlassian", year: "2021" },
  { name: "Google Data Analytics", issuer: "Google", year: "2021", resume: true },
  { name: "Mental Health First Aid", issuer: "Mental Health First Aid Australia", year: null },
];

// The credentials a recruiter screening for an Australian role looks for first.
// inCerts: also listed in CERTS (so /resume does not count it twice).
export const KEY_CREDENTIALS = [
  {
    inCerts: true,
    en: { name: "VETASSESS Statistician", note: "ANZSCO 224113 skills assessment, 2026" },
    zh: { name: "VETASSESS 统计师", note: "ANZSCO 224113 职业评估，2026" },
  },
  {
    inCerts: true,
    en: { name: "IELTS Band 8", note: "General Training, 2026" },
    zh: { name: "雅思 8 分", note: "培训类，2026" },
  },
  {
    inCerts: true,
    en: { name: "NAATI CCL", note: "Credentialed Community Language, Mandarin, 2025" },
    zh: { name: "NAATI CCL", note: "社区语言认证（普通话），2025" },
  },
  {
    en: { name: "Working with Children Check", note: "Current" },
    zh: { name: "儿童工作许可（WWCC）", note: "有效" },
  },
];

export const LANGUAGES = [
  {
    en: { name: "English", level: "Full professional (IELTS Band 8)", short: "IELTS 8" },
    zh: { name: "英语", level: "专业工作水平（雅思 8 分）", short: "雅思 8 分" },
  },
  {
    en: {
      name: "Mandarin Chinese",
      level: "Native (NAATI credentialed)",
      short: "native, NAATI CCL",
    },
    zh: { name: "普通话", level: "母语（NAATI 认证）", short: "母语，NAATI CCL" },
  },
];

// ── Skills, grouped the way the work actually uses them ──────────────────────
export const SKILL_GROUPS = [
  {
    id: "analysis",
    en: {
      group: "Analysis & modelling",
      items: [
        "Statistical modelling",
        "Regression",
        "Time series (AR, ARIMA)",
        "Clustering",
        "Multivariate analysis",
        "Bayesian inference",
        "Hypothesis testing",
        "Geospatial analysis",
      ],
    },
    zh: {
      group: "分析与建模",
      items: [
        "统计建模",
        "回归分析",
        "时间序列（AR、ARIMA）",
        "聚类",
        "多元分析",
        "贝叶斯推断",
        "假设检验",
        "空间分析",
      ],
    },
  },
  {
    id: "data",
    en: {
      group: "Data & BI",
      items: [
        "Python (pandas, NumPy, scikit-learn)",
        "R (tidyverse, Shiny)",
        "SQL (SQL Server, PostgreSQL)",
        "Power BI (DAX, Power Query)",
        "Tableau",
        "Excel",
        "ArcGIS",
        "QGIS",
      ],
    },
    zh: {
      group: "数据与商业智能",
      items: [
        "Python（pandas、NumPy、scikit-learn）",
        "R（tidyverse、Shiny）",
        "SQL（SQL Server、PostgreSQL）",
        "Power BI（DAX、Power Query）",
        "Tableau",
        "Excel",
        "ArcGIS",
        "QGIS",
      ],
    },
  },
  {
    id: "intelligence",
    en: {
      group: "Intelligence & governance",
      items: [
        "Risk-based frameworks",
        "Intelligence products",
        "Data-quality assurance",
        "SOPs and data dictionaries",
        "Data-sharing MOUs",
        "Executive and parliamentary reporting",
      ],
    },
    zh: {
      group: "情报与治理",
      items: [
        "基于风险的框架",
        "情报产品",
        "数据质量保障",
        "SOP 与数据字典",
        "数据共享 MOU",
        "管理层与议会报告",
      ],
    },
  },
  {
    id: "engineering",
    en: {
      group: "Engineering",
      items: [
        "Next.js",
        "React",
        "React Native / Expo",
        "Flask",
        "FastAPI",
        "Django",
        "Node.js",
        "AWS",
        "Azure",
        "Docker",
        "CI/CD (GitHub Actions)",
      ],
    },
    zh: {
      group: "工程",
      items: [
        "Next.js",
        "React",
        "React Native / Expo",
        "Flask",
        "FastAPI",
        "Django",
        "Node.js",
        "AWS",
        "Azure",
        "Docker",
        "CI/CD（GitHub Actions）",
      ],
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const isZh = (locale) => locale === "zh-Hans";

function flatten(entry, locale) {
  const { en, zh, ...base } = entry;
  return { ...base, ...(isZh(locale) ? zh : en) };
}

/** A role is current when it has no end date. */
export function isCurrent(role) {
  return !role.end;
}

export function getRoles(locale = "en-AU") {
  return ROLES.map((r) => ({ ...flatten(r, locale), current: isCurrent(r) }));
}

export function getEducation(locale = "en-AU", { includeSecondary = true } = {}) {
  return EDUCATION.filter((e) => includeSecondary || !e.secondary).map((e) => flatten(e, locale));
}

export function getVolunteer(locale = "en-AU") {
  return VOLUNTEER.map((v) => flatten(v, locale));
}

export function getSkillGroups(locale = "en-AU") {
  return SKILL_GROUPS.map((g) => flatten(g, locale));
}

export function getLanguages(locale = "en-AU") {
  return LANGUAGES.map((l) => flatten(l, locale));
}

export function getKeyCredentials(locale = "en-AU") {
  return KEY_CREDENTIALS.map((c) => flatten(c, locale));
}

/** Quantified highlights across roles, newest role first. */
export function getMetrics(locale = "en-AU") {
  return ROLES.flatMap((r) =>
    (r.metrics || []).map((m) => ({
      value: m.value,
      label: isZh(locale) ? m.zh : m.en,
      roleId: r.id,
      org: isZh(locale) ? r.zh.org : r.orgShort || r.en.org,
    }))
  );
}

/** Whole years of professional experience since the first role (Feb 2023). */
export function yearsOfExperience(now = new Date()) {
  const first = new Date(ROLES[ROLES.length - 1].start);
  return Math.floor((now - first) / (365.25 * 24 * 3600 * 1000));
}

/**
 * Roll a credential issuer up to a provider bucket (Google, Microsoft, Neo4j,
 * Agile, Professional, Leadership or Technical), so the breadth reads at a
 * glance. Used by CertificationsSection on /about and by /skills.
 */
export function certProvider(issuer) {
  if (issuer.includes("Google")) return "Google";
  if (issuer.includes("Microsoft")) return "Microsoft";
  if (issuer.includes("Neo4j")) return "Neo4j";
  if (issuer.includes("Atlassian")) return "Agile";
  if (["NAATI", "IELTS", "VETASSESS"].some((a) => issuer.includes(a))) return "Professional";
  if (["University of Melbourne", "Practera", "Mental Health"].some((a) => issuer.includes(a)))
    return "Leadership";
  return "Technical"; // LinkedIn Learning, GitHub, Maven, TCM Security
}

/** Credentials grouped by issuer, largest group first (used by /cv and /resume). */
export function groupCertsByIssuer(certs = CERTS) {
  const byIssuer = {};
  for (const c of certs) (byIssuer[c.issuer] ||= []).push(c.name);
  return Object.entries(byIssuer)
    .map(([issuer, names]) => ({ issuer, names, count: names.length }))
    .sort((a, b) => b.count - a.count || a.issuer.localeCompare(b.issuer));
}

export function getProfile(locale = "en-AU") {
  return flatten(PROFILE, locale);
}

/** Everything /resume renders, for one locale. Called from getStaticProps. */
export function getResume(locale = "en-AU") {
  const zh = isZh(locale);
  const roles = getRoles(locale).map((r) => ({
    ...r,
    shown: r.bullets.slice(0, r.resumeCount),
    more: r.bullets.slice(r.resumeCount),
    startLabel: formatMonth(r.start, locale),
    duration: r.end ? durationLabel(r.start, r.end, locale) : null,
    links: (r.links || []).map((l) => ({ kind: l.kind, href: l.href, label: zh ? l.zh : l.en })),
  }));

  const impact = ROLES.flatMap((r) =>
    (r.metrics || [])
      .filter((m) => m.featured)
      .map((m) => ({
        value: m.value,
        label: zh ? m.zh : m.en,
        roleId: r.id,
        orgShort: r.orgShort,
        year: r.start.slice(0, 4),
        featured: m.featured,
        href: `#b-${r.id}-${m.bullet}`,
      }))
  ).sort((a, b) => a.featured - b.featured);

  const featuredCerts = CERTS.filter((c) => c.resume);
  const keyInCerts = KEY_CREDENTIALS.filter((k) => k.inCerts).length;
  const first = ROLES[ROLES.length - 1];

  return {
    asOf: CAREER_AS_OF,
    asOfLabel: formatAsOf(CAREER_AS_OF, locale),
    profile: getProfile(locale),
    since: formatMonth(first.start, locale),
    roleCount: ROLES.length,
    impact,
    roles,
    strip: roles.map((r) => ({
      id: r.id,
      label: r.orgShort || r.org,
      track: r.track,
      start: r.start,
      end: r.end || CAREER_AS_OF,
      period: r.period,
    })),
    skills: getSkillGroups(locale),
    education: EDUCATION.filter((e) => e.resume).map((e) => flatten(e, locale)),
    credentials: {
      key: getKeyCredentials(locale),
      featured: featuredCerts.map((c) => ({ name: c.name, issuer: c.issuer, year: c.year })),
      moreCount: CERTS.length - featuredCerts.length - keyInCerts,
      total: CERTS.length,
    },
    languages: getLanguages(locale),
  };
}
