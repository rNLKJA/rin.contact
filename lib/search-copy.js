/**
 * Words for the ⌘K palette and the group names it shares with /info/site-map.
 * Kept out of the locale JSON on purpose, like lib/guide-tour.js: I18nContext
 * ships both dictionaries with every page, while this file only ships in the
 * palette's lazy chunk and the site-map page. The header button's own label
 * stays in the locales (search.open, search.tip) because it renders on every page.
 */
export const SEARCH_COPY = {
  en: {
    dialogLabel: "Search the site",
    inputLabel: "Page name or topic",
    placeholder: "Jump to a page…",
    close: "Close search",
    results: "{n} pages match.",
    oneResult: "1 page matches.",
    empty: "No page matches “{q}”.",
    emptyHint: "Try a shorter word, or browse the site map.",
    browse: "Browse the site map",
    groupCount: "{shown} of {total}",
    hints: { move: "move", open: "open", close: "close" },
    groups: {
      work: "Work",
      caseStudies: "Case studies",
      coursework: "Coursework labs",
      learn: "Learn",
      knowledge: "Knowledge topics",
      explainers: "Data science explainers",
      posts: "Blog posts",
      site: "This site",
      tools: "Tools & fun",
    },
  },
  zh: {
    dialogLabel: "搜索全站",
    inputLabel: "页面名称或主题",
    placeholder: "跳转到某个页面…",
    close: "关闭搜索",
    results: "找到 {n} 个页面。",
    oneResult: "找到 1 个页面。",
    empty: "没有和“{q}”匹配的页面。",
    emptyHint: "换个短一点的词试试，或者看看网站地图。",
    browse: "查看网站地图",
    groupCount: "{shown} / {total}",
    hints: { move: "移动", open: "打开", close: "关闭" },
    groups: {
      work: "工作",
      caseStudies: "案例",
      coursework: "课程作业 demo",
      learn: "学习",
      knowledge: "知识主题",
      explainers: "数据科学小讲解",
      posts: "博客文章",
      site: "关于本站",
      tools: "工具与彩蛋",
    },
  },
};

/** The copy for a locale ("en-AU" or "zh-Hans"). */
export function searchCopy(locale) {
  return locale === "zh-Hans" ? SEARCH_COPY.zh : SEARCH_COPY.en;
}
