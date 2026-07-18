import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/spatial-statistics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (Moran's I + inline TeX) is identical across locales; prose, captions, section
 * labels, and the clustered/random figure's two text labels are localised. The
 * 4×4 grid geometry + fill pattern is internal; "I" is kept as a symbol.
 */

function MoranFigure({ caption, ariaLabel, clusteredLabel, randomLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text x="100" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {clusteredLabel}
        </text>
        <text
          x="340"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {randomLabel}
        </text>
        {/* clustered grid: filled top-left block */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const filled = r < 2 && c < 2;
            return (
              <rect
                key={`cl${r}${c}`}
                x={30 + c * 34}
                y={26 + r * 26}
                width="30"
                height="22"
                rx="2"
                fill={filled ? "#FF3C3C" : "none"}
                opacity={filled ? 0.75 : 1}
                stroke={filled ? "#FF3C3C" : "currentColor"}
                strokeWidth="1"
              />
            );
          })
        )}
        {/* random grid: scattered fills */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const filled = (r * 4 + c) % 3 === 0 && !(r === 3 && c === 3);
            return (
              <rect
                key={`rn${r}${c}`}
                x={270 + c * 34}
                y={26 + r * 26}
                width="30"
                height="22"
                rx="2"
                fill={filled ? "currentColor" : "none"}
                opacity={filled ? 0.55 : 1}
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Give data a location and something subtle happens: the standard statistical toolkit quietly
        stops being valid. Most methods assume your observations are <strong>independent</strong> —
        but places near each other are emphatically <em>not</em> independent. Adjacent suburbs have
        similar incomes, neighbouring regions similar weather, nearby areas similar crime rates.{" "}
        <Term>Spatial statistics</Term> is the branch built for data where geography matters, and
        its whole purpose is to take that spatial dependence seriously rather than pretend it away.
      </p>
      <p>
        It's distinct from the <Link href="/knowledge/geospatial-analysis">GIS</Link> page — that
        one is the tools for handling spatial data; this is the <em>inferential statistics</em> of
        location: how to measure spatial pattern, test whether a cluster is real, and predict across
        space. This page is the core ideas, and the recurring theme is that ignoring "where"
        produces confident, wrong answers.
      </p>

      <KSection id="why" eyebrow="01" title="Why geography breaks the rules">
        <p>
          Nearly every method in <Link href="/knowledge/statistics">classical statistics</Link>{" "}
          rests on an assumption of <strong>independent observations</strong> — that knowing one
          data point tells you nothing about the next. Spatial data violates this flagrantly:
          knowing one suburb's value tells you a lot about its neighbours'. This{" "}
          <Term>spatial autocorrelation</Term> means your effective sample size is smaller than it
          looks (nearby points carry redundant information), so ordinary analyses report{" "}
          <strong>over-confident</strong> results — significance that isn't there, correlations
          inflated by shared location.
        </p>
        <p>
          So spatial statistics does two things: it <em>measures</em> the spatial dependence (is
          there a pattern, and where?), and it <em>accounts</em> for it in models so the conclusions
          stay honest. Both start from one foundational idea.
        </p>
      </KSection>

      <KSection id="law" eyebrow="02" title="The first law of geography">
        <p>
          Tobler's <Term>first law of geography</Term> states it plainly:{" "}
          <em>
            "everything is related to everything else, but near things are more related than distant
            things."
          </em>{" "}
          That's the engine of the whole field. Spatial autocorrelation can be{" "}
          <strong>positive</strong> (the usual case — similar values cluster together, like wealth
          or temperature) or, more rarely, <strong>negative</strong> (high values systematically
          next to low ones, like a checkerboard). The goal of the measures below is to detect and
          quantify which is happening, and where — turning a vague impression of "that looks
          clustered" into a testable claim.
        </p>
      </KSection>

      <KSection id="neighbours" eyebrow="03" title="Defining 'neighbours'">
        <p>
          Before you can measure spatial relationships, you must formalise what counts as "near."
          That's the <Term>spatial weights matrix</Term> — for every pair of locations, a weight
          saying how connected they are. The common choices: <em>contiguity</em> (regions that share
          a border are neighbours), <em>distance</em> (everything within k kilometres), or{" "}
          <em>k-nearest</em> (each area's closest k others).
        </p>
        <Callout type="note">
          <p>
            This sounds like a technicality but it's a genuine modelling decision that shapes every
            result downstream — change the definition of "neighbour" and the measured pattern can
            change. It's the spatial cousin of choosing the neighbourhood in any local method, and
            worth being deliberate about rather than accepting a default.
          </p>
        </Callout>
      </KSection>

      <KSection id="moran" eyebrow="04" title="Measuring clustering: Moran's I">
        <p>
          The standard global measure of spatial autocorrelation is <Term>Moran's I</Term>. It's
          essentially a <Link href="/knowledge/statistics">correlation</Link> coefficient for space:
          it asks whether a location's value tends to match its neighbours' values, across the whole
          map.
        </p>
        <Formula label="Moran's I equals N over the sum of weights, times the sum over all pairs i, j of the weight times the deviation of x-i from the mean times the deviation of x-j from the mean, divided by the sum of squared deviations.">
          {String.raw`I = \frac{N}{\sum_{i}\sum_{j} w_{ij}} \cdot \frac{\sum_{i}\sum_{j} w_{ij}\,(x_i - \bar{x})(x_j - \bar{x})}{\sum_{i} (x_i - \bar{x})^2}`}
        </Formula>
        <p>
          You don't need to memorise the formula — read its behaviour. Moran's I runs roughly from
          −1 to +1: a value <strong>well above 0</strong> means positive autocorrelation (clustering
          — similar values near each other), <strong>near 0</strong> means a random spatial pattern,
          and <strong>below 0</strong> means dispersion. Crucially you test it for significance
          (against the null of a random arrangement), so you can say whether an apparent cluster is
          real or could easily be chance — the difference between spotting a genuine pattern and
          seeing faces in clouds.
        </p>
        <MoranFigure
          caption="What Moran's I detects. Left: clustered — high values (filled) sit together, high I, positive autocorrelation. Right: random — no spatial structure, I near zero. The statistic, with a significance test, tells these apart instead of relying on the eye."
          ariaLabel="Left grid with filled cells clustered in one corner; right grid with filled cells scattered randomly."
          clusteredLabel="clustered · high I"
          randomLabel="random · I ≈ 0"
        />
      </KSection>

      <KSection id="lisa" eyebrow="05" title="Finding hotspots: LISA">
        <p>
          Moran's I gives one number for the <em>whole</em> map — but usually the interesting
          question is <strong>where</strong> the clusters are. <Term>LISA</Term> (Local Indicators
          of Spatial Association) decomposes the global statistic into a value for each location,
          revealing the local structure. It classifies each area as part of a:
        </p>
        <ul>
          <li>
            <Term>High-High</Term> cluster — a high value surrounded by high values: a genuine{" "}
            <strong>hotspot</strong>.
          </li>
          <li>
            <Term>Low-Low</Term> cluster — a coldspot (low among low).
          </li>
          <li>
            <Term>High-Low / Low-High</Term> — spatial <strong>outliers</strong>: a value that bucks
            its surroundings (a high-crime pocket in a safe region), often the most interesting
            cases of all.
          </li>
        </ul>
        <p>
          This is the workhorse of hotspot analysis — finding the statistically significant
          concentrations, not just the eye-catching ones, which is exactly what you need before
          acting on "where is the problem worst?"
        </p>
      </KSection>

      <KSection id="regression" eyebrow="06" title="Spatial regression: honest models">
        <p>
          When you model a spatial outcome (does income predict health across regions?), ordinary{" "}
          <Link href="/knowledge/linear-statistical-models">regression</Link> is invalid if the
          residuals are spatially autocorrelated — the independence assumption is broken, and the
          standard errors lie. <Term>Spatial regression</Term> fixes this by building the spatial
          structure into the model:
        </p>
        <ul>
          <li>
            <Term>Spatial lag</Term> models — include neighbours' outcome values as a predictor,
            capturing genuine spillover (a region's value is shaped by its neighbours').
          </li>
          <li>
            <Term>Spatial error</Term> models — account for spatially correlated unobserved factors
            in the error term, so the inference stays honest.
          </li>
        </ul>
        <p>
          Either way, the point is the same as the{" "}
          <Link href="/knowledge/causal-inference">causal</Link> discipline elsewhere: respect the
          data's structure or your confidence is fake.
        </p>
      </KSection>

      <KSection id="kriging" eyebrow="07" title="Predicting between points: kriging">
        <p>
          The last big tool is spatial <em>prediction</em>. You've measured a value at scattered
          locations (rainfall at weather stations, a pollutant at sample sites) and want to estimate
          it <em>everywhere in between</em>. <Term>Kriging</Term> does this, and it's smarter than
          naive interpolation: it uses the <em>measured</em> spatial autocorrelation structure — how
          quickly similarity decays with distance — to make the statistically optimal prediction at
          each unsampled point, complete with an uncertainty estimate.
        </p>
        <p>
          It's the spatial sibling of the forecasting ideas on the{" "}
          <Link href="/knowledge/time-series-analysis">time-series</Link> page (interpolating across
          space rather than extrapolating through time), and it's how you turn a handful of sample
          points into a continuous, honest surface — with the crucial caveat that the uncertainty
          grows the further you are from any real measurement.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Real hotspots, not mirages">
          <p>
            Plenty of government analysis is inescapably spatial — incidents, regional patterns,
            where to direct resources — and the single most valuable thing this discipline gives me
            is the difference between a <strong>statistically significant hotspot</strong> and an
            eye-catching cluster that's just noise. <strong>Moran's I</strong> tests whether there's
            real spatial structure at all, and <strong>LISA</strong> pins down <em>where</em> the
            genuine hotspots (and the telling outliers) are — which is what you need before acting
            on "where is it worst?"
          </p>
          <p>
            It also keeps the modelling honest: treating spatially-dependent data as if it were
            independent produces <strong>over-confident</strong> conclusions, so{" "}
            <strong>spatial regression</strong> is what stops a regional analysis from overstating
            its certainty — the same respect-the-structure lesson as{" "}
            <Link href="/knowledge/causal-inference">causal inference</Link>. It complements the{" "}
            <Link href="/knowledge/geospatial-analysis">GIS</Link> page (tools vs inference) and
            shares the MAUP caution about how the choice of areal units shapes everything.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Spatial data breaks the <strong>independence assumption</strong> — nearby places are
              related (<strong>spatial autocorrelation</strong>), so naive stats are{" "}
              <strong>over-confident</strong>.
            </li>
            <li>
              <strong>Tobler's first law</strong>: near things are more related than distant things.
              Positive autocorrelation (clustering) is the common case.
            </li>
            <li>
              Define <strong>neighbours</strong> via a <strong>spatial weights matrix</strong>{" "}
              (contiguity / distance / k-nearest) — a real modelling choice.
            </li>
            <li>
              <strong>Moran's I</strong> = a correlation for space (well above 0 = clustering; ≈0 =
              random), tested for significance. <strong>LISA</strong> finds <em>where</em> —
              High-High hotspots, Low-Low coldspots, and outliers.
            </li>
            <li>
              <strong>Spatial regression</strong> (lag/error models) builds the structure in so
              inference stays honest. <strong>Kriging</strong> predicts between sampled points using
              the autocorrelation, with uncertainty.
            </li>
            <li>
              The throughline: respect "where" or get confident, wrong answers (and mind the MAUP).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Tobler's law, the Moran's I / LISA hotspot framing, spatial weights, and kriging reflect
          current spatial-statistics references alongside statistics coursework.
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
        给数据一个位置，某种微妙的事就会发生：标准的统计工具箱悄悄不再有效。大多数方法假设你的观测是
        <strong>独立的</strong>——但彼此邻近的地方明确地<em>不</em>
        独立。相邻的街区收入相似，相邻的地区天气 相似，邻近的区域犯罪率相似。<Term>空间统计</Term>
        是为地理要紧的数据而建的分支，它的全部目的，是认真 对待那种空间依赖，而非假装它不存在。
      </p>
      <p>
        它与 <Link href="/knowledge/geospatial-analysis">GIS</Link>{" "}
        页不同——那一页是处理空间数据的工具；这 一页是位置的<em>推断统计学</em>
        ：如何度量空间模式、检验一个聚集是否真实，以及在空间上做预测。这一页
        讲核心的想法，而反复出现的主题是：忽略「在哪里」会产出自信而错误的答案。
      </p>

      <KSection id="why" eyebrow="01" title="为什么地理打破规则">
        <p>
          <Link href="/knowledge/statistics">经典统计</Link>里几乎每一种方法，都建立在
          <strong>独立观测</strong>
          的假设之上——知道一个数据点，告诉不了你关于下一个的任何东西。空间数据公然违反这一点：知道
          一个街区的值，告诉你很多关于它邻居的事。这种<Term>空间自相关</Term>
          意味着你的有效样本量比它看上去 的要小（邻近的点携带冗余的信息），所以普通的分析报告
          <strong>过度自信</strong>的结果——并不存在的 显著性、被共同位置吹胀的相关。
        </p>
        <p>
          所以空间统计做两件事：它<em>度量</em>空间依赖（有没有模式，在哪里？），并在模型里
          <em>考虑</em>它， 好让结论保持诚实。两者都从一个奠基性的想法出发。
        </p>
      </KSection>

      <KSection id="law" eyebrow="02" title="地理学第一定律">
        <p>
          托布勒的<Term>地理学第一定律</Term>把它说得很直白：
          <em>「万物彼此相关，但近的东西比远的东西更 相关。」</em>
          那是整个领域的引擎。空间自相关可以是<strong>正的</strong>（常见情形——相似的值聚在
          一起，比如财富或温度），或者更罕见地，<strong>负的</strong>
          （高值系统性地紧挨着低值，像一张
          棋盘）。下面这些度量的目标，是检测并量化正在发生的是哪一种、以及在哪里——把「那看起来很聚集」一个
          模糊的印象，变成一个可检验的论断。
        </p>
      </KSection>

      <KSection id="neighbours" eyebrow="03" title="定义「邻居」">
        <p>
          在你能度量空间关系之前，你必须把什么算作「近」形式化。那就是<Term>空间权重矩阵</Term>
          ——对每一对 位置，一个说明它们有多连通的权重。常见的选择：<em>邻接</em>
          （共享一条边界的地区是邻居）、
          <em>距离</em>（k 公里之内的一切），或 <em>k-最近</em>（每个区域最近的 k 个其他区域）。
        </p>
        <Callout type="note">
          <p>
            这听起来像个技术细节，但它是一个真正的建模决定，塑造着下游的每一个结果——改变「邻居」的定义，被
            度量出的模式就可能改变。它是任何局部方法里「选择邻域」的空间表亲，值得刻意斟酌，而非接受一个
            默认值。
          </p>
        </Callout>
      </KSection>

      <KSection id="moran" eyebrow="04" title="度量聚集：Moran's I">
        <p>
          空间自相关的标准全局度量是 <Term>Moran's I</Term>。它本质上是空间的一个
          <Link href="/knowledge/statistics">相关</Link>
          系数：它问一个位置的值是否倾向于与它邻居的值相匹配， 在整张地图上。
        </p>
        <Formula label="Moran's I equals N over the sum of weights, times the sum over all pairs i, j of the weight times the deviation of x-i from the mean times the deviation of x-j from the mean, divided by the sum of squared deviations.">
          {String.raw`I = \frac{N}{\sum_{i}\sum_{j} w_{ij}} \cdot \frac{\sum_{i}\sum_{j} w_{ij}\,(x_i - \bar{x})(x_j - \bar{x})}{\sum_{i} (x_i - \bar{x})^2}`}
        </Formula>
        <p>
          你不需要背公式——读它的行为。Moran's I 大致从 −1 跑到 +1：一个<strong>远高于 0</strong>
          的值意味着正 自相关（聚集——相似的值彼此邻近），<strong>接近 0</strong>
          意味着一个随机的空间模式，而
          <strong>低于 0</strong>
          意味着分散。关键的是，你要检验它的显著性（对照「随机排列」的零假设），这样你
          就能说一个表面的聚集是真实的、还是很容易出于偶然——这正是发现一个真正的模式，与在云里看见人脸之间
          的差别。
        </p>
        <MoranFigure
          caption="Moran's I 检测什么。左：聚集——高值（填充的）坐在一起，I 高，正自相关。右：随机——没有空间结构，I 接近零。这个统计量，配上一个显著性检验，把这两者区分开，而非依赖肉眼。"
          ariaLabel="左边的网格里填充的格子聚在一个角落；右边的网格里填充的格子随机散落。"
          clusteredLabel="聚集 · I 高"
          randomLabel="随机 · I ≈ 0"
        />
      </KSection>

      <KSection id="lisa" eyebrow="05" title="找到热点：LISA">
        <p>
          Moran's I 对<em>整张</em>地图给出一个数字——但通常有趣的问题是聚集<strong>在哪里</strong>。
          <Term>LISA</Term>
          （空间关联局部指标）把这个全局的统计量分解成每个位置的一个值，揭示出局部的结构。
          它把每个区域分类为属于一个：
        </p>
        <ul>
          <li>
            <Term>高—高</Term>聚集——一个被高值包围的高值：一个真正的<strong>热点</strong>。
          </li>
          <li>
            <Term>低—低</Term>聚集——一个冷点（低值之中的低值）。
          </li>
          <li>
            <Term>高—低 / 低—高</Term>——空间<strong>离群值</strong>
            ：一个与其周遭对着干的值（安全地区里 一个高犯罪的口袋），往往是所有情形里最有趣的。
          </li>
        </ul>
        <p>
          这是热点分析的主力——找到统计上显著的集中之处，而不只是抢眼的，这正是你在对「问题在哪里最严重？」
          采取行动之前所需要的。
        </p>
      </KSection>

      <KSection id="regression" eyebrow="06" title="空间回归：诚实的模型">
        <p>
          当你建模一个空间的结果（收入能否预测各地区的健康？）时，如果残差有空间自相关，普通
          <Link href="/knowledge/linear-statistical-models">回归</Link>
          就无效了——独立性假设被打破，标准误在 撒谎。<Term>空间回归</Term>
          通过把空间结构建进模型里来修这个：
        </p>
        <ul>
          <li>
            <Term>空间滞后</Term>
            模型——把邻居的结果值作为一个预测变量纳入，捕捉真正的溢出（一个地区的值被
            它邻居的所塑造）。
          </li>
          <li>
            <Term>空间误差</Term>模型——在误差项里考虑空间相关的未观测因素，好让推断保持诚实。
          </li>
        </ul>
        <p>
          无论哪种方式，要点都与别处的<Link href="/knowledge/causal-inference">因果</Link>
          纪律一样：尊重数据的 结构，否则你的自信是假的。
        </p>
      </KSection>

      <KSection id="kriging" eyebrow="07" title="在点之间预测：克里金">
        <p>
          最后一个大工具是空间<em>预测</em>
          。你在散落的位置上测量了一个值（气象站的降雨、采样点的一种 污染物），想估计它
          <em>在中间的每一处</em>。<Term>克里金</Term>做这件事，而它比朴素的插值更聪明：它 使用
          <em>测量出的</em>
          空间自相关结构——相似性随距离衰减得有多快——在每个未采样的点上做出统计上最优的
          预测，还附带一个不确定性估计。
        </p>
        <p>
          它是<Link href="/knowledge/time-series-analysis">时间序列</Link>
          页上那些预测想法的空间兄弟（在空间上
          插值，而非在时间上外推），也是你把一小撮采样点变成一个连续、诚实的曲面的方式——带着那个关键的告诫：
          你离任何真实的测量越远，不确定性就越大。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="真实的热点，而非海市蜃楼">
          <p>
            大量的政府分析无可逃避地是空间性的——事件、区域模式、把资源往哪里调——而这个学科给我的最有价值的
            一样东西，是一个<strong>统计上显著的热点</strong>，与一个只是噪声的抢眼聚集之间的差别。
            <strong>Moran's I</strong> 检验到底有没有真实的空间结构，而 <strong>LISA</strong>{" "}
            钉住真正的热点 （以及那些说明问题的离群值）<em>在哪里</em>
            ——这正是你在对「它在哪里最严重？」采取行动之前所 需要的。
          </p>
          <p>
            它还让建模保持诚实：把空间依赖的数据当作独立的来处理，会产出<strong>过度自信</strong>
            的结论， 所以<strong>空间回归</strong>是阻止一项区域分析夸大它确定性的东西——与
            <Link href="/knowledge/causal-inference">因果推断</Link>同样的「尊重结构」的教训。它补足
            <Link href="/knowledge/geospatial-analysis">GIS</Link>{" "}
            页（工具对推断），并共享那个关于「面积单元 的选择如何塑造一切」的 MAUP 告诫。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              空间数据打破<strong>独立性假设</strong>——邻近的地方相关（<strong>空间自相关</strong>
              ），所以 朴素的统计<strong>过度自信</strong>。
            </li>
            <li>
              <strong>托布勒第一定律</strong>
              ：近的东西比远的东西更相关。正自相关（聚集）是常见情形。
            </li>
            <li>
              通过<strong>空间权重矩阵</strong>定义<strong>邻居</strong>（邻接 / 距离 /
              k-最近）——一个真正的 建模选择。
            </li>
            <li>
              <strong>Moran's I</strong> = 空间的一个相关（远高于 0 = 聚集；≈0 =
              随机），检验显著性。
              <strong>LISA</strong> 找到<em>在哪里</em>——高—高热点、低—低冷点，以及离群值。
            </li>
            <li>
              <strong>空间回归</strong>（滞后/误差模型）把结构建进去，好让推断保持诚实。
              <strong>克里金</strong>用自相关在采样点之间预测，附带不确定性。
            </li>
            <li>贯穿始终的：尊重「在哪里」，否则得到自信而错误的答案（并留意 MAUP）。</li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          托布勒定律、Moran's I / LISA
          热点框架、空间权重，以及克里金，反映了当前的空间统计参考文献以及 统计学课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Spatial Statistics",
    subtitle:
      "When data has a location, the usual statistics quietly break — because nearby places aren't independent, they're related. Spatial statistics is the toolkit for data where 'where' matters, and it's how you find a real hotspot rather than a mirage.",
    description:
      "A thorough, practical explainer of spatial statistics — Tobler's first law and spatial autocorrelation, why standard independence assumptions fail, spatial weights, Moran's I and LISA hotspot analysis, spatial regression, and kriging interpolation. Advanced tier, distinct from the GIS-tools page, anchored to Rin Huang's government spatial-analysis work.",
    course: "Spatial Statistics",
    courseCode: "Advanced · the statistics of where",
    level: "Master's",
    learned: "Statistics & gov analysis",
    applied: "Hotspots & regional patterns",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Geography breaks the rules" },
      { id: "law", label: "The first law" },
      { id: "neighbours", label: "Defining neighbours" },
      { id: "moran", label: "Measuring clustering" },
      { id: "lisa", label: "Finding hotspots" },
      { id: "regression", label: "Spatial regression" },
      { id: "kriging", label: "Predicting between points" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/geospatial-analysis", label: "Geospatial Analysis & GIS" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "空间统计",
    subtitle:
      "当数据带有位置时，通常的统计学会悄悄失效——因为邻近的地方不是独立的，而是相关的。空间统计是「在哪里」要紧时所用的数据工具箱，也是你找到一个真实热点、而非海市蜃楼的方式。",
    description:
      "对空间统计的详尽、实用讲解——托布勒第一定律与空间自相关、为什么标准的独立性假设失效、空间权重、Moran's I 与 LISA 热点分析、空间回归，以及克里金插值。进阶层，与 GIS 工具页不同，锚定 Rin Huang 的政府空间分析工作。",
    course: "空间统计",
    courseCode: "进阶 · 「在哪里」的统计学",
    level: "硕士",
    learned: "统计学与政府分析",
    applied: "热点与区域模式",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "地理打破规则" },
      { id: "law", label: "第一定律" },
      { id: "neighbours", label: "定义邻居" },
      { id: "moran", label: "度量聚集" },
      { id: "lisa", label: "找到热点" },
      { id: "regression", label: "空间回归" },
      { id: "kriging", label: "在点之间预测" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/geospatial-analysis", label: "地理空间分析与 GIS" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "spatial-statistics", updated: "2026-06-26", ...meta, Body };
}
