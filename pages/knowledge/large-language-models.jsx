import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "A next-word predictor" },
  { id: "transformer", label: "The transformer engine" },
  { id: "pretrain", label: "Pretraining at scale" },
  { id: "stages", label: "Base → assistant" },
  { id: "prompting", label: "In-context learning" },
  { id: "hallucination", label: "Why it makes things up" },
  { id: "rag", label: "Grounding with RAG" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function LargeLanguageModelsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="large-language-models"
      title="Large Language Models"
      subtitle="Strip away the mystique and a language model does one thing: predict the next word. Everything else — the fluency, the apparent reasoning, the confident errors — emerges from doing that one thing at almost unimaginable scale."
      description="A thorough, first-principles explainer of large language models — the next-token objective, the transformer and self-attention, pretraining and emergent capabilities, the base→instruction-tuning→RLHF pipeline, in-context learning and prompting, why hallucination happens, and RAG as the grounding fix. Advanced tier, building on Rin Huang's deep-learning, NLP and information-retrieval pages."
      course="Large Language Models"
      courseCode="Advanced · the AI moment"
      level="Master's+"
      learned="AI & current practice"
      applied="Drafting, summarising, RAG"
      readingTime="~17 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="The three training stages. Pretraining yields a fluent but raw next-token predictor; instruction tuning teaches it to follow requests; RLHF aligns it with human preferences for helpfulness and safety. Only after all three is it the assistant you interact with.">
          <svg
            viewBox="0 0 460 96"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Pipeline: pretraining to instruction tuning to RLHF to a deployed assistant."
          >
            {[
              ["pretrain", "raw fluency", false],
              ["instruction‑tune", "follow requests", false],
              ["RLHF", "align to humans", true],
              ["assistant", "what you use", false],
            ].map(([t, sub, hot], i) => {
              const x = 8 + i * 116;
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
    </KnowledgeLayout>
  );
}
