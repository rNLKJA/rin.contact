/**
 * Copy and demo data for /projects/wehi-genomics, Rin's write-up of GMM
 * (Genomics Metadata Multiplexing), the R Shiny app he helped build during his
 * WEHI student internship. Strings are bilingual ({ en, zh }), en-AU first.
 *
 * Facts come from the two public repositories and their git history:
 * WEHI-RCPStudentInternship/Genomics-Metadata-Multiplexing (README, wiki,
 * ui.R, server.R, R/, scripts/) and WEHIGenomicsRnD/celseq-sample-sheet-generator.
 * Credits follow the GMM README and its wiki Contributors page. Rin's dates on
 * the page match the career entry 'wehi' in lib/career-data.js.
 *
 * The plate demo (components/wehi-genomics/PlateDemo.jsx) is a separate piece
 * written fresh in JavaScript. Its samples and barcodes are synthetic and it
 * shares no code with GMM.
 */

export const REPOS = [
  {
    href: "https://github.com/WEHI-RCPStudentInternship/Genomics-Metadata-Multiplexing",
    label: { en: "GMM on GitHub", zh: "GitHub 上的 GMM" },
  },
  {
    href: "https://github.com/WEHIGenomicsRnD/celseq-sample-sheet-generator",
    label: {
      en: "celseq-sample-sheet-generator on GitHub",
      zh: "GitHub 上的 celseq-sample-sheet-generator",
    },
  },
];

export const WIKI_CONTRIBUTORS =
  "https://github.com/WEHI-RCPStudentInternship/Genomics-Metadata-Multiplexing/wiki/Contributors";

// Tech tags are proper nouns: single source, identical in every locale.
export const STACK = [
  "R",
  "Shiny",
  "DT",
  "reticulate",
  "renv",
  "Python",
  "pandas",
  "openpyxl",
  "fcsparser",
  "Bash",
  "Git",
];

export const COPY = {
  metaTitle: {
    en: "GMM: plate metadata to one sample sheet · Case study · rin.contact",
    zh: "GMM：把孔板元数据合成一张样本表 · 案例 · rin.contact",
  },
  metaDescription: {
    en: "How Rin Huang and WEHI student interns built GMM, an R Shiny app for WEHI's Milton HPC that merges plate layouts, FACS index-sort files and primer indexes into one CEL-Seq2 sample sheet. Includes a plate demo with synthetic data.",
    zh: "黄孙创宇（Rin）和 WEHI 的实习生们一起做的 GMM：一个为 WEHI Milton HPC 设计的 R Shiny 应用，把孔板布局、FACS 索引分选文件和引物索引合并成一张 CEL-Seq2 样本表。页面附有一个使用合成数据的孔板演示。",
  },
  back: { en: "Back to projects", zh: "返回项目" },
  label: { en: "Case study · Research software", zh: "案例 · 科研软件" },
  fullName: { en: "Genomics Metadata Multiplexing", zh: "Genomics Metadata Multiplexing" },
  tagline: {
    en: "A small R Shiny app that turns a lab's plate layout, cell sorter files and primer list into one sample sheet, so nobody has to stitch them together by hand.",
    zh: "一个小小的 R Shiny 应用，把实验室的孔板布局、细胞分选仪文件和引物清单合成一张样本表，不用再手工拼接。",
  },
  status: {
    en: "WEHI student internship, February to July 2024",
    zh: "WEHI 学生实习，2024 年 2 月至 7 月",
  },

  problem: {
    title: { en: "The problem", zh: "要解决的问题" },
    body: [
      {
        en: "Some single-cell RNA sequencing at WEHI uses CEL-Seq2, a protocol where cells are sorted one at a time into the wells of a plate. The sorting is done by a FACS (fluorescence-activated cell sorting) machine, which writes FCS files that record the well each cell went into. Every well also gets a primer with its own short barcode, so the reads can be traced back to their cell after sequencing.",
        zh: "WEHI 的部分单细胞 RNA 测序使用 CEL-Seq2 方法，细胞会被逐个分选进孔板的各个孔里。分选由 FACS（荧光激活细胞分选）仪器完成，它生成的 FCS 文件会记录每个细胞进了哪个孔。每个孔还会加入带有独特短条形码的引物，测序之后才能把读段追溯回对应的细胞。",
      },
      {
        en: "Before a plate goes to sequencing, someone has to line all of that up in a sample sheet. That meant merging a colour-coded plate layout, the FCS files, a template sheet from the lab and a primer index sheet by hand. Hand-made sheets break in quiet ways. A barcode gets pasted twice, a well is skipped, or a sample name is typed two different ways, and the mistake travels with the data into sequencing.",
        zh: "孔板送去测序之前，得有人把这些信息整理进一张样本表。过去这一步要手工合并按颜色标注的孔板布局、FCS 文件、实验室的模板表和引物索引表。手工做的表出错时往往悄无声息。条形码被粘贴了两次，某个孔被漏掉，或者同一个样本名写成了两种拼法，这些错误都会跟着数据一路进入测序。",
      },
    ],
  },

  what: {
    title: { en: "What GMM does", zh: "GMM 做了什么" },
    intro: {
      en: "GMM puts the whole merge on one page. You choose a single folder, and the app recognises each file by its name: the plate layout spreadsheet, the FCS files, the template sheet and, if there is one, the primer index sheet. It then runs four steps and gives back one file to download as CSV, TSV or Excel.",
      zh: "GMM 把整个合并过程放进了一个页面。用户选择一个文件夹，应用会按文件名识别其中的文件，包括孔板布局表、FCS 文件、模板表，以及可选的引物索引表。接着它依次完成四个步骤，最后输出一个文件，可以下载为 CSV、TSV 或 Excel。",
    },
    steps: [
      {
        title: { en: "Read the plate layout", zh: "读取孔板布局" },
        body: {
          en: "The lab marks samples on a plate map with cell colours. GMM reads the colours and writes out the plate, well and sample name for every well.",
          zh: "实验室在孔板图上用单元格颜色标出样本。GMM 读取这些颜色，为每个孔写出板号、孔位和样本名。",
        },
      },
      {
        title: { en: "Combine the FCS files", zh: "合并 FCS 文件" },
        body: {
          en: "The index-sort FCS files are stacked into one table, with the plate, sample and well position of every sorted cell.",
          zh: "把多个索引分选 FCS 文件纵向合并成一张表，每个被分选的细胞都带有板号、样本和孔位。",
        },
      },
      {
        title: { en: "Merge on plate and well", zh: "按板号和孔位合并" },
        body: {
          en: "The sample sheet, the lab's template and the FCS table are joined on plate number, well position and sample name.",
          zh: "按板号、孔位和样本名，把样本表、实验室模板和 FCS 表合并在一起。",
        },
      },
      {
        title: { en: "Add primer indexes", zh: "加入引物索引" },
        body: {
          en: "If a primer index sheet is in the folder, each well gets its barcode added. This step is optional.",
          zh: "如果文件夹里有引物索引表，就为每个孔加上对应的条形码。这一步是可选的。",
        },
      },
    ],
  },

  build: {
    title: { en: "How it was built", zh: "怎么做出来的" },
    glance: [
      { k: { en: "Where", zh: "地点" }, v: { en: "WEHI, Parkville", zh: "WEHI，帕克维尔" } },
      { k: { en: "When", zh: "时间" }, v: { en: "Feb to Jul 2024", zh: "2024 年 2 月至 7 月" } },
      { k: { en: "Front end", zh: "前端" }, v: { en: "R Shiny", zh: "R Shiny" } },
      {
        k: { en: "Merge logic", zh: "合并逻辑" },
        v: { en: "Python via reticulate", zh: "Python（经 reticulate）" },
      },
    ],
    body: [
      {
        en: "GMM ran across several intakes of the student internship at WEHI's Research Computing Platform, starting in 2022. Earlier intakes worked on the problem before us. In late 2023 Marek Cmero, a Senior Research Officer at WEHI, wrote the FACS merge logic in Python in his celseq-sample-sheet-generator repository, and the project chose to build on it. My intake, Semester 1 2024, started the current version of the app.",
        zh: "GMM 由 WEHI 研究计算平台（Research Computing Platform）的学生实习项目一期接一期地推进，始于 2022 年。在我们之前，已有几期实习生做过这个问题。2023 年底，WEHI 高级研究员 Marek Cmero 在他的 celseq-sample-sheet-generator 仓库里用 Python 写好了 FACS 合并逻辑，项目决定在此基础上继续开发。现在这一版应用，是由我所在的 2024 年第一学期这一期开始做的。",
      },
      {
        en: "The app is R Shiny on the front and Python underneath. Shiny handles the folder upload, the progress bar, the result table and the downloads. Marek's merge functions run in Python through reticulate, inside a virtual environment that the app sets up when it starts. It was built to run on Milton, WEHI's HPC, through its internal R Shiny service, so researchers could open it in a browser without installing anything.",
        zh: "应用前端是 R Shiny，底层是 Python。Shiny 负责文件夹上传、进度条、结果表格和下载。Marek 的合并函数通过 reticulate 在 Python 中运行，所需的虚拟环境会在应用启动时自动创建。整个应用是为 WEHI 的 HPC 集群 Milton 设计的，通过内部的 R Shiny 服务运行，研究人员用浏览器打开就能用，不用安装任何东西。",
      },
      {
        en: "Between March and May 2024 I wrote the Shiny side of the app: the interface, the server handlers for upload, processing, display and download, the setup scripts, and a small Python wrapper that chains Marek's functions into a single call. I also added test inputs with expected outputs, so we could check the merged sheet against known results. After Jude moved the Shiny code into Marek's repository in May, I added a column clean-up step there, which was merged into his main branch.",
        zh: "2024 年 3 月到 5 月，我写了应用的 Shiny 部分，包括界面，处理上传、数据处理、展示和下载的服务端逻辑，安装脚本，以及一个把 Marek 的函数串成一次调用的 Python 小封装。我还加入了带预期输出的测试输入，用已知结果来核对合并后的表格。5 月 Jude 把 Shiny 代码迁到 Marek 的仓库之后，我在那里加了一个清理多余列的步骤，已经合并进他的主分支。",
      },
      {
        en: "Jude Thaddeau Data, from the same intake, wrote most of the documentation: the READMEs, the wiki, the architecture and workflow diagrams, and the attribution to Marek. Jude also moved the Shiny code into Marek's repository.",
        zh: "同一期的 Jude Thaddeau Data 写了大部分文档，包括 README、wiki、架构图和流程图，以及对 Marek 的致谢说明。Shiny 代码迁到 Marek 的仓库，也是 Jude 做的。",
      },
    ],
  },

  demo: {
    title: { en: "Try it: plate to sample sheet", zh: "试一试：从孔板到样本表" },
    notice: {
      en: "This is a separate concept demo that I wrote from scratch in JavaScript for this page. The samples and barcodes are synthetic, nothing leaves your browser, and it shares no code with GMM.",
      zh: "这是我为本页用 JavaScript 从零写的独立概念演示。样本和条形码都是合成的，数据不会离开你的浏览器，也没有使用 GMM 的任何代码。",
    },
    intro: {
      en: "Pick a plate size and a sample, then click a well or move with the arrow keys and press Enter to place it. Every well already holds a made-up six-letter barcode, which you can edit. The checks look for two easy mistakes: a barcode used twice and a well left empty.",
      zh: "选择孔板规格和样本，然后点击孔位，或者用方向键移动、按 Enter 放置。每个孔都预先带有一个虚构的六位条形码，可以修改。检查会找出两类常见错误：条形码重复使用，以及孔位空着没填。",
    },
  },

  credits: {
    title: { en: "Credits", zh: "致谢" },
    intro: {
      en: "GMM was a team effort across several intakes. Everyone below appears in the project's git history or on its wiki Contributors page.",
      zh: "GMM 是几期实习生共同完成的。以下各位都出现在项目的 git 记录或 wiki 贡献者页面上。",
    },
    people: [
      {
        name: "Marek Cmero",
        role: {
          en: "Senior Research Officer at WEHI and project supervisor. He developed the FACS merge logic that GMM uses, which came from his celseq-sample-sheet-generator repository.",
          zh: "WEHI 高级研究员、项目导师。GMM 使用的 FACS 合并逻辑由他开发，来自他的 celseq-sample-sheet-generator 仓库。",
        },
      },
      {
        name: "Rowland Mosbergen",
        role: { en: "Project supervisor at WEHI.", zh: "WEHI 项目导师。" },
      },
      {
        name: "Jude Thaddeau Data",
        role: {
          en: "My teammate in the Semester 1 2024 intake. Documentation, wiki and diagrams, and the move of the Shiny code into Marek's repository.",
          zh: "2024 年第一学期同期队友，负责文档、wiki 和图示，并把 Shiny 代码迁到了 Marek 的仓库。",
        },
      },
      {
        name: "Andy Le Nguyen",
        role: {
          en: "Semester 2 2023 intake. Early work on parsing FCS files and merging primer index files.",
          zh: "2023 年第二学期一期，早期负责解析 FCS 文件、合并引物索引文件。",
        },
      },
      {
        name: "Nandi Ruan",
        role: {
          en: "Summer 2023 to 2024 intake. Worked on the early Shiny prototypes.",
          zh: "2023 至 2024 年暑期一期，参与了早期的 Shiny 原型。",
        },
      },
      {
        name: "Gloria Zilan Huang",
        role: {
          en: "Summer 2023 to 2024 intake. Worked on the early Shiny prototypes.",
          zh: "2023 至 2024 年暑期一期，参与了早期的 Shiny 原型。",
        },
      },
    ],
    wiki: {
      en: "The full list of interns and supervisors is on the GMM wiki",
      zh: "完整的实习生和导师名单见 GMM wiki",
    },
  },

  learned: {
    title: { en: "What I learned", zh: "我的收获" },
    body: [
      {
        en: "Most of the work was in the edges. Lab files arrive with slightly different names, an optional sheet is sometimes missing, and a plate map keeps its meaning in cell colours. Getting the app to accept an empty primer index file and several FCS files at once is where I learned the most.",
        zh: "大部分工作其实在边角情况上。实验室文件的命名会有细微差别，可选的表格有时缺失，孔板图还把信息藏在单元格颜色里。让应用能接受空的引物索引文件、一次处理多个 FCS 文件，是我学到最多的地方。",
      },
      {
        en: "I also learned to build on someone else's logic with care. Marek's functions did the hard part, so my job was to wrap them well, test them against known outputs and credit him clearly.",
        zh: "我也学会了怎样认真地在别人的逻辑上继续开发。最难的部分由 Marek 的函数完成，我的工作是把它们封装好，用已知结果测试，并清楚地注明他的贡献。",
      },
    ],
  },

  footerNote: {
    en: "Both repositories are public on GitHub.",
    zh: "两个仓库都在 GitHub 上公开。",
  },
};

// ── Plate demo ────────────────────────────────────────────────────────────────

export const PLATE_FORMATS = {
  96: { rows: 8, cols: 12 },
  384: { rows: 16, cols: 24 },
};

// `id` goes into the CSV, `mark` is drawn inside 96-well wells, `name` is shown.
export const SAMPLES = [
  { id: "sample_1", mark: "1", name: { en: "Sample 1", zh: "样本 1" } },
  { id: "sample_2", mark: "2", name: { en: "Sample 2", zh: "样本 2" } },
  { id: "sample_3", mark: "3", name: { en: "Sample 3", zh: "样本 3" } },
  { id: "control", mark: "C", name: { en: "Control", zh: "对照" } },
];

export const PLATE_NAME = "DEMO-PLATE-01";
export const CSV_COLUMNS = ["plate", "well", "row", "column", "sample", "barcode"];

export const DEMO = {
  plateSize: { en: "Plate size", zh: "孔板规格" },
  wells: { en: "{n} wells", zh: "{n} 孔" },
  tool: { en: "Place", zh: "放置" },
  select: { en: "Select only", zh: "只选中" },
  empty: { en: "Empty", zh: "清空" },
  plateLabel: { en: "{n}-well plate", zh: "{n} 孔板" },
  plateHelp: {
    en: "Arrow keys move between wells. Enter or Space places the chosen sample. Delete clears a well.",
    zh: "方向键在孔位间移动，Enter 或空格放置所选样本，Delete 清空孔位。",
  },
  wellFilled: {
    en: "{well}, {sample}, barcode {barcode}",
    zh: "{well}，{sample}，条形码 {barcode}",
  },
  wellEmpty: { en: "{well}, empty", zh: "{well}，空" },
  wellProblem: { en: ", check barcode", zh: "，条形码需检查" },
  selected: { en: "Selected well", zh: "当前孔位" },
  emptyName: { en: "Empty", zh: "空" },
  barcodeFor: { en: "Barcode for {well}", zh: "{well} 的条形码" },
  barcodeHint: {
    en: "Six letters from A, C, G and T.",
    zh: "六位，只能用 A、C、G、T。",
  },
  fillRow: { en: "Fill row {row}", zh: "填满 {row} 行" },
  fillCol: { en: "Fill column {col}", zh: "填满第 {col} 列" },
  example: { en: "Load example", zh: "载入示例" },
  clear: { en: "Clear plate", zh: "清空孔板" },
  resetBarcodes: { en: "Reset barcodes", zh: "重置条形码" },
  checks: { en: "Checks", zh: "检查" },
  ok: { en: "No problems found.", zh: "没有发现问题。" },
  dup: { en: "Barcode {barcode} is used in {wells}.", zh: "条形码 {barcode} 同时用在 {wells}。" },
  invalid: {
    en: "{well} has an invalid barcode. Use six letters from A, C, G and T.",
    zh: "{well} 的条形码无效，只能用六位 A、C、G、T。",
  },
  emptyOne: {
    en: "1 well is empty and will be left out of the sheet.",
    zh: "有 1 个空孔，不会写入样本表。",
  },
  emptyMany: {
    en: "{n} wells are empty and will be left out of the sheet.",
    zh: "有 {n} 个空孔，不会写入样本表。",
  },
  and: { en: " and ", zh: "和" },
  stats: {
    filled: { en: "Filled", zh: "已填" },
    empty: { en: "Empty", zh: "空孔" },
    problems: { en: "Problems", zh: "问题" },
  },
  summary: {
    en: "{n}-well plate. {filled} of {total} wells filled, {empty} empty. Barcode problems: {problems}.",
    zh: "{n} 孔板。{total} 个孔中已填 {filled} 个，空 {empty} 个。条形码问题 {problems} 个。",
  },
  preview: { en: "Sample sheet preview", zh: "样本表预览" },
  showing: {
    en: "Showing the first {n} of {total} rows.",
    zh: "显示前 {n} 行，共 {total} 行。",
  },
  noRows: {
    en: "Place at least one sample to build the sheet.",
    zh: "至少放置一个样本，才能生成样本表。",
  },
  download: { en: "Download CSV", zh: "下载 CSV" },
  blocked: {
    en: "Fix the barcode problems above to download.",
    zh: "请先修正上面的条形码问题，再下载。",
  },
  downloaded: { en: "Downloaded {file}.", zh: "已下载 {file}。" },
  loaded: { en: "Example loaded.", zh: "已载入示例。" },
  cleared: { en: "Plate cleared.", zh: "孔板已清空。" },
  synthetic: {
    en: "Synthetic data. Not GMM and not a real plate.",
    zh: "合成数据，并非 GMM，也不是真实孔板。",
  },
};
