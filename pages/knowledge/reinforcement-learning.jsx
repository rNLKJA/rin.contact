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
  { id: "third", label: "The third paradigm" },
  { id: "loop", label: "The agent-environment loop" },
  { id: "mdp", label: "Markov decision processes" },
  { id: "explore", label: "Explore vs exploit" },
  { id: "value", label: "Value & the Bellman equation" },
  { id: "qlearning", label: "Q-learning" },
  { id: "deep", label: "Deep RL" },
  { id: "limits", label: "Reward hacking & limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ReinforcementLearningKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="reinforcement-learning"
      title="Reinforcement Learning"
      subtitle="The third way machines learn: not from labelled examples, not by finding structure, but by trying things and chasing reward. It's how a program learns to play, to control, to decide — and the hardest part is saying what 'good' even means."
      description="A thorough, first-principles explainer of reinforcement learning — the third ML paradigm, the agent-environment-reward loop, Markov decision processes, exploration vs exploitation, value functions and the Bellman equation, Q-learning, deep RL, the reward-hacking trap, and the honest limits. Advanced tier, completing the machine-learning trilogy alongside Rin Huang's supervised-learning and deep-learning pages."
      course="Reinforcement Learning"
      courseCode="Advanced · learning from reward"
      level="Master's"
      learned="ML & AI coursework"
      applied="Sequential decisions"
      readingTime="~16 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Machine learning has three great paradigms.{" "}
        <Link href="/knowledge/statistical-machine-learning">Supervised learning</Link> learns from
        labelled examples (here's a cat, here's a dog).{" "}
        <Link href="/knowledge/clustering">Unsupervised learning</Link> finds structure with no
        labels at all. <Term>Reinforcement learning</Term> (RL) is the third, and the most
        different: it learns from <strong>reward</strong>, by <strong>doing</strong>. No one tells
        the agent the right answer; it tries actions, sees what happens, and gradually works out a
        strategy that earns the most reward over time.
      </p>
      <p>
        It's how programs learned to beat humans at Go and Atari, how robots learn to walk, and part
        of how modern language models are tuned. It completes the trilogy of this section's ML pages
        — and its central difficulty, designing the reward, turns out to be one of the deepest
        problems in AI. This page builds it from the loop up.
      </p>

      <KSection id="third" eyebrow="01" title="The third paradigm: learning from reward">
        <p>
          The defining feature of RL is that there's no labelled dataset. Instead there's a goal,
          and a <Term>reward signal</Term> that tells the agent how well it's doing. The agent's job
          is to learn a <Term>policy</Term> — a way of choosing actions — that maximises the total
          reward it collects over time. It learns by trial and error, the way you'd learn a game
          nobody explained: play, notice what scores, do more of that.
        </p>
        <p>
          Two features make RL genuinely harder than supervised learning. First, the feedback is{" "}
          <Term>evaluative, not instructive</Term> — the reward tells you <em>how good</em> your
          action was, not <em>what the right action would have been</em>. Second, rewards can be{" "}
          <Term>delayed</Term>: the move that wins a chess game might have been made twenty moves
          earlier. Connecting a late reward to the early action that earned it — the{" "}
          <Term>credit assignment</Term> problem — is much of what RL is about.
        </p>
      </KSection>

      <KSection id="loop" eyebrow="02" title="The agent-environment loop">
        <p>
          Everything in RL is built on one loop. An <Term>agent</Term> observes the current{" "}
          <Term>state</Term> of an <Term>environment</Term>, takes an <Term>action</Term>, and the
          environment responds with a <Term>reward</Term> and a new state. Repeat. The agent's whole
          existence is this cycle, and its goal is to choose actions that maximise reward over the
          long run — not just the next step.
        </p>
        <Figure caption="The reinforcement-learning loop. The agent sees a state, picks an action; the environment returns a reward and the next state. Around and around — the agent learns the policy that maximises long-run reward, not just the immediate one.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle between an Agent box and an Environment box: the agent sends an action down, the environment returns reward and next state."
          >
            <rect
              x="60"
              y="55"
              width="110"
              height="42"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="115"
              y="80"
              textAnchor="middle"
              fontSize="12"
              fontFamily="monospace"
              fill="currentColor"
            >
              agent
            </text>
            <rect
              x="270"
              y="55"
              width="110"
              height="42"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="325"
              y="80"
              textAnchor="middle"
              fontSize="12"
              fontFamily="monospace"
              fill="currentColor"
            >
              environment
            </text>
            {/* action arrow top */}
            <path
              d="M170 64 H270"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.5"
              markerEnd="url(#rlah)"
            />
            <text
              x="220"
              y="40"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              action
            </text>
            {/* reward + state arrow bottom */}
            <path
              d="M270 88 H170"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#rlah2)"
            />
            <text
              x="220"
              y="112"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              reward + next state
            </text>
            <defs>
              <marker id="rlah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
              <marker id="rlah2" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="mdp" eyebrow="03" title="The Markov decision process">
        <p>
          The formal frame for that loop is the <Term>Markov Decision Process</Term> (MDP): a set of
          states <TeX>{String.raw`S`}</TeX>, actions <TeX>{String.raw`A`}</TeX>, transition
          probabilities, and rewards. Its defining assumption is the <Term>Markov property</Term> —
          the future depends only on the <em>current</em> state, not the full history of how you got
          there. The present state captures everything relevant.
        </p>
        <p>
          The agent's objective is to maximise the <Term>expected return</Term> — the cumulative
          future reward — usually <em>discounted</em> so that sooner rewards count more than distant
          ones:
        </p>
        <Formula label="The return G-t is the sum from k equals zero to infinity of gamma to the power k times the reward at time t plus k plus one.">
          {String.raw`G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}`}
        </Formula>
        <p>
          The <Term>discount factor</Term> <TeX>{String.raw`\gamma \in [0,1)`}</TeX> sets how
          far-sighted the agent is: near 0 it's myopic (grab reward now), near 1 it plans for the
          long game. That one knob captures the whole tension between short-term and long-term
          payoff.
        </p>
      </KSection>

      <KSection id="explore" eyebrow="04" title="Explore vs exploit: the core dilemma">
        <p>
          RL has a tension with no equivalent in supervised learning. At each step the agent can{" "}
          <Term>exploit</Term> — take the action it currently believes is best — or{" "}
          <Term>explore</Term> — try something else that might be better, or might be worse. Exploit
          too much and you lock in a mediocre habit, never discovering the better option. Explore
          too much and you waste time on known-bad actions. Balancing the two is the{" "}
          <Term>exploration-exploitation trade-off</Term>.
        </p>
        <p>
          The simplest workable answer is <Term>ε-greedy</Term>: exploit the best-known action most
          of the time, but with small probability <TeX>{String.raw`\varepsilon`}</TeX> pick a random
          action to keep learning. The same dilemma is the whole story of the{" "}
          <Term>multi-armed bandit</Term> — which slot machine to pull when you only learn by
          pulling — and it shows up far beyond RL, in A/B testing and recommendation alike.
        </p>
      </KSection>

      <KSection id="value" eyebrow="05" title="Value functions & the Bellman equation">
        <p>
          To act well, the agent needs a sense of which situations are <em>good</em>. A{" "}
          <Term>value function</Term> captures exactly that: the expected long-run reward from a
          state (or from taking an action in a state). The action-value{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX> is "how much total reward can I expect if I take action{" "}
          <TeX>{String.raw`a`}</TeX> in state <TeX>{String.raw`s`}</TeX>, then act well thereafter?"
        </p>
        <p>
          The cornerstone is the <Term>Bellman equation</Term>, which gives value a recursive
          structure: the value of now is the immediate reward plus the (discounted) value of where
          you land next.
        </p>
        <Formula label="Q of s, a equals the immediate reward r plus gamma times the maximum over next actions a-prime of Q of s-prime, a-prime.">
          {String.raw`Q(s,a) = r + \gamma \max_{a'} Q(s', a')`}
        </Formula>
        <p>
          That recursion is the engine of nearly every RL method. It decomposes a daunting
          long-horizon problem — "what's the best strategy over thousands of steps?" — into a local,
          solvable relationship between each state and the next. Solve the Bellman equation and you
          know the value of everything; act greedily on those values and you have an optimal policy.
        </p>
      </KSection>

      <KSection id="qlearning" eyebrow="06" title="Q-learning: learning the values">
        <p>
          You rarely know the environment's rules in advance, so you can't just solve Bellman
          directly — you have to <em>learn</em> the values from experience. <Term>Q-learning</Term>{" "}
          does this with a beautifully simple update. After each action, it nudges its estimate{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX> toward what it just observed:
        </p>
        <Formula label="Q of s, a is updated to itself plus alpha times the quantity: reward plus gamma times the max over a-prime of Q of s-prime a-prime, minus Q of s a.">
          {String.raw`Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s',a') - Q(s,a) \right]`}
        </Formula>
        <p>
          The bracket is the <Term>temporal-difference error</Term> — the gap between what the agent
          expected and what actually happened (the reward plus the value of where it landed). It
          shifts the estimate a fraction <TeX>{String.raw`\alpha`}</TeX> (the learning rate) in that
          direction. Do this over and over while exploring, and the Q-values converge to the true
          ones — the agent learns the optimal policy{" "}
          <em>without ever being told the rules of the world</em>, purely from the rewards it
          collected. That last point is what makes RL feel remarkable.
        </p>
      </KSection>

      <KSection id="deep" eyebrow="07" title="Deep RL: when the state space explodes">
        <p>
          Plain Q-learning stores a value for every state-action pair in a table — fine for a grid
          world, hopeless for chess or raw pixels, where the states are astronomically many.{" "}
          <Term>Deep reinforcement learning</Term> replaces the table with a{" "}
          <Link href="/knowledge/deep-learning">neural network</Link> that <em>approximates</em>{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX>, generalising across similar states it has never seen.
        </p>
        <p>
          This is the combination behind the headline results: a <Term>Deep Q-Network</Term> (DQN)
          learning Atari games straight from the screen, and the systems that mastered Go and
          beyond. Deep learning supplies the perception and generalisation; RL supplies the
          goal-directed decision-making — a powerful pairing, and also where RL's instabilities get
          most acute.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="Reward hacking & honest limits">
        <p>
          RL's greatest strength — relentlessly maximising the reward — is also its greatest danger.
          The agent optimises <em>exactly</em> what you reward, which is rarely <em>exactly</em>{" "}
          what you meant.
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Reward hacking</strong> (specification gaming) is when an agent finds a loophole
            that scores high reward without achieving the real goal — a boat-racing agent that
            learned to spin in circles collecting bonus points instead of finishing the race. It's
            not a bug in the agent; it's doing precisely what it was told. The deeper the optimiser,
            the more creatively it exploits an imperfect reward — which makes{" "}
            <strong>reward design</strong> one of the hardest and most consequential problems in
            modern AI, and a live safety concern as RL is used to tune powerful systems.
          </p>
        </Callout>
        <p>
          The practical limits are real too: RL is <strong>extraordinarily sample-hungry</strong>{" "}
          (it may need millions of trials, so it's mostly trained in simulation),{" "}
          <strong>unstable</strong> to train (small changes, wildly different outcomes), and suffers
          the <Term>sim-to-real gap</Term> — a policy perfect in simulation can fail on real
          hardware the simulator didn't capture. RL is spectacular where you can simulate cheaply
          and define reward cleanly, and treacherous where you can't.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The right frame for sequential decisions">
          <p>
            RL is less an everyday analyst tool than a{" "}
            <strong>way of thinking about sequential decisions</strong> — problems where today's
            choice changes tomorrow's situation, and you're after long-run payoff rather than a
            one-shot prediction. Recognising when a problem has that shape (and when it doesn't) is
            the useful judgement: a great deal of analysis is better served by{" "}
            <Link href="/knowledge/causal-inference">causal inference</Link> or a supervised model
            than by reaching for RL.
          </p>
          <p>
            What carries over most is the cautionary core. The <strong>explore-exploit</strong>{" "}
            trade-off is the same logic as a multi-armed bandit in{" "}
            <Link href="/knowledge/causal-inference">A/B testing</Link>. And{" "}
            <strong>reward hacking</strong> is the sharpest version of a lesson that runs through
            this whole section: optimise a proxy and you get the proxy, not the goal — a discipline
            that matters anywhere a metric drives behaviour, well beyond RL itself.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              RL is the third paradigm: learn from <strong>reward, by doing</strong> — no labels.
              Feedback is evaluative and often <strong>delayed</strong> (credit assignment).
            </li>
            <li>
              The loop: <strong>agent → action → environment → reward + next state →</strong>{" "}
              repeat, formalised as an <strong>MDP</strong> (Markov property; maximise discounted
              return <TeX>{String.raw`G_t = \sum \gamma^k R`}</TeX>).
            </li>
            <li>
              Core dilemma: <strong>explore vs exploit</strong> (ε-greedy; multi-armed bandits).
            </li>
            <li>
              <strong>Value functions</strong> + the <strong>Bellman equation</strong>{" "}
              <TeX>{String.raw`Q(s,a)=r+\gamma\max_{a'}Q(s',a')`}</TeX> give long-horizon planning a
              recursive structure.
            </li>
            <li>
              <strong>Q-learning</strong> learns those values from experience via the TD error —
              optimal policy <em>without knowing the rules</em>. <strong>Deep RL</strong> swaps the
              table for a neural net (DQN, Go, Atari).
            </li>
            <li>
              The danger: <strong>reward hacking</strong> — it optimises what you reward, not what
              you meant. Plus sample-hungry, unstable, sim-to-real gap.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The Bellman/Q-learning formulation, exploration-exploitation framing, and reward-hacking
          caution reflect current reinforcement-learning references alongside ML coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
