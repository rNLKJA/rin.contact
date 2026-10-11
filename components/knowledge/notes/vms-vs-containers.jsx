import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import VmVsContainer from "@/components/knowledge/widgets/VmVsContainer";

const SLUG = "vms-vs-containers";

function EnBody() {
  return (
    <>
      <p>
        Virtual machines run a full OS on emulated hardware. Containers share the host kernel and
        isolate processes with namespaces and cgroups. The tradeoff: VMs are heavier but more
        isolated; containers are lighter but less secure.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          A hypervisor (Type 1 on bare metal, Type 2 on a host OS) emulates hardware for each VM.
          Each VM runs its own kernel, init system, and userland. Boot time is seconds to minutes.
          Disk images are gigabytes. A container shares the host kernel and runs a single process
          tree. Docker builds images with layers (base OS + app dependencies). Boot time is
          milliseconds. Images are tens to hundreds of megabytes.
        </p>
        <p>
          VMs provide stronger isolation: a compromised guest cannot access the host kernel
          directly. Containers rely on kernel features (cgroups, namespaces) that have had
          privilege-escalation bugs. Use VMs for untrusted workloads; use containers for density and
          speed.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of systems concepts">
          <VmVsContainer copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP90024 & Moodist">
          <p>
            COMP90024 Assignment 2: Melbourne Research Cloud virtual machines running Docker
            containers, set up with Ansible. Also Moodist, where each service ran in its own Docker
            container on AWS Lightsail.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              Applying the technique without checking whether its assumptions hold for your specific
              data. Every method has preconditions, and violating them can lead to incorrect or
              misleading results.
            </li>
            <li>
              Misinterpreting the results or reading too much into specific numerical values without
              considering uncertainty. Statistical and machine learning outputs should always be
              interpreted in context, with appropriate confidence intervals or error bars where
              applicable.
            </li>
            <li>
              Overlooking computational or practical limitations that make the theoretical solution
              infeasible. Just because something works on paper doesn't mean it scales to large
              datasets or runs in acceptable time.
            </li>
            <li>
              Training performance can be misleading if the model overfits. Cross-validation and
              proper train-test splits are essential for honest assessment of predictive
              performance.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in COMP90024 during my Master's studies. The material draws from standard
          textbooks in the field and recent research papers that extend the classical theory.
          Additional insights came from practical implementation experience and discussions with
          instructors and peers.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          虚拟机监控程序（裸金属上的 Type 1，主机操作系统上的 Type
          2）为每个虚拟机模拟硬件。每个虚拟机运行自己的内核、init
          系统和用户空间。启动时间是秒到分钟。磁盘映像是千兆字节。容器共享主机内核并运行单个进程树。Docker
          使用层（基础操作系统 + 应用依赖项）构建映像。启动时间是毫秒。映像是数十到数百兆字节。
        </p>
        <p>
          虚拟机提供更强的隔离：受损的客户机无法直接访问主机内核。容器依赖于内核功能（cgroups、命名空间），这些功能存在特权升级错误。对不受信任的工作负载使用虚拟机；对密度和速度使用容器。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="systems概念的交互式演示">
          <VmVsContainer copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90024 与 Moodist">
          <p>
            COMP90024作业2：墨尔本研究云虚拟机运行Docker容器，用Ansible配置。还有Moodist项目，每个服务在AWS
            Lightsail上的独立Docker容器中运行。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              每种方法都有前提条件，违反它们可能导致不正确或误导性的结果。在信任输出之前，始终验证假设。
            </li>
            <li>误解结果或在不考虑不确定性的情况下过度解读特定数值。</li>
            <li>
              忽视使理论解决方案不可行的计算或实际限制。仅仅因为某事在纸上有效并不意味着它可以扩展到大型数据集或在可接受的时间内运行。始终考虑实现约束。
            </li>
            <li>
              在部署之前未能在保留数据上验证该方法。如果模型过拟合，训练性能可能会产生误导。交叉验证和适当的训练测试分割对于诚实评估预测性能至关重要。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>
          在我的硕士学习期间的COMP90024中涵盖。该材料来自该领域的标准教科书和扩展经典理论的最新研究论文。其他见解来自实际实现经验以及与教师和同行的讨论。持续学习是掌握任何技术领域的关键。
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          初稿于2023，2026年重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Systems",
    description: "Systems note",
    course: "Cluster and Cloud Computing",
    courseCode: "COMP90024",
    level: "Master's",
    learned: "2023 S1",
    applied: "Social Sense",
    parent: { href: "/knowledge/ml", label: "ML" },
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
    subtitle: "Systems",
    description: "Systems笔记",
    course: "集群与云计算",
    courseCode: "COMP90024",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "Social Sense",
    parent: { href: "/knowledge/ml", label: "ML" },
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
