/**
 * Words for Pawsibly, the site guide. Kept out of the locale JSON on purpose:
 * I18nContext imports both dictionaries into every page, while this file only
 * ships in the dialogue chunk, which loads the first time someone presses START.
 * Each stop shows two short lines, except the welcome, which adds a third about
 * the ⌘K search so visitors who skip the tour still learn the quick way round.
 */
import { SIDE_QUEST, STOPS, normalisePath } from "./guide-stops.js";

export { fill } from "./fill.js";

const COPY = {
  welcome: {
    en: {
      quest: "Say hello to Pawsibly",
      short: "Home",
      lines: [
        "Hi, I'm Pawsibly. I've been around since this site was called Pawsibly Rin back in 2023.",
        "I can show you around in seven short stops. Close me whenever you like and I'll remember where we got to.",
        "Looking for one page in particular? Press ⌘K or Ctrl+K on any page, or use the search button in the header or menu, and type its name.",
      ],
    },
    zh: {
      quest: "和 Pawsibly 打个招呼",
      short: "首页",
      lines: [
        "你好，我是 Pawsibly。2023 年这个网站还叫 Pawsibly Rin 的时候，我就在了。",
        "我可以带你走七站，每站都很短。随时可以关掉我，下次会从停下的地方继续。",
        "想直接找某个页面？在任何页面按 ⌘K 或 Ctrl+K，或者点页眉或菜单里的搜索按钮，输入名字就能跳过去。",
      ],
    },
  },
  about: {
    en: {
      quest: "Meet Rin",
      short: "About",
      lines: [
        "This page covers Rin's skills and credentials.",
        "Further down, he answers the questions people ask him most often.",
      ],
    },
    zh: {
      quest: "认识 Rin",
      short: "关于",
      lines: ["这一页是 Rin 的技能和证书。", "往下翻，有大家最常问他的问题和他的回答。"],
    },
  },
  career: {
    en: {
      quest: "Ride the career line",
      short: "Career",
      lines: [
        "Rin's career is drawn as a metro map here.",
        "Follow the lines to see how his study and roles connect.",
      ],
    },
    zh: {
      quest: "坐一趟职业地铁",
      short: "职业",
      lines: [
        "这里把 Rin 的职业经历画成了一张地铁图。",
        "顺着线路走，可以看到他的学习和工作是怎么连起来的。",
      ],
    },
  },
  coursework: {
    en: {
      quest: "Open a coursework demo",
      short: "Coursework",
      lines: [
        "These are Rin's University of Melbourne assignments from 2019 to 2024.",
        "He rebuilt them as live demos in 2026, so you can open each one and try it.",
      ],
    },
    zh: {
      quest: "打开一个课程作业 demo",
      short: "课程作业",
      lines: [
        "这些是 Rin 2019 到 2024 年在墨尔本大学做的课程作业。",
        "2026 年他把它们重新做成了在线 demo，每个都可以点进去试。",
      ],
    },
  },
  signal: {
    en: {
      quest: "Read the Signal case study",
      short: "Signal",
      lines: [
        "Signal is Rin's flagship case study.",
        "It is about putting governance checks on the request path for AI-assisted government data.",
      ],
    },
    zh: {
      quest: "读 Signal 案例",
      short: "Signal",
      lines: [
        "Signal 是 Rin 的主打案例。",
        "它讲的是怎么把治理检查放进 AI 辅助的政府数据请求流程里。",
      ],
    },
  },
  history: {
    en: {
      quest: "Flip through five versions",
      short: "History",
      lines: [
        "This site is on its fifth version since 2021.",
        "Flip through each one here, with a screenshot wherever one survived.",
      ],
    },
    zh: {
      quest: "翻完五个版本",
      short: "历史",
      lines: [
        "这个网站从 2021 年到现在，已经是第五版了。",
        "这里可以一版一版翻，能找到当时截图的版本都配上了。",
      ],
    },
  },
  contact: {
    en: {
      quest: "Find the way to say hello",
      short: "Contact",
      lines: [
        "That's the end of the tour.",
        "If you'd like to work with Rin, this page explains what he's looking for and how to reach him.",
      ],
    },
    zh: {
      quest: "找到联系方式",
      short: "联系方式",
      lines: [
        "导览到这里就结束了。",
        "如果想和 Rin 合作，这一页写了他在找什么样的机会，以及怎么联系他。",
      ],
    },
  },
};

/** The seven stops, in order, with their copy. */
export const TOUR = STOPS.map((stop) => ({ ...stop, ...COPY[stop.id] }));

export const SIDE = {
  ...SIDE_QUEST,
  en: {
    quest: "Side quest: the meal-prep studio",
    short: "Side quest",
    line: "If you have a minute, the order system Rin built for his mum's meal-prep studio is worth a look.",
  },
  zh: {
    quest: "支线：备餐工作室",
    short: "支线",
    line: "有空的话，Rin 给妈妈的备餐工作室做的订单系统也值得一看。",
  },
};

/** Interface strings for the dialogue box and the quest log. */
export const UI = {
  en: {
    name: "Pawsibly",
    dialogLabel: "Site guide",
    back: "Back",
    next: "Next",
    goTo: "Go to {stop}",
    start: "Start the tour",
    notNow: "Not now",
    never: "Don't show me again",
    finish: "Finish",
    offRoute: "Shall we head to {stop}?",
    go: "Go",
    stay: "Stay here",
    backToTour: "Back to the tour",
    sideQuest: "Side quest",
    close: "Close",
    complete: "Quest log complete. Thanks for walking around with me.",
    log: "Log",
    openLog: "Open the quest log",
    minimise: "Close the guide. Your progress is saved.",
    step: "Stop {n} of {total}",
    logTitle: "Quest log",
    logProgress: "{n} of {total} stops visited",
    logClose: "Close the quest log",
    logDone: "visited",
    logTodo: "not visited yet",
    logGo: "Go",
    logGoLabel: "Go to {stop}",
    logSide: "Side quest",
    resume: "Resume tour",
    reset: "Reset progress",
    resetConfirm: "Reset all progress?",
    resetYes: "Yes, reset",
    cancel: "Cancel",
    hide: "Don't show again",
    hideNote: "You can switch the guide back on from the history page at /info/history.",
  },
  zh: {
    name: "Pawsibly",
    dialogLabel: "网站导览",
    back: "上一句",
    next: "下一句",
    goTo: "去{stop}",
    start: "开始导览",
    notNow: "下次再说",
    never: "不再显示",
    finish: "完成",
    offRoute: "要不要去{stop}看看？",
    go: "去看看",
    stay: "先留在这里",
    backToTour: "回到导览",
    sideQuest: "去支线",
    close: "关闭",
    complete: "任务日志全部完成，谢谢你陪我走完一圈。",
    log: "任务",
    openLog: "打开任务日志",
    minimise: "关闭导览，进度会保存",
    step: "第 {n} 站，共 {total} 站",
    logTitle: "任务日志",
    logProgress: "已经走过 {n} 站，共 {total} 站",
    logClose: "关闭任务日志",
    logDone: "已完成",
    logTodo: "还没去",
    logGo: "前往",
    logGoLabel: "去{stop}",
    logSide: "支线任务",
    resume: "继续导览",
    reset: "重置进度",
    resetConfirm: "确定要清空全部进度吗？",
    resetYes: "确定重置",
    cancel: "取消",
    hide: "不再显示",
    hideNote: "以后想再打开导览，可以去 /info/history 页面。",
  },
};

/**
 * Walk to a stop with the Pages Router (router.push keeps the visitor's
 * locale), then bring the stop's anchor into view if it has one.
 */
export function goToStop(router, { href, anchor }, reduced) {
  const reveal = () => {
    if (!anchor) return;
    document
      .getElementById(anchor)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };
  if (normalisePath(router.asPath) === href) {
    reveal();
    return;
  }
  router
    .push(href)
    .then(reveal)
    .catch(() => {});
}
