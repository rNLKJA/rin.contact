import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/active-semi-supervised-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the active-learning loop figure's text
 * labels are localised; geometry is internal. Accent node is by INDEX (1 = query).
 */

const LOOP_NODES = [
  [90, 35],
  [350, 75],
  [90, 115],
];

function ActiveLoopFigure({ caption, ariaLabel, nodeLabels, retrainLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {LOOP_NODES.map(([cx, cy], i) => {
          const hot = i === 1; // query uncertain
          return (
            <g key={i}>
              <rect
                x={cx - 62}
                y={cy - 15}
                width="124"
                height="30"
                rx="5"
                fill="none"
                stroke={hot ? "#FF3C3C" : "currentColor"}
                strokeWidth={hot ? "1.5" : "1.3"}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill={hot ? "#FF3C3C" : "currentColor"}
              >
                {nodeLabels[i]}
              </text>
            </g>
          );
        })}
        <line
          x1="152"
          y1="39"
          x2="290"
          y2="69"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#asah)"
        />
        <line
          x1="290"
          y1="81"
          x2="152"
          y2="111"
          stroke="#FF3C3C"
          strokeWidth="1.2"
          markerEnd="url(#asahr)"
        />
        <line
          x1="90"
          y1="100"
          x2="90"
          y2="50"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#asah)"
        />
        <text
          x="58"
          y="78"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {retrainLabel}
        </text>
        <defs>
          <marker id="asah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
          </marker>
          <marker id="asahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
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
        Standard <Link href="/knowledge/statistical-machine-learning">supervised learning</Link> has
        an expensive appetite: it needs lots of <em>labelled</em> examples, and labelling is slow,
        costly, and often requires a human expert. Yet <em>unlabelled</em> data is usually abundant
        and nearly free — mountains of text, images, and records nobody has annotated.{" "}
        <Term>Semi-supervised</Term> and <Term>active learning</Term> are two strategies for the
        same real-world problem: <strong>learn a good model when labels are scarce</strong>, by
        making the most of the unlabelled data you have, or by being smart about which few examples
        are worth the cost of labelling.
      </p>
      <p>
        It's a genuinely distinct corner of ML — neither fully supervised nor fully{" "}
        <Link href="/knowledge/clustering">unsupervised</Link> — and a very practical one wherever
        labels are the bottleneck. This page is both strategies, the assumptions that make them
        work, and the failure modes that make them backfire.
      </p>

      <KSection id="why" eyebrow="01" title="The labelling bottleneck">
        <p>
          The economics are stark: to train a classifier you need labelled examples, and a human has
          to create each label — a doctor marking scans, an analyst tagging cases, someone
          transcribing audio. That's the expensive, rate-limiting step. Meanwhile the{" "}
          <em>unlabelled</em> version of that data piles up for free. The natural question follows:
          can we get most of the accuracy of a large labelled dataset from just a small one, by
          exploiting the unlabelled abundance? Both methods here answer yes — in different ways.
        </p>
      </KSection>

      <KSection id="semi" eyebrow="02" title="Semi-supervised: learning from the unlabelled pile">
        <p>
          <Term>Semi-supervised learning</Term> trains on a <em>small</em> labelled set{" "}
          <em>plus</em> a <em>large</em> unlabelled set together, letting the structure of the
          unlabelled data sharpen the model. Two common mechanisms:
        </p>
        <ul>
          <li>
            <Term>Self-training / pseudo-labelling</Term> — train a model on the labelled data, use
            it to <em>predict</em> labels for the unlabelled data, keep the most confident of those
            as <Term>pseudo-labels</Term>, and retrain on the enlarged set. The model bootstraps
            itself, teaching itself from its own confident guesses.
          </li>
          <li>
            <Term>Label propagation</Term> — build a{" "}
            <Link href="/knowledge/network-graph-analysis">graph</Link> connecting similar points,
            then let the few known labels <em>spread</em> along the edges to their unlabelled
            neighbours. Labels flow to nearby points like dye through water.
          </li>
        </ul>
        <p>
          Both turn cheap unlabelled data into extra (approximate) training signal — but only if a
          key assumption holds.
        </p>
      </KSection>

      <KSection id="assumptions" eyebrow="03" title="When does unlabelled data actually help?">
        <p>
          Unlabelled data isn't magic — it helps only when its <em>structure</em> tells you
          something about the labels. The assumptions that make that true:
        </p>
        <ul>
          <li>
            <Term>Cluster assumption</Term> — points in the same dense{" "}
            <Link href="/knowledge/clustering">cluster</Link> tend to share a label, so the
            unlabelled data reveals where the clusters (and thus the decision boundary) are.
          </li>
          <li>
            <Term>Manifold assumption</Term> — the data lies on a lower-dimensional surface, and
            labels vary smoothly along it (the{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">low-dimensional structure</Link>{" "}
            idea).
          </li>
          <li>
            <Term>Smoothness assumption</Term> — points close together in a high-density region
            should get the same label.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The unifying intuition: unlabelled data shows you the <em>shape</em> of the data — where
            it's dense, where the gaps are — and that shape suggests where the decision boundary{" "}
            <em>shouldn't</em> cut (through dense regions). If these assumptions hold, a few labels
            go a long way. If they <em>don't</em> — if the boundary genuinely runs through a dense
            cluster — unlabelled data can actively mislead. That conditionality is the whole catch.
          </p>
        </Callout>
      </KSection>

      <KSection id="active" eyebrow="04" title="Active learning: choosing what to label">
        <p>
          <Term>Active learning</Term> attacks the cost from the other side. Instead of labelling
          data at random, it lets the{" "}
          <strong>model choose which examples are most worth labelling</strong> — then a human
          labels just those. Since the budget is small, spending it on the <em>most informative</em>{" "}
          points (rather than random ones) yields a far better model per label.
        </p>
        <ActiveLoopFigure
          caption="The active-learning loop. Train on the few labels you have; ask the model which unlabelled point it's most unsure about; a human labels just that one; retrain. The model directs its own learning, spending the scarce labelling budget where it helps most."
          ariaLabel="A cycle: train model, query the most uncertain point, human labels it, add to training set, retrain."
          nodeLabels={["train model", "query uncertain", "human labels"]}
          retrainLabel="retrain"
        />
        <p>
          How does it pick? The common strategies all target <em>informativeness</em>:
        </p>
        <ul>
          <li>
            <Term>Uncertainty sampling</Term> — label the points the model is <em>least sure</em>{" "}
            about (near its decision boundary). Resolving those teaches it the most. (Knowing{" "}
            <em>how</em> unsure ties to{" "}
            <Link href="/knowledge/conformal-prediction">uncertainty quantification</Link>.)
          </li>
          <li>
            <Term>Query-by-committee</Term> — train several models; label the points they{" "}
            <em>disagree</em> on most, since disagreement marks the genuinely ambiguous cases.
          </li>
        </ul>
      </KSection>

      <KSection id="selfsup" eyebrow="05" title="Self-supervised: the modern cousin">
        <p>
          Worth a mention because it powers today's largest models:{" "}
          <Term>self-supervised learning</Term> manufactures labels from the unlabelled data itself,
          via a <em>pretext task</em> — predict a hidden part of the input from the rest (predict
          the next word; fill in a masked patch of an image). No human labels at all, yet the model
          learns rich, general representations it can then fine-tune on a small labelled set. This
          is exactly how <Link href="/knowledge/large-language-models">LLMs</Link> are pretrained
          (next-token prediction is a self-supervised pretext task), and it's the most powerful way
          yet found to exploit unlabelled data at scale.
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="06" title="Where it goes wrong">
        <p>Both approaches have a characteristic failure mode worth respecting:</p>
        <Callout type="pitfall">
          <p>
            Semi-supervised learning's danger is <Term>confirmation bias</Term> — pseudo-labelling{" "}
            <em>amplifies its own mistakes</em>. If the model confidently mislabels some unlabelled
            points and trains on those wrong labels, it becomes <em>more</em> confidently wrong, in
            a self-reinforcing spiral. Active learning's danger is <strong>sampling bias</strong>:
            by deliberately labelling only the unusual, uncertain points, the labelled set stops
            being representative of the population — which can skew evaluation and the model itself.
            And both rest on <strong>assumptions</strong> (cluster/smoothness) that, when violated,
            make the unlabelled data <em>hurt</em> rather than help. The lesson: these are powerful
            when labels are scarce, but they need careful thresholds, validation on a clean held-out
            set, and honesty about whether their assumptions actually hold.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="When labelled cases are rare">
          <p>
            In intelligence and government work, labelled examples are often genuinely scarce —
            confirmed cases are rare and expensive to establish, while unlabelled records are
            plentiful. That's exactly the setting these methods are built for.{" "}
            <strong>Active learning</strong> is the more directly useful one: when an expert's time
            to label cases is the bottleneck, spending it on the model's{" "}
            <strong>most uncertain</strong> cases rather than a random sample gets a usable
            classifier from far fewer labels.
          </p>
          <p>
            What keeps it honest is the failure modes —{" "}
            <strong>pseudo-label confirmation bias</strong> (the model amplifying its own errors)
            and <strong>active-learning sampling bias</strong> (a labelled set that no longer
            represents the population). Both mean the results need careful{" "}
            <Link href="/knowledge/model-evaluation">validation</Link> on a clean held-out set. It
            ties to the{" "}
            <Link href="/knowledge/statistical-machine-learning">supervised/unsupervised</Link>{" "}
            split, <Link href="/knowledge/clustering">clustering</Link> (the assumptions), and the
            human-in-the-loop discipline that runs through the responsible-AI pages.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The problem: <strong>labels are expensive, unlabelled data is cheap</strong>. Learn
              well from few labels.
            </li>
            <li>
              <strong>Semi-supervised</strong>: train on a little labelled + lots of unlabelled —{" "}
              <strong>pseudo-labelling</strong> (self-train on confident guesses) and{" "}
              <strong>label propagation</strong> (spread labels along a similarity graph).
            </li>
            <li>
              It only helps if assumptions hold — <strong>cluster / manifold / smoothness</strong>{" "}
              (the unlabelled data reveals where the boundary shouldn't cut). Otherwise it can
              mislead.
            </li>
            <li>
              <strong>Active learning</strong>: the model <em>chooses</em> what to label —{" "}
              <strong>uncertainty sampling</strong> (label what it's least sure of),
              query-by-committee. A human-in-the-loop query loop.
            </li>
            <li>
              <strong>Self-supervised</strong> learning makes labels from the data itself (pretext
              tasks) — how LLMs are pretrained.
            </li>
            <li>
              Pitfalls: pseudo-label <strong>confirmation bias</strong> (amplifies errors),
              active-learning <strong>sampling bias</strong> (unrepresentative labels). Validate on
              a clean held-out set.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The semi-supervised assumptions, pseudo-labelling/label-propagation methods,
          active-learning query strategies, and the confirmation-bias caution reflect current
          references alongside ML coursework.
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
        标准的<Link href="/knowledge/statistical-machine-learning">监督学习</Link>
        有一副昂贵的胃口：它 需要大量<em>带标签</em>
        的样本，而标注缓慢、昂贵，往往还需要一位人类专家。然而<em>无标签</em>的
        数据通常充裕、几乎免费——成堆没人标注过的文本、图像与记录。<Term>半监督</Term>与
        <Term>主动学习</Term>是针对同一个现实问题的两种策略：
        <strong>在标签稀缺时学出一个好模型</strong>
        ——办法是把你手里的无标签数据用到极致，或者对「哪几个样本值得付标注的代价」放聪明些。
      </p>
      <p>
        它是机器学习里一个真正独特的角落——既非完全监督、也非完全
        <Link href="/knowledge/clustering">无监督</Link>
        ——而且在任何标签是瓶颈之处都非常实用。这一页讲
        两种策略、让它们奏效的那些假设，以及让它们反噬的那些失败模式。
      </p>

      <KSection id="why" eyebrow="01" title="标注的瓶颈">
        <p>
          经济账很赤裸：要训练一个分类器，你需要带标签的样本，而每一个标签都得由一个人来创建——一位
          医生标记扫描图、一名分析师给案件打标签、某人转录音频。那才是昂贵的、限速的一步。与此同时，
          那些数据的<em>无标签</em>
          版本却在免费地堆积。自然的问题随之而来：我们能否靠利用无标签的丰盈，
          仅从一个小的带标签数据集，就得到一个大的带标签数据集大部分的准确度？这里的两种方法都回答
          「能」——以不同的方式。
        </p>
      </KSection>

      <KSection id="semi" eyebrow="02" title="半监督：从无标签的那一堆里学">
        <p>
          <Term>半监督学习</Term>把一个<em>小的</em>带标签集<em>加上</em>一个<em>大的</em>
          无标签集放在 一起训练，让无标签数据的结构来磨利模型。两种常见的机制：
        </p>
        <ul>
          <li>
            <Term>自训练 / 伪标注</Term>——在带标签数据上训练一个模型，用它为无标签数据<em>预测</em>
            标签，把其中最有把握的那些保留为<Term>伪标签</Term>
            ，再在扩大了的集合上重新训练。模型自举 自己，用它自己有把握的猜测来教自己。
          </li>
          <li>
            <Term>标签传播</Term>——建一张<Link href="/knowledge/network-graph-analysis">图</Link>把
            相似的点连起来，然后让那少数已知的标签沿着边<em>扩散</em>
            到它们无标签的邻居。标签像染料在 水中那样流向邻近的点。
          </li>
        </ul>
        <p>两者都把廉价的无标签数据变成额外的（近似的）训练信号——但前提是一个关键的假设成立。</p>
      </KSection>

      <KSection id="assumptions" eyebrow="03" title="无标签数据究竟何时有帮助？">
        <p>
          无标签数据不是魔法——只有当它的<em>结构</em>
          告诉你一些关于标签的事情时，它才有帮助。让那成立的 那些假设：
        </p>
        <ul>
          <li>
            <Term>聚类假设</Term>——同一个稠密<Link href="/knowledge/clustering">簇</Link>
            里的点倾向于 共享一个标签，所以无标签数据揭示出簇（从而决策边界）在哪里。
          </li>
          <li>
            <Term>流形假设</Term>——数据躺在一个更低维的曲面上，标签沿着它平滑地变化（那个
            <Link href="/knowledge/pca-dimensionality-reduction">低维结构</Link>的想法）。
          </li>
          <li>
            <Term>平滑性假设</Term>——在一个高密度区域里彼此靠近的点，应该得到相同的标签。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            统一的直觉：无标签数据给你看数据的<em>形状</em>
            ——哪里稠密、缝隙在哪——而那个形状提示了决策 边界<em>不</em>
            该切过哪里（穿过稠密区域）。如果这些假设成立，几个标签就能走很远。如果它们
            <em>不</em>
            成立——如果边界确实穿过一个稠密的簇——无标签数据反而会主动误导。那份条件性，就是
            全部的难处。
          </p>
        </Callout>
      </KSection>

      <KSection id="active" eyebrow="04" title="主动学习：选择标注什么">
        <p>
          <Term>主动学习</Term>从另一侧攻击成本。它不随机地标注数据，而是让
          <strong>模型选择哪些样本最 值得标注</strong>
          ——然后由一个人只标注那些。既然预算很小，把它花在<em>最有信息量</em>的点上
          （而非随机的点），每个标签就能换来一个好得多的模型。
        </p>
        <ActiveLoopFigure
          caption="主动学习循环。在你手里那几个标签上训练；问模型它对哪个无标签的点最没把握；一个人只标注那一个；重新训练。模型引导它自己的学习，把稀缺的标注预算花在它最有帮助的地方。"
          ariaLabel="一个循环：训练模型、查询最不确定的点、人工标注它、加进训练集、重新训练。"
          nodeLabels={["训练模型", "查询不确定的", "人工标注"]}
          retrainLabel="重新训练"
        />
        <p>
          它怎么挑？常见的策略都瞄准<em>信息量</em>：
        </p>
        <ul>
          <li>
            <Term>不确定性采样</Term>——标注模型<em>最没把握</em>
            的点（在它决策边界附近）。解决那些，教它 的最多。（知道<em>有多</em>没把握，连到
            <Link href="/knowledge/conformal-prediction">不确定性 量化</Link>。）
          </li>
          <li>
            <Term>委员会查询</Term>——训练好几个模型；标注它们<em>分歧</em>最大的点，因为分歧标记出了
            真正模棱两可的个案。
          </li>
        </ul>
      </KSection>

      <KSection id="selfsup" eyebrow="05" title="自监督：现代的表亲">
        <p>
          值得一提，因为它驱动着当今最大的那些模型：<Term>自监督学习</Term>通过一个<em>前置任务</em>
          ，从
          无标签数据本身制造标签——从其余部分预测输入被藏起来的一部分（预测下一个词；补全一张图像被遮
          住的一块）。完全没有人类标签，模型却学到丰富、通用的表示，之后可以在一个小的带标签集上微调。
          这正是 <Link href="/knowledge/large-language-models">LLM</Link>{" "}
          被预训练的方式（下一个词元的
          预测就是一个自监督的前置任务），也是迄今找到的、大规模利用无标签数据最强大的方式。
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="06" title="它在哪里出错">
        <p>两种路子都有一个值得尊重的、特征性的失败模式：</p>
        <Callout type="pitfall">
          <p>
            半监督学习的危险是<Term>确认偏误</Term>——伪标注会<em>放大它自己的错误</em>
            。如果模型自信地给
            一些无标签的点贴错标签、又在那些错误的标签上训练，它就会变得更自信地错，陷入一个自我强化的
            螺旋。主动学习的危险是<strong>采样偏差</strong>
            ：通过刻意只标注那些不寻常的、不确定的点，带
            标签的集合就不再能代表总体——这会扭曲评估、乃至模型本身。而两者都依赖于一些
            <strong>假设</strong>（聚类/平滑性），当这些假设被违反时，会让无标签数据<em>有害</em>
            而非有益。教训是：在
            标签稀缺时它们很强大，但它们需要小心的阈值、在一个干净的留出集上做验证，以及对它们的假设是否
            真的成立保持诚实。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="当带标签的个案稀少时">
          <p>
            在情报与政府工作里，带标签的样本往往真的稀缺——确认过的个案罕见、确立起来代价高昂，而无标签
            的记录则很充裕。那恰恰是这些方法为之而建的场景。<strong>主动学习</strong>
            是更直接有用的那 一个：当一位专家标注个案的时间是瓶颈时，把它花在模型
            <strong>最不确定</strong>的个案、而非
            一个随机样本上，就能用少得多的标签得到一个可用的分类器。
          </p>
          <p>
            让它保持诚实的，是那些失败模式——伪标签的<strong>确认偏误</strong>
            （模型放大自己的错误）与 主动学习的<strong>采样偏差</strong>
            （一个不再代表总体的带标签集）。两者都意味着结果需要在一个 干净的留出集上做小心的
            <Link href="/knowledge/model-evaluation">验证</Link>。它连到
            <Link href="/knowledge/statistical-machine-learning">监督/无监督</Link>的划分、
            <Link href="/knowledge/clustering">聚类</Link>（那些假设），以及贯穿那些负责任 AI
            页的人在 回路的纪律。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              问题：<strong>标签昂贵，无标签数据便宜</strong>。从很少的标签中学得好。
            </li>
            <li>
              <strong>半监督</strong>：在一点点带标签 + 大量无标签上训练——<strong>伪标注</strong>
              （在有 把握的猜测上自训练）与<strong>标签传播</strong>（沿一张相似度图扩散标签）。
            </li>
            <li>
              只有假设成立才有帮助——<strong>聚类 / 流形 / 平滑性</strong>
              （无标签数据揭示边界不该切过 哪里）。否则它会误导。
            </li>
            <li>
              <strong>主动学习</strong>：模型<em>选择</em>标注什么——<strong>不确定性采样</strong>
              （标注它 最没把握的）、委员会查询。一个人在回路的查询循环。
            </li>
            <li>
              <strong>自监督</strong>学习从数据本身制造标签（前置任务）——LLM 被预训练的方式。
            </li>
            <li>
              陷阱：伪标签的<strong>确认偏误</strong>（放大错误）、主动学习的
              <strong>采样偏差</strong>
              （不具代表性的标签）。在一个干净的留出集上验证。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          半监督的假设、伪标注/标签传播的方法、主动学习的查询策略，以及确认偏误的告诫，反映了当前的参考
          文献以及机器学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Active & Semi-Supervised Learning",
    subtitle:
      "Labels cost money; unlabelled data is everywhere. These methods learn well from a handful of labels — either by squeezing signal out of the unlabelled pile, or by being clever about which few points are worth labelling.",
    description:
      "A thorough, practical explainer of active and semi-supervised learning — why labels are expensive, semi-supervised methods (pseudo-labelling, label propagation) and the assumptions they rest on, active learning (uncertainty sampling, the human-in-the-loop query loop), self-supervised learning, and the honest pitfalls. Advanced tier, building on Rin Huang's machine-learning page.",
    course: "Active & Semi-Supervised Learning",
    courseCode: "Advanced · learning with few labels",
    level: "Master's",
    learned: "ML coursework",
    applied: "Classifiers when labels are scarce",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Labels are expensive" },
      { id: "semi", label: "Semi-supervised learning" },
      { id: "assumptions", label: "When unlabelled data helps" },
      { id: "active", label: "Active learning" },
      { id: "selfsup", label: "Self-supervised" },
      { id: "pitfalls", label: "Where it goes wrong" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: {
      href: "/knowledge/statistical-machine-learning",
      label: "Statistical Machine Learning",
    },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "主动学习与半监督学习",
    subtitle:
      "标签要花钱；无标签数据则到处都是。这些方法能从一小把标签中学得很好——要么从那堆无标签数据里挤出信号，要么对「哪几个点值得标注」放聪明些。",
    description:
      "对主动学习与半监督学习的详尽、实用讲解——为什么标签昂贵、半监督方法（伪标注、标签传播）及其所依赖的假设、主动学习（不确定性采样、人在回路的查询循环）、自监督学习，以及诚实的陷阱。进阶层，建立在 Rin Huang 的机器学习页之上。",
    course: "主动学习与半监督学习",
    courseCode: "进阶 · 用很少的标签学习",
    level: "硕士",
    learned: "机器学习课程",
    applied: "标签稀缺时的分类器",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "标签很昂贵" },
      { id: "semi", label: "半监督学习" },
      { id: "assumptions", label: "无标签数据何时有帮助" },
      { id: "active", label: "主动学习" },
      { id: "selfsup", label: "自监督" },
      { id: "pitfalls", label: "它在哪里出错" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "统计机器学习" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "active-semi-supervised-learning", updated: "2026-06-26", ...meta, Body };
}
