import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/data-visualisation.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG bar
 * weights (the data) are shared; prose, captions, aria-labels, and the figure's
 * row labels/examples + axis caption are localised. No maths. Nine sections.
 */

// Cleveland-McGill accuracy weights (drive bar width + opacity); rows localised.
const RANK_W = [1.0, 0.82, 0.62, 0.44, 0.28];

function RankingFigure({ caption, ariaLabel, rows, axisLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 200"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {RANK_W.map((w, i) => {
          const y = 22 + i * 34;
          return (
            <g key={i}>
              <rect
                x="40"
                y={y}
                width={300 * w}
                height="20"
                fill="#FF3C3C"
                opacity={0.25 + 0.6 * w}
              />
              <text x="46" y={y + 14} fontSize="10" fontFamily="monospace" fill="currentColor">
                {rows[i].label}
              </text>
              <text
                x={48 + 300 * w}
                y={y + 14}
                fontSize="8.5"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.55"
              >
                {rows[i].eg}
              </text>
            </g>
          );
        })}
        <text x="40" y="196" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">
          {axisLabel}
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Visualisation is often treated as the pretty step at the end — make a chart, tidy the
        colours, ship it. That undersells it badly. A well-made chart lets a reader{" "}
        <strong>see a pattern, a gap, or an outlier instantly</strong> that would take paragraphs to
        describe and a table to hide. It works because the human visual system is a massively
        parallel pattern-finder, and a good chart hands the work to it. A bad chart fights it.
      </p>
      <p>
        So the right way to think about visualisation isn't aesthetics — it's{" "}
        <strong>perception</strong>. Once you know what the eye does automatically, what it judges
        accurately, and what it gets wrong, the rules for good charts stop being arbitrary taste and
        become something close to engineering. That's the through-line of this page.
      </p>

      <KSection id="why" eyebrow="01" title="Why we draw data">
        <p>
          The eye and visual cortex process enormous amounts of information in parallel and
          pre-consciously — far more than the slow, serial channel we use to read numbers. A table
          of a thousand rows is a thousand serial reads; the same data as a scatter plot is one
          glance. Visualisation converts a <em>cognitive</em> task (compute, compare, remember) into
          a <em>perceptual</em> one (look, see), and perception is the faster, higher-bandwidth
          system.
        </p>
        <p>
          The famous demonstration is <Term>Anscombe's quartet</Term>: four datasets with nearly
          identical means, variances, and correlation, that look completely different when plotted —
          one linear, one curved, one a single outlier dragging a line. The summary statistics hide
          what one chart reveals. That's the case for visualisation in a nutshell: the picture
          carries structure the numbers flatten away.
        </p>
      </KSection>

      <KSection
        id="preattentive"
        eyebrow="02"
        title="Pre-attentive processing: what the eye does for free"
      >
        <p>
          Some visual properties are processed <Term>pre-attentively</Term> — automatically, in a
          fraction of a second, before conscious attention engages. A single red dot in a field of
          grey ones "pops out"; you don't search for it, you just see it. These pre-attentive
          attributes include <strong>colour (hue), size, orientation, position, and shape</strong>.
        </p>
        <p>
          This is the most powerful lever in visualisation, because it's effectively free attention.
          Encode the thing you want noticed in a pre-attentive attribute and the reader notices it
          instantly. The flip side is the warning: if <em>everything</em> is bold and colourful,
          nothing pops — you've spent the budget on noise. Pre-attentive emphasis only works when
          it's <strong>scarce</strong>.
        </p>
      </KSection>

      <KSection id="ranking" eyebrow="03" title="The accuracy ladder">
        <p>
          Not all ways of encoding a number are equally readable. Cleveland and McGill ran the
          experiments and ranked visual encodings by how <em>accurately</em> people judge the
          underlying quantity. The order, most accurate first:
        </p>
        <RankingFigure
          caption="The Cleveland-McGill ranking. We read position on a common scale most accurately, then length, then angle and slope, then area, then colour and density. Match the most important comparison to the highest-accuracy encoding you can."
          ariaLabel="A ladder ranking encodings from most accurate at top (position on a common scale) down to least accurate (colour and area)."
          rows={[
            { label: "Position on a common scale", eg: "bar / dot / scatter" },
            { label: "Length", eg: "stacked bar" },
            { label: "Angle / slope", eg: "pie / line slope" },
            { label: "Area", eg: "bubble" },
            { label: "Colour / density", eg: "heatmap / choropleth" },
          ]}
          axisLabel="← more accurate · less accurate →"
        />
        <p>
          The practical rule falls straight out:{" "}
          <strong>
            match your most important comparison to the highest-accuracy encoding available.
          </strong>{" "}
          This is the real reason a bar chart usually beats a pie chart — comparing bar{" "}
          <em>lengths/positions</em> is easy and precise, comparing pie <em>angles</em> is hard and
          error-prone. It's not snobbery; it's that one asks more of the reader's eye than the
          other.
        </p>
      </KSection>

      <KSection id="chart" eyebrow="04" title="Choosing the chart: start from the question">
        <p>
          The chart type isn't a style choice — it follows from{" "}
          <em>what question you're answering</em>. A quick map:
        </p>
        <ul>
          <li>
            <strong>Comparison</strong> (which is bigger?) → bar chart, dot plot.
          </li>
          <li>
            <strong>Trend over time</strong> → line chart.
          </li>
          <li>
            <strong>Relationship</strong> (do two variables move together?) → scatter plot.
          </li>
          <li>
            <strong>Distribution</strong> (what's the spread?) → histogram, box plot, density.
          </li>
          <li>
            <strong>Composition</strong> (parts of a whole) → stacked bar; a pie only for a couple
            of slices, and even then reluctantly.
          </li>
        </ul>
        <p>
          Decide the question first, pick the encoding that reads most accurately for it, and only
          then worry about looks. A beautiful chart answering the wrong question is still the wrong
          chart.
        </p>
      </KSection>

      <KSection id="colour" eyebrow="05" title="Colour, done right">
        <p>
          Colour is powerful and easy to misuse. The first rule is to match the{" "}
          <strong>type of colour scale to the type of data</strong>:
        </p>
        <ul>
          <li>
            <Term>Sequential</Term> — light-to-dark of one hue, for ordered/quantitative data (low
            to high). More is darker.
          </li>
          <li>
            <Term>Diverging</Term> — two hues meeting at a neutral midpoint, for data with a
            meaningful centre (above/below zero, above/below target).
          </li>
          <li>
            <Term>Categorical</Term> — distinct hues for unordered groups; keep it to a handful,
            since people can't track many colours at once.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Two non-negotiables. First,{" "}
            <strong>don't use colour to encode precise quantities</strong> when accuracy matters —
            it's near the bottom of the accuracy ladder. Second,{" "}
            <strong>design for colour-blindness</strong>: roughly 1 in 12 men can't distinguish red
            from green, so never rely on red-vs-green alone — use colour-blind-safe palettes (like
            viridis) and back colour up with another channel (labels, position, shape) so the
            message survives in greyscale.
          </p>
        </Callout>
      </KSection>

      <KSection id="honesty" eyebrow="06" title="Chart crimes & honesty">
        <p>
          Because charts are so persuasive, they're easy to use to mislead — sometimes on purpose,
          often by accident. The common offences:
        </p>
        <ul>
          <li>
            <strong>Truncated axes.</strong> Starting a bar chart's y-axis above zero exaggerates
            small differences into dramatic ones. Bars encode length, so they must start at zero.
            (Line charts of an index have more latitude, but label it clearly.)
          </li>
          <li>
            <strong>Dual y-axes.</strong> Two different scales on one chart lets you manufacture a
            "correlation" by sliding the axes until the lines align. Usually best avoided.
          </li>
          <li>
            <strong>3D and decoration.</strong> 3D pie charts and perspective distort the very
            areas/angles they encode. The decoration actively corrupts the data.
          </li>
          <li>
            <strong>Overplotting.</strong> Thousands of points piled into an opaque blob hides the
            density. Use transparency, binning, or sampling so the structure shows.
          </li>
        </ul>
        <p>
          The honest test: would a reader glancing for two seconds come away with the <em>true</em>{" "}
          takeaway? If the visual encoding pushes them toward a wrong conclusion, the chart is lying
          even if every number is correct.
        </p>
      </KSection>

      <KSection id="declutter" eyebrow="07" title="Data-ink & decluttering">
        <p>
          Edward Tufte's enduring idea is the <Term>data-ink ratio</Term>: of all the ink (pixels)
          on a chart, what fraction actually encodes data versus decoration? Maximise it. Every
          gridline, heavy border, background fill, drop shadow, and redundant label is{" "}
          <Term>chart junk</Term> competing with the signal for the reader's attention.
        </p>
        <p>
          Decluttering is mostly subtraction: mute or remove gridlines, drop the chart border, label
          directly instead of via a distant legend, and delete anything that doesn't help the reader
          answer the question. The goal is the opposite of "more impressive" — it's that the data is
          the loudest thing on the page. This connects straight to{" "}
          <Link href="/knowledge/science-communication">communicating clearly</Link>: a decluttered
          chart is a clear sentence, not a busy paragraph.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Charts that brief, not bury">
          <p>
            As an analyst, most of what I produce ends in front of a decision-maker who has seconds,
            not minutes. That's where perception becomes practical: encode the key comparison as{" "}
            <strong>position or length</strong> (not colour or area), use{" "}
            <strong>pre-attentive emphasis sparingly</strong> to point at the one thing that
            matters, start bar axes at zero, and strip the chart junk so the finding is the loudest
            thing on the slide.
          </p>
          <p>
            It pairs directly with the{" "}
            <Link href="/knowledge/business-intelligence-dashboards">dashboards</Link> and{" "}
            <Link href="/knowledge/science-communication">briefing</Link> sides of the work: the
            dashboard page is the <em>tooling</em>, this is the <em>why</em> behind every chart on
            it — and getting the perception right is what turns a chart from decoration into
            evidence someone can act on without being misled.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A chart borrows the eye's bandwidth — it turns a <strong>cognitive</strong> task into
              a <strong>perceptual</strong> one. Anscombe's quartet: plot it, don't just summarise
              it.
            </li>
            <li>
              <strong>Pre-attentive attributes</strong> (colour, size, position) are noticed
              instantly — powerful, but only if used <strong>scarcely</strong>.
            </li>
            <li>
              <strong>Accuracy ladder</strong> (Cleveland-McGill): position &gt; length &gt; angle
              &gt; area &gt; colour. Match the key comparison to the highest encoding — why bars
              beat pies.
            </li>
            <li>
              <strong>Start from the question</strong>: comparison→bar, trend→line,
              relationship→scatter, distribution→histogram/box, composition→stacked bar.
            </li>
            <li>
              <strong>Colour</strong>: sequential / diverging / categorical to match the data; never
              red-green only; design colour-blind-safe. Don't encode precise quantities in colour.
            </li>
            <li>
              Honesty: <strong>bars start at zero</strong>, avoid dual axes &amp; 3D, fix
              overplotting. Maximise <strong>data-ink</strong>, cut chart junk.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The encoding ranking (Cleveland-McGill), pre-attentive processing, and
          colour-accessibility guidance reflect current data-visualisation and perception references
          alongside coursework.
        </p>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        可视化常被当作最后那个好看的步骤——做一张图、把颜色弄整齐、发布。这严重低估了它。一张做得好的
        图表，让读者<strong>一眼就看见</strong>
        一个模式、一处缺口或一个离群点——而那要用好几段话来描述、
        用一张表来藏起来。它之所以有效，是因为人的视觉系统是一个大规模并行的模式发现器，而一张好图表
        把活儿交给它。一张坏图表则与它作对。
      </p>
      <p>
        所以思考可视化的正确方式不是美学——而是<strong>感知</strong>
        。一旦你知道眼睛自动做什么、它准确
        判断什么、它会弄错什么，好图表的规则就不再是任意的品味，而变成接近工程的东西。这是本页的贯穿线。
      </p>

      <KSection id="why" eyebrow="01" title="我们为什么画数据">
        <p>
          眼睛与视觉皮层并行地、前意识地处理巨量的信息——远多于我们用来读数字的那条缓慢、串行的通道。
          一张一千行的表是一千次串行的读取；同样的数据作为一张散点图则是一瞥。可视化把一个
          <em>认知</em>
          任务（计算、比较、记忆）转换成一个<em>感知</em>
          任务（看、见），而感知是更快、带宽更高的系统。
        </p>
        <p>
          著名的演示是 <Term>Anscombe 四重奏</Term>
          ：四个数据集，均值、方差与相关几乎完全相同，画出来
          却截然不同——一个线性、一个弯曲、一个被单个离群点拽着一条线。汇总统计藏起了一张图所揭示的
          东西。这一句话道尽了可视化的理由：图画承载着数字压平掉的结构。
        </p>
      </KSection>

      <KSection id="preattentive" eyebrow="02" title="前注意处理：眼睛免费做的事">
        <p>
          有些视觉属性是<Term>前注意地</Term>被处理的——自动地、在几分之一秒内、在有意识的注意介入
          之前。一片灰点中的一个红点会「跳出来」；你不去搜寻它，你就是看见了它。这些前注意属性包括
          <strong>颜色（色相）、大小、朝向、位置与形状</strong>。
        </p>
        <p>
          这是可视化中最强大的杠杆，因为它实际上是免费的注意力。把你想让人注意的东西编码进一个前注意
          属性，读者就会即刻注意到它。反面是个警告：如果<em>一切</em>
          都加粗、都彩色，就什么都跳不出来—— 你把预算花在了噪声上。前注意的强调只有在它
          <strong>稀缺</strong>时才奏效。
        </p>
      </KSection>

      <KSection id="ranking" eyebrow="03" title="准确度的阶梯">
        <p>
          并非所有编码一个数字的方式都同样可读。Cleveland 与 McGill 做了实验，按人们判断底层数量有多
          <em>准确</em>，给视觉编码排了序。顺序，最准确的在前：
        </p>
        <RankingFigure
          caption="Cleveland-McGill 排序。我们最准确地读取共同标度上的位置，然后是长度，然后是角度与斜率，然后是面积，然后是颜色与密度。把最重要的比较匹配到你能用的最高准确度的编码上。"
          ariaLabel="一架阶梯，把编码从顶部最准确的（共同标度上的位置）排到底部最不准确的（颜色与面积）。"
          rows={[
            { label: "共同标度上的位置", eg: "条形 / 点 / 散点" },
            { label: "长度", eg: "堆叠条形" },
            { label: "角度 / 斜率", eg: "饼图 / 折线斜率" },
            { label: "面积", eg: "气泡" },
            { label: "颜色 / 密度", eg: "热力图 / 等值区域图" },
          ]}
          axisLabel="← 更准确 · 更不准确 →"
        />
        <p>
          实用的规则直接落出来：<strong>把你最重要的比较匹配到可用的最高准确度的编码上。</strong>
          这正是 条形图通常胜过饼图的真正原因——比较条形的<em>长度/位置</em>容易而精确，比较饼图的
          <em>角度</em>
          则困难而易错。这不是势利；而是其中一个比另一个对读者的眼睛要求更多。
        </p>
      </KSection>

      <KSection id="chart" eyebrow="04" title="选择图表：从问题出发">
        <p>
          图表类型不是一个风格选择——它由<em>你在回答什么问题</em>而定。一张速查图：
        </p>
        <ul>
          <li>
            <strong>比较</strong>（哪个更大？）→ 条形图、点图。
          </li>
          <li>
            <strong>随时间的趋势</strong> → 折线图。
          </li>
          <li>
            <strong>关系</strong>（两个变量是否一起变动？）→ 散点图。
          </li>
          <li>
            <strong>分布</strong>（散布如何？）→ 直方图、箱线图、密度图。
          </li>
          <li>
            <strong>构成</strong>（整体的各部分）→
            堆叠条形；饼图只用于寥寥几块，而且即便如此也是勉强。
          </li>
        </ul>
        <p>
          先定问题，挑出对它读起来最准确的编码，然后才去操心外观。一张回答了错误问题的漂亮图表，仍然是
          错误的图表。
        </p>
      </KSection>

      <KSection id="colour" eyebrow="05" title="把颜色用对">
        <p>
          颜色强大，也容易误用。第一条规则是把<strong>颜色标度的类型与数据的类型相匹配</strong>：
        </p>
        <ul>
          <li>
            <Term>顺序型</Term>——单一色相由浅到深，用于有序/定量数据（从低到高）。越多越深。
          </li>
          <li>
            <Term>发散型</Term>
            ——两种色相在一个中性中点相遇，用于有一个有意义中心的数据（高于/低于零、
            高于/低于目标）。
          </li>
          <li>
            <Term>类别型</Term>
            ——为无序的组用不同的色相；保持在寥寥几个，因为人一次追踪不了很多颜色。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            两条没有商量余地。第一，当准确度要紧时，<strong>不要用颜色来编码精确的数量</strong>——它
            接近准确度阶梯的底部。第二，<strong>为色盲而设计</strong>：大约每 12 个男性中就有 1
            个无法 区分红与绿，所以绝不要单靠红对绿——使用色盲安全的调色板（如
            viridis），并用另一条通道 （标签、位置、形状）为颜色兜底，好让讯息在灰度下也能存活。
          </p>
        </Callout>
      </KSection>

      <KSection id="honesty" eyebrow="06" title="图表犯罪与诚实">
        <p>因为图表如此有说服力，它们很容易被用来误导——有时是故意，常常是无心。常见的罪行：</p>
        <ul>
          <li>
            <strong>截断的坐标轴。</strong>让一张条形图的 y
            轴从零以上开始，会把小差异夸大成戏剧性的。
            条形编码的是长度，所以它们必须从零开始。（一个指数的折线图有更多余地，但要标清楚。）
          </li>
          <li>
            <strong>双 y 轴。</strong>
            一张图上两个不同的标度，让你能通过滑动坐标轴直到两条线对齐来制造
            一个「相关」。通常最好避开。
          </li>
          <li>
            <strong>3D 与装饰。</strong>3D
            饼图与透视扭曲了它们所编码的那些面积/角度。装饰主动地腐蚀了 数据。
          </li>
          <li>
            <strong>过度绘制。</strong>
            成千上万的点堆成一个不透明的团，藏起了密度。使用透明度、分箱或 抽样，好让结构显现。
          </li>
        </ul>
        <p>
          诚实的检验：一个瞥两秒的读者，会带走<em>真正的</em>
          要点吗？如果视觉编码把他们推向一个错误的 结论，那么即便每个数字都正确，这张图表也在撒谎。
        </p>
      </KSection>

      <KSection id="declutter" eyebrow="07" title="数据墨水与去杂">
        <p>
          Edward Tufte 经久不衰的想法是<Term>数据墨水比</Term>：一张图表上所有的墨水（像素）中，真正
          编码数据、而非装饰的占多少？把它最大化。每一条网格线、厚重的边框、背景填充、投影与多余的
          标签，都是<Term>图表垃圾</Term>，在与信号争夺读者的注意力。
        </p>
        <p>
          去杂大多是减法：弱化或移除网格线、去掉图表边框、直接标注而非通过一个遥远的图例，并删掉任何
          无助于读者回答问题的东西。目标与「更唬人」相反——是让数据成为页面上最响亮的东西。这直接连到
          <Link href="/knowledge/science-communication">清晰地传达</Link>
          ：一张去过杂的图表是一句清楚的 话，而非一个繁忙的段落。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="用来汇报、而非埋没的图表">
          <p>
            作为一名分析师，我产出的大多数东西，最终都摆在一个只有几秒、而非几分钟的决策者面前。那正是
            感知变得实用之处：把关键的比较编码为<strong>位置或长度</strong>
            （而非颜色或面积），节制地 使用<strong>前注意的强调</strong>
            去指向那一件要紧的事，让条形的坐标轴从零开始，并剥掉图表
            垃圾，好让发现成为幻灯片上最响亮的东西。
          </p>
          <p>
            它与工作中<Link href="/knowledge/business-intelligence-dashboards">仪表板</Link>和
            <Link href="/knowledge/science-communication">汇报</Link>的两面直接成对：仪表板页是
            <em>工具</em>，这一页是其上每一张图表背后的<em>为什么</em>——而把感知做对，正是把一张图表
            从装饰变成「某人能据以行动而不被误导」的证据的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一张图表借用眼睛的带宽——它把一个<strong>认知</strong>任务变成一个<strong>感知</strong>
              任务。Anscombe 四重奏：画出来，别只是汇总它。
            </li>
            <li>
              <strong>前注意属性</strong>（颜色、大小、位置）会被即刻注意到——强大，但只有在
              <strong>稀缺</strong>使用时。
            </li>
            <li>
              <strong>准确度阶梯</strong>（Cleveland-McGill）：位置 &gt; 长度 &gt; 角度 &gt; 面积
              &gt; 颜色。把关键比较匹配到最高的编码——这就是条形胜过饼图的原因。
            </li>
            <li>
              <strong>从问题出发</strong>：比较→条形，趋势→折线，关系→散点，分布→直方图/箱线，构成→
              堆叠条形。
            </li>
            <li>
              <strong>颜色</strong>：用顺序 / 发散 /
              类别来匹配数据；绝不只用红绿；为色盲安全而设计。别 把精确的数量编码进颜色。
            </li>
            <li>
              诚实：<strong>条形从零开始</strong>，避开双轴与 3D，修好过度绘制。最大化
              <strong>数据墨水</strong>，砍掉图表垃圾。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          编码排序（Cleveland-McGill）、前注意处理与颜色无障碍指引，反映了当前的数据可视化与感知参考
          文献，以及课程学习。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Data Visualisation & Perception",
    subtitle:
      "A good chart isn't decoration — it's a way of borrowing the eye's enormous bandwidth to do statistics for free. But that only works if you respect how human perception actually reads a picture.",
    description:
      "A thorough, practical explainer of data visualisation grounded in perception — why we visualise, pre-attentive attributes, the Cleveland-McGill ranking of visual encodings by accuracy, choosing the right chart for the question, using colour correctly (sequential/diverging/categorical and colour-blind safety), chart crimes and honest axes, and Tufte's data-ink principle. Foundation tier, anchored to Rin Huang's analyst and science-communication work.",
    course: "Data Visualisation & the Perception of Data",
    courseCode: "Foundation · seeing the data",
    level: "Foundation",
    learned: "Data science · UniMelb",
    applied: "Every chart I ship",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Why we draw data" },
      { id: "preattentive", label: "Pre-attentive processing" },
      { id: "ranking", label: "The accuracy ladder" },
      { id: "chart", label: "Choosing the chart" },
      { id: "colour", label: "Colour, done right" },
      { id: "honesty", label: "Chart crimes & honesty" },
      { id: "declutter", label: "Data-ink & decluttering" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "Applied Data Science" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据可视化与感知",
    subtitle:
      "一张好图表不是装饰——它是一种借用眼睛巨大带宽、免费做统计的方式。但这只有在你尊重人的感知究竟如何读一幅画时才奏效。",
    description:
      "对植根于感知的数据可视化的详尽、实用讲解——我们为什么可视化、前注意属性、Cleveland-McGill 对视觉编码按准确度的排序、为问题选对图表、正确地用颜色（顺序/发散/类别与色盲安全）、图表犯罪与诚实的坐标轴，以及 Tufte 的数据墨水原则。基础层，锚定 Rin Huang 的分析师与科学传播工作。",
    course: "数据可视化与数据的感知",
    courseCode: "基础 · 看见数据",
    level: "基础",
    learned: "数据科学 · 墨尔本大学",
    applied: "我交付的每一张图表",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "我们为什么画数据" },
      { id: "preattentive", label: "前注意处理" },
      { id: "ranking", label: "准确度的阶梯" },
      { id: "chart", label: "选择图表" },
      { id: "colour", label: "把颜色用对" },
      { id: "honesty", label: "图表犯罪与诚实" },
      { id: "declutter", label: "数据墨水与去杂" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "应用数据科学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "data-visualisation", updated: "2026-06-26", ...meta, Body };
}
