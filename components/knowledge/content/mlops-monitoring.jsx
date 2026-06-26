import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/mlops-monitoring.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the MLOps-loop figure's text labels are
 * localised; geometry is internal. The ⚠ glyph + the red retrain box are kept.
 */

const STAGE_X = [40, 165, 290]; // train, deploy, monitor

function MlopsLoopFigure({ caption, ariaLabel, stageLabels, driftLabel, retrainLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {STAGE_X.map((x, i) => (
          <g key={i}>
            <rect x={x} y="30" width="86" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <text x={x + 43} y="48" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{stageLabels[i]}</text>
            {i < 2 && <line x1={x + 86} y1="44" x2={x + 125} y2="44" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#mah)" />}
          </g>
        ))}
        {/* drift alarm on monitor */}
        <text x="333" y="76" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">{driftLabel}</text>
        {/* retrain box */}
        <rect x="165" y="104" width="86" height="28" rx="4" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="208" y="122" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#FF3C3C">{retrainLabel}</text>
        {/* monitor -> retrain */}
        <line x1="333" y1="58" x2="251" y2="112" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#mahr)" />
        {/* retrain -> deploy */}
        <line x1="208" y1="104" x2="208" y2="60" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#mahr)" />
        <defs>
          <marker id="mah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
          <marker id="mahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
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
        Training a model that scores well is the part everyone learns. Getting it into the real
        world and keeping it useful is the part that decides whether any of that effort matters —
        and it's far harder. A model isn't a finished artifact like a report; it's a living thing
        whose accuracy <strong>decays over time</strong> as the world it was trained on drifts away.{" "}
        <Term>MLOps</Term> (machine-learning operations) is the discipline of deploying, monitoring,
        and maintaining models in production so they keep doing their job.
      </p>
      <p>
        This is the deployed-model companion to the{" "}
        <Link href="/knowledge/reproducibility">reproducibility</Link> page: that one is about
        making the <em>analysis</em> re-runnable; this is about keeping a <em>live model</em>{" "}
        trustworthy after it ships. It matters anywhere a model informs ongoing decisions rather
        than a one-off answer — and the central, easily-missed truth is that deployment is the{" "}
        <em>start</em> of the work, not the end.
      </p>

      <KSection id="gap" eyebrow="01" title="The last-mile gap">
        <p>
          There's a well-known, sobering statistic in the field: a large share of models that get
          built never make it into production at all. The gap between "it works in my notebook" and
          "it runs reliably, serves real users, and stays accurate" is enormous, and it's mostly
          engineering and operations rather than modelling. MLOps is the set of practices — borrowed
          from software's DevOps — that close that gap.
        </p>
        <p>
          The mindset shift is the important part: a deployed model is a{" "}
          <strong>system to be operated</strong>, not a result to be filed. It needs versioning,
          testing, monitoring, and a plan for the day its performance slips — because that day is
          coming.
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="The model lifecycle is a loop">
        <p>
          The defining idea of MLOps is that a model's life isn't a line ending at deployment — it's
          a <strong>loop</strong>: train, deploy, monitor, and (when it decays) retrain, around and
          around. Deployment isn't the finish; it's one station on a cycle that keeps turning for as
          long as the model is in use.
        </p>
        <MlopsLoopFigure
          caption="The MLOps loop. Train → deploy → monitor → and when monitoring detects drift or decay, retrain and redeploy. Unlike a one-off analysis, a live model runs this cycle continuously; the monitor is what triggers the next turn."
          ariaLabel="A cycle of four boxes: train, deploy, monitor, retrain, looping back to deploy, with a drift alarm on the monitor step."
          stageLabels={["train", "deploy", "monitor"]}
          driftLabel="⚠ drift"
          retrainLabel="retrain"
        />
      </KSection>

      <KSection id="deploy" eyebrow="03" title="Ways to deploy">
        <p>
          Getting a model to where it can make predictions takes a few common shapes, and the choice
          depends on how the predictions are used:
        </p>
        <ul>
          <li>
            <Term>Batch</Term> — run the model on a schedule over a pile of data (score every case
            overnight). Simple and robust; fine when predictions aren't needed instantly.
          </li>
          <li>
            <Term>Real-time / API</Term> — wrap the model in a service that answers one request at a
            time, on demand. Needed when a decision happens live, but more moving parts.
          </li>
          <li>
            <Term>Shadow deployment</Term> — run a new model alongside the old one, comparing its
            predictions without acting on them, to build confidence before the switch.
          </li>
        </ul>
      </KSection>

      <KSection id="drift" eyebrow="04" title="Why models rot: drift">
        <p>
          Here's the fact that makes monitoring non-negotiable:{" "}
          <strong>
            a model's accuracy decays over time, even though the model itself never changes.
          </strong>{" "}
          It was trained on a snapshot of the world, and the world moves on. This is{" "}
          <Term>drift</Term>, and it comes in two flavours worth telling apart:
        </p>
        <ul>
          <li>
            <Term>Data drift</Term> — the <em>input</em> distribution shifts. New kinds of
            customers, a changed process, a different season — the data flowing in no longer looks
            like the training data, even if the underlying relationships hold.
          </li>
          <li>
            <Term>Concept drift</Term> — the <em>relationship</em> between inputs and the target
            changes. What predicted fraud last year doesn't this year because the fraudsters
            adapted. The rules of the game itself have moved, which is the more dangerous kind.
          </li>
        </ul>
        <p>
          Both quietly erode performance, and neither shows up unless you're watching for it. A
          model that was excellent at launch can be quietly worthless a year later — connecting
          directly to the <Link href="/knowledge/time-series-analysis">model-staleness</Link>{" "}
          warning from the time-series page and the evolving-target problem from{" "}
          <Link href="/knowledge/anomaly-detection">anomaly detection</Link>.
        </p>
      </KSection>

      <KSection id="monitor" eyebrow="05" title="What to monitor">
        <p>
          Monitoring an ML system means watching more than whether the server is up. The layers,
          from easiest to most valuable:
        </p>
        <ul>
          <li>
            <Term>Operational health</Term> — latency, errors, uptime. Standard software monitoring;
            necessary but not sufficient.
          </li>
          <li>
            <Term>Input distributions</Term> — watch the incoming features for data drift. This is
            the earliest warning, available immediately, before you even know if predictions went
            wrong.
          </li>
          <li>
            <Term>Predictions</Term> — track the distribution of what the model outputs; a sudden
            shift is a red flag.
          </li>
          <li>
            <Term>Outcomes</Term> — the gold standard: compare predictions to what actually
            happened. The catch is <Term>label lag</Term> — the truth often arrives weeks or months
            later (did the flagged case really turn out to be fraud?), so accuracy can only be
            confirmed in arrears.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            That label lag is exactly why <strong>input drift monitoring matters so much</strong>:
            you can detect that the world has shifted <em>today</em>, long before you can measure
            that accuracy has dropped. Watching the inputs buys you a head start on the rot.
          </p>
        </Callout>
      </KSection>

      <KSection id="skew" eyebrow="06" title="Training-serving skew">
        <p>
          A subtle, common production bug: <Term>training-serving skew</Term> — the data the model
          sees in production is processed differently from the data it trained on. A feature
          computed one way in the training notebook and another way in the live service means the
          model is, in effect, being fed inputs it never learned from, and it underperforms for
          reasons that have nothing to do with the model itself.
        </p>
        <p>
          The standard defence is a <Term>feature store</Term> — a single, shared definition of each
          feature used identically for both training and serving, so the two can't drift apart. It's
          the production cousin of the <Link href="/knowledge/feature-engineering">leakage</Link>{" "}
          and <Link href="/knowledge/reproducibility">reproducibility</Link> disciplines: the same
          transformation, applied the same way, every time.
        </p>
      </KSection>

      <KSection id="retrain" eyebrow="07" title="When to retrain">
        <p>
          Drift's answer is retraining on fresh data — but <em>when</em>? Two strategies, often
          combined:
        </p>
        <ul>
          <li>
            <Term>Scheduled</Term> — retrain on a fixed cadence (monthly, quarterly). Simple and
            predictable, but may retrain needlessly or too late.
          </li>
          <li>
            <Term>Triggered</Term> — retrain when monitoring detects drift or a performance drop
            crossing a threshold. More responsive, and the direction modern MLOps favours — the
            monitor itself decides when the next turn of the loop begins.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Retraining isn't a free reset, though. Each new model needs the same{" "}
            <Link href="/knowledge/model-evaluation">validation</Link> as the original — an
            automatically retrained model that quietly got <em>worse</em>, or learned from corrupted
            recent data, and was deployed without checks is its own failure mode. And keep a{" "}
            <strong>rollback</strong> path and, for consequential decisions, a{" "}
            <strong>human in the loop</strong>: automation should surface and propose, not silently
            swap a worse model into production.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Keeping a deployed model honest">
          <p>
            Any analytical model that informs <em>ongoing</em> decisions — rather than answering a
            question once — lives or dies on this. In a government setting that makes monitoring a
            matter of trustworthiness, not just engineering hygiene: a model quietly{" "}
            <strong>drifting</strong> out of accuracy is making worse and worse calls while still
            looking authoritative, and the only defence is watching the inputs and outcomes
            deliberately. The <strong>data-vs-concept drift</strong> distinction tells me whether
            the inputs have shifted or the world's rules have, which points to different fixes.
          </p>
          <p>
            It's the operational bookend to the rest of this section: the{" "}
            <Link href="/knowledge/model-evaluation">evaluation</Link> that proved the model good at
            launch has to be <em>re-run</em> as it ages, the{" "}
            <Link href="/knowledge/reproducibility">reproducible pipeline</Link> is what makes a
            clean retrain possible, and a <strong>human in the loop</strong> with a rollback path
            keeps the automation accountable. A model you deploy and forget is a liability waiting
            to surface.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A notebook model is half the job — <strong>most models never ship</strong>. MLOps
              closes the gap and treats a deployed model as a <strong>system to operate</strong>.
            </li>
            <li>
              The lifecycle is a <strong>loop</strong>: train → deploy → monitor → retrain. Deploy
              patterns: <strong>batch, real-time/API, shadow</strong>.
            </li>
            <li>
              Models <strong>rot</strong> via <strong>drift</strong>: <strong>data drift</strong>{" "}
              (inputs shift) vs <strong>concept drift</strong> (the input-output relationship
              changes — the worse kind).
            </li>
            <li>
              Monitor more than uptime: <strong>input distributions</strong> (earliest warning),{" "}
              <strong>predictions</strong>, and <strong>outcomes</strong> (gold standard, but{" "}
              <strong>label lag</strong> delays it).
            </li>
            <li>
              Beware <strong>training-serving skew</strong> — fix with a{" "}
              <strong>feature store</strong> (one definition for train and serve).
            </li>
            <li>
              Retrain on a <strong>schedule</strong> or <strong>triggered by drift</strong> — but
              re-validate every retrain, and keep a <strong>rollback + human in the loop</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The data-vs-concept-drift distinction, input-distribution monitoring, training-serving
          skew, and triggered-retraining practice reflect current MLOps references alongside
          hands-on work.
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
        训练一个分数漂亮的模型，是人人都会学的那部分。把它送进真实世界、并让它保持有用，才是决定那些
        努力到底有没有意义的那部分——而它难得多。一个模型不是一份像报告那样完成了的产物；它是一个活物，
        它的准确度随着它所训练的那个世界渐行渐远而<strong>随时间衰减</strong>。<Term>MLOps</Term>
        （机器学习运营）是在生产中部署、监控、维护模型，让它们持续干活的那门学科。
      </p>
      <p>
        这是<Link href="/knowledge/reproducibility">可复现性</Link>页的「已部署模型」伴侣：那一页关于让
        <em>分析</em>可重跑；这一页关于在一个<em>活模型</em>上线之后保持它可信。它在任何模型为持续的决策、
        而非一次性答案提供依据之处都要紧——而那个核心的、容易被错过的真相是：部署是工作的<em>开始</em>，
        而非结束。
      </p>

      <KSection id="gap" eyebrow="01" title="最后一公里的鸿沟">
        <p>
          这个领域里有一个著名而发人深省的统计数字：被构建出来的模型，有很大一部分从未真正进入生产。「它
          在我笔记本里能跑」与「它可靠地运行、服务真实用户、并保持准确」之间的鸿沟是巨大的，而它大多是
          工程与运营，而非建模。MLOps 是那套——从软件的 DevOps 借来的——弥合那道鸿沟的实践。
        </p>
        <p>
          心态的转变才是重要的部分：一个已部署的模型是一个<strong>要去运营的系统</strong>，而非一个要
          归档的结果。它需要版本控制、测试、监控，以及一个应对它表现下滑那一天的计划——因为那一天总会来。
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="模型生命周期是一个循环">
        <p>
          MLOps 的决定性想法是：一个模型的生命不是一条终止于部署的直线——它是一个<strong>循环</strong>：
          训练、部署、监控、（当它衰减时）重新训练，一圈又一圈。部署不是终点；它是一个只要模型还在用就
          一直转动的循环上的一站。
        </p>
        <MlopsLoopFigure
          caption="MLOps 循环。训练 → 部署 → 监控 → 而当监控检测到漂移或衰减时，重新训练并重新部署。与一次性的分析不同，一个活模型持续运行这个循环；监控正是触发下一圈的东西。"
          ariaLabel="四个框的循环：训练、部署、监控、重新训练，再循环回部署，监控这一步上有一个漂移警报。"
          stageLabels={["训练", "部署", "监控"]}
          driftLabel="⚠ 漂移"
          retrainLabel="重新训练"
        />
      </KSection>

      <KSection id="deploy" eyebrow="03" title="部署的方式">
        <p>把一个模型送到它能做预测的地方，有几种常见的形态，而选择取决于预测如何被使用：</p>
        <ul>
          <li>
            <Term>批处理</Term>——按计划在一堆数据上运行模型（隔夜给每个个案打分）。简单而稳健；在不需要
            即时预测时很好。
          </li>
          <li>
            <Term>实时 / API</Term>——把模型包进一个服务里，按需一次回答一个请求。当一个决策实时发生时
            需要它，但活动部件更多。
          </li>
          <li>
            <Term>影子部署</Term>——让一个新模型与旧的并排运行，比较它的预测而不据以行动，以在切换之前
            建立信心。
          </li>
        </ul>
      </KSection>

      <KSection id="drift" eyebrow="04" title="模型为何腐烂：漂移">
        <p>
          这就是让监控没得商量的那个事实：<strong>一个模型的准确度随时间衰减，尽管模型本身从不改变。
          </strong>它是在世界的一张快照上训练的，而世界继续向前。这就是<Term>漂移</Term>，它有两种值得
          区分开来的味道：
        </p>
        <ul>
          <li>
            <Term>数据漂移</Term>——<em>输入</em>的分布移动了。新种类的客户、一个改变了的流程、一个不同的
            季节——流进来的数据不再像训练数据，即便底层的关系仍然成立。
          </li>
          <li>
            <Term>概念漂移</Term>——输入与目标之间的<em>关系</em>变了。去年能预测欺诈的，今年不能了，因为
            欺诈者适应了。游戏本身的规则移动了，而这是更危险的那种。
          </li>
        </ul>
        <p>
          两者都悄悄侵蚀表现，而除非你盯着，否则哪一个都不会显现。一个上线时优秀的模型，一年后可能悄悄
          变得一文不值——直接连到时间序列页的<Link href="/knowledge/time-series-analysis">模型陈旧</Link>
          告诫，以及<Link href="/knowledge/anomaly-detection">异常检测</Link>里那个不断演化的目标问题。
        </p>
      </KSection>

      <KSection id="monitor" eyebrow="05" title="监控什么">
        <p>监控一个机器学习系统，意味着盯着的不只是服务器是否在线。那些层，从最容易到最有价值：</p>
        <ul>
          <li>
            <Term>运营健康</Term>——延迟、错误、在线时长。标准的软件监控；必要但不充分。
          </li>
          <li>
            <Term>输入分布</Term>——盯着进来的特征以发现数据漂移。这是最早的警告，立刻就有，甚至在你知道
            预测是否出错之前。
          </li>
          <li>
            <Term>预测</Term>——追踪模型输出的分布；一个突然的移动是一面红旗。
          </li>
          <li>
            <Term>结果</Term>——黄金标准：把预测与实际发生的相比较。难处是<Term>标签滞后</Term>——真相
            往往在几周或几个月后才到（被标记的个案真的原来是欺诈吗？），所以准确度只能事后确认。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            那个标签滞后，恰恰是为什么<strong>输入漂移监控如此重要</strong>：你能<em>今天</em>就检测出
            世界已经移动，远在你能测出准确度下降之前。盯着输入，让你在腐烂面前抢得先机。
          </p>
        </Callout>
      </KSection>

      <KSection id="skew" eyebrow="06" title="训练-服务偏斜">
        <p>
          一个微妙而常见的生产 bug：<Term>训练-服务偏斜</Term>——模型在生产中看到的数据，与它训练时的
          数据被以不同的方式处理。一个特征在训练笔记本里以一种方式计算、在活服务里以另一种方式计算，就
          意味着模型实际上被喂入了它从未学过的输入，而它表现欠佳的原因，与模型本身毫无关系。
        </p>
        <p>
          标准的防御是一个<Term>特征存储</Term>——每个特征的一个单一、共享的定义，对训练与服务都被同样地
          使用，好让两者无法分道扬镳。它是<Link href="/knowledge/feature-engineering">泄漏</Link>与
          <Link href="/knowledge/reproducibility">可复现性</Link>纪律在生产中的表亲：同样的转换，以同样的
          方式，每一次都如此。
        </p>
      </KSection>

      <KSection id="retrain" eyebrow="07" title="何时重新训练">
        <p>漂移的答案是在新鲜的数据上重新训练——但<em>何时</em>？两种策略，常常结合使用：</p>
        <ul>
          <li>
            <Term>定时</Term>——按固定的节奏重新训练（每月、每季）。简单而可预测，但可能不必要地重新
            训练、或太晚。
          </li>
          <li>
            <Term>触发</Term>——当监控检测到漂移、或一次表现下降越过一个阈值时重新训练。更灵敏，也是现代
            MLOps 偏好的方向——监控自己决定循环的下一圈何时开始。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            不过，重新训练不是一次免费的重置。每一个新模型都需要和原来一样的
            <Link href="/knowledge/model-evaluation">验证</Link>——一个自动重新训练、却悄悄变得<em>更差
            </em>、或从被污染的近期数据中学习、又未经检查就被部署的模型，是它自己的一种失败模式。而且要
            保留一条<strong>回滚</strong>路径，并且，对有后果的决策，让一个<strong>人留在回路里</strong>：
            自动化应当呈现并提议，而非悄悄地把一个更差的模型换进生产。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="让一个已部署的模型保持诚实">
          <p>
            任何为<em>持续</em>的决策——而非回答一次问题——提供依据的分析模型，存亡都系于此。在政府的
            环境里，这让监控成为一个可信赖性的问题，而不只是工程卫生：一个悄悄<strong>漂移</strong>出
            准确度的模型，在仍然看起来权威的同时，做出越来越糟的判断，而唯一的防御，是刻意地盯着输入与
            结果。<strong>数据漂移对概念漂移</strong>的区分，告诉我是输入移动了、还是世界的规则变了，而
            这指向不同的修法。
          </p>
          <p>
            它是本板块其余部分在运营端的另一个书挡：那个在上线时证明模型好的
            <Link href="/knowledge/model-evaluation">评估</Link>，必须随它变老而被<em>重跑</em>；那条
            <Link href="/knowledge/reproducibility">可复现的流水线</Link>，是让一次干净的重新训练成为
            可能的东西；而一个带回滚路径、人在回路的安排，让自动化保持可问责。一个你部署完就忘掉的模型，
            是一个等着浮现的隐患。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个笔记本里的模型是工作的一半——<strong>大多数模型从不上线</strong>。MLOps 弥合那道鸿沟，
              并把一个已部署的模型当作一个<strong>要去运营的系统</strong>。
            </li>
            <li>
              生命周期是一个<strong>循环</strong>：训练 → 部署 → 监控 → 重新训练。部署模式：<strong>批
              处理、实时/API、影子</strong>。
            </li>
            <li>
              模型通过<strong>漂移</strong>腐烂：<strong>数据漂移</strong>（输入移动）对<strong>概念漂移
              </strong>（输入-输出关系改变——更糟的那种）。
            </li>
            <li>
              盯着的不只是在线时长：<strong>输入分布</strong>（最早的警告）、<strong>预测</strong>，以及
              <strong>结果</strong>（黄金标准，但<strong>标签滞后</strong>会推迟它）。
            </li>
            <li>
              当心<strong>训练-服务偏斜</strong>——用一个<strong>特征存储</strong>修它（训练与服务用同一个
              定义）。
            </li>
            <li>
              按<strong>计划</strong>、或由<strong>漂移触发</strong>来重新训练——但每次重新训练都要重新
              验证，并保留<strong>回滚 + 人在回路</strong>。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          数据漂移对概念漂移的区分、输入分布监控、训练-服务偏斜，以及触发式重新训练的实务，反映了当前的
          MLOps 参考文献以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "MLOps & Model Monitoring",
    subtitle:
      "A model that works in a notebook is barely half the job. The hard, unglamorous part is keeping it working in the real world — where the data shifts, the world changes, and a model silently rots if no one is watching.",
    description:
      "A thorough, practical explainer of MLOps and model monitoring — the gap between a notebook model and a production one, the model lifecycle, deployment patterns, model drift (data drift vs concept drift), what to monitor, training-serving skew, and when to retrain. In-Practice tier, anchored to Rin Huang's government-analyst work.",
    course: "MLOps & Model Monitoring",
    courseCode: "In practice · the deployed lifecycle",
    level: "Professional",
    learned: "Gov analysis · ongoing",
    applied: "Keeping models trustworthy",
    readingTime: "~14 min read",
    sections: [
      { id: "gap", label: "The last-mile gap" },
      { id: "lifecycle", label: "The model lifecycle" },
      { id: "deploy", label: "Ways to deploy" },
      { id: "drift", label: "Why models rot: drift" },
      { id: "monitor", label: "What to monitor" },
      { id: "skew", label: "Training-serving skew" },
      { id: "retrain", label: "When to retrain" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/reproducibility", label: "Reproducibility & Analytical Pipelines" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "MLOps 与模型监控",
    subtitle:
      "一个在笔记本里能跑的模型，勉强只是工作的一半。困难而不光鲜的部分，是让它在真实世界里持续运作——那里数据会变、世界会变，而如果没人盯着，一个模型会悄悄腐烂。",
    description:
      "对 MLOps 与模型监控的详尽、实用讲解——笔记本里的模型与生产模型之间的鸿沟、模型生命周期、部署模式、模型漂移（数据漂移与概念漂移）、监控什么、训练-服务偏斜，以及何时重新训练。实务层，锚定 Rin Huang 的政府分析师工作。",
    course: "MLOps 与模型监控",
    courseCode: "实务 · 部署后的生命周期",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "让模型保持可信",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "gap", label: "最后一公里的鸿沟" },
      { id: "lifecycle", label: "模型生命周期" },
      { id: "deploy", label: "部署的方式" },
      { id: "drift", label: "模型为何腐烂：漂移" },
      { id: "monitor", label: "监控什么" },
      { id: "skew", label: "训练-服务偏斜" },
      { id: "retrain", label: "何时重新训练" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/reproducibility", label: "可复现性与分析流水线" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "mlops-monitoring", updated: "2026-06-26", ...meta, Body };
}
