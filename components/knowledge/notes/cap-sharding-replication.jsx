import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import CapPartition from "@/components/knowledge/widgets/CapPartition";

const SLUG = "cap-sharding-replication";

function EnBody() {
  return (
    <>
      <p>
        The CAP theorem says a distributed data store can only guarantee two of three properties:
        Consistency, Availability, and Partition tolerance. In practice, network partitions are
        inevitable, so you choose between CP (consistent but unavailable during partitions) and AP
        (available but eventually consistent). Sharding and replication are the mechanisms that
        implement these choices.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Consistency means every read sees the most recent write. Availability means every request
          gets a response (success or failure). Partition tolerance means the system works even when
          network failures split it into isolated groups. The CAP theorem says you cannot have all
          three when a partition occurs.
        </p>
        <p>
          Replication copies data across nodes so reads can be served locally and writes survive
          failures. Sharding splits data across nodes so the system scales horizontally. Together
          they determine how your system behaves during failures.
        </p>
        <p>
          In a CP system, when a partition happens, nodes in the minority partition refuse to serve
          requests to avoid returning stale data. This sacrifices availability for consistency. In
          an AP system, all partitions keep serving requests, but they might return different
          answers until the partition heals and they reconcile.
        </p>
        <p>
          Most real systems are neither pure CP nor pure AP. They offer tunable consistency: you can
          choose per-request whether to wait for acknowledgment from all replicas (strong
          consistency, low availability) or just one (high availability, eventual consistency).
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          In a replicated system with n nodes and replication factor r, each data item is stored on
          r nodes. A read quorum of q_r nodes and a write quorum of q_w nodes must satisfy q_r + q_w
          &gt; r to guarantee consistency, because any read overlaps with the latest write.
        </p>
        <p>
          For strong consistency (linearizability), you need q_r + q_w &gt; r and q_w &gt; r/2. The
          common choice is q_r = q_w = ⌈(r+1)/2⌉, a majority quorum. If r = 3, you need 2 nodes to
          agree. This tolerates ⌊r/2⌋ node failures while maintaining consistency.
        </p>
        <p>
          In sharded systems, data is partitioned across s shards using a hash function or range
          partitioning. The probability that a random key is on a failed shard is f/s, where f is
          the number of failed shards. Replicating each shard r times reduces the failure
          probability to (f/s)^r, assuming independent failures.
        </p>
        <p>
          The latency of a quorum read is the median of response times from q_r replicas. The tail
          latency matters: if one replica is slow, the 99th percentile request latency is often
          dominated by the slowest replica. Hedging (sending duplicate requests) reduces tail
          latency at the cost of increased load.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Simulate a partition and choose CP or AP behavior">
          <CapPartition copy={{}} locale="en-AU" />
        </Figure>
        <p>
          The widget simulates a three-node cluster with a network partition. In CP mode, the
          minority partition refuses writes to stay consistent. In AP mode, all partitions accept
          writes, creating divergent state. When the partition heals, AP systems must reconcile
          conflicting writes using vector clocks or last-write-wins.
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Applied">
          <p>
            I covered CAP, sharding and replication in COMP90024 Cluster and Cloud Computing. We
            deployed a distributed key-value store on NeCTAR cloud VMs, configured replication
            factors, and ran experiments to measure availability and consistency under simulated
            network partitions.
          </p>
          <p>
            In the project, we chose AP (eventual consistency) because our use case tolerated stale
            reads but required high availability. We used consistent hashing for sharding to
            minimize data movement when adding nodes, and we replicated each shard 3 times. The
            trade-off was clear: faster, more available reads at the cost of occasional stale data
            until replication caught up.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              Assuming CAP is a one-time choice. Most systems offer tunable consistency per request.
              You can choose strong consistency for critical writes and eventual consistency for
              cacheable reads.
            </li>
            <li>
              Ignoring network partitions. Partitions are not rare; they happen due to switch
              failures, misconfigurations, and even one-way reachability. Designing for partition
              tolerance is not optional.
            </li>
            <li>
              Confusing eventual consistency with no consistency. Eventual consistency guarantees
              convergence: once writes stop and partitions heal, all replicas converge to the same
              state. It is not arbitrary divergence.
            </li>
            <li>
              Forgetting about split-brain. In a partition, both sides might think they are the
              majority and accept writes. Without quorum enforcement, you get divergent state that
              is hard to reconcile.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in COMP90024 Cluster and Cloud Computing. Based on Brewer's CAP theorem (2000),
          Gilbert & Lynch's formal proof (2002), and Kleppmann's{" "}
          <em>Designing Data-Intensive Applications</em> (2017), Chapter 9. Dynamo and Cassandra
          papers are canonical AP examples; Google Spanner is CP.
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          First drafted 2023, rewritten 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        CAP
        定理表明，分布式数据存储只能保证三个属性中的两个：一致性、可用性和分区容错性。实际上，网络分区是不可避免的，所以你在
        CP（分区期间一致但不可用）和 AP（可用但最终一致）之间选择。分片和复制是实现这些选择的机制。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          一致性意味着每次读取都能看到最近的写入。可用性意味着每个请求都能得到响应（成功或失败）。分区容错性意味着即使网络故障将系统分割成孤立的组，系统仍能工作。CAP
          定理说，当分区发生时，你不能同时拥有这三个属性。
        </p>
        <p>
          复制在节点之间复制数据，以便读取可以在本地提供并且写入在故障后仍能保存。分片将数据分割到节点上，以便系统可以水平扩展。它们一起决定系统在故障期间的行为。
        </p>
        <p>
          在 CP
          系统中，当分区发生时，少数分区中的节点拒绝提供请求以避免返回过时数据。这牺牲了可用性以获得一致性。在
          AP 系统中，所有分区继续提供请求，但它们可能返回不同的答案，直到分区修复并且它们协调一致。
        </p>
        <p>
          大多数真实系统既不是纯 CP 也不是纯
          AP。它们提供可调一致性：你可以根据每个请求选择是等待所有副本的确认（强一致性，低可用性）还是只等待一个（高可用性，最终一致性）。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          在具有 n 个节点和复制因子 r 的复制系统中，每个数据项存储在 r 个节点上。读取法定人数 q_r
          个节点和写入法定人数 q_w 个节点必须满足 q_r + q_w &gt; r
          以保证一致性，因为任何读取都与最新写入重叠。
        </p>
        <p>
          对于强一致性（线性化），你需要 q_r + q_w &gt; r 和 q_w &gt; r/2。常见选择是 q_r = q_w =
          ⌈(r+1)/2⌉，即多数法定人数。如果 r = 3，你需要 2 个节点同意。这在保持一致性的同时容忍 ⌊r/2⌋
          个节点故障。
        </p>
        <p>
          在分片系统中，数据使用哈希函数或范围分区跨 s 个分片进行分区。随机键在故障分片上的概率是
          f/s，其中 f 是故障分片的数量。将每个分片复制 r 次将故障概率降低到 (f/s)^r，假设故障独立。
        </p>
        <p>
          法定人数读取的延迟是来自 q_r
          个副本的响应时间的中位数。尾部延迟很重要：如果一个副本很慢，第 99
          百分位的请求延迟通常由最慢的副本主导。对冲（发送重复请求）以增加负载为代价减少尾部延迟。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="模拟分区并选择 CP 或 AP 行为">
          <CapPartition copy={{}} locale="zh-Hans" />
        </Figure>
        <p>
          工具模拟具有网络分区的三节点集群。在 CP 模式下，少数分区拒绝写入以保持一致。在 AP
          模式下，所有分区接受写入，创建分歧状态。当分区修复时，AP
          系统必须使用向量时钟或最后写入获胜来协调冲突的写入。
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="应用">
          <p>
            我在 COMP90024 集群和云计算中涵盖了 CAP、分片和复制。我们在 NeCTAR
            云虚拟机上部署了分布式键值存储，配置了复制因子，并运行实验以在模拟网络分区下测量可用性和一致性。
          </p>
          <p>
            在项目中，我们选择了
            AP（最终一致性），因为我们的用例容忍过时读取但需要高可用性。我们使用一致性哈希进行分片以最小化添加节点时的数据移动，并将每个分片复制
            3 次。权衡很清楚：更快、更可用的读取，代价是偶尔的过时数据，直到复制赶上。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              假设 CAP
              是一次性选择。大多数系统提供每个请求的可调一致性。你可以为关键写入选择强一致性，为可缓存读取选择最终一致性。
            </li>
            <li>
              忽略网络分区。分区并不罕见；它们由于交换机故障、错误配置甚至单向可达性而发生。为分区容错性设计不是可选的。
            </li>
            <li>
              将最终一致性与无一致性混淆。最终一致性保证收敛：一旦写入停止且分区修复，所有副本收敛到相同状态。它不是任意分歧。
            </li>
            <li>
              忘记脑裂。在分区中，双方可能都认为自己是多数并接受写入。没有法定人数强制执行，你会得到难以协调的分歧状态。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>
          COMP90024 集群和云计算中涵盖。基于 Brewer 的 CAP 定理（2000），Gilbert & Lynch
          的正式证明（2002），和 Kleppmann 的《设计数据密集型应用》（2017），第 9 章。Dynamo 和
          Cassandra 论文是典型的 AP 例子；Google Spanner 是 CP。
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
    subtitle: "Distributed Systems",
    description: "CAP theorem, replication strategies, and sharding in distributed systems",
    course: "Cluster and Cloud Computing",
    courseCode: "COMP90024",
    level: "Master's",
    learned: "2024",
    applied: "Distributed key-value store",
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
    subtitle: "分布式系统",
    description: "分布式系统中的 CAP 定理、复制策略和分片",
    course: "集群和云计算",
    courseCode: "COMP90024",
    level: "硕士",
    learned: "2024",
    applied: "分布式键值存储",
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
