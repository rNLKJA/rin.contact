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
  { id: "wall", label: "The scaling wall" },
  { id: "parallelism", label: "Parallelism and Amdahl's law" },
  { id: "hpc", label: "Clusters, HPC, and MPI" },
  { id: "mapreduce", label: "MapReduce" },
  { id: "spark", label: "Spark" },
  { id: "cloud", label: "The cloud" },
  { id: "storage", label: "Storage and the CAP trade-off" },
  { id: "choosing", label: "Choosing the right tool" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ClusterCloudComputingKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="cluster-cloud-computing"
      title="Cluster & Cloud Computing"
      subtitle="What you do when the data is too big for one machine. Split the work across many computers — and wrestle with the new problems that creates: coordination, failure, and the limits of parallelism itself."
      description="A thorough, first-principles explainer of cluster and cloud computing — the scaling wall, parallelism and Amdahl's law, HPC clusters and MPI, MapReduce, Spark, cloud service models and elasticity, distributed storage and the CAP theorem. Advanced tier, anchored to Rin Huang's UniMelb COMP90024 and his SPARTAN/Spark projects."
      course="Cluster & Cloud Computing"
      courseCode="COMP90024 · Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023 S1"
      applied="SPARTAN HPC · Spark · cloud"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        For a long time, computers got faster every year and you could just wait for
        the hardware to catch up to your data. That free lunch ended — single processors
        stopped getting dramatically faster — and datasets kept growing. The answer is{" "}
        <Term>distributed computing</Term>: instead of one bigger machine, use{" "}
        <em>many</em> machines working together. Simple to say, genuinely hard to do
        well.
      </p>
      <p>
        This is the engineering that lets analysis run at real-world scale — the{" "}
        <Link href="/knowledge/database-systems">database</Link> and{" "}
        <Link href="/knowledge/statistical-machine-learning">ML</Link> work on these
        pages all hit it eventually. I learned it on Melbourne's SPARTAN
        supercomputer and Spark; here's the whole picture, including the catch that no
        amount of hardware can buy your way past.
      </p>

      <KSection id="wall" eyebrow="01" title="The scaling wall">
        <p>
          There are two ways to get more computing power, and the difference matters:
        </p>
        <ul>
          <li>
            <Term>Scaling up</Term> (vertical) — buy a bigger machine: more RAM, more
            cores, faster disks. Simple, but there's a hard ceiling and the price climbs
            steeply.
          </li>
          <li>
            <Term>Scaling out</Term> (horizontal) — add more <em>ordinary</em> machines
            and split the work across them. Near-limitless and cheap per unit, but now
            your program has to be written to run in pieces across a network.
          </li>
        </ul>
        <p>
          Big data lives in the scaling-out world. The moment a dataset won't fit in one
          machine's memory — or one machine would take a week to process it — you need a{" "}
          <Term>cluster</Term>: a group of networked computers (<Term>nodes</Term>)
          coordinated to act as one. That shift solves the size problem and creates three
          new ones — splitting the work, coordinating the pieces, and surviving the
          failures that become inevitable once you have hundreds of machines.
        </p>
      </KSection>

      <KSection id="parallelism" eyebrow="02" title="Parallelism and Amdahl's law">
        <p>
          Running work in parallel comes in two flavours: <Term>data parallelism</Term>{" "}
          (split the data, run the same operation on each chunk — the dominant pattern in
          analytics) and <Term>task parallelism</Term> (different machines do different
          jobs at once). Either way, you hit a fundamental limit that every distributed
          engineer must respect.
        </p>
        <p>
          <Term>Amdahl's law</Term> says your speed-up is capped by the part of the work
          that <em>can't</em> be parallelised. If a fraction <TeX>{String.raw`p`}</TeX> of
          a job is parallelisable and you throw <TeX>{String.raw`N`}</TeX> processors at
          it, the best speed-up you can get is:
        </p>
        <Formula
          label="Speed-up equals one divided by, the serial fraction one minus p, plus the parallel fraction p divided by N."
          caption="p: the parallelisable fraction. N: number of processors. The serial part (1−p) sets a hard ceiling no amount of hardware beats."
        >
          {String.raw`\text{speed-up} = \frac{1}{(1 - p) + \dfrac{p}{N}}`}
        </Formula>
        <p>
          The lesson is sobering: if 10% of your job is inherently serial
          (<TeX>{String.raw`p = 0.9`}</TeX>), then even with <em>infinite</em>{" "}
          processors you can never go more than <strong>10×</strong> faster — because as{" "}
          <TeX>{String.raw`N \to \infty`}</TeX>, the speed-up approaches{" "}
          <TeX>{String.raw`1/(1-p) = 10`}</TeX>. More machines have sharply diminishing
          returns, and the serial bottleneck, not the hardware, is what you must attack.
          It's why "just add more nodes" so often disappoints.
        </p>
      </KSection>

      <KSection id="hpc" eyebrow="03" title="Clusters, HPC, and MPI">
        <p>
          <Term>High-Performance Computing</Term> (HPC) is the classic cluster world:
          a supercomputer is really a few thousand nodes wired together with a very fast
          network, shared by many researchers. You don't run things interactively — you
          submit a <Term>job</Term> to a <Term>scheduler</Term> (like Slurm), which
          queues it and allocates nodes when they're free. Melbourne's{" "}
          <Term>SPARTAN</Term> is exactly this.
        </p>
        <p>
          To make many nodes cooperate on one computation, the traditional tool is{" "}
          <Term>MPI</Term> (Message Passing Interface). Because the nodes don't share
          memory, they coordinate by explicitly <em>sending messages</em> to each other —
          "here's my piece of the result, combine it with yours." It's powerful and fast
          but low-level: you manage the communication by hand, which is precise but
          error-prone. The big-data frameworks that followed exist largely to hide this
          complexity.
        </p>
      </KSection>

      <KSection id="mapreduce" eyebrow="04" title="MapReduce">
        <p>
          <Term>MapReduce</Term>, popularised by Google, was the breakthrough that made
          distributed data processing accessible. Its insight: express your computation
          as just two functions, and let the framework handle all the hard distributed
          plumbing — splitting data, scheduling, moving results, and recovering from
          failures.
        </p>
        <ul>
          <li>
            <Term>Map</Term> — applied to each chunk of data in parallel across the
            cluster, emitting key-value pairs (e.g. for word count, emit{" "}
            <code>(word, 1)</code> for every word).
          </li>
          <li>
            <Term>Shuffle</Term> — the framework groups all values by key and moves them
            so each key's data lands on one node.
          </li>
          <li>
            <Term>Reduce</Term> — combines the values for each key into the final result
            (sum the 1s → the count per word).
          </li>
        </ul>
        <p>
          You write two simple functions; the framework turns them into a fault-tolerant
          job across a thousand machines. The cost is rigidity — many problems are awkward
          to force into map-then-reduce, and chaining steps means writing slow
          intermediate results to disk each time. That last weakness is exactly what
          Spark fixed.
        </p>

        <Figure caption="MapReduce. Input is split across nodes; map runs in parallel emitting key-value pairs; the shuffle groups them by key; reduce combines each key's values into the output. The framework handles the distribution and failures.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A flow: input splits into chunks, each goes through a Map step in parallel, then a Shuffle groups by key, then Reduce combines into the output."
          >
            {["input", "map", "shuffle", "reduce", "output"].map((label, i) => {
              const x = 8 + i * 90;
              const accent = label === "map" || label === "reduce";
              return (
                <g key={label}>
                  <rect x={x} y={62} width={74} height={34} rx={2} fill={accent ? "#FF3C3C" : "none"} fillOpacity={accent ? 0.1 : 0} stroke={accent ? "#FF3C3C" : "currentColor"} strokeWidth={accent ? 1.4 : 1} opacity={accent ? 1 : 0.6} />
                  <text x={x + 37} y={83} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{label}</text>
                  {i < 4 && <line x1={x + 74} y1={79} x2={x + 90} y2={79} stroke="#FF3C3C" strokeWidth={1.3} markerEnd="url(#cc-ah)" />}
                </g>
              );
            })}
            {/* parallel hint under map */}
            <text x="115" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">parallel across nodes</text>
            <text x="295" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">per key</text>
            <defs>
              <marker id="cc-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="spark" eyebrow="05" title="Spark">
        <p>
          <Term>Apache Spark</Term> is the modern successor, and its key advance is{" "}
          <Term>in-memory</Term> computing. Where MapReduce wrote intermediate results to
          disk between every step, Spark keeps data in the cluster's RAM across steps —
          making multi-stage jobs (and especially iterative ones like machine learning)
          dramatically faster, often by 10–100×.
        </p>
        <p>Two ideas make it work:</p>
        <ul>
          <li>
            <Term>RDDs / DataFrames</Term> — a distributed collection spread across the
            cluster that you manipulate as if it were a single object, while Spark runs
            the operations in parallel underneath.
          </li>
          <li>
            <Term>Lazy evaluation</Term> — Spark doesn't run your transformations as you
            write them; it builds a plan (a graph of operations) and only executes when
            you ask for a result, letting it optimise the whole pipeline and recompute
            lost pieces after a failure.
          </li>
        </ul>
        <p>
          The result is a tool that feels like writing ordinary data code (Spark even
          speaks SQL and a pandas-like API) but runs across a cluster — which is why it's
          the default for large-scale analytics today.
        </p>
      </KSection>

      <KSection id="cloud" eyebrow="06" title="The cloud">
        <p>
          A cluster used to mean buying and racking your own machines. The{" "}
          <Term>cloud</Term> changed the economics: rent computing from AWS, Azure, or
          Google on demand and pay only for what you use. Its defining feature is{" "}
          <Term>elasticity</Term> — spin up 100 machines for an hour to crunch a job, then
          shut them down — turning a huge capital purchase into a small operating cost.
          Providers sell it at three levels of abstraction:
        </p>
        <ul>
          <li>
            <Term>IaaS</Term> (Infrastructure) — raw virtual machines and storage; you
            manage the rest. Maximum control.
          </li>
          <li>
            <Term>PaaS</Term> (Platform) — a managed environment to run your code; the
            provider handles the servers and scaling.
          </li>
          <li>
            <Term>SaaS</Term> (Software) — finished applications you just use (Gmail,
            this site's analytics).
          </li>
        </ul>
        <p>
          For data work, the cloud's managed services are the real draw: a Spark cluster,
          a data warehouse, or a model-training rig that you rent for an afternoon instead
          of owning. The trade-offs are ongoing cost, vendor lock-in, and putting your
          data on someone else's infrastructure — which is a live concern for the
          government and health data I work with.
        </p>
      </KSection>

      <KSection id="storage" eyebrow="07" title="Storage and the CAP trade-off">
        <p>
          Data too big for one machine can't sit on one disk either, so it's spread
          across the cluster with a <Term>distributed file system</Term> (HDFS) or{" "}
          <Term>object storage</Term> (S3) — and replicated, so a dead drive doesn't lose
          anything. But distributing data forces a deep trade-off, captured by the{" "}
          <Term>CAP theorem</Term>: when the network between nodes fails (a{" "}
          <Term>partition</Term>, which <em>will</em> happen), a system can guarantee{" "}
          <Term>consistency</Term> (everyone sees the same data) or{" "}
          <Term>availability</Term> (every request still gets an answer) — but not both.
        </p>
        <p>
          So distributed databases pick a side: a bank's ledger favours consistency
          (better to refuse than to show a wrong balance); a social feed favours
          availability (a slightly stale post beats an error). There's no free lunch —
          and recognising which guarantee a system chose tells you exactly how it will
          behave when something breaks. It's the distributed echo of the{" "}
          <Link href="/knowledge/database-systems">ACID</Link> guarantees from the
          single-machine database page.
        </p>
      </KSection>

      <KSection id="choosing" eyebrow="08" title="Choosing the right tool">
        <p>
          The most important skill here is also the most under-rated: knowing when you{" "}
          <em>don't</em> need any of this. Distribution adds enormous complexity — network
          failures, coordination overhead, harder debugging, Amdahl's ceiling — so the
          right default is to push a single machine first. Modern servers have hundreds of
          gigabytes of RAM; a great deal of "big data" fits comfortably on one, and runs
          faster there than on a cluster whose coordination overhead eats the gains.
        </p>
        <p>
          Reach for a cluster only when the data genuinely won't fit or the job genuinely
          won't finish in time — and then prefer a managed framework (Spark on a cloud
          service) over hand-rolled MPI unless you truly need the low-level control. The
          rule of thumb: the simplest thing that fits the problem, scaled up before scaled
          out.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Scale, and the discipline to avoid it">
          <p>
            I learned this hands-on — running parallel jobs on Melbourne's{" "}
            <strong>SPARTAN</strong> HPC cluster and processing large social-media
            datasets with <strong>Spark</strong> on the cloud — and the most valuable
            takeaway is the restraint. <strong>Amdahl's law</strong> and coordination
            overhead mean distribution isn't free, so I reach for it only when a single
            machine genuinely can't cope, and lean on <strong>managed cloud</strong>{" "}
            services rather than standing up infrastructure by hand.
          </p>
          <p>
            It's also the layer that lets the rest of the toolkit operate at real scale:
            the <Link href="/knowledge/statistical-machine-learning">models</Link> and{" "}
            <Link href="/knowledge/natural-language-processing">NLP</Link> pipelines I
            build only matter if they can run over the full dataset — and in government
            and health work, the <strong>CAP</strong> and data-sovereignty trade-offs of{" "}
            <em>where</em> that compute happens are a first-order decision, not an
            afterthought.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              When data outgrows one machine, <strong>scale out</strong> (many ordinary
              nodes) rather than up — a <strong>cluster</strong>. It solves size but adds
              splitting, coordination, and failure.
            </li>
            <li>
              <strong>Amdahl's law</strong>{" "}
              <TeX>{String.raw`\frac{1}{(1-p)+p/N}`}</TeX>: the serial fraction caps your
              speed-up — more nodes have diminishing returns.
            </li>
            <li>
              <strong>HPC + MPI</strong>: nodes coordinate by explicit message passing
              (low-level, fast). <strong>MapReduce</strong>: write map + reduce, the
              framework distributes it (rigid, disk-heavy).
            </li>
            <li>
              <strong>Spark</strong>: in-memory, RDDs/DataFrames + lazy evaluation —
              10–100× faster for multi-step/iterative jobs. The modern default.
            </li>
            <li>
              The <strong>cloud</strong> rents elastic compute (IaaS/PaaS/SaaS); managed
              services are the draw, with cost/lock-in/sovereignty trade-offs.
            </li>
            <li>
              Distributed storage replicates data; the <strong>CAP theorem</strong> forces
              a choice between consistency and availability under a network partition.
              <strong>Scale up before out</strong> — distribution isn't free.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
