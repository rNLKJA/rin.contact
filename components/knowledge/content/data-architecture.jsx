import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/data-architecture.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the modern-data-stack figure's labels/subs
 * are localised; geometry is internal. Accent box is by INDEX (2 = warehouse).
 */

function DataStackFigure({ caption, ariaLabel, stages }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 96"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {stages.map(([t, sub], i) => {
          const x = 6 + i * 92;
          const hot = i === 2; // warehouse / lakehouse
          return (
            <g key={i}>
              <rect
                x={x}
                y="26"
                width="78"
                height="30"
                rx="4"
                fill="none"
                stroke={hot ? "#FF3C3C" : "currentColor"}
                strokeWidth={hot ? "1.5" : "1.2"}
              />
              <text
                x={x + 39}
                y="44"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fill={hot ? "#FF3C3C" : "currentColor"}
              >
                {t}
              </text>
              <text
                x={x + 39}
                y="72"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.6"
              >
                {sub}
              </text>
              {i < 4 && (
                <line
                  x1={x + 78}
                  y1="41"
                  x2={x + 98}
                  y2="41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  markerEnd="url(#daah)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="daah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
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
        Every analysis rests on a question most people never see:{" "}
        <em>where does the data live, and how did it get there?</em> Between the systems that{" "}
        <em>create</em> data (an app, a sensor, a form) and the analyst who <em>uses</em> it sits an
        entire architecture — storage, pipelines, and transformation — and the choices made there
        quietly determine what's possible, how fresh the data is, and how much an analyst can trust
        it. <Term>Data architecture</Term> is the design of that flow, and the{" "}
        <Term>modern data stack</Term> is the now-standard cloud-based way to build it.
      </p>
      <p>
        It's worth knowing even if you never build one, because understanding how data is stored and
        served is what lets you work with it sensibly — and spot when the architecture, not your
        analysis, is the problem. This page is the practical landscape: the storage options, the
        great ETL→ELT shift, and the components of the modern stack. It builds on the{" "}
        <Link href="/knowledge/database-systems">database systems</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="Where data lives and how it flows">
        <p>
          Think of it as a journey with stages: data is <strong>created</strong> in source systems,
          then <strong>ingested</strong> into central storage, <strong>transformed</strong> into
          clean, usable shapes, and finally <strong>served</strong> to dashboards, models, and
          analysts. Every data platform is some arrangement of those four stages, and the
          interesting decisions are <em>where</em> the storage and the transformation happen — which
          is exactly what's changed dramatically over the last decade.
        </p>
      </KSection>

      <KSection id="oltpolap" eyebrow="02" title="Two jobs: OLTP vs OLAP">
        <p>
          The foundational split, from the <Link href="/knowledge/database-systems">database</Link>{" "}
          page: databases do two very different jobs, and you don't want to mix them.
        </p>
        <ul>
          <li>
            <Term>OLTP</Term> (transactional) — the operational databases that <em>run</em> the
            business: fast, tiny reads and writes ("record this sale", "update this account").
            Optimised for many small operations.
          </li>
          <li>
            <Term>OLAP</Term> (analytical) — systems built to <em>analyse</em>: scan and aggregate
            huge volumes ("total sales by region this year"). Optimised for big questions, not small
            updates.
          </li>
        </ul>
        <p>
          Running heavy analytics on the live transactional database would cripple the application,
          so the whole point of an analytical architecture is to{" "}
          <strong>move data out of the operational systems into a place built for analysis</strong>.
          That place is the warehouse — or the lake, or the lakehouse.
        </p>
      </KSection>

      <KSection id="stores" eyebrow="03" title="Warehouse, lake & lakehouse">
        <p>The three big storage paradigms, and the arc from one to the next:</p>
        <ul>
          <li>
            <Term>Data warehouse</Term> — stores <em>structured</em>, cleaned data in a defined
            schema (<em>schema-on-write</em>: shape it before you store it). Excellent for fast,
            reliable
            <Link href="/knowledge/business-intelligence-dashboards"> BI</Link> and SQL — but rigid,
            and it doesn't suit raw or unstructured data.
          </li>
          <li>
            <Term>Data lake</Term> — stores <em>everything</em>, raw and in any format (
            <em>schema-on-read</em>: store first, impose structure when you query). Cheap and
            flexible — but easily becomes a "data swamp": ungoverned, undocumented, hard to trust.
          </li>
          <li>
            <Term>Data lakehouse</Term> — the modern convergence: lake-style cheap, flexible storage
            of raw data <em>plus</em> warehouse-style structure, transactions, and governance
            layered on top. It aims to give you one platform for both raw and analysis-ready data,
            and it's the dominant 2020s design.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The simplest way to hold them apart: a <strong>warehouse</strong> is a tidy library
            (catalogued, structured, easy to find things, but you must catalogue before shelving); a{" "}
            <strong>lake</strong> is a giant warehouse floor (dump anything, sort it out later — and
            risk a mess); the <strong>lakehouse</strong> tries to be a giant floor <em>with</em> a
            good catalogue.
          </p>
        </Callout>
      </KSection>

      <KSection id="eltl" eyebrow="04" title="ETL vs ELT: the shift that changed everything">
        <p>
          One of the biggest practical changes is the order of two letters. The classic approach was{" "}
          <Term>ETL</Term> — Extract, <strong>Transform</strong>, Load: pull data out, clean and
          reshape it <em>before</em> loading it into the warehouse. You had to, because warehouse
          storage and compute were scarce and expensive.
        </p>
        <p>
          Cheap, scalable cloud storage flipped this to <Term>ELT</Term> — Extract, Load,{" "}
          <strong>Transform</strong>: load the <em>raw</em> data into the warehouse first, then
          transform it <em>inside</em> the warehouse using its (now abundant) compute. The
          advantages are real: you keep the raw data (so you can re-transform it later when needs
          change), transformations are version-controlled SQL rather than opaque pipelines, and it's
          faster and more flexible. This single re-ordering is what made the modern stack possible.
        </p>
      </KSection>

      <KSection id="stack" eyebrow="05" title="The modern data stack">
        <p>
          The "modern data stack" is the now-standard, modular, cloud-native set of tools assembled
          around ELT. Each layer is a specialised, swappable component:
        </p>
        <DataStackFigure
          caption="The modern data stack. Ingestion tools load raw data from sources into a cloud warehouse/lakehouse; a transformation layer (dbt) turns it into clean, modelled tables in SQL; BI and ML sit on top. Load raw first, transform in place — the ELT pattern as an architecture."
          ariaLabel="Pipeline: sources to ingestion to a cloud warehouse to a transformation layer to BI and ML."
          stages={[
            ["sources", "apps, APIs"],
            ["ingest", "load raw"],
            ["warehouse", "lakehouse"],
            ["transform", "dbt / SQL"],
            ["BI + ML", "serve"],
          ]}
        />
        <p>
          The transformation layer deserves a name: <Term>dbt</Term> (data build tool) became the
          industry standard by letting analysts write transformations as{" "}
          <em>version-controlled, tested, modular SQL</em>— bringing the{" "}
          <Link href="/knowledge/reproducibility">software-engineering discipline</Link> of the
          reproducibility page to data modelling. An{" "}
          <Link href="/knowledge/reproducibility">orchestrator</Link> schedules and chains the whole
          flow, and <Link href="/knowledge/business-intelligence-dashboards">BI tools</Link> sit on
          top for the dashboards.
        </p>
      </KSection>

      <KSection id="medallion" eyebrow="06" title="Bronze, silver, gold: the medallion">
        <p>
          A popular way to organise the transformation inside the lakehouse is the{" "}
          <Term>medallion architecture</Term> — data flows through three quality tiers:
        </p>
        <ul>
          <li>
            <Term>Bronze</Term> — raw, as-ingested data, untouched (your faithful record of what
            arrived).
          </li>
          <li>
            <Term>Silver</Term> — cleaned, validated, conformed (the{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link> tier — deduplicated,
            typed, joined).
          </li>
          <li>
            <Term>Gold</Term> — business-level aggregates and features, analysis-ready (what
            dashboards and models actually consume).
          </li>
        </ul>
        <p>
          It's a clean, progressive refinement — each tier improves quality and structure — and
          keeping the raw bronze layer is itself a{" "}
          <Link href="/knowledge/reproducibility">reproducibility</Link> win: you can always rebuild
          silver and gold from the original truth.
        </p>
      </KSection>

      <KSection id="mesh" eyebrow="07" title="Centralised vs data mesh">
        <p>
          A final organisational question: should one central data team own everything, or not? The
          traditional model centralises — one team, one warehouse, one source of truth — which is
          simple to govern but can become a bottleneck as an organisation grows.{" "}
          <Term>Data mesh</Term> is the counter-idea: <strong>decentralise</strong> ownership so
          each domain team owns its own data <em>as a product</em>, with governance handled in a
          federated way. It's more an organisational philosophy than a technology, and it suits
          large, complex organisations more than small ones — a trade-off between central control
          and domain autonomy, not a universal upgrade.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing where the data comes from">
          <p>
            As an analyst I'm usually a <em>consumer</em> of this architecture, not its builder —
            but understanding it changes how well I can work. Knowing whether data lives in a{" "}
            <strong>warehouse vs a lake</strong>, whether it's been through{" "}
            <strong>silver/gold</strong> cleaning or is raw <strong>bronze</strong>, and how fresh
            the pipeline keeps it, tells me how much I can trust a table and where a problem likely
            originates — often the architecture, not my query.
          </p>
          <p>
            The <strong>ELT</strong> shift matters too: with raw data preserved and transformations
            as <strong>version-controlled SQL</strong> (dbt), the analytical layer becomes something
            I can read, trust, and trace — the same{" "}
            <Link href="/knowledge/reproducibility">reproducibility</Link> and{" "}
            <Link href="/knowledge/data-governance">lineage</Link> discipline applied to where data
            lives. It ties to <Link href="/knowledge/database-systems">database systems</Link> (the
            foundations), <Link href="/knowledge/business-intelligence-dashboards">BI</Link> (the
            serving layer), and <Link href="/knowledge/streaming-analytics">streaming</Link> (the
            real-time path).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Data architecture = how data flows{" "}
              <strong>source → ingest → store → transform → serve</strong>. Move analytics off the
              live <strong>OLTP</strong> system onto an <strong>OLAP</strong> one.
            </li>
            <li>
              Storage: <strong>warehouse</strong> (structured, schema-on-write) vs{" "}
              <strong>lake</strong> (raw, schema-on-read, risks a swamp) vs{" "}
              <strong>lakehouse</strong> (the modern convergence).
            </li>
            <li>
              <strong>ETL → ELT</strong>: cheap cloud compute flipped it — load raw <em>first</em>,
              transform in the warehouse. Keeps raw data, makes transforms version-controlled SQL.
            </li>
            <li>
              The <strong>modern data stack</strong>: ingestion → cloud warehouse →{" "}
              <strong>dbt</strong> (tested, modular SQL transforms) → BI/ML, with an orchestrator.
            </li>
            <li>
              <strong>Medallion</strong>: bronze (raw) → silver (cleaned) → gold (analysis-ready).
              Keeping bronze is a reproducibility win.
            </li>
            <li>
              <strong>Centralised</strong> (one team/warehouse) vs <strong>data mesh</strong>{" "}
              (decentralised domain ownership) — an org trade-off, not a universal upgrade.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The warehouse/lake/lakehouse arc, the ETL→ELT shift, the modern-data-stack (dbt)
          components, and the medallion and data-mesh patterns reflect current data-architecture
          references alongside hands-on work.
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
        每一次分析都搁在一个大多数人从未看见的问题之上：<em>数据住在哪里，它又是怎么到那儿的？</em>
        在<em>创建</em>数据的系统（一个应用、一个传感器、一张表单）与<em>使用</em>
        它的分析师之间，坐着
        一整套架构——存储、管道、转换——而在那里做出的选择，悄悄地决定了什么是可能的、数据有多新鲜、
        以及一名分析师能多信任它。<Term>数据架构</Term>是那条流的设计，而<Term>现代数据栈</Term>
        是如今 标准的、基于云的构建方式。
      </p>
      <p>
        即便你从不亲手搭一套，也值得了解它，因为理解数据如何被存储和供给，正是让你能明智地与之打交道的
        东西——并看出何时是架构、而非你的分析，才是问题所在。这一页是那片实用的地景：存储的选项、那次
        伟大的 ETL→ELT 转变，以及现代数据栈的各个组件。它建立在
        <Link href="/knowledge/database-systems">数据库系统</Link>页之上。
      </p>

      <KSection id="why" eyebrow="01" title="数据住在哪里、如何流动">
        <p>
          把它想成一段有阶段的旅程：数据在源系统里被<strong>创建</strong>，然后被
          <strong>摄取</strong>进 中央存储，被<strong>转换</strong>成干净、可用的形状，最后被
          <strong>供给</strong>给仪表板、模型
          与分析师。每一个数据平台都是这四个阶段的某种安排，而有趣的决定在于存储与转换
          <em>在哪里</em>
          发生——而这恰恰是过去十年里发生了剧变的地方。
        </p>
      </KSection>

      <KSection id="oltpolap" eyebrow="02" title="两份工作：OLTP 对 OLAP">
        <p>
          那个基础性的划分，来自<Link href="/knowledge/database-systems">数据库</Link>
          页：数据库做两份 非常不同的工作，而你不会想把它们混在一起。
        </p>
        <ul>
          <li>
            <Term>OLTP</Term>（事务型）——<em>运行</em>
            业务的那些运营数据库：快速、微小的读与写（「记录
            这笔销售」「更新这个账户」）。为许多小操作而优化。
          </li>
          <li>
            <Term>OLAP</Term>（分析型）——为<em>分析</em>
            而建的系统：扫描并聚合巨量数据（「今年各地区的
            总销售额」）。为大问题、而非小更新而优化。
          </li>
        </ul>
        <p>
          在活的事务数据库上跑沉重的分析，会拖垮应用，所以一套分析架构的全部要点，就是
          <strong>把数据从 运营系统里搬出来、搬进一个为分析而建的地方</strong>
          。那个地方就是仓库——或者湖，或者湖仓。
        </p>
      </KSection>

      <KSection id="stores" eyebrow="03" title="仓库、湖与湖仓">
        <p>三大存储范式，以及从一个到下一个的弧线：</p>
        <ul>
          <li>
            <Term>数据仓库</Term>——把<em>结构化的</em>、清洗过的数据存进一个定义好的模式里（
            <em>写时 模式</em>：在存之前先把它塑形）。对快速、可靠的
            <Link href="/knowledge/business-intelligence-dashboards"> BI</Link> 与 SQL
            极好——但僵硬， 且不适合原始或非结构化数据。
          </li>
          <li>
            <Term>数据湖</Term>——把<em>一切</em>都存下来，原始的、任何格式的（<em>读时模式</em>
            ：先存，
            查询时再施加结构）。便宜又灵活——但很容易变成一个「数据沼泽」：无治理、无文档、难以信任。
          </li>
          <li>
            <Term>数据湖仓</Term>——现代的融合：湖式的、对原始数据廉价而灵活的存储，<em>加上</em>叠在
            上面的仓库式结构、事务与治理。它的目标是给你一个同时容纳原始数据与分析就绪数据的平台，也是
            2020 年代占主导的设计。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            把它们分开最简单的方式：<strong>仓库</strong>是一座整洁的图书馆（编了目、有结构、容易找
            东西，但你必须先编目才能上架）；<strong>湖</strong>
            是一片巨大的仓库地面（什么都往里倒，回头 再理——也冒着一团乱的风险）；
            <strong>湖仓</strong>试图成为一片巨大的地面、<em>带着</em>一份 好的编目。
          </p>
        </Callout>
      </KSection>

      <KSection id="eltl" eyebrow="04" title="ETL 对 ELT：改变了一切的那次转变">
        <p>
          最大的实际变化之一，是两个字母的顺序。经典的做法是 <Term>ETL</Term>——抽取（Extract）、
          <strong>转换</strong>（Transform）、加载（Load）：把数据拉出来，在把它加载进仓库
          <em>之前</em>
          清洗并重塑它。你不得不如此，因为仓库的存储与算力稀缺而昂贵。
        </p>
        <p>
          廉价、可扩展的云存储把这个翻转成了 <Term>ELT</Term>——抽取、加载、<strong>转换</strong>
          ：先把
          <em>原始</em>数据加载进仓库，再用仓库（如今充裕的）算力<em>在仓库内部</em>
          转换它。好处是实打
          实的：你保留了原始数据（所以需求变化时你能在之后重新转换它）、转换是受版本控制的 SQL 而非
          不透明的管道，而且更快、更灵活。这单单一次重新排序，就是让现代数据栈成为可能的东西。
        </p>
      </KSection>

      <KSection id="stack" eyebrow="05" title="现代数据栈">
        <p>
          「现代数据栈」是如今标准的、模块化的、云原生的一套工具，围绕 ELT 组装而成。每一层都是一个
          专门的、可替换的组件：
        </p>
        <DataStackFigure
          caption="现代数据栈。摄取工具把原始数据从源加载进一个云仓库/湖仓；一个转换层（dbt）用 SQL 把它变成干净的、建好模的表；BI 与 ML 坐在上面。先加载原始、就地转换——把 ELT 模式当作一套架构。"
          ariaLabel="流水线：源 → 摄取 → 一个云仓库 → 一个转换层 → BI 与 ML。"
          stages={[
            ["数据源", "应用、API"],
            ["摄取", "加载原始"],
            ["仓库", "湖仓"],
            ["转换", "dbt / SQL"],
            ["BI + ML", "服务"],
          ]}
        />
        <p>
          转换层值得有个名字：<Term>dbt</Term>（data build
          tool）成了行业标准，因为它让分析师把转换写成
          <em>受版本控制的、经过测试的、模块化的 SQL</em>——把
          <Link href="/knowledge/reproducibility">软件工程纪律</Link>带到了数据建模上。一个
          <Link href="/knowledge/reproducibility">编排器</Link>
          调度并串起整条流，而
          <Link href="/knowledge/business-intelligence-dashboards">BI 工具</Link>坐在 上面做仪表板。
        </p>
      </KSection>

      <KSection id="medallion" eyebrow="06" title="青铜、白银、黄金：奖牌架构">
        <p>
          在湖仓内部组织转换的一种流行方式，是<Term>奖牌架构</Term>——数据流经三个质量层级：
        </p>
        <ul>
          <li>
            <Term>青铜</Term>——原始的、按摄取原样的数据，未经触碰（你对到达之物的忠实记录）。
          </li>
          <li>
            <Term>白银</Term>——清洗过、验证过、规整过的（那个
            <Link href="/knowledge/feature-engineering">数据准备</Link>层级——去重、定类型、连接）。
          </li>
          <li>
            <Term>黄金</Term>——业务层面的聚合与特征，分析就绪（仪表板与模型实际消费的）。
          </li>
        </ul>
        <p>
          这是一种干净的、逐级的精炼——每一层都改善质量与结构——而保留原始的青铜层本身就是一项
          <Link href="/knowledge/reproducibility">可复现性</Link>
          的胜利：你总能从原初的真相重建白银与 黄金。
        </p>
      </KSection>

      <KSection id="mesh" eyebrow="07" title="集中式对数据网格">
        <p>
          最后一个组织层面的问题：该不该由一个中央数据团队拥有一切？传统模型是集中式的——一个团队、一个
          仓库、一个可信来源——这易于治理，但随着机构成长可能变成一个瓶颈。<Term>数据网格</Term>
          是相反的 想法：<strong>去中心化</strong>所有权，让每个领域团队把自己的数据
          <em>当作一件产品</em>来拥有，
          治理则以联邦的方式处理。它更像是一种组织哲学，而非一项技术，并且它更适合大型、复杂的机构，而非
          小型的——是中央控制与领域自治之间的一个权衡，而非一次普适的升级。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="知道数据从哪里来">
          <p>
            作为一名分析师，我通常是这套架构的<em>消费者</em>
            ，而非它的建造者——但理解它，改变了我能把 工作做得多好。知道数据是住在
            <strong>仓库还是湖</strong>里、它是经过了<strong>白银/黄金</strong>清洗、还是原始的
            <strong>青铜</strong>，以及管道把它保持得多新鲜，告诉我能多信任一张
            表、以及一个问题大概源自哪里——往往是架构，而非我的查询。
          </p>
          <p>
            <strong>ELT</strong> 的转变也很要紧：原始数据被保留、转换是受版本控制的
            SQL（dbt），分析层 于是变成某种我能读、能信、能追溯的东西——把同样的
            <Link href="/knowledge/reproducibility">可 复现性</Link>与
            <Link href="/knowledge/data-governance">血缘</Link>纪律，应用到数据住在哪里
            这件事上。它连到<Link href="/knowledge/database-systems">数据库系统</Link>（地基）、
            <Link href="/knowledge/business-intelligence-dashboards">BI</Link>（供给层），以及
            <Link href="/knowledge/streaming-analytics">流式分析</Link>（实时路径）。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              数据架构 = 数据如何流动 <strong>源 → 摄取 → 存储 → 转换 → 服务</strong>。把分析从活的
              <strong>OLTP</strong> 系统挪到一个 <strong>OLAP</strong> 系统上。
            </li>
            <li>
              存储：<strong>仓库</strong>（结构化、写时模式）对<strong>湖</strong>
              （原始、读时模式、有 沼泽风险）对<strong>湖仓</strong>（现代的融合）。
            </li>
            <li>
              <strong>ETL → ELT</strong>：廉价的云算力把它翻转了——先加载原始，在仓库里转换。保留原始
              数据，让转换成为受版本控制的 SQL。
            </li>
            <li>
              <strong>现代数据栈</strong>：摄取 → 云仓库 → <strong>dbt</strong>（经测试的、模块化的
              SQL 转换）→ BI/ML，带一个编排器。
            </li>
            <li>
              <strong>奖牌架构</strong>：青铜（原始）→ 白银（清洗）→
              黄金（分析就绪）。保留青铜是一项可 复现性的胜利。
            </li>
            <li>
              <strong>集中式</strong>（一个团队/仓库）对<strong>数据网格</strong>
              （去中心化的领域所有 权）——一个组织上的权衡，而非普适的升级。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          仓库/湖/湖仓的弧线、ETL→ELT
          的转变、现代数据栈（dbt）的组件，以及奖牌架构与数据网格的模式，
          反映了当前的数据架构参考文献以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Data Architecture & the Modern Data Stack",
    subtitle:
      "Before you can analyse data, it has to live somewhere and flow from where it's created to where it's used. How an organisation arranges that — warehouse, lake, or lakehouse; ETL or ELT — quietly shapes everything an analyst can do.",
    description:
      "A thorough, practical explainer of data architecture and the modern data stack — OLTP vs OLAP, the data warehouse vs lake vs lakehouse, ETL vs ELT, the modern-data-stack components (ingestion, warehouse, dbt, BI), the medallion architecture, and data mesh. In-Practice tier, anchored to Rin Huang's government-analyst work.",
    course: "Data Architecture & the Modern Data Stack",
    courseCode: "In practice · where data flows",
    level: "Professional",
    learned: "Data engineering · ongoing",
    applied: "Designing sound data flows",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Where data lives" },
      { id: "oltpolap", label: "Two jobs for data" },
      { id: "stores", label: "Warehouse, lake, lakehouse" },
      { id: "eltl", label: "ETL vs ELT" },
      { id: "stack", label: "The modern data stack" },
      { id: "medallion", label: "Bronze, silver, gold" },
      { id: "mesh", label: "Centralised vs mesh" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/advanced-database-systems", label: "Advanced Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据架构与现代数据栈",
    subtitle:
      "在你能分析数据之前，它得住在某个地方，并从它被创建之处流向它被使用之处。一个机构如何安排这件事——仓库、湖、还是湖仓；ETL 还是 ELT——悄悄地塑造着一名分析师所能做的一切。",
    description:
      "对数据架构与现代数据栈的详尽、实用讲解——OLTP 与 OLAP、数据仓库与数据湖与湖仓、ETL 与 ELT、现代数据栈的组件（摄取、仓库、dbt、BI）、奖牌架构，以及数据网格。实务层，锚定 Rin Huang 的政府分析师工作。",
    course: "数据架构与现代数据栈",
    courseCode: "实务 · 数据流向何处",
    level: "职业",
    learned: "数据工程 · 持续进行",
    applied: "设计稳健的数据流",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "数据住在哪里" },
      { id: "oltpolap", label: "数据的两份工作" },
      { id: "stores", label: "仓库、湖、湖仓" },
      { id: "eltl", label: "ETL 对 ELT" },
      { id: "stack", label: "现代数据栈" },
      { id: "medallion", label: "青铜、白银、黄金" },
      { id: "mesh", label: "集中式对网格" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/advanced-database-systems", label: "高级数据库系统" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "data-architecture", updated: "2026-06-26", ...meta, Body };
}
