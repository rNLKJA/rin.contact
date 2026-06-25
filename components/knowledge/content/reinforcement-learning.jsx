import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/reinforcement-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (Formula/TeX) is identical across locales; prose, captions, section labels,
 * and the agent-environment loop figure's text labels are localised.
 */

function RLLoopFigure({ caption, ariaLabel, agentLabel, envLabel, actionLabel, rewardLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect x="60" y="55" width="110" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="115" y="80" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="currentColor">{agentLabel}</text>
        <rect x="270" y="55" width="110" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="325" y="80" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="currentColor">{envLabel}</text>
        {/* action arrow top */}
        <path d="M170 64 H270" fill="none" stroke="#FF3C3C" strokeWidth="1.5" markerEnd="url(#rlah)" />
        <text x="220" y="40" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#FF3C3C">{actionLabel}</text>
        {/* reward + state arrow bottom */}
        <path d="M270 88 H170" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#rlah2)" />
        <text x="220" y="112" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="currentColor">{rewardLabel}</text>
        <defs>
          <marker id="rlah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
          <marker id="rlah2" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
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
        <RLLoopFigure
          caption="The reinforcement-learning loop. The agent sees a state, picks an action; the environment returns a reward and the next state. Around and around — the agent learns the policy that maximises long-run reward, not just the immediate one."
          ariaLabel="A cycle between an Agent box and an Environment box: the agent sends an action down, the environment returns reward and next state."
          agentLabel="agent"
          envLabel="environment"
          actionLabel="action"
          rewardLabel="reward + next state"
        />
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        机器学习有三大范式。<Link href="/knowledge/statistical-machine-learning">监督学习</Link>从
        带标签的样本中学习（这是猫，这是狗）。<Link href="/knowledge/clustering">无监督学习</Link>则
        在完全没有标签的情况下发现结构。<Term>强化学习</Term>（RL）是第三种，也是最不一样的一种：它从
        <strong>奖励</strong>中学习，靠<strong>去做</strong>。没人告诉智能体正确答案；它尝试各种动作、
        看会发生什么，并逐渐摸索出一套随时间赚取最多奖励的策略。
      </p>
      <p>
        正是它让程序学会在围棋和雅达利游戏上击败人类、让机器人学会走路，也是现代语言模型被调校的一部分
        方式。它完成了本板块机器学习页面的三部曲——而它的核心难点，即设计奖励，结果是人工智能中最深的
        问题之一。这一页从那个循环开始，把它一层层搭起来。
      </p>

      <KSection id="third" eyebrow="01" title="第三种范式：从奖励中学习">
        <p>
          RL 的决定性特征是：没有带标签的数据集。取而代之的是一个目标，以及一个告诉智能体自己做得好不好
          的<Term>奖励信号</Term>。智能体的任务是学出一个<Term>策略</Term>——一种选择动作的方式——使它
          随时间收集到的总奖励最大化。它靠试错学习，就像你学一个没人讲解过的游戏：玩、留意什么能得分、
          然后多做那个。
        </p>
        <p>
          有两个特征让 RL 真正比监督学习更难。第一，反馈是<Term>评价性的，而非指导性的</Term>——奖励
          告诉你你的动作<em>有多好</em>，而不是<em>正确的动作本该是什么</em>。第二，奖励可能是
          <Term>延迟的</Term>：赢下一盘棋的那一步，也许是二十步之前下的。把一个迟到的奖励，连回到那个
          赢得它的早期动作上——<Term>信用分配</Term>问题——正是 RL 很大一部分内容所在。
        </p>
      </KSection>

      <KSection id="loop" eyebrow="02" title="智能体-环境循环">
        <p>
          RL 里的一切都建立在一个循环之上。一个<Term>智能体</Term>观察一个<Term>环境</Term>的当前
          <Term>状态</Term>，采取一个<Term>动作</Term>，环境则以一个<Term>奖励</Term>和一个新状态回应。
          重复。智能体的全部存在就是这个循环，而它的目标是选择那些在长期内最大化奖励的动作——而不只是
          下一步。
        </p>
        <RLLoopFigure
          caption="强化学习循环。智能体看到一个状态、挑一个动作；环境返回一个奖励和下一个状态。一圈又一圈——智能体学出那个最大化长期奖励、而非眼前奖励的策略。"
          ariaLabel="一个「智能体」框与一个「环境」框之间的循环：智能体向下发出一个动作，环境返回奖励和下一个状态。"
          agentLabel="智能体"
          envLabel="环境"
          actionLabel="动作"
          rewardLabel="奖励 + 下一状态"
        />
      </KSection>

      <KSection id="mdp" eyebrow="03" title="马尔可夫决策过程">
        <p>
          那个循环的形式化框架是<Term>马尔可夫决策过程</Term>（MDP）：一组状态 <TeX>{String.raw`S`}</TeX>、
          动作 <TeX>{String.raw`A`}</TeX>、转移概率，以及奖励。它的决定性假设是<Term>马尔可夫性质</Term>
          ——未来只取决于<em>当前</em>状态，而非你如何走到这里的全部历史。当前状态捕获了所有相关的东西。
        </p>
        <p>
          智能体的目标是最大化<Term>期望回报</Term>——累积的未来奖励——通常是<em>折扣过的</em>，好让
          较早的奖励比遥远的更重要：
        </p>
        <Formula label="The return G-t is the sum from k equals zero to infinity of gamma to the power k times the reward at time t plus k plus one.">
          {String.raw`G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}`}
        </Formula>
        <p>
          <Term>折扣因子</Term> <TeX>{String.raw`\gamma \in [0,1)`}</TeX> 设定智能体有多远视：接近 0 时
          它很短视（现在就抓奖励），接近 1 时它为长远谋划。那一个旋钮，就捕获了短期与长期回报之间的
          全部张力。
        </p>
      </KSection>

      <KSection id="explore" eyebrow="04" title="探索与利用：核心困境">
        <p>
          RL 有一种在监督学习里找不到对应的张力。每一步，智能体可以<Term>利用</Term>——采取它当前相信
          最好的动作——或者<Term>探索</Term>——尝试别的、可能更好也可能更糟的东西。利用得太多，你就
          锁死在一个平庸的习惯里，永远发现不了更好的选项。探索得太多，你就把时间浪费在已知很差的动作
          上。平衡两者，就是<Term>探索-利用权衡</Term>。
        </p>
        <p>
          最简单可行的答案是 <Term>ε-贪心</Term>：大多数时候利用已知最好的动作，但以一个很小的概率{" "}
          <TeX>{String.raw`\varepsilon`}</TeX> 挑一个随机动作，以保持学习。同样的困境，就是
          <Term>多臂老虎机</Term>的全部故事——当你只能靠拉才能学到时，该拉哪一台老虎机——而它出现在
          远超 RL 的地方，在 A/B 测试与推荐里同样如此。
        </p>
      </KSection>

      <KSection id="value" eyebrow="05" title="价值函数与贝尔曼方程">
        <p>
          要行动得好，智能体需要一种对哪些处境是<em>好的</em>的感觉。一个<Term>价值函数</Term>恰恰捕获
          了这个：从某个状态出发（或在某状态采取某动作）所期望的长期奖励。动作价值{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX> 就是「如果我在状态 <TeX>{String.raw`s`}</TeX> 采取动作{" "}
          <TeX>{String.raw`a`}</TeX>、此后一直行动得当，我能期望多少总奖励？」
        </p>
        <p>
          基石是<Term>贝尔曼方程</Term>，它赋予价值一种递归结构：此刻的价值，是即时奖励，加上你接下来
          落脚之处的（折扣过的）价值。
        </p>
        <Formula label="Q of s, a equals the immediate reward r plus gamma times the maximum over next actions a-prime of Q of s-prime, a-prime.">
          {String.raw`Q(s,a) = r + \gamma \max_{a'} Q(s', a')`}
        </Formula>
        <p>
          那个递归是几乎每一种 RL 方法的引擎。它把一个令人生畏的长视野问题——「在数千步内最好的策略
          是什么？」——分解成每个状态与下一个状态之间一个局部的、可解的关系。解出贝尔曼方程，你就
          知道一切的价值；对这些价值贪心地行动，你就有了一个最优策略。
        </p>
      </KSection>

      <KSection id="qlearning" eyebrow="06" title="Q 学习：学出价值">
        <p>
          你很少事先知道环境的规则，所以你没法直接解贝尔曼——你必须从经验中<em>学</em>出那些价值。
          <Term>Q 学习</Term>用一个漂亮而简单的更新来做这件事。每次动作之后，它把自己的估计{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX> 朝它刚刚观察到的东西轻推一下：
        </p>
        <Formula label="Q of s, a is updated to itself plus alpha times the quantity: reward plus gamma times the max over a-prime of Q of s-prime a-prime, minus Q of s a.">
          {String.raw`Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s',a') - Q(s,a) \right]`}
        </Formula>
        <p>
          方括号里是<Term>时序差分误差</Term>——智能体所期望的与实际发生的之间的落差（奖励，加上它
          落脚之处的价值）。它把估计沿那个方向移动一个分数 <TeX>{String.raw`\alpha`}</TeX>（学习率）。
          在探索的同时一遍遍这样做，Q 值便收敛到真实的那些——智能体学出最优策略，
          <em>却从未被告知这个世界的规则</em>，纯粹来自它收集到的奖励。最后这一点，正是让 RL 显得
          了不起的地方。
        </p>
      </KSection>

      <KSection id="deep" eyebrow="07" title="深度强化学习：当状态空间爆炸">
        <p>
          朴素的 Q 学习把每一个状态-动作对的价值存在一张表里——对一个网格世界没问题，对国际象棋或
          原始像素则无望，那里的状态多到天文数字。<Term>深度强化学习</Term>用一个
          <Link href="/knowledge/deep-learning">神经网络</Link>替换那张表，去<em>逼近</em>{" "}
          <TeX>{String.raw`Q(s,a)`}</TeX>，在它从未见过的相似状态之间泛化。
        </p>
        <p>
          正是这个组合撑起了那些登上头条的成果：一个<Term>深度 Q 网络</Term>（DQN）直接从屏幕学会
          雅达利游戏，以及那些精通围棋乃至更多的系统。深度学习提供感知与泛化；RL 提供目标导向的决策
          ——一对强大的搭档，也是 RL 的不稳定性变得最尖锐之处。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="奖励作弊与诚实的局限">
        <p>
          RL 最大的长处——不懈地最大化奖励——也是它最大的危险。智能体优化的，恰恰是你所奖励的，而那
          很少恰恰是你所想要的。
        </p>
        <Callout type="pitfall">
          <p>
            <strong>奖励作弊</strong>（规范博弈）是指智能体找到一个漏洞，在不达成真实目标的情况下拿到
            高奖励——一个赛船智能体学会原地打转去捡奖励点，而不是去完成比赛。这不是智能体里的一个 bug；
            它正是在做被告知的事。优化器越深，它就越有创意地利用一个不完美的奖励——这让
            <strong>奖励设计</strong>成为现代人工智能中最难、也最事关重大的问题之一，并且随着 RL 被用来
            调校强大的系统，它是一个活生生的安全关切。
          </p>
        </Callout>
        <p>
          现实的局限同样真实：RL <strong>极其消耗样本</strong>（它可能需要数百万次试验，所以它大多在
          仿真中训练）、<strong>训练不稳定</strong>（微小的改动，迥然不同的结果），并且受困于
          <Term>仿真到现实的鸿沟</Term>——一个在仿真里完美的策略，可能在仿真器没捕捉到的真实硬件上
          失败。在你能廉价地仿真、并干净地定义奖励之处，RL 是惊人的；在你不能之处，它是危险的。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="序贯决策的正确框架">
          <p>
            与其说 RL 是一件日常的分析师工具，不如说它是一种<strong>思考序贯决策的方式</strong>——那些
            今天的选择会改变明天处境、而你追求的是长期回报而非一次性预测的问题。认出一个问题何时有那种
            形状（以及何时没有），才是有用的判断：很大一部分分析，由<Link href="/knowledge/causal-inference">因果推断</Link>
            或一个监督模型来服务，比伸手去拿 RL 要好。
          </p>
          <p>
            最能迁移过来的，是那个警示性的内核。<strong>探索-利用</strong>权衡，与{" "}
            <Link href="/knowledge/causal-inference">A/B 测试</Link>里的多臂老虎机是同一套逻辑。而
            <strong>奖励作弊</strong>，是贯穿整个板块的一个教训的最尖锐版本：优化一个代理指标，你得到的
            就是那个代理指标，而非目标——这是一条在任何由指标驱动行为之处都要紧的纪律，远不止 RL 本身。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              RL 是第三种范式：从<strong>奖励中、靠去做</strong>来学习——没有标签。反馈是评价性的，且
              常常<strong>延迟</strong>（信用分配）。
            </li>
            <li>
              循环：<strong>智能体 → 动作 → 环境 → 奖励 + 下一状态 →</strong> 重复，形式化为一个{" "}
              <strong>MDP</strong>（马尔可夫性质；最大化折扣回报{" "}
              <TeX>{String.raw`G_t = \sum \gamma^k R`}</TeX>）。
            </li>
            <li>
              核心困境：<strong>探索与利用</strong>（ε-贪心；多臂老虎机）。
            </li>
            <li>
              <strong>价值函数</strong> + <strong>贝尔曼方程</strong>{" "}
              <TeX>{String.raw`Q(s,a)=r+\gamma\max_{a'}Q(s',a')`}</TeX> 给长视野规划一种递归结构。
            </li>
            <li>
              <strong>Q 学习</strong>通过 TD 误差从经验中学出那些价值——<em>不知道规则也能</em>得到
              最优策略。<strong>深度强化学习</strong>把那张表换成一个神经网络（DQN、围棋、雅达利）。
            </li>
            <li>
              危险：<strong>奖励作弊</strong>——它优化你所奖励的，而非你所想要的。再加上消耗样本、
              不稳定、仿真到现实的鸿沟。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          贝尔曼/Q 学习的表述、探索-利用的取景，以及奖励作弊的告诫，反映了当前的强化学习参考文献以及
          机器学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Reinforcement Learning",
    subtitle:
      "The third way machines learn: not from labelled examples, not by finding structure, but by trying things and chasing reward. It's how a program learns to play, to control, to decide — and the hardest part is saying what 'good' even means.",
    description:
      "A thorough, first-principles explainer of reinforcement learning — the third ML paradigm, the agent-environment-reward loop, Markov decision processes, exploration vs exploitation, value functions and the Bellman equation, Q-learning, deep RL, the reward-hacking trap, and the honest limits. Advanced tier, completing the machine-learning trilogy alongside Rin Huang's supervised-learning and deep-learning pages.",
    course: "Reinforcement Learning",
    courseCode: "Advanced · learning from reward",
    level: "Master's",
    learned: "ML & AI coursework",
    applied: "Sequential decisions",
    readingTime: "~16 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "强化学习",
    subtitle:
      "机器学习的第三种方式：不靠带标签的样本，不靠发现结构，而是靠尝试与追逐奖励。它是一个程序学会玩、学会控制、学会决策的方式——而最难的部分，是说清「好」究竟意味着什么。",
    description:
      "对强化学习的详尽、第一性原理讲解——第三种机器学习范式、智能体-环境-奖励循环、马尔可夫决策过程、探索与利用、价值函数与贝尔曼方程、Q 学习、深度强化学习、奖励作弊的陷阱，以及诚实的局限。进阶层，与 Rin Huang 的监督学习和深度学习页一起完成机器学习三部曲。",
    course: "强化学习",
    courseCode: "进阶 · 从奖励中学习",
    level: "硕士",
    learned: "机器学习与人工智能课程",
    applied: "序贯决策",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "third", label: "第三种范式" },
      { id: "loop", label: "智能体-环境循环" },
      { id: "mdp", label: "马尔可夫决策过程" },
      { id: "explore", label: "探索与利用" },
      { id: "value", label: "价值与贝尔曼方程" },
      { id: "qlearning", label: "Q 学习" },
      { id: "deep", label: "深度强化学习" },
      { id: "limits", label: "奖励作弊与局限" },
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
  return { slug: "reinforcement-learning", updated: "2026-06-26", ...meta, Body };
}
