/**
 * Copy for /projects/moodist, Rin's own write-up of the idea behind Moodist,
 * a University of Melbourne project he worked on as sole developer.
 * Strings are bilingual ({ en, zh }), en-AU first.
 *
 * Moodist belongs to the University, so this page only repeats what the
 * unimelb-psychiatry entry in lib/career-data.js already says in public: role,
 * dates, three phases, sole developer, Expo React Native, a clinician dashboard
 * on a Flask backend, hosting cost, LightSail and Docker, and the handover.
 * Feature and privacy notes stay general. No screens, questions, data, repo or
 * app links, internal architecture, dates beyond those, or compliance claims.
 *
 * The demo on the page is Daybook (components/daybook, lib/daybook-data.js), a
 * separate project with its own code, questions and design.
 */

export const COPY = {
  metaTitle: {
    en: "Moodist: the weeks between appointments · Write-up · rin.contact",
    zh: "Moodist：两次复诊之间的那几周 · 手记 · rin.contact",
  },
  metaDescription: {
    en: "Rin Huang's own write-up of the idea behind Moodist, a University of Melbourne mental health app he worked on as sole developer. Includes Daybook, a separate concept demo with made-up questions and synthetic data.",
    zh: "黄孙创宇（Rin）对 Moodist 这个想法的个人介绍。Moodist 是墨尔本大学的心理健康应用，他曾是唯一的开发者。页面里还有一个独立的概念演示“日记本”，问题是虚构的，数据是合成的。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Write-up · Research", zh: "手记 · 科研" },
  tagline: {
    en: "A quick daily check-in that keeps a record of the weeks between appointments, so the next conversation starts with the whole picture.",
    zh: "每天花一两分钟打个卡，把两次复诊之间的那几周记下来，下次见面就能从完整的情况聊起。",
  },
  status: {
    en: "Handed to a professional team for production in February 2026",
    zh: "2026 年 2 月移交专业团队部署上线",
  },
  notice: {
    en: "Moodist is a University of Melbourne project. This page is my own write-up of the idea. The demo below is a separate project with its own code, questions and design, and is not affiliated with the University.",
    zh: "Moodist 是墨尔本大学的项目，本页是我个人对这个想法的介绍。下面的演示是另一个独立项目，有自己的代码、问题和设计，与墨尔本大学没有关联。",
  },

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "Most people see their clinician every few weeks. In the appointment they are asked how things have been, and they answer from memory. The last few days tend to crowd out everything before them, and a hard week a month ago is easy to forget.",
        zh: "大多数人每隔几周才见一次医生。复诊时医生会问最近怎么样，大家只能凭记忆回答。最近几天的感受往往会盖过之前的一切，一个月前那段难熬的日子很容易就忘了。",
      },
      {
        en: "That leaves clinicians working from a snapshot. The time between visits is where most of life happens, yet it is the part they rarely get to see. The idea behind Moodist is to record those weeks with as little effort as possible from the person living them.",
        zh: "这样一来，医生只能根据一个瞬间的印象做判断。生活的大部分发生在两次复诊之间，医生却很少看得到。Moodist 的想法，就是让当事人几乎不费力气，就能把这几周记录下来。",
      },
    ],
  },

  how: {
    title: { en: "How it works", zh: "怎么用" },
    steps: [
      {
        title: { en: "Check in", zh: "每天打卡" },
        body: {
          en: "Once a day, the person answers a few short questions on their phone. It takes a minute or two.",
          zh: "每天在手机上回答几个简短的问题，一两分钟就能完成。",
        },
      },
      {
        title: { en: "See the pattern", zh: "看见规律" },
        body: {
          en: "Each check-in becomes a point on a timeline. Over a few weeks the points turn into a trend that is easy to read at a glance.",
          zh: "每次打卡都会变成时间线上的一个点。几周下来，这些点连成一条趋势，一眼就能看懂。",
        },
      },
      {
        title: { en: "Talk about it", zh: "复诊时聊一聊" },
        body: {
          en: "At the next appointment, the clinician and the person look at the trend together and talk about what changed.",
          zh: "下次复诊时，医生和当事人一起看这条趋势，聊聊这段时间有什么变化。",
        },
      },
    ],
  },

  benefits: {
    title: { en: "Who it helps", zh: "对谁有帮助" },
    columns: [
      {
        title: { en: "For people tracking their mood", zh: "对记录情绪的人" },
        points: [
          {
            en: "A check-in short enough to fit into a busy day.",
            zh: "打卡很短，忙碌的一天里也能抽空完成。",
          },
          {
            en: "A record of your own, so the good stretches are as easy to see as the hard ones.",
            zh: "有一份属于自己的记录，状态好的日子和难熬的日子都看得清楚。",
          },
          {
            en: "Less pressure to remember everything when you walk into an appointment.",
            zh: "走进诊室时，不用再费力回想过去几周的每一天。",
          },
        ],
      },
      {
        title: { en: "For clinicians", zh: "对临床医生" },
        points: [
          {
            en: "Several weeks of daily check-ins in one view.",
            zh: "几周的每日打卡放在同一个页面里，一眼就能看完。",
          },
          {
            en: "A clearer sense of when things changed, so the conversation can start there.",
            zh: "更清楚地看到什么时候有了变化，谈话可以从那里开始。",
          },
          {
            en: "Less of the appointment spent piecing the past few weeks together.",
            zh: "复诊时少花些时间拼凑过去几周的情况。",
          },
        ],
      },
    ],
  },

  privacy: {
    title: { en: "Privacy", zh: "关于隐私" },
    intro: {
      en: "Health data needs care. In an app like this, a few principles matter most.",
      zh: "健康数据需要格外小心。在这类应用里，有几条原则最要紧。",
    },
    points: [
      {
        en: "Ask only for what the check-in needs.",
        zh: "只问打卡真正需要的内容。",
      },
      {
        en: "Show a person's check-ins to a clinician only when the two have chosen to connect.",
        zh: "只有双方都同意建立联系之后，医生才能看到对方的打卡记录。",
      },
      {
        en: "Protect every account, and encrypt data on its way between the app and the server.",
        zh: "保护好每一个账户，应用和服务器之间传输的数据全程加密。",
      },
    ],
    note: {
      en: "This describes the idea in general terms. It is not a statement about any certification or standard.",
      zh: "以上只是对这个想法的概括介绍，并不代表任何认证或标准。",
    },
  },

  build: {
    title: { en: "Behind the build", zh: "幕后" },
    intro: {
      en: "From August 2024 to February 2026 I was a Research Assistant in the University of Melbourne's Department of Psychiatry and the sole developer of Moodist, across three phases of work. I rebuilt the app in Expo React Native and built a clinician dashboard on a Flask backend. In February 2026 I handed it to a professional team for production.",
      zh: "2024 年 8 月到 2026 年 2 月，我在墨尔本大学精神病学系担任研究助理，是 Moodist 唯一的开发者，前后分三个阶段完成。我用 Expo React Native 重建了应用，在 Flask 后端上搭了临床医生仪表板。2026 年 2 月，我把它交给专业团队部署上线。",
    },
    glance: [
      { k: { en: "Role", zh: "角色" }, v: { en: "Sole developer", zh: "唯一开发者" } },
      {
        k: { en: "Period", zh: "时间" },
        v: { en: "Aug 2024 – Feb 2026", zh: "2024.08 – 2026.02" },
      },
      { k: { en: "Delivery", zh: "交付" }, v: { en: "Three phases", zh: "三个阶段" } },
      {
        k: { en: "Hosting", zh: "托管" },
        v: { en: "Under $500 a month", zh: "每月不到 $500" },
      },
    ],
    hosting: {
      en: "The whole platform costs under $500 a month to host, with each service in its own Docker container on AWS LightSail.",
      zh: "整个平台每月托管费用不到 $500，每项服务都放在 AWS LightSail 上各自的 Docker 容器里。",
    },
    thanks: {
      en: "Thank you to Xuan Wang for early contributions to Moodist.",
      zh: "感谢 Xuan Wang 在项目早期做出的贡献。",
    },
    learnedTitle: { en: "What I learned", zh: "我学到了什么" },
    learned: {
      en: "Building for clinical work taught me to design every screen for someone at the end of a hard day, so fewer taps mattered more than more features. A small system I understood end to end was easier to look after and cheaper to run. The handover mattered as much as the code, because the app only helps people if someone can keep it running after me.",
      zh: "为临床场景做产品，让我学会把每个页面都当成给一个刚熬过艰难一天的人用的，所以少点几下比多加功能更重要。一个我从头到尾都吃透的小系统，更容易维护，运行成本也更低。交接和代码一样重要，因为只有在我离开之后还有人能让它继续运行，这个应用才能继续帮到人。",
    },
  },

  cta: {
    title: {
      en: "Talk to me about building something like this",
      zh: "想做类似的东西？来聊聊",
    },
    body: {
      en: "If you are working on a health or research tool and need one person who can build the app, the dashboard and the backend, I would be glad to hear about it.",
      zh: "如果你在做健康或科研方面的工具，需要一个人同时搞定应用、仪表板和后端，很乐意听你聊聊。",
    },
    button: { en: "Get in touch", zh: "联系我" },
  },
};

// Tech tags are proper nouns: identical in every locale. Only what
// lib/career-data.js already lists in public.
export const STACK = ["Expo", "React Native", "Flask", "Python", "Docker", "AWS LightSail"];
