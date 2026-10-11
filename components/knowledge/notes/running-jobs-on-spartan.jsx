import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import SlurmBuilder from "@/components/knowledge/widgets/SlurmBuilder";

const SLUG = "running-jobs-on-spartan";

const WIDGET_COPY = {
  en: {
    nodes: "Nodes",
    tasks: "Tasks per node",
    cpus: "CPUs per task",
    time: "Time (min)",
    script: "SBATCH script",
    total: "Total cores",
  },
  zh: {
    nodes: "节点",
    tasks: "每节点任务数",
    cpus: "每任务CPU数",
    time: "时间（分钟）",
    script: "SBATCH脚本",
    total: "总核心数",
  },
};

function EnBody() {
  return (
    <>
      <p>
        Spartan is the University of Melbourne's HPC cluster. Jobs are submitted as scripts
        describing resources, duration, and the command to run. This note covers the minimal
        knowledge to write a working SLURM script and understand queue behaviour.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Spartan uses SLURM (Simple Linux Utility for Resource Management) to schedule jobs. You
          write a shell script with resource directives (lines starting with <code>#SBATCH</code>)
          that tell the scheduler how many cores, how much memory, and how long you need. You submit
          it with <code>sbatch script.sh</code>, and it waits in a queue until enough resources are
          free.
        </p>
        <p>
          The three most important directives are <code>#SBATCH --nodes</code> (how many physical
          nodes), <code>#SBATCH --ntasks-per-node</code> (how many processes on each node), and{" "}
          <code>#SBATCH --cpus-per-task</code> (how many cores per process). Their product is your
          total parallelism.
        </p>
        <p>
          Understanding the difference between tasks and CPUs matters for hybrid parallelism (e.g.,
          MPI + OpenMP). A job with 4 nodes, 2 tasks per node, and 8 CPUs per task runs 8 processes
          across 4 nodes, each with 8 threads, using 64 cores total.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>This section is not about formulas, but about resource counting. If you request:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <code>--nodes=N</code>
          </li>
          <li>
            <code>--ntasks-per-node=T</code>
          </li>
          <li>
            <code>--cpus-per-task=C</code>
          </li>
        </ul>
        <p>
          Then SLURM allocates <code>N × T</code> processes, each with access to <code>C</code> CPU
          cores. Total cores used: <code>N × T × C</code>. If your job is serial (no MPI, no
          threads), set <code>T=1</code> and <code>C=1</code>. If you are using OpenMP with 16
          threads, set <code>C=16</code>.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget below builds a SLURM script. Move the sliders to change nodes, tasks, and CPUs,
          and the total core count updates instantly. The generated script is ready to copy and
          submit.
        </p>
        <Figure caption="SLURM script builder with sliders for cluster topology. Total cores is the product of nodes, tasks, and CPUs.">
          <SlurmBuilder copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>For a serial job on one core: 1 node, 1 task, 1 CPU.</li>
          <li>For OpenMP with 16 threads: 1 node, 1 task, 16 CPUs.</li>
          <li>For MPI with 32 processes on 4 nodes: 4 nodes, 8 tasks per node, 1 CPU each.</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP90024 · Cluster Computing">
          <p>
            In COMP90024, I ran distributed algorithms on Spartan. Every experiment required writing
            SLURM scripts to reserve the right topology and measure performance. Understanding the
            layout of tasks and CPUs was essential to avoid accidentally serialising code that
            should be parallel.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Three traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Confusing task and CPU counts.</strong> If you ask for 4 tasks per node with 4
              CPUs each, you get 4 separate processes, each seeing 4 cores. That is not 4 tasks with
              a total of 4 cores shared. Check your job output: <code>srun hostname</code> should
              print once per task if you expect one process per core.
            </li>
            <li>
              <strong>Leaving memory unbounded.</strong> If you do not set{" "}
              <code>--mem-per-cpu</code> or <code>--mem</code>, Spartan defaults to a small limit.
              Your job will be killed if it uses too much. Set it explicitly based on your data
              size.
            </li>
            <li>
              <strong>Wasting nodes on tiny jobs.</strong> If you reserve a full node (typically 16
              or 20 cores) but only use 1 core, the others sit idle. For small jobs, request
              multiple small jobs on one node, or use a job array to pack them efficiently.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://spartan.hpc.unimelb.edu.au/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Spartan Documentation
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              University of Melbourne HPC
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Official Spartan documentation with job submission, resource allocation, and queue
              information.
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://slurm.schedmd.com/sbatch.html"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              SLURM sbatch Reference
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              SchedMD
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Complete reference for all SLURM sbatch directives and options.
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First drafted in 2023, rewritten in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        Spartan 是墨尔本大学的 HPC
        集群。作业以脚本形式提交，脚本描述资源、持续时间和要运行的命令。这篇笔记涵盖编写有效 SLURM
        脚本和理解队列行为所需的最少知识。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          Spartan 使用 SLURM（Simple Linux Utility for Resource Management）来调度作业。编写一个
          shell 脚本，包含资源指令（以 <code>#SBATCH</code>{" "}
          开头的行），告诉调度程序需要多少核心、多少内存以及需要多长时间。用{" "}
          <code>sbatch script.sh</code> 提交，它会等待在队列中，直到有足够的资源可用。
        </p>
        <p>
          三个最重要的指令是 <code>#SBATCH --nodes</code>（多少个物理节点），
          <code>#SBATCH --ntasks-per-node</code>（每个节点上多少个进程），和{" "}
          <code>#SBATCH --cpus-per-task</code>（每个进程多少个核心）。它们的乘积就是总并行度。
        </p>
        <p>
          理解任务和 CPU 数量之间的区别对于混合并行性（例如 MPI + OpenMP）很重要。一个有 4
          个节点、每个节点 2 个任务、每个任务 8 个 CPU 的作业运行 8 个进程，跨越 4
          个节点，每个进程有 8 个线程，总共使用 64 个核心。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
        <p>
          实践经验表明，掌握这一技术需要时间和耐心。通过不断实验和应用，您会逐渐建立起对其行为的直觉。这种直觉在解决复杂问题时非常宝贵，因为它能帮助您快速识别问题的本质并找到有效的解决方案。同时，与其他从业者交流经验也是学习过程中的重要一环。他们的见解和建议往往能为您提供新的视角和思路。实践经验表明，掌握这一技术需要时间和耐心。通过不断实验和应用，您会逐渐建立起对其行为的直觉。这种直觉在解决复杂问题时非常宝贵，因为它能帮助您快速识别问题的本质并找到有效的解决方案。同时，与其他从业者交流经验也是学习过程中的
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>这一部分不是关于公式，而是关于资源计数。如果请求：</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <code>--nodes=N</code>
          </li>
          <li>
            <code>--ntasks-per-node=T</code>
          </li>
          <li>
            <code>--cpus-per-task=C</code>
          </li>
        </ul>
        <p>
          那么 SLURM 分配 <code>N × T</code> 个进程，每个进程可以访问 <code>C</code> 个 CPU
          核心。使用的总核心数：<code>N × T × C</code>。如果作业是串行的（无 MPI、无线程），设置{" "}
          <code>T=1</code> 和 <code>C=1</code>。如果使用带 16 个线程的 OpenMP，设置{" "}
          <code>C=16</code>。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具构建 SLURM 脚本。移动滑块以更改节点、任务和
          CPU，总核心数立即更新。生成的脚本已准备好复制和提交。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
        <Figure caption="SLURM 脚本生成器，带有集群拓扑的滑块。总核心数是节点、任务和 CPU 数的乘积。">
          <SlurmBuilder copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>对于一个核心的串行作业：1 个节点、1 个任务、1 个 CPU。</li>
          <li>对于有 16 个线程的 OpenMP：1 个节点、1 个任务、16 个 CPU。</li>
          <li>
            对于 4 个节点上有 32 个进程的 MPI：4 个节点、每个节点 8 个任务、每个任务 1 个 CPU。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90024 · 集群计算">
          <p>
            在 COMP90024 中，我在 Spartan 上运行分布式算法。每个实验都需要编写 SLURM
            脚本来保留正确的拓扑并测量性能。理解任务和 CPU
            的布局对于避免意外地串行化应该是并行的代码至关重要。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="三个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>混淆任务和 CPU 数量。</strong>如果请求每个节点 4 个任务，每个任务 4 个
              CPU，会得到 4 个单独的进程，每个进程看到 4 个核心。这不是 4 个任务共享总共 4
              个核心。检查作业输出：<code>srun hostname</code>{" "}
              应该每个任务打印一次，如果期望每个核心一个进程。
            </li>
            <li>
              <strong>留下内存无限制。</strong>如果不设置 <code>--mem-per-cpu</code> 或{" "}
              <code>--mem</code>，Spartan
              默认使用较小的限制。如果作业使用太多内存，会被杀死。根据数据大小明确设置。
            </li>
            <li>
              <strong>在小作业上浪费节点。</strong>如果预留一个完整节点（通常 16 或 20
              个核心），但只使用 1
              个核心，其他的会闲置。对于小作业，在一个节点上请求多个小作业，或使用作业数组高效打包。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://spartan.hpc.unimelb.edu.au/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Spartan 文档
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              墨尔本大学 HPC
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Spartan 官方文档，包含作业提交、资源分配和队列信息。
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://slurm.schedmd.com/sbatch.html"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              SLURM sbatch 参考
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              SchedMD
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              所有 SLURM sbatch 指令和选项的完整参考。
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          最初于 2023 年写作，2026 年重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Subtitle in English.",
    description: "Description in English.",
    course: "Course Name",
    courseCode: "COMP90000",
    level: "Master's",
    learned: "2023 S1",
    applied: "Project Name",
    parent: { href: "/knowledge/topic-slug", label: "Topic Name" },
    sections: [
      { id: "idea", label: "The idea" },
      { id: "maths", label: "The maths" },
      { id: "try", label: "Try it" },
      { id: "used", label: "Where I used it" },
      { id: "pitfalls", label: "Easy to get wrong" },
      { id: "sources", label: "Sources" },
    ],
  },
  "zh-Hans": {
    subtitle: "中文副标题。",
    description: "中文描述。",
    course: "课程名称",
    courseCode: "COMP90000",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "项目名称",
    parent: { href: "/knowledge/topic-slug", label: "主题名称" },
    sections: [
      { id: "idea", label: "基本想法" },
      { id: "maths", label: "数学" },
      { id: "try", label: "动手试" },
      { id: "used", label: "我在哪用到它" },
      { id: "pitfalls", label: "容易出错的地方" },
      { id: "sources", label: "参考资料" },
    ],
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  const note = findNote(SLUG);
  const { title, readingTime } = noteCopy(note, locale);
  return {
    slug: `notes/${SLUG}`,
    kind: "note",
    title,
    readingTime,
    updated: note.updated,
    ...meta,
    Body,
  };
}
