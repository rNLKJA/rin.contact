/**
 * Copy and demo data for /projects/classbro, the case study behind the
 * "ClassBro" card (id "classbro" in lib/projects-data.js).
 *
 * Strings are bilingual ({ en, zh }), en-AU first, so no shared locale file is
 * touched. Subjects are sourced from the ClassBro archive (names and areas only;
 * no learner, coordinator, client or university names).
 */

export const CLASSBRO_DATA = {
  label: { en: "Tutoring · 2024 – 2025", zh: "家教 · 2024 – 2025" },
  title: { en: "ClassBro", zh: "ClassBro" },
  tagline: {
    en: "Tutoring and mentoring across computer science",
    zh: "计算机科学跨领域家教与导师工作",
  },
  metaTitle: { en: "ClassBro · Tutoring and mentoring", zh: "ClassBro · 家教与导师工作" },
  metaDescription: {
    en: "The subjects I tutored and mentored university students across through ClassBro, grouped by area.",
    zh: "通过 ClassBro 辅导和指导大学生的科目列表，按领域分组。",
  },
  status: { en: "Active · 2024 – 2025", zh: "进行中 · 2024 – 2025" },
  back: { en: "Back", zh: "返回" },
  demoButton: { en: "Learning by building", zh: "边学边做" },
  demoIntro: {
    en: "Below is a concept lesson from my teaching work: learning by building, not by watching.",
    zh: "下面是我教学工作中的一个概念课程：学生通过动手构建来学习，而不是被动观看。",
  },
  footerNote: {
    en: "Names, cohorts, universities and organisations are withheld. The lesson below is synthetic and written from scratch for this page.",
    zh: "所有学生名字、班级、大学和机构信息已隐去。下面的课程是为本页面新编写的概念演示。",
  },
  intro: {
    title: { en: "Tutoring through ClassBro", zh: "通过 ClassBro 进行家教工作" },
    body: [
      {
        en: "Since 2024, I have tutored and mentored university students across computer science subjects through ClassBro. The work spans programming fundamentals and advanced topics: from introduction to programming and data structures, through machine learning and AI, to databases, systems and cloud computing. I work one-on-one with learners to bridge concepts and code, building confidence and independence in problem-solving.",
        zh: "自 2024 年起，我通过 ClassBro 为大学生提供计算机科学各科目的家教和导师服务。工作范围跨越编程基础和高级主题：从编程入门和数据结构，到机器学习和人工智能，再到数据库、系统和云计算。我与学习者进行一对一合作，架起概念与代码之间的桥梁，培养他们的解决问题的信心和独立性。",
      },
    ],
  },
  subjects: {
    title: { en: "Subjects by area", zh: "按领域分类的科目" },
  },
  areas: [
    {
      en: "Programming and software engineering",
      zh: "编程与软件工程",
      subjects: [
        "Introduction to Programming",
        "Introduction to Programming and Problem Solving",
        "Introduction to Python",
        "Principles of Programming",
        "Programming Fundamentals",
        "Programming III",
        "Computational Thinking and Problem Solving",
        "Introduction to Computer Science",
        "Computer Science Fundamentals I",
        "Foundations of C Programming",
        "C++ Programming",
        "Algorithms and Programming in C and R",
        "Programming and Computation II: Data Structures",
        "Imperative and Functional Programming",
        "Machine Organisation and Programming",
        "Introduction to Software Development",
        "Software Engineering Fundamentals",
        "Web Science",
      ],
    },
    {
      en: "Data science and analytics",
      zh: "数据科学与分析",
      subjects: [
        "Foundations of Data Science",
        "Elements of Data Processing",
        "Data Taming",
        "Computational Data Analysis",
        "Statistical Programming for Data Science",
        "Quantitative and Data Analysis in Python",
        "Data Analysis for Semi-structured Data",
        "Graphical Data Analysis",
        "Data Visualisation",
        "Visual Analytics",
        "Insights Through Data",
        "Data Analytics for Business",
        "Data Driven Web Technology",
        "Data Methods for Health Research",
        "Introduction to Data Science and Systems",
      ],
    },
    {
      en: "AI and machine learning",
      zh: "人工智能与机器学习",
      subjects: [
        "Introduction to Artificial Intelligence and Data Analytics",
        "Artificial Intelligence",
        "Fundamentals of AI, Data and Algorithms",
        "Fundamentals of Machine Learning",
        "Machine Learning",
        "Statistical Machine Learning",
        "Statistical Learning for Data Science",
        "Multivariate Statistics for Data Science",
        "Pattern Recognition",
        "Data Mining",
        "Generative Artificial Intelligence",
        "LLM project work",
        "Introduction to Robotics",
        "Game Design and Development",
        "Foundations of Computing 2",
      ],
    },
    {
      en: "Computer systems, networks and cloud",
      zh: "计算机系统、网络与云计算",
      subjects: [
        "Introduction to Computer Systems",
        "Introduction to Computer Systems, Networks and Security",
        "Computer Systems",
        "Fundamentals of Computer Architecture",
        "Logic and Computer Architecture",
        "Systems Programming",
        "Internet Programming",
        "Internet Technologies",
        "High Performance Computing",
        "Cluster and Cloud Computing",
        "Social Computing Techniques",
      ],
    },
    {
      en: "Databases and data engineering",
      zh: "数据库与数据工程",
      subjects: [
        "Introduction to Databases",
        "Understanding Databases",
        "Relational Databases",
        "Database Principles",
        "Advanced Database Systems",
        "Big Data Systems, Programming and Management",
        "Data Programming Workshop",
        "Data Cleansing",
        "Understanding Data and their Environment",
      ],
    },
    {
      en: "Mathematics and statistics",
      zh: "数学与统计",
      subjects: [
        "Engineering Mathematics I",
        "Quantitative Methods for Engineers",
        "Introduction to Optimisation",
        "Optimisation",
        "Intermediate Statistical Methods",
        "Statistical and Design Considerations in Policy Research",
        "Theory and Practice in Science",
      ],
    },
    {
      en: "Business and information systems",
      zh: "商业与信息系统",
      subjects: [
        "Business Decision Making",
        "Computer Applications for Business",
        "Transforming Business with Information Systems",
        "Information Technology Management",
        "Computing and IT Professionalism",
      ],
    },
    {
      en: "Social science and humanities",
      zh: "社会科学与人文",
      subjects: [
        "Text as Data",
        "Spatial Planning Analytics",
        "Research Methods and Project Preparation",
        "Journalism Practicum I",
      ],
    },
    {
      en: "Research and dissertation support",
      zh: "研究与毕业论文辅导",
      subjects: ["Dissertations", "Project proposals"],
    },
    {
      en: "Career and interview coaching",
      zh: "职业与面试辅导",
      subjects: ["Interview coaching", "AI engineer interview coaching"],
    },
  ],
};
