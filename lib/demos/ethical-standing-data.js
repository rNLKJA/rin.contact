/**
 * Copy for /projects/ethical-standing, Rin's write-up of his research on
 * ethical standing in police environments, and for its concept demo. Every
 * string is bilingual ({ en, zh }), en-AU first, so no shared locale file is
 * touched.
 *
 * Facts repeat only what the 'ethical-standing' card (lib/projects-data.js)
 * already says in public. The research framework, data and findings belong to
 * SAPOL and stay internal, so this page describes the kind of work and the
 * methodologies used. The demo is a generic concept illustration on synthetic
 * frameworks and analysis.
 *
 * Templates use {name} placeholders, filled by lib/fill.js.
 */

// Tech tags are proper nouns: single source, identical in every locale. They
// match the card's stack.
export const STACK = [
  "Research design and literature review",
  "Intelligence analysis and OSINT",
  "Experiment design",
  "Leadership",
];

export const COPY = {
  metaTitle: {
    en: "Ethical standing in police environments · Research · rin.contact",
    zh: "警察环境中的伦理地位 · 研究 · rin.contact",
  },
  metaDescription: {
    en: "How Rin Huang conducts strategic research on ethical frameworks and professional standards using SWOT and risk analysis methodologies in the Ethical and Professional Standards Branch of South Australia Police.",
    zh: "黄孙创宇（Rin）在南澳大利亚警察局职业道德与专业标准处如何运用 SWOT 分析和风险分析方法开展伦理框架与职业标准战略研究。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Research · Government policy", zh: "研究 · 政府政策" },
  title: { en: "Ethical Standing", zh: "伦理地位研究" },
  fullName: {
    en: "SAPOL · Research on ethical frameworks in policing",
    zh: "SAPOL · 警务伦理框架研究",
  },
  tagline: {
    en: "I research ethical frameworks that help officers make better decisions when facing ethical dilemmas in their work.",
    zh: "我研究伦理框架，帮助警务人员在工作中面对伦理困境时作出更好的决策。",
  },
  status: {
    en: "Research Officer, South Australia Police, since October 2024",
    zh: "南澳大利亚警察局研究员，2024 年 10 月至今",
  },
  notice: {
    en: "This page describes the research methodologies and strategic approach. The research findings, data sources and detailed policy recommendations belong to SAPOL and remain internal. Nothing on this page reflects specific internal frameworks or unpublished findings.",
    zh: "这个页面介绍研究方法和战略方向。研究结论、数据来源和具体政策建议都属于 SAPOL，保持内部机密。页面内容不涉及任何具体的内部框架或未发表的研究结论。",
  },
  jump: { en: "View methodology", zh: "查看方法论" },

  overview: {
    title: { en: "Research overview", zh: "研究概览" },
    body: [
      {
        en: "Ethical decision-making in policing sits at the intersection of policy, procedure and individual judgment. Officers face situations where procedures may conflict with ethical principles, or where the right course of action is not obvious.",
        zh: "警务工作中的伦理决策处于政策、程序和个人判断的交汇点。警务人员会面临程序与伦理原则冲突的情况，或者正确行动方案并不明显的局面。",
      },
      {
        en: "This research examines ethical frameworks that support better decision-making, explores the conditions under which they work, and identifies gaps between stated principles and operational reality.",
        zh: "这项研究考察支持更好决策的伦理框架，探索它们发挥作用的条件，并发现表述的原则与运作现实之间的差距。",
      },
      {
        en: "The output is strategic research that helps the branch understand where to invest in training, policy review and support systems.",
        zh: "研究成果是战略性分析，帮助处里了解应该在培训、政策审查和支持系统哪些方面投入资源。",
      },
    ],
  },

  methodology: {
    title: { en: "Research methodology", zh: "研究方法" },
    items: [
      {
        title: { en: "SWOT analysis", zh: "SWOT 分析" },
        body: {
          en: "Identifies Strengths in existing ethical frameworks and culture, Weaknesses in implementation, Opportunities for improvement, and Threats to consistency. SWOT helps map where the organisation stands and what barriers exist.",
          zh: "识别现有伦理框架和文化的优势、执行中的劣势、改进机会和一致性的威胁。SWOT 分析帮助了解组织的现状和存在的障碍。",
        },
      },
      {
        title: { en: "Risk analysis", zh: "风险分析" },
        body: {
          en: "Evaluates scenarios where officers face ethical dilemmas, assesses the probability and impact of different outcomes, and identifies control points where intervention is most effective.",
          zh: "评估警务人员面对伦理困境的场景，评估不同结果的概率和影响，识别干预最有效的控制点。",
        },
      },
      {
        title: { en: "Stakeholder mapping", zh: "利益相关者识别" },
        body: {
          en: "Interviews with officers, supervisors, command staff and support teams reveal how ethical decision-making actually works on the ground and where support is needed most.",
          zh: "与警务人员、主管、指挥人员和支持团队的对话揭示伦理决策在现场如何实际发生，以及最需要支持的地方。",
        },
      },
      {
        title: { en: "Literature review", zh: "文献综述" },
        body: {
          en: "Examines published research on ethical frameworks in law enforcement, professional standards, and organisational culture to ground recommendations in evidence.",
          zh: "审查关于执法机构伦理框架、职业标准和组织文化的已发表研究，为建议提供证据基础。",
        },
      },
    ],
  },

  keyFindings: {
    title: { en: "Strategic approach", zh: "战略方向" },
    body: [
      {
        en: "Research output focuses on identifying sustainable levers for ethical decision-making. Rather than one-off training, the research looks for structural, cultural and procedural changes that support ethical practice over time.",
        zh: "研究成果侧重于识别支撑伦理决策的可持续因素。研究的不是一次性培训，而是寻找在结构、文化和程序层面能够持久支持伦理实践的改变。",
      },
      {
        en: "Key areas under investigation include leadership accountability, procedural clarity when ethical principles and procedures intersect, and early identification of officers showing signs of ethical drift.",
        zh: "关键研究领域包括领导问责、伦理原则与程序交汇时的程序清晰性，以及早期识别表现出伦理偏差迹象的警务人员。",
      },
    ],
  },

  implications: {
    title: { en: "Strategic implications", zh: "战略意义" },
    body: [
      {
        en: "Better ethical frameworks reduce risk of misconduct, strengthen public trust, and make it easier for officers to make the right call under pressure. They also reduce the workload of professional standards oversight by addressing problems upstream.",
        zh: "更好的伦理框架能降低不当行为风险、增强公众信任，让警务人员在压力下更容易做出正确决定。它们也通过在问题源头就加以解决，减轻职业标准监督的工作量。",
      },
      {
        en: "The research supports the branch in moving from reactive complaint investigation toward proactive ethical capability building.",
        zh: "这项研究支持处里从被动投诉调查转向主动建设伦理能力。",
      },
    ],
  },

  role: {
    title: { en: "My role", zh: "我的角色" },
    body: [
      {
        en: "I am a Research Officer in the Intelligence & Probity Unit of the Ethical and Professional Standards Branch, and I started in October 2024. I lead the research program on ethical standing and decision-making in policing, conducting SWOT and risk analyses, and translating findings into actionable strategic recommendations.",
        zh: "我是职业道德与专业标准处情报与廉政组的研究员，2024 年 10 月入职，负责警务伦理地位和决策制定的研究项目，进行 SWOT 和风险分析，将研究结论转化为可行的战略建议。",
      },
      {
        en: "I work with branch leadership, operational teams, and training and development functions to ensure research insights inform policy and practice.",
        zh: "我与处领导、运作团队以及培训和发展职能部门合作，确保研究见解能为政策和实践提供信息支撑。",
      },
    ],
  },

  demo: {
    title: { en: "Concept framework", zh: "概念框架" },
    notice: {
      en: "Concept illustration only. The frameworks and data shown here are synthetic examples to demonstrate the analysis approach. They do not represent SAPOL's actual research, findings or policy.",
      zh: "这只是概念示意。这里展示的框架和数据都是合成示例，用来演示分析方法。它们不代表 SAPOL 的实际研究、结论或政策。",
    },
    intro: {
      en: "The demo illustrates how SWOT and risk analysis work in practice. It shows a synthetic ethical framework, a SWOT analysis of its implementation, and a risk matrix that maps common dilemmas officers face and where intervention is most effective.",
      zh: "演示说明 SWOT 和风险分析如何在实践中发挥作用。它展示一个合成的伦理框架、该框架执行情况的 SWOT 分析，以及一个风险矩阵，绘制警务人员面对的常见困境以及最有效的干预点。",
    },
  },

  footerNote: {
    en: "If you work on ethical frameworks in high-stakes environments, or on bridging the gap between policy and practice, I am always happy to exchange ideas.",
    zh: "如果你也在高风险环境中从事伦理框架工作，或者致力于连接政策与实践的桥梁，欢迎交流想法。",
  },
  contact: { en: "Get in touch", zh: "联系我" },
};
