/**
 * Copy and data for Daybook (components/daybook), a small daily habits
 * check-in Rin made on his own. It sits on /projects/moodist as a concept demo,
 * but it is a separate project with its own code, questions and design.
 * Strings are bilingual ({ en, zh }), en-AU first.
 *
 * The questions are about everyday habits and were written for Daybook. The
 * history is synthetic. Nothing is stored or sent.
 */

export const DAYBOOK = {
  title: { en: "Try Daybook", zh: "试试日记本" },
  intro: {
    en: "Daybook is a small daily habits check-in I made on my own. It asks about time outdoors, water and time for yourself, and shows four weeks as a dot grid. Answer three questions about today, save it and watch today fill the last square in four weeks of made-up history.",
    zh: "日记本是我自己做的一个每日习惯打卡小项目，问的是户外时间、喝水和留给自己的时间，用点阵把四周的记录摆在一起。回答三个关于今天的问题，保存之后，今天就会填进四周虚构记录的最后一格。",
  },
  label: {
    en: "Concept demo with made-up questions and synthetic data. Not Moodist.",
    zh: "概念演示：问题是虚构的，数据是合成的，不是 Moodist。",
  },
  kicker: { en: "Daybook · Synthetic data", zh: "日记本 · 合成数据" },
  save: { en: "Save today", zh: "保存今天" },
  update: { en: "Update today", zh: "更新今天" },
  reset: { en: "Start again", zh: "重新开始" },
  needAll: {
    en: "Answer all three questions to save today.",
    zh: "三个问题都回答后才能保存今天。",
  },
  saved: {
    en: "Saved. Today is {today} on a scale of 1 to 5. The last seven days averaged {week}.",
    zh: "已保存。今天是 {today}（1 到 5），最近七天平均 {week}。",
  },
  chartTitle: { en: "Four weeks, one square a day", zh: "四周，每天一格" },
  today: { en: "Today", zh: "今天" },
  notSaved: { en: "Not saved yet", zh: "还没保存" },
  average7: { en: "7-day average", zh: "七天平均" },
  weeks: [
    { en: "Wk 1", zh: "第 1 周" },
    { en: "Wk 2", zh: "第 2 周" },
    { en: "Wk 3", zh: "第 3 周" },
    { en: "Wk 4", zh: "第 4 周" },
  ],
  avg: { en: "Avg", zh: "平均" },
  legend: { en: "Bigger dot, higher score", zh: "圆点越大，得分越高" },
  summary: {
    en: "Daybook, a synthetic four-week habits record, one square a day, each day scored 1 to 5. Week 1 averaged {w1}, week 2 averaged {w2} and week 3 averaged {w3}. The last seven days averaged {week}. {todayText}",
    zh: "日记本：四周的合成习惯记录，每天一格，每天按 1 到 5 计。第 1 周平均 {w1}，第 2 周平均 {w2}，第 3 周平均 {w3}。最近七天平均 {week}。{todayText}",
  },
  todayUnsaved: { en: "Today has not been saved yet.", zh: "今天还没有保存。" },
  todaySaved: { en: "Today is saved at {today}.", zh: "今天已保存，得分 {today}。" },
  privacy: {
    en: "Your answers stay in this browser tab. Nothing is sent anywhere, and they are gone when you leave the page.",
    zh: "你的回答只留在这个浏览器标签页里，不会发送到任何地方，离开页面后就会消失。",
  },
};

/** Daybook's three questions, each rated 1 to 5. */
export const DAYBOOK_QUESTIONS = [
  {
    id: "outdoors",
    q: { en: "How much time did you spend outdoors today?", zh: "今天你在户外待了多久？" },
    low: { en: "None", zh: "没出门" },
    high: { en: "Hours", zh: "好几个小时" },
  },
  {
    id: "water",
    q: { en: "How much water did you drink today?", zh: "今天你喝了多少水？" },
    low: { en: "Hardly any", zh: "几乎没喝" },
    high: { en: "Plenty", zh: "喝了很多" },
  },
  {
    id: "me-time",
    q: { en: "Did you get any time for yourself today?", zh: "今天有留给自己的时间吗？" },
    low: { en: "None", zh: "完全没有" },
    high: { en: "Lots", zh: "很充足" },
  },
];

/**
 * Synthetic daily scores (the mean of three 1 to 5 answers) for the 27 days
 * before today, so with today they fill a 4 x 7 grid. Made up for the demo: a
 * flatter first fortnight, then a gentle climb with ordinary ups and downs.
 */
export const DAYBOOK_HISTORY = [
  2.7, 2.3, 3.0, 2.0, 2.7, 2.3, 1.7, 2.3, 3.0, 2.7, 2.0, 2.3, 2.7, 3.0, 2.7, 3.3, 3.0, 3.7, 3.3,
  2.7, 3.7, 4.0, 3.3, 3.7, 4.0, 3.7, 4.3,
];
