/**
 * Copy and synthetic data for /projects/outlook-daily-summary, the live demo
 * behind the "Outlook Daily Email Summary" card (id "outlook-daily-summary" in
 * lib/projects-data.js). Strings are bilingual ({ en, zh }), en-AU first, so no
 * shared locale file is touched.
 *
 * Facts come from the public repository rNLKJA/Outlook-Mail-Counting
 * (outlook_daily_summary.py, README.md, run_daily_summary.bat), MIT licence,
 * first commit 11 Jun 2026. The demo ports the script's counting rules to
 * components/demos/outlook-daily-summary/summary.js and runs them on the
 * mailbox below.
 *
 * The mailbox is invented: the day, people, teams, subjects, word counts and
 * sizes are made up, and every address uses a reserved .example domain. It
 * reflects no real inbox. The workbook text (sheet names, column headers and
 * section titles) is the script's own output, so it stays in English in both
 * locales.
 */

/** The made-up day, a Wednesday. */
export const DAY = { iso: "2026-03-04", dayName: "Wednesday", long: "Wednesday, 04 March 2026" };

/** The times a visitor can run the script at, from the README's example. */
export const RUN_TIMES = ["10:00", "14:00", "17:00"];

export const STACK = ["Python", "pywin32", "openpyxl", "Excel"];

export const REPO_URL = "https://github.com/rNLKJA/Outlook-Mail-Counting";

const PEOPLE = {
  desk: ["IT Service Desk", "servicedesk@northwind.example"],
  jordan: ["Jordan Lee", "jordan.lee@northwind.example"],
  digest: ["Weekly Digest", "digest@newsletter.example"],
  sam: ["Sam Patel", "sam.patel@harbourcity.example"],
  mei: ["Mei Chen", "mei.chen@northwind.example"],
  finance: ["Finance Team", "finance@northwind.example"],
  chris: ["Chris Walker", "chris.walker@harbourcity.example"],
  priya: ["Priya Nair", "priya.nair@riverbank.example"],
};

// A stable, made-up EntryID per email (real ones are long hex strings too).
const entryId = (n) =>
  `00000000${((Math.imul(0x9e3779b1, n) >>> 0) + 0x10000000).toString(16).toUpperCase()}${n
    .toString(16)
    .toUpperCase()
    .padStart(4, "0")}`;

// [time, sender, subject, words, attachments, size in KB, conversation, replied at]
const RECEIVED = [
  ["07:58", "desk", "Server maintenance window tonight", 142, 0, 38, "C01"],
  ["08:12", "jordan", "Quarterly report draft", 260, 1, 1840, "C02", "08:40"],
  ["08:30", "digest", "Weekly digest: data and analytics", 610, 0, 52, "C03"],
  ["08:47", "sam", "Data request for the dashboard", 188, 0, 24, "C04", "09:20"],
  ["09:05", "mei", "Team lunch on Friday", 64, 0, 12, "C05", "09:15"],
  ["09:41", "finance", "Invoice 4471 for March", 96, 2, 420, "C06"],
  ["10:20", "jordan", "RE: Quarterly report draft", 120, 0, 22, "C02", "11:05"],
  ["10:55", "chris", "Training calendar for April", 210, 1, 610, "C07"],
  ["11:30", "sam", "RE: Data request for the dashboard", 98, 1, 330, "C04", "12:10"],
  ["12:05", "desk", "Password expiry reminder", 75, 0, 18, "C08"],
  ["12:40", "priya", "Survey results for review", 330, 2, 2150, "C09", "13:30"],
  ["13:15", "mei", "RE: Team lunch on Friday", 40, 0, 10, "C05"],
  ["13:50", "jordan", "Dashboard figures for the board pack", 175, 0, 28, "C10", "15:10"],
  ["14:25", "digest", "Webinar: data quality in practice", 420, 0, 46, "C11"],
  ["14:58", "finance", "RE: Invoice 4471 for March", 60, 0, 14, "C06"],
  ["15:30", "sam", "Data request: second extract", 140, 1, 880, "C12", "16:05"],
  ["15:52", "chris", "RE: Training calendar for April", 52, 0, 11, "C07"],
  ["16:20", "priya", "RE: Survey results for review", 88, 0, 16, "C09", "16:45"],
  ["16:44", "desk", "Maintenance moved to Thursday", 66, 0, 15, "C01"],
  ["16:58", "jordan", "RE: Dashboard figures for the board pack", 72, 0, 13, "C10"],
];

// [time, To field, subject, words, attachments, size in KB, conversation]
const SENT = [
  ["08:40", "Jordan Lee", "RE: Quarterly report draft", 85, 0, 16, "C02"],
  ["09:15", "Mei Chen; Jordan Lee", "RE: Team lunch on Friday", 22, 0, 9, "C05"],
  ["09:20", "Sam Patel", "RE: Data request for the dashboard", 140, 1, 260, "C04"],
  ["11:05", "Jordan Lee", "RE: Quarterly report draft", 64, 1, 1920, "C02"],
  ["12:10", "Sam Patel", "RE: Data request for the dashboard", 48, 0, 10, "C04"],
  ["13:30", "Priya Nair; Chris Walker", "RE: Survey results for review", 156, 0, 21, "C09"],
  ["14:40", "Finance Team", "Expense claim for the conference", 70, 1, 540, "C13"],
  ["15:10", "Jordan Lee", "RE: Dashboard figures for the board pack", 118, 1, 720, "C10"],
  ["16:05", "Sam Patel", "RE: Data request: second extract", 52, 0, 11, "C12"],
  ["16:45", "Priya Nair", "RE: Survey results for review", 34, 0, 9, "C09"],
];

/**
 * The day's mail, oldest first in each folder. Each item has the fields the
 * script reads from Outlook: EntryID, time (ReceivedTime or SentOn), sender
 * name and address or the To field, subject, word count of the body, number of
 * attachments, size in bytes, ConversationID and, for received mail, the time
 * it was replied to (PR_REPLY_TIME), if it was.
 */
export const MAILBOX = {
  inbox: RECEIVED.map(([time, who, subject, words, attachments, kb, conv, repliedAt], i) => ({
    id: entryId(i + 1),
    folder: "inbox",
    time,
    senderName: PEOPLE[who][0],
    senderEmail: PEOPLE[who][1],
    subject,
    words,
    attachments,
    size: kb * 1024,
    conversationId: conv,
    repliedAt: repliedAt || null,
  })),
  sent: SENT.map(([time, to, subject, words, attachments, kb, conv], i) => ({
    id: entryId(101 + i),
    folder: "sent",
    time,
    to,
    subject,
    words,
    attachments,
    size: kb * 1024,
    conversationId: conv,
  })),
};

export const COPY = {
  metaTitle: {
    en: "Outlook Daily Email Summary · Live demo · rin.contact",
    zh: "Outlook 每日邮件汇总 · 在线演示 · rin.contact",
  },
  metaDescription: {
    en: "A Windows Python script by Rin Huang that turns a day of Outlook email into an Excel report and counts each email once by its EntryID. Run it three times on a made-up inbox in your browser.",
    zh: "黄孙创宇（Rin）写的 Windows Python 脚本，把一天的 Outlook 邮件整理成 Excel 报告，并按 EntryID 让每封邮件只算一次。可以在浏览器里对一个虚构的收件箱运行三次。",
  },
  ogTitle: {
    en: "Outlook Daily Email Summary · Rin Huang",
    zh: "Outlook 每日邮件汇总 · Rin Huang",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Open source · Python · Jun 2026", zh: "开源 · Python · 2026 年 6 月" },
  title: { en: "Outlook Daily Email Summary", zh: "Outlook 每日邮件汇总" },
  tagline: {
    en: "One Python file that reads today's Inbox and Sent Items and keeps a daily Excel report, safe to run as often as you like.",
    zh: "一个 Python 文件，读取当天的收件箱和已发送邮件，整理成每日 Excel 报告，想运行几次都不会重复计数。",
  },
  status: { en: "Public repository · MIT licence", zh: "公开仓库 · MIT 许可证" },
  jump: { en: "Try the demo", zh: "试试演示" },
  repo: { en: "View on GitHub", zh: "在 GitHub 上查看" },
  repoLabel: {
    en: "View on GitHub: Outlook Daily Email Summary (opens in a new tab)",
    zh: "在 GitHub 上查看：Outlook 每日邮件汇总（在新标签页打开）",
  },
  notice: {
    en: "The demo runs in your browser on a made-up inbox for a made-up Wednesday. It does not connect to Outlook, and nothing you do here leaves the page. The script itself needs Windows, Microsoft Outlook and Python.",
    zh: "演示在你的浏览器里运行，用的是一个虚构星期三的虚构收件箱。它不连接 Outlook，你在这里的操作也不会离开本页。脚本本身需要 Windows、Microsoft Outlook 和 Python。",
  },

  what: {
    title: { en: "What it does", zh: "它做什么" },
    body: [
      {
        en: "The script connects to Microsoft Outlook on Windows through COM, using pywin32, and reads today's email from the Inbox and Sent Items. It counts what was sent, received and replied to, and measures how long the emails were. It ranks the people who wrote to you, the people you wrote to and the domains your mail came from, and it tallies when in the day mail arrived and went out.",
        zh: "脚本在 Windows 上通过 COM（借助 pywin32）连接 Microsoft Outlook，读取收件箱和已发送邮件里当天的邮件。它统计发出、收到和回复了多少封，并计算邮件的长度。它还给写信给你的人、你写信的对象和来信的域名排名，并统计一天里各个小时收发了多少邮件。",
      },
      {
        en: "The results go into a formatted Excel workbook, DailyEmailSummary.xlsx, written with openpyxl. A Daily Log sheet keeps one row per day across 17 columns. Each day also gets a Detail sheet with the rankings, the hourly traffic, attachment counts and sizes, an approximate response time and the most common words in subject lines.",
        zh: "结果写进一个排好版的 Excel 工作簿 DailyEmailSummary.xlsx，用 openpyxl 生成。Daily Log 工作表每天一行，共 17 列。每天还有一张 Detail 工作表，列出排名、每小时的邮件量、附件数量和大小、大致的回复时间，以及主题里最常见的词。",
      },
    ],
  },

  rerun: {
    title: { en: "Run it as often as you like", zh: "想运行几次都可以" },
    intro: {
      en: "Every Outlook email has an EntryID that stays the same across restarts. The script keeps the EntryIDs it has counted in email_tracking.json, next to the raw tallies for the day. A run at 10 am, another at 2 pm and a last one at 5 pm end with one row that covers the whole day.",
      zh: "每封 Outlook 邮件都有一个 EntryID，重启之后也不会变。脚本把已经计过的 EntryID 和当天的原始统计一起存在 email_tracking.json 里。上午 10 点、下午 2 点、下午 5 点各运行一次，最后得到的仍然是覆盖全天的一行。",
    },
    steps: [
      {
        title: { en: "Scan", zh: "扫描" },
        body: {
          en: "Find today's email in the Inbox and Sent Items.",
          zh: "在收件箱和已发送邮件里找出当天的邮件。",
        },
      },
      {
        title: { en: "Skip", zh: "跳过" },
        body: {
          en: "Drop any email whose EntryID is already in the tracking file.",
          zh: "EntryID 已经在跟踪文件里的邮件一律跳过。",
        },
      },
      {
        title: { en: "Merge", zh: "合并" },
        body: {
          en: "Add the new emails to the day's running tallies.",
          zh: "把新邮件加进当天的累计统计。",
        },
      },
      {
        title: { en: "Recompute", zh: "重算" },
        body: {
          en: "Work out every statistic again from the merged tallies.",
          zh: "用合并后的统计重新算出每一项指标。",
        },
      },
      {
        title: { en: "Save", zh: "保存" },
        body: {
          en: "Write the tracking file, then update today's row and Detail sheet.",
          zh: "先写跟踪文件，再更新当天那一行和 Detail 工作表。",
        },
      },
    ],
  },

  build: {
    title: { en: "How it is built", zh: "怎么做的" },
    glance: [
      {
        k: { en: "Language", zh: "语言" },
        v: { en: "Python, one file", zh: "Python，单个文件" },
      },
      {
        k: { en: "Runs on", zh: "运行环境" },
        v: { en: "Windows with Outlook", zh: "装有 Outlook 的 Windows" },
      },
      {
        k: { en: "Writes", zh: "输出" },
        v: { en: "Excel workbook and JSON", zh: "Excel 工作簿和 JSON" },
      },
      { k: { en: "Licence", zh: "许可证" }, v: { en: "MIT", zh: "MIT" } },
    ],
    body: [
      {
        en: "Outlook's Restrict filter pulls only today's items by their received or sent time. If the filter fails, the script falls back to a slower scan of the whole folder. Only mail items are counted, so meeting requests and other item types are left out.",
        zh: "脚本用 Outlook 的 Restrict 筛选，按收到或发出的时间只取当天的邮件。筛选失败时，就退回到较慢的整夹扫描。只统计邮件本身，会议邀请等其他类型会被排除。",
      },
      {
        en: "Replies come from the reply time Outlook keeps on each received email. The response time pairs a sent email with the first email received in the same conversation, and only counts gaps of up to a day.",
        zh: "回复数取自 Outlook 在每封收到的邮件上记录的回复时间。回复时间把一封发出的邮件和同一会话里最早收到的那封配对，只计入一天以内的间隔。",
      },
      {
        en: "A batch file runs it with a double-click. On the first run that creates the workbook, the script prints the steps to schedule it daily in Windows Task Scheduler.",
        zh: "双击一个批处理文件就能运行。第一次运行、创建工作簿时，脚本会打印出用 Windows 任务计划程序每天定时运行的步骤。",
      },
    ],
  },

  demoSection: {
    title: { en: "Run it on a made-up day", zh: "在虚构的一天里运行它" },
    intro: {
      en: "Pick a time, then run the script. Email arrives through the day, and each run only counts what is new. Run it again at the same time to watch it skip everything it has already counted.",
      zh: "选一个时间，然后运行脚本。邮件会在一天里陆续到达，每次运行只统计新邮件。在同一时间再运行一次，就能看到它跳过所有已经计过的邮件。",
    },
  },

  differs: {
    title: { en: "What the demo changes", zh: "演示和脚本的不同" },
    body: [
      {
        en: "The inbox is invented. The people, teams, subjects and timings are made up, and every address ends in .example.",
        zh: "收件箱是虚构的。人名、团队、主题和时间都是编的，所有地址都以 .example 结尾。",
      },
      {
        en: "Each made-up email carries a fixed word count and size. The script counts the words in the email body after stripping HTML, and reads the size from Outlook.",
        zh: "每封虚构邮件的字数和大小都是固定值。脚本则是去掉 HTML 之后数正文的词数，大小从 Outlook 读取。",
      },
      {
        en: "Two of the script's rules are kept as they are. A reply is read when an email is first counted, so a reply sent after that run is not added later. Response times pair emails found in the same run, so a reply to an email an earlier run counted gets no response time. One run at 17:00 counts every reply.",
        zh: "脚本的两条规则原样保留。回复状态在邮件第一次被计数时读取，所以那次运行之后才发出的回复不会再补算。回复时间只在同一次运行找到的邮件之间配对，所以对早先已计数邮件的回复不会得到回复时间。只在 17:00 运行一次，就能计入全部回复。",
      },
    ],
  },

  footerNote: {
    en: "Source: rNLKJA/Outlook-Mail-Counting on GitHub, MIT licence. The demo is a browser port of the script's counting rules, written for this page.",
    zh: "源码：GitHub 上的 rNLKJA/Outlook-Mail-Counting，MIT 许可证。演示是把脚本的计数规则移植到浏览器里，为本页编写。",
  },
};

/** Strings inside the demo. Workbook text stays in the script's English. */
export const DEMO_COPY = {
  mailbox: { en: "Synthetic mailbox", zh: "合成收件箱" },
  day: { en: "Wednesday 4 March 2026, made up", zh: "2026 年 3 月 4 日星期三（虚构）" },
  inBrowser: { en: "Runs in your browser", zh: "在你的浏览器里运行" },
  runTime: { en: "Run at", zh: "运行时间" },
  run: { en: "Run the script", zh: "运行脚本" },
  reset: { en: "Start the day again", zh: "重新开始这一天" },
  earlier: {
    en: "Time only moves forward. Start the day again to pick an earlier time.",
    zh: "时间只能往前走。想选更早的时间，请重新开始这一天。",
  },
  mailList: { en: "The day's email, oldest first", zh: "当天的邮件，按时间先后" },
  in: { en: "In", zh: "收" },
  out: { en: "Out", zh: "发" },
  inbox: { en: "Inbox", zh: "收件箱" },
  sent: { en: "Sent Items", zh: "已发送邮件" },
  to: { en: "To", zh: "收件人" },
  legend: {
    counted: { en: "counted", zh: "已计数" },
    waiting: { en: "arrived, not counted yet", zh: "已到达，尚未计数" },
    later: { en: "not arrived yet", zh: "尚未到达" },
  },
  attachments: {
    one: { en: "{n} attachment", zh: "{n} 个附件" },
    many: { en: "{n} attachments", zh: "{n} 个附件" },
  },
  replied: { en: "replied {time}", zh: "{time} 已回复" },
  console: { en: "Console", zh: "控制台" },
  consoleEmpty: {
    en: "Nothing has run yet. Pick a time and run the script.",
    zh: "还没有运行过。选一个时间，然后运行脚本。",
  },
  workbook: { en: "Workbook", zh: "工作簿" },
  workbookNote: {
    en: "Sheet names, columns and section titles follow the script's English output.",
    zh: "工作表名、列名和各节标题沿用脚本的英文输出。",
  },
  workbookEmpty: {
    en: "DailyEmailSummary.xlsx is created by the first run that finds email.",
    zh: "第一次找到邮件的运行会创建 DailyEmailSummary.xlsx。",
  },
  sheets: { en: "Workbook sheets", zh: "工作表" },
  tracking: {
    en: "{n} EntryIDs counted for {date}",
    zh: "{date} 已计数 {n} 个 EntryID",
  },
  runCount: { en: "Runs so far: {n}", zh: "已运行 {n} 次" },
};
