import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/statistical-process-control.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (μ ± 3σ + inline TeX) is identical across locales; prose, captions, section
 * labels, and the control-chart figure's "centre"/"special cause!" labels are
 * localised. Point geometry + UCL/LCL abbreviations are kept.
 */

const PTS = [
  [45, 72],
  [75, 90],
  [105, 65],
  [135, 95],
  [165, 78],
  [195, 60],
  [225, 88],
  [255, 70],
  [285, 18],
  [315, 84],
  [345, 66],
  [375, 92],
];

function ControlChartFigure({ caption, ariaLabel, centreLabel, specialCauseLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* limit lines */}
        <line
          x1="30"
          y1="28"
          x2="420"
          y2="28"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <text
          x="424"
          y="31"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
          textAnchor="end"
          opacity="0.8"
        >
          UCL
        </text>
        <line
          x1="30"
          y1="80"
          x2="420"
          y2="80"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="424"
          y="76"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          textAnchor="end"
          opacity="0.6"
        >
          {centreLabel}
        </text>
        <line
          x1="30"
          y1="132"
          x2="420"
          y2="132"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <text
          x="424"
          y="135"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
          textAnchor="end"
          opacity="0.8"
        >
          LCL
        </text>
        {/* points */}
        {PTS.map(([x, y], i) => {
          const breach = y < 28;
          return (
            <g key={i}>
              {i > 0 && (
                <line
                  x1={PTS[i - 1][0]}
                  y1={PTS[i - 1][1]}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={breach ? 5 : 3}
                fill={breach ? "#FF3C3C" : "currentColor"}
                opacity={breach ? 1 : 0.6}
              />
            </g>
          );
        })}
        <text x="285" y="12" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">
          {specialCauseLabel}
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
        A metric you watch over time — a processing time, an error rate, a daily count — is always
        wobbling. The hard question every time it moves:{" "}
        <strong>
          did something actually change, or is this just the normal jitter the process always has?
        </strong>{" "}
        Over-react to noise and you waste effort chasing ghosts (and often make things worse);
        ignore a real shift and you miss a genuine problem. <Term>Statistical process control</Term>{" "}
        (SPC) is the decades-old, beautifully practical discipline for telling these two apart — so
        you respond to real signals and leave the noise alone.
      </p>
      <p>
        Born in manufacturing (Shewhart and Deming) but applicable to any repeating process, SPC is
        a close cousin of <Link href="/knowledge/anomaly-detection">anomaly detection</Link> and{" "}
        <Link href="/knowledge/streaming-analytics">streaming monitoring</Link>, with a sharp
        conceptual core. This page is that core: the variation distinction at its heart, the control
        chart that operationalises it, and the trade-off behind its famous limits.
      </p>

      <KSection id="why" eyebrow="01" title="Real change vs normal noise">
        <p>
          The whole field rests on one reframing. Before SPC, people reacted to every up and down —
          a bad day's numbers triggered a scramble to "fix" something, even when nothing had
          actually changed. Shewhart's insight was that{" "}
          <strong>a stable process still varies</strong>, and reacting to that inherent variation as
          if it were a signal — <Term>tampering</Term> — usually makes the process <em>worse</em>,
          not better. The job of SPC is to draw a principled line: this much wobble is normal, leave
          it alone; <em>that</em> is a genuine signal, investigate it.
        </p>
      </KSection>

      <KSection id="variation" eyebrow="02" title="Common cause vs special cause">
        <p>
          The foundational distinction — and arguably the single most useful idea in operational
          analysis:
        </p>
        <ul>
          <li>
            <Term>Common-cause variation</Term> — the natural, inherent jitter of a stable process.
            Many small, ever-present influences (slight differences in conditions, materials,
            timing). It's predictable in its <em>range</em>, even if any single value isn't, and
            it's <strong>not worth chasing</strong> — it's just how the process is.
          </li>
          <li>
            <Term>Special-cause variation</Term> — an unusual, <em>assignable</em> cause: something
            genuinely changed (a new supplier, a broken tool, a process change). This produces a
            value (or pattern) outside the normal range, and it <strong>is</strong> worth
            investigating — there's a real reason to find.
          </li>
        </ul>
        <p>
          A process showing only common-cause variation is <Term>in control</Term> (stable and
          predictable); one with special-cause variation is <Term>out of control</Term> (something
          to act on). The entire machinery of SPC exists to separate these reliably — so you act
          only when there's genuinely something to act on.
        </p>
      </KSection>

      <KSection id="chart" eyebrow="03" title="The control chart">
        <p>
          The tool that operationalises all this is the <Term>control chart</Term>: plot the metric
          over time, with three reference lines — a <Term>centre line</Term> at the process average,
          and <Term>upper and lower control limits</Term> (UCL/LCL) marking the boundary of normal
          variation.
        </p>
        <ControlChartFigure
          caption="A control chart. Points wobbling within the limits are common-cause variation — the process is in control, leave it alone. A point breaching a control limit is a special-cause signal — investigate. The limits encode 'how much wobble is normal' for this process."
          ariaLabel="A time series of points within an upper and lower control limit, with the centre line in the middle and one point breaching the upper limit highlighted."
          centreLabel="centre"
          specialCauseLabel="special cause!"
        />
        <p>
          As long as points bounce around within the limits with no pattern, the process is in
          control — that's just common-cause noise, and the correct action is <em>none</em>. When a
          point crosses a limit, that's a special-cause signal worth investigating. The chart turns
          a vague "that looks high" into a principled, repeatable decision rule.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="04" title="Why three sigma?">
        <p>
          The control limits are conventionally set at the centre line plus or minus{" "}
          <strong>three standard deviations</strong> of the process:
        </p>
        <Formula label="The upper and lower control limits equal the process mean mu, plus or minus three sigma.">
          {String.raw`\text{UCL},\,\text{LCL} = \mu \pm 3\sigma`}
        </Formula>
        <p>
          Why three? It's a deliberate <strong>cost trade-off</strong>, and recognising that is the
          key to using SPC well. For roughly bell-shaped data, only about 0.3% of points fall beyond
          ±3σ by chance — so a breach is <em>very probably</em> a real signal, not luck. Set the
          limits tighter (±2σ) and you'd catch real shifts sooner, but you'd also get far more{" "}
          <strong>false alarms</strong> — and reacting to those (tampering) wastes effort and
          destabilises the process.
        </p>
        <Callout type="intuition">
          <p>
            This is precisely the{" "}
            <Link href="/knowledge/statistics">false-positive vs false-negative</Link> trade-off —
            the same <Link href="/knowledge/anomaly-detection">alert-fatigue</Link> tension from
            anomaly detection. ±3σ is the long-tested sweet spot: rare enough false alarms that a
            signal is worth trusting, sensitive enough to catch a real, large shift. Three sigma
            isn't a law of nature — it's a well-calibrated bet about the cost of crying wolf versus
            the cost of missing a change.
          </p>
        </Callout>
      </KSection>

      <KSection id="rules" eyebrow="05" title="Signals beyond a single breach">
        <p>
          A point outside the limits is the obvious signal — but a process can drift in ways no
          single point catches. The <Term>Western Electric rules</Term> (and Nelson's) add patterns
          that also flag a special cause even when every point is <em>inside</em> the limits:
        </p>
        <ul>
          <li>
            A run of several consecutive points all on the <em>same side</em> of the centre line
            (the process has shifted).
          </li>
          <li>
            A steady <em>trend</em> of points marching up or down (gradual drift).
          </li>
          <li>Too many points clustered far from the centre, or other non-random patterns.</li>
        </ul>
        <p>
          The logic is the same throughout: a <em>stable</em> process should look{" "}
          <strong>random</strong> around the centre. Any <em>non-random</em> pattern — a run, a
          trend, a cycle — is a fingerprint of something systematic, i.e. a special cause, even
          before a point breaches a limit. SPC is as much about spotting structure as outliers.
        </p>
      </KSection>

      <KSection id="types" eyebrow="06" title="Charts for small, slow shifts">
        <p>
          The classic <Term>Shewhart chart</Term> uses only the current point, which makes it great
          at catching <em>large</em> sudden shifts but slow to notice a <em>small</em> persistent
          drift. For that, two charts use the <em>history</em>:
        </p>
        <ul>
          <li>
            <Term>CUSUM</Term> (cumulative sum) — accumulates the running deviations from target, so
            even a small consistent bias adds up into a clear signal.
          </li>
          <li>
            <Term>EWMA</Term> (exponentially weighted moving average) — a weighted average that
            emphasises recent points (the same smoothing idea as{" "}
            <Link href="/knowledge/time-series-analysis">time series</Link>), sensitive to gradual
            moves.
          </li>
        </ul>
        <p>
          Both are tuned to catch the slow drifts a Shewhart chart would miss — you pick the chart
          for the
          <em> kind</em> of change you're worried about. (There are also chart types for different
          data: X-bar/R for measurements, p-charts for proportions.)
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Don't chase the noise">
          <p>
            Any operational metric or KPI watched over time — a processing time, a volume, an error
            or compliance rate — invites the question SPC answers:{" "}
            <strong>is this a real change or just normal fluctuation?</strong> The single most
            valuable idea is the <strong>common-cause vs special-cause</strong> distinction: most
            month-to-month wobble is common-cause noise that shouldn't trigger action, and{" "}
            <strong>reacting to it (tampering) makes things worse</strong> — a discipline that saves
            a lot of wasted effort and over-correction.
          </p>
          <p>
            A <strong>control chart</strong> turns "that number looks off" into a defensible rule,
            and the <strong>±3σ</strong> choice is the same{" "}
            <Link href="/knowledge/anomaly-detection">false-alarm trade-off</Link> (and{" "}
            <Link href="/knowledge/statistics">precision/recall</Link> tension) that runs through
            anomaly detection — set it for the cost of crying wolf vs missing a real shift. It pairs
            naturally with <Link href="/knowledge/streaming-analytics">streaming</Link> (real-time
            monitoring) and <Link href="/knowledge/time-series-analysis">time series</Link> (the
            underlying signal), and is one of the most genuinely practical tools in the whole
            toolkit.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              SPC tells a <strong>real change from normal noise</strong> in a process over time — so
              you act on signals and stop chasing wobble (and stop <strong>tampering</strong>).
            </li>
            <li>
              The core distinction: <strong>common-cause</strong> (inherent jitter, leave it) vs{" "}
              <strong>special-cause</strong> (assignable, investigate). In control vs out of
              control.
            </li>
            <li>
              A <strong>control chart</strong> plots the metric with a centre line +{" "}
              <strong>control limits</strong>; a breach signals a special cause.
            </li>
            <li>
              Limits at <strong>μ ± 3σ</strong> — a deliberate{" "}
              <strong>false-alarm vs missed-shift</strong> trade-off (≈0.3% chance breach; the
              alert-fatigue tension).
            </li>
            <li>
              <strong>Western Electric / Nelson rules</strong> catch runs and trends inside the
              limits — a stable process should look <strong>random</strong>; non-random patterns are
              signals.
            </li>
            <li>
              <strong>CUSUM</strong> and <strong>EWMA</strong> catch small, slow drifts a Shewhart
              chart misses.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The common/special-cause framing, the ±3σ control chart, the Western Electric rules, and
          CUSUM/EWMA for small shifts reflect current SPC references alongside quality coursework.
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
        一个你随时间盯着的指标——一段处理时间、一个错误率、一个每日计数——总在抖动。每次它一动，那个难题
        就是：<strong>真有什么变了，还是这只是这个过程一直都有的正常抖动？</strong>
        对噪声反应过度，你就把
        力气浪费在追鬼上（而且往往把事情弄得更糟）；忽略一个真实的偏移，你就错过一个真正的问题。
        <Term>统计过程控制</Term>
        （SPC）是把这两者分辨开的、有几十年历史的、极为实用的学问——好让你对真实
        的信号做出回应，而把噪声留在那里别动。
      </p>
      <p>
        SPC 诞生于制造业（休哈特与戴明），却适用于任何重复的过程，它是
        <Link href="/knowledge/anomaly-detection">异常检测</Link>和
        <Link href="/knowledge/streaming-analytics">流式监控</Link>
        的近亲，有一个锋利的概念内核。这一页讲的
        就是那个内核：它核心处的变异区分、把它落地的控制图，以及它那著名界限背后的取舍。
      </p>

      <KSection id="why" eyebrow="01" title="真实变化对正常噪声">
        <p>
          整个领域都建立在一次重新框定之上。在 SPC
          之前，人们对每一次起落都做出反应——糟糕的一天的数字会
          触发一阵手忙脚乱去「修」点什么，即便其实什么都没变。休哈特的洞见是：
          <strong>一个稳定的过程仍然会 变化</strong>，而把那种固有的变异当作信号来反应——
          <Term>瞎调</Term>——通常把过程弄得<em>更糟</em>、 而非更好。SPC
          的工作是划出一条有原则的线：这么多抖动是正常的，别去动它；<em>那个</em>是一个真正的
          信号，去调查它。
        </p>
      </KSection>

      <KSection id="variation" eyebrow="02" title="常因对特因">
        <p>那个奠基性的区分——而且可以说是运营分析里最有用的单一想法：</p>
        <ul>
          <li>
            <Term>常因变异</Term>
            ——一个稳定过程自然、固有的抖动。许多微小的、无处不在的影响（条件、材料、
            时机上的细微差别）。它在<em>范围</em>上是可预测的，即便任何单个值不是，而它
            <strong>不值得去追</strong>——这就是这个过程本来的样子。
          </li>
          <li>
            <Term>特因变异</Term>——一个不寻常的、<em>可归因的</em>
            原因：真有什么变了（一个新供应商、一件
            坏掉的工具、一次过程变更）。这产生一个落在正常范围之外的值（或模式），而它
            <strong>确实</strong>
            值得调查——有一个真实的原因可找。
          </li>
        </ul>
        <p>
          一个只表现出常因变异的过程是<Term>受控的</Term>（稳定且可预测）；一个有特因变异的过程是
          <Term>失控的</Term>（有要采取行动的东西）。SPC
          的全部机制，都是为了可靠地把这两者分开——好让你只在 真有要行动的东西时才行动。
        </p>
      </KSection>

      <KSection id="chart" eyebrow="03" title="控制图">
        <p>
          把这一切落地的工具是<Term>控制图</Term>
          ：随时间画出这个指标，配上三条参考线——一条在过程平均值处的
          <Term>中心线</Term>，以及标出正常变异边界的<Term>上、下控制限</Term>（UCL/LCL）。
        </p>
        <ControlChartFigure
          caption="一张控制图。在界限内抖动的点是常因变异——过程受控，别去动它。一个越过控制限的点是一个特因信号——去调查。这些界限编码了对这个过程而言「多少抖动算正常」。"
          ariaLabel="一条时间序列的点处在上、下控制限之间，中心线在中间，一个越过上限的点被高亮。"
          centreLabel="中心"
          specialCauseLabel="特因！"
        />
        <p>
          只要点在界限内毫无规律地跳来跳去，过程就是受控的——那只是常因噪声，正确的行动是<em>无</em>
          。当一个
          点越过一条界限，那就是一个值得调查的特因信号。这张图把一个模糊的「那看起来偏高」变成一条有原则、
          可重复的决策规则。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="04" title="为什么是三西格玛？">
        <p>
          控制限按惯例设在中心线加减过程的<strong>三个标准差</strong>处：
        </p>
        <Formula label="The upper and lower control limits equal the process mean mu, plus or minus three sigma.">
          {String.raw`\text{UCL},\,\text{LCL} = \mu \pm 3\sigma`}
        </Formula>
        <p>
          为什么是三？这是一个深思熟虑的<strong>成本取舍</strong>，而认识到这一点是用好 SPC
          的关键。对于 大致呈钟形的数据，只有约 0.3% 的点会偶然落在 ±3σ 之外——所以一次越界
          <em>很可能</em>是一个真实的
          信号，而非运气。把界限设得更紧（±2σ），你会更早捕捉到真实的偏移，但你也会得到多得多的
          <strong>假警报</strong>——而对那些做出反应（瞎调）会浪费力气并使过程失稳。
        </p>
        <Callout type="intuition">
          <p>
            这正是<Link href="/knowledge/statistics">假阳性对假阴性</Link>的取舍——与异常检测里同样的
            <Link href="/knowledge/anomaly-detection">警报疲劳</Link>张力。±3σ
            是经过长期检验的甜蜜点：假
            警报够罕见，使一个信号值得信任；够敏感，能捕捉一次真实的、大的偏移。三西格玛不是一条自然法则——
            它是关于「狼来了」的成本与错过一次变化的成本之间，一个校准良好的赌注。
          </p>
        </Callout>
      </KSection>

      <KSection id="rules" eyebrow="05" title="单次越界之外的信号">
        <p>
          一个落在界限之外的点是显而易见的信号——但一个过程可能以没有任何单个点能捕捉的方式漂移。
          <Term>西部电气规则</Term>（以及纳尔逊的）增加了一些模式，即便每个点都在界限<em>之内</em>
          ，也会 标记出一个特因：
        </p>
        <ul>
          <li>
            连续好几个点全都在中心线<em>同一侧</em>的一连串（过程已经偏移）。
          </li>
          <li>
            点稳定地向上或向下行进的一个<em>趋势</em>（逐渐的漂移）。
          </li>
          <li>太多点聚集在远离中心之处，或其他非随机的模式。</li>
        </ul>
        <p>
          贯穿始终的逻辑都一样：一个<em>稳定</em>的过程在中心周围应当看起来<strong>随机</strong>
          。任何
          <em>非随机</em>
          的模式——一连串、一个趋势、一个周期——都是某种系统性东西的指纹，即一个特因，甚至在
          一个点越界之前。SPC 既是关于发现结构，也是关于发现离群值。
        </p>
      </KSection>

      <KSection id="types" eyebrow="06" title="针对小而慢的偏移的图">
        <p>
          经典的 <Term>休哈特图</Term>只用当前的点，这使它非常擅长捕捉<em>大</em>
          的突然偏移，却迟于注意到 一个<em>小</em>的持续漂移。为此，有两种图使用<em>历史</em>：
        </p>
        <ul>
          <li>
            <Term>CUSUM</Term>
            （累积和）——累加偏离目标的运行中偏差，于是即便一个小的、一致的偏倚也会累加成
            一个清晰的信号。
          </li>
          <li>
            <Term>EWMA</Term>（指数加权移动平均）——一个强调近期点的加权平均（与
            <Link href="/knowledge/time-series-analysis">时间序列</Link>
            同样的平滑想法），对逐渐的移动敏感。
          </li>
        </ul>
        <p>
          两者都被调来捕捉休哈特图会错过的慢漂移——你为你所担心的那<em>种</em>
          变化挑选图。（还有针对不同 数据的图类型：测量值用 X-bar/R 图，比例用 p 图。）
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="别去追噪声">
          <p>
            任何随时间被盯着的运营指标或 KPI——一段处理时间、一个量、一个错误或合规率——都引出 SPC
            所回答的 那个问题：<strong>这是一次真实的变化，还是只是正常的波动？</strong>
            最有价值的单一想法是
            <strong>常因对特因</strong>
            的区分：大多数月与月之间的抖动是不该触发行动的常因噪声，而对它做出反应
            （瞎调）会把事情弄得更糟——一种省下大量被浪费的力气和过度纠正的纪律。
          </p>
          <p>
            一张<strong>控制图</strong>把「那个数字看起来不对劲」变成一条站得住脚的规则，而{" "}
            <strong>±3σ</strong> 的选择就是贯穿异常检测的那个同样的
            <Link href="/knowledge/anomaly-detection">假警报取舍</Link>（以及
            <Link href="/knowledge/statistics">精确率/召回率</Link>
            张力）——为「狼来了」的成本对错过一次真实 偏移的成本去设定它。它与
            <Link href="/knowledge/streaming-analytics">流式</Link>（实时监控）和
            <Link href="/knowledge/time-series-analysis">时间序列</Link>
            （底层的信号）天然相配，是整个工具箱里 最真正实用的工具之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              SPC 在一个过程随时间里把<strong>真实的变化与正常的噪声</strong>
              分辨开——好让你对信号采取行动， 而不再追逐抖动（也不再<strong>瞎调</strong>）。
            </li>
            <li>
              核心的区分：<strong>常因</strong>（固有的抖动，别动它）对<strong>特因</strong>
              （可归因的，去 调查）。受控对失控。
            </li>
            <li>
              一张<strong>控制图</strong>画出这个指标，配上一条中心线 + <strong>控制限</strong>
              ；一次越界 标志着一个特因。
            </li>
            <li>
              界限设在 <strong>μ ± 3σ</strong>——一个深思熟虑的<strong>假警报对错过偏移</strong>
              的取舍 （约 0.3% 的偶然越界概率；警报疲劳的张力）。
            </li>
            <li>
              <strong>西部电气 / 纳尔逊规则</strong>
              捕捉界限内的一连串和趋势——一个稳定的过程应当看起来
              <strong>随机</strong>；非随机的模式就是信号。
            </li>
            <li>
              <strong>CUSUM</strong> 和 <strong>EWMA</strong> 捕捉休哈特图错过的小而慢的漂移。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          常因/特因的框架、±3σ 控制图、西部电气规则，以及用于小偏移的 CUSUM/EWMA，反映了当前的 SPC
          参考 文献以及质量课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Statistical Process Control",
    subtitle:
      "A number moved. Did something real change, or is it just normal wobble? Statistical process control is the discipline of telling those apart over time — so you act on genuine signals and stop chasing noise.",
    description:
      "A thorough, practical explainer of statistical process control (SPC) — common-cause vs special-cause variation, control charts and their limits, why three sigma, the Western Electric rules, CUSUM and EWMA for small shifts, and the honest pitfalls. In-Practice tier, anchored to Rin Huang's operational-monitoring work.",
    course: "Statistical Process Control",
    courseCode: "In practice · monitoring over time",
    level: "Professional",
    learned: "Quality & ops analysis",
    applied: "Telling a real shift from noise",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Real change vs noise" },
      { id: "variation", label: "Common vs special cause" },
      { id: "chart", label: "The control chart" },
      { id: "limits", label: "Why three sigma" },
      { id: "rules", label: "Signals beyond the limits" },
      { id: "types", label: "Charts for small shifts" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/anomaly-detection", label: "Anomaly Detection" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "统计过程控制",
    subtitle:
      "一个数字动了。是真有什么变了，还是只是正常的抖动？统计过程控制是随时间把这两者分辨开的学问——好让你对真正的信号采取行动，而不再追逐噪声。",
    description:
      "对统计过程控制（SPC）的详尽、实用讲解——常因变异对特因变异、控制图及其界限、为什么是三西格玛、西部电气规则、用于小偏移的 CUSUM 与 EWMA，以及诚实的陷阱。实务层，锚定 Rin Huang 的运营监控工作。",
    course: "统计过程控制",
    courseCode: "实务 · 随时间监控",
    level: "职业",
    learned: "质量与运营分析",
    applied: "把真实偏移与噪声分开",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "真实变化对噪声" },
      { id: "variation", label: "常因对特因" },
      { id: "chart", label: "控制图" },
      { id: "limits", label: "为什么三西格玛" },
      { id: "rules", label: "界限之外的信号" },
      { id: "types", label: "针对小偏移的图" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/anomaly-detection", label: "异常检测" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "statistical-process-control", updated: "2026-06-26", ...meta, Body };
}
