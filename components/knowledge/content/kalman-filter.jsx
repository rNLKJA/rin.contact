import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/kalman-filter.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (state-space + gain formulae, inline TeX) is identical across locales; prose,
 * captions, section labels, and the predict-update figure's text labels are
 * localised. The update box is the red accent (fixed); geometry internal.
 */

function KalmanLoopFigure({
  caption,
  ariaLabel,
  predictLabel,
  predictSub,
  updateLabel,
  updateSub,
  priorLabel,
  measureLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="50"
          y="55"
          width="120"
          height="42"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <text
          x="110"
          y="73"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {predictLabel}
        </text>
        <text
          x="110"
          y="88"
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {predictSub}
        </text>
        <rect
          x="270"
          y="55"
          width="120"
          height="42"
          rx="5"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.5"
        />
        <text
          x="330"
          y="73"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {updateLabel}
        </text>
        <text
          x="330"
          y="88"
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {updateSub}
        </text>
        <path
          d="M170 66 H270"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          markerEnd="url(#kfah)"
        />
        <text
          x="220"
          y="58"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {priorLabel}
        </text>
        <path
          d="M270 86 H170"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.3"
          markerEnd="url(#kfahr)"
        />
        <text
          x="220"
          y="104"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {measureLabel}
        </text>
        <defs>
          <marker id="kfah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
          </marker>
          <marker id="kfahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Every sensor lies a little. A GPS reading, a thermometer, a noisy estimate of a moving
        object's position — each is the <em>true</em> value plus some measurement error. The{" "}
        <Term>Kalman filter</Term> is an elegant, hugely influential algorithm for recovering the
        true, hidden value from a stream of noisy measurements <strong>in real time</strong> — and
        it does it by a beautiful idea: at every step, it blends what it <em>predicted</em> would
        happen with what it <em>actually measured</em>, weighting each by how trustworthy it is.
      </p>
      <p>
        It's the engine behind GPS, spacecraft navigation, object tracking, and sensor fusion, and
        it's a distinct tool from the{" "}
        <Link href="/knowledge/time-series-analysis">ARIMA-style time series</Link> page — that one
        models a single observed series; this estimates a <em>hidden state</em> as data streams in.
        This page builds it from the state-space idea, through the predict-update loop, to the
        intuition that makes it click. It ties to{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian updating</Link> and{" "}
        <Link href="/knowledge/streaming-analytics">streaming</Link>.
      </p>

      <KSection id="why" eyebrow="01" title="The hidden true state">
        <p>
          The core framing is the <Term>state-space model</Term>, and it cleanly separates two
          things we usually muddle: the <em>true state of the world</em>, and our{" "}
          <em>noisy glimpses</em> of it. There is a hidden <Term>state</Term> — an object's real
          position and velocity, say — that we cannot observe directly. It evolves over time
          according to some dynamics. All we get are <Term>observations</Term>: measurements that
          are the true state, corrupted by noise.
        </p>
        <p>
          The task is to estimate the hidden state from the noisy observations,{" "}
          <em>as they arrive</em>, one at a time. That word "recursive" is key — the filter doesn't
          reprocess all history at each step; it carries forward a running best estimate and updates
          it with each new measurement, which is exactly what makes it work on a live stream with
          tiny memory.
        </p>
      </KSection>

      <KSection id="statespace" eyebrow="02" title="Two equations: dynamics and measurement">
        <p>
          A linear state-space model is just two equations. The <Term>state-transition</Term>{" "}
          equation says how the hidden state <TeX>{String.raw`\mathbf{x}`}</TeX> evolves from one
          step to the next:
        </p>
        <Formula label="The state at time t equals F times the state at time t minus 1, plus process noise w-t.">
          {String.raw`\mathbf{x}_t = F\,\mathbf{x}_{t-1} + \mathbf{w}_t`}
        </Formula>
        <p>
          And the <Term>observation</Term> equation says how a measurement{" "}
          <TeX>{String.raw`\mathbf{z}`}</TeX> relates to the (unseen) state:
        </p>
        <Formula label="The measurement at time t equals H times the true state at time t, plus measurement noise v-t.">
          {String.raw`\mathbf{z}_t = H\,\mathbf{x}_t + \mathbf{v}_t`}
        </Formula>
        <p>
          Here <TeX>{String.raw`F`}</TeX> encodes the dynamics (how the state moves — e.g. position
          updates by velocity), <TeX>{String.raw`H`}</TeX> maps state to measurement, and the two
          noise terms <TeX>{String.raw`\mathbf{w}_t`}</TeX>, <TeX>{String.raw`\mathbf{v}_t`}</TeX>{" "}
          are the <em>process</em> and <em>measurement</em> uncertainty. The whole filter's job is
          to estimate <TeX>{String.raw`\mathbf{x}_t`}</TeX> given all the noisy{" "}
          <TeX>{String.raw`\mathbf{z}`}</TeX>'s so far — and crucially, to track{" "}
          <em>how uncertain</em> that estimate is, because that uncertainty is what drives the whole
          thing.
        </p>
      </KSection>

      <KSection id="loop" eyebrow="03" title="The recursion: predict, then update">
        <p>
          The Kalman filter cycles through two steps for every new measurement — a rhythm of
          guess-then-correct:
        </p>
        <KalmanLoopFigure
          caption="The Kalman filter loop. PREDICT: use the dynamics to project the state (and its uncertainty) forward — the estimate drifts and uncertainty grows. UPDATE: a new measurement arrives; correct the prediction toward it, shrinking uncertainty. Repeat for every measurement, forever."
          ariaLabel="A two-box cycle: predict projects the state forward; update corrects it with a new measurement; loop back to predict."
          predictLabel="predict"
          predictSub="uncertainty grows"
          updateLabel="update"
          updateSub="uncertainty shrinks"
          priorLabel="prior"
          measureLabel="+ measurement → loop"
        />
        <ul>
          <li>
            <Term>Predict</Term> — use the dynamics (<TeX>{String.raw`F`}</TeX>) to project the
            current estimate forward to the next time step. The estimate moves, and — because the
            world is uncertain — its <em>uncertainty grows</em>. This is the filter's best guess{" "}
            <em>before</em> seeing new data.
          </li>
          <li>
            <Term>Update</Term> — a new measurement arrives. Correct the prediction toward it, by an
            amount that depends on the relative uncertainties, and the estimate's uncertainty{" "}
            <em>shrinks</em>
            (you've learned something). This corrected estimate becomes the starting point for the
            next predict.
          </li>
        </ul>
        <p>
          Predict-then-correct, forever. The result is a continuously updated best estimate that's
          smoother and more accurate than the raw measurements — and it's optimal, in a precise
          sense, for linear-Gaussian systems.
        </p>
      </KSection>

      <KSection id="gain" eyebrow="04" title="The Kalman gain: who to trust">
        <p>
          The heart of the update is one quantity: the <Term>Kalman gain</Term>{" "}
          <TeX>{String.raw`K`}</TeX>. It decides{" "}
          <strong>how much to move the prediction toward the new measurement</strong> — i.e. how
          much to trust the measurement versus your own prediction. The corrected estimate is
          essentially:
        </p>
        <Formula label="The new estimate equals the prediction, plus the Kalman gain times the difference between the measurement and the prediction.">
          {String.raw`\hat{\mathbf{x}}_t = \hat{\mathbf{x}}_{t}^{-} + K\big(\mathbf{z}_t - H\hat{\mathbf{x}}_{t}^{-}\big)`}
        </Formula>
        <p>
          That bracket — measurement minus prediction — is the <Term>innovation</Term>, the
          surprise. The gain <TeX>{String.raw`K`}</TeX> scales how much of the surprise you absorb,
          and it's set by the relative uncertainties:
        </p>
        <Callout type="intuition">
          <p>
            If your <strong>measurement is noisy</strong> but your prediction is confident, the gain
            is <em>small</em> — barely budge toward the measurement, trust the model. If your{" "}
            <strong>prediction is uncertain</strong> but the measurement is precise, the gain is{" "}
            <em>large</em> — jump toward the measurement, trust the sensor. The Kalman filter is, at
            heart, a{" "}
            <strong>
              weighted average of prediction and measurement, weighted by who's more trustworthy
            </strong>{" "}
            — computed optimally and updated every step. That single idea is the whole filter; the
            matrix algebra is just bookkeeping for doing it across many dimensions at once.
          </p>
        </Callout>
      </KSection>

      <KSection id="uses" eyebrow="05" title="Where it's used">
        <p>
          The Kalman filter is one of the most deployed algorithms in engineering — it literally
          helped land Apollo on the Moon. Its homes:
        </p>
        <ul>
          <li>
            <Term>Tracking &amp; navigation</Term> — estimating the position and velocity of a
            moving object (aircraft, missiles, your phone's location) from noisy, intermittent
            fixes.
          </li>
          <li>
            <Term>Sensor fusion</Term> — optimally <em>combining</em> multiple noisy sensors (GPS +
            accelerometer + gyroscope) into one coherent estimate, each weighted by its reliability.
            This is its killer application — it's how a phone or drone knows where it is.
          </li>
          <li>
            <Term>Smoothing noisy signals</Term> — anywhere you have a real-time signal buried in
            noise and want a clean running estimate (finance, control systems, biomedical signals).
          </li>
        </ul>
      </KSection>

      <KSection id="nonlinear" eyebrow="06" title="Beyond linear-Gaussian">
        <p>
          The classic Kalman filter is provably optimal under two assumptions: the dynamics are{" "}
          <strong>linear</strong> and the noise is <strong>Gaussian</strong>. The real world often
          breaks both — so the family has extensions:
        </p>
        <ul>
          <li>
            <Term>Extended / Unscented Kalman filters</Term> (EKF/UKF) — handle <em>nonlinear</em>{" "}
            dynamics by linearising (EKF) or cleverly sampling (UKF) around the current estimate.
          </li>
          <li>
            <Term>Particle filters</Term> — drop the Gaussian assumption entirely, representing the
            state's uncertainty with a cloud of weighted samples (the{" "}
            <Link href="/knowledge/computational-statistics">Monte Carlo</Link> idea applied to
            filtering). More flexible, more expensive.
          </li>
        </ul>
        <p>
          Underneath, all of these are doing <Term>recursive Bayesian estimation</Term> — the
          filter's predict-update is exactly the{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> prior→posterior cycle, run
          once per measurement. The Kalman filter is the special, beautifully closed-form case where
          everything is linear and Gaussian.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="A clean estimate from a noisy stream">
          <p>
            The Kalman filter is the right tool whenever there's a{" "}
            <strong>
              true value evolving over time that I only see through noisy measurements
            </strong>
            , and I want a clean, continuously-updated estimate — real-time tracking, smoothing a
            jittery operational signal, or fusing several imperfect sources into one. The idea I
            carry from it is the most useful part: an estimate is a{" "}
            <strong>
              weighted blend of what you expected and what you observed, weighted by their relative
              uncertainty
            </strong>{" "}
            — a principle that applies far beyond the formal filter.
          </p>
          <p>
            It also stitches together threads from across this section: it's{" "}
            <strong>recursive Bayesian updating</strong> (
            <Link href="/knowledge/bayesian-statistics">Bayes</Link> once per step), it's a{" "}
            <Link href="/knowledge/streaming-analytics">streaming</Link>, one-pass algorithm by
            nature, and it's a different lens on{" "}
            <Link href="/knowledge/time-series-analysis">time series</Link> (hidden state vs
            observed series). Knowing it's optimal only for linear-Gaussian — and what to reach for
            when that breaks — is what keeps its use honest.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A <strong>state-space model</strong> separates a hidden <strong>true state</strong>{" "}
              (evolving) from noisy <strong>observations</strong>. Two equations: state-transition (
              <TeX>{String.raw`F`}</TeX>) + observation (<TeX>{String.raw`H`}</TeX>).
            </li>
            <li>
              The <strong>Kalman filter</strong> estimates the hidden state <em>recursively</em> —
              one pass, tiny memory — via a <strong>predict → update</strong> loop.
            </li>
            <li>
              <strong>Predict</strong>: project the state forward, uncertainty grows.{" "}
              <strong>Update</strong>: a measurement arrives, correct toward it, uncertainty
              shrinks.
            </li>
            <li>
              The <strong>Kalman gain</strong> sets how far to move toward the measurement — a{" "}
              <strong>weighted average of prediction and measurement, by relative trust</strong>.
              Noisy sensor → small gain; uncertain prediction → large gain.
            </li>
            <li>
              Used for <strong>tracking, navigation, sensor fusion</strong> (GPS + IMU), signal
              smoothing. Optimal for <strong>linear-Gaussian</strong>; EKF/UKF/particle filters
              relax that.
            </li>
            <li>
              It's <strong>recursive Bayesian updating</strong> — Bayes once per measurement.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The state-space formulation, the predict-update recursion, the Kalman-gain intuition, and
          the nonlinear extensions reflect current estimation/sensor-fusion references alongside
          coursework.
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
        每一个传感器都撒一点谎。一个 GPS 读数、一支温度计、一个移动物体位置的带噪估计——每一个都是
        <em>真实</em>值加上某种测量误差。<Term>卡尔曼滤波</Term>
        是一个优雅、影响极大的算法，用于从一串 带噪声的测量中、<strong>实时地</strong>
        恢复那个真实的、隐藏的值——而它靠一个漂亮的想法做到：在 每一步，它把它<em>预测</em>
        会发生的、与它<em>实际测量</em>到的融合起来，各自按有多可信来加权。
      </p>
      <p>
        它是 GPS、航天器导航、物体跟踪与传感器融合背后的引擎，也是一个有别于
        <Link href="/knowledge/time-series-analysis">ARIMA 式时间序列</Link>
        页的工具——那一页对单条观测 到的序列建模；这一页则在数据流入时估计一个<em>隐藏状态</em>
        。这一页从状态空间的想法出发，经由 预测-更新循环，抵达让它豁然开朗的直觉。它连到
        <Link href="/knowledge/bayesian-statistics">贝叶斯 更新</Link>与
        <Link href="/knowledge/streaming-analytics">流式分析</Link>。
      </p>

      <KSection id="why" eyebrow="01" title="隐藏的真实状态">
        <p>
          核心的框架是<Term>状态空间模型</Term>，它干净地分开了我们通常混为一谈的两样东西：
          <em>世界的 真实状态</em>，与我们对它的<em>带噪一瞥</em>。有一个隐藏的<Term>状态</Term>
          ——比方说一个物体
          真实的位置与速度——我们无法直接观测到它。它随时间按某种动态演化。我们得到的全部，是
          <Term>观测</Term>：那些等于真实状态、被噪声污染过的测量。
        </p>
        <p>
          任务是从带噪的观测中估计隐藏状态，<em>在它们到达时</em>，一次一个。「递归」这个词是关键——
          滤波器在每一步并不重新处理全部历史；它向前携带一个运行中的最佳估计，并用每一个新测量去更新它，
          而这恰恰是让它能在一条实时流上、用极小的内存运作的东西。
        </p>
      </KSection>

      <KSection id="statespace" eyebrow="02" title="两个方程：动态与测量">
        <p>
          一个线性状态空间模型不过是两个方程。<Term>状态转移</Term>方程说明隐藏状态{" "}
          <TeX>{String.raw`\mathbf{x}`}</TeX> 如何从一步演化到下一步：
        </p>
        <Formula label="The state at time t equals F times the state at time t minus 1, plus process noise w-t.">
          {String.raw`\mathbf{x}_t = F\,\mathbf{x}_{t-1} + \mathbf{w}_t`}
        </Formula>
        <p>
          而<Term>观测</Term>方程说明一个测量 <TeX>{String.raw`\mathbf{z}`}</TeX> 如何与那个（看不见
          的）状态相关联：
        </p>
        <Formula label="The measurement at time t equals H times the true state at time t, plus measurement noise v-t.">
          {String.raw`\mathbf{z}_t = H\,\mathbf{x}_t + \mathbf{v}_t`}
        </Formula>
        <p>
          这里 <TeX>{String.raw`F`}</TeX> 编码动态（状态如何移动——例如位置按速度更新），
          <TeX>{String.raw`H`}</TeX> 把状态映射到测量，而两个噪声项{" "}
          <TeX>{String.raw`\mathbf{w}_t`}</TeX>、<TeX>{String.raw`\mathbf{v}_t`}</TeX> 是
          <em>过程</em>与<em>测量</em>的不确定性。整个滤波器的 任务，是在给定迄今所有带噪的{" "}
          <TeX>{String.raw`\mathbf{z}`}</TeX> 的条件下估计 <TeX>{String.raw`\mathbf{x}_t`}</TeX>
          ——而关键地，要追踪那个估计<em>有多不确定</em>，因为正是 那份不确定性驱动着整件事。
        </p>
      </KSection>

      <KSection id="loop" eyebrow="03" title="递归：先预测，再更新">
        <p>卡尔曼滤波对每一个新测量都循环两步——一种「先猜测再修正」的节奏：</p>
        <KalmanLoopFigure
          caption="卡尔曼滤波循环。预测：用动态把状态（及其不确定性）向前投射——估计漂移、不确定性增长。更新：一个新测量到达；把预测朝它修正，缩小不确定性。对每一个测量重复，永远。"
          ariaLabel="一个两框循环：预测把状态向前投射；更新用一个新测量修正它；再循环回预测。"
          predictLabel="预测"
          predictSub="不确定性增长"
          updateLabel="更新"
          updateSub="不确定性缩小"
          priorLabel="先验"
          measureLabel="+ 测量 → 循环"
        />
        <ul>
          <li>
            <Term>预测</Term>——用动态（<TeX>{String.raw`F`}</TeX>
            ）把当前估计向前投射到下一个时间步。 估计移动，而——因为世界是不确定的——它的
            <em>不确定性增长</em>。这是滤波器在看到新数据
            <em>之前</em>的最佳猜测。
          </li>
          <li>
            <Term>更新</Term>——一个新测量到达。把预测朝它修正，修正量取决于相对的不确定性，而估计的
            不确定性<em>缩小</em>（你学到了一些东西）。这个修正后的估计，成为下一次预测的起点。
          </li>
        </ul>
        <p>
          先预测再修正，永远如此。结果是一个被持续更新的最佳估计，它比原始测量更平滑、更准确——而且在
          一种精确的意义上，对线性-高斯系统是最优的。
        </p>
      </KSection>

      <KSection id="gain" eyebrow="04" title="卡尔曼增益：信任谁">
        <p>
          更新的核心是一个量：<Term>卡尔曼增益</Term> <TeX>{String.raw`K`}</TeX>。它决定
          <strong>把预测朝 新测量移动多少</strong>
          ——也就是，相对于你自己的预测，要多信任那个测量。修正后的估计本质上是：
        </p>
        <Formula label="The new estimate equals the prediction, plus the Kalman gain times the difference between the measurement and the prediction.">
          {String.raw`\hat{\mathbf{x}}_t = \hat{\mathbf{x}}_{t}^{-} + K\big(\mathbf{z}_t - H\hat{\mathbf{x}}_{t}^{-}\big)`}
        </Formula>
        <p>
          那个括号——测量减去预测——是<Term>新息</Term>，那个惊讶。增益 <TeX>{String.raw`K`}</TeX>{" "}
          缩放 你吸收多少惊讶，而它由相对的不确定性来设定：
        </p>
        <Callout type="intuition">
          <p>
            如果你的<strong>测量很吵</strong>、但你的预测很有把握，增益就<em>小</em>
            ——朝测量几乎不动， 信任模型。如果你的<strong>预测不确定</strong>、但测量很精确，增益就
            <em>大</em>——朝测量跳过去， 信任传感器。卡尔曼滤波，归根结底，是一个
            <strong>预测与测量的加权平均，按谁更可信来加权</strong>
            ——以最优的方式计算、每一步更新。那一个想法就是整个滤波器；矩阵代数不过是为了在许多
            维度上同时做这件事的记账。
          </p>
        </Callout>
      </KSection>

      <KSection id="uses" eyebrow="05" title="它用在哪里">
        <p>卡尔曼滤波是工程中部署得最多的算法之一——它真的帮助把阿波罗送上了月球。它的归宿：</p>
        <ul>
          <li>
            <Term>跟踪与导航</Term>
            ——从带噪的、断断续续的定位中，估计一个移动物体（飞机、导弹、你手机的
            位置）的位置与速度。
          </li>
          <li>
            <Term>传感器融合</Term>——把多个带噪传感器（GPS + 加速度计 + 陀螺仪）最优地<em>组合</em>
            成一个
            连贯的估计，各自按其可靠度加权。这是它的杀手级应用——一部手机或一架无人机正是这样知道自己在
            哪里的。
          </li>
          <li>
            <Term>平滑带噪信号</Term>——任何你有一个埋在噪声里的实时信号、想要一个干净的运行估计之处
            （金融、控制系统、生物医学信号）。
          </li>
        </ul>
      </KSection>

      <KSection id="nonlinear" eyebrow="06" title="超越线性-高斯">
        <p>
          经典的卡尔曼滤波在两个假设下被证明是最优的：动态是<strong>线性的</strong>、噪声是
          <strong>高斯的</strong>。真实世界常常把两者都打破——所以这个家族有一些扩展：
        </p>
        <ul>
          <li>
            <Term>扩展 / 无迹卡尔曼滤波</Term>（EKF/UKF）——通过在当前估计周围线性化（EKF）或巧妙采样
            （UKF），来处理<em>非线性</em>的动态。
          </li>
          <li>
            <Term>粒子滤波</Term>——彻底丢掉高斯假设，用一团加权的样本来表示状态的不确定性（把
            <Link href="/knowledge/computational-statistics">蒙特卡洛</Link>
            的想法应用到滤波）。更灵活， 更昂贵。
          </li>
        </ul>
        <p>
          在底下，所有这些做的都是<Term>递归贝叶斯估计</Term>——滤波器的预测-更新，正是
          <Link href="/knowledge/bayesian-statistics">贝叶斯</Link>的先验→后验循环，每个测量跑一次。
          卡尔曼滤波，是那个一切都线性且高斯、因而有着漂亮闭式解的特例。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="从一条带噪的流里得到一个干净的估计">
          <p>
            每当有一个随时间演化的真实值、我只能透过带噪的测量看见它，而我想要一个干净的、被持续更新的
            估计时——实时跟踪、平滑一个抖动的运营信号、或把几个不完美的来源融成一个——卡尔曼滤波就是对的
            工具。我从它带走的那个想法是最有用的部分：一个估计是
            <strong>你所预期的与你所观测的的加权 融合，按它们相对的不确定性加权</strong>
            ——一个远远超出这个正式滤波器的原则。
          </p>
          <p>
            它也把本板块各处的线索缝到一起：它是<strong>递归贝叶斯更新</strong>（每步一次
            <Link href="/knowledge/bayesian-statistics">贝叶斯</Link>）、它本质上是一个
            <Link href="/knowledge/streaming-analytics">流式</Link>的、一遍过的算法，而且它是看
            <Link href="/knowledge/time-series-analysis">时间序列</Link>的另一种透镜（隐藏状态对观测
            序列）。知道它只对线性-高斯最优——以及当那失效时该去拿什么——正是让它的使用保持诚实的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个<strong>状态空间模型</strong>把一个隐藏的<strong>真实状态</strong>
              （演化中）与带噪的
              <strong>观测</strong>分开。两个方程：状态转移（<TeX>{String.raw`F`}</TeX>）+ 观测（
              <TeX>{String.raw`H`}</TeX>）。
            </li>
            <li>
              <strong>卡尔曼滤波</strong>
              <em>递归地</em>估计隐藏状态——一遍过、极小内存——经由一个
              <strong>预测 → 更新</strong>循环。
            </li>
            <li>
              <strong>预测</strong>：把状态向前投射，不确定性增长。<strong>更新</strong>
              ：一个测量到达， 朝它修正，不确定性缩小。
            </li>
            <li>
              <strong>卡尔曼增益</strong>
              设定朝测量移动多远——一个预测与测量的加权平均，按相对的信任。 带噪的传感器 →
              小增益；不确定的预测 → 大增益。
            </li>
            <li>
              用于<strong>跟踪、导航、传感器融合</strong>（GPS + IMU）、信号平滑。对
              <strong>线性-高斯</strong>最优；EKF/UKF/粒子滤波放松这一点。
            </li>
            <li>
              它是<strong>递归贝叶斯更新</strong>——每个测量一次贝叶斯。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          状态空间的表述、预测-更新的递归、卡尔曼增益的直觉，以及非线性扩展，反映了当前的估计/传感器
          融合参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "State-Space Models & the Kalman Filter",
    subtitle:
      "Behind every noisy measurement is a true value you can't see directly. The Kalman filter recovers it in real time — blending what you predicted with what you measured, each weighted by how much it deserves to be trusted.",
    description:
      "A thorough, practical explainer of state-space models and the Kalman filter — the hidden-state idea, the state-transition and observation equations, the predict-update recursion, the Kalman gain intuition, applications (tracking, sensor fusion), and nonlinear extensions. Advanced tier, building on Rin Huang's time-series, Bayesian and streaming pages.",
    course: "State-Space Models & the Kalman Filter",
    courseCode: "Advanced · recursive estimation",
    level: "Master's+",
    learned: "Statistics & signals",
    applied: "Online tracking & smoothing",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "The hidden true state" },
      { id: "statespace", label: "Two equations" },
      { id: "loop", label: "Predict, then update" },
      { id: "gain", label: "The Kalman gain" },
      { id: "uses", label: "Where it's used" },
      { id: "nonlinear", label: "Beyond linear-Gaussian" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/time-series-analysis", label: "Time Series Analysis" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "状态空间模型与卡尔曼滤波",
    subtitle:
      "每一个带噪声的测量背后，都有一个你无法直接看见的真实值。卡尔曼滤波实时地把它恢复出来——把你预测的与你测量的融合起来，各自按它有多值得被信任来加权。",
    description:
      "对状态空间模型与卡尔曼滤波的详尽、实用讲解——隐藏状态的想法、状态转移方程与观测方程、预测-更新递归、卡尔曼增益的直觉、应用（跟踪、传感器融合），以及非线性扩展。进阶层，建立在 Rin Huang 的时间序列、贝叶斯与流式分析页之上。",
    course: "状态空间模型与卡尔曼滤波",
    courseCode: "进阶 · 递归估计",
    level: "硕士及以上",
    learned: "统计学与信号",
    applied: "在线跟踪与平滑",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "隐藏的真实状态" },
      { id: "statespace", label: "两个方程" },
      { id: "loop", label: "先预测，再更新" },
      { id: "gain", label: "卡尔曼增益" },
      { id: "uses", label: "它用在哪里" },
      { id: "nonlinear", label: "超越线性-高斯" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/time-series-analysis", label: "时间序列分析" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "kalman-filter", updated: "2026-06-26", ...meta, Body };
}
