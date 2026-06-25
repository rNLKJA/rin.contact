import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/applied-data-science.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths on this page.
 */

// Fixed node positions for the CRISP-DM ring; labels[i] supplies the text.
// Order: problem, data, prepare, model, evaluate, deploy. Accent = model/evaluate (i 3,4).
const CRISP_POS = [
  { x: 220, y: 26 },
  { x: 360, y: 70 },
  { x: 360, y: 150 },
  { x: 220, y: 178 },
  { x: 80, y: 150 },
  { x: 80, y: 70 },
];

function CrispFigure({ caption, ariaLabel, labels, iterateLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 200"
        className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {CRISP_POS.map((n, i) => {
          const next = CRISP_POS[(i + 1) % CRISP_POS.length];
          return (
            <line
              key={`l${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="#FF3C3C"
              strokeWidth="1"
              opacity="0.35"
            />
          );
        })}
        {CRISP_POS.map((n, i) => {
          const accent = i === 3 || i === 4;
          return (
            <g key={`n${i}`}>
              <rect
                x={n.x - 40}
                y={n.y - 13}
                width="80"
                height="26"
                rx="13"
                fill={accent ? "#FF3C3C" : "none"}
                fillOpacity={accent ? 0.12 : 0}
                stroke="#FF3C3C"
                strokeWidth={accent ? 1.4 : 1}
                opacity={accent ? 1 : 0.7}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fill="currentColor"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
        <text
          x="220"
          y="108"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.5"
        >
          {iterateLabel}
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
        Every other page in this section teaches a tool —{" "}
        <Link href="/knowledge/linear-algebra">the maths</Link>,{" "}
        <Link href="/knowledge/statistics">the statistics</Link>,{" "}
        <Link href="/knowledge/statistical-machine-learning">the models</Link>,{" "}
        <Link href="/knowledge/database-systems">the systems</Link>.{" "}
        <Term>Applied data science</Term> is the page about how those tools fit together into an
        actual project: the messy, end-to-end journey from a half-formed business question to a
        decision someone makes because of your work. The tools are necessary; knowing how to run the
        project around them is what makes a data scientist effective.
      </p>
      <p>
        The single most important idea here — and the one that's genuinely mine — is{" "}
        <strong>problem-first, not model-first</strong>. Start from the decision that needs making
        and the smallest amount of data to make it well, then reach for the right tool rather than
        the fashionable one. This page is the synthesis of everything else, organised around that
        principle.
      </p>

      <KSection id="what" eyebrow="01" title="Decisions, not models">
        <p>
          It's easy to think data science is about building models. It isn't — it's about{" "}
          <em>improving decisions</em> with data, and a model is just one possible means to that
          end. A great many problems are solved with a clear chart, a well-framed metric, or a
          simple query, no model in sight. Mistaking the tool (modelling) for the goal (a better
          decision) is the most common and most expensive error in the field.
        </p>
        <p>
          So applied data science is judged by impact, not sophistication. A simple analysis that
          changes what someone does beats an elegant model that sits unused. That reframing — from
          "what can I build?" to "what decision can I improve, and what's the least I need to do
          it?" — is the whole mindset.
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="The project lifecycle">
        <p>
          Real projects follow a recognisable arc, captured by frameworks like <Term>CRISP-DM</Term>{" "}
          (Cross-Industry Standard Process for Data Mining). Its six phases are a useful map — as
          long as you remember the most important thing about them:{" "}
          <strong>it's a loop, not a line</strong>. You constantly circle back as what you learn in
          one phase reshapes an earlier one.
        </p>

        <CrispFigure
          caption="The CRISP-DM cycle. Understand the problem → understand the data → prepare it → model → evaluate → deploy — looping back continually as findings reshape earlier steps. The arrows go both ways; real projects are iterative, not linear."
          ariaLabel="Six phases arranged in a circle: business understanding, data understanding, data preparation, modelling, evaluation, deployment, connected by arrows forming a loop."
          labels={["problem", "data", "prepare", "model", "evaluate", "deploy"]}
          iterateLabel="iterate"
        />
      </KSection>

      <KSection id="question" eyebrow="03" title="Framing the right question">
        <p>
          The first phase decides whether the project succeeds, and it has nothing to do with code.{" "}
          <Term>Business understanding</Term> means translating a vague ask ("can we use AI here?")
          into a precise, answerable question tied to a decision: what choice will change based on
          the answer, what would "good" look like, and what's the simplest result that would be
          useful?
        </p>
        <p>
          This is where most projects quietly fail — not in the modelling, but in solving the wrong
          problem precisely. A brilliant answer to the wrong question is worth nothing, so the
          discipline is to push back, clarify, and reframe <em>before</em> touching the data. Get
          this right and the rest is execution; get it wrong and no amount of technical skill saves
          you.
        </p>
      </KSection>

      <KSection id="datamodel" eyebrow="04" title="Data and modelling">
        <p>
          The middle of the project is the craft the other pages cover — and applied data science is
          mostly about doing them in the right order and not skipping the unglamorous parts:
        </p>
        <ul>
          <li>
            <Term>Understand &amp; prepare the data</Term> — explore it, then clean and shape it.
            This is the <Link href="/knowledge/elements-of-data-processing">data processing</Link>{" "}
            work, and it's still the bulk of the effort; the data usually lives in a{" "}
            <Link href="/knowledge/database-systems">database</Link> you query with SQL.
          </li>
          <li>
            <Term>Model</Term> — pick the simplest method that fits the question, whether that's a{" "}
            <Link href="/knowledge/linear-statistical-models">regression</Link>, a{" "}
            <Link href="/knowledge/statistical-machine-learning">machine-learning model</Link>, or
            just a well-chosen statistic. Start with a baseline.
          </li>
          <li>
            <Term>Evaluate</Term> — honestly, on held-out data, with a metric that matches the
            real-world cost of being wrong (the lesson from the{" "}
            <Link href="/knowledge/statistics">statistics</Link> and ML pages). And evaluate against
            the <em>decision</em>, not just the leaderboard.
          </li>
        </ul>
        <p>
          The applied skill isn't knowing every algorithm — it's choosing the least complex one that
          answers the question, and resisting the pull to over-engineer.
        </p>
      </KSection>

      <KSection id="deploy" eyebrow="05" title="Deployment and monitoring">
        <p>
          A result that never leaves your laptop changes nothing. <Term>Deployment</Term> is putting
          the work where it makes a difference — a{" "}
          <Link href="/knowledge/web-information-technology">dashboard</Link> a stakeholder uses, a
          report in a decision meeting, a model wired into a system. This is often the hardest,
          least-taught part, and where data science meets real engineering.
        </p>
        <p>
          And deployment isn't the end, because{" "}
          <strong>a model is a product, not a deliverable</strong>. The world changes, so the data
          feeding the model <em>drifts</em> away from what it was trained on, and performance
          silently decays. So you <Term>monitor</Term> it in production and <Term>retrain</Term>{" "}
          when it slips — the data-drift lesson from the ML side. The job continues long after the
          first version ships.
        </p>
      </KSection>

      <KSection id="communicate" eyebrow="06" title="Communicating the result">
        <p>
          The most under-valued skill in the whole pipeline: a correct analysis nobody understands
          or trusts has zero impact. <Term>Communication</Term> — translating technical findings
          into a clear story a decision-maker can act on — is what converts good analysis into a
          good decision. It's important enough to have its own page (Science Communication), but it
          belongs in the lifecycle too: you should be thinking about how you'll explain the result
          from the very first phase, because it shapes what's worth doing.
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="07" title="Ethics and reproducibility">
        <p>
          Working with data carries responsibility, and two threads run through every phase.{" "}
          <Term>Reproducibility</Term> means the whole path from raw data to result is code anyone
          can re-run to get the same answer — the standard from the{" "}
          <Link href="/knowledge/elements-of-data-processing">data processing</Link> page, and what
          makes work auditable and trustworthy. <Term>Ethics</Term> means taking seriously the bias,
          privacy, fairness, and consequences of what you build — a model trained on biased data
          entrenches that bias, and in government and health work the stakes are real people. These
          aren't a final checklist; they're constraints you carry from the first question to the
          last deployment.
        </p>
      </KSection>

      <KSection id="philosophy" eyebrow="08" title="Problem-first">
        <p>
          Tie it all together and you get a philosophy, not just a process.{" "}
          <strong>Problem-first, not model-first</strong>: begin with the decision, find the minimum
          data and the simplest method to make it well, and value impact over sophistication. It's
          what lets the same person be useful in a research lab, a government intelligence team, and
          an engineering project — because the framework is constant even as the tools change.
        </p>
        <Callout type="intuition">
          <p>
            The whole section maps onto this one page: the maths and stats are the <em>methods</em>,
            the systems pages are <em>where it runs</em>, the ML and modelling pages are{" "}
            <em>the modelling phase</em> — and applied data science is the loop that strings them
            into a project aimed at a real decision. Every tool here is in service of that.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The thread through every role">
          <p>
            This is the closest thing I have to a personal operating principle, and it's the same in
            every role I've held —{" "}
            <strong>
              start from the decision that needs making and the minimum data to make it well
            </strong>
            , then reach for the right tool, not the fashionable one. It's why I can move between a
            research lab, a government intelligence team, and a startup: the maths and models
            change, but the problem-first lifecycle doesn't.
          </p>
          <p>
            In practice it shows up as restraint and as follow-through — pushing back to{" "}
            <strong>frame the real question</strong> before building anything, reaching for the{" "}
            <strong>simplest method</strong> that answers it, evaluating against the{" "}
            <strong>decision</strong> rather than a metric, and treating the result as something
            that has to be <strong>communicated, deployed, and maintained</strong> to matter.
            Generalist by nature, specialist by discipline — this page is what that actually means
            day to day.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Applied data science is about <strong>improving decisions</strong>, not building
              models — a model is one means, often not the right one. Judge by impact, not
              sophistication.
            </li>
            <li>
              The <strong>lifecycle</strong> (CRISP-DM): understand the problem → the data → prepare
              → model → evaluate → deploy. It's a <strong>loop, not a line</strong>.
            </li>
            <li>
              <strong>Framing the right question</strong> is where projects succeed or fail — a
              brilliant answer to the wrong question is worthless.
            </li>
            <li>
              Data prep is most of the work; pick the <strong>simplest model</strong> that fits;{" "}
              <strong>evaluate honestly</strong> against the decision.
            </li>
            <li>
              <strong>Deploy</strong> (or it changes nothing) and <strong>monitor</strong> — a model
              is a product that drifts and needs retraining. <strong>Communicate</strong> or it has
              no impact.
            </li>
            <li>
              Carry <strong>reproducibility and ethics</strong> throughout. The throughline:{" "}
              <strong>problem-first, not model-first</strong>.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        本板块的每一页都教一件工具——<Link href="/knowledge/linear-algebra">数学</Link>、
        <Link href="/knowledge/statistics">统计</Link>、
        <Link href="/knowledge/statistical-machine-learning">模型</Link>、
        <Link href="/knowledge/database-systems">系统</Link>。<Term>应用数据科学</Term>这一页
        讲的是这些工具如何拼合成一个真实的项目：从一个半成形的业务问题，到某人因你的工作而
        做出的一个决策，这段杂乱的、端到端的旅程。工具是必要的；而懂得如何把项目围绕它们运转
        起来，才是让一名数据科学家有效的东西。
      </p>
      <p>
        这里最重要的单一想法——也是真正属于我自己的那个——是<strong>问题优先，而非模型优先</strong>
        。从需要做出的决策、以及做好它所需的最少数据出发，再去拿对的工具，而不是
        时髦的工具。这一页是其余一切的综合，围绕那条原则来组织。
      </p>

      <KSection id="what" eyebrow="01" title="决策，而非模型">
        <p>
          人们很容易以为数据科学是关于构建模型的。它不是——它是关于<em>用数据改进决策</em>，而
          模型只是达成那个目的的一种可能手段。极多的问题靠一张清晰的图表、一个框定得当的指标，
          或一次简单的查询就解决了，根本不见模型的影子。把工具（建模）误当成目标（一个更好的
          决策），是这个领域里最常见、也最昂贵的错误。
        </p>
        <p>
          所以应用数据科学是以影响、而非精巧来评判的。一个改变了某人行为的简单分析，胜过一个
          搁置不用的优雅模型。那一次重新取景——从「我能构建什么？」到「我能改进哪个决策，以及
          做到这点我最少需要什么？」——就是全部的心态。
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="项目生命周期">
        <p>
          真实的项目遵循一条可辨认的弧线，被诸如 <Term>CRISP-DM</Term>（跨行业数据挖掘标准
          流程）这样的框架所刻画。它的六个阶段是一张有用的地图——只要你记住关于它们最重要的 一点：
          <strong>它是一个循环，而非一条直线</strong>。你会不断地绕回去，因为你在一个
          阶段里学到的东西，会重塑更早的某个阶段。
        </p>

        <CrispFigure
          caption="CRISP-DM 循环。理解问题 → 理解数据 → 准备数据 → 建模 → 评估 → 部署——并随着发现重塑更早的步骤而不断绕回。箭头是双向的；真实的项目是迭代的，而非线性的。"
          ariaLabel="六个阶段排成一个圆：业务理解、数据理解、数据准备、建模、评估、部署，由箭头连成一个循环。"
          labels={["问题", "数据", "准备", "建模", "评估", "部署"]}
          iterateLabel="迭代"
        />
      </KSection>

      <KSection id="question" eyebrow="03" title="框定正确的问题">
        <p>
          第一个阶段决定项目是否成功，而它与代码毫无关系。<Term>业务理解</Term>意味着把一个
          模糊的请求（「我们这儿能用 AI 吗？」）翻译成一个精确、可回答、且与某个决策挂钩的
          问题：答案会改变哪个选择、「好」会是什么样子、以及最简单的、能派上用场的结果是什么？
        </p>
        <p>
          这正是大多数项目悄然失败之处——不在建模，而在精确地解决了错误的问题。对错误问题的一个
          绝妙答案一文不值，所以纪律在于：在碰数据<em>之前</em>，去回推、澄清、重新框定。把这个
          做对，其余便是执行；把它做错，再多的技术本领也救不了你。
        </p>
      </KSection>

      <KSection id="datamodel" eyebrow="04" title="数据与建模">
        <p>
          项目的中段是其他页面所涵盖的手艺——而应用数据科学很大程度上在于以正确的顺序去做
          它们，并且不跳过那些不光鲜的部分：
        </p>
        <ul>
          <li>
            <Term>理解并准备数据</Term>——先探索它，再清洗并塑形。这是
            <Link href="/knowledge/elements-of-data-processing">数据处理</Link>的工作，仍占去
            大部分功夫；数据通常住在一个你用 SQL 查询的
            <Link href="/knowledge/database-systems">数据库</Link>里。
          </li>
          <li>
            <Term>建模</Term>——挑选最简单的、贴合问题的方法，无论那是一个
            <Link href="/knowledge/linear-statistical-models">回归</Link>、一个
            <Link href="/knowledge/statistical-machine-learning">机器学习模型</Link>，还是
            仅仅一个选得好的统计量。先从一个基线开始。
          </li>
          <li>
            <Term>评估</Term>——诚实地、在留出的数据上、用一个与「出错的现实代价」相匹配的指标 （来自
            <Link href="/knowledge/statistics">统计</Link>页与 ML 页的教训）。并且要对照
            <em>决策</em>来评估，而不只是排行榜。
          </li>
        </ul>
        <p>
          应用的本领不在于懂每一个算法——而在于选出能回答问题的、复杂度最低的那个，并抵住过度
          工程的拉力。
        </p>
      </KSection>

      <KSection id="deploy" eyebrow="05" title="部署与监控">
        <p>
          一个从不离开你笔记本电脑的结果，什么都改变不了。<Term>部署</Term>就是把工作放到它能
          起作用的地方——一个利益相关方会用的
          <Link href="/knowledge/web-information-technology">仪表板</Link>、一份在决策会议上的
          报告、一个接进系统里的模型。这往往是最难、最少被教授的部分，也是数据科学与真正的工程
          相遇之处。
        </p>
        <p>
          而部署并非终点，因为<strong>模型是一个产品，不是一份交付物</strong>。世界在变，所以
          喂给模型的数据会<em>漂移</em>，离开它当初训练时的样子，性能则悄然衰减。于是你在生产中
          <Term>监控</Term>它，并在它下滑时<Term>重训</Term>——来自 ML 一侧的数据漂移教训。在
          第一个版本发布之后，这份工作还会持续很久。
        </p>
      </KSection>

      <KSection id="communicate" eyebrow="06" title="传达结果">
        <p>
          整条流水线中最被低估的技能：一个没人理解或信任的正确分析，影响为零。<Term>沟通</Term>
          ——把技术发现翻译成一个决策者能据以行动的清晰故事——正是把好的分析转化为好的决策的
          东西。它重要到足以拥有自己的一页（科学传播），但它也属于生命周期：你从第一个阶段起就
          应当思考自己将如何解释结果，因为这会塑造什么才值得做。
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="07" title="伦理与可复现性">
        <p>
          与数据打交道带着责任，而有两条线索贯穿每一个阶段。<Term>可复现性</Term>意味着从原始
          数据到结果的整条路径都是任何人都能重跑、得到相同答案的代码——来自
          <Link href="/knowledge/elements-of-data-processing">数据处理</Link>页的标准，也是让
          工作可审计、可信赖的东西。<Term>伦理</Term>意味着认真对待你所构建之物的偏见、隐私、
          公平与后果——一个在有偏数据上训练的模型会把那种偏见固化下来，而在政府与健康工作中，
          赌上的是活生生的人。这些不是一份最后才过的清单；它们是你从第一个问题一直背到最后一次
          部署的约束。
        </p>
      </KSection>

      <KSection id="philosophy" eyebrow="08" title="问题优先">
        <p>
          把这一切串起来，你得到的是一种哲学，而不只是一道流程。
          <strong>问题优先，而非模型 优先</strong>
          ：从决策出发，找出做好它所需的最少数据与最简单的方法，并看重影响胜于
          精巧。正是它让同一个人能在科研实验室、政府情报团队和工程项目里都派上用场——因为即便
          工具在变，框架始终不变。
        </p>
        <Callout type="intuition">
          <p>
            整个板块都映射到这一页上：数学与统计是<em>方法</em>，系统页是<em>它在哪里运行</em>， ML
            与建模页是<em>建模阶段</em>——而应用数据科学是把它们串成一个、瞄准一个真实决策的
            项目的那个循环。这里的每一件工具，都服务于那一点。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="贯穿每一个角色的那条线">
          <p>
            这是我最接近于个人工作准则的东西，在我担任过的每一个角色里都是一样的——
            <strong>从 需要做出的决策、以及做好它所需的最少数据出发</strong>
            ，再去拿对的工具，而非时髦的
            那个。这就是为什么我能在科研实验室、政府情报团队与一家创业公司之间穿梭：数学与模型
            在变，但问题优先的生命周期不变。
          </p>
          <p>
            在实践中，它表现为克制，也表现为善始善终——在构建任何东西之前先回推以
            <strong>框定 真正的问题</strong>，去拿能回答它的<strong>最简单的方法</strong>，对照
            <strong>决策</strong>而非一个指标来评估，并把结果当作一件必须被
            <strong>传达、部署、维护</strong>
            才能产生意义的东西。天性是通才，训练成专才——这一页就是那句话在日常中究竟意味着什么。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              应用数据科学是关于<strong>改进决策</strong>，而非构建模型——模型是一种手段，往往
              不是对的那个。以影响、而非精巧来评判。
            </li>
            <li>
              <strong>生命周期</strong>（CRISP-DM）：理解问题 → 数据 → 准备 → 建模 → 评估 →
              部署。它是一个<strong>循环，而非一条直线</strong>。
            </li>
            <li>
              <strong>框定正确的问题</strong>是项目成败所系——对错误问题的一个绝妙答案毫无价值。
            </li>
            <li>
              数据准备是大部分工作；挑选贴合的<strong>最简单模型</strong>；对照决策
              <strong>诚实 地评估</strong>。
            </li>
            <li>
              <strong>部署</strong>（否则什么都改变不了）并<strong>监控</strong>——模型是一个会
              漂移、需要重训的产品。<strong>传达</strong>，否则它毫无影响。
            </li>
            <li>
              全程背负<strong>可复现性与伦理</strong>。那条贯穿线：
              <strong>问题优先，而非模型 优先</strong>。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Applied Data Science",
    subtitle:
      "The page that ties the rest together. Every other topic here is a tool; this is how they fit into a real project — from a vague question to a decision someone acts on.",
    description:
      "A thorough, first-principles explainer of applied data science — the end-to-end project lifecycle (CRISP-DM), framing the right question, the data and modelling steps, deployment and monitoring, communication, ethics, and the problem-first philosophy. Foundation tier and the connective synthesis page for Rin Huang's knowledge section.",
    course: "Applied Data Science",
    courseCode: "Bachelor of Science · Data Science core (79)",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Every project, end to end",
    readingTime: "~15 min read",
    sections: [
      { id: "what", label: "Decisions, not models" },
      { id: "lifecycle", label: "The project lifecycle" },
      { id: "question", label: "Framing the right question" },
      { id: "datamodel", label: "Data and modelling" },
      { id: "deploy", label: "Deployment and monitoring" },
      { id: "communicate", label: "Communicating the result" },
      { id: "ethics", label: "Ethics and reproducibility" },
      { id: "philosophy", label: "Problem-first" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/elements-of-data-processing", label: "Elements of Data Processing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "应用数据科学",
    subtitle:
      "把其余一切串起来的一页。这里的每个其他主题都是一件工具；而这一页讲的是它们如何嵌进一个真实的项目——从一个模糊的问题，到某人据以行动的一个决策。",
    description:
      "对应用数据科学的详尽、第一性原理式讲解——端到端的项目生命周期（CRISP-DM）、框定正确的问题、数据与建模步骤、部署与监控、沟通、伦理，以及问题优先的哲学。基础层，也是 Rin Huang 知识板块的连接与综合页。",
    course: "应用数据科学",
    courseCode: "理学学士 · 数据科学核心（79）",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "每个项目，端到端",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "决策，而非模型" },
      { id: "lifecycle", label: "项目生命周期" },
      { id: "question", label: "框定正确的问题" },
      { id: "datamodel", label: "数据与建模" },
      { id: "deploy", label: "部署与监控" },
      { id: "communicate", label: "传达结果" },
      { id: "ethics", label: "伦理与可复现性" },
      { id: "philosophy", label: "问题优先" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/elements-of-data-processing", label: "数据处理要素" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "applied-data-science", updated: "2026-06-25", ...meta, Body };
}
