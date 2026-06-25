import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/fairness-bias.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the proxy-trap figure's text labels are
 * localised; the figure geometry is internal. The ✗ glyph is kept identical.
 */

function ProxyTrapFigure({ caption, ariaLabel, removedLabel, proxyLabels, modelLabel, flowLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* removed protected attribute */}
        <rect x="20" y="20" width="120" height="26" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="80" y="37" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{removedLabel}</text>
        {/* proxies */}
        {proxyLabels.map((t, i) => {
          const y = 64 + i * 20;
          return (
            <g key={i}>
              <rect x="20" y={y} width="120" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="80" y={y + 11} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{t}</text>
              <line x1="140" y1={y + 8} x2="280" y2="78" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            </g>
          );
        })}
        {/* dashed link from removed attribute to proxies */}
        <line x1="80" y1="46" x2="80" y2="64" stroke="#FF3C3C" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        {/* model */}
        <rect x="280" y="62" width="90" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="325" y="81" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="currentColor">{modelLabel}</text>
        <text x="325" y="112" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">{flowLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        A machine-learning model learns patterns from data — and if that data reflects an unfair
        world, the model learns the unfairness and reproduces it, faster, cheaper, and wrapped in a
        veneer of mathematical objectivity that makes it harder to challenge.{" "}
        <Term>Algorithmic bias</Term> is not a hypothetical: risk-assessment tools, hiring filters,
        and lending models have all been shown to treat groups of people systematically differently.{" "}
        <Term>Fairness in ML</Term> is the technical discipline of detecting and reducing that — and
        it's genuinely hard, for a reason that surprises most people:{" "}
        <strong>
          "fair" has several precise definitions, and you can't satisfy them all at once.
        </strong>
      </p>
      <p>
        This sits next to the <Link href="/knowledge/data-governance">data governance</Link> page —
        that one is the policy and ethics; this is the machinery: how bias gets in, how to measure
        fairness, the mathematical impossibility at the core, and where you can intervene. It
        matters anywhere a model-assisted decision affects people, which in a government setting is
        much of the point.
      </p>

      <KSection id="why" eyebrow="01" title="Bias with consequences">
        <p>
          The word "bias" here doesn't mean the{" "}
          <Link href="/knowledge/statistical-machine-learning">bias-variance</Link> kind from the
          modelling page — it means <em>systematic unfairness toward a group of people</em>, usually
          one defined by a <Term>protected attribute</Term> (race, sex, age, disability). The danger
          is specific: a model applies its learned bias <strong>consistently and at scale</strong>,
          to everyone, instantly, while looking neutral. A biased human decision-maker affects the
          people they meet; a biased model can affect millions and is much harder to argue with,
          because "the algorithm said so" carries false authority.
        </p>
      </KSection>

      <KSection id="enters" eyebrow="02" title="How bias gets in">
        <p>
          Bias rarely comes from a malicious modeller. It seeps in through the data and the framing,
          mostly invisibly:
        </p>
        <ul>
          <li>
            <Term>Historical bias</Term> — the data faithfully records a world that was already
            unequal. A hiring model trained on who got hired before learns the past's prejudices as
            if they were merit.
          </li>
          <li>
            <Term>Representation bias</Term> — some groups are under-sampled, so the model works
            worse for them (the <Link href="/knowledge/sampling-survey-methodology">coverage</Link>{" "}
            problem with human stakes).
          </li>
          <li>
            <Term>Measurement bias</Term> — the label itself is a flawed proxy. "Re-arrested" is not
            the same as "committed a crime", but a model trained on arrests learns policing
            patterns, not crime.
          </li>
        </ul>
        <p>
          The throughline: the model is an accurate mirror of biased data.{" "}
          <strong>Garbage in, bias out</strong> — and the model then amplifies and entrenches it.
        </p>
      </KSection>

      <KSection id="proxy" eyebrow="03" title="The proxy trap: you can't just delete the variable">
        <p>
          The intuitive first fix — "just don't give the model race or sex" —{" "}
          <strong>does not work</strong>, and understanding why is the single most important idea on
          this page. The protected attribute is almost always encoded redundantly in the{" "}
          <em>other</em> features through <Term>proxies</Term>.
        </p>
        <ProxyTrapFigure
          caption="The proxy trap. Removing the protected attribute (race) doesn't remove its influence — postcode, name, school, and shopping patterns all correlate with it, so the model reconstructs the protected attribute from its proxies and the bias flows through anyway."
          ariaLabel="A removed protected attribute box, with proxy features (postcode, name, school) still feeding into the model and reconstructing it."
          removedLabel="race (removed) ✗"
          proxyLabels={["postcode", "name", "school", "spending"]}
          modelLabel="model"
          flowLabel="bias flows through anyway"
        />
        <p>
          Postcode correlates with race; first name signals gender; the school you attended, your
          shopping patterns, your phrasing — any of them can let a model <em>reconstruct</em> the
          protected attribute it was never given, and discriminate through the back door. This is
          why fairness can't be achieved by blindness; you have to actively <em>measure</em>{" "}
          outcomes across groups and intervene, which means the analysis is anything but simple.
        </p>
      </KSection>

      <KSection id="metrics" eyebrow="04" title="Defining 'fair': the metrics">
        <p>
          To fix fairness you must first define it — and there are several reasonable, mutually
          competing definitions. The main group-fairness criteria:
        </p>
        <ul>
          <li>
            <Term>Demographic parity</Term> — each group gets positive outcomes at the same{" "}
            <em>rate</em> (equal approval rates across groups), regardless of anything else.
          </li>
          <li>
            <Term>Equal opportunity</Term> — among those who genuinely <em>should</em> get the
            positive outcome, each group is caught at the same rate (equal true-positive rates).
          </li>
          <li>
            <Term>Equalised odds</Term> — stricter: equal true-positive <em>and</em> false-positive
            rates across groups.
          </li>
        </ul>
        <p>
          Each encodes a different, defensible notion of fairness — and that's exactly where the
          trouble starts, because they can pull against each other.
        </p>
      </KSection>

      <KSection id="impossible" eyebrow="05" title="The impossibility result">
        <p>
          Here is the deep, sobering fact at the heart of the field:{" "}
          <strong>
            when groups have different base rates, you cannot satisfy all the fairness criteria
            simultaneously.
          </strong>{" "}
          It's a mathematical impossibility (formalised by Chouldechova and by Kleinberg and
          colleagues), not an engineering gap — calibration, equal false-positive rates, and equal
          false-negative rates can't all hold at once unless the base rates are identical or the
          model is perfect.
        </p>
        <Callout type="intuition">
          <p>
            The famous case is <Term>COMPAS</Term>, a US criminal-risk tool. ProPublica showed it
            gave Black defendants higher false-positive rates and called it unfair; the vendor
            showed it was equally <em>calibrated</em> across groups and called it fair.{" "}
            <strong>Both were mathematically correct</strong> — they'd simply chosen different
            fairness criteria, and the impossibility result says you can't have both when base rates
            differ. The lesson is uncomfortable but clarifying: there is no single, objective
            "fair". Fairness is a <em>choice</em> about which kind of error to equalise, and that
            choice is a value judgement that has to be made openly and defended — not a technical
            detail to optimise away.
          </p>
        </Callout>
      </KSection>

      <KSection id="mitigate" eyebrow="06" title="Where to intervene">
        <p>
          Once you've chosen a fairness definition and measured the disparity, mitigation can act at
          three stages of the pipeline:
        </p>
        <ul>
          <li>
            <Term>Pre-processing</Term> — fix the data before training: reweight under-represented
            groups, re-sample, or transform features to reduce the disparity at the source.
          </li>
          <li>
            <Term>In-processing</Term> — build fairness into the training itself, adding a fairness
            constraint or penalty to the objective so the model optimises accuracy <em>and</em>{" "}
            fairness together (e.g. adversarial debiasing).
          </li>
          <li>
            <Term>Post-processing</Term> — adjust the model's outputs after the fact, e.g. using
            group-specific thresholds to equalise the chosen metric.
          </li>
        </ul>
        <p>
          None is a silver bullet, and every one trades some accuracy or one fairness notion for
          another — which is why fairness work is inseparable from{" "}
          <Link href="/knowledge/explainable-ai">explanation</Link> (you have to see what the model
          is doing) and from a documented, defensible decision about which trade-off you accepted
          and why.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Equitable, and able to prove it">
          <p>
            Any model that informs a decision about people carries this responsibility, and in
            government it's acute: a model-assisted call that's systematically worse for one group
            isn't just a technical flaw, it's a fairness and accountability failure. The most
            valuable thing this gives me is knowing the <strong>proxy trap</strong> — that dropping
            a sensitive attribute doesn't make a model fair, because it reconstructs it from
            postcode and the rest — so fairness has to be <em>measured</em> across groups, not
            assumed.
          </p>
          <p>
            And the <strong>impossibility result</strong> reframes the whole conversation honestly:
            there's no objectively "fair" model, so the real work is choosing <em>which</em>{" "}
            fairness criterion fits the context, naming the trade-off out loud, and being able to
            defend it — exactly the kind of value judgement that shouldn't be hidden inside an
            algorithm. It ties straight to{" "}
            <Link href="/knowledge/explainable-ai">explainability</Link> (you can't audit fairness
            you can't see), <Link href="/knowledge/feature-engineering">feature engineering</Link>{" "}
            (where proxies live), and <Link href="/knowledge/data-governance">governance</Link> (the
            policy around it).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A model trained on a biased world <strong>learns and amplifies the bias</strong> — at
              scale, with false authority. "Bias" here = unfairness to a protected group, not
              bias-variance.
            </li>
            <li>
              Bias enters via <strong>historical, representation, and measurement</strong> bias —
              the data mirrors an unequal world.
            </li>
            <li>
              The <strong>proxy trap</strong>: deleting race/sex doesn't help — postcode, name, etc.
              reconstruct it. Fairness needs <strong>measurement across groups</strong>, not
              blindness.
            </li>
            <li>
              Fairness metrics: <strong>demographic parity</strong> (equal rates),{" "}
              <strong>equal opportunity</strong> (equal TPR), <strong>equalised odds</strong> (equal
              TPR + FPR) — and they compete.
            </li>
            <li>
              <strong>Impossibility result</strong>: with different base rates you can't satisfy all
              at once (COMPAS — both sides were right). Fairness is a <strong>value choice</strong>,
              not an optimisation.
            </li>
            <li>
              Mitigate at <strong>pre- / in- / post-processing</strong> — each trades off accuracy
              or another fairness notion. Document the choice.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The proxy/redundant-encoding trap, the group-fairness metrics, the impossibility result,
          and the COMPAS case reflect current fairness-in-ML references alongside hands-on work.
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
        一个机器学习模型从数据中学习模式——而如果那些数据反映的是一个不公平的世界，模型就学会那份不
        公平、并把它复制出来，更快、更便宜，还裹着一层数学客观性的外衣，让它更难被质疑。
        <Term>算法偏差</Term>不是一个假设：风险评估工具、招聘筛选、放贷模型，全都被证明会系统性地区别
        对待一群群的人。<Term>机器学习中的公平</Term>是检测并减少那个的技术学科——而它真的很难，原因让
        大多数人吃惊：<strong>「公平」有好几个精确的定义，而你没法同时满足它们全部。</strong>
      </p>
      <p>
        这一页紧挨着<Link href="/knowledge/data-governance">数据治理</Link>页——那一页是政策与伦理；这
        一页是机械：偏差如何进入、如何测量公平、核心那个数学上的不可能，以及你可以在哪里干预。它在任何
        模型辅助的决定影响到人之处都要紧，而在政府的环境里，这差不多就是重点所在。
      </p>

      <KSection id="why" eyebrow="01" title="有后果的偏差">
        <p>
          这里的「偏差」一词，不是指建模页里那种<Link href="/knowledge/statistical-machine-learning">
          偏差-方差</Link>——它指的是<em>对一群人的系统性不公平</em>，通常是由一个<Term>受保护属性</Term>
          （种族、性别、年龄、残障）所界定的一群。危险很具体：一个模型<strong>一致地、大规模地</strong>
          把它学到的偏差施加出去，施加给每一个人、瞬间完成，却看起来中立。一个有偏的人类决策者影响他
          遇到的人；一个有偏的模型可以影响数百万人，并且难争辩得多，因为「算法这么说的」带着虚假的
          权威。
        </p>
      </KSection>

      <KSection id="enters" eyebrow="02" title="偏差如何进入">
        <p>偏差很少来自一个心怀恶意的建模者。它通过数据和框定渗进来，大多是看不见的：</p>
        <ul>
          <li>
            <Term>历史偏差</Term>——数据忠实地记录了一个本就不平等的世界。一个在「以前谁被录用了」上
            训练的招聘模型，把过去的偏见学得仿佛它们是才能。
          </li>
          <li>
            <Term>代表性偏差</Term>——某些群体被采样不足，所以模型对他们运作得更差（带着人的赌注的
            <Link href="/knowledge/sampling-survey-methodology">覆盖</Link>问题）。
          </li>
          <li>
            <Term>测量偏差</Term>——标签本身就是一个有缺陷的代理。「再次被捕」与「犯了罪」不是一回事，
            但一个在逮捕数据上训练的模型，学到的是警务模式，而非犯罪。
          </li>
        </ul>
        <p>
          贯穿其中的主线：模型是有偏数据的一面准确的镜子。<strong>垃圾进，偏差出</strong>——而模型接着
          把它放大、并使之根深蒂固。
        </p>
      </KSection>

      <KSection id="proxy" eyebrow="03" title="代理陷阱：你没法只是删掉那个变量">
        <p>
          那个直觉性的第一个修法——「干脆别把种族或性别给模型」——<strong>行不通</strong>，而弄懂为
          什么，是这一页上单一最重要的想法。受保护属性几乎总是通过<Term>代理变量</Term>，冗余地编码在
          <em>其他</em>特征里。
        </p>
        <ProxyTrapFigure
          caption="代理陷阱。移除受保护属性（种族）并不移除它的影响——邮编、姓名、学校、消费模式全都与它相关，所以模型从它的代理变量重建出受保护属性，偏差照样流过。"
          ariaLabel="一个被移除的受保护属性框，代理特征（邮编、姓名、学校）仍然喂入模型、把它重建出来。"
          removedLabel="种族（已移除）✗"
          proxyLabels={["邮编", "姓名", "学校", "消费"]}
          modelLabel="模型"
          flowLabel="偏差照样流过"
        />
        <p>
          邮编与种族相关；名字透露性别；你上过的学校、你的消费模式、你的措辞——它们中任何一个，都能让
          一个模型<em>重建</em>出那个它从未被给过的受保护属性，并从后门进行歧视。这就是为什么公平没法
          靠视而不见来达成；你必须主动地<em>测量</em>各群体之间的结果、并干预，这意味着这份分析绝非
          简单。
        </p>
      </KSection>

      <KSection id="metrics" eyebrow="04" title="定义「公平」：那些指标">
        <p>要修好公平，你必须先定义它——而有好几个合理的、彼此竞争的定义。主要的群体公平准则：</p>
        <ul>
          <li>
            <Term>人口平价</Term>——每个群体以相同的<em>比率</em>得到正面结果（各群体间相等的批准率），
            无关其他任何东西。
          </li>
          <li>
            <Term>机会均等</Term>——在那些真正<em>应当</em>得到正面结果的人当中，每个群体以相同的比率被
            捕获（相等的真阳性率）。
          </li>
          <li>
            <Term>均等几率</Term>——更严格：各群体间相等的真阳性<em>和</em>假阳性率。
          </li>
        </ul>
        <p>
          每一个都编码了一个不同的、可辩护的公平观念——而麻烦恰恰从这里开始，因为它们可以彼此拉扯。
        </p>
      </KSection>

      <KSection id="impossible" eyebrow="05" title="不可能性结果">
        <p>
          这是这个领域核心那个深刻而发人深省的事实：<strong>当各群体有不同的基础率时，你无法同时满足
          所有的公平准则。</strong>这是一个数学上的不可能（由 Chouldechova、以及 Kleinberg 及同事们
          形式化），而非一个工程上的缺口——校准、相等的假阳性率、相等的假阴性率，无法同时成立，除非
          基础率完全相同、或模型完美。
        </p>
        <Callout type="intuition">
          <p>
            那个著名的案例是 <Term>COMPAS</Term>，一个美国的刑事风险工具。ProPublica 指出它给黑人被告
            更高的假阳性率，称它不公平；供应商指出它在各群体间被同等地<em>校准</em>，称它公平。
            <strong>两者在数学上都是对的</strong>——他们只是选了不同的公平准则，而不可能性结果说，当
            基础率不同时你没法两者兼得。教训令人不适，却让人豁然开朗：不存在单一的、客观的「公平」。
            公平是一个关于要把哪一种错误拉平的<em>选择</em>，而那个选择是一个价值判断，必须被公开地
            做出、并被辩护——而非一个可以优化掉的技术细节。
          </p>
        </Callout>
      </KSection>

      <KSection id="mitigate" eyebrow="06" title="在哪里干预">
        <p>一旦你选定了一个公平定义、并测量了那个差距，缓解可以在流水线的三个阶段行动：</p>
        <ul>
          <li>
            <Term>预处理</Term>——在训练之前修数据：给代表不足的群体重新加权、重新采样，或变换特征，以
            在源头减少那个差距。
          </li>
          <li>
            <Term>处理中</Term>——把公平建进训练本身，给目标函数加上一个公平约束或惩罚，好让模型同时
            优化准确度<em>和</em>公平（例如对抗性去偏）。
          </li>
          <li>
            <Term>后处理</Term>——事后调整模型的输出，例如用群体特定的阈值来拉平所选的指标。
          </li>
        </ul>
        <p>
          没有一个是银弹，而每一个都拿一些准确度、或一个公平观念，去换另一个——这就是为什么公平工作与
          <Link href="/knowledge/explainable-ai">解释</Link>（你必须看见模型在做什么）、以及一个有记录
          的、可辩护的关于「你接受了哪个权衡、为什么」的决定，密不可分。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="公平，并且能证明它">
          <p>
            任何为关于人的决定提供依据的模型，都担着这份责任，而在政府里它很尖锐：一个对某一群人系统性
            地更差的模型辅助判断，不只是一个技术缺陷，而是一次公平与问责的失败。这给我的最有价值的东西，
            是知道那个<strong>代理陷阱</strong>——丢掉一个敏感属性并不让一个模型变公平，因为它会从邮编
            和其余的一切重建出它——所以公平必须被跨群体地<em>测量</em>，而非假定。
          </p>
          <p>
            而<strong>不可能性结果</strong>诚实地重构了整场对话：不存在一个客观上「公平」的模型，所以
            真正的工作是选择<em>哪一个</em>公平准则适合这个语境、把那个权衡大声说出来、并能为它辩护——
            正是那种不该被藏在一个算法里面的价值判断。它直接连到
            <Link href="/knowledge/explainable-ai">可解释性</Link>（你审计不了你看不见的公平）、
            <Link href="/knowledge/feature-engineering">特征工程</Link>（代理变量住的地方），以及
            <Link href="/knowledge/data-governance">治理</Link>（围绕它的政策）。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个在有偏的世界上训练的模型<strong>学会并放大那份偏差</strong>——大规模地，带着虚假的
              权威。这里的「偏差」= 对一个受保护群体的不公平，而非偏差-方差。
            </li>
            <li>
              偏差通过<strong>历史、代表性、测量</strong>偏差进入——数据映照出一个不平等的世界。
            </li>
            <li>
              <strong>代理陷阱</strong>：删掉种族/性别没用——邮编、姓名等会把它重建出来。公平需要
              <strong>跨群体的测量</strong>，而非视而不见。
            </li>
            <li>
              公平指标：<strong>人口平价</strong>（相等比率）、<strong>机会均等</strong>（相等 TPR）、
              <strong>均等几率</strong>（相等 TPR + FPR）——而它们彼此竞争。
            </li>
            <li>
              <strong>不可能性结果</strong>：在不同的基础率下你没法同时满足全部（COMPAS——双方都是
              对的）。公平是一个<strong>价值选择</strong>，而非一次优化。
            </li>
            <li>
              在<strong>预处理 / 处理中 / 后处理</strong>缓解——每一个都拿准确度、或另一个公平观念去
              权衡。把选择记录下来。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          代理/冗余编码陷阱、群体公平指标、不可能性结果，以及 COMPAS 案例，反映了当前机器学习公平性的
          参考文献以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Fairness & Bias in Machine Learning",
    subtitle:
      "A model trained on a biased world learns the bias and applies it at scale, with the authority of maths. Making a model fair is harder than it sounds — partly because 'fair' has several definitions that can't all be true at once.",
    description:
      "A thorough, practical explainer of fairness and bias in machine learning — how bias enters, the proxy-variable trap, group fairness metrics (demographic parity, equalised odds), the impossibility result, individual fairness, and bias mitigation. In-Practice tier, anchored to Rin Huang's equitable, accountable government-analyst work.",
    course: "Fairness & Bias in Machine Learning",
    courseCode: "In practice · equitable decisions",
    level: "Professional",
    learned: "Gov analysis · ongoing",
    applied: "Equitable model-assisted calls",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Bias with consequences" },
      { id: "enters", label: "How bias gets in" },
      { id: "proxy", label: "The proxy trap" },
      { id: "metrics", label: "Defining fair" },
      { id: "impossible", label: "The impossibility result" },
      { id: "mitigate", label: "Where to intervene" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "机器学习中的公平与偏差",
    subtitle:
      "一个在有偏的世界上训练的模型，学会那份偏差，并以数学的权威把它大规模地施加出去。让一个模型变公平，比听起来要难——部分是因为「公平」有好几个无法同时为真的定义。",
    description:
      "对机器学习中公平与偏差的详尽、实用讲解——偏差如何进入、代理变量陷阱、群体公平指标（人口平价、均等几率）、不可能性结果、个体公平，以及偏差缓解。实务层，锚定 Rin Huang 公平、须问责的政府分析师工作。",
    course: "机器学习中的公平与偏差",
    courseCode: "实务 · 公平的决定",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "公平的模型辅助判断",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "有后果的偏差" },
      { id: "enters", label: "偏差如何进入" },
      { id: "proxy", label: "代理陷阱" },
      { id: "metrics", label: "定义公平" },
      { id: "impossible", label: "不可能性结果" },
      { id: "mitigate", label: "在哪里干预" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/data-governance", label: "数据治理、隐私与伦理" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "fairness-bias", updated: "2026-06-26", ...meta, Body };
}
