import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/business-intelligence-dashboards.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths on this page.
 */

const DIM_POS = [
  { x: 40, y: 18 },
  { x: 320, y: 18 },
  { x: 40, y: 130 },
  { x: 320, y: 130 },
];

function StarSchemaFigure({ caption, ariaLabel, factLabel, factSub, dims }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 180"
        className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect x="170" y="72" width="100" height="40" rx="2" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.5" />
        <text x="220" y="89" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{factLabel}</text>
        <text x="220" y="103" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">{factSub}</text>
        {DIM_POS.map((d, i) => (
          <g key={i}>
            <line x1="220" y1="92" x2={d.x + 40} y2={d.y + 16} stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <rect x={d.x} y={d.y} width="80" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x={d.x + 40} y={d.y + 20} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{dims[i]}</text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        <Term>Business intelligence</Term> (BI) is the layer that turns raw data into
        something a non-analyst can explore and act on — the reports, dashboards, and
        metrics that put answers in front of decision-makers without them writing a line of{" "}
        <Link href="/knowledge/database-systems">SQL</Link>. Tools like Power BI, Tableau,
        and Looker are how most organisations actually consume their data, which makes
        dashboard craft one of the highest-leverage skills a working analyst has.
      </p>
      <p>
        It looks easy and is deceptively hard: anyone can drag a few charts onto a canvas,
        but a dashboard people <em>trust and use</em> takes a sound data model underneath
        and real design discipline on top. This is the page I draw on most days — here's
        what separates a dashboard that drives decisions from one that gets ignored.
      </p>

      <KSection id="what" eyebrow="01" title="What BI actually is">
        <p>
          BI sits between the database and the decision-maker. Its job is{" "}
          <Term>self-service</Term>: let a manager, an executive, or a minister's office
          answer their own questions — "how are we tracking this quarter?", "where are the
          hotspots?" — interactively, without an analyst in the loop for every query. A{" "}
          <Term>report</Term> is a detailed, often multi-page view of the data; a{" "}
          <Term>dashboard</Term> is a single screen of the most important indicators at a
          glance.
        </p>
        <p>
          The distinction that matters: BI is mostly about <em>analytical</em> reading of
          data — the OLAP side of the{" "}
          <Link href="/knowledge/database-systems">database page</Link> — not transactional
          updates. You're summarising history to inform a decision, which shapes both the
          data model and the design.
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="The data model underneath">
        <p>
          The most important part of a good dashboard is invisible: the <Term>data model</Term>.
          Beginners point a tool at a giant flat spreadsheet and wonder why it's slow and the
          numbers don't add up. Professionals build a <Term>star schema</Term> — the standard
          BI model — first.
        </p>
        <p>
          A star schema splits data into <Term>fact tables</Term> (the events you measure —
          sales, cases, incidents, one row each) surrounded by <Term>dimension tables</Term>{" "}
          (the context you slice by — date, location, category, person). They connect by keys,
          exactly like the <Link href="/knowledge/database-systems">relational joins</Link>{" "}
          from the database page. This structure is what makes a dashboard both fast and
          correct: filters propagate cleanly from dimensions to facts, and the same measure
          stays consistent across every chart. Get the model right and the visuals are easy;
          get it wrong and no amount of design saves you.
        </p>

        <StarSchemaFigure
          caption="A star schema. A central fact table (the measured events) links out to dimension tables (the things you filter and group by). Filtering a dimension flows through to the fact — the structure that makes BI fast and consistent."
          ariaLabel="A central fact table connected by lines to four surrounding dimension tables: date, location, category, and person."
          factLabel="FACT"
          factSub="incidents"
          dims={["date", "location", "category", "person"]}
        />
      </KSection>

      <KSection id="measures" eyebrow="03" title="Measures and metrics">
        <p>
          On top of the model sit <Term>measures</Term> — the calculations that turn raw rows
          into the numbers people care about: a total, an average, a year-on-year change, a
          rate per capita. In Power BI these are written in a formula language (DAX); the key
          idea is that a measure is <em>dynamic</em> — it recalculates for whatever the user
          has filtered to, so "total cases" instantly becomes "total cases for this district,
          this month" as they click.
        </p>
        <p>
          The discipline is to define each metric <strong>once</strong>, centrally, and reuse
          it everywhere — so "open cases" means the same thing on every page and in every
          conversation. Inconsistent or ad-hoc metrics are how two dashboards end up
          disagreeing and trust collapses. A small, well-defined set of trusted measures is
          worth more than a sprawl of one-off calculations.
        </p>
      </KSection>

      <KSection id="onequestion" eyebrow="04" title="One question per page">
        <p>
          The most important design rule, and the one most often broken:{" "}
          <strong>each page should answer a single question</strong>. "How is the branch
          performing this quarter?" or "Where are open cases concentrated?" — one focused
          question per screen. Cramming several questions onto one page dilutes the message,
          overwhelms the reader, and slows the page down.
        </p>
        <p>
          This forces the healthy discipline of knowing what each view is <em>for</em>. If you
          can't say the one question a page answers, it's not finished — it's a pile of charts.
          Multiple questions become multiple pages, navigable but distinct.
        </p>
      </KSection>

      <KSection id="hierarchy" eyebrow="05" title="Visual hierarchy">
        <p>
          People read a dashboard the way they read a page: <strong>top to bottom, left to
          right</strong>. So the layout should put the most important thing — the headline
          KPIs, the answer to the page's question — in the <Term>top-left</Term>, where the eye
          lands first, and let detail flow down and right. A clear visual hierarchy guides
          attention without the reader having to hunt.
        </p>
        <p>
          The undervalued tool here is <Term>white space</Term>. Empty space isn't wasted —
          it's what separates groups, reduces clutter, and directs the eye to what matters. A
          clean, well-spaced dashboard with consistent fonts, colours, and alignment reads as
          trustworthy; a cramped, mismatched one reads as amateur, whatever the numbers say.
        </p>
      </KSection>

      <KSection id="performance" eyebrow="06" title="Performance">
        <p>
          A dashboard that takes ten seconds to load is a dashboard people stop opening, so
          performance is a design constraint, not an afterthought. A few concrete rules from
          practice:
        </p>
        <ul>
          <li>
            <Term>Cap the visuals per page</Term> — roughly <strong>8–12</strong>. Past ~15,
            load times become noticeably sluggish, especially on older devices.
          </li>
          <li>
            <Term>Filter at the source</Term> — pull only the data you need; high-cardinality
            columns and huge unfiltered tables are the usual culprits behind slow pages.
          </li>
          <li>
            <Term>Keep assets light</Term> — large background images (over ~2 MB) and heavy
            custom visuals drag the whole report down.
          </li>
        </ul>
        <p>
          Most of this traces back to the{" "}
          <Link href="/knowledge/database-systems">data model</Link>: a tidy star schema with
          the right granularity is the single biggest lever on speed.
        </p>
      </KSection>

      <KSection id="audience" eyebrow="07" title="Design for the audience">
        <p>
          The most common dashboard mistake isn't technical — it's psychological:{" "}
          <strong>you design for yourself, not your audience</strong>. As the analyst you want
          to show everything you found; the executive wants the few KPIs that bear on their
          decision. The fix is the same as on the{" "}
          <Link href="/knowledge/science-communication">communication page</Link> — start from
          who's reading and what they decide, then ruthlessly cut everything that doesn't serve
          that. Pick the handful of KPIs aligned to the audience's goals, and send the rest to
          a detail page they can drill into if they want.
        </p>
      </KSection>

      <KSection id="mobile" eyebrow="08" title="Mobile and accessibility">
        <p>
          Decision-makers read on phones, so a dashboard often needs a <Term>mobile layout</Term>{" "}
          — and that's not the desktop view shrunk. Design the phone version deliberately: 3–5
          key metrics, stacked vertically for thumb-scrolling, with touch targets big enough to
          tap (around 44 pixels). Power BI lets you build this mobile layout alongside the
          desktop one.
        </p>
        <p>
          <Term>Accessibility</Term> belongs here too — sufficient colour contrast, not relying
          on colour alone to carry meaning, sensible labels. In government work it's frequently
          a requirement, not a nicety, and it's simply good design: a dashboard everyone can
          read is a dashboard that does its job.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="A daily tool, not a side skill">
          <p>
            This is hands-on, current work for me. I've <strong>built intelligence and
            reporting dashboards in Power BI</strong> in government — integrating multiple data
            sources into a single trusted view, and putting it in front of executives and a
            minister's office. The lessons on this page are the ones that actually decide
            whether those dashboards get used: a clean <strong>star-schema</strong> model so
            the numbers are fast and consistent, <strong>one question per page</strong>, KPIs in
            the top-left, and a hard edit down to what the audience actually needs.
          </p>
          <p>
            It sits right at the join of the rest of this section —{" "}
            <Link href="/knowledge/database-systems">databases</Link> underneath,{" "}
            <Link href="/knowledge/science-communication">communication</Link> on top — and it's
            a large part of how analysis becomes a decision in my day job rather than a file
            nobody opens.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>BI</strong> turns the database into a self-service decision tool
              (dashboards/reports) — the analytical (OLAP) side, no SQL required of the user.
            </li>
            <li>
              The invisible foundation is the <strong>data model</strong>: a{" "}
              <strong>star schema</strong> (fact + dimension tables) makes dashboards fast and
              consistent. Define each <strong>measure</strong> once, reuse everywhere.
            </li>
            <li>
              <strong>One question per page</strong>; lay out by <strong>visual hierarchy</strong>{" "}
              (KPIs top-left, top→bottom, left→right); use <strong>white space</strong>.
            </li>
            <li>
              <strong>Performance</strong>: ~8–12 visuals per page, filter at the source, keep
              assets light. The data model is the biggest speed lever.
            </li>
            <li>
              <strong>Design for the audience, not yourself</strong> — the few KPIs that bear on
              their decision, detail behind a drill-through.
            </li>
            <li>
              Build a deliberate <strong>mobile layout</strong> (3–5 metrics, stacked, 44px
              targets) and mind <strong>accessibility</strong> (contrast, not colour alone).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Practical limits and rules on this page reflect current Power BI design guidance
          (Microsoft Learn and practitioner write-ups) alongside hands-on experience.
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
        <Term>商业智能</Term>（BI）是把原始数据变成「非分析师也能探索并据以行动之物」的那一层——
        那些把答案摆到决策者面前、而无需他们写一行 <Link href="/knowledge/database-systems">SQL</Link>{" "}
        的报告、仪表板与指标。像 Power BI、Tableau、Looker 这样的工具，是大多数组织真正消费其
        数据的方式，这让仪表板手艺成为一名在职分析师所拥有的最高杠杆技能之一。
      </p>
      <p>
        它看起来容易，实则难得出人意料：谁都能把几张图表拖到画布上，但一个让人们<em>信任并使用
        </em>的仪表板，底下需要一个稳健的数据模型，上面需要真正的设计纪律。这是我几乎每天都要
        倚靠的一页——下面就是「推动决策的仪表板」与「被无视的仪表板」之间的分野。
      </p>

      <KSection id="what" eyebrow="01" title="BI 究竟是什么">
        <p>
          BI 坐在数据库与决策者之间。它的工作是<Term>自助</Term>：让一位经理、一位高管，或一个
          部长办公室自己回答自己的问题——「我们这个季度进展如何？」「热点在哪里？」——以交互的
          方式，而不必每次查询都有分析师在场。<Term>报告</Term>是对数据的详细、常常多页的视图；
          <Term>仪表板</Term>是一屏之内、一眼可见的最重要指标。
        </p>
        <p>
          要紧的区别是：BI 大多关乎对数据的<em>分析式</em>读取——<Link href="/knowledge/database-systems">数据库
          页</Link>的 OLAP 一侧——而非事务性的更新。你是在概括历史以为一个决策提供信息，这同时
          塑造了数据模型与设计。
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="底下的数据模型">
        <p>
          一个好仪表板最重要的部分是看不见的：<Term>数据模型</Term>。新手把工具对准一张巨大的
          扁平电子表格，再纳闷它为什么慢、数字为什么对不上。专业人士先建一个<Term>星型架构
          </Term>——标准的 BI 模型。
        </p>
        <p>
          星型架构把数据拆成<Term>事实表</Term>（你所度量的事件——销售、案件、事故，各占一行）
          以及环绕其周的<Term>维度表</Term>（你据以切分的上下文——日期、地点、类别、人员）。它们
          以键相连，正如<Link href="/knowledge/database-systems">数据库页</Link>上的关系连接。这种
          结构正是让一个仪表板既快又对的东西：筛选从维度干净地传播到事实，而同一个度量在每张
          图表上保持一致。把模型弄对，视觉就容易；弄错了，再多的设计也救不了你。
        </p>

        <StarSchemaFigure
          caption="一个星型架构。一张中央的事实表（被度量的事件）向外连到维度表（你用来筛选和分组的东西）。筛选一个维度会流向事实——正是让 BI 又快又一致的结构。"
          ariaLabel="一张中央事实表，由线连到四张环绕的维度表：日期、地点、类别和人员。"
          factLabel="事实表"
          factSub="事件"
          dims={["日期", "地点", "类别", "人员"]}
        />
      </KSection>

      <KSection id="measures" eyebrow="03" title="度量与指标">
        <p>
          在模型之上坐着<Term>度量</Term>——把原始行变成人们在意的数字的那些计算：一个总计、一个
          平均、一个同比变化、一个人均比率。在 Power BI 里它们用一种公式语言（DAX）写成；关键的
          想法是：一个度量是<em>动态</em>的——它会针对用户筛选到的任何范围重新计算，于是「案件
          总数」在他们点击之时即刻变成「本区、本月的案件总数」。
        </p>
        <p>
          纪律是：把每个指标<strong>一次性</strong>、集中地定义好，再到处复用——于是「未结案件」
          在每一页、每一次对话里都意味着同一件事。不一致或临时拼凑的指标，正是两个仪表板最终
          各执一词、信任随之崩塌的原因。一小套定义良好、可信赖的度量，胜过一大摊一次性的计算。
        </p>
      </KSection>

      <KSection id="onequestion" eyebrow="04" title="一页一问">
        <p>
          最重要的设计规则，也是最常被打破的那条：<strong>每一页都应回答一个单一的问题</strong>。
          「这个分部本季度表现如何？」或「未结案件集中在哪里？」——每一屏一个聚焦的问题。把好几个
          问题硬塞进一页，会稀释讯息、压垮读者，并让页面变慢。
        </p>
        <p>
          这迫使你养成一种健康的纪律：知道每个视图是<em>为何</em>而存在。如果你说不出一页回答的
          那一个问题，它就还没做完——它只是一堆图表。多个问题应成为多个页面，可导航但彼此分明。
        </p>
      </KSection>

      <KSection id="hierarchy" eyebrow="05" title="视觉层级">
        <p>
          人们读仪表板的方式与读一页纸相同：<strong>从上到下、从左到右</strong>。所以布局应当把
          最重要的东西——头条 KPI、对该页问题的回答——放在<Term>左上角</Term>，目光最先落到之处，
          再让细节向下、向右流动。一个清晰的视觉层级，无需读者去搜寻就能引导注意力。
        </p>
        <p>
          这里被低估的工具是<Term>留白</Term>。空白并非浪费——它正是分隔各组、减少杂乱、把目光
          引向要紧之处的东西。一个干净、间距得当、字体颜色对齐都一致的仪表板，读起来可信；一个
          局促、东拼西凑的，读起来业余，不管数字怎么说。
        </p>
      </KSection>

      <KSection id="performance" eyebrow="06" title="性能">
        <p>
          一个要花十秒才加载的仪表板，是一个人们不再打开的仪表板，所以性能是一项设计约束，而非
          事后才想的事。几条来自实践的具体规则：
        </p>
        <ul>
          <li>
            <Term>限制每页的视觉对象</Term>——大致 <strong>8–12</strong> 个。超过约 15 个，加载
            时间会明显迟缓，尤其在较旧的设备上。
          </li>
          <li>
            <Term>在源头筛选</Term>——只拉取你需要的数据；高基数的列与庞大的未筛选表，是慢页面
            背后常见的元凶。
          </li>
          <li>
            <Term>让资源保持轻量</Term>——大的背景图（超过约 2 MB）与笨重的自定义视觉对象，会
            拖垮整份报告。
          </li>
        </ul>
        <p>
          这其中大部分都可追溯到<Link href="/knowledge/database-systems">数据模型</Link>：一个
          整洁、粒度恰当的星型架构，是速度上单一最大的杠杆。
        </p>
      </KSection>

      <KSection id="audience" eyebrow="07" title="为受众而设计">
        <p>
          最常见的仪表板错误不是技术性的——而是心理性的：<strong>你为自己、而非为受众而设计
          </strong>。作为分析师，你想展示你发现的一切；而高管想要的是与他们的决策相关的那几个
          KPI。修法与<Link href="/knowledge/science-communication">沟通页</Link>上一样——从「谁在
          读、他们决定什么」出发，再无情地砍掉一切无助于此的东西。挑出与受众目标对齐的那一小撮
          KPI，把其余的送进一个详情页，让他们想钻取时再钻取。
        </p>
      </KSection>

      <KSection id="mobile" eyebrow="08" title="移动端与无障碍">
        <p>
          决策者在手机上阅读，所以一个仪表板常常需要一个<Term>移动端布局</Term>——而那不是把桌面
          视图缩小。要刻意地设计手机版：3–5 个关键指标，竖直堆叠以便拇指滑动，触摸目标大到足以
          点按（约 44 像素）。Power BI 让你能在桌面布局之外一并构建这个移动端布局。
        </p>
        <p>
          <Term>无障碍</Term>也属于这里——足够的颜色对比、不单靠颜色来承载意义、合理的标签。在
          政府工作中，它往往是一项要求，而非锦上添花，而且它本就是好设计：一个人人都能读的
          仪表板，才是一个能完成其本职的仪表板。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="一件日常工具，而非旁支技能">
          <p>
            这对我是亲力亲为、正在进行的工作。我在政府里<strong>用 Power BI 构建过情报与报告
            仪表板</strong>——把多个数据源整合进一个可信赖的单一视图，并把它摆到高管与一个部长
            办公室面前。这一页上的教训，正是真正决定那些仪表板会不会被用起来的：一个干净的
            <strong>星型架构</strong>模型，让数字又快又一致；<strong>一页一问</strong>；KPI 放在
            左上角；以及狠狠地删减到受众真正需要的程度。
          </p>
          <p>
            它恰好坐在本板块其余部分的接合处——<Link href="/knowledge/database-systems">数据库
            </Link>在下、<Link href="/knowledge/science-communication">沟通</Link>在上——而它很大
            程度上正是在我的日常工作里，分析如何成为一个决策、而非一个没人打开的文件的方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>BI</strong> 把数据库变成一件自助式的决策工具（仪表板/报告）——分析（OLAP）
              一侧，无需用户写 SQL。
            </li>
            <li>
              看不见的地基是<strong>数据模型</strong>：一个<strong>星型架构</strong>（事实表 +
              维度表）让仪表板又快又一致。每个<strong>度量</strong>定义一次，到处复用。
            </li>
            <li>
              <strong>一页一问</strong>；按<strong>视觉层级</strong>布局（KPI 在左上，从上到下、
              从左到右）；善用<strong>留白</strong>。
            </li>
            <li>
              <strong>性能</strong>：每页约 8–12 个视觉对象，在源头筛选，让资源保持轻量。数据模型
              是最大的速度杠杆。
            </li>
            <li>
              <strong>为受众而非自己设计</strong>——与他们决策相关的那几个 KPI，细节藏在一个钻取
              之后。
            </li>
            <li>
              构建一个刻意的<strong>移动端布局</strong>（3–5 个指标、堆叠、44 像素目标），并留心
              <strong>无障碍</strong>（对比度，不单靠颜色）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          本页上的实际限制与规则，反映了当前 Power BI 的设计指南（Microsoft Learn 与从业者的
          文章）以及亲身经验。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Business Intelligence & Dashboards",
    subtitle:
      "Turning a database into a decision tool people actually use. The craft of dashboards — Power BI in particular — where a good data model and a disciplined design quietly do more than any single chart.",
    description:
      "A thorough, practical explainer of business intelligence and dashboard design — what BI is, the star-schema data model, measures, one-question-per-page, visual hierarchy, performance limits, designing for the audience, and mobile/accessibility. With Power BI best practices. In-Practice tier, anchored to Rin Huang's daily government-analyst work.",
    course: "Business Intelligence & Dashboards",
    courseCode: "In practice · Power BI",
    level: "Professional",
    learned: "CBS · SAPOL · ongoing",
    applied: "Ministerial & ops dashboards",
    readingTime: "~15 min read",
    sections: [
      { id: "what", label: "What BI actually is" },
      { id: "model", label: "The data model underneath" },
      { id: "measures", label: "Measures and metrics" },
      { id: "onequestion", label: "One question per page" },
      { id: "hierarchy", label: "Visual hierarchy" },
      { id: "performance", label: "Performance" },
      { id: "audience", label: "Design for the audience" },
      { id: "mobile", label: "Mobile and accessibility" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "商业智能与仪表板",
    subtitle:
      "把数据库变成人们真正会用的决策工具。仪表板的手艺——尤其是 Power BI——在这里，一个良好的数据模型与一份有纪律的设计，悄悄地胜过任何单张图表。",
    description:
      "对商业智能与仪表板设计的详尽、实用讲解——BI 是什么、星型架构数据模型、度量、一页一问、视觉层级、性能上限、面向受众设计，以及移动端/无障碍。含 Power BI 最佳实践。实务层，锚定 Rin Huang 日常的政府分析师工作。",
    course: "商业智能与仪表板",
    courseCode: "实务 · Power BI",
    level: "职业",
    learned: "CBS · SAPOL · 持续进行",
    applied: "部长级与运营仪表板",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "BI 究竟是什么" },
      { id: "model", label: "底下的数据模型" },
      { id: "measures", label: "度量与指标" },
      { id: "onequestion", label: "一页一问" },
      { id: "hierarchy", label: "视觉层级" },
      { id: "performance", label: "性能" },
      { id: "audience", label: "为受众而设计" },
      { id: "mobile", label: "移动端与无障碍" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/database-systems", label: "数据库系统" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "business-intelligence-dashboards", updated: "2026-06-25", ...meta, Body };
}
