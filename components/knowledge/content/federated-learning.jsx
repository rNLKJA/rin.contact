import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/federated-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the FL-loop figure's text labels are
 * localised; geometry is internal. ↓/↑ glyphs kept; site label rendered as
 * "{siteLabel} {n}".
 */

const SITE_X = [60, 220, 380];

function FedLoopFigure({
  caption,
  ariaLabel,
  serverLabel,
  siteLabel,
  dataStaysLabel,
  modelDownLabel,
  updatesUpLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* server */}
        <rect
          x="175"
          y="12"
          width="90"
          height="28"
          rx="4"
          fill="#FF3C3C"
          opacity="0.2"
          stroke="#FF3C3C"
          strokeWidth="1.5"
        />
        <text
          x="220"
          y="30"
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="monospace"
          fill="currentColor"
        >
          {serverLabel}
        </text>
        {/* sites */}
        {SITE_X.map((x, i) => (
          <g key={i}>
            <rect
              x={x - 38}
              y="110"
              width="76"
              height="30"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x={x}
              y="125"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              {siteLabel} {i + 1}
            </text>
            <text
              x={x}
              y="135"
              textAnchor="middle"
              fontSize="6.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.55"
            >
              {dataStaysLabel}
            </text>
            <line
              x1={210 - (i - 1) * 8}
              y1="42"
              x2={x - 6}
              y2="108"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
              markerEnd="url(#flah)"
            />
            <line
              x1={x + 6}
              y1="108"
              x2={230 - (i - 1) * 8}
              y2="42"
              stroke="#FF3C3C"
              strokeWidth="1"
              opacity="0.6"
              markerEnd="url(#flahr)"
            />
          </g>
        ))}
        <text x="120" y="80" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.55">
          {modelDownLabel}
        </text>
        <text x="300" y="80" fontSize="7" fontFamily="monospace" fill="#FF3C3C">
          {updatesUpLabel}
        </text>
        <defs>
          <marker id="flah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
          </marker>
          <marker id="flahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
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
        The standard recipe for machine learning is simple: gather all the data in one place, then
        train a model on it. But a huge amount of valuable data <em>can't</em> be gathered — it's
        too sensitive, too regulated, or sits in separate organisations or jurisdictions that aren't
        allowed to pool it. The data is locked in silos, and the obvious approach is a non-starter.{" "}
        <Term>Federated learning</Term> (FL) is the clever inversion: instead of bringing the data
        to the model, <strong>bring the model to the data</strong> — train across all the silos
        while the raw data <em>never leaves</em> where it lives.
      </p>
      <p>
        It's increasingly relevant wherever privacy and data-sharing rules bite, and it pairs
        naturally with the <Link href="/knowledge/differential-privacy">differential-privacy</Link>{" "}
        and <Link href="/knowledge/mlops-monitoring">MLOps</Link> pages. This page is the core idea,
        the federated averaging that makes it work, the genuine privacy benefit (and its limits),
        and the hard parts that make it more than just "distributed training."
      </p>

      <KSection id="why" eyebrow="01" title="When data can't be moved">
        <p>
          The motivating problem is concrete: you want a model trained on data spread across many
          places — hospitals, agencies, phones, jurisdictions — but the data{" "}
          <strong>can't be centralised</strong>. Privacy law forbids it, the data is commercially or
          legally sensitive, or it simply can't leave the device or organisation that holds it.
          You're stuck: the model you could build from <em>all</em> the data would be far better
          than what any single silo can train alone, yet you can't combine the data to build it.
          Federated learning is the way out of that bind.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="Bring the model to the data">
        <p>
          The core idea is a loop that keeps the data put. A central server holds the current{" "}
          <em>shared</em> model. Each round: it sends a copy to every participating site; each site
          trains it briefly on <em>its own local data</em>; each site sends back only the resulting{" "}
          <strong>model update</strong> (the changed weights) — <em>not</em> the data; the server
          combines those updates into an improved shared model; and the cycle repeats.
        </p>
        <FedLoopFigure
          caption="The federated learning loop. The server sends the shared model to each site; each trains locally on data that never leaves; only the model updates come back; the server averages them into a better shared model and sends it out again. The raw data stays home throughout."
          ariaLabel="A central server connected to three sites; the model goes out to each site, updates come back, and the server averages them."
          serverLabel="server (avg)"
          siteLabel="site"
          dataStaysLabel="data stays"
          modelDownLabel="model ↓"
          updatesUpLabel="updates ↑ (no data)"
        />
        <p>
          The result is a model that has effectively <em>learned from all the data</em>, even though
          no raw data was ever shared or moved. The information flows as model updates, not records.
        </p>
      </KSection>

      <KSection id="fedavg" eyebrow="03" title="Federated averaging">
        <p>
          The standard algorithm for combining the updates is <Term>federated averaging</Term>{" "}
          (FedAvg), and it's pleasingly simple: the server takes the model updates from all sites
          and computes a <strong>weighted average</strong> — each site's contribution weighted by
          how much data it has (a site with more data has more say). That averaged model becomes the
          new shared model. Despite its simplicity, FedAvg is remarkably effective and is the
          workhorse of practical federated learning.
        </p>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="The privacy angle — and its limit">
        <p>
          The headline benefit is privacy: <strong>raw data never leaves its home</strong>, which
          sidesteps the biggest risk of centralisation and helps with regulatory compliance. But
          there's a crucial honest caveat:
        </p>
        <Callout type="pitfall">
          <p>
            <strong>The model updates are not automatically private.</strong> The weight changes a
            site sends back are computed from its data, and a determined adversary can sometimes{" "}
            <em>partially reconstruct</em> information about that data from the updates (or even the
            metadata, like dataset sizes). So federated learning is a privacy <em>improvement</em>,
            not a privacy <em>guarantee</em> on its own. For real protection it's combined with the
            tools from the <Link href="/knowledge/differential-privacy">differential-privacy</Link>{" "}
            page — adding calibrated noise to the updates — and <Term>secure aggregation</Term>{" "}
            (cryptographic protocols so the server only ever sees the <em>sum</em> of updates, never
            any single site's). Federated learning keeps the data home; DP and secure aggregation
            protect what leaks through the updates.
          </p>
        </Callout>
      </KSection>

      <KSection id="hard" eyebrow="05" title="Why it's harder than distributed training">
        <p>FL isn't just "training on many machines." Its distinctive difficulties:</p>
        <ul>
          <li>
            <Term>Non-IID data</Term> — the big one. Each site's data is <em>different</em> and
            unrepresentative of the whole (one hospital's patients differ from another's). When the
            local datasets are very skewed, averaging their updates can pull in conflicting
            directions, slowing convergence and biasing the model. Standard ML assumes IID data; FL
            almost never has it.
          </li>
          <li>
            <Term>Communication cost</Term> — sending model updates back and forth every round is
            expensive, especially across many or bandwidth-limited clients; reducing the rounds
            matters.
          </li>
          <li>
            <Term>Stragglers &amp; reliability</Term> — clients (especially devices) drop out, are
            slow, or vary wildly in capability; the system must tolerate that.
          </li>
        </ul>
      </KSection>

      <KSection id="kinds" eyebrow="06" title="Devices vs silos">
        <p>Two settings, with different characters:</p>
        <ul>
          <li>
            <Term>Cross-device</Term> — millions of small, unreliable clients (phones). The famous
            example is mobile keyboard next-word prediction, trained across phones without uploading
            what anyone typed.
          </li>
          <li>
            <Term>Cross-silo</Term> — a handful of large, reliable participants (hospitals, banks,
            agencies), each with substantial sensitive data. Fewer participants, higher stakes, and
            the setting most relevant to organisations that can't legally pool data.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Collaborating without sharing the data">
          <p>
            The exact problem federated learning solves is a real one in government:{" "}
            <strong>
              different agencies or jurisdictions hold sensitive data that legally or practically
              can't be combined
            </strong>
            , yet a model trained across all of it would be far more useful than any one body's
            slice. FL — train locally, share only model updates — is the mechanism for that
            collaboration <em>without</em> the data-sharing that privacy law and trust would
            otherwise forbid. It's the <strong>cross-silo</strong> setting that fits.
          </p>
          <p>
            What keeps it honest is the privacy caveat: FL is a real improvement but{" "}
            <strong>not a guarantee on its own</strong> — updates can leak, so it has to be paired
            with <Link href="/knowledge/differential-privacy">differential privacy</Link> and secure
            aggregation for genuine protection. And the <strong>non-IID</strong> reality (each
            agency's data is different) is the practical hurdle that makes it more than distributed
            training. It completes the privacy-preserving toolkit alongside{" "}
            <Link href="/knowledge/differential-privacy">DP</Link> and{" "}
            <Link href="/knowledge/data-governance">governance</Link> — the set of techniques for
            getting value from data about people without exposing them.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Federated learning trains a shared model{" "}
              <strong>without centralising the data</strong> — for when data is too sensitive/siloed
              to pool. <strong>Bring the model to the data.</strong>
            </li>
            <li>
              The loop: server sends the model to each site → each <strong>trains locally</strong> →
              sends back only <strong>model updates</strong> (not data) → server averages → repeat.
            </li>
            <li>
              <strong>Federated averaging (FedAvg)</strong>: weighted average of the updates (by
              data size). Simple, effective, the workhorse.
            </li>
            <li>
              Privacy benefit: <strong>raw data stays home</strong> — but{" "}
              <strong>updates can still leak</strong>, so combine with{" "}
              <strong>differential privacy + secure aggregation</strong> for real protection.
            </li>
            <li>
              Hard parts: <strong>non-IID data</strong> (each site's data differs → slow/biased
              convergence), communication cost, stragglers.
            </li>
            <li>
              <strong>Cross-device</strong> (phones — keyboard prediction) vs{" "}
              <strong>cross-silo</strong> (organisations/agencies — the data-can't-be-pooled case).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The model-to-the-data idea, FedAvg, the update-leakage caveat (DP + secure aggregation),
          and the non-IID challenge reflect current federated-learning references alongside
          privacy-ML work.
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
        机器学习的标准配方很简单：把所有数据聚到一处，然后在它上面训练一个模型。但有大量有价值的数据
        <em>没法</em>
        被聚起来——它太敏感、太受监管，或散落在不被允许把它汇集到一起的不同组织或司法辖区
        里。数据被锁在孤岛里，而那个显而易见的办法根本行不通。<Term>联邦学习</Term>
        （FL）是那个巧妙的 反转：不是把数据带到模型那里，而是<strong>把模型带到数据那里</strong>
        ——在所有孤岛上训练，而 原始数据<em>从不离开</em>它所在的地方。
      </p>
      <p>
        在任何隐私与数据共享规则起作用之处，它都越来越相关，并与
        <Link href="/knowledge/differential-privacy">差分隐私</Link>和
        <Link href="/knowledge/mlops-monitoring">MLOps</Link>{" "}
        页天然相配。这一页讲核心的想法、让它奏效的
        联邦平均、真实的隐私好处（及其局限），以及那些让它不只是「分布式训练」的困难之处。
      </p>

      <KSection id="why" eyebrow="01" title="当数据无法移动">
        <p>
          那个推动性的问题很具体：你想要一个在散布于许多地方的数据上训练的模型——医院、机构、手机、
          司法辖区——但数据<strong>无法被集中</strong>
          。隐私法禁止它，数据在商业上或法律上敏感，或者它
          根本不能离开持有它的设备或组织。你被卡住了：你本可以从<em>所有</em>
          数据建起的模型，会远好过
          任何单个孤岛独自能训练的，然而你没法把数据合起来去建它。联邦学习是走出那个困局的路。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="把模型送到数据">
        <p>
          核心的想法是一个让数据待在原地的循环。一个中央服务器持有当前的<em>共享</em>
          模型。每一轮：它把 一份副本发给每一个参与的站点；每个站点在<em>它自己本地的数据</em>
          上简短地训练它；每个站点只把 得到的<strong>模型更新</strong>（改变了的权重）发回来——
          <em>而非</em>数据；服务器把那些更新 合并成一个改进了的共享模型；循环重复。
        </p>
        <FedLoopFigure
          caption="联邦学习循环。服务器把共享模型发给每个站点；每个在从不离开的数据上本地训练；只有模型更新回来；服务器把它们平均成一个更好的共享模型、再发出去。原始数据自始至终待在家里。"
          ariaLabel="一个连接到三个站点的中央服务器；模型发往每个站点，更新回来，服务器把它们平均。"
          serverLabel="服务器（平均）"
          siteLabel="站点"
          dataStaysLabel="数据留下"
          modelDownLabel="模型 ↓"
          updatesUpLabel="更新 ↑（无数据）"
        />
        <p>
          结果是一个实际上<em>从所有数据中学到了东西</em>
          的模型，尽管没有任何原始数据被共享或移动过。 信息以模型更新、而非记录的形式流动。
        </p>
      </KSection>

      <KSection id="fedavg" eyebrow="03" title="联邦平均">
        <p>
          合并这些更新的标准算法是<Term>联邦平均</Term>
          （FedAvg），而它令人愉快地简单：服务器拿来所有 站点的模型更新，计算一个
          <strong>加权平均</strong>——每个站点的贡献按它有多少数据来加权（数据
          更多的站点更有发言权）。那个平均后的模型成为新的共享模型。尽管简单，FedAvg
          出奇地有效，是实用 联邦学习的主力。
        </p>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="隐私角度——以及它的局限">
        <p>
          标志性的好处是隐私：<strong>原始数据从不离开它的家</strong>
          ，这绕开了集中化最大的风险、并有助于 合规。但有一个关键的、诚实的告诫：
        </p>
        <Callout type="pitfall">
          <p>
            <strong>模型更新并非自动就是私密的。</strong>
            一个站点发回的权重变化是从它的数据算出来的，而
            一个铁了心的攻击者，有时能从更新（甚至是元数据，比如数据集的大小）里<em>部分地重建</em>
            关于 那些数据的信息。所以联邦学习是隐私的一个<em>改进</em>，而非它单独就是一个隐私
            <em>保证</em>。要 真正的保护，它要与
            <Link href="/knowledge/differential-privacy">差分隐私</Link>页里的工具
            结合——给更新加上校准的噪声——以及<Term>安全聚合</Term>
            （密码学协议，让服务器永远只看到更新 之<em>和</em>
            ，而非任何单个站点的）。联邦学习让数据待在家里；DP 与安全聚合保护那些通过更新
            泄漏出去的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="hard" eyebrow="05" title="为什么它比分布式训练更难">
        <p>FL 不只是「在许多机器上训练」。它独特的困难：</p>
        <ul>
          <li>
            <Term>非独立同分布数据</Term>——最大的那个。每个站点的数据都<em>不同</em>
            、且不代表整体（一家
            医院的病人与另一家不同）。当本地数据集很偏斜时，把它们的更新平均会朝相互冲突的方向拉，拖慢
            收敛并使模型有偏。标准机器学习假设独立同分布（IID）数据；FL 几乎从不具备它。
          </li>
          <li>
            <Term>通信成本</Term>
            ——每一轮来回发送模型更新是昂贵的，在客户端很多或带宽受限时尤甚；减少 轮数很要紧。
          </li>
          <li>
            <Term>掉队者与可靠性</Term>
            ——客户端（尤其是设备）会掉线、变慢，或在能力上千差万别；系统必须 容忍这一点。
          </li>
        </ul>
      </KSection>

      <KSection id="kinds" eyebrow="06" title="设备对孤岛">
        <p>两种场景，性格不同：</p>
        <ul>
          <li>
            <Term>跨设备</Term>
            ——数百万个小的、不可靠的客户端（手机）。著名的例子是手机键盘的下一个词
            预测，跨手机训练，而不上传任何人打的字。
          </li>
          <li>
            <Term>跨孤岛</Term>
            ——少数几个大的、可靠的参与者（医院、银行、机构），每个都有大量敏感数据。
            参与者更少、赌注更高，也是与「不能合法汇集数据的组织」最相关的场景。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="不共享数据地协作">
          <p>
            联邦学习所解决的那个确切问题，在政府里是真实存在的：
            <strong>不同的机构或司法辖区持有在法律上 或实际上无法合并的敏感数据</strong>
            ，然而一个在这一切之上训练的模型，会远比任何一个机构的
            切片更有用。FL——本地训练、只共享模型更新——是那种协作的机制，<em>而无需</em>
            隐私法与信任本会 禁止的数据共享。是那个<strong>跨孤岛</strong>的场景契合。
          </p>
          <p>
            让它保持诚实的，是那个隐私告诫：FL
            是一个真实的改进，但它单独并非一个保证——更新可能泄漏， 所以为了真正的保护，它必须与
            <Link href="/knowledge/differential-privacy">差分隐私</Link>和 安全聚合配对。而
            <strong>非独立同分布</strong>的现实（每个机构的数据都不同）是那个让它不只是
            分布式训练的实际障碍。它与 <Link href="/knowledge/differential-privacy">DP</Link> 和
            <Link href="/knowledge/data-governance">治理</Link>
            一道，补全了隐私保护的工具包——那套在不 暴露人的前提下，从关于人的数据中获取价值的技术。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              联邦学习<strong>在不集中数据的情况下</strong>
              训练一个共享模型——用于数据太敏感/太孤岛化而 无法汇集时。
              <strong>把模型送到数据那里。</strong>
            </li>
            <li>
              循环：服务器把模型发给每个站点 → 每个<strong>本地训练</strong> → 只发回
              <strong>模型更新</strong>（非数据）→ 服务器平均 → 重复。
            </li>
            <li>
              <strong>联邦平均（FedAvg）</strong>
              ：对更新的加权平均（按数据量）。简单、有效，是主力。
            </li>
            <li>
              隐私好处：<strong>原始数据待在家里</strong>——但<strong>更新仍可能泄漏</strong>
              ，所以为了 真正的保护，要与<strong>差分隐私 + 安全聚合</strong>结合。
            </li>
            <li>
              困难之处：<strong>非独立同分布数据</strong>（每个站点的数据不同 →
              收敛慢/有偏）、通信成本、 掉队者。
            </li>
            <li>
              <strong>跨设备</strong>（手机——键盘预测）对<strong>跨孤岛</strong>
              （组织/机构——数据无法 汇集的情形）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          把模型送到数据的想法、FedAvg、更新泄漏的告诫（DP +
          安全聚合），以及非独立同分布的挑战，反映了 当前的联邦学习参考文献以及隐私机器学习工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Federated Learning",
    subtitle:
      "Normally you gather all the data in one place to train a model. But what if the data can't be moved — too sensitive, too regulated, too siloed? Federated learning flips it: send the model to the data, and never collect the data at all.",
    description:
      "A thorough, practical explainer of federated learning — training a shared model without centralising data, the model-to-the-data idea, federated averaging (FedAvg), the privacy angle and its limits, the hard parts (non-IID data, communication, leakage), and cross-device vs cross-silo. In-Practice tier, anchored to Rin Huang's privacy-sensitive government work.",
    course: "Federated Learning",
    courseCode: "In practice · learning without sharing",
    level: "Professional",
    learned: "Privacy-preserving ML",
    applied: "Cross-org models, no data sharing",
    readingTime: "~13 min read",
    sections: [
      { id: "why", label: "Data that can't move" },
      { id: "idea", label: "Model to the data" },
      { id: "fedavg", label: "Federated averaging" },
      { id: "privacy", label: "The privacy angle" },
      { id: "hard", label: "Why it's hard" },
      { id: "kinds", label: "Devices vs silos" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/differential-privacy", label: "Differential Privacy" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "联邦学习",
    subtitle:
      "通常你把所有数据聚到一处来训练一个模型。但如果数据没法移动呢——太敏感、太受监管、太孤岛化？联邦学习把它反转过来：把模型送到数据那里，而根本不去收集数据。",
    description:
      "对联邦学习的详尽、实用讲解——在不集中数据的情况下训练一个共享模型、「把模型送到数据」的想法、联邦平均（FedAvg）、隐私角度及其局限、困难之处（非独立同分布数据、通信、泄漏），以及跨设备与跨孤岛。实务层，锚定 Rin Huang 对隐私敏感的政府工作。",
    course: "联邦学习",
    courseCode: "实务 · 不共享地学习",
    level: "职业",
    learned: "隐私保护机器学习",
    applied: "跨组织模型、不共享数据",
    readingTime: "约 13 分钟阅读",
    sections: [
      { id: "why", label: "无法移动的数据" },
      { id: "idea", label: "把模型送到数据" },
      { id: "fedavg", label: "联邦平均" },
      { id: "privacy", label: "隐私角度" },
      { id: "hard", label: "为什么它很难" },
      { id: "kinds", label: "设备对孤岛" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/differential-privacy", label: "差分隐私" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "federated-learning", updated: "2026-06-26", ...meta, Body };
}
