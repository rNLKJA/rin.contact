import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/data-governance.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. The FAIR acronym letters (F/A/I/R) are passed explicitly so they
 * stay English even when the quadrant labels are translated.
 */

const QUAD_POS = [
  { x: 60, y: 26 },
  { x: 240, y: 26 },
  { x: 60, y: 96 },
  { x: 240, y: 96 },
];

// quads: [{label, letter}] in F, A, I, R order; letter stays English.
function FairFigure({ caption, ariaLabel, quads, centre }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {QUAD_POS.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x}
              y={p.y}
              width={140}
              height={48}
              rx={2}
              fill="#FF3C3C"
              fillOpacity="0.08"
              stroke="#FF3C3C"
              strokeWidth="1.2"
            />
            <text
              x={p.x + 70}
              y={p.y + 22}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="currentColor"
            >
              {quads[i].label}
            </text>
            <text
              x={p.x + 70}
              y={p.y + 37}
              textAnchor="middle"
              fontSize="13"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              {quads[i].letter}
            </text>
          </g>
        ))}
        <text
          x="220"
          y="158"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {centre}
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
        Every other page makes you better at <em>using</em> data. This one is about being{" "}
        <em>allowed and trusted</em> to use it. <Term>Data governance</Term> is the set of rules,
        roles, and processes that keep an organisation's data accurate, secure, compliant, and
        trustworthy. It's the least glamorous topic in this section and, for the work I do, one of
        the most important — because handling sensitive government, health, and policing data well
        isn't optional, and getting it wrong turns good analysis into a serious liability.
      </p>
      <p>
        It threads through everything else: the{" "}
        <Link href="/knowledge/elements-of-data-processing">data you process</Link>, the{" "}
        <Link href="/knowledge/database-systems">systems</Link> you store it in, the{" "}
        <Link href="/knowledge/statistical-machine-learning">models</Link> you build. Governance is
        the discipline that makes all of it defensible. Here's the practical shape of it — including
        the FAIR principles, which are the modern backbone of good data management.
      </p>

      <KSection id="what" eyebrow="01" title="Trust as infrastructure">
        <p>
          Governance answers a deceptively simple question:{" "}
          <em>can we trust this data, and are we handling it responsibly?</em> It defines who owns
          and is accountable for each dataset (<Term>stewardship</Term>), what the rules are for
          quality, access, and retention, and how those rules are enforced. Done well it's
          invisible; done badly it shows up as contradictory numbers, a privacy breach, or a
          decision no one can defend.
        </p>
        <p>
          The mindset shift is to treat data as a managed <em>asset</em> with obligations attached,
          not a free-floating resource. In a regulated setting that's not bureaucracy for its own
          sake — it's what lets the analysis hold up when someone asks "where did this come from,
          who could see it, and should you have used it?"
        </p>
      </KSection>

      <KSection id="quality" eyebrow="02" title="Quality and lineage">
        <p>
          Trust starts with <Term>data quality</Term> — is the data accurate, complete, consistent,
          and current? — and with <Term>lineage</Term>: the documented path of where data came from
          and every transformation it passed through. Lineage is what makes an analysis{" "}
          <em>auditable</em>: you can trace any number back to its source and reproduce how it was
          derived.
        </p>
        <p>
          This is the <Link href="/knowledge/elements-of-data-processing">reproducibility</Link>{" "}
          discipline from the data-processing page, raised to an organisational standard. In
          government work it's not a nicety: when a figure feeds a decision that affects people,
          "here is exactly where this came from and what we did to it" is the difference between a
          defensible result and an indefensible one.
        </p>
      </KSection>

      <KSection id="fair" eyebrow="03" title="The FAIR principles">
        <p>
          The modern backbone of good data management is a set of four principles known by the
          acronym <Term>FAIR</Term> — Findable, Accessible, Interoperable, Reusable. Born in
          scientific research (and now adopted across government and industry), they describe what
          it takes for data to be genuinely useful beyond the moment and the person that created it:
        </p>
        <ul>
          <li>
            <Term>Findable</Term> — data and its metadata are easy to discover, with a persistent
            unique identifier and rich, searchable description. You can't use what you can't find.
          </li>
          <li>
            <Term>Accessible</Term> — once found, it can be retrieved through a clear, standard
            protocol, with authentication and authorisation where needed. Access is defined, not ad
            hoc.
          </li>
          <li>
            <Term>Interoperable</Term> — it uses shared standards, formats, and vocabularies so it
            can be combined with other data and read by other systems. The opposite of a locked
            silo.
          </li>
          <li>
            <Term>Reusable</Term> — it's richly documented and clearly licensed, so others
            (including future-you) can understand and reuse it correctly.
          </li>
        </ul>

        <FairFigure
          caption="FAIR — Findable, Accessible, Interoperable, Reusable. Rich metadata sits at the centre, because good metadata is what makes all four possible. FAIR is about being well-managed and well-described — crucially, not the same as being 'open'."
          ariaLabel="A 2x2 quadrant labelled Findable, Accessible, Interoperable, Reusable, with metadata at the centre."
          quads={[
            { label: "Findable", letter: "F" },
            { label: "Accessible", letter: "A" },
            { label: "Interoperable", letter: "I" },
            { label: "Reusable", letter: "R" },
          ]}
          centre="rich metadata makes all four possible"
        />

        <Callout type="pitfall">
          <p>
            <strong>FAIR is not the same as "open".</strong> This is the most important and most
            misunderstood point. FAIR is about being well-managed and well-described — it says
            nothing about who's allowed in. Highly sensitive data (health records, policing data)
            can and should be FAIR: findable in a catalogue, accessible{" "}
            <em>through proper authorisation</em>, interoperable, and reusable by those entitled to
            it — while staying tightly controlled. "Accessible" means "by a defined process", not
            "available to everyone". That's exactly why FAIR works in government, where most data is
            anything but open. (FAIR also pairs with the <Term>CARE</Term> principles for Indigenous
            data governance, which add collective benefit, authority to control, responsibility, and
            ethics.)
          </p>
        </Callout>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="Privacy">
        <p>
          When data is about people, <Term>privacy</Term> becomes a legal and ethical duty, not a
          preference. In Australia the <Term>Australian Privacy Principles</Term> set the baseline,
          and a few ideas do most of the work in practice:
        </p>
        <ul>
          <li>
            <Term>Data minimisation</Term> — collect and keep only what you actually need. The data
            you don't hold can't be breached or misused.
          </li>
          <li>
            <Term>Purpose limitation</Term> — use data for the purpose it was collected for, not
            whatever turns out to be convenient later.
          </li>
          <li>
            <Term>De-identification</Term> — strip the identifying fields so records can't be tied
            to individuals — while knowing its <em>limits</em>: combining "anonymous" datasets can
            re-identify people, so de-identification is a risk-reduction, not a guarantee.
          </li>
        </ul>
        <p>
          Privacy isn't a checkbox at the end; it's a constraint you design in from the start (
          <Term>privacy by design</Term>) — which shapes what you collect and how you model long
          before any analysis.
        </p>
      </KSection>

      <KSection id="access" eyebrow="05" title="Access and security">
        <p>
          Governance decides not just whether data is correct but who can touch it. The guiding rule
          is <Term>least privilege</Term>: each person gets access to exactly the data their role
          requires, and no more. Data is <Term>classified</Term> by sensitivity (public, internal,
          confidential, protected), and the controls scale with the classification.
        </p>
        <p>
          This is the{" "}
          <Link href="/knowledge/web-information-technology">"never trust by default"</Link>{" "}
          security mindset applied to data: encrypt it in transit and at rest, log who accessed
          what, and assume that the cost of a breach of sensitive records is severe. In policing and
          health contexts, access control isn't IT hygiene — it's a core part of the public's trust.
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="06" title="Ethics and fairness">
        <p>
          Beyond "are we allowed?" sits the harder question: "<em>should</em> we, and is it fair?"
          Data and <Link href="/knowledge/statistical-machine-learning">models</Link> can encode and
          amplify the biases in the world that produced them — a model trained on biased historical
          data will faithfully reproduce that bias, now wearing the authority of "the algorithm". In
          government and health, where decisions touch real lives, that's not abstract: an unfair
          model or a misleading analysis can do real harm to real people.
        </p>
        <p>
          So ethics belongs in the workflow, not a postscript: ask who could be harmed, check models
          for disparate impact across groups, be honest about limitations (the{" "}
          <Link href="/knowledge/science-communication">communication</Link> discipline), and keep a
          human accountable for consequential decisions. Being technically correct and being
          responsible are not the same thing, and the second is the higher bar.
        </p>
      </KSection>

      <KSection id="frameworks" eyebrow="07" title="Making it real">
        <p>
          Principles only matter if they're operationalised. In practice that means assigning{" "}
          <Term>data stewards</Term> accountable for specific domains, maintaining a{" "}
          <Term>data catalogue</Term> (the inventory that makes data findable and documents its
          lineage — the practical face of FAIR), setting <Term>retention</Term> rules so data is
          kept no longer than needed, and defining the policies for quality, access, and
          classification. Governance is the unglamorous scaffolding that lets an organisation trust
          its own data.
        </p>
      </KSection>

      <KSection id="ai" eyebrow="08" title="Governing AI">
        <p>
          As models drive more decisions, governance is extending to <Term>AI governance</Term>:
          managing the risks of the models themselves, not just the data. The themes are
          transparency (can you explain how a decision was reached?), accountability (who is
          responsible when it's wrong?), fairness (is the impact equitable?), and human oversight of
          consequential automated decisions. It's the ethics and reproducibility threads of this
          whole section, pointed at the model — and it's fast becoming a formal requirement,
          especially in the public sector.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The licence to operate">
          <p>
            In government, governance is the <em>licence to do the work at all</em>. The sensitive
            data I handle comes with hard obligations, and the discipline on this page is what keeps
            the analysis both useful and defensible: <strong>lineage</strong> so every figure is
            traceable, <strong>least-privilege access</strong> and classification on sensitive
            records, <strong>privacy</strong> and de-identification handled properly, and a constant
            eye on <strong>fairness</strong> because the decisions affect people. Integrating
            sources like ABS, health, and other government data only works inside this framework.
          </p>
          <p>
            <strong>FAIR</strong> is the part that ties my research background to my current work:
            making data findable, well-described, and reusable — <em>without</em> making it open —
            is exactly what responsible analytics in a sensitive setting requires. It's the quiet
            foundation under everything else in this section: the maths and models only earn trust
            when the data beneath them is governed well.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Data governance</strong> = the rules/roles/processes that make data
              trustworthy. Treat data as a managed asset with obligations.
            </li>
            <li>
              <strong>Quality + lineage</strong> (the auditable path) make analysis defensible and
              reproducible.
            </li>
            <li>
              <strong>FAIR</strong>: <strong>F</strong>indable, <strong>A</strong>ccessible,{" "}
              <strong>I</strong>nteroperable, <strong>R</strong>eusable — driven by rich metadata.{" "}
              <strong>FAIR ≠ open</strong>: sensitive data can be FAIR <em>and</em> tightly
              controlled.
            </li>
            <li>
              <strong>Privacy</strong>: data minimisation, purpose limitation, de-identification
              (and its limits); privacy by design; the Australian Privacy Principles.
            </li>
            <li>
              <strong>Access</strong>: least privilege + classification + encryption + audit logs.{" "}
              <strong>Ethics</strong>: models inherit bias; check fairness, keep a human
              accountable.
            </li>
            <li>
              Operationalise via <strong>stewards, a data catalogue, retention rules</strong>;{" "}
              <strong>AI governance</strong> extends transparency &amp; oversight to the models.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Reflects current data-governance and FAIR-principles guidance (the original FAIR paper in
          Scientific Data; government FAIR-readiness and Australian privacy practice) alongside
          hands-on government work.
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
        其他每一页都让你更擅长<em>使用</em>数据。这一页讲的是被<em>允许、被信任</em>去使用它。
        <Term>数据治理</Term>是那套规则、角色与流程，让一个组织的数据保持准确、安全、合规、可信。
        它是本板块中最不光鲜的主题，而对我所做的工作而言，又是最重要的之一——因为妥善处理敏感的
        政府、健康与警务数据并非可选项，而把它做错，会把好的分析变成一项严重的负债。
      </p>
      <p>
        它贯穿其他一切：你<Link href="/knowledge/elements-of-data-processing">处理的数据</Link>、你
        存放它的<Link href="/knowledge/database-systems">系统</Link>、你构建的
        <Link href="/knowledge/statistical-machine-learning">模型</Link>。治理是让这一切都站得住脚
        的纪律。下面是它实用的形状——包括 FAIR 原则，那是现代良好数据管理的骨干。
      </p>

      <KSection id="what" eyebrow="01" title="信任即基础设施">
        <p>
          治理回答一个看似简单的问题：<em>我们能信任这份数据吗，我们处理它是否负责任？</em>它定义
          谁拥有并对每个数据集负责（<Term>管护</Term>）、质量/访问/留存的规则是什么，以及那些规则
          如何被执行。做得好，它隐而不见；做得差，它就表现为相互矛盾的数字、一次隐私泄露，或一个
          没人能辩护的决策。
        </p>
        <p>
          心态的转变是：把数据当作一项带着义务的、受管理的<em>资产</em>，而非一种自由漂浮的资源。
          在受监管的环境里，这不是为官僚而官僚——而是当有人问「这从哪里来、谁能看到、你本就该用它
          吗？」时，让分析站得住脚的东西。
        </p>
      </KSection>

      <KSection id="quality" eyebrow="02" title="质量与血缘">
        <p>
          信任始于<Term>数据质量</Term>——数据是否准确、完整、一致、最新？——以及<Term>血缘</Term>：
          数据从何而来、经过每一次转换的有据可查的路径。血缘正是让一项分析<em>可审计</em>的东西：你
          能把任一数字追溯回它的源头，并复现它是如何被推导出来的。
        </p>
        <p>
          这是<Link href="/knowledge/elements-of-data-processing">数据处理页</Link>的可复现性纪律，
          被提升到一个组织级的标准。在政府工作中它不是锦上添花：当一个数字喂进一个影响到人的决策
          时，「这确切地从哪里来、我们对它做了什么」正是一个可辩护的结果与一个不可辩护的结果之间的
          区别。
        </p>
      </KSection>

      <KSection id="fair" eyebrow="03" title="FAIR 原则">
        <p>
          现代良好数据管理的骨干，是一组以首字母缩写 <Term>FAIR</Term> 著称的四条原则——可发现
          （Findable）、可访问（Accessible）、可互操作（Interoperable）、可重用（Reusable）。它们
          诞生于科学研究（如今已被政府与业界广泛采用），描述了数据要在创造它的那一刻与那个人之外
          真正有用，需要具备什么：
        </p>
        <ul>
          <li>
            <Term>可发现</Term>——数据及其元数据易于被发现，带有一个持久的唯一标识符和丰富、可搜索
            的描述。你用不了你找不到的东西。
          </li>
          <li>
            <Term>可访问</Term>——一旦被找到，它能通过一个清晰、标准的协议被取回，并在需要处带有
            认证与授权。访问是被定义的，而非临时拼凑的。
          </li>
          <li>
            <Term>可互操作</Term>——它使用共享的标准、格式与词汇，从而能与其他数据结合、被其他系统
            读取。与一个上锁的孤岛相反。
          </li>
          <li>
            <Term>可重用</Term>——它有丰富的文档和清晰的许可，于是别人（包括未来的你）能正确地理解
            并重用它。
          </li>
        </ul>

        <FairFigure
          caption="FAIR——可发现、可访问、可互操作、可重用。丰富的元数据居于中心，因为好的元数据正是让这四者都成为可能的东西。FAIR 关乎被妥善管理、被充分描述——关键在于，它与「开放」不是一回事。"
          ariaLabel="一个 2×2 的象限，标着可发现、可访问、可互操作、可重用，元数据居于中心。"
          quads={[
            { label: "可发现", letter: "F" },
            { label: "可访问", letter: "A" },
            { label: "可互操作", letter: "I" },
            { label: "可重用", letter: "R" },
          ]}
          centre="丰富的元数据让这四者皆成为可能"
        />

        <Callout type="pitfall">
          <p>
            <strong>FAIR 与「开放」不是一回事。</strong>这是最重要、也最被误解的一点。FAIR 关乎被
            妥善管理、被充分描述——它对「谁被允许进入」只字未提。高度敏感的数据（健康记录、警务
            数据）可以、也应当是 FAIR 的：在目录中可发现、<em>经由适当授权</em>可访问、可互操作、并
            可被有权者重用——同时保持受到严格管控。「可访问」意味着「经由一个被定义的流程」，而非
            「人人可得」。这正是为什么 FAIR 在政府里行得通，那里大多数数据绝非开放。（FAIR 还与用于
            原住民数据治理的 <Term>CARE</Term> 原则成对，后者增添了集体受益、控制的权威、责任与
            伦理。）
          </p>
        </Callout>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="隐私">
        <p>
          当数据关乎人时，<Term>隐私</Term>就成为一项法律与伦理的义务，而非一种偏好。在澳大利亚，
          <Term>澳大利亚隐私原则</Term>设下基线，而实践中有几个想法承担了大部分工作：
        </p>
        <ul>
          <li>
            <Term>数据最小化</Term>——只采集并保留你确实需要的。你不持有的数据，不会被泄露或滥用。
          </li>
          <li>
            <Term>目的限制</Term>——把数据用于它被采集的那个目的，而非日后碰巧方便的任何用途。
          </li>
          <li>
            <Term>去标识化</Term>——剥掉可识别字段，使记录无法被关联到个人——同时清楚它的<em>限度</em>
            ：把若干「匿名」数据集组合起来可能重新识别出人，所以去标识化是一种风险降低，而非
            一个保证。
          </li>
        </ul>
        <p>
          隐私不是末尾的一个勾选框；它是你从一开始就设计进去的一项约束（<Term>隐私设计</Term>）——
          它在任何分析之前很久，就塑造了你采集什么、如何建模。
        </p>
      </KSection>

      <KSection id="access" eyebrow="05" title="访问与安全">
        <p>
          治理决定的不只是数据是否正确，还有谁能碰它。指导规则是<Term>最小权限</Term>：每个人获得
          的访问，恰好是其角色所需的数据，不多一分。数据按敏感度被<Term>分级</Term>（公开、内部、
          机密、受保护），而管控随分级而升级。
        </p>
        <p>
          这是<Link href="/knowledge/web-information-technology">「默认绝不信任」</Link>的安全心态
          施加到数据上：在传输中和静止时都加密，记录谁访问了什么，并假设一次敏感记录泄露的代价是
          严重的。在警务与健康的语境里，访问控制不是 IT 卫生——而是公众信任的核心一环。
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="06" title="伦理与公平">
        <p>
          在「我们被允许吗？」之外，坐着更难的问题：「我们<em>应该</em>吗，这公平吗？」数据与
          <Link href="/knowledge/statistical-machine-learning">模型</Link>能编码并放大产生它们的那个
          世界里的偏见——一个在有偏的历史数据上训练的模型，会忠实地复制那种偏见，如今还披着「算法」
          的权威。在政府与健康领域，决策触及真实的生命，这并不抽象：一个不公平的模型或一份误导的
          分析，能对真实的人造成真实的伤害。
        </p>
        <p>
          所以伦理属于工作流之中，而非一个附言：问谁可能受到伤害，检查模型在各群体间是否有差异性
          影响，对局限诚实（<Link href="/knowledge/science-communication">传播</Link>的纪律），并为
          有重大后果的决策保留一个负责的人。技术上正确与负责任不是一回事，而后者是更高的标准。
        </p>
      </KSection>

      <KSection id="frameworks" eyebrow="07" title="让它落地">
        <p>
          原则只有被落地实施才有意义。实践中那意味着：指派对特定领域负责的<Term>数据管护人</Term>，
          维护一个<Term>数据目录</Term>（让数据可发现、并记录其血缘的清单——FAIR 实用的一面），设定
          <Term>留存</Term>规则，使数据被保留的时间不超过所需，并定义质量、访问与分级的政策。治理是
          那不光鲜的脚手架，它让一个组织能信任自己的数据。
        </p>
      </KSection>

      <KSection id="ai" eyebrow="08" title="治理 AI">
        <p>
          随着模型驱动越来越多的决策，治理正延伸到 <Term>AI 治理</Term>：管理模型本身的风险，而不只
          是数据的。主题是透明（你能解释一个决策是如何得出的吗？）、问责（出错时谁负责？）、公平
          （影响是否公正？），以及对有重大后果的自动化决策的人工监督。它是本整个板块中伦理与可
          复现性的线索，指向模型——而它正迅速成为一项正式要求，尤其在公共部门。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="运营的许可证">
          <p>
            在政府里，治理是<em>能否做这份工作的许可证</em>本身。我处理的敏感数据带着硬性的义务，而
            这一页上的纪律，正是让分析既有用又可辩护的东西：<strong>血缘</strong>，使每个数字可
            追溯；对敏感记录的<strong>最小权限访问</strong>与分级；妥善处理的<strong>隐私</strong>与
            去标识化；以及对<strong>公平</strong>的持续留意，因为决策影响到人。整合像 ABS、健康及
            其他政府数据这样的来源，只有在这个框架之内才行得通。
          </p>
          <p>
            <strong>FAIR</strong> 是把我的研究背景与当前工作系在一起的那部分：让数据可发现、被充分
            描述、可重用——<em>而不</em>使它开放——正是敏感环境里负责任的分析所要求的。它是本板块
            其他一切之下那安静的地基：唯有当数学与模型之下的数据被治理得当，它们才赢得信任。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>数据治理</strong> = 让数据可信赖的规则/角色/流程。把数据当作一项带义务的、
              受管理的资产。
            </li>
            <li>
              <strong>质量 + 血缘</strong>（可审计的路径）让分析可辩护、可复现。
            </li>
            <li>
              <strong>FAIR</strong>：<strong>F</strong> 可发现、<strong>A</strong> 可访问、
              <strong>I</strong> 可互操作、<strong>R</strong> 可重用——由丰富的元数据驱动。
              <strong>FAIR ≠ 开放</strong>：敏感数据可以既是 FAIR 的<em>又</em>受到严格管控。
            </li>
            <li>
              <strong>隐私</strong>：数据最小化、目的限制、去标识化（及其限度）；隐私设计；澳大利亚
              隐私原则。
            </li>
            <li>
              <strong>访问</strong>：最小权限 + 分级 + 加密 + 审计日志。<strong>伦理</strong>
              ：模型会 承袭偏见；检查公平，保留一个负责的人。
            </li>
            <li>
              通过<strong>管护人、数据目录、留存规则</strong>来落地；<strong>AI 治理</strong>
              把透明与 监督延伸到模型。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          反映了当前的数据治理与 FAIR 原则指引（《Scientific Data》上 FAIR 的原始论文；政府的 FAIR
          就绪度与澳大利亚隐私实践），以及亲身的政府工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Data Governance, Privacy & Ethics",
    subtitle:
      "The rules that make data trustworthy. Not the glamorous part — but in government, health, and policing, getting this wrong is how analysis becomes a liability instead of an asset.",
    description:
      "A thorough, practical explainer of data governance, privacy and ethics — data quality and lineage, the FAIR principles (Findable, Accessible, Interoperable, Reusable), privacy and de-identification, access control and classification, ethics and fairness, governance frameworks, and AI governance. In-Practice tier, anchored to Rin Huang's government data work.",
    course: "Data Governance, Privacy & Ethics",
    courseCode: "In practice · gov & research data",
    level: "Professional",
    learned: "Gov · research · ongoing",
    applied: "Sensitive gov data, probity",
    readingTime: "~16 min read",
    sections: [
      { id: "what", label: "Trust as infrastructure" },
      { id: "quality", label: "Quality and lineage" },
      { id: "fair", label: "The FAIR principles" },
      { id: "privacy", label: "Privacy" },
      { id: "access", label: "Access and security" },
      { id: "ethics", label: "Ethics and fairness" },
      { id: "frameworks", label: "Making it real" },
      { id: "ai", label: "Governing AI" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/elements-of-data-processing", label: "Elements of Data Processing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据治理、隐私与伦理",
    subtitle:
      "让数据可信赖的规则。不是光鲜的那部分——但在政府、健康与警务领域，把这件事做错，正是分析从资产变成负债的方式。",
    description:
      "对数据治理、隐私与伦理的详尽、实用讲解——数据质量与血缘、FAIR 原则（可发现、可访问、可互操作、可重用）、隐私与去标识化、访问控制与分级、伦理与公平、治理框架，以及 AI 治理。实务层，锚定 Rin Huang 的政府数据工作。",
    course: "数据治理、隐私与伦理",
    courseCode: "实务 · 政府与研究数据",
    level: "职业",
    learned: "政府 · 研究 · 持续进行",
    applied: "敏感政府数据、廉正",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "what", label: "信任即基础设施" },
      { id: "quality", label: "质量与血缘" },
      { id: "fair", label: "FAIR 原则" },
      { id: "privacy", label: "隐私" },
      { id: "access", label: "访问与安全" },
      { id: "ethics", label: "伦理与公平" },
      { id: "frameworks", label: "让它落地" },
      { id: "ai", label: "治理 AI" },
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
  return { slug: "data-governance", updated: "2026-06-25", ...meta, Body };
}
