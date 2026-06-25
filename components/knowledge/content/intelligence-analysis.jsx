import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/intelligence-analysis.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths. Accent ring nodes = direction (0) + analysis (3).
 */

const CYCLE_POS = [
  { x: 220, y: 24 },
  { x: 372, y: 78 },
  { x: 312, y: 156 },
  { x: 128, y: 156 },
  { x: 68, y: 78 },
];

// labels in order: direction, collection, processing, analysis, dissemination.
function CycleFigure({ caption, ariaLabel, labels }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 180"
        className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {CYCLE_POS.map((n, i) => {
          const next = CYCLE_POS[(i + 1) % CYCLE_POS.length];
          return <line key={"l" + i} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#FF3C3C" strokeWidth="1" opacity="0.3" />;
        })}
        {CYCLE_POS.map((n, i) => {
          const accent = i === 0 || i === 3;
          return (
            <g key={i}>
              <rect x={n.x - 48} y={n.y - 13} width="96" height="26" rx="13"
                fill={accent ? "#FF3C3C" : "none"} fillOpacity={accent ? 0.12 : 0}
                stroke="#FF3C3C" strokeWidth={accent ? 1.4 : 1} opacity={accent ? 1 : 0.65} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{labels[i]}</text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        <Term>Intelligence analysis</Term> is what data work becomes when a real decision hangs on it
        and the picture is never complete. It's the discipline of turning fragmentary, sometimes
        contradictory information into an <em>assessment</em> a decision-maker can act on — and being
        honest about how confident that assessment deserves to be. The maths and models from the rest
        of this section are tools it uses; the discipline itself is about judgement under uncertainty.
      </p>
      <p>
        It's the heart of my current work in government, and it has its own tradecraft — a body of
        method built precisely because the hardest adversary an analyst faces isn't the subject of the
        analysis, but the predictable ways their own mind gets things wrong. This page is that
        tradecraft, made plain.
      </p>

      <KSection id="what" eyebrow="01" title="Data with a decision attached">
        <p>
          The defining feature of intelligence is its purpose: it exists to{" "}
          <strong>inform a specific decision</strong>, for a specific person, who will act on it. That
          distinguishes it from analysis done out of curiosity. An intelligence product isn't judged
          on how clever it is, but on whether it helped someone make a better call with imperfect
          information — under time pressure, with consequences.
        </p>
        <p>
          So intelligence is fundamentally about <em>assessment under uncertainty</em>. You will
          almost never have all the facts; the job is to make the best-supported judgement you can from
          what you have, state how much weight it can bear, and hand it over in time to be useful.
          Certainty is not on offer; calibrated judgement is.
        </p>
      </KSection>

      <KSection id="cycle" eyebrow="02" title="The intelligence cycle">
        <p>
          Intelligence work runs on a recognised loop, the <Term>intelligence cycle</Term>, which
          keeps the effort tied to the decision it serves:
        </p>
        <ul>
          <li>
            <Term>Direction</Term> — what does the decision-maker actually need to know? The
            requirement that drives everything.
          </li>
          <li><Term>Collection</Term> — gather the relevant information from available sources.</li>
          <li><Term>Processing</Term> — turn raw material into usable, organised form.</li>
          <li>
            <Term>Analysis</Term> — the core: assess what it means, weigh the hypotheses, form a
            judgement.
          </li>
          <li>
            <Term>Dissemination</Term> — deliver the assessment to the decision-maker, clearly and in
            time.
          </li>
        </ul>
        <p>
          Like the <Link href="/knowledge/applied-data-science">data-science lifecycle</Link>, it's a
          loop, not a line — dissemination raises new questions that feed back into direction. And the
          same lesson applies: the analysis is only as good as the question at the top, and only
          matters if it reaches the decision-maker in a form they can use.
        </p>

        <CycleFigure
          caption="The intelligence cycle. A decision-maker's need drives collection, processing, and analysis into a finished assessment — which, once delivered, raises the next question. A loop, always tied to a decision."
          ariaLabel="Five phases in a circle: direction, collection, processing, analysis, dissemination, connected by arrows forming a loop."
          labels={["direction", "collection", "processing", "analysis", "dissemination"]}
        />
      </KSection>

      <KSection id="vsdata" eyebrow="03" title="Intelligence vs data analysis">
        <p>
          Intelligence and data analysis overlap, but the emphasis differs in a way worth naming. Data
          analysis often asks <em>what does the data show?</em> Intelligence insists on the next step:{" "}
          <em>what does it mean for the decision, and so what should we do?</em> The{" "}
          <Link href="/knowledge/science-communication">"so what"</Link> isn't optional polish — it's
          the product.
        </p>
        <p>
          Intelligence also routinely reasons from <em>incomplete and unreliable</em> information,
          where a clean dataset is a luxury you don't get. So it leans less on a single number and more
          on weighing competing explanations, grading how much each source can be trusted, and being
          explicit about the gaps. The quantitative toolkit from the rest of this section absolutely
          helps — but the core skill is structured reasoning under doubt.
        </p>
      </KSection>

      <KSection id="bias" eyebrow="04" title="The enemy is your own mind">
        <p>
          The central insight of modern intelligence tradecraft is humbling: the biggest threat to a
          sound assessment is not bad data — it's the analyst's own <Term>cognitive bias</Term>. Human
          minds take shortcuts that served us on the savannah and betray us on hard problems:
        </p>
        <ul>
          <li>
            <Term>Confirmation bias</Term> — seeing the evidence that fits the theory you already hold
            and discounting the rest.
          </li>
          <li><Term>Anchoring</Term> — over-weighting the first piece of information you got.</li>
          <li>
            <Term>Premature closure</Term> — settling on an answer too early and stopping the search.
          </li>
        </ul>
        <p>
          You can't switch these off by trying harder — willpower doesn't fix a wiring problem. What
          works is <em>method</em>: structured processes that force you to consider what you'd
          otherwise skip. That's the entire reason structured analytic techniques exist.
        </p>
      </KSection>

      <KSection id="sats" eyebrow="05" title="Structured analytic techniques">
        <p>
          <Term>Structured Analytic Techniques</Term> (SATs) are formal methods that externalise
          reasoning — get it out of your head and onto paper where its flaws show. They make analysis
          more rigorous, more transparent, and more defensible. The most important is the workhorse of
          the craft:
        </p>
        <Callout type="intuition">
          <p>
            <strong>Analysis of Competing Hypotheses (ACH).</strong> Instead of building a case for
            your favourite explanation, you list <em>all</em> the plausible hypotheses up front, lay
            every piece of evidence against each in a matrix, and — crucially — look for evidence that
            would <em>disprove</em> each one. The winner isn't the hypothesis with the most support;
            it's the one with the least evidence <em>against</em> it. ACH directly attacks confirmation
            bias by forcing you to try to kill your own theory, the same falsification instinct as a
            good <Link href="/knowledge/statistics">hypothesis test</Link>.
          </p>
        </Callout>
        <p>
          Two more that earn their keep daily: a <Term>Key Assumptions Check</Term> — write down every
          assumption your judgement rests on and ask what happens if each is wrong — and rigorously{" "}
          <Term>separating the reporting from your interpretation</Term>: keeping "here's what the
          source said" distinct from "here's what I think it means", so a reader can see exactly where
          the facts end and your judgement begins.
        </p>
      </KSection>

      <KSection id="osint" eyebrow="06" title="OSINT and source grading">
        <p>
          <Term>Open-Source Intelligence</Term> (OSINT) is intelligence drawn from publicly available
          information — news, public records, social media, company filings, imagery. It's vast and
          powerful, and it's exactly where the discipline matters most, because open sources are often
          contradictory, incomplete, and sometimes deliberately deceptive.
        </p>
        <p>
          So you never take a source at face value — you <Term>grade</Term> it on two separate axes:
          how <em>reliable</em> is the source (its track record and access), and how <em>credible</em>{" "}
          is this particular piece of information (does it fit what else is known, is it corroborated)?
          A reliable source can still pass on a dubious claim, and an unreliable one can occasionally
          be right — keeping the two judgements apart is the discipline. Corroborate across independent
          sources, trace claims to their origin, and stay alert to the <Term>verification</Term>{" "}
          problem that the same false story echoing across ten sites is still one claim, not ten.
        </p>
      </KSection>

      <KSection id="language" eyebrow="07" title="The language of confidence">
        <p>
          Because intelligence trades in uncertainty, <em>how</em> you express confidence is part of
          the product. Vague words betray the reader: "likely" might mean 55% to one person and 90% to
          another. Good practice uses a consistent set of <Term>probability yardsticks</Term> — a
          defined ladder from "remote" through "even chance" to "almost certain" — and separates that
          estimative likelihood from your <em>confidence</em> in the underlying evidence (a
          high-likelihood judgement built on thin sourcing is a different thing from one built on
          strong sourcing).
        </p>
        <p>
          This is the <Link href="/knowledge/statistics">statistics</Link> lesson of being honest about
          uncertainty, turned into disciplined language. Calibrated wording — neither falsely precise
          nor uselessly hedged — is what lets a decision-maker weigh the assessment correctly.
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="08" title="Probity and the law">
        <p>
          Intelligence work, especially in government and policing, runs inside hard ethical and legal
          limits. Collection must be <Term>lawful and proportionate</Term>; handling must respect{" "}
          <Link href="/knowledge/data-governance">privacy and governance</Link>; and the analyst
          carries a duty of <Term>probity</Term> — being honest, impartial, and rigorous, precisely
          because the assessments can affect people's lives and liberty. The discipline isn't only
          about being <em>right</em>; it's about being right in a way that's defensible, traceable, and
          fair.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The core of the current role">
          <p>
            This is the centre of what I do now. As a senior analyst in a government
            professional-standards setting, the work is exactly this: turn incomplete information into
            a defensible assessment for a decision-maker, under real constraints. The discipline on
            this page is the daily practice — <strong>guarding against my own bias</strong> with
            structured techniques like <strong>ACH</strong>, <strong>grading sources</strong> rather
            than trusting them, keeping <strong>reporting separate from interpretation</strong>, and
            being <strong>calibrated and lawful</strong> about what I can actually conclude.
          </p>
          <p>
            It's where the rest of the section comes together in service of a decision: the{" "}
            <Link href="/knowledge/statistics">statistics</Link> for honest uncertainty, the{" "}
            <Link href="/knowledge/geospatial-analysis">spatial analysis</Link> for the "where", the{" "}
            <Link href="/knowledge/science-communication">communication</Link> for the hand-off — all
            pointed at the same target: a sound, defensible judgement that helps someone decide well.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Intelligence = <strong>assessment under uncertainty</strong> for a specific decision.
              Judged on usefulness, not cleverness.
            </li>
            <li>
              The <strong>intelligence cycle</strong> (direction → collection → processing → analysis →
              dissemination) is a loop tied to the decision-maker's need.
            </li>
            <li>
              The real enemy is your own <strong>cognitive bias</strong> (confirmation, anchoring,
              premature closure) — method beats willpower.
            </li>
            <li>
              <strong>Structured Analytic Techniques</strong>: <strong>ACH</strong> (list all
              hypotheses, seek disconfirming evidence), key-assumptions checks, and separating
              reporting from interpretation.
            </li>
            <li>
              <strong>OSINT</strong>: grade <strong>source reliability</strong> and{" "}
              <strong>information credibility</strong> separately; corroborate; one echoed story is
              still one claim.
            </li>
            <li>
              Use calibrated <strong>confidence language</strong> (probability yardsticks), and work{" "}
              <strong>lawfully, proportionately, with probity</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Tradecraft on this page reflects established intelligence-analysis references (the CIA/IC
          "Tradecraft Primer" on structured analytic techniques, OSINT practice) alongside hands-on
          government work.
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
        当一个真实的决策悬于其上、而图景从不完整时，数据工作就成了<Term>情报分析</Term>。它是把
        零碎的、有时相互矛盾的信息，变成一份决策者能据以行动的<em>评估</em>——并对那份评估配得上
        多少信心保持诚实——的学科。本板块其余部分的数学与模型是它使用的工具；而这门学科本身，关乎
        不确定性下的判断。
      </p>
      <p>
        它是我当前政府工作的核心，且有它自己的<em>专业技艺</em>（tradecraft）——一套方法体系，其
        建立恰恰是因为一位分析师面对的最难的对手，不是分析的对象，而是他们自己的头脑可预测地把
        事情弄错的那些方式。这一页就是那门技艺，讲明白了。
      </p>

      <KSection id="what" eyebrow="01" title="附着着一个决策的数据">
        <p>
          情报的决定性特征是它的目的：它的存在是为了<strong>给一个具体的决策、给一个会据以行动的
          具体的人提供信息</strong>。这使它区别于出于好奇而做的分析。一份情报产品被评判的，不是它
          有多聪明，而是它有没有帮某人在不完美的信息下——在时间压力之下、带着后果——做出更好的
          决断。
        </p>
        <p>
          所以情报从根本上关乎<em>不确定性下的评估</em>。你几乎永远不会拥有全部事实；这份工作是从你
          所有的之中，做出你能做到的、最有支撑的判断，说明它能承受多大的分量，并及时把它交出去以
          派上用场。确定性不在供应之列；校准过的判断才是。
        </p>
      </KSection>

      <KSection id="cycle" eyebrow="02" title="情报循环">
        <p>
          情报工作运行在一个公认的循环——<Term>情报循环</Term>——之上，它让努力始终系于它所服务的
          那个决策：
        </p>
        <ul>
          <li><Term>方向</Term>——决策者究竟需要知道什么？驱动一切的需求。</li>
          <li><Term>采集</Term>——从可用的来源收集相关信息。</li>
          <li><Term>处理</Term>——把原始材料变成可用、有组织的形式。</li>
          <li><Term>分析</Term>——核心：评估它意味着什么、权衡各种假设、形成一个判断。</li>
          <li><Term>分发</Term>——把评估清晰、及时地交付给决策者。</li>
        </ul>
        <p>
          和<Link href="/knowledge/applied-data-science">数据科学生命周期</Link>一样，它是一个循环，
          而非一条直线——分发会引出新的问题，反馈回方向。同样的教训也适用：分析至多与顶端的那个
          问题一样好，而且只有当它以决策者能用的形式抵达他们时才有意义。
        </p>

        <CycleFigure
          caption="情报循环。决策者的需求驱动采集、处理与分析，汇成一份完成的评估——它一旦交付，便引出下一个问题。一个循环，始终系于一个决策。"
          ariaLabel="五个阶段排成一个圆：方向、采集、处理、分析、分发，由箭头连成一个循环。"
          labels={["方向", "采集", "处理", "分析", "分发"]}
        />
      </KSection>

      <KSection id="vsdata" eyebrow="03" title="情报 vs 数据分析">
        <p>
          情报与数据分析有重叠，但侧重点的差别值得点明。数据分析常问<em>数据显示了什么？</em>情报
          则坚持下一步：<em>它对决策意味着什么，因此我们该做什么？</em>那个
          <Link href="/knowledge/science-communication">「那又如何」</Link>不是可选的润色——它就是
          产品本身。
        </p>
        <p>
          情报也常常从<em>不完整、不可靠</em>的信息出发推理，那里一个干净的数据集是你得不到的奢侈品。
          所以它较少依赖单一的数字，而更多依赖权衡相互竞争的解释、为每个来源能被信任多少分级，并对
          缺口直言不讳。本板块其余部分的定量工具箱当然有帮助——但核心技能是疑云之下的结构化推理。
        </p>
      </KSection>

      <KSection id="bias" eyebrow="04" title="敌人是你自己的头脑">
        <p>
          现代情报技艺的核心洞见令人谦卑：对一份可靠评估最大的威胁不是坏数据——而是分析师自己的
          <Term>认知偏差</Term>。人的头脑会走捷径，那些捷径在草原上帮过我们，却在难题上背叛我们：
        </p>
        <ul>
          <li><Term>确认偏差</Term>——只看到契合你既有理论的证据，而对其余打折扣。</li>
          <li><Term>锚定</Term>——对你最先拿到的那条信息赋予过高的权重。</li>
          <li><Term>过早收口</Term>——太早就定下一个答案、停止了搜寻。</li>
        </ul>
        <p>
          你无法靠更努力来关掉它们——意志力修不好一个线路问题。管用的是<em>方法</em>：迫使你去考虑
          那些你本会跳过的东西的结构化流程。这正是结构化分析技术存在的全部理由。
        </p>
      </KSection>

      <KSection id="sats" eyebrow="05" title="结构化分析技术">
        <p>
          <Term>结构化分析技术</Term>（SATs）是把推理外化的正式方法——把它从你的头脑里取出来，放到
          纸面上，让它的瑕疵显形。它们让分析更严谨、更透明、更经得起辩护。最重要的那个，是这门技艺
          的主力：
        </p>
        <Callout type="intuition">
          <p>
            <strong>竞争性假设分析（ACH）。</strong>你不去为你最钟意的解释构建论据，而是把<em>所有
            </em>合理的假设在一开始就列出来，在一个矩阵里把每一条证据对照每一个假设摆开，并且——关键
            在于——去寻找能<em>证伪</em>每一个假设的证据。胜出的不是支撑最多的那个假设；而是<em>反对
            </em>它的证据最少的那个。ACH 通过逼你去尝试杀死你自己的理论，直接攻击确认偏差——与一个
            好的<Link href="/knowledge/statistics">假设检验</Link>相同的证伪本能。
          </p>
        </Callout>
        <p>
          另外两个每天都值回票价的：一次<Term>关键假设检查</Term>——把你的判断所依赖的每一个假设
          写下来，并问每一个若是错的会怎样——以及严格地<Term>把报告与你的解释分开</Term>：让「来源
          说了什么」与「我认为它意味着什么」泾渭分明，好让读者确切地看到事实在哪里结束、你的判断从
          哪里开始。
        </p>
      </KSection>

      <KSection id="osint" eyebrow="06" title="OSINT 与来源分级">
        <p>
          <Term>开源情报</Term>（OSINT）是从公开可得的信息中提取的情报——新闻、公开记录、社交媒体、
          公司备案、影像。它浩瀚而强大，而它恰恰是这门学科最要紧之处，因为开源往往相互矛盾、不完整，
          有时还蓄意欺骗。
        </p>
        <p>
          所以你从不按表面价值接受一个来源——你在两条独立的轴上为它<Term>分级</Term>：这个来源有多
          <em>可靠</em>（它的过往记录与获取渠道），以及这一条特定的信息有多<em>可信</em>（它是否契合
          其他已知之事、是否得到佐证）？一个可靠的来源仍可能传递一个可疑的说法，而一个不可靠的来源
          偶尔也会是对的——把这两种判断分开，才是这门纪律。跨独立来源相互佐证，把说法追溯到其源头，
          并对<Term>核实</Term>问题保持警觉：同一个假故事在十个网站上回响，仍然是一条说法，而非十条。
        </p>
      </KSection>

      <KSection id="language" eyebrow="07" title="置信度的语言">
        <p>
          因为情报经手的是不确定性，<em>你如何</em>表达信心，是产品的一部分。含糊的词语会辜负读者：
          「很可能」对一个人也许意味着 55%，对另一个人则意味着 90%。好的做法使用一套一致的
          <Term>概率标尺</Term>——一道从「极小」经「五五开」到「几乎确定」的、有定义的阶梯——并把那种
          估计性的可能性，与你对底层证据的<em>信心</em>分开（一个建立在单薄来源上的高可能性判断，与
          一个建立在扎实来源上的，是两码事）。
        </p>
        <p>
          这是<Link href="/knowledge/statistics">统计</Link>那条「对不确定性诚实」的教训，化为有
          纪律的语言。校准过的措辞——既不虚假地精确，也不无用地含糊其辞——正是让一位决策者能正确地
          掂量评估的东西。
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="08" title="廉正与法律">
        <p>
          情报工作，尤其在政府与警务中，运行在刚性的伦理与法律界限之内。采集必须<Term>合法且相称
          </Term>；处理必须尊重<Link href="/knowledge/data-governance">隐私与治理</Link>；而分析师
          肩负一份<Term>廉正</Term>的义务——诚实、公正、严谨，恰恰因为这些评估能影响到人的生命与
          自由。这门纪律不只关乎<em>正确</em>；而关乎以一种可辩护、可追溯、公平的方式正确。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="当前角色的核心">
          <p>
            这是我如今所做之事的中心。作为政府职业操守领域的一名高级分析师，工作正是这个：在真实的
            约束下，把不完整的信息变成一份可辩护、给决策者的评估。这一页上的纪律就是日常的实践——用
            <strong>ACH</strong> 这样的结构化技术<strong>防范我自己的偏差</strong>、<strong>为来源
            分级</strong>而非信任它们、把<strong>报告与解释分开</strong>，并对我究竟能下什么结论
            <strong>保持校准与合法</strong>。
          </p>
          <p>
            这是本板块其余部分汇聚起来、服务于一个决策之处：<Link href="/knowledge/statistics">统计
            </Link>用于诚实的不确定性、<Link href="/knowledge/geospatial-analysis">空间分析</Link>用于
            「在哪里」、<Link href="/knowledge/science-communication">沟通</Link>用于交接——全都瞄准
            同一个目标：一个可靠、可辩护、帮某人决断得好的判断。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              情报 = 为一个具体决策所做的<strong>不确定性下的评估</strong>。以是否有用、而非是否聪明
              来评判。
            </li>
            <li>
              <strong>情报循环</strong>（方向 → 采集 → 处理 → 分析 → 分发）是一个系于决策者需求的
              循环。
            </li>
            <li>
              真正的敌人是你自己的<strong>认知偏差</strong>（确认、锚定、过早收口）——方法胜过意志力。
            </li>
            <li>
              <strong>结构化分析技术</strong>：<strong>ACH</strong>（列出所有假设、寻找证伪的证据）、
              关键假设检查，以及把报告与解释分开。
            </li>
            <li>
              <strong>OSINT</strong>：把<strong>来源可靠性</strong>与<strong>信息可信度</strong>分开
              分级；相互佐证；一个被回响的故事仍只是一条说法。
            </li>
            <li>
              使用校准过的<strong>置信度语言</strong>（概率标尺），并以<strong>合法、相称、廉正
              </strong>的方式工作。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          本页上的技艺反映了既有的情报分析参考（CIA/情报界关于结构化分析技术的《技艺入门》、OSINT
          实践），以及亲身的政府工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Intelligence Analysis & OSINT",
    subtitle:
      "Turning information into judgement someone can act on. Not 'what does the data say' but 'what does it mean, how sure are we, and what should we do' — with rigour against the biases that fool every analyst.",
    description:
      "A thorough, practical explainer of intelligence analysis and OSINT — the intelligence cycle, intelligence vs data analysis, cognitive bias, structured analytic techniques (ACH, key assumptions check), open-source collection and source grading, the language of analytic confidence, and probity. In-Practice tier, anchored to Rin Huang's government intelligence work.",
    course: "Intelligence Analysis & OSINT",
    courseCode: "In practice · gov intelligence",
    level: "Professional",
    learned: "CBS · SAPOL · OSINT cert",
    applied: "Professional-standards intel",
    readingTime: "~15 min read",
    sections: [
      { id: "what", label: "Data with a decision attached" },
      { id: "cycle", label: "The intelligence cycle" },
      { id: "vsdata", label: "Intelligence vs data analysis" },
      { id: "bias", label: "The enemy is your own mind" },
      { id: "sats", label: "Structured analytic techniques" },
      { id: "osint", label: "OSINT and source grading" },
      { id: "language", label: "The language of confidence" },
      { id: "ethics", label: "Probity and the law" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "Applied Data Science" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "情报分析与 OSINT",
    subtitle:
      "把信息变成某人能据以行动的判断。不是「数据说了什么」，而是「它意味着什么、我们有多确定、我们该做什么」——以严谨对抗那些骗过每一位分析师的偏见。",
    description:
      "对情报分析与 OSINT 的详尽、实用讲解——情报循环、情报 vs 数据分析、认知偏差、结构化分析技术（ACH、关键假设检查）、开源采集与来源分级、分析置信度的语言，以及廉正。实务层，锚定 Rin Huang 的政府情报工作。",
    course: "情报分析与 OSINT",
    courseCode: "实务 · 政府情报",
    level: "职业",
    learned: "CBS · SAPOL · OSINT 认证",
    applied: "职业操守情报",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "附着着一个决策的数据" },
      { id: "cycle", label: "情报循环" },
      { id: "vsdata", label: "情报 vs 数据分析" },
      { id: "bias", label: "敌人是你自己的头脑" },
      { id: "sats", label: "结构化分析技术" },
      { id: "osint", label: "OSINT 与来源分级" },
      { id: "language", label: "置信度的语言" },
      { id: "ethics", label: "廉正与法律" },
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
  return { slug: "intelligence-analysis", updated: "2026-06-25", ...meta, Body };
}
