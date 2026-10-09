/**
 * Copy and demo script for /projects/psyckitchen-echo, Rin's write-up of Echo,
 * a June 2024 prototype of a memory-aware companion chatbot for Psyckitchen.
 * Strings are bilingual ({ en, zh }), en-AU first. Psyckitchen is a
 * Chinese-language brand, so the zh copy is written to read naturally in
 * Chinese.
 *
 * Sources, and nothing else: the git history and code of two private
 * repositories, the Echo backend (Flask, MongoDB, GPT-4o, Azure App Service,
 * 11 to 14 Jun 2024) and the Next.js 14 test page (8 to 9 Jun 2024), plus Rin's
 * own account of his Psyckitchen roles, which lib/career-data.js holds. Neither
 * repository is linked. No keys, connection strings, host names or route paths
 * appear here.
 *
 * Psyckitchen's logo and hand lettering are not used anywhere on the site. The
 * name appears as plain text only. The illustration is original
 * (components/psyckitchen/EchoIllustration.jsx).
 *
 * The demo (components/psyckitchen/EchoDemo.jsx) plays a conversation written
 * for this page. It makes no network calls.
 */

export const COPY = {
  metaTitle: {
    en: "Echo: a companion that remembers · Psyckitchen prototype · rin.contact",
    zh: "Echo：记得你的陪伴者 · Psyckitchen 原型 · rin.contact",
  },
  metaDescription: {
    en: "Rin Huang's write-up of Echo, a June 2024 prototype of a memory-aware companion chatbot for Psyckitchen, built with Flask, MongoDB, GPT-4o and a Next.js test page. Includes a scripted demo that calls no AI service.",
    zh: "黄孙创宇（Rin）对 Echo 的介绍。Echo 是 2024 年 6 月为 Psyckitchen 做的一个会记事的陪伴型聊天机器人原型，用到 Flask、MongoDB、GPT-4o 和一个 Next.js 测试页面。页面里有一段脚本演示，不调用任何 AI 服务。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  roles: { en: "My Psyckitchen roles on my resume", zh: "简历上的 Psyckitchen 经历" },
  label: { en: "June 2024 prototype · since ended", zh: "2024 年 6 月的原型 · 已结束" },
  brand: { en: "Built at Psyckitchen", zh: "在 Psyckitchen 期间完成" },
  artAlt: {
    en: "An illustration drawn for this page: a smiling teacup on an orange saucer, with steam curling up towards a speech bubble.",
    zh: "为本页绘制的插画：橙色小碟上放着一只微笑的茶杯，热气袅袅升向一个对话气泡。",
  },
  tagline: {
    en: "A friendly companion built to remember what you told it last time, so each chat could pick up where the last one ended.",
    zh: "一个温暖的陪伴者，设计初衷是记得你上次说过的话，让每次聊天都能接着上回继续。",
  },
  notice: {
    en: "Echo was a June 2024 prototype and has since ended. It was never a clinical or diagnostic service. This page describes it from the code in two private repositories, dated 8 to 14 June 2024. The illustration was drawn for this site and is not Psyckitchen's logo. The demo further down is scripted and calls no AI service.",
    zh: "Echo 是 2024 年 6 月的一个原型，现已结束，从来不是临床或诊断服务。本页依据两个私有代码仓库中 2024 年 6 月 8 日至 14 日的代码来介绍它。页面上的插画是为本站绘制的，不是 Psyckitchen 的标志。下面的演示是事先写好的脚本，不调用任何 AI 服务。",
  },

  what: {
    title: { en: "What Echo is", zh: "Echo 是什么" },
    body: [
      {
        en: "Echo was designed as a companion for everyday stress, low moods and the things that are hard to say out loud. It was written to talk like a warm friend with a counselling background. It was meant to keep its replies short, ask one question at a time and check that it had understood before it moved on.",
        zh: "Echo 的设计定位，是一个陪你聊日常压力、低落情绪和那些不好开口的事的伙伴。按照设定，它说话像一位有心理咨询背景的暖心朋友，回复简短，一次只问一个问题，往下聊之前会先确认自己有没有听懂。",
      },
      {
        en: "What set it apart was memory. A chatbot without memory starts every conversation from nothing. Echo was built to keep a short profile of each person and a log of their past conversations, so it could ask how Thursday went without being told about Thursday again.",
        zh: "它的特别之处在于记性。没有记忆的聊天机器人，每次对话都得从零开始。Echo 的设计是给每个人留一份简短的资料和过往的聊天记录，这样不用你再讲一遍，它也能问起周四那件事后来怎么样了。",
      },
      {
        en: "Its persona was written to listen for several turns before it offered anything. When the time came, it was to name a few evidence-based techniques, such as cognitive restructuring from CBT, and let the person choose one to practise together.",
        zh: "它的人设要求先多听几轮，再给建议。到了合适的时候，再提几种有循证依据的方法，比如认知行为疗法（CBT）里的认知重构，让对方自己挑一个，再陪着一起练习。",
      },
    ],
  },

  how: {
    title: { en: "How it worked", zh: "它是怎么运作的" },
    intro: {
      en: "Every message went through the same three steps on a small Flask server.",
      zh: "每条消息都会在一个小小的 Flask 服务器上走同样的三步。",
    },
    steps: [
      {
        title: { en: "Chat", zh: "聊天" },
        body: {
          en: "A message reaches the server, which looks up who is talking.",
          zh: "一条消息到达服务器，服务器先查清楚是谁在说话。",
        },
      },
      {
        title: { en: "Memory store", zh: "记忆库" },
        body: {
          en: "MongoDB returns the person's profile and up to their last 100 messages.",
          zh: "MongoDB 取出这个人的资料，以及最近最多 100 条消息。",
        },
      },
      {
        title: { en: "GPT-4o", zh: "GPT-4o" },
        body: {
          en: "Echo's persona, the profile, the history and the new message go to GPT-4o together. Both sides of the exchange are saved for next time.",
          zh: "Echo 的人设、个人资料、聊天记录和新消息一起发给 GPT-4o。一问一答都会存下来，留给下一次。",
        },
      },
    ],
    wearable: {
      title: { en: "The wearable-display idea", zh: "可穿戴屏幕的设想" },
      body: [
        {
          en: "The Next.js test page had two panels. One was a chat box for checking what went in and what came out. The other was a 300 by 300 pixel cream square with a brand image in the middle, standing in for the screen of a wearable device.",
          zh: "Next.js 测试页面分成两块。一块是聊天框，用来检查输入和输出。另一块是一个 300×300 像素的奶油色方块，中间放着一张品牌图片，代表一块可穿戴设备的屏幕。",
        },
        {
          en: "The repositories hold no device code, so the wearable stayed an idea.",
          zh: "仓库里没有任何设备端的代码，所以这块屏幕一直停留在设想阶段。",
        },
      ],
      caption: {
        en: "The wearable panel, redrawn with an original illustration",
        zh: "重绘的可穿戴面板，换成了原创插画",
      },
      drawingLabel: {
        en: "A drawing of a wearable device: a cream square screen with a smiling teacup in the middle, held by an orange strap.",
        zh: "一幅可穿戴设备的示意图：橙色表带上是一块奶油色的方形屏幕，屏幕中间是一只微笑的茶杯。",
      },
    },
  },

  demo: {
    title: { en: "Two days with Echo", zh: "和 Echo 聊两天" },
    intro: {
      en: "Press play to watch a made-up conversation across two evenings. On the second evening, Echo brings up what it learnt on the first.",
      zh: "点播放，看一段跨越两个晚上的虚构对话。到了第二晚，Echo 会主动提起第一晚聊到的事。",
    },
  },

  build: {
    title: { en: "Behind the build", zh: "幕后" },
    intro: {
      en: "I built Echo while I was AI Product and LLM Prompt Specialist at Psyckitchen. This section comes only from the git history of the two repositories, which are private. The prototype commits in both are mine, made between 8 and 14 June 2024.",
      zh: "Echo 是我在 Psyckitchen 担任 AI 产品与大语言模型提示词专员（AI Product and LLM Prompt Specialist）期间做的。这一部分只依据两个私有仓库的 git 历史。两个仓库里属于原型阶段的提交都是我做的，时间在 2024 年 6 月 8 日到 14 日之间。",
    },
    glance: [
      {
        k: { en: "When", zh: "时间" },
        v: { en: "8 to 14 June 2024", zh: "2024 年 6 月 8 日至 14 日" },
      },
      { k: { en: "Backend", zh: "后端" }, v: { en: "Flask and MongoDB", zh: "Flask 和 MongoDB" } },
      {
        k: { en: "Model", zh: "模型" },
        v: { en: "GPT-4o, OpenAI API", zh: "GPT-4o（OpenAI API）" },
      },
      { k: { en: "Hosting", zh: "部署" }, v: { en: "Azure App Service", zh: "Azure App Service" } },
    ],
    body: [
      {
        en: "The Next.js 14 test page came first, on 8 and 9 June. It had the wearable panel and the chat box. The chat box was wired to call OpenAI through a simple relay route, with a note in the code to swap that for the Echo backend later.",
        zh: "Next.js 14 测试页面最先做好，时间是 6 月 8 日和 9 日。页面上有可穿戴面板和聊天框。聊天框接了一个调用 OpenAI 的简单中转接口，代码里留了注释，说以后要换成 Echo 的后端。",
      },
      {
        en: "The backend followed from 11 June. It was a Flask app that kept a profile document for each person in MongoDB. The profile had room for a preferred name, current mental and physical health, hobbies and coping strategies, personal and medical history and a 5P formulation, along with notes on work, study and lifestyle. Every message exchanged with Echo was stored next to it.",
        zh: "后端从 6 月 11 日开始写。它是一个 Flask 应用，在 MongoDB 里为每个人保存一份资料。资料里可以记下称呼、当前的心理和身体状况、爱好和应对方法、个人经历和病史、一份 5P 个案概念化，还有工作、学习和生活方式的情况。和 Echo 的每一句对话也都存在旁边。",
      },
      {
        en: "The commit on 14 June added the conversation history to each request, which is what lets Echo pick up where it left off. At that stage the chat still fell back to a single test user when no name was set, so splitting memory by person would have been the next step.",
        zh: "6 月 14 日的一次提交把聊天记录加进了每次请求，Echo 能接着上回聊，靠的就是这一步。那时如果没有设置用户名，聊天仍会默认用同一个测试账号，所以按人把记忆分开本应是下一步。",
      },
      {
        en: "It was deployed to Azure App Service and started by Gunicorn, with a Dockerfile alongside. Several early commits added, removed and renamed Azure's deployment workflow while I got the app to start. Echo's personality lived in a system prompt written in Chinese, kept in its own file so it could change without touching the code.",
        zh: "它部署在 Azure App Service 上，用 Gunicorn 启动，旁边也放了一份 Dockerfile。早期有好几次提交都是在反复添加、删除和改名 Azure 的部署流程，为的是让应用顺利启动。Echo 的性格写在一份中文系统提示词里，单独放在一个文件中，改人设不用动代码。",
      },
    ],
  },

  care: {
    title: { en: "Responsible AI", zh: "负责任地使用 AI" },
    points: [
      {
        en: "Echo was a June 2024 prototype. This page does not describe a clinical service, and a chatbot is no replacement for a doctor, psychologist or counsellor.",
        zh: "Echo 是 2024 年 6 月的一个原型。本页介绍的不是临床服务，聊天机器人也代替不了医生、心理学家或心理咨询师。",
      },
      {
        en: "Its persona was also written to work gentle screening questions in the style of DSM-5 into the chat, in a way that would not feel like a diagnosis. A real service would only screen openly, with the person's consent and under clinical oversight.",
        zh: "它的人设还要求在聊天里穿插一些依据 DSM-5（《精神障碍诊断与统计手册》第五版）的温和筛查问题，而且不让对方觉得自己在被诊断。真正的服务只能公开地做筛查，事先征得本人同意，并在临床专业人员的监督下进行。",
      },
      {
        en: "Language models can sound sure of themselves and still be wrong. Anything about health that a chatbot says needs a qualified person to check it.",
        zh: "语言模型说起话来很笃定，也照样会出错。聊天机器人说的任何与健康有关的内容，都需要专业人士来把关。",
      },
      {
        en: "Memory makes a companion feel personal, and it also means holding sensitive information. A real service would need consent, clear limits on what it keeps, and a way for people to see and delete their own records.",
        zh: "有记性的陪伴让人觉得亲切，同时也意味着要保管敏感信息。真正上线的服务需要先征得同意，明确限定保存哪些内容，还要让每个人都能查看和删除自己的记录。",
      },
    ],
    disclaimerTitle: { en: "Disclaimer", zh: "免责声明" },
    disclaimer: {
      en: "Echo was a prototype, not a clinical or diagnostic service, and it has since ended. Its questions, including the DSM-5-style screening questions, were never a diagnosis or a substitute for professional care. Neither I nor Psyckitchen accept any responsibility for decisions made on the basis of its questions or replies. If you are worried about your mental health, please talk to a GP, psychologist or counsellor.",
      zh: "Echo 只是一个原型，不是临床或诊断服务，现已结束。它提出的问题，包括参照 DSM-5 风格的筛查问题，从来都不是诊断，也不能代替专业帮助。对于任何依据它的提问或回复做出的决定，我本人和 Psyckitchen 均不承担任何责任。如果你担心自己的心理健康，请咨询全科医生、心理学家或心理咨询师。",
    },
    crisisTitle: { en: "Need to talk to someone now?", zh: "现在就想找人聊聊？" },
    crisis: {
      en: "In Australia, call Lifeline on {phone}, any time of the day or night. To talk in Mandarin or another language, call TIS National on {tis} and ask them to connect you to Lifeline. In an emergency, call 000. Outside Australia, call your local emergency number or a local crisis line.",
      zh: "如果你在澳大利亚，请拨打 Lifeline 生命热线 {phone}，全天 24 小时都有人接听。想用普通话或其他语言交流，可以拨打 TIS 口译服务 {tis}，请他们帮你接通 Lifeline。紧急情况请拨打 000。如果你不在澳大利亚，请拨打当地的急救电话或心理危机热线。",
    },
    phoneLabel: {
      en: "Call Lifeline Australia on 13 11 14",
      zh: "拨打澳大利亚 Lifeline 生命热线 13 11 14",
    },
  },
};

/** Tools named in the two repositories, in the order a request meets them. */
export const STACK = [
  "Python",
  "Flask",
  "MongoDB",
  "OpenAI API",
  "GPT-4o",
  "Gunicorn",
  "Azure App Service",
  "Next.js 14",
  "React",
  "Tailwind CSS",
];

// ── Scripted demo ───────────────────────────────────────────────────────────
/** Labels for components/psyckitchen/EchoDemo.jsx. */
export const DEMO = {
  kicker: { en: "Scripted demo, not the real Echo", zh: "脚本演示，不是真正的 Echo" },
  label: {
    en: "Every line is written in advance. Nothing you do here is sent anywhere.",
    zh: "每一句都是事先写好的。你在这里的任何操作都不会发送到别处。",
  },
  logLabel: { en: "Scripted conversation", zh: "脚本对话" },
  echo: { en: "Echo", zh: "Echo" },
  user: { en: "User", zh: "用户" },
  days: [
    { en: "Day 1 · Monday evening", zh: "第 1 天 · 周一晚上" },
    { en: "Day 2 · Thursday evening", zh: "第 2 天 · 周四晚上" },
  ],
  empty: {
    en: "Press play to start the first evening.",
    zh: "点“播放第 1 天”，从第一晚开始。",
  },
  play: [
    { en: "Play day 1", zh: "播放第 1 天" },
    { en: "Play day 2", zh: "播放第 2 天" },
  ],
  skip: { en: "Skip to the end of the day", zh: "直接看完这一天" },
  showAll: { en: "Show the whole script", zh: "显示全部脚本" },
  restart: { en: "Start again", zh: "重新开始" },
  memoryTitle: { en: "What Echo keeps", zh: "Echo 记下的事" },
  memoryEmpty: { en: "Nothing yet.", zh: "还没有。" },
  recalled: { en: "Recalled", zh: "提到了" },
  recallsNote: { en: "(recalls the note: {note})", zh: "（提到了笔记：{note}）" },
  status: [
    {
      en: "End of day 1. Play day 2 when you are ready.",
      zh: "第 1 天结束了。准备好了就播放第 2 天。",
    },
    { en: "End of the script.", zh: "脚本播完了。" },
  ],
  memoryNote: {
    en: "The prototype kept a profile and up to the last 100 messages, and sent both to GPT-4o with each new message. These notes are a simplified picture of that.",
    zh: "原型保存的是一份个人资料和最近最多 100 条消息，每次连同新消息一起发给 GPT-4o。这里的笔记只是一个简化的示意。",
  },
};

/** What Echo writes down on day 1. `at` is the message index that adds it. */
export const MEMORY = [
  {
    id: "presentation",
    at: 1,
    text: { en: "Thursday: a big presentation at work", zh: "周四：公司里的一场大汇报" },
  },
  { id: "qa", at: 3, text: { en: "Most worried about: the Q&A", zh: "最担心：提问环节" } },
  {
    id: "walk",
    at: 5,
    text: { en: "What helps: a short walk after dinner", zh: "有帮助：晚饭后出去走一小圈" },
  },
];

/**
 * The conversation, written for this page. `day` is 0 or 1. An Echo line with
 * `recalls` lights up that memory note when it appears.
 */
export const SCRIPT = [
  {
    day: 0,
    from: "echo",
    text: { en: "Hi, I'm Echo. How has today been?", zh: "嗨，我是 Echo。今天过得怎么样？" },
  },
  {
    day: 0,
    from: "user",
    text: {
      en: "Pretty tense. I have a big presentation at work on Thursday and I keep running through it in my head.",
      zh: "有点紧绷。周四要在公司做一场大汇报，脑子里一直在过稿子。",
    },
  },
  {
    day: 0,
    from: "echo",
    text: {
      en: "Sounds like Thursday is taking up a lot of room. Is that right?",
      zh: "听起来周四这件事占了你不少心思，是吗？",
    },
  },
  {
    day: 0,
    from: "user",
    text: { en: "Yes. Mostly the Q&A at the end.", zh: "对，最怕最后的提问环节。" },
  },
  {
    day: 0,
    from: "echo",
    text: {
      en: "When your head gets this busy, what usually helps?",
      zh: "脑子这么满的时候，平时什么对你有帮助？",
    },
  },
  {
    day: 0,
    from: "user",
    text: { en: "A short walk after dinner, usually.", zh: "一般是晚饭后出去走一小圈。" },
  },
  {
    day: 0,
    from: "echo",
    text: {
      en: "Then maybe a walk tonight. I'll ask how it went on Thursday.",
      zh: "那今晚也去走走吧。周四我再问问你怎么样。",
    },
  },
  {
    day: 1,
    from: "echo",
    recalls: "presentation",
    text: {
      en: "Welcome back. Wasn't today the presentation?",
      zh: "欢迎回来。今天是不是汇报的日子？",
    },
  },
  {
    day: 1,
    from: "user",
    text: { en: "It was! It went okay, actually.", zh: "是的！其实还挺顺利的。" },
  },
  {
    day: 1,
    from: "echo",
    recalls: "qa",
    text: {
      en: "Good to hear. And the Q&A you were worried about?",
      zh: "真好。那你担心的提问环节呢？",
    },
  },
  {
    day: 1,
    from: "user",
    text: { en: "Only two questions. I handled both.", zh: "只有两个问题，我都答上了。" },
  },
  {
    day: 1,
    from: "echo",
    recalls: "walk",
    text: {
      en: "That took courage. Did the walks help this week?",
      zh: "这很需要勇气。这几天散步有帮到你吗？",
    },
  },
  {
    day: 1,
    from: "user",
    text: { en: "I went every night.", zh: "每天晚上都去了。" },
  },
  {
    day: 1,
    from: "echo",
    text: { en: "Sounds like a habit worth keeping.", zh: "听起来是个值得保持的习惯。" },
  },
];
