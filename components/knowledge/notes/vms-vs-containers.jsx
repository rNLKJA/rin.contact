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
              <strong>Running containers with --privileged.</strong> This disables most isolation
              and gives the container root access to the host. Use capability restrictions instead.
            </li>
            <li>
              <strong>Storing state in containers.</strong> Containers are ephemeral. Data written
              inside is lost when the container stops. Mount volumes for persistence.
            </li>
            <li>
              <strong>Confusing images and containers.</strong> An image is a read-only template. A
              container is a running instance. Modifying a container does not change the image it
              came from.
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
      <p>
        虚拟机在模拟硬件上运行完整的操作系统。容器共享主机内核并使用命名空间和 cgroups
        隔离进程。权衡：虚拟机更重但更隔离；容器更轻但不太安全。
      </p>

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
              <strong>使用 --privileged 运行容器。</strong>这会禁用大部分隔离并给容器对主机的 root
              访问权限。改用能力限制。
            </li>
            <li>
              <strong>在容器中存储状态。</strong>
              容器是临时的。容器停止时，内部写入的数据会丢失。挂载卷以持久化。
            </li>
            <li>
              <strong>混淆镜像和容器。</strong>
              镜像是只读模板。容器是运行实例。修改容器不会更改它来自的镜像。
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
