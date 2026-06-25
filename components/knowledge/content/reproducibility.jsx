import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/reproducibility.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and the figure's row
 * headers/labels are localised. Code filenames (clean.py …) and the ✗/✓/?
 * glyphs stay. No maths. Nine sections.
 */

// manualLabels & pipelineLabels: five each, index-aligned to the boxes.
function PipelineFigure({
  caption,
  ariaLabel,
  manualHeader,
  pipelineHeader,
  manualLabels,
  pipelineLabels,
  footer,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 175"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text x="14" y="32" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
          ✗
        </text>
        <text x="30" y="18" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {manualHeader}
        </text>
        {manualLabels.map((t, i) => (
          <g key={`m${i}`}>
            <rect
              x={30 + i * 84}
              y="24"
              width="64"
              height="22"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            <text
              x={62 + i * 84}
              y="39"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              {t}
            </text>
          </g>
        ))}
        <text x="14" y="118" fontSize="11" fontFamily="monospace" fill="currentColor">
          ✓
        </text>
        <text x="30" y="104" fontSize="9" fontFamily="monospace" fill="currentColor">
          {pipelineHeader}
        </text>
        {pipelineLabels.map((t, i) => (
          <g key={`p${i}`}>
            <rect
              x={30 + i * 84}
              y="110"
              width="64"
              height="22"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x={62 + i * 84}
              y="125"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              {t}
            </text>
            {i < 4 && (
              <line
                x1={94 + i * 84}
                y1="121"
                x2={114 + i * 84}
                y2="121"
                stroke="currentColor"
                strokeWidth="1.2"
                markerEnd="url(#rah)"
              />
            )}
          </g>
        ))}
        <text
          x="30"
          y="156"
          fontSize="8.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {footer}
        </text>
        <defs>
          <marker id="rah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
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
        Here's a test that quietly separates good analysis from fragile analysis: if someone handed
        you the same raw data in a year, could you reproduce your exact result — the same number,
        the same chart, the same conclusion? For a surprising amount of real-world work the honest
        answer is "no", because the result lived in a tangle of manual steps, hand-edited
        spreadsheets, and a notebook run out of order that nobody could re-run today.
      </p>
      <p>
        <Term>Reproducibility</Term> is the discipline of making sure you <em>can</em> — that an
        analysis is a repeatable, auditable process rather than a one-off act of craft. It's the
        least glamorous topic in this whole section and, in any setting where the work has to be
        defended, one of the most important. This page is the practical kit for getting there.
      </p>

      <KSection id="why" eyebrow="01" title="Could you re-run it?">
        <p>
          It helps to separate two related ideas. <Term>Reproducibility</Term> means: same data,
          same code, same result — anyone can re-run your analysis and get what you got. (The
          stronger <Term>replicability</Term> means a fresh study reaches the same conclusion.)
          Reproducibility is the achievable, foundational one, and it buys you several things at
          once:
        </p>
        <ul>
          <li>
            <strong>Trust</strong> — a result that can be re-run is one that can be checked, and a
            result that can't is just an assertion.
          </li>
          <li>
            <strong>Auditability</strong> — when someone asks "how did you get this?", you can show
            the exact path from raw data to number.
          </li>
          <li>
            <strong>Maintainability</strong> — when the data refreshes next quarter, you re-run
            rather than rebuild from memory.
          </li>
          <li>
            <strong>Collaboration</strong> — including with your future self, who will remember none
            of today's undocumented decisions.
          </li>
        </ul>
      </KSection>

      <KSection id="crisis" eyebrow="02" title="Why it's a real problem">
        <p>
          This isn't a hypothetical worry. Across science there's a recognised{" "}
          <Term>reproducibility crisis</Term> — a large fraction of published findings can't be
          reproduced, sometimes not even by their original authors, often because the exact data and
          code weren't preserved in a runnable state. Studies re-running published analysis
          notebooks have found that many simply fail to execute top to bottom.
        </p>
        <p>
          The usual culprits are mundane and entirely avoidable: a notebook whose cells were run out
          of order, a manual edit nobody recorded, a dependency that silently updated, a file path
          that only existed on one laptop. None is dramatic; together they make work impossible to
          reconstruct. The good news is that the fixes are equally mundane — a handful of habits,
          below, remove almost all of it.
        </p>
      </KSection>

      <KSection id="version" eyebrow="03" title="Version control: the foundation">
        <p>
          <Term>Version control</Term> (Git is the standard) tracks every change to your code over
          time: what changed, when, by whom, and why. It's the single highest-value habit in the
          list, because it turns "the analysis" from a mutable pile of files into a recorded history
          you can return to any point of.
        </p>
        <Callout type="pitfall">
          <p>
            A specific trap worth naming: <strong>the notebook as final artifact.</strong> Notebooks
            (Jupyter and the like) are wonderful for exploring, but they encourage out-of-order
            execution and hidden state — cell 8 might depend on a variable from cell 3 that you've
            since deleted, so the saved output no longer matches a clean run. For anything that has
            to be reproducible, promote the logic into{" "}
            <strong>plain, version-controlled scripts</strong> that run start to finish, and treat
            the notebook as the scratchpad it's good at being.
          </p>
        </Callout>
      </KSection>

      <KSection id="environment" eyebrow="04" title="Environments: beating 'works on my machine'">
        <p>
          Code doesn't run in a vacuum — it depends on a specific Python or R version and specific
          package versions, and those change. An analysis that worked last year can break or, worse,{" "}
          <em>silently produce different numbers</em> after a library updates. "It works on my
          machine" is the sound of an un-reproducible analysis.
        </p>
        <p>
          The fix is to <strong>capture the environment</strong>: pin exact dependency versions (a{" "}
          <code>requirements.txt</code>, <code>environment.yml</code>, or lockfile) so anyone can
          recreate the same setup, and for full isolation use a container (Docker) that bundles the
          whole computational environment. Then "same code" really does mean same code, running the
          same way.
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="05" title="Pipelines, not manual steps">
        <p>
          The deepest shift is to stop thinking of analysis as a sequence of things <em>you do</em>{" "}
          and start thinking of it as a <Term>pipeline</Term> — a coded, automated path from raw
          data to final output, where every step is a script and nothing is touched by hand. Raw
          data in, report out, one command, no manual intervention.
        </p>
        <PipelineFigure
          caption="The two ways to run an analysis. Manual: hand-edited steps with hidden, unrecorded decisions — fragile and unrepeatable. Pipeline: each stage is code, chained end to end, re-runnable with one command from the same raw input."
          ariaLabel="Top row: manual hand-edited steps marked fragile. Bottom row: an automated coded pipeline from raw to report."
          manualHeader="manual — hidden decisions"
          pipelineHeader="pipeline — every step is code"
          manualLabels={["raw", "hand-edit", "tweak", "?", "number"]}
          pipelineLabels={["raw", "clean.py", "model.py", "report.py", "output"]}
          footer="one command · same input → same output"
        />
        <p>
          This is the idea behind <Term>Reproducible Analytical Pipelines</Term> (RAP), a movement
          that began in government precisely to make official statistics auditable and re-runnable.
          A good pipeline is also <Term>idempotent</Term> — run it twice and you get the same
          result, with no leftover state from last time mucking up the next run.
        </p>
      </KSection>

      <KSection id="determinism" eyebrow="06" title="Seeds & determinism">
        <p>
          Many methods use randomness — a train/test{" "}
          <Link href="/knowledge/causal-inference">split</Link>, a{" "}
          <Link href="/knowledge/clustering">k-means</Link> initialisation, a bootstrap, a neural
          network's starting weights. Run them twice and you get slightly different answers, which
          quietly breaks reproducibility. The fix is a <Term>random seed</Term>: fix the seed and
          the "random" sequence becomes identical every run, so results are exactly repeatable while
          still being statistically valid. Set it once, record it, and an entire class of "why did
          the number change?" mysteries disappears.
        </p>
      </KSection>

      <KSection id="docs" eyebrow="07" title="Documentation & data lineage">
        <p>
          Finally, code that runs isn't the same as code that's understandable. The last mile is
          making the <em>decisions</em> legible:
        </p>
        <ul>
          <li>
            <strong>A README</strong> — what this does, how to run it, what it expects. The first
            thing your future self will look for.
          </li>
          <li>
            <strong>A data dictionary</strong> — what each field means, its units, its valid values.
            Ambiguity here is where misinterpretation creeps in.
          </li>
          <li>
            <strong>Data lineage / provenance</strong> — where the data came from and every
            transformation applied to it. This is the analyst's <em>chain of custody</em>, and it
            ties straight to <Link href="/knowledge/data-governance">data governance</Link>: a
            number you can trace is a number you can defend.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="A number you can defend">
          <p>
            In a government setting, analysis isn't done when the number is produced — it's done
            when the number can be <strong>re-run, audited, and defended</strong>, sometimes long
            after the fact and sometimes by someone else entirely. That makes reproducibility a core
            professional obligation, not a nicety. The habits on this page —{" "}
            <strong>version control</strong>, <strong>pinned environments</strong>, a{" "}
            <strong>coded pipeline</strong> instead of hand-edited steps, a fixed{" "}
            <strong>seed</strong>, and clear <strong>lineage</strong> — are exactly what turns "I
            got this number once" into "I can show you precisely how this number was made."
          </p>
          <p>
            It's the operational backbone under everything else in this section: the{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link>, the{" "}
            <Link href="/knowledge/causal-inference">evaluation</Link>, and the{" "}
            <Link href="/knowledge/data-governance">governance</Link> only count if the path from
            raw data to conclusion is recorded and re-runnable. Trustworthy analysis and
            reproducible analysis are, in the end, the same thing.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Reproducibility = same data + same code → same result, by anyone, anytime. It buys{" "}
              <strong>trust, auditability, maintainability</strong>.
            </li>
            <li>
              The <strong>reproducibility crisis</strong> is real — mostly mundane causes
              (out-of-order notebooks, unrecorded edits, drifting dependencies, one-laptop paths).
            </li>
            <li>
              <strong>Version control (Git)</strong> is the foundation. Beware the{" "}
              <strong>notebook-as-final-artifact</strong> trap — promote logic to runnable scripts.
            </li>
            <li>
              <strong>Pin the environment</strong> (lockfiles, Docker) to beat "works on my
              machine".
            </li>
            <li>
              Build a <strong>coded pipeline</strong> (raw → clean → model → report, one command,{" "}
              <strong>idempotent</strong>) — the RAP idea — not manual steps. Fix a{" "}
              <strong>random seed</strong>.
            </li>
            <li>
              Document: <strong>README, data dictionary, lineage/provenance</strong> — the analyst's
              chain of custody. A number you can trace is a number you can defend.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The reproducibility-crisis framing, notebook cautions, environment pinning, and
          Reproducible Analytical Pipelines (RAP) reflect current references on reproducible
          research and government analysis alongside hands-on work.
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
        有一个测试，悄悄地把好的分析与脆弱的分析区分开来：如果一年后有人把同样的原始数据递给你，你能
        复现出你那个确切的结果吗——同样的数字、同样的图表、同样的结论？对数量惊人的真实世界工作而言，
        诚实的答案是「不能」，因为结果活在一团手工步骤、手工编辑过的电子表格，以及一个乱序运行、今天
        没人能重跑的笔记本之中。
      </p>
      <p>
        <Term>可复现性</Term>是确保你<em>能</em>的那门学科——确保一份分析是一个可重复、可审计的过程，
        而非一次性的手艺。它是整个板块中最不光鲜的主题，而在任何工作必须被辩护的环境里，又是最重要的
        之一。这一页是抵达那里的实用工具包。
      </p>

      <KSection id="why" eyebrow="01" title="你能重跑它吗？">
        <p>
          把两个相关的概念分开会有帮助。<Term>可复现性</Term>意味着：同样的数据、同样的代码、同样的
          结果——任何人都能重跑你的分析、得到你所得到的。（更强的<Term>可重复性</Term>
          意味着一项全新的
          研究得出同样的结论。）可复现性是那个可达成的、基础性的，它一次买给你好几样东西：
        </p>
        <ul>
          <li>
            <strong>信任</strong>——一个能被重跑的结果是一个能被检查的结果，而一个不能的，只是一个
            断言。
          </li>
          <li>
            <strong>可审计</strong>
            ——当有人问「你是怎么得出这个的？」，你能展示从原始数据到数字的确切 路径。
          </li>
          <li>
            <strong>可维护</strong>——当数据下个季度刷新时，你是重跑，而非凭记忆重建。
          </li>
          <li>
            <strong>协作</strong>——包括与你未来的自己，他不会记得今天任何未被记录的决定。
          </li>
        </ul>
      </KSection>

      <KSection id="crisis" eyebrow="02" title="为什么这是个真问题">
        <p>
          这不是一个假设性的担忧。在整个科学界，有一个公认的<Term>可复现性危机</Term>——很大一部分
          已发表的发现无法被复现，有时连其原作者都不能，往往是因为确切的数据与代码没有以可运行的状态
          保存下来。重跑已发表的分析笔记本的研究发现，许多笔记本干脆无法从头到尾执行。
        </p>
        <p>
          常见的元凶平庸而完全可避免：一个单元格被乱序运行的笔记本、一处没人记录的手工编辑、一个悄悄
          更新了的依赖、一个只在一台笔记本电脑上存在的文件路径。没有一个是戏剧性的；合在一起它们就让
          工作无法被重建。好消息是，修法同样平庸——下面那一小撮习惯，能去掉其中几乎全部。
        </p>
      </KSection>

      <KSection id="version" eyebrow="03" title="版本控制：地基">
        <p>
          <Term>版本控制</Term>（Git 是标准）随时间追踪你代码的每一次改动：改了什么、何时、由谁、为
          什么。它是这份清单里单一价值最高的习惯，因为它把「这份分析」从一堆可变的文件，变成一段你
          可以回到其任何一点的、被记录的历史。
        </p>
        <Callout type="pitfall">
          <p>
            一个值得点名的具体陷阱：<strong>把笔记本当作最终产物。</strong>笔记本（Jupyter
            之类）用来 探索很棒，但它们鼓励乱序执行与隐藏状态——单元格 8 可能依赖于单元格 3
            里一个你后来删掉的
            变量，于是保存的输出不再与一次干净的运行相符。对任何必须可复现的东西，把逻辑提升进
            <strong>朴素的、受版本控制的、从头跑到尾的脚本</strong>
            ，并把笔记本当作它擅长的那个草稿本。
          </p>
        </Callout>
      </KSection>

      <KSection id="environment" eyebrow="04" title="环境：打败「在我机器上能跑」">
        <p>
          代码不在真空里运行——它依赖于一个特定的 Python 或 R
          版本、以及特定的包版本，而这些会变。一份
          去年能跑的分析，在一个库更新之后可能损坏，或更糟，<em>悄悄产生不同的数字</em>
          。「在我机器上 能跑」是一份不可复现的分析发出的声音。
        </p>
        <p>
          修法是<strong>捕获环境</strong>：锁定确切的依赖版本（一个 <code>requirements.txt</code>、
          <code>environment.yml</code>，或一个锁文件），好让任何人都能重建同样的设置；而要完全隔离，
          就用一个容器（Docker），把整个计算环境打包起来。这样，「同样的代码」才真的意味着同样的代码、
          以同样的方式运行。
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="05" title="流水线，而非手工步骤">
        <p>
          最深的转变，是不再把分析想成一连串<em>你做的事</em>，而开始把它想成一条<Term>流水线</Term>
          ——一条从原始数据到最终输出的、编码的、自动化的路径，其中每一步都是一个脚本，没有任何东西被
          手动触碰。原始数据进，报告出，一条命令，无人工干预。
        </p>
        <PipelineFigure
          caption="运行一份分析的两种方式。手工：手工编辑的步骤，带着隐藏的、未记录的决定——脆弱且不可重复。流水线：每个阶段都是代码，端到端串起来，能从同样的原始输入用一条命令重跑。"
          ariaLabel="上行：手工编辑的步骤，标为脆弱。下行：一条从原始到报告的自动化编码流水线。"
          manualHeader="手工——隐藏的决定"
          pipelineHeader="流水线——每一步都是代码"
          manualLabels={["原始", "手工编辑", "微调", "?", "数字"]}
          pipelineLabels={["原始", "clean.py", "model.py", "report.py", "输出"]}
          footer="一条命令 · 同样的输入 → 同样的输出"
        />
        <p>
          这是<Term>可复现分析流水线</Term>（RAP）背后的想法，一场恰恰始于政府、为让官方统计可审计、
          可重跑的运动。一条好的流水线也是<Term>幂等</Term>的——跑它两次你得到同样的结果，没有上一次
          留下的残余状态搅乱下一次运行。
        </p>
      </KSection>

      <KSection id="determinism" eyebrow="06" title="种子与确定性">
        <p>
          许多方法使用随机性——一次训练/测试<Link href="/knowledge/causal-inference">拆分</Link>
          、一次 <Link href="/knowledge/clustering">k-means</Link>{" "}
          初始化、一次自助、一个神经网络的初始权重。
          跑它们两次你会得到略有不同的答案，而这悄悄地破坏了可复现性。修法是一个
          <Term>随机种子</Term>：
          固定种子，那「随机」的序列每次运行都变得完全相同，于是结果完全可重复，同时仍在统计上有效。
          设定它一次、记录它，整整一类「数字为什么变了？」的谜团便消失了。
        </p>
      </KSection>

      <KSection id="docs" eyebrow="07" title="文档与数据血缘">
        <p>
          最后，能跑的代码与可被理解的代码不是一回事。最后一公里是让那些<em>决定</em>变得可读：
        </p>
        <ul>
          <li>
            <strong>一个 README</strong>——这做什么、如何运行它、它期待什么。你未来的自己第一个要找的
            东西。
          </li>
          <li>
            <strong>一本数据字典</strong>
            ——每个字段是什么意思、它的单位、它的有效值。这里的含糊，正是 误解悄悄溜进来之处。
          </li>
          <li>
            <strong>数据血缘 / 溯源</strong>——数据从何而来、以及施加于它的每一次转换。这是分析师的
            <em>保管链</em>，它直接连到<Link href="/knowledge/data-governance">数据治理</Link>
            ：一个你 能追溯的数字，是一个你能辩护的数字。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="一个你能辩护的数字">
          <p>
            在政府的环境里，分析并不在数字产出时完成——而在数字能被<strong>重跑、审计、辩护</strong>
            时
            完成，有时是事后很久，有时由完全另一个人来做。这让可复现性成为一项核心的职业义务，而非
            锦上添花。这一页上的习惯——<strong>版本控制</strong>、<strong>锁定的环境</strong>、一条
            <strong>编码的流水线</strong>而非手工编辑的步骤、一个固定的<strong>种子</strong>
            、以及清晰 的<strong>血缘</strong>
            ——正是把「我曾得出这个数字一次」变成「我能确切地展示这个数字是如何 造出来的」的东西。
          </p>
          <p>
            它是本板块其他一切之下的运作脊梁：
            <Link href="/knowledge/feature-engineering">数据准备</Link>、
            <Link href="/knowledge/causal-inference">评估</Link>与
            <Link href="/knowledge/data-governance">治理</Link>
            ，只有当从原始数据到结论的路径被记录、
            可重跑时才算数。可信赖的分析与可复现的分析，归根结底，是同一回事。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              可复现性 = 同样的数据 + 同样的代码 → 同样的结果，由任何人、在任何时候。它买来
              <strong>信任、可审计、可维护</strong>。
            </li>
            <li>
              <strong>可复现性危机</strong>是真实的——大多是平庸的成因（乱序的笔记本、未记录的编辑、
              漂移的依赖、单台笔记本的路径）。
            </li>
            <li>
              <strong>版本控制（Git）</strong>
              是地基。当心「把笔记本当作最终产物」的陷阱——把逻辑提升进 可运行的脚本。
            </li>
            <li>
              <strong>锁定环境</strong>（锁文件、Docker）以打败「在我机器上能跑」。
            </li>
            <li>
              构建一条<strong>编码的流水线</strong>（原始 → 清洗 → 建模 → 报告，一条命令，
              <strong>幂等</strong>）——RAP 的想法——而非手工步骤。固定一个<strong>随机种子</strong>。
            </li>
            <li>
              做文档：<strong>README、数据字典、血缘/溯源</strong>——分析师的保管链。一个你能追溯的
              数字，是一个你能辩护的数字。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          可复现性危机的取景、笔记本的告诫、环境锁定，以及可复现分析流水线（RAP），反映了当前关于
          可复现研究与政府分析的参考文献，以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Reproducibility & Analytical Pipelines",
    subtitle:
      "Six months after you publish a number, someone asks how you got it. Reproducibility is whether you can answer — whether the analysis can be re-run, audited, and trusted, by you or anyone else. In a setting with accountability, it isn't optional.",
    description:
      "A thorough, practical explainer of reproducibility and analytical pipelines — why being able to re-run an analysis matters, the reproducibility crisis, version control for analysis, environments and dependencies, treating analysis as a coded pipeline rather than manual steps, seeds and determinism, and documentation and data lineage. In-Practice tier, anchored to Rin Huang's government-analyst work.",
    course: "Reproducibility & Analytical Pipelines",
    courseCode: "In practice · trustworthy analysis",
    level: "Professional",
    learned: "Gov analysis · ongoing",
    applied: "Defensible, auditable work",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Could you re-run it?" },
      { id: "crisis", label: "Why it's a real problem" },
      { id: "version", label: "Version control" },
      { id: "environment", label: "Environments" },
      { id: "pipeline", label: "Pipelines, not steps" },
      { id: "determinism", label: "Seeds & determinism" },
      { id: "docs", label: "Documentation & lineage" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "可复现性与分析流水线",
    subtitle:
      "你发布一个数字六个月后，有人问你是怎么得出它的。可复现性就是你能否回答——这份分析能否被重跑、被审计、被信任，无论是你还是任何其他人。在一个有问责的环境里，它并非可选。",
    description:
      "对可复现性与分析流水线的详尽、实用讲解——为什么能重跑一份分析很要紧、可复现性危机、为分析做版本控制、环境与依赖、把分析当作一条编码的流水线而非手工步骤、种子与确定性，以及文档与数据血缘。实务层，锚定 Rin Huang 的政府分析师工作。",
    course: "可复现性与分析流水线",
    courseCode: "实务 · 可信赖的分析",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "可辩护、可审计的工作",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "你能重跑它吗？" },
      { id: "crisis", label: "为什么这是个真问题" },
      { id: "version", label: "版本控制" },
      { id: "environment", label: "环境" },
      { id: "pipeline", label: "流水线，而非步骤" },
      { id: "determinism", label: "种子与确定性" },
      { id: "docs", label: "文档与血缘" },
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
  return { slug: "reproducibility", updated: "2026-06-26", ...meta, Body };
}
