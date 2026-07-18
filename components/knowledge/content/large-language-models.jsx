import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/large-language-models.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (next-token probability + inline TeX) is identical across locales; prose,
 * captions, section labels, and the training-stages figure's labels/subs are
 * localised. The accent stage (RLHF) is chosen by INDEX (2).
 */

function StagesFigure({ caption, ariaLabel, stages }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 96"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {stages.map(([t, sub], i) => {
          const x = 8 + i * 116;
          const hot = i === 2; // RLHF
          return (
            <g key={i}>
              <rect
                x={x}
                y="26"
                width="98"
                height="30"
                rx="4"
                fill="none"
                stroke={hot ? "#FF3C3C" : "currentColor"}
                strokeWidth={hot ? "1.5" : "1.2"}
              />
              <text
                x={x + 49}
                y="45"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill={hot ? "#FF3C3C" : "currentColor"}
              >
                {t}
              </text>
              <text
                x={x + 49}
                y="72"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.6"
              >
                {sub}
              </text>
              {i < 3 && (
                <line
                  x1={x + 98}
                  y1="41"
                  x2={x + 124}
                  y2="41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  markerEnd="url(#llmah)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="llmah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
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
        Large language models — the technology behind ChatGPT, Claude, and the current wave of AI —
        can feel like magic or like a threat, and both reactions get in the way of using them well.
        The clearest way to understand them is to start from the deflating truth at their core: an{" "}
        <Term>LLM</Term> is a <strong>next-token predictor</strong>. Given some text, it predicts
        the most likely next chunk, appends it, and repeats. That's it. Every remarkable and every
        frustrating thing about these models follows from that one mechanism carried out at a scale
        that's genuinely hard to picture.
      </p>
      <p>
        This page builds LLMs up from that mechanism — the transformer that powers it, the training
        that shapes it, the prompting that steers it, and the honest limits (especially
        hallucination) that you have to respect to use them responsibly. It draws together the{" "}
        <Link href="/knowledge/deep-learning">deep-learning</Link>,{" "}
        <Link href="/knowledge/natural-language-processing">NLP</Link>,{" "}
        <Link href="/knowledge/reinforcement-learning">RL</Link>, and{" "}
        <Link href="/knowledge/information-retrieval">retrieval</Link> threads from across this
        section.
      </p>

      <KSection id="what" eyebrow="01" title="A next-word predictor, at scale">
        <p>
          At its heart, an LLM models the probability of the next <Term>token</Term> (a word or
          word-piece) given everything before it:
        </p>
        <Formula label="The probability of the next token given the preceding tokens — the model predicts token t given tokens 1 through t minus 1.">
          {String.raw`P(\text{token}_t \mid \text{token}_1, \text{token}_2, \dots, \text{token}_{t-1})`}
        </Formula>
        <p>
          To generate text, it samples a token from that distribution, adds it to the input, and
          predicts again — one token at a time, autoregressively. The astonishing finding of the
          last few years is that when you train this simple objective on a large enough model with
          enough text, abilities you never explicitly programmed — translation, summarisation,
          arithmetic, apparent reasoning — <Term>emerge</Term> as a by-product. To predict the next
          word well across all of human writing, the model is forced to learn a great deal about the
          world the writing describes. The simplicity of the goal hides the depth of what achieving
          it requires.
        </p>
      </KSection>

      <KSection id="transformer" eyebrow="02" title="The transformer engine">
        <p>
          The architecture that made this work is the <Term>transformer</Term>, from the{" "}
          <Link href="/knowledge/deep-learning">deep-learning</Link> page, and its key piece is{" "}
          <Term>self-attention</Term>. When processing each token, attention lets the model look at{" "}
          <em>every other token</em> in the context and weigh how relevant each is to the current
          one — so it can resolve "it" to the right noun, connect a question to its answer, and
          track meaning across long passages.
        </p>
        <p>
          Two properties of attention explain why transformers, and not the older{" "}
          <Link href="/knowledge/natural-language-processing">sequence models</Link>, powered this
          revolution: it captures <strong>long-range relationships</strong> directly (any token can
          attend to any other, however far apart), and it <strong>parallelises</strong> beautifully
          across a sequence, which is what made training on internet-scale data computationally
          feasible. The transformer is the engine; scale is the fuel.
        </p>
      </KSection>

      <KSection id="pretrain" eyebrow="03" title="Pretraining: reading the internet">
        <p>
          <Term>Pretraining</Term> is where the model learns. It's shown a vast corpus — much of the
          public internet, books, code — and trained, by{" "}
          <Link href="/knowledge/deep-learning">gradient descent</Link>, to predict the next token
          at every position. No labels are needed; the text <em>is</em> its own supervision (the
          next word is the answer), which is why it can consume trillions of words of raw text.
        </p>
        <p>
          The empirical engine behind the recent leaps is the <Term>scaling laws</Term>: model
          capability improves predictably as you increase model size, data, and compute together.
          Push all three far enough and new capabilities appear — sometimes abruptly. This is also
          why these models are so expensive and concentrated among a few labs: pretraining a
          frontier model costs enormous compute. What you get out of it is a <Term>base model</Term>{" "}
          — fluent, knowledgeable, but raw and not yet useful as an assistant. That takes a second
          phase.
        </p>
      </KSection>

      <KSection id="stages" eyebrow="04" title="From base model to assistant">
        <p>
          A raw base model just continues text — ask it a question and it might reply with more
          questions, because that's a plausible continuation. Turning it into a helpful, safe
          assistant takes two further stages:
        </p>
        <StagesFigure
          caption="The three training stages. Pretraining yields a fluent but raw next-token predictor; instruction tuning teaches it to follow requests; RLHF aligns it with human preferences for helpfulness and safety. Only after all three is it the assistant you interact with."
          ariaLabel="Pipeline: pretraining to instruction tuning to RLHF to a deployed assistant."
          stages={[
            ["pretrain", "raw fluency"],
            ["instruction‑tune", "follow requests"],
            ["RLHF", "align to humans"],
            ["assistant", "what you use"],
          ]}
        />
        <ul>
          <li>
            <Term>Instruction tuning</Term> (supervised fine-tuning) — further training on examples
            of instructions paired with good responses, teaching the model to <em>answer</em> rather
            than just continue.
          </li>
          <li>
            <Term>RLHF</Term> (reinforcement learning from human feedback) — humans rank model
            outputs, a <Link href="/knowledge/reinforcement-learning">reward model</Link> learns
            those preferences, and the LLM is tuned to maximise that reward — nudging it toward
            helpful, honest, harmless answers.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            RLHF is exactly the{" "}
            <Link href="/knowledge/reinforcement-learning">reward-optimisation</Link> idea — and it
            inherits the same risk. Optimise hard for "what humans rate highly" and you can get{" "}
            <strong>sycophancy</strong>: a model that tells you what you want to hear, or sounds
            confident and agreeable, because that's what got rewarded — not necessarily what's true.
            The alignment stage shapes the model's manners, and its blind spots, at once.
          </p>
        </Callout>
      </KSection>

      <KSection id="prompting" eyebrow="05" title="In-context learning & prompting">
        <p>
          The surprising capability that made LLMs so flexible is <Term>in-context learning</Term>:
          you can get the model to do a new task just by <em>describing</em> it (or showing a few
          examples) in the prompt, with no retraining. Show it nothing and ask (
          <Term>zero-shot</Term>), or give a couple of worked examples (<Term>few-shot</Term>), and
          it adapts on the fly. The model isn't learning in the training sense — its weights don't
          change — it's recognising the pattern of the task from the context and continuing it.
        </p>
        <p>
          This is why <Term>prompting</Term> became a skill: how you frame the request materially
          changes the output. A useful trick is <Term>chain-of-thought</Term> — asking the model to
          "think step by step" — which often improves reasoning, because generating the intermediate
          steps gives it more relevant tokens to condition the answer on. It all happens within the{" "}
          <Term>context window</Term>: the fixed budget of tokens the model can attend to at once.
          Anything outside it — earlier in a long conversation, or in a document you didn't paste —
          simply isn't seen.
        </p>
      </KSection>

      <KSection id="hallucination" eyebrow="06" title="Why it confidently makes things up">
        <p>
          The most important limitation to internalise: an LLM{" "}
          <strong>has no concept of truth</strong>. It generates the most <em>plausible</em>{" "}
          continuation, not the most <em>correct</em> one — and when a fluent-sounding falsehood is
          more probable than an awkward truth (or the model simply doesn't "know"), it produces the
          falsehood with total confidence. This is <Term>hallucination</Term>, and it's not a bug to
          be fully patched out — it's intrinsic to a system that models likelihood rather than
          facts.
        </p>
        <Callout type="pitfall">
          <p>
            Compounding it: the model's knowledge is frozen at its <strong>training cutoff</strong>{" "}
            (it doesn't know recent events), it absorbs the{" "}
            <Link href="/knowledge/fairness-bias">biases</Link> of its training data, and — because
            of RLHF — it often <em>sounds</em> most confident exactly when it should be least sure.
            The practical rule is unavoidable:{" "}
            <strong>treat every factual claim as unverified.</strong> LLMs are extraordinary at
            language — drafting, summarising, transforming, explaining — and unreliable as a source
            of truth. Knowing which is which is the whole skill of using them well.
          </p>
        </Callout>
      </KSection>

      <KSection id="rag" eyebrow="07" title="Grounding it: RAG">
        <p>
          The leading practical fix for hallucination and the knowledge cutoff is{" "}
          <Term>retrieval-augmented generation</Term> (RAG). Instead of relying on the model's
          frozen memory, you first <Link href="/knowledge/information-retrieval">retrieve</Link>{" "}
          relevant documents (via search or embeddings), paste them into the context, and ask the
          model to answer <em>from those documents</em>. The LLM becomes a reasoning-and-language
          layer over a trusted, current, citable knowledge source.
        </p>
        <p>
          This is why the decades-old{" "}
          <Link href="/knowledge/information-retrieval">information-retrieval</Link> machinery
          suddenly sits at the centre of modern AI — the "R" in RAG is exactly that retrieval step.
          It dramatically reduces (though doesn't eliminate) fabrication, lets the model cite its
          sources, and keeps it current without retraining. It's the difference between asking a
          model what it remembers and asking it to read and summarise what you handed it — the
          latter is far more trustworthy, and the basis of most serious LLM applications.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="A powerful tool, used with discipline">
          <p>
            LLMs are part of the day-to-day toolkit now — drafting, summarising long documents,
            transforming and explaining text, writing and debugging code. The single most important
            thing this understanding buys is the right <strong>mental model</strong>: it's a fluent
            next-token predictor, not a knowledge base, so I lean on it for <em>language</em> work
            (where it excels) and <strong>verify every factual claim</strong> (where it can't be
            trusted), because <strong>hallucination</strong> is intrinsic, not occasional.
          </p>
          <p>
            In a government setting that discipline is non-negotiable — a confident fabrication in a
            brief is worse than no answer — which is why <strong>RAG</strong> (grounding the model
            in real, citable documents) is the pattern that actually fits accountable work, and why
            it ties straight to <Link href="/knowledge/information-retrieval">retrieval</Link>.
            Knowing the machinery — the <strong>cutoff</strong>, the <strong>bias</strong>, the
            RLHF-driven <strong>over-confidence</strong> — is what separates using these tools
            critically from being misled by them.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              An LLM is a <strong>next-token predictor</strong> at huge scale —{" "}
              <TeX>{String.raw`P(\text{token}_t \mid \text{token}_{1..t-1})`}</TeX>. Capabilities{" "}
              <strong>emerge</strong> from doing that well.
            </li>
            <li>
              The engine is the <strong>transformer</strong> + <strong>self-attention</strong>{" "}
              (long-range + parallelisable). <strong>Pretraining</strong> on internet-scale text
              (self-supervised); scaling laws drive the leaps.
            </li>
            <li>
              Three stages: <strong>pretrain</strong> (raw) → <strong>instruction-tune</strong>{" "}
              (follow requests) → <strong>RLHF</strong> (align to humans — but risks sycophancy).
            </li>
            <li>
              <strong>In-context learning</strong>: describe/show the task in the prompt
              (zero/few-shot, chain-of-thought) — no retraining; limited by the{" "}
              <strong>context window</strong>.
            </li>
            <li>
              <strong>Hallucination is intrinsic</strong> — it models plausibility, not truth. Plus
              knowledge cutoff, bias, RLHF over-confidence.{" "}
              <strong>Verify every factual claim.</strong>
            </li>
            <li>
              <strong>RAG</strong> grounds it: retrieve real documents → answer from them. The "R"
              is <strong>information retrieval</strong> — the basis of trustworthy LLM apps.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The next-token/transformer framing, the pretrain→SFT→RLHF pipeline, the
          intrinsic-hallucination point, and RAG-as-grounding reflect current LLM references
          alongside hands-on use.
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
        大语言模型——ChatGPT、Claude 以及当前这波 AI 背后的技术——既可能让人觉得像魔法，也可能让人
        觉得像威胁，而这两种反应都妨碍了把它们用好。理解它们最清晰的方式，是从其核心那个让人泄气的真相
        出发：一个 <Term>LLM</Term> 是一个<strong>下一个词元预测器</strong>
        。给它一段文本，它预测最可能的
        下一块、把它接上去，然后重复。就这样。这些模型身上每一件了不起的事、每一件令人沮丧的事，都源自
        那一个机制，只不过是在一个真的难以想象的规模上执行的。
      </p>
      <p>
        这一页从那个机制出发把 LLM 搭起来——驱动它的 transformer、塑造它的训练、引导它的提示，以及你
        必须尊重才能负责任地使用它们的诚实局限（尤其是幻觉）。它把本板块各处的
        <Link href="/knowledge/deep-learning">深度学习</Link>、
        <Link href="/knowledge/natural-language-processing">NLP</Link>、
        <Link href="/knowledge/reinforcement-learning">强化学习</Link>与
        <Link href="/knowledge/information-retrieval">检索</Link>线索汇聚到一起。
      </p>

      <KSection id="what" eyebrow="01" title="大规模的下一个词预测器">
        <p>
          在其核心，一个 LLM 建模的是在给定之前的一切的条件下、下一个<Term>词元</Term>
          （一个词或词片）的 概率：
        </p>
        <Formula label="The probability of the next token given the preceding tokens — the model predicts token t given tokens 1 through t minus 1.">
          {String.raw`P(\text{token}_t \mid \text{token}_1, \text{token}_2, \dots, \text{token}_{t-1})`}
        </Formula>
        <p>
          为了生成文本，它从那个分布里采样一个词元、把它加到输入上、再预测一次——一次一个词元，自回归
          地。过去几年里惊人的发现是：当你在一个足够大的模型上、用足够多的文本训练这个简单目标时，你
          从未显式编程过的能力——翻译、摘要、算术、看似的推理——会作为副产品<Term>涌现</Term>
          出来。为了
          在全人类的书写之上把下一个词预测好，模型被迫学到了大量关于那些书写所描述的世界的东西。目标的
          简单，掩盖了达成它所需之物的深度。
        </p>
      </KSection>

      <KSection id="transformer" eyebrow="02" title="transformer 引擎">
        <p>
          让这一切奏效的架构是 <Term>transformer</Term>，来自
          <Link href="/knowledge/deep-learning">深度 学习</Link>页，而它的关键部件是
          <Term>自注意力</Term>。在处理每一个词元时，注意力让模型能看向 上下文里
          <em>每一个其他词元</em>、并衡量每一个与当前这个有多相关——于是它能把「它」解析到正确的
          名词、把一个问题连到它的答案，并在长段落里追踪意义。
        </p>
        <p>
          注意力的两个性质，解释了为什么是 transformer、而非更老的
          <Link href="/knowledge/natural-language-processing">序列模型</Link>
          驱动了这场革命：它直接捕获
          <strong>长程关系</strong>
          （任何词元都能注意到任何其他词元，无论相隔多远），而且它在一个序列上
          <strong>漂亮地并行</strong>
          ，正是这一点让在互联网规模的数据上训练在计算上变得可行。transformer 是引擎；规模是燃料。
        </p>
      </KSection>

      <KSection id="pretrain" eyebrow="03" title="预训练：阅读整个互联网">
        <p>
          <Term>预训练</Term>是模型学习的地方。它被展示一个庞大的语料库——大部分公开互联网、书籍、
          代码——并通过<Link href="/knowledge/deep-learning">梯度下降</Link>
          被训练去预测每一个位置上的 下一个词元。不需要标签；文本<em>就是</em>
          它自己的监督（下一个词就是答案），这就是为什么它能 消化数以万亿计的原始文本词。
        </p>
        <p>
          近来这些跃迁背后的经验引擎是<Term>缩放定律</Term>
          ：当你把模型规模、数据与算力一起增大时，模型
          能力可预测地提升。把这三者推得足够远，新的能力就会出现——有时是突然地。这也是为什么这些模型
          如此昂贵、且集中在少数几个实验室手里：预训练一个前沿模型耗费巨大的算力。你从中得到的是一个
          <Term>基座模型</Term>——流畅、有知识，但原始、还不能作为助手使用。那需要第二个阶段。
        </p>
      </KSection>

      <KSection id="stages" eyebrow="04" title="从基座模型到助手">
        <p>
          一个原始的基座模型只会续写文本——问它一个问题，它可能回你更多问题，因为那是一个合理的续写。把
          它变成一个有帮助的、安全的助手，需要再两个阶段：
        </p>
        <StagesFigure
          caption="三个训练阶段。预训练产出一个流畅但原始的下一个词元预测器；指令微调教它遵循请求；RLHF 让它与人类对有用与安全的偏好对齐。只有在这三者之后，它才是你与之交互的那个助手。"
          ariaLabel="流水线：预训练 → 指令微调 → RLHF → 一个部署的助手。"
          stages={[
            ["预训练", "原始的流畅"],
            ["指令微调", "遵循请求"],
            ["RLHF", "对齐人类"],
            ["助手", "你所用的"],
          ]}
        />
        <ul>
          <li>
            <Term>指令微调</Term>（监督微调）——在「指令配以好的回应」的样例上进一步训练，教模型去
            <em>回答</em>，而非只是续写。
          </li>
          <li>
            <Term>RLHF</Term>（基于人类反馈的强化学习）——人类对模型的输出排序，一个
            <Link href="/knowledge/reinforcement-learning">奖励模型</Link>学到那些偏好，而 LLM
            被调校去 最大化那个奖励——把它推向有帮助、诚实、无害的回答。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            RLHF 正是那个<Link href="/knowledge/reinforcement-learning">奖励优化</Link>
            的想法——而它继承了 同样的风险。为「人类给高分的东西」狠狠优化，你就可能得到
            <strong>阿谀奉承</strong>：一个告诉你
            你想听的话、或者听起来自信又随和的模型，因为那才是被奖励的——而未必是真的。对齐这个阶段，同时
            塑造了模型的举止，与它的盲点。
          </p>
        </Callout>
      </KSection>

      <KSection id="prompting" eyebrow="05" title="上下文学习与提示">
        <p>
          让 LLM 如此灵活的那个惊人能力是<Term>上下文学习</Term>：你只需在提示里<em>描述</em>
          一个新任务 （或展示几个例子），就能让模型去做它，无需重新训练。什么都不给就问它（
          <Term>零样本</Term>），或 给几个做好的例子（<Term>少样本</Term>
          ），它就当场适应。模型并不是在训练的意义上学习——它的权重
          不变——它是在从上下文里识别出任务的模式，并把它续写下去。
        </p>
        <p>
          这就是为什么<Term>提示</Term>
          成了一门技能：你如何框定请求，会实质地改变输出。一个有用的小技巧 是<Term>思维链</Term>
          ——让模型「一步一步地想」——它常常能改善推理，因为生成那些中间步骤，给了它
          更多相关的词元来条件化答案。这一切都发生在<Term>上下文窗口</Term>
          之内：模型一次能注意到的、
          固定的词元预算。任何在它之外的东西——一段长对话里更早的内容，或一份你没粘贴进来的文档——根本
          就看不见。
        </p>
      </KSection>

      <KSection id="hallucination" eyebrow="06" title="它为何会自信地编造">
        <p>
          最重要、需要内化的局限：一个 LLM <strong>没有真相的概念</strong>。它生成的是最
          <em>合理</em>的 续写，而非最<em>正确</em>
          的——而当一个听起来流畅的谬误，比一个别扭的真相更可能时（或者模型干脆
          就「不知道」），它会带着十足的自信产出那个谬误。这就是<Term>幻觉</Term>
          ，而它不是一个能被完全 打补丁修掉的 bug——它对一个建模可能性、而非事实的系统而言是内在的。
        </p>
        <Callout type="pitfall">
          <p>
            雪上加霜的是：模型的知识冻结在它的<strong>训练截止点</strong>
            （它不知道近期的事件），它吸收了 训练数据的
            <Link href="/knowledge/fairness-bias">偏见</Link>，而且——因为 RLHF——它往往恰恰在最该
            没把握的时候听起来最自信。那条实用的规则无可回避：
            <strong>把每一个事实性断言都当作未经核实 的。</strong>LLM
            在语言上非凡——起草、摘要、转换、解释——而作为真相的来源则不可靠。分清哪个是
            哪个，就是把它们用好的全部技能。
          </p>
        </Callout>
      </KSection>

      <KSection id="rag" eyebrow="07" title="为它锚定：RAG">
        <p>
          针对幻觉与知识截止，领先的实用修法是<Term>检索增强生成</Term>
          （RAG）。你不依赖模型冻结的记忆， 而是先
          <Link href="/knowledge/information-retrieval">检索</Link>相关的文档（通过搜索或嵌入）、把
          它们粘进上下文，再让模型<em>从那些文档里</em>回答。LLM
          于是变成一个可信、当前、可引用的知识来源 之上的推理与语言层。
        </p>
        <p>
          这就是为什么有数十年历史的<Link href="/knowledge/information-retrieval">信息检索</Link>
          机械，忽然 坐到了现代 AI 的中心——RAG
          里的「R」正是那个检索步骤。它大幅减少（尽管没有消除）编造、让模型能
          引用它的来源，并在不重新训练的情况下保持它的时效。这是「问一个模型它记得什么」与「让它阅读并
          摘要你递给它的东西」之间的差别——后者可信得多，也是大多数严肃的 LLM 应用的基础。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="一件强大的工具，用之以纪律">
          <p>
            LLM
            现在是日常工具箱的一部分——起草、摘要长文档、转换与解释文本、写代码与调试代码。这份理解
            买来的最重要的一样东西，是那个正确的<strong>心智模型</strong>
            ：它是一个流畅的下一个词元预测器， 而非一个知识库，所以我在<em>语言</em>
            工作上倚靠它（它擅长之处），并<strong>核实每一个事实性 断言</strong>
            （它不可信之处），因为<strong>幻觉</strong>是内在的，而非偶发的。
          </p>
          <p>
            在政府的环境里，那份纪律没得商量——一份简报里一个自信的编造，比没有答案更糟——这就是为什么
            <strong>RAG</strong>
            （把模型锚定在真实、可引用的文档上）才是真正适合须问责工作的模式，也是 为什么它直接连到
            <Link href="/knowledge/information-retrieval">检索</Link>。懂得那套机械——
            <strong>截止点</strong>、<strong>偏见</strong>、RLHF 驱动的<strong>过度自信</strong>
            ——正是把 批判性地使用这些工具，与被它们误导，区分开来的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个 LLM 是一个巨大规模上的<strong>下一个词元预测器</strong>——
              <TeX>{String.raw`P(\text{token}_t \mid \text{token}_{1..t-1})`}</TeX>
              。能力从把这件事做好中
              <strong>涌现</strong>。
            </li>
            <li>
              引擎是 <strong>transformer</strong> + <strong>自注意力</strong>（长程 +
              可并行）。在互联网 规模文本上<strong>预训练</strong>（自监督）；缩放定律驱动这些跃迁。
            </li>
            <li>
              三个阶段：<strong>预训练</strong>（原始）→ <strong>指令微调</strong>（遵循请求）→
              <strong>RLHF</strong>（对齐人类——但有阿谀奉承的风险）。
            </li>
            <li>
              <strong>上下文学习</strong>
              ：在提示里描述/展示任务（零/少样本、思维链）——无需重新训练；受
              <strong>上下文窗口</strong>限制。
            </li>
            <li>
              <strong>幻觉是内在的</strong>——它建模可能性，而非真相。再加上知识截止、偏见、RLHF
              的过度 自信。<strong>核实每一个事实性断言。</strong>
            </li>
            <li>
              <strong>RAG</strong> 为它锚定：检索真实文档 → 从中回答。那个「R」就是
              <strong>信息检索</strong>——可信赖 LLM 应用的基础。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          下一个词元/transformer 的取景、预训练→SFT→RLHF 的流程、幻觉内在性这一点，以及把 RAG
          当作锚定， 反映了当前的 LLM 参考文献以及亲身的使用。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Large Language Models",
    subtitle:
      "Strip away the mystique and a language model does one thing: predict the next word. Everything else — the fluency, the apparent reasoning, the confident errors — emerges from doing that one thing at almost unimaginable scale.",
    description:
      "A thorough, first-principles explainer of large language models — the next-token objective, the transformer and self-attention, pretraining and emergent capabilities, the base→instruction-tuning→RLHF pipeline, in-context learning and prompting, why hallucination happens, and RAG as the grounding fix. Advanced tier, building on Rin Huang's deep-learning, NLP and information-retrieval pages.",
    course: "Large Language Models",
    courseCode: "Advanced · the AI moment",
    level: "Master's+",
    learned: "AI & current practice",
    applied: "Drafting, summarising, RAG",
    readingTime: "~17 min read",
    sections: [
      { id: "what", label: "A next-word predictor" },
      { id: "transformer", label: "The transformer engine" },
      { id: "pretrain", label: "Pretraining at scale" },
      { id: "stages", label: "Base → assistant" },
      { id: "prompting", label: "In-context learning" },
      { id: "hallucination", label: "Why it makes things up" },
      { id: "rag", label: "Grounding with RAG" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "大语言模型",
    subtitle:
      "剥去神秘感，一个语言模型只做一件事：预测下一个词。其余的一切——流畅、看似的推理、自信的错误——都从在几乎无法想象的规模上做这一件事中涌现出来。",
    description:
      "对大语言模型的详尽、第一性原理讲解——下一个词元的目标、transformer 与自注意力、预训练与涌现能力、基座→指令微调→RLHF 的流程、上下文学习与提示、幻觉为何发生，以及作为锚定方案的 RAG。进阶层，建立在 Rin Huang 的深度学习、NLP 与信息检索页之上。",
    course: "大语言模型",
    courseCode: "进阶 · AI 时刻",
    level: "硕士及以上",
    learned: "人工智能与当前实践",
    applied: "起草、摘要、RAG",
    readingTime: "约 17 分钟阅读",
    sections: [
      { id: "what", label: "下一个词预测器" },
      { id: "transformer", label: "transformer 引擎" },
      { id: "pretrain", label: "大规模预训练" },
      { id: "stages", label: "基座 → 助手" },
      { id: "prompting", label: "上下文学习" },
      { id: "hallucination", label: "它为何会编造" },
      { id: "rag", label: "用 RAG 锚定" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/deep-learning", label: "深度学习与神经网络" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "large-language-models", updated: "2026-06-26", ...meta, Body };
}
