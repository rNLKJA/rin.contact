/**
 * Copy and demo content for /projects/hex-micro-course, Rin's write-up of his
 * work at HEX, an education startup (the 'hex' card in lib/projects-data.js).
 * Every string is bilingual ({ en, zh }), en-AU first, so no shared locale file
 * is touched.
 *
 * HEX owns its courses, platform and learner records, so the page repeats only
 * what the card already says in public (period, EdTech, interactive content,
 * research on engagement, LLMs, 80+ students supported) plus a plain account of
 * Rin's two private repositories: a Next.js catalogue prototype and the start of
 * an engagement analysis. No course names, prices, platform names, screens or
 * learner data. The analysis repository's exports are never read or used.
 *
 * The demo (components/demos/hex-micro-course) is written fresh for this site.
 * Its module is made up and its learners are synthetic, generated in the
 * browser from a seeded random number generator.
 */

export const HEX_HOME = "https://www.startwithhex.com/";

// Tech tags are proper nouns: single source, identical in every locale.
export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "NextUI",
  "Tailwind CSS",
  "Zustand",
  "Python",
  "pandas",
  "Plotly",
  "Jupyter",
  "Notion",
  "LLMs",
];

export const COPY = {
  metaTitle: {
    en: "HEX: course content and learner engagement · Write-up · rin.contact",
    zh: "HEX：课程内容与学员投入度 · 手记 · rin.contact",
  },
  metaDescription: {
    en: "Rin Huang's write-up of his work at HEX, an education startup, from November 2023 to June 2024: interactive course content, research on engagement, a course catalogue prototype and the start of an engagement analysis. Includes a concept demo with a sample module and synthetic learners.",
    zh: "黄孙创宇（Rin）对自己 2023 年 11 月至 2024 年 6 月在教育初创公司 HEX 工作的介绍：互动课程内容、关于学员投入度的调研、课程目录原型，以及刚起步的投入度分析。页面附有一个概念演示，包含一个示例模块和一批合成学员。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Write-up · EdTech", zh: "手记 · 教育科技" },
  fullName: { en: "Digital Content Library Builder", zh: "数字课程内容库建设" },
  tagline: {
    en: "Short, hands-on course content for students heading into work, and a way to see whether learners actually make it through.",
    zh: "为即将走进职场的学生做短小、动手的课程内容，并想办法看清学员到底有没有学完。",
  },
  status: {
    en: "Content and research at HEX, an education startup, November 2023 to June 2024",
    zh: "在教育初创公司 HEX 做内容与调研，2023 年 11 月至 2024 年 6 月",
  },
  notice: {
    en: "HEX is an education startup, and its courses, platform and learner records belong to HEX. This page is my own write-up of the work. The demo further down is a concept illustration that I wrote fresh for this page, with a made-up module and synthetic learners. It is not HEX's platform, content or data.",
    zh: "HEX 是一家教育初创公司，课程、平台和学员记录都归 HEX 所有。本页是我个人对这段工作的介绍。下方的演示是我专门为本页新写的概念示意，模块是虚构的，学员是合成的，并不是 HEX 的平台、内容或数据。",
  },

  // The impact, at a glance. Figures come from the public 'hex' card only.
  glanceLabel: { en: "At a glance", zh: "概览" },
  glance: [
    {
      k: { en: "Period", zh: "时间" },
      v: { en: "Nov 2023 – Jun 2024", zh: "2023 年 11 月至 2024 年 6 月" },
    },
    {
      k: { en: "Students supported", zh: "支持的学生" },
      v: { en: "80+", zh: "80 多名" },
    },
    {
      k: { en: "Area", zh: "领域" },
      v: { en: "EdTech startup", zh: "教育科技初创" },
    },
    {
      k: { en: "My part", zh: "我的部分" },
      v: { en: "Content, research, prototypes", zh: "内容、调研、原型" },
    },
  ],

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "Many university students worry that a degree on its own will not be enough to land a first job. Employers also look for practical skills and some sense of how work actually happens. HEX is an education startup that works on that gap, with short courses and programs that sit alongside a degree.",
        zh: "很多大学生担心，光有一张文凭不足以找到第一份工作。雇主还看重实用技能，以及对真实工作方式的了解。HEX 是一家专门填补这道缺口的教育初创公司，提供和学位并行的短课程与项目。",
      },
      {
        en: "Short online courses have a well-known weakness. People start them with good intentions and then drift away part of the way through, and the team running the course often cannot see where, or why. Content that asks learners to do something, rather than only read, tends to hold attention for longer. It only helps, though, if you can measure whether it worked.",
        zh: "短期网课有个众所周知的弱点。大家满怀热情地开始，学到一半就慢慢不见了，而运营课程的团队往往看不出学员在哪里掉队，也不知道原因。让学员动手做点什么、而不只是读的内容，通常更能留住注意力。但前提是，你得能衡量它到底有没有用。",
      },
    ],
  },

  what: {
    title: { en: "What I did", zh: "我做了什么" },
    intro: {
      en: "Over about eight months I worked on four connected pieces of the same question, which was how to keep learners engaged and how to tell whether it is working.",
      zh: "大约八个月里，我围绕同一个问题做了四件相互关联的事，也就是怎样让学员保持投入，又怎样判断这些做法是否有效。",
    },
    steps: [
      {
        title: { en: "Interactive content", zh: "互动内容" },
        body: {
          en: "I built and refined interactive digital content for HEX's course library, aimed at helping students move from study into work.",
          zh: "为 HEX 的课程内容库制作并打磨互动数字内容，帮助学生从学习过渡到工作。",
        },
      },
      {
        title: { en: "Research", zh: "调研" },
        body: {
          en: "I researched how newer technology, including large language models, could make courses more engaging and improve what learners get out of them.",
          zh: "调研如何借助新技术（包括大语言模型）让课程更吸引人，也让学员收获更多。",
        },
      },
      {
        title: { en: "A catalogue prototype", zh: "课程目录原型" },
        body: {
          en: "I built a front-end prototype of a page where students could browse short courses, search and filter them, and collect the ones they wanted in a cart.",
          zh: "做了一个前端原型页面，学生可以浏览短课程、搜索和筛选，再把想上的课放进购物车。",
        },
      },
      {
        title: { en: "Engagement analysis", zh: "投入度分析" },
        body: {
          en: "I started an analysis pipeline for learner engagement, planned around time spent on each module, how scores were spread and where learners dropped off.",
          zh: "搭起一套学员投入度分析流程的雏形，计划关注每个模块花费的时间、分数的分布，以及学员在哪里流失。",
        },
      },
    ],
  },

  build: {
    title: { en: "How it is built", zh: "怎么做的" },
    body: [
      {
        en: "The catalogue prototype used the Next.js App Router with NextUI components and Tailwind CSS, written in TypeScript. It had a course listing with search, filters and sorting, and a small cart kept in the browser's session storage, so a student could gather courses before checking out.",
        zh: "课程目录原型基于 Next.js App Router，界面用 NextUI 组件和 Tailwind CSS，语言是 TypeScript。页面上有课程列表，可以搜索、筛选和排序，还有一个存在浏览器会话存储里的小购物车，方便学生先把课程攒在一起再结账。",
      },
      {
        en: "The analysis side was a Python environment with Jupyter notebooks, pandas and Plotly. I set it up so the same steps could later run on exports from more than one course platform and be compared. It was still at an early stage when my time at HEX ended, so this page shows where it was heading rather than any results.",
        zh: "分析部分是一个 Python 环境，用的是 Jupyter 笔记本、pandas 和 Plotly。我把流程设计成以后可以套用到不止一个课程平台导出的数据上，方便横向比较。我离开 HEX 时它还处在早期阶段，所以本页展示的是它的方向，而不是任何结论。",
      },
      {
        en: "The demo below is new. I wrote it in JavaScript and React for this site, and it shares no code with anything at HEX. Its learners come from a seeded random number generator, so the numbers stay the same on every visit until you ask for a new cohort.",
        zh: "下面的演示是新写的。我用 JavaScript 和 React 为这个网站单独实现，和 HEX 的任何代码都无关。学员来自带种子的随机数生成器，所以每次打开时数字都一样，除非你让它生成新的一批。",
      },
    ],
  },

  demo: {
    title: { en: "Try a module, then see the cohort", zh: "先学一个模块，再看整批学员" },
    notice: {
      en: "Concept illustration on synthetic data. The module is one I wrote for this page, and the learners on the dashboard are generated in your browser. None of it comes from HEX's courses, platform or learners, and it is not the real system.",
      zh: "基于合成数据的概念示意。模块是我为本页写的，仪表盘上的学员是在你的浏览器里生成的。这些都不来自 HEX 的课程、平台或学员，也不是真实的系统。",
    },
    intro: {
      en: "The first panel is a sample micro-course module with a concept card, a worked example and a three-question quiz that gives feedback straight away. The second panel is the kind of engagement dashboard my analysis was heading towards. When you finish the quiz, your score and your time join the dashboard as You. Nothing you do here is stored or sent.",
      zh: "第一个面板是一个示例微课模块，有概念卡、例题讲解，还有一个即时反馈的三题小测。第二个面板是我当时的分析想要做成的投入度仪表盘。做完小测后，你的分数和用时会以“你”的身份出现在仪表盘上。你在这里的任何操作都不会被保存或发送。",
    },
  },

  role: {
    title: { en: "My role and what I learned", zh: "我的角色与收获" },
    body: [
      {
        en: "I worked at HEX from November 2023 to June 2024, on content, research, the catalogue prototype and the engagement analysis. It was my first role at a startup. The content I worked on supported more than 80 students.",
        zh: "2023 年 11 月到 2024 年 6 月，我在 HEX 负责内容、调研、课程目录原型和投入度分析。这是我第一次在初创公司工作。我参与的内容一共支持了 80 多名学生。",
      },
      {
        en: "Most of what I took away was about measurement. It is easy to make content feel more engaging, and much harder to show that it changed what learners did. Asking how we would know it worked, before building anything, is a habit I carried from HEX into later work. It is also the last question in the quiz above.",
        zh: "我最大的收获和“衡量”有关。让内容看起来更吸引人并不难，难的是证明它真的改变了学员的行为。动手之前先问一句“我们怎么知道它有用”，是我从 HEX 带到之后工作里的习惯，也是上面小测的最后一题。",
      },
    ],
  },

  footerNote: {
    en: "HEX's own site lists its current courses and programs.",
    zh: "HEX 官网上有他们目前的课程和项目。",
  },
  homeLink: { en: "Visit HEX homepage", zh: "访问 HEX 官网" },
  newTab: { en: " (opens in a new tab)", zh: "（在新标签页打开）" },
  stackLabel: { en: "Stack", zh: "技术栈" },
};

/** The made-up four-module course the synthetic cohort takes. */
export const COURSE = [
  { en: "Problem statements", zh: "问题陈述" },
  { en: "Talking to users", zh: "和用户聊聊" },
  { en: "Quick prototypes", zh: "快速原型" },
  { en: "The short pitch", zh: "简短路演" },
];

/** The sample module (Module 1 of COURSE), written for this page. */
export const MODULE = {
  kicker: { en: "Learner view", zh: "学员视角" },
  moduleOf: { en: "Module 1 of 4", zh: "模块 1 / 4" },
  title: COURSE[0],
  stepsLabel: { en: "Module steps", zh: "模块步骤" },
  steps: [
    { en: "Concept", zh: "概念" },
    { en: "Worked example", zh: "例题" },
    { en: "Quiz", zh: "小测" },
  ],
  stepOf: { en: "Step {n} of 3", zh: "第 {n} 步，共 3 步" },
  back: { en: "Back", zh: "上一步" },
  next: { en: "Next", zh: "下一步" },

  concept: {
    heading: { en: "One sentence, four parts", zh: "一句话，四个部分" },
    body: [
      {
        en: "A good problem statement fits in one sentence. It names who is stuck, what gets in their way, why it matters and how you would know it is fixed.",
        zh: "好的问题陈述一句话就能说完。它要说清楚谁卡住了，什么挡住了他们，为什么这件事重要，以及怎样才算解决。",
      },
      {
        en: "Leave the solution out for now. A solution in the sentence closes off better ideas before you have had a chance to look for them.",
        zh: "先别把解决方案写进去。句子里一旦有了方案，你还没来得及找更好的点子，路就已经被堵死了。",
      },
    ],
    parts: [
      {
        key: "who",
        label: { en: "Who", zh: "谁" },
        hint: { en: "A specific group, not everyone.", zh: "具体的一群人，而不是所有人。" },
      },
      {
        key: "what",
        label: { en: "What gets in the way", zh: "什么挡住了他们" },
        hint: {
          en: "The moment or obstacle where they get stuck.",
          zh: "他们卡住的那个时刻或障碍。",
        },
      },
      {
        key: "why",
        label: { en: "Why it matters", zh: "为什么重要" },
        hint: {
          en: "What it costs them, or the people around them.",
          zh: "这给他们或身边的人带来了什么代价。",
        },
      },
      {
        key: "how",
        label: { en: "How you would know", zh: "怎样才算解决" },
        hint: { en: "A sign you could actually measure.", zh: "一个真的能衡量的信号。" },
      },
    ],
  },

  example: {
    heading: { en: "From vague to useful", zh: "从模糊到有用" },
    beforeLabel: { en: "Before", zh: "改写前" },
    before: {
      en: "Students don't engage with our online course.",
      zh: "学生对我们的网课不感兴趣。",
    },
    afterLabel: { en: "After, one part at a time", zh: "改写后，一次加一部分" },
    // Read in order, the four parts make one sentence.
    parts: [
      {
        key: "who",
        text: {
          en: "Second-year students who study the course on their own",
          zh: "独自学这门课的二年级学生，",
        },
      },
      {
        key: "what",
        text: {
          en: "stop in Module 2, where the worked examples run out,",
          zh: "在例题用完的模块 2 停了下来，",
        },
      },
      {
        key: "why",
        text: {
          en: "so they reach the final project without enough practice,",
          zh: "所以走到期末项目时练习不够，",
        },
      },
      {
        key: "how",
        text: {
          en: "and we will know it is fixed when more of them finish Module 2.",
          zh: "而只要学完模块 2 的人变多，就说明问题解决了。",
        },
      },
    ],
    empty: {
      en: "Nothing yet. Add the first part to start the rewrite.",
      zh: "还没有内容。加上第一部分，开始改写。",
    },
    add: { en: "Add the next part", zh: "加上下一部分" },
    showAll: { en: "Show the whole sentence", zh: "显示整句" },
    restart: { en: "Start the rewrite again", zh: "重新改写" },
    progress: { en: "{n} of 4 parts", zh: "已加 {n} / 4 部分" },
    added: { en: "Added {part}.", zh: "已加上“{part}”。" },
    complete: {
      en: "The whole sentence is showing.",
      zh: "整句已经显示出来了。",
    },
    tip: {
      en: "Notice what the rewrite leaves out. It names no solution, so videos, reminders and AI tutors are all still on the table.",
      zh: "注意改写后的句子没写什么。它没有提任何解决方案，所以视频、提醒、AI 助教都还可以考虑。",
    },
  },

  quiz: {
    heading: { en: "Quick check", zh: "小测" },
    qOf: { en: "Question {n} of {total}", zh: "第 {n} 题，共 {total} 题" },
    check: { en: "Check answer", zh: "核对答案" },
    next: { en: "Next question", zh: "下一题" },
    finish: { en: "See my result", zh: "看结果" },
    pick: { en: "Pick an answer first.", zh: "请先选一个答案。" },
    correct: { en: "Correct", zh: "答对了" },
    wrong: { en: "Not quite", zh: "还差一点" },
    rightAnswer: { en: "Right answer", zh: "正确答案" },
    yourAnswer: { en: "Your answer", zh: "你的答案" },
    questions: [
      {
        q: {
          en: "Which of these is the strongest problem statement?",
          zh: "下面哪一句是最好的问题陈述？",
        },
        options: [
          { en: "We need an AI tutor in the course.", zh: "课程里需要加一个 AI 助教。" },
          {
            en: "First-year students who start the module on their own often stop before the first quiz, so they miss the practice the rest of the course builds on.",
            zh: "独自开始这个模块的一年级学生，常常在第一次小测前就停下，于是错过了后面课程赖以展开的练习。",
          },
          { en: "Engagement is low.", zh: "投入度太低。" },
        ],
        answer: 1,
        why: {
          en: "The second one names who, where they get stuck and why it matters. The first is a solution in disguise, and the third is too vague to act on.",
          zh: "第二句说清了是谁、卡在哪里、为什么重要。第一句其实是换了个说法的解决方案，第三句太笼统，没法着手。",
        },
      },
      {
        q: {
          en: "A student survey says the course is boring. What should you add first to turn that into a problem statement?",
          zh: "学生问卷说课程很无聊。要把它变成问题陈述，首先应该补上什么？",
        },
        options: [
          { en: "A fix, such as adding more videos", zh: "一个办法，比如多加些视频" },
          { en: "Who finds it boring, and at what point", zh: "是谁觉得无聊，在哪个环节" },
          { en: "A larger sample of students", zh: "更多的受访学生" },
        ],
        answer: 1,
        why: {
          en: "Knowing who finds it boring, and where, turns a complaint into something you can investigate. More responses can help later, and a fix comes once the problem is clear.",
          zh: "弄清是谁觉得无聊、在哪里觉得无聊，才能把一句抱怨变成可以调查的问题。更多问卷以后也许有用，而解决办法要等问题清楚了再说。",
        },
      },
      {
        q: {
          en: "Which is the best way to know you have fixed it?",
          zh: "怎样最能说明问题已经解决了？",
        },
        options: [
          { en: "Students say they like the course more", zh: "学生说更喜欢这门课了" },
          {
            en: "More learners finish the module, measured in the course data",
            zh: "完成模块的学员变多了，而且有课程数据为证",
          },
          { en: "The new version shipped on time", zh: "新版本按时上线了" },
        ],
        answer: 1,
        why: {
          en: "Whether students like a course is worth knowing, but a change in what learners do is stronger evidence. Shipping on time says nothing about the learners. The dashboard beside this module is built for exactly this kind of question.",
          zh: "学生喜不喜欢值得了解，但学员行为的变化才是更有力的证据。按时上线和学员本身没有关系。旁边的仪表盘，正是为回答这类问题而做的。",
        },
      },
    ],
  },

  result: {
    heading: { en: "Module 1 done", zh: "模块 1 完成" },
    scoreLabel: { en: "Score", zh: "得分" },
    timeLabel: { en: "Minutes", zh: "用时（分钟）" },
    score: { en: "{score} of {total} correct", zh: "答对 {score} / {total} 题" },
    time: { en: "{min} minutes on the module", zh: "在本模块用时 {min} 分钟" },
    joined: {
      en: "Your result is on the dashboard now, marked You.",
      zh: "你的结果已经出现在仪表盘上，标为“你”。",
    },
    again: { en: "Try the module again", zh: "重新学一遍" },
    announce: {
      en: "Module done. {score} of {total} correct in {min} minutes. Your result has joined the dashboard.",
      zh: "模块完成。答对 {score} / {total} 题，用时 {min} 分钟。你的结果已加入仪表盘。",
    },
  },
};

/** The engagement dashboard beside the module. */
export const DASH = {
  kicker: { en: "Engagement dashboard", zh: "投入度仪表盘" },
  label: {
    en: "Synthetic data · {n} learners · seed {seed}",
    zh: "合成数据 · {n} 名学员 · 种子 {seed}",
  },
  reseed: { en: "New synthetic cohort", zh: "生成新的一批" },
  reseeded: {
    en: "Loaded a new synthetic cohort with seed {seed}. {funnel}",
    zh: "已生成新的一批合成学员，种子 {seed}。{funnel}",
  },
  kpi: {
    learners: { en: "Learners", zh: "学员" },
    learnersNote: { en: "enrolled", zh: "已报名" },
    learnersYou: { en: "including you", zh: "包括你" },
    finished: { en: "Finished the course", zh: "学完全部课程" },
    finishedNote: { en: "{count} of {n}", zh: "{n} 人中 {count} 人" },
    drop: { en: "Biggest drop", zh: "流失最多" },
    dropValue: { en: "M{m}", zh: "M{m}" },
    dropNote: { en: "{pct}% stop in Module {m}", zh: "{pct}% 停在模块 {m}" },
    score: { en: "Average score", zh: "平均得分" },
    scoreNote: { en: "out of 3, all quizzes", zh: "满分 3 分，全部小测" },
  },
  you: { en: "You", zh: "你" },
  funnel: {
    title: { en: "Completion funnel", zh: "完成漏斗" },
    note: {
      en: "Learners who finished each stage, out of everyone who enrolled.",
      zh: "完成各阶段的学员，占全部报名学员的比例。",
    },
    stages: [
      { en: "Enrolled", zh: "报名" },
      { en: "Module 1", zh: "模块 1" },
      { en: "Module 2", zh: "模块 2" },
      { en: "Module 3", zh: "模块 3" },
      { en: "Module 4", zh: "模块 4" },
    ],
    item: { en: "{stage} {count} ({pct}%)", zh: "{stage} {count} 人（{pct}%）" },
    summary: { en: "Completion funnel: {list}.", zh: "完成漏斗：{list}。" },
  },
  time: {
    title: { en: "Time per module", zh: "各模块用时" },
    note: {
      en: "Minutes to finish each module. The bar runs from the 25th to the 75th percentile, and the tick marks the median.",
      zh: "学完各模块所用的分钟数。色条从第 25 百分位画到第 75 百分位，竖线是中位数。",
    },
    unit: { en: "min", zh: "分钟" },
    legendRange: { en: "25th to 75th percentile", zh: "第 25 到第 75 百分位" },
    legendMedian: { en: "Median", zh: "中位数" },
    item: {
      en: "Module {m}: median {median} minutes, middle half {p25} to {p75}",
      zh: "模块 {m}：中位数 {median} 分钟，中间一半在 {p25} 到 {p75} 分钟之间",
    },
    you: { en: "You spent {min} minutes on Module 1", zh: "你在模块 1 用了 {min} 分钟" },
    summary: { en: "Time per module: {list}.", zh: "各模块用时：{list}。" },
  },
  score: {
    title: { en: "Score distribution", zh: "分数分布" },
    note: {
      en: "Quiz scores out of 3, for learners who finished the module.",
      zh: "学完该模块的学员的小测得分，满分 3 分。",
    },
    pick: { en: "Module", zh: "模块" },
    pill: { en: "M{m}", zh: "M{m}" },
    pillLabel: { en: "Module {m}", zh: "模块 {m}" },
    bar: { en: "{score}/3", zh: "{score}/3" },
    item: { en: "{score} correct: {count}", zh: "答对 {score} 题：{count} 人" },
    summary: {
      en: "Module {m} scores: {list}.",
      zh: "模块 {m} 得分：{list}。",
    },
    youIn: {
      en: "Your score of {score} is in this group.",
      zh: "你的 {score} 分在这一组。",
    },
  },
  numbers: { en: "Show the numbers", zh: "查看数据" },
  table: {
    funnel: {
      caption: { en: "Completion funnel", zh: "完成漏斗" },
      head: [
        { en: "Stage", zh: "阶段" },
        { en: "Learners", zh: "人数" },
        { en: "Share", zh: "占比" },
      ],
    },
    time: {
      caption: { en: "Minutes to finish each module", zh: "学完各模块的分钟数" },
      head: [
        { en: "Module", zh: "模块" },
        { en: "25th", zh: "第 25" },
        { en: "Median", zh: "中位数" },
        { en: "75th", zh: "第 75" },
      ],
    },
    score: {
      caption: {
        en: "Learners by number of correct answers",
        zh: "按答对题数统计的学员人数",
      },
      head: [
        { en: "Module", zh: "模块" },
        { en: "0", zh: "0" },
        { en: "1", zh: "1" },
        { en: "2", zh: "2" },
        { en: "3", zh: "3" },
      ],
    },
  },
  joined: {
    en: "You are counted in Enrolled and Module 1.",
    zh: "你已计入“报名”和“模块 1”。",
  },
  footer: {
    en: "Every learner here is generated in your browser by a seeded random number generator. Change the seed and the cohort changes with it. Nothing you do on this page is stored or sent.",
    zh: "这里的每一名学员都是在你的浏览器里，由带种子的随机数生成器生成的。换一个种子，整批学员就跟着变。你在本页的任何操作都不会被保存或发送。",
  },
};
