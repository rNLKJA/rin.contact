/**
 * Copy and demo data for /projects/teaching, the concept page behind the
 * "What learners build" card (id "teaching" in lib/pipeline-data.js).
 * Strings are bilingual ({ en, zh }), en-AU first, so no shared locale file is
 * touched.
 *
 * Sensitivity: the page waits on Rin's decision before it is linked. It is a
 * fully generic concept illustration. It names no learner, cohort, course or
 * organisation and repeats nothing beyond the card, which says the work is
 * mentoring and teaching, 2024 to 2025. The learning path, the lesson, the code
 * and every board position were written from scratch for this page. Nothing
 * comes from real session material.
 *
 * The lesson runs on components/demos/teaching/engine.js. CODE below is the
 * text of its two search functions: keep them in step.
 */

// Tech tags are proper nouns: single source, identical in every locale.
export const STACK = ["JavaScript", "React", "Next.js", "Tailwind CSS"];

/** Board strings read left to right, top to bottom. "." is an empty square. */
const board = (s) => s.split("").map((c) => (c === "." ? null : c));

export const PRESETS = [
  {
    id: "centre",
    board: board("....X...."),
    label: { en: "X took the centre", zh: "X 占了中心" },
    note: {
      en: "X opened in the centre. O to move, with eight squares to choose from.",
      zh: "X 开局下在中心。轮到 O，有八个格子可选。",
    },
  },
  {
    id: "win",
    board: board("XX.OO...."),
    label: { en: "Win in one", zh: "一步制胜" },
    note: {
      en: "X has two in a row on top. X to move.",
      zh: "X 在第一行已经连了两个。轮到 X。",
    },
  },
  {
    id: "block",
    board: board("X.O.X...."),
    label: { en: "O must block", zh: "O 必须堵" },
    note: {
      en: "X threatens the long diagonal. O to move.",
      zh: "X 正威胁那条长对角线。轮到 O。",
    },
  },
  {
    id: "edge",
    board: board("XO......."),
    label: { en: "O went to an edge", zh: "O 下在了边上" },
    note: {
      en: "X took a corner and O answered on the edge next to it. X to move.",
      zh: "X 占了一个角，O 在旁边的边上应对。轮到 X。",
    },
  },
  {
    id: "empty",
    board: board("........."),
    label: { en: "Empty board", zh: "空棋盘" },
    note: {
      en: "The whole game, X to move. Minimax visits over half a million positions here, so the first search can take a moment.",
      zh: "完整的一盘棋，轮到 X。minimax 在这里要访问五十多万个局面，第一次搜索可能要稍等片刻。",
    },
  },
];

export const ORDER_OPTIONS = [
  {
    id: "reading",
    label: { en: "Reading order", zh: "从左到右" },
    note: {
      en: "Squares 1 to 9, left to right and top to bottom.",
      zh: "按 1 到 9 的顺序，从左到右、从上到下。",
    },
  },
  {
    id: "centre",
    label: { en: "Centre first", zh: "中心优先" },
    note: {
      en: "The centre, then the corners, then the edges.",
      zh: "先中心，再四角，最后四边。",
    },
  },
];

/**
 * The two search functions as the code panel shows them. `mark` flags the
 * lines where alpha-beta differs from minimax.
 */
export const CODE = {
  minimax: [
    "function minimax(board, player, order, stats) {",
    "  stats.nodes += 1;",
    "  const score = finalScore(board);",
    "  if (score !== null) return score;",
    '  let best = player === "X" ? -Infinity : Infinity;',
    "  for (const cell of order) {",
    "    if (board[cell]) continue;",
    "    board[cell] = player;",
    "    const value = minimax(board, other(player), order, stats);",
    "    board[cell] = null;",
    '    best = player === "X" ? Math.max(best, value) : Math.min(best, value);',
    "  }",
    "  return best;",
    "}",
  ].map((text) => ({ text })),
  alphaBeta: [
    ["function alphaBeta(board, player, alpha, beta, order, stats) {", true],
    ["  stats.nodes += 1;"],
    ["  const score = finalScore(board);"],
    ["  if (score !== null) return score;"],
    ['  let best = player === "X" ? -Infinity : Infinity;'],
    ["  for (const cell of order) {"],
    ["    if (board[cell]) continue;"],
    ["    board[cell] = player;"],
    ["    const value = alphaBeta(board, other(player), alpha, beta, order, stats);", true],
    ["    board[cell] = null;"],
    ['    best = player === "X" ? Math.max(best, value) : Math.min(best, value);'],
    ['    if (player === "X") alpha = Math.max(alpha, best);', true],
    ["    else beta = Math.min(beta, best);", true],
    ["    if (alpha >= beta) {", true],
    ["      stats.cuts += 1;", true],
    ["      break;", true],
    ["    }", true],
    ["  }"],
    ["  return best;"],
    ["}"],
  ].map(([text, mark = false]) => ({ text, mark })),
};

export const COPY = {
  metaTitle: {
    en: "What learners build: a learning path and a lesson you can run · Concept · rin.contact",
    zh: "学习者会做什么：一条学习路径和一节能运行的课 · 概念 · rin.contact",
  },
  metaDescription: {
    en: "A concept page by Rin Huang on teaching by building. A short learning path says what each session makes, and one lesson runs in the browser: minimax, then alpha-beta pruning, on tic-tac-toe with synthetic positions.",
    zh: "黄孙创宇（Rin）关于“边做边学”的概念页。一条简短的学习路径写明每节课做出什么，其中一节课可以直接在浏览器里运行：先讲极小化极大（minimax），再讲 alpha-beta 剪枝，用井字棋演示，棋局均为合成。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Concept · Mentoring", zh: "概念 · 导师经历" },
  title: { en: "What learners build", zh: "学习者会做什么" },
  tagline: {
    en: "A learning path where every session ends with something built, and one lesson you can run: a tic-tac-toe player that learns which moves it never needs to look at.",
    zh: "一条每节课都以“做出一样东西”收尾的学习路径，外加一节可以直接运行的课：一个井字棋程序，学会分辨哪些走法根本不用看。",
  },
  status: { en: "Planned · this page is a concept", zh: "计划中 · 本页为概念演示" },
  notice: {
    en: "This is a concept illustration, not a record of real sessions. It names no learner, course or organisation. The learning path, the lesson, the code and every position in the demo were written from scratch for this page.",
    zh: "这是一个概念演示，不是真实课程的记录。页面不涉及任何学员、课程或机构。学习路径、课程内容、代码以及演示里的每一个棋局，都是为本页从零写的。",
  },

  idea: {
    title: { en: "The idea", zh: "想法" },
    body: [
      {
        en: "When I mentor or teach, the explanation is rarely the part that sticks. What sticks is the small thing a learner builds and gets working, because that is where an idea stops being words.",
        zh: "在辅导和教学里，真正让人记住的很少是讲解本身，而是学习者亲手做出来、跑通了的那个小东西。到了那一步，概念才不再只是文字。",
      },
      {
        en: "Notes from real sessions belong to the people in them, so they do not belong on a public page. Instead, this page writes the pattern out again from scratch. There is a short learning path that says what each session covers and what learners make, and one lesson you can run in your browser.",
        zh: "真实课程的笔记属于参与其中的人，不适合放到公开页面上。所以这一页把这种做法从零重写了一遍：一条简短的学习路径，写明每节课讲什么、学习者会做出什么，再加一节可以在浏览器里直接运行的课。",
      },
    ],
  },

  path: {
    title: { en: "The learning path", zh: "学习路径" },
    intro: {
      en: "Each session has one idea, one small thing to build and one check that it works. This example path is on game search, and it was written for this page.",
      zh: "每节课只讲一个概念，做一样小东西，再用一个检验确认它能用。下面这条示例路径讲的是博弈搜索，是为本页写的。",
    },
    covers: { en: "Covers", zh: "讲什么" },
    builds: { en: "Builds", zh: "做出什么" },
    check: { en: "Check", zh: "怎么检验" },
    runnable: { en: "Run it below", zh: "在下方运行" },
    session: { en: "Session {n}: ", zh: "第 {n} 节：" },
    sessions: [
      {
        title: { en: "Games as trees", zh: "把游戏看成一棵树" },
        covers: {
          en: "Positions, moves and turns, and why every game of tic-tac-toe is one path through a single tree.",
          zh: "局面、走法和轮次，以及为什么每一盘井字棋都是同一棵树上的一条路径。",
        },
        builds: {
          en: "A function that lists the legal moves, and a counter for every possible game.",
          zh: "一个列出所有合法走法的函数，以及一个统计所有可能对局的计数器。",
        },
        check: {
          en: "The count should come to 255,168 games.",
          zh: "数出来应该正好是 255,168 盘。",
        },
      },
      {
        title: { en: "Minimax", zh: "极小化极大（minimax）" },
        covers: {
          en: "Scoring finished games and passing the best score back up the tree, with X taking the highest and O the lowest.",
          zh: "给结束的对局打分，再把最好的分数沿着树往上传：X 取最大，O 取最小。",
        },
        builds: {
          en: "A player that never loses at tic-tac-toe.",
          zh: "一个下井字棋永远不会输的程序。",
        },
        check: {
          en: "Played against itself from an empty board, it always draws.",
          zh: "从空棋盘开始让它自己跟自己下，结果永远是平局。",
        },
      },
      {
        title: { en: "Alpha-beta pruning", zh: "alpha-beta 剪枝" },
        runnable: true,
        covers: {
          en: "Two bounds, alpha and beta, that let the search skip branches that cannot change the answer.",
          zh: "alpha 和 beta 两个界限，让搜索跳过那些不可能改变结果的分支。",
        },
        builds: {
          en: "The same player, with a counter for every position it visits.",
          zh: "同一个程序，加上一个记录访问了多少局面的计数器。",
        },
        check: {
          en: "It reaches the same result as minimax and visits far fewer positions.",
          zh: "它得出的结果和 minimax 一样，访问的局面却少得多。",
        },
      },
      {
        title: { en: "Move ordering", zh: "走法排序" },
        covers: {
          en: "Why trying strong moves first lets pruning cut deeper.",
          zh: "为什么先试强的走法，剪枝就能剪得更多。",
        },
        builds: {
          en: "A search order that tries the centre, then the corners, then the edges.",
          zh: "一种先中心、再四角、最后四边的搜索顺序。",
        },
        check: {
          en: "Compare the counts before and after. The outcome stays the same.",
          zh: "对比改顺序前后的计数，结果保持不变。",
        },
      },
      {
        title: { en: "When the tree is too big", zh: "当树大到搜不完" },
        covers: {
          en: "Depth limits and scoring rules for games like Connect Four, where the search cannot reach the end.",
          zh: "深度限制和局面评分规则，用在四子棋这类搜不到终局的游戏上。",
        },
        builds: {
          en: "A player that stops at a set depth and scores the board with a simple rule.",
          zh: "一个搜到固定深度就停下、用一条简单规则给局面打分的程序。",
        },
        check: {
          en: "Play it against a player that moves at random, and count the results.",
          zh: "让它和随机落子的对手下，统计胜负。",
        },
      },
      {
        title: { en: "Explain it back", zh: "讲给别人听" },
        covers: {
          en: "Writing up what was built in plain words, and testing the parts that are easy to get wrong.",
          zh: "用平实的话写清楚自己做了什么，并为容易出错的部分写测试。",
        },
        builds: {
          en: "A short README and a few tests for the win check.",
          zh: "一份简短的 README，以及几个检查胜负判断的测试。",
        },
        check: {
          en: "Someone new can run it and follow it without help.",
          zh: "一个没接触过的人能自己跑起来，也看得懂。",
        },
      },
    ],
  },

  lesson: {
    title: {
      en: "Run the lesson: minimax, then alpha-beta",
      zh: "运行这节课：先 minimax，再 alpha-beta",
    },
    intro: {
      en: "Pick a starting position or play a few moves, then compare the two searches. They always agree on how the game ends with best play. Alpha-beta gets there by visiting fewer positions, and the rows below show where it saves the most.",
      zh: "选一个起始局面，或者自己走几步，然后比较两种搜索。双方都走最佳时，两者算出的结局永远一致，但 alpha-beta 访问的局面更少。下面逐行列出了它在哪里省得最多。",
    },
    steps: [
      {
        title: { en: "Minimax", zh: "Minimax" },
        body: {
          en: "Try every move until the game ends. A finished game scores +1 if X wins, −1 if O wins and 0 for a draw. X takes the highest score, O takes the lowest, and the scores pass back up the tree.",
          zh: "把每一步都试到终局。结束的对局按结果打分：X 赢记 +1，O 赢记 −1，平局记 0。X 取最高分，O 取最低分，分数沿着树一层层往上传。",
        },
      },
      {
        title: { en: "Alpha-beta", zh: "Alpha-beta" },
        body: {
          en: "Carry two numbers down the tree. Alpha is the best score X can already count on, and beta is the best score O can already count on. Once alpha reaches beta, nothing left in that branch can change the answer, so the search stops there.",
          zh: "往下搜索时带上两个数。alpha 是 X 已经稳拿的最好分数，beta 是 O 已经稳拿的最好分数。一旦 alpha 追上 beta，这个分支里剩下的走法都改变不了结果，搜索就在这里停下。",
        },
      },
      {
        title: { en: "Order", zh: "顺序" },
        body: {
          en: "Pruning cuts deepest when strong moves are tried first. Switch the search order and watch the alpha-beta count change while the outcome stays the same.",
          zh: "先试强的走法，剪枝就剪得最多。切换搜索顺序，看看 alpha-beta 的计数怎么变，而结局保持不变。",
        },
      },
    ],
  },

  build: {
    title: { en: "How it is built", zh: "怎么做的" },
    glance: [
      { k: { en: "Role", zh: "角色" }, v: { en: "Mentor and author", zh: "导师兼作者" } },
      { k: { en: "Mentoring", zh: "导师经历" }, v: { en: "2024 – 2025", zh: "2024 – 2025" } },
      { k: { en: "Data", zh: "数据" }, v: { en: "Synthetic positions", zh: "合成棋局" } },
      { k: { en: "Runs", zh: "运行" }, v: { en: "In your browser", zh: "在浏览器里" } },
    ],
    body: [
      {
        en: "The search engine is plain JavaScript with no library behind it. It runs in your browser, and nothing is stored or sent anywhere.",
        zh: "搜索引擎是纯 JavaScript 写的，不依赖任何库。它在你的浏览器里运行，不保存也不发送任何数据。",
      },
      {
        en: "The two search functions are the ones in the code panel. The only extra is a counter that adds one for every position a search visits, and every number on the page comes from it. The page runs both searches from the same position, one move at a time, so each row can show what that move cost.",
        zh: "两个搜索函数就是代码面板里的那两个。唯一多出来的是一个计数器，每访问一个局面就加一，页面上的数字都来自它。页面从同一个局面出发，逐个走法分别运行两种搜索，所以每一行都能显示那一步花了多少。",
      },
      {
        en: "The board is nine native buttons. Arrow keys move between squares, and a live region reads out the result after each change. Nothing moves on its own, so the lesson works the same with reduced motion turned on.",
        zh: "棋盘是九个原生按钮。方向键可以在格子之间移动，每次变化后屏幕阅读器会读出结果。页面上没有自动播放的动画，开启“减少动态效果”后用起来也完全一样。",
      },
    ],
  },

  role: {
    title: { en: "My role", zh: "我的角色" },
    body: [
      {
        en: "I mentor and teach, and this card is where the concepts and small projects from that work will be written up. I wrote everything on this page myself, from the learning path to the search code.",
        zh: "我做导师，也教课。这张卡片会用来整理这些经历里的概念和小项目。本页的所有内容，从学习路径到搜索代码，都是我自己写的。",
      },
      {
        en: "In a session, I try to find the one idea that unlocks the next step, then help the learner build something small enough to finish and check before we stop.",
        zh: "每节课上，我会尽量找到那个能打通下一步的概念，再帮学习者做出一个足够小的东西，在下课前完成并检验。",
      },
    ],
  },

  next: {
    title: { en: "What comes next", zh: "接下来" },
    body: [
      {
        en: "This page is a plan. The full path will be written up one session at a time, and every example on it will be rewritten from scratch or built on synthetic data. Nothing from real sessions, and nothing about the people in them, will be published.",
        zh: "这一页目前还只是计划。完整的学习路径会一节一节地写出来，上面的每个例子都会从零重写，或者使用合成数据。真实课程里的内容，以及参与者的任何信息，都不会公开。",
      },
    ],
  },

  footerNote: {
    en: "A concept page. The lesson and every position in it are synthetic and written from scratch.",
    zh: "概念页。课程和其中的每个棋局都是合成的，为本页从零编写。",
  },
};

/** Strings for the lesson demo (components/demos/teaching/GameTreeLesson.jsx). */
export const DEMO = {
  synthetic: {
    en: "Synthetic positions · written from scratch · runs in your browser",
    zh: "合成棋局 · 从零编写 · 在你的浏览器里运行",
  },
  notice: {
    en: "Concept illustration, not a real system. The positions are made up, and nothing here comes from a real session or a real learner.",
    zh: "概念演示，并非真实系统。棋局都是虚构的，没有任何内容来自真实的课程或学员。",
  },
  start: { en: "Start from", zh: "起始局面" },
  order: { en: "Search order", zh: "搜索顺序" },
  cells: {
    en: [
      "top left",
      "top middle",
      "top right",
      "middle left",
      "centre",
      "middle right",
      "bottom left",
      "bottom middle",
      "bottom right",
    ],
    zh: ["左上", "上中", "右上", "左中", "中心", "右中", "左下", "下中", "右下"],
  },
  boardLabel: { en: "Tic-tac-toe board, {player} to move", zh: "井字棋棋盘，轮到 {player}" },
  boardLabelOver: { en: "Tic-tac-toe board, game over", zh: "井字棋棋盘，对局已结束" },
  boardHelp: {
    en: "Choose an empty square to play the next mark. Arrow keys move between squares, and Enter or Space plays.",
    zh: "选一个空格落下一步。方向键在格子之间移动，回车键或空格键落子。",
  },
  cellEmpty: { en: "{cell}, empty", zh: "{cell}，空" },
  cellMark: { en: "{cell}, {mark}", zh: "{cell}，{mark}" },
  cellBest: { en: ", best move", zh: "，最佳走法" },
  cellWin: { en: ", winning line", zh: "，连成一线" },
  turn: { en: "{player} to move", zh: "轮到 {player}" },
  won: { en: "{player} wins.", zh: "{player} 获胜。" },
  draw: { en: "Draw.", zh: "平局。" },
  overHelp: { en: "Undo a move or start again.", zh: "可以悔一步，或者重新开始。" },
  bestMarker: { en: "Best move", zh: "最佳走法" },
  playBest: { en: "Play the best move", zh: "走最佳一步" },
  undo: { en: "Undo", zh: "悔一步" },
  reset: { en: "Start again", zh: "重新开始" },
  searching: { en: "Searching…", zh: "搜索中…" },
  statsTitle: { en: "Positions visited from here", zh: "从当前局面出发访问的局面数" },
  statsTitleSoFar: { en: "Positions visited so far", zh: "目前累计访问的局面数" },
  stats: {
    minimax: { en: "Minimax", zh: "Minimax" },
    alphaBeta: { en: "Alpha-beta", zh: "Alpha-beta" },
    saved: { en: "Fewer", zh: "少看了" },
    cuts: { en: "Branches cut", zh: "剪掉的分支" },
  },
  best: { en: "Best move", zh: "最佳走法" },
  bestLine: {
    en: "{cell}. With best play from here, {outcome}.",
    zh: "{cell}。双方都走最佳时，{outcome}。",
  },
  outcome: {
    1: { en: "X wins", zh: "X 获胜" },
    0: { en: "it is a draw", zh: "结果是平局" },
    "-1": { en: "O wins", zh: "O 获胜" },
  },
  value: {
    1: { en: "X wins", zh: "X 胜" },
    0: { en: "Draw", zh: "平局" },
    "-1": { en: "O wins", zh: "O 胜" },
  },
  movesTitle: { en: "Move by move", zh: "逐步来看" },
  movesHelp: {
    en: "Each row is one move from this position, in search order, with what it leads to under best play. The top bar is minimax and the bottom bar is alpha-beta, on the same scale.",
    zh: "每一行是当前局面下的一种走法，按搜索顺序排列，并注明双方都走最佳时的结局。上面的条是 minimax，下面的条是 alpha-beta，用的是同一个比例尺。",
  },
  newBest: { en: "New best so far", zh: "目前最好的一步" },
  cannotBeat: {
    en: "Cannot beat {cell}. Alpha-beta stopped once it knew.",
    zh: "不可能比{cell}更好，alpha-beta 一确认就停下了。",
  },
  step: { en: "Step through", zh: "逐步查看" },
  next: { en: "Next move", zh: "下一步" },
  all: { en: "Show all", zh: "全部显示" },
  showing: { en: "Showing {n} of {total} moves", zh: "已显示 {total} 步中的 {n} 步" },
  summary: {
    en: "{player} to move. Best move: {cell}, and with best play {outcome}. Minimax visited {mm} positions and alpha-beta visited {ab}, {saved}% fewer.",
    zh: "轮到 {player}。最佳走法：{cell}，双方都走最佳时{outcome}。minimax 访问了 {mm} 个局面，alpha-beta 访问了 {ab} 个，少了 {saved}%。",
  },
  played: { en: "{player} played {cell}.", zh: "{player} 下在{cell}。" },
  code: {
    title: { en: "The code", zh: "代码" },
    tabs: { en: "Search functions", zh: "搜索函数" },
    note: {
      en: "Marked lines are where alpha-beta differs from minimax.",
      zh: "标记的行是 alpha-beta 与 minimax 不同的地方。",
    },
    changed: { en: "Changed: ", zh: "改动：" },
    names: {
      minimax: { en: "Minimax", zh: "Minimax" },
      alphaBeta: { en: "Alpha-beta", zh: "Alpha-beta" },
    },
  },
};
