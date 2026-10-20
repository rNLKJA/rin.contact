import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import SyntheticGenerators from "@/components/knowledge/widgets/SyntheticGenerators";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

/**
 * Concept note /knowledge/notes/synthetic-data, filed under
 * /knowledge/data-governance. Same six sections as the pilot note. The
 * "Where I used it" facts come from the SA Mock Address Lab README, the HPLC
 * QC Lab entry in lib/coursework-data.js and lib/daybook-data.js.
 */

const SLUG = "synthetic-data";
const SA_LAB = "https://sa-mock-address-generator.vercel.app";
const HPLC_LAB = "https://mast30034-hplc-qc-lab.vercel.app";

// Links inside a Callout sit outside .prose, so they set their own ink.
const CALLOUT_LINK =
  "text-accent-ink font-medium underline decoration-[#FF3C3C]/40 underline-offset-4 hover:decoration-current";

const SOURCES = {
  jordon: "https://arxiv.org/abs/2205.03257",
  synthpop: "https://doi.org/10.18637/jss.v074.i11",
  stadler: "https://arxiv.org/abs/2011.07018",
};

const TEX = {
  model: String.raw`x_1, \dots, x_n \sim P \quad\longrightarrow\quad \hat{P}_\theta \quad\longrightarrow\quad \tilde{x}_1, \dots, \tilde{x}_m \sim \hat{P}_\theta`,
  tv: String.raw`\operatorname{TV}(p, q) = \frac{1}{2} \sum_{j=1}^{J} \lvert p_j - q_j \rvert`,
  dcr: String.raw`d_i = \min_{1 \le j \le n} \lVert \tilde{x}_i - x_j \rVert`,
  chi: String.raw`\chi^2 = \sum_{k=1}^{K} \frac{(O_k - E_k)^2}{E_k}, \qquad w = \sqrt{\chi^2 / n}`,
};

const WIDGET_COPY = {
  en: {
    generator: "Generator",
    methods: { shuffle: "Shuffle", normal: "Normal", copy: "Copy" },
    sigma: "σ, noise added to each copied row",
    newData: "New data",
    reset: "Reset",
    seed: "Seed {seed}",
    legend: "Marks in the chart",
    realRows: "Real rows",
    synthRows: "Synthetic rows",
    chartLabel:
      "Scatter plot of 100 real rows in three clusters and 100 rows from the {method} generator. Synthetic correlation {r}, shape gap {gap}, median distance to the nearest real row {near}. The table gives the same numbers.",
    gridNote: "Faint lines mark the {grid} × {grid} grid the shape gap is counted on.",
    realLine: "The real rows have a correlation of {realR}.",
    tableCaption:
      "Scores for a fresh real sample and for the synthetic rows, each measured against the real rows.",
    colRows: "Rows",
    colR: "r",
    colGap: "Shape gap",
    colNear: "Nearest real",
    colCopies: "Copies",
    rowHoldout: "Fresh real sample",
    rowSynth: "{method} generator",
    summary: "The {method} generator gives a correlation of {r} against the real {realR}.",
    gapClose:
      "Its shape gap of {gap} is about what a fresh real sample scores ({baseGap}), so the clusters survive.",
    gapFar:
      "Its shape gap of {gap} is well above the {baseGap} a fresh real sample scores, so the shape is lost.",
    nearTooClose:
      "Its rows sit closer to real rows than fresh real data does ({near} against {baseNear}), which is a disclosure warning.",
    nearSame:
      "Its rows sit about as close to real rows as fresh real data does ({near} against {baseNear}).",
    nearFar:
      "Its rows sit further from real rows than fresh real data does ({near} against {baseNear}), so little is copied.",
    copiesNote: "{copies} of its 100 rows are exact copies of real rows.",
  },
  zh: {
    generator: "生成器",
    methods: { shuffle: "打乱列", normal: "正态拟合", copy: "复制加噪" },
    sigma: "σ，给每条复制行加的噪声",
    newData: "换一组数据",
    reset: "重置",
    seed: "种子 {seed}",
    legend: "图中的标记",
    realRows: "真实行",
    synthRows: "合成行",
    chartLabel:
      "散点图：三个簇里的 100 条真实行，以及“{method}”生成器给出的 100 条合成行。合成数据的相关系数为 {r}，形状差距为 {gap}，到最近真实行距离的中位数为 {near}。下方表格给出同样的数字。",
    gridNote: "浅色线是计算形状差距用的 {grid} × {grid} 网格。",
    realLine: "真实行的相关系数为 {realR}。",
    tableCaption: "一份新抽的真实样本和合成行的得分，都以真实行为参照。",
    colRows: "数据",
    colR: "r",
    colGap: "形状差距",
    colNear: "最近真实行",
    colCopies: "复制",
    rowHoldout: "新抽的真实样本",
    rowSynth: "“{method}”生成器",
    summary: "“{method}”生成器的相关系数为 {r}，真实数据为 {realR}。",
    gapClose: "形状差距为 {gap}，和新抽的真实样本（{baseGap}）差不多，簇的结构保留下来了。",
    gapFar: "形状差距为 {gap}，明显高于新抽真实样本的 {baseGap}，形状丢了。",
    nearTooClose: "合成行离真实行比新的真实数据还近（{near}，对比 {baseNear}），这是泄露的警告。",
    nearSame: "合成行离真实行的距离和新的真实数据差不多（{near}，对比 {baseNear}）。",
    nearFar: "合成行离真实行比新的真实数据更远（{near}，对比 {baseNear}），复制的成分很少。",
    copiesNote: "100 条合成行里有 {copies} 条和某条真实行完全一样。",
  },
};

function SourceList({ items }) {
  return (
    <ul className="not-prose my-6 space-y-5 list-none pl-0">
      {items.map((s) => (
        <li key={s.href} className="text-[14px] leading-relaxed">
          <a
            href={s.href}
            rel="noreferrer"
            className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
          >
            {s.title}
          </a>
          <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
            {s.cite}
          </span>
          <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {s.why}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Three of the demos on this site run on data that never existed. The rows look like lab
        results, street addresses or a month of daily check-ins, and none of them came from a person
        or a partner organisation. Each time that was a choice, because the real data could not
        leave the place it lived. This note covers how a generator makes rows like these, what it
        keeps and what it quietly drops, and the checks I run before I trust a synthetic table.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          <Term>Synthetic data</Term> is drawn from a model of the data rather than copied out of
          the data. The model can be written by hand, as a set of rules and distributions you
          choose, or it can be fitted, learned from real rows. Either way the synthetic rows are new
          draws, so no row has to belong to anyone.
        </p>
        <p>
          It gets used for two quite different jobs. The first is as a stand-in for data you are not
          allowed to share: patient records, a partner's lab exports, anything under a privacy or
          confidentiality promise. The second is as test data where you control the truth. If you
          plant a fault in row 412 on purpose, you know exactly what a good detector should flag,
          which real data never tells you. The second job does not need any real data at all.
        </p>
        <p>
          The catch is the same in both. A generator can only give back what its model holds. A
          relationship between two columns that the model leaves out is missing from every synthetic
          row, and drawing a million rows will not bring it back. The opposite failure is just as
          real: a generator that holds too much is a copy of the real rows with extra steps. So
          every synthetic table faces two questions that pull against each other. Is it close enough
          to the real thing to be useful, which is its <Term>fidelity</Term>? And is it far enough
          from the real rows to be safe, which is its <Term>disclosure risk</Term>?
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Real rows come from some unknown distribution <TeX>P</TeX>. A generator fits a model{" "}
          <TeX>{String.raw`\hat{P}_\theta`}</TeX> to them and then draws new rows from the model.
        </p>
        <Formula
          label="Real rows x 1 to x n come from P. Fit a model P hat theta. Draw synthetic rows x tilde 1 to x tilde m from P hat theta."
          caption="Whatever the fitted model cannot express, no synthetic row will contain."
        >
          {TEX.model}
        </Formula>
        <p>
          For fidelity, compare the two samples as distributions rather than comparing a few summary
          numbers. A plain way is to cut the space into <TeX>J</TeX> cells, take the share of real
          rows <TeX>{String.raw`p_j`}</TeX> and synthetic rows <TeX>{String.raw`q_j`}</TeX> in each,
          and add up the differences. This is the <Term>total variation distance</Term>.
        </p>
        <Formula
          label="Total variation between p and q is one half of the sum over cells of the absolute difference between p j and q j"
          caption="0 means the shares match in every cell. 1 means the two samples never share a cell."
        >
          {TEX.tv}
        </Formula>
        <p>
          A score on its own means little, because two honest samples from the same source also
          differ. The baseline is a second, fresh sample of real data, held out from the generator.
          If the synthetic rows land near the fresh sample's score, the generator is about as good
          as it can be on this measure. If they score much better than fresh real data, be
          suspicious, because the likeliest way to beat a fresh sample is to copy the training rows.
        </p>
        <p>
          For disclosure, the simplest check is the <Term>distance to the closest record</Term>. For
          each synthetic row, find the nearest real row.
        </p>
        <Formula
          label="d i is the minimum over real rows j of the distance between synthetic row x tilde i and real row x j"
          caption="Compare the spread of these distances with the same distances for fresh real rows."
        >
          {TEX.dcr}
        </Formula>
        <p>
          Fresh real rows sit at some typical distance from the training rows. Synthetic rows that
          sit much closer than that are leaking individual records, and a distance of exactly zero
          means a real row has been published as it was.
        </p>
        <p>
          When the target is a mix of categories rather than a cloud of points, the fidelity check
          becomes a goodness-of-fit test. Count the observed rows <TeX>{String.raw`O_k`}</TeX> in
          each of <TeX>K</TeX> categories, compare them with the counts the target mix expects,{" "}
          <TeX>{String.raw`E_k`}</TeX>, and report the effect size next to the p-value so a large
          sample cannot make a trivial gap look important.
        </p>
        <Formula
          label="Chi squared is the sum over categories of observed minus expected, squared, over expected. Cohen's w is the square root of chi squared over n."
          caption="Pearson's test with K − 1 degrees of freedom, valid when every expected count is at least about 5."
        >
          {TEX.chi}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The real data in the widget is made up too: 100 rows from three clusters. Each generator
          learns from those rows and draws 100 new ones. The table scores the synthetic rows next to
          a fresh draw from the same three clusters, the best result any generator could hope for.
        </p>
        <Figure caption="Every dataset here comes from a seeded generator, so a seed and a setting always give the same rows. Real rows are rings, synthetic rows are dots.">
          <SyntheticGenerators copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Start on Normal. Its correlation lands close to the real one, yet its shape gap is the
            worst of the three, because one normal distribution fills the empty space between the
            clusters. Matching a summary statistic proves very little.
          </li>
          <li>
            Switch to Shuffle. Each column keeps its exact values, the correlation falls to about
            zero, and a cluster appears in the top-left corner where the real data has none.
          </li>
          <li>
            Switch to Copy and drag σ to 0. The shape gap now beats the fresh real sample and all
            100 rows are copies. Perfect fidelity is the privacy failure.
          </li>
          <li>
            Raise σ slowly. Near 0.05 the median distance to the nearest real row matches the fresh
            sample. Past 0.2 the clusters blur and the shape gap climbs.
          </li>
          <li>
            On some seeds, including the first, Shuffle rebuilds one real row exactly, purely by
            chance. A generator does not have to copy on purpose to publish a real record.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="SA Mock Address Lab · HPLC QC Lab · Daybook">
          <p>
            <a href={SA_LAB} className={CALLOUT_LINK}>
              SA Mock Address Lab
            </a>{" "}
            started as a command-line tool I wrote in August 2025 to make mock South Australian
            addresses for software testing. Porting it to the web in 2026 showed that its remoteness
            and socio-economic weights had never been applied, so every suburb was equally likely.
            The revival keeps that uniform mode as built, adds the promised weighting from ABS
            remoteness and SEIFA data, and checks each sample against its target mix with Wilson
            intervals, a goodness-of-fit test and Cohen's w. Every output is stamped as synthetic
            test data, because a generated address can still match a real one by chance.
          </p>
          <p>
            <a href={HPLC_LAB} className={CALLOUT_LINK}>
              HPLC QC Lab
            </a>{" "}
            rebuilds our MAST30034 industry capstone to run in the browser on synthetic data only.
            None of the partner's data is used. Every sheet, chart and cluster comes from a seeded
            generator that mimics the shape of the lab's exports and plants faults on purpose, so
            the right answer is known in advance.
          </p>
          <p>
            On my{" "}
            <Link href="/projects/moodist#daybook" className={CALLOUT_LINK}>
              Moodist write-up
            </Link>
            , the demo is Daybook, a separate concept demo with made-up questions and four weeks of
            synthetic history. Moodist belongs to the University of Melbourne, and none of its data
            appears on this site.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Calling synthetic data anonymous by default.</strong> A generator fitted
              closely enough gives real rows back, and unusual rows are the easiest to recover.
              Check the distance to the closest record before release. A formal guarantee such as{" "}
              <Link href="/knowledge/differential-privacy" className={CALLOUT_LINK}>
                differential privacy
              </Link>{" "}
              has to be designed into the generator, it does not come for free.
            </li>
            <li>
              <strong>Matching the summary and stopping.</strong> Means, spreads and one correlation
              can all agree while the joint shape is wrong, which is exactly what the fitted normal
              does above.
            </li>
            <li>
              <strong>Reading a score without a baseline.</strong> Two real samples never match
              perfectly either. Without a fresh real sample to compare against, you cannot tell
              ordinary sampling noise from a generator that has missed something.
            </li>
            <li>
              <strong>Drawing conclusions about the world from synthetic rows.</strong> A pattern
              the model never held cannot show up, so an analysis on synthetic data will report it
              as absent. Synthetic data is for building and testing the pipeline. The findings still
              need the real data.
            </li>
            <li>
              <strong>Forgetting the seed.</strong> A bug found in unseeded synthetic data may never
              appear again. Both labs above take a seed, so the same settings give the same rows on
              any machine.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <SourceList
          items={[
            {
              href: SOURCES.jordon,
              title: "Synthetic Data: what, why and how?",
              cite: "Jordon, Szpruch, Houssiau and others, arXiv:2205.03257, 2022.",
              why: "A broad, readable report on what synthetic data can and cannot promise, written for the Royal Society. Good on the fidelity, utility and privacy trade-off.",
            },
            {
              href: SOURCES.synthpop,
              title: "synthpop: Bespoke Creation of Synthetic Data in R",
              cite: "Nowok, Raab and Dibben, Journal of Statistical Software, volume 74, issue 11, 2016.",
              why: "A practical package and paper from the official statistics world. It fits one column at a time, conditioned on the ones before, and comes with utility checks.",
            },
            {
              href: SOURCES.stadler,
              title: "Synthetic Data: Anonymisation Groundhog Day",
              cite: "Stadler, Oprisanu and Troncoso, USENIX Security Symposium, 2022.",
              why: "The paper to read before calling a synthetic release private. It attacks several generators and shows that unusual records stay exposed.",
            },
          ]}
        />
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        这个网站上有三个演示，跑的都是从来没有存在过的数据。那些行看起来像化验结果、街道地址或一个月的每日打卡，但没有一行来自真实的人或合作机构。每一次这样做都是有意的选择，因为真实数据不能离开它原来所在的地方。这篇笔记讲生成器怎样造出这样的数据，它保留了什么、悄悄丢掉了什么，以及我在信任一张合成数据表之前会做哪些检查。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          <Term>合成数据</Term>
          是从数据的模型里抽出来的，而不是从数据里抄出来的。模型可以手写，也就是自己选定的规则和分布，也可以拟合，也就是从真实行里学出来。无论哪种，合成行都是新抽的，所以没有哪一行需要属于某个具体的人。
        </p>
        <p>
          它常被用来做两件很不一样的事。第一件是替代不能共享的数据：病历、合作方的实验导出、任何受隐私或保密承诺约束的东西。第二件是做测试数据，而且真相由你掌控。如果你故意在第
          412
          行埋一个故障，你就确切知道一个好的检测方法应该标出什么，真实数据从来不会告诉你这一点。第二件事甚至完全不需要真实数据。
        </p>
        <p>
          两种用法有同一个问题：生成器只能还给你模型里有的东西。模型没有表达的两列之间的关系，在每一条合成行里都不存在，抽一百万行也补不回来。反过来的失败同样真实：模型记住的太多，生成器就只是绕了个弯的真实数据副本。所以每张合成表都要面对两个互相拉扯的问题：它离真实数据够不够近，近到有用，这是
          <Term>保真度</Term>。它离真实行够不够远，远到安全，这是<Term>泄露风险</Term>。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          真实行来自某个未知分布 <TeX>P</TeX>。生成器用它们拟合一个模型{" "}
          <TeX>{String.raw`\hat{P}_\theta`}</TeX>，再从模型里抽新行。
        </p>
        <Formula
          label="真实行 x 1 到 x n 来自 P，拟合模型 P hat theta，再从中抽出合成行 x tilde 1 到 x tilde m"
          caption="拟合出来的模型表达不了的东西，任何一条合成行里都不会有。"
        >
          {TEX.model}
        </Formula>
        <p>
          衡量保真度，要把两份样本当作分布来比较，而不是只比几个汇总数字。一个朴素的办法是把空间切成{" "}
          <TeX>J</TeX> 个格子，算出每个格子里真实行的比例 <TeX>{String.raw`p_j`}</TeX>{" "}
          和合成行的比例 <TeX>{String.raw`q_j`}</TeX>，再把差值加起来。这就是
          <Term>总变差距离</Term>。
        </p>
        <Formula
          label="p 和 q 的总变差距离等于各格子 p j 与 q j 之差的绝对值之和的一半"
          caption="0 表示每个格子的比例都一样，1 表示两份样本没有落在任何同一个格子里。"
        >
          {TEX.tv}
        </Formula>
        <p>
          单看一个分数意义不大，因为同一个来源的两份老实样本也会有差别。基准是另一份新抽的真实数据，生成器训练时没见过它。如果合成行的分数接近这份新样本，生成器在这个指标上已经差不多到头了。如果合成行比新的真实数据还要好得多，就该起疑，因为最容易赢过新样本的办法，就是照抄训练用的那些行。
        </p>
        <p>
          衡量泄露，最简单的检查是<Term>到最近记录的距离</Term>
          。对每一条合成行，找出离它最近的真实行。
        </p>
        <Formula
          label="d i 等于合成行 x tilde i 与所有真实行 x j 之间距离的最小值"
          caption="把这些距离的分布，和新抽真实行的同一种距离对比。"
        >
          {TEX.dcr}
        </Formula>
        <p>
          新抽的真实行和训练行之间有一个典型的距离。合成行如果比这个距离近得多，就是在泄露个人记录。距离正好为零，说明某条真实行被原样发布了。
        </p>
        <p>
          如果目标是一组类别的比例，而不是一团点，保真度检查就变成拟合优度检验。数出 <TeX>K</TeX>{" "}
          个类别里各自观测到的行数 <TeX>{String.raw`O_k`}</TeX>，和目标比例下的期望数{" "}
          <TeX>{String.raw`E_k`}</TeX> 对比，并且在 p
          值旁边报告效应量，免得样本一大，很小的差距也显得很重要。
        </p>
        <Formula
          label="卡方等于各类别观测数减期望数的平方除以期望数之和，Cohen 的 w 等于卡方除以 n 再开平方"
          caption="Pearson 检验，自由度为 K − 1，要求每个期望数大约都不小于 5。"
        >
          {TEX.chi}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          工具里的“真实数据”本身也是虚构的：三个簇里的 100 行。每个生成器从这些行里学习，再抽出 100
          条新行。表格把合成行和同样三个簇里新抽的一份样本放在一起打分，后者就是任何生成器所能期望的最好结果。
        </p>
        <Figure caption="这里的每一份数据都来自带种子的生成器，同一个种子和同一组设置总是给出同样的行。圆圈是真实行，实心点是合成行。">
          <SyntheticGenerators copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>
            先选“正态拟合”。它的相关系数和真实数据很接近，形状差距却是三者里最大的，因为一个正态分布把簇之间的空白都填满了。汇总统计量对上了，说明不了多少问题。
          </li>
          <li>
            换成“打乱列”。每一列的取值原封不动，相关系数却掉到接近零，左上角还冒出一个真实数据里根本没有的簇。
          </li>
          <li>
            换成“复制加噪”，把 σ 拖到 0。形状差距反而赢过了新抽的真实样本，100
            行全是副本。完美的保真度，恰恰就是隐私上的失败。
          </li>
          <li>
            慢慢调高 σ。到 0.05 左右，到最近真实行距离的中位数和新样本对上了。超过 0.2
            之后，簇开始糊掉，形状差距跟着上升。
          </li>
          <li>
            在一些种子下，包括第一个，“打乱列”纯属偶然地拼回了一条真实行。生成器不必有意复制，也可能把真实记录发布出去。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="SA Mock Address Lab · HPLC 质控实验室 · 日记本">
          <p>
            <a href={SA_LAB} className={CALLOUT_LINK}>
              SA Mock Address Lab
            </a>
            起初是我 2025 年 8 月写的一个命令行工具，用来为软件测试生成南澳的模拟地址。2026
            年把它移植到网页时才发现，它的偏远程度和社会经济权重从来没有生效过，每个郊区被抽中的机会都一样。复活版保留了当年这种均匀模式，补上了原本承诺的、基于
            ABS 偏远程度和 SEIFA 数据的加权，并用 Wilson 区间、拟合优度检验和 Cohen 的 w
            检查每份样本是否达到目标比例。每一条输出都标明是合成测试数据，因为生成的地址仍可能碰巧和真实地址一样。
          </p>
          <p>
            <a href={HPLC_LAB} className={CALLOUT_LINK}>
              HPLC 质控实验室
            </a>
            把我们 MAST30034
            的行业毕业项目重建成只用合成数据、在浏览器里运行的版本，不使用合作方的任何数据。每张表、每张图和每个聚类都来自一个带种子的生成器，它模仿实验室导出数据的结构，并故意埋入故障，所以正确答案事先就知道。
          </p>
          <p>
            在我的
            <Link href="/projects/moodist#daybook" className={CALLOUT_LINK}>
              Moodist 手记
            </Link>
            里，演示是“日记本”，一个独立的概念演示，问题是虚构的，四周的记录是合成的。Moodist
            属于墨尔本大学，这个网站上没有它的任何数据。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>默认合成数据就是匿名的。</strong>
              拟合得足够紧的生成器会把真实行还回来，越是少见的行越容易被还原。发布前要检查到最近记录的距离。
              <Link href="/knowledge/differential-privacy" className={CALLOUT_LINK}>
                差分隐私
              </Link>
              这样的正式保证必须专门设计进生成器，不会自动附带。
            </li>
            <li>
              <strong>汇总数字对上就收工。</strong>
              均值、离散程度和一个相关系数可以全部吻合，联合分布的形状却是错的，上面的正态拟合就是这样。
            </li>
            <li>
              <strong>没有基准就读分数。</strong>
              两份真实样本也不会完全一致。没有一份新抽的真实样本作对照，就分不清是普通的抽样波动，还是生成器漏掉了什么。
            </li>
            <li>
              <strong>用合成行得出关于现实世界的结论。</strong>
              模型里没有的规律不可能出现，所以在合成数据上做分析，会报告它“不存在”。合成数据适合用来搭建和测试流程，结论仍然要靠真实数据。
            </li>
            <li>
              <strong>忘了种子。</strong>
              在没有种子的合成数据里发现的
              bug，可能再也复现不了。上面两个实验室都接受种子，同样的设置在任何机器上都给出同样的行。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <SourceList
          items={[
            {
              href: SOURCES.jordon,
              title: "Synthetic Data: what, why and how?",
              cite: "Jordon、Szpruch、Houssiau 等，arXiv:2205.03257，2022。",
              why: "一份面向英国皇家学会写的综述，读起来不累，讲清楚合成数据能承诺什么、不能承诺什么，对保真度、效用和隐私之间的权衡讲得很好。",
            },
            {
              href: SOURCES.synthpop,
              title: "synthpop: Bespoke Creation of Synthetic Data in R",
              cite: "Nowok、Raab 与 Dibben，Journal of Statistical Software 第 74 卷第 11 期，2016。",
              why: "来自官方统计领域的实用工具包和论文。它一次拟合一列，以前面的列为条件，并附带效用检查。",
            },
            {
              href: SOURCES.stadler,
              title: "Synthetic Data: Anonymisation Groundhog Day",
              cite: "Stadler、Oprisanu 与 Troncoso，USENIX Security Symposium，2022。",
              why: "在宣称一份合成数据是隐私安全的之前，应该先读这篇。它攻击了好几种生成器，说明少见的记录依然暴露在外。",
            },
          ]}
        />
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "Rows drawn from a model instead of copied from the data. What a generator keeps, what it drops, and the two checks I run before trusting a synthetic table.",
    description:
      "A concept note on synthetic data: hand-written and fitted generators, fidelity read against a fresh real sample, distance to the closest real record and goodness-of-fit checks, with a seeded widget that compares three generators. Part of Rin Huang's Data Governance topic.",
    course: "Synthetic test and stand-in data",
    courseCode: "In practice",
    level: "Professional",
    learned: "2025–2026",
    applied: "SA Mock Address Lab · HPLC QC Lab",
    parent: { href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" },
    sections: [
      { id: "idea", label: "The idea" },
      { id: "maths", label: "The maths" },
      { id: "try", label: "Try it" },
      { id: "used", label: "Where I used it" },
      { id: "pitfalls", label: "Easy to get wrong" },
      { id: "sources", label: "Sources" },
    ],
  },
  "zh-Hans": {
    subtitle:
      "从模型里抽出来、而不是从数据里抄出来的行。生成器保留什么、丢掉什么，以及我在信任一张合成数据表之前做的两项检查。",
    description:
      "关于合成数据的概念笔记：手写和拟合的生成器、以新抽真实样本为基准的保真度、到最近真实记录的距离和拟合优度检验，并附带一个比较三种生成器的带种子工具。属于 Rin Huang 的数据治理主题。",
    course: "合成测试数据与替代数据",
    courseCode: "实践",
    level: "职业实践",
    learned: "2025–2026",
    applied: "SA Mock Address Lab · HPLC 质控实验室",
    parent: { href: "/knowledge/data-governance", label: "数据治理、隐私与伦理" },
    sections: [
      { id: "idea", label: "基本想法" },
      { id: "maths", label: "数学" },
      { id: "try", label: "动手试" },
      { id: "used", label: "我在哪用到它" },
      { id: "pitfalls", label: "容易出错的地方" },
      { id: "sources", label: "参考资料" },
    ],
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  const note = findNote(SLUG);
  const { title, readingTime } = noteCopy(note, locale);
  return {
    slug: `notes/${SLUG}`,
    kind: "note",
    title,
    readingTime,
    updated: note.updated,
    ...meta,
    Body,
  };
}
