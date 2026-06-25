import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/anomaly-detection.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry (point cluster + cut lines) is shared; prose, captions, aria-labels,
 * and the figure's three text labels are localised. No maths.
 */

const CLOUD = [
  [70, 70],
  [90, 60],
  [105, 82],
  [85, 95],
  [120, 70],
  [100, 50],
  [130, 88],
  [115, 100],
  [78, 80],
  [110, 64],
  [95, 74],
  [125, 56],
];

function IsolationFigure({ caption, ariaLabel, normalLabel, anomalyLabel, cutsLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {CLOUD.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.5" />
        ))}
        <text
          x="100"
          y="128"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {normalLabel}
        </text>
        <circle cx="350" cy="56" r="5" fill="#FF3C3C" />
        <text x="350" y="80" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {anomalyLabel}
        </text>
        <line
          x1="300"
          y1="30"
          x2="300"
          y2="110"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <line
          x1="300"
          y1="44"
          x2="400"
          y2="44"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <text
          x="350"
          y="128"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {cutsLabel}
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
        Most analysis is about the typical case — the average, the trend, the pattern.{" "}
        <Term>Anomaly detection</Term> is about the opposite: finding the rare points that{" "}
        <em>don't</em> fit, because in a great many domains the unusual case is the one that
        matters. A fraudulent transaction, a security breach, a sensor about to fail, a record that
        warrants a closer look — they're all needles in a haystack, and the haystack is enormous.
      </p>
      <p>
        It's a discipline I lean on directly in intelligence and integrity work, where the whole job
        is often to surface the few cases worth investigating from a sea of normal ones. This page
        is the practical landscape: what an anomaly is, the methods, and the trade-off that quietly
        decides whether a detector is actually useful.
      </p>

      <KSection id="what" eyebrow="01" title="Finding the unusual">
        <p>
          An <Term>anomaly</Term> (or outlier) is a data point that deviates so much from the rest
          that it likely came from a different process. The premise is that{" "}
          <strong>"different" often means "interesting"</strong> — the deviation is a signal of
          fraud, error, failure, or threat, not just noise. The goal isn't to model the anomalies
          (you usually can't — they're rare and varied); it's to model what <em>normal</em> looks
          like well enough that the abnormal stands out.
        </p>
        <p>
          That framing is the key to the whole field. You learn the shape of "normal" from the bulk
          of the data, then flag whatever falls far outside it. Everything below is a different way
          of defining "far outside".
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="Three kinds of anomaly">
        <p>Anomalies come in three flavours, and the distinction changes the method:</p>
        <ul>
          <li>
            <Term>Point anomalies</Term> — a single value that's extreme on its own (a $1,000,000
            transaction on a normal account). The simplest case.
          </li>
          <li>
            <Term>Contextual anomalies</Term> — a value that's only odd <em>in context</em>. 30°C is
            normal in summer, anomalous in winter; the number is fine, the context isn't. Time and
            place matter.
          </li>
          <li>
            <Term>Collective anomalies</Term> — a <em>group</em> of points that's abnormal together
            even though each is individually fine (a sudden burst of small transactions, a
            coordinated pattern of logins).
          </li>
        </ul>
        <p>
          Knowing which you're hunting for matters: a method that catches point anomalies will sail
          straight past a contextual one. Context and sequence (the{" "}
          <Link href="/knowledge/time-series-analysis">time-series</Link> view) often have to be
          built in deliberately.
        </p>
      </KSection>

      <KSection id="hard" eyebrow="03" title="Why it's hard">
        <p>Three properties make anomaly detection genuinely difficult:</p>
        <ul>
          <li>
            <Term>They're rare</Term> — by definition. Extreme class imbalance means accuracy is
            useless (a detector that flags nothing is 99.9% accurate and 100% worthless), the same{" "}
            <Link href="/knowledge/probability">base-rate</Link> trap from the probability page.
          </li>
          <li>
            <Term>They're usually unlabelled</Term> — you rarely have a clean set of known anomalies
            to learn from, so most of the work is <em>unsupervised</em>: define normal, flag
            deviations.
          </li>
          <li>
            <Term>They evolve</Term> — fraudsters change tactics, systems drift, so today's normal
            isn't tomorrow's. A static detector decays.
          </li>
        </ul>
      </KSection>

      <KSection id="statistical" eyebrow="04" title="Statistical methods">
        <p>
          The simplest detectors are statistical: assume a distribution for "normal" and flag what's
          improbable under it. For roughly bell-shaped data, the <Term>z-score</Term> flags points
          more than a few standard deviations from the mean; for skewed data, the <Term>IQR</Term>{" "}
          rule (points beyond 1.5× the interquartile range) is more robust. These are fast,
          transparent, and a fine first pass.
        </p>
        <Callout type="pitfall">
          <p>
            The catch is they assume a shape and look one feature at a time. A point can be
            perfectly normal on every individual axis yet bizarre in <em>combination</em> — a young
            age and a senior job title are each fine, together unusual. Real anomaly detection is
            multivariate, which is why the distance- and model-based methods below exist. (And the
            usual caveat: <strong>standardise</strong> features first, or distance is dominated by
            the biggest-scaled one.)
          </p>
        </Callout>
      </KSection>

      <KSection id="density" eyebrow="05" title="Distance and density">
        <p>
          A more general idea: an anomaly is a point that sits far from its neighbours, in a
          low-density region. This connects directly to{" "}
          <Link href="/knowledge/clustering">clustering</Link> — anomalies are the points that don't
          belong to any dense group. Two well-used methods:
        </p>
        <ul>
          <li>
            <Term>Local Outlier Factor (LOF)</Term> — compares a point's local density to its
            neighbours'. It's clever because it's <em>local</em>: it can flag a point that's in a
            sparse region even if globally it isn't the most extreme, catching outliers that sit
            between clusters.
          </li>
          <li>
            <Term>DBSCAN</Term> — the density clustering method that labels low-density points as{" "}
            <em>noise</em>; those noise points are your anomalies, found for free.
          </li>
        </ul>
        <p>
          The trade-off: distance-based methods struggle in very high dimensions (the{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">curse of dimensionality</Link> again
          — everything is far from everything), so reducing dimensions first often helps.
        </p>
      </KSection>

      <KSection id="model" eyebrow="06" title="Model-based detection">
        <p>
          The most popular modern approaches learn a model of normal and score deviation from it:
        </p>
        <ul>
          <li>
            <Term>Isolation Forest</Term> — the clever, widely-used default. Instead of modelling
            density, it randomly splits the data and notes that{" "}
            <em>anomalies are easy to isolate</em>: a weird point gets cut off from the rest in just
            a few random splits, while normal points take many. The shorter the path to isolate a
            point, the more anomalous it is. Fast, scales well, and needs little tuning.
          </li>
          <li>
            <Term>Autoencoders</Term> — a{" "}
            <Link href="/knowledge/statistical-machine-learning">neural network</Link> trained to
            compress and reconstruct normal data. Show it an anomaly and it reconstructs it badly
            (it never learned that shape), so a high <em>reconstruction error</em> flags the
            outlier. Powerful for complex, high-dimensional data like images or sequences.
          </li>
        </ul>

        <IsolationFigure
          caption="Isolation Forest's intuition. A normal point sits deep inside the crowd and takes many random cuts to isolate; an anomaly sits alone and is separated in just a few. Fewer cuts to isolate ⇒ more anomalous."
          ariaLabel="A dense cluster of normal points on the left and a single isolated anomaly point on the right, with a few cut lines separating the anomaly quickly."
          normalLabel="normal (many cuts)"
          anomalyLabel="anomaly"
          cutsLabel="isolated in 2 cuts"
        />
      </KSection>

      <KSection id="tradeoff" eyebrow="07" title="The alert-fatigue trade-off">
        <p>
          Here's the trade-off that decides whether a detector is actually useful, and it's the{" "}
          <Link href="/knowledge/statistics">precision/recall</Link> tension from the statistics
          page in its most consequential form. Most detectors have a sensitivity dial (the
          "contamination" or threshold):
        </p>
        <ul>
          <li>
            Turn it up → catch more real anomalies (high recall) but drown in false alarms (low
            precision).
          </li>
          <li>
            Turn it down → fewer false alarms (high precision) but miss real ones (low recall).
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>Alert fatigue is the silent killer of anomaly systems.</strong> A detector that
            cries wolf — flooding analysts with false positives — gets ignored, and then it misses
            the real anomaly because nobody's listening any more. A system with great recall and
            terrible precision is <em>worse</em> than no system, because it burns the trust and the
            time of the people meant to act on it. The fix is rarely a fancier model — it's tuning
            the threshold to what humans can actually triage, and{" "}
            <strong>combining model scores with domain rules</strong> so the alerts that surface are
            the ones worth a person's attention.
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="Judging without labels">
        <p>
          Evaluation is hard precisely because you usually lack labels — if you knew the anomalies,
          you wouldn't need to detect them. In practice you validate on whatever labelled subset you
          have (past confirmed cases), use the{" "}
          <Link href="/knowledge/statistics">precision/recall/F1</Link> family rather than accuracy,
          and lean on domain experts to confirm a sample of what's flagged. Above all, you tune to
          the real cost: in most settings a missed anomaly and a false alarm have very different
          prices, and the threshold should reflect that, not a default.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Surfacing the case worth a look">
          <p>
            In intelligence and integrity work, anomaly detection is often the whole task:{" "}
            <strong>surface the few cases worth investigating</strong> from a large volume of normal
            activity. The discipline on this page is exactly what keeps that useful — model "normal"
            honestly, mind the <strong>base rate</strong> (rare events make accuracy meaningless),
            and above all manage the <strong>alert-fatigue trade-off</strong>, because a flood of
            false positives doesn't just waste analyst time, it gets the whole system switched off.
          </p>
          <p>
            It also stitches together much of this section: the{" "}
            <Link href="/knowledge/probability">base-rate</Link> reasoning, the{" "}
            <Link href="/knowledge/clustering">density</Link> view, the{" "}
            <Link href="/knowledge/statistical-machine-learning">models</Link>, and the{" "}
            <Link href="/knowledge/statistics">precision/recall</Link> honesty — all pointed at the
            same target: finding the signal that doesn't belong, without crying wolf.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Anomaly detection finds rare points that don't fit — and "different" is often
              "important". Model <strong>normal</strong>, flag deviations.
            </li>
            <li>
              Three kinds: <strong>point</strong>, <strong>contextual</strong> (odd for the
              context), <strong>collective</strong> (odd as a group). Hard because anomalies are{" "}
              <strong>rare, unlabelled, and evolving</strong> (base-rate trap).
            </li>
            <li>
              Methods: <strong>statistical</strong> (z-score/IQR, but univariate),{" "}
              <strong>distance/density</strong> (LOF, DBSCAN), <strong>model-based</strong>{" "}
              (isolation forest — fewer cuts to isolate; autoencoders — high reconstruction error).
            </li>
            <li>
              The key trade-off is <strong>precision vs recall</strong> via a sensitivity dial — and{" "}
              <strong>alert fatigue</strong>: too many false positives gets the system ignored.
            </li>
            <li>
              <strong>Combine model scores with domain rules</strong>; tune the threshold to what
              humans can triage and to the real cost of a miss vs a false alarm.
            </li>
            <li>
              Evaluate with <strong>precision/recall/F1</strong> on whatever labels you have, plus
              expert review — never accuracy. <strong>Standardise &amp; reduce dimensions</strong>{" "}
              first.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Method comparisons and the alert-fatigue framing reflect current anomaly-detection
          references (isolation forest / LOF practice, alert-fatigue research) alongside hands-on
          work.
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
        大多数分析关乎典型的情形——平均、趋势、模式。<Term>异常检测</Term>关乎相反的一面：找出那些
        <em>不</em>契合的罕见点，因为在极多的领域里，不寻常的那个案例才是要紧的那个。一笔欺诈交易、
        一次安全入侵、一个即将失效的传感器、一条值得细看的记录——它们都是干草堆里的针，而那干草堆
        大得惊人。
      </p>
      <p>
        这是我在情报与廉政工作中直接倚靠的一门学科，那里整份工作往往就是从一片正常案例的海洋中，
        浮现出那少数几个值得调查的。这一页是实用的全景：异常是什么、有哪些方法，以及那个悄悄决定一个
        检测器是否真正有用的权衡。
      </p>

      <KSection id="what" eyebrow="01" title="找出不寻常之物">
        <p>
          一个<Term>异常</Term>（或离群点）是一个偏离其余如此之远、以至于很可能来自一个不同过程的
          数据点。其前提是<strong>「不同」往往意味着「有意思」</strong>——这种偏离是欺诈、错误、故障
          或威胁的信号，而不只是噪声。目标不是去给异常建模（你通常做不到——它们罕见而多样）；而是把
          <em>正常</em>的样子建模得足够好，好让反常的脱颖而出。
        </p>
        <p>
          那个取景是整个领域的钥匙。你从数据的主体中学得「正常」的形状，然后把任何落在它之外很远的
          标记出来。下面的一切，都是定义「之外很远」的不同方式。
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="三种异常">
        <p>异常有三种风味，而其区分会改变方法：</p>
        <ul>
          <li>
            <Term>点异常</Term>——单独看就极端的一个值（一个正常账户上一笔 100 万美元的交易）。最
            简单的情形。
          </li>
          <li>
            <Term>上下文异常</Term>——一个只在<em>语境中</em>才反常的值。30°C 在夏天是正常的，在冬天
            则是异常的；数字没问题，语境有问题。时间与地点要紧。
          </li>
          <li>
            <Term>集体异常</Term>——一<em>组</em>点合在一起是反常的，尽管单看每一个都没问题（一阵
            突然爆发的小额交易、一组协同的登录模式）。
          </li>
        </ul>
        <p>
          知道你在猎哪一种很要紧：一个能抓住点异常的方法，会径直从一个上下文异常旁掠过。语境与顺序
          （<Link href="/knowledge/time-series-analysis">时间序列</Link>的视角）往往需要刻意地内建
          进去。
        </p>
      </KSection>

      <KSection id="hard" eyebrow="03" title="为什么它难">
        <p>三个性质让异常检测真正地难：</p>
        <ul>
          <li>
            <Term>它们罕见</Term>——按定义如此。极端的类别不平衡意味着准确率毫无用处（一个什么都不
            标记的检测器有 99.9% 的准确率、却 100% 没用），正是
            <Link href="/knowledge/probability">概率 页</Link>上同样的基率陷阱。
          </li>
          <li>
            <Term>它们通常无标签</Term>——你很少有一套干净的、已知的异常可供学习，所以大部分工作是
            <em>无监督</em>的：定义正常，标记偏离。
          </li>
          <li>
            <Term>它们会演变</Term>——欺诈者改变战术、系统漂移，所以今天的正常不是明天的正常。一个
            静态的检测器会衰减。
          </li>
        </ul>
      </KSection>

      <KSection id="statistical" eyebrow="04" title="统计方法">
        <p>
          最简单的检测器是统计性的：为「正常」假设一个分布，再标记在它之下不可能的东西。对大致呈
          钟形的数据，<Term>z 分数</Term>标记那些距均值超过若干标准差的点；对偏斜的数据，
          <Term>IQR</Term> 规则（超出四分位距 1.5 倍的点）更稳健。它们快、透明，是不错的第一遍。
        </p>
        <Callout type="pitfall">
          <p>
            难处在于它们假设一个形状、且一次只看一个特征。一个点可以在每一根单独的轴上都完全正常，
            合在一起却很离奇——年纪轻与一个高级职衔各自都没问题，凑在一起就不寻常。真正的异常检测是
            多元的，这就是为什么下面那些基于距离与基于模型的方法存在。（还有那条惯常的告诫：先
            <strong>标准化</strong>特征，否则距离会被尺度最大的那个主导。）
          </p>
        </Callout>
      </KSection>

      <KSection id="density" eyebrow="05" title="距离与密度">
        <p>
          一个更一般的想法：一个异常是一个坐落在远离其邻居、处于低密度区域的点。这直接连到
          <Link href="/knowledge/clustering">聚类</Link>——异常就是那些不属于任何稠密群组的点。两个
          常用的方法：
        </p>
        <ul>
          <li>
            <Term>局部离群因子（LOF）</Term>——把一个点的局部密度与其邻居的相比较。它聪明在于它是
            <em>局部</em>的：它能标记一个处于稀疏区域的点，即便从全局看它并非最极端的，从而抓住那些
            坐落在簇与簇之间的离群点。
          </li>
          <li>
            <Term>DBSCAN</Term>——那个把低密度点标记为<em>噪声</em>的密度聚类方法；那些噪声点就是你的
            异常，白捡到的。
          </li>
        </ul>
        <p>
          权衡在于：基于距离的方法在极高维中会吃力（又是
          <Link href="/knowledge/pca-dimensionality-reduction">维度 灾难</Link>
          ——万物都远离万物），所以先降维往往有帮助。
        </p>
      </KSection>

      <KSection id="model" eyebrow="06" title="基于模型的检测">
        <p>最流行的现代方法学得一个「正常」的模型，并为偏离它的程度打分：</p>
        <ul>
          <li>
            <Term>孤立森林</Term>
            ——那个聪明、被广泛使用的默认。它不去给密度建模，而是随机地切分数据， 并注意到
            <em>异常容易被孤立</em>：一个怪点只需几次随机切分就被从其余之中切出来，而正常点要
            许多次。把一个点孤立出来的路径越短，它就越异常。快、可扩展，且几乎不用调参。
          </li>
          <li>
            <Term>自编码器</Term>——一个被训练来压缩并重建正常数据的
            <Link href="/knowledge/statistical-machine-learning">神经网络</Link>。给它看一个异常，它
            重建得很糟（它从未学过那个形状），于是一个高的<em>重建误差</em>标出那个离群点。对图像或
            序列这类复杂、高维的数据很强大。
          </li>
        </ul>

        <IsolationFigure
          caption="孤立森林的直觉。一个正常点深处于人群之中，需要许多次随机切分才能被孤立；一个异常独自坐着，只需几次就被分开。孤立所需的切分越少 ⇒ 越异常。"
          ariaLabel="左边是一团稠密的正常点，右边是一个孤立的异常点，几条切分线很快把那个异常分开。"
          normalLabel="正常（许多次切分）"
          anomalyLabel="异常"
          cutsLabel="2 次切分即被孤立"
        />
      </KSection>

      <KSection id="tradeoff" eyebrow="07" title="告警疲劳的权衡">
        <p>
          这是决定一个检测器是否真正有用的权衡，它是<Link href="/knowledge/statistics">统计页</Link>
          上 精确率/召回率张力最具后果的形态。大多数检测器都有一个灵敏度旋钮（「污染率」或阈值）：
        </p>
        <ul>
          <li>调高 → 抓住更多真实的异常（高召回），却被假警报淹没（低精确）。</li>
          <li>调低 → 更少假警报（高精确），却漏掉真实的（低召回）。</li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>告警疲劳是异常系统的无声杀手。</strong>一个狼来了喊多了的检测器——用假阳性淹没
            分析师——会被无视，然后它就漏掉了真实的异常，因为没人再在听了。一个召回率极好、精确率
            极差的系统，<em>比没有系统更糟</em>，因为它烧掉了本该据以行动的人的信任与时间。修法很少
            是一个更花哨的模型——而是把阈值调到人类实际能分诊的程度，并
            <strong>把模型分数与领域规则 结合</strong>，好让浮现出来的告警是那些值得一个人去关注的。
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="无标签下的评判">
        <p>
          评估之所以难，恰恰因为你通常缺乏标签——如果你知道那些异常，你就不需要去检测它们了。实践中
          你在你所有的任何带标签子集上验证（过去已确认的案例），用
          <Link href="/knowledge/statistics">精确率/召回率/F1</Link>
          这一族而非准确率，并倚靠领域专家来确认被标记之物的一个样本。最重要的是，你按真实的代价来
          调：在大多数场景里，一个漏掉的异常与一个假警报有着很不同的价码，而阈值应当反映这一点，而非
          一个默认值。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="浮现出值得一看的那个案例">
          <p>
            在情报与廉政工作中，异常检测往往就是整份任务：从大量正常的活动中，
            <strong>浮现出那少数 几个值得调查的案例</strong>
            。这一页上的纪律，正是让那件事保持有用的东西——诚实地给「正常」 建模、留心
            <strong>基率</strong>（罕见事件让准确率变得毫无意义），并且最重要的是管好
            <strong>告警疲劳</strong>的权衡，因为一阵假阳性的洪流不只是浪费分析师的时间，它会让整个
            系统被关掉。
          </p>
          <p>
            它也把本板块的许多部分缝在一起：<Link href="/knowledge/probability">基率</Link>推理、
            <Link href="/knowledge/clustering">密度</Link>视角、
            <Link href="/knowledge/statistical-machine-learning">模型</Link>， 以及
            <Link href="/knowledge/statistics">精确率/召回率</Link>的诚实——全都瞄准同一个目标：
            找出那个不属于此处的信号，而不喊狼来了。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              异常检测找出那些不契合的罕见点——而「不同」往往是「重要」。给<strong>正常</strong>
              建模， 标记偏离。
            </li>
            <li>
              三种：<strong>点</strong>、<strong>上下文</strong>（对语境而言反常）、
              <strong>集体</strong>
              （作为一组反常）。难，是因为异常<strong>罕见、无标签、且不断演变</strong>
              （基率陷阱）。
            </li>
            <li>
              方法：<strong>统计</strong>（z 分数/IQR，但是单变量的）、<strong>距离/密度</strong>
              （LOF、DBSCAN）、<strong>基于模型</strong>（孤立森林——孤立所需切分更少；自编码器——高
              重建误差）。
            </li>
            <li>
              关键的权衡是经由一个灵敏度旋钮的<strong>精确率 vs 召回率</strong>——以及
              <strong>告警 疲劳</strong>：太多假阳性会让系统被无视。
            </li>
            <li>
              <strong>把模型分数与领域规则结合</strong>；把阈值调到人类能分诊的程度，并调到「漏报 vs
              假警报」的真实代价。
            </li>
            <li>
              用<strong>精确率/召回率/F1</strong>在你所有的任何标签上评估，外加专家复核——绝不用
              准确率。先<strong>标准化并降维</strong>。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          方法比较与告警疲劳的取景，反映了当前的异常检测参考（孤立森林 / LOF 实践、告警疲劳研究），
          以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Anomaly Detection",
    subtitle:
      "Finding the needle that doesn't belong. The unusual case is often the important one — fraud, a breach, a failing machine, a case worth a second look — and spotting it is a discipline of its own.",
    description:
      "A thorough, practical explainer of anomaly and outlier detection — point/contextual/collective anomalies, why it's hard (rare, unlabelled, evolving), statistical methods, distance and density methods (LOF, DBSCAN), model-based detection (isolation forest, autoencoders), the precision/recall and alert-fatigue trade-off, and evaluation without labels. In-Practice tier, anchored to Rin Huang's intelligence and integrity work.",
    course: "Anomaly Detection",
    courseCode: "In practice · intelligence & integrity",
    level: "Professional",
    learned: "Gov intelligence · ongoing",
    applied: "Integrity & risk signals",
    readingTime: "~15 min read",
    sections: [
      { id: "what", label: "Finding the unusual" },
      { id: "kinds", label: "Three kinds of anomaly" },
      { id: "hard", label: "Why it's hard" },
      { id: "statistical", label: "Statistical methods" },
      { id: "density", label: "Distance and density" },
      { id: "model", label: "Model-based detection" },
      { id: "tradeoff", label: "The alert-fatigue trade-off" },
      { id: "evaluate", label: "Judging without labels" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/clustering", label: "Clustering" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "异常检测",
    subtitle:
      "找出那根不属于此处的针。不寻常的那个案例往往就是重要的那个——欺诈、一次入侵、一台快坏的机器、一宗值得再看一眼的案件——而发现它，是一门自成一体的学科。",
    description:
      "对异常与离群检测的详尽、实用讲解——点/上下文/集体异常、为什么它难（罕见、无标签、不断演变）、统计方法、距离与密度方法（LOF、DBSCAN）、基于模型的检测（孤立森林、自编码器）、精确率/召回率与告警疲劳的权衡，以及无标签下的评估。实务层，锚定 Rin Huang 的情报与廉政工作。",
    course: "异常检测",
    courseCode: "实务 · 情报与廉政",
    level: "职业",
    learned: "政府情报 · 持续进行",
    applied: "廉政与风险信号",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "找出不寻常之物" },
      { id: "kinds", label: "三种异常" },
      { id: "hard", label: "为什么它难" },
      { id: "statistical", label: "统计方法" },
      { id: "density", label: "距离与密度" },
      { id: "model", label: "基于模型的检测" },
      { id: "tradeoff", label: "告警疲劳的权衡" },
      { id: "evaluate", label: "无标签下的评判" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/clustering", label: "聚类" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "anomaly-detection", updated: "2026-06-25", ...meta, Body };
}
