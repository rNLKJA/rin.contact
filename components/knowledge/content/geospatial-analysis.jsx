import Link from "next/link";
import { KSection, Callout, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/geospatial-analysis.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Prose,
 * captions, and the sources footnote are localised. No maths or figures.
 */

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Almost every dataset has a location attached — an address, a postcode, a set of
        coordinates — and once you put it on a map, patterns appear that no table would
        reveal: clusters, gaps, hotspots, corridors. <Term>Geospatial analysis</Term> is the
        discipline of working with that "where", and a <Term>GIS</Term> (Geographic
        Information System) is the software for it. It's genuinely its own field, because
        spatial data breaks some of the assumptions the rest of{" "}
        <Link href="/knowledge/statistics">statistics</Link> quietly relies on.
      </p>
      <p>
        It's also a core part of my government work — SA's social and operational data is
        deeply spatial. This page is the practical foundation: the data types, the few
        concepts that matter, and — importantly — the specific ways spatial analysis can
        mislead you if you're not careful.
      </p>

      <KSection id="why" eyebrow="01" title="Why location is different">
        <p>
          Spatial data isn't just data with two extra columns. It comes with a deep principle,
          often called the first law of geography: <strong>everything is related to everything
          else, but near things are more related than distant things</strong>. Crime, disease,
          income, house prices — they cluster in space, and that clustering is usually the
          signal you care about.
        </p>
        <p>
          That same clustering is also why ordinary statistics can mislead on spatial data:
          standard methods assume observations are <em>independent</em>, but neighbouring
          places aren't — they influence and resemble each other. So spatial analysis needs its
          own tools, and a healthy wariness of applying non-spatial ones blindly.
        </p>
      </KSection>

      <KSection id="vectorraster" eyebrow="02" title="Vector and raster">
        <p>
          Geographic data comes in two fundamental forms, and knowing which you have shapes
          everything:
        </p>
        <ul>
          <li>
            <Term>Vector</Term> — discrete shapes: <em>points</em> (an incident, an address),{" "}
            <em>lines</em> (roads, rivers), and <em>polygons</em> (suburbs, council areas,
            states). Each has attributes attached, like rows in a table. Best for distinct
            features and boundaries.
          </li>
          <li>
            <Term>Raster</Term> — a continuous grid of cells, each holding a value: a satellite
            image, an elevation surface, a heat map. Best for things that vary continuously
            across space (temperature, rainfall, density).
          </li>
        </ul>
        <p>
          Most analytical work — joining records to areas, mapping rates by region — is vector.
          Rasters come in for imagery, terrain, and continuous surfaces. Many real projects use
          both together.
        </p>
      </KSection>

      <KSection id="crs" eyebrow="03" title="Coordinates and projections">
        <p>
          The Earth is a sphere; a map is flat. Squashing one onto the other is a{" "}
          <Term>projection</Term>, and there's no way to do it without distorting something —
          area, shape, distance, or direction. Every spatial dataset carries a{" "}
          <Term>coordinate reference system</Term> (CRS) that says how its coordinates map to
          real positions, and the most common source of silent spatial bugs is mixing datasets
          in different ones.
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Check the CRS first, every time.</strong> Two layers in different coordinate
            systems won't line up — points land in the ocean, or your areas don't overlap at
            all — and the tool often won't warn you. And picking a projection that preserves the
            wrong property quietly distorts your analysis: if you're measuring areas or
            distances, you need an <em>equal-area</em> or distance-preserving projection, not
            whatever the data shipped with. For a place like South Australia, that means using
            the appropriate local projected CRS, not raw lat/long.
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="04" title="The spatial join">
        <p>
          The workhorse operation of spatial analysis is the <Term>spatial join</Term> —
          combining datasets by <em>location</em> rather than by a shared key. Instead of "match
          where the IDs are equal" (the{" "}
          <Link href="/knowledge/database-systems">database join</Link>), it's "match where the
          geometries relate": which suburb does this point fall inside? which incidents are
          within 500 metres of this site? how many addresses sit in each council area?
        </p>
        <p>
          This is how you connect a list of events to the regions you want to analyse them by —
          and it's the bridge from raw points to the area-level rates you can map and compare.
          It's the spatial equivalent of the join that ties the whole relational world
          together, and just as central.
        </p>
      </KSection>

      <KSection id="choropleth" eyebrow="05" title="Choropleth maps done right">
        <p>
          The <Term>choropleth</Term> — regions shaded by a value — is the most common thematic
          map, and the most commonly done wrong. Two rules make the difference between an honest
          map and a misleading one.
        </p>
        <p>
          First, <strong>normalise: shade rates, not raw counts</strong>. A map of "number of
          cases per suburb" mostly shows where the <em>people</em> are — big or populous areas
          light up simply because they're big. Convert to a rate (cases per 1,000 people,
          incidents per square kilometre) so you're comparing like with like. Choropleths are
          for normalised numeric data, not raw totals and not categories.
        </p>
        <p>
          Second, <strong>choose the classification deliberately</strong>. How you bucket the
          values into colour bands — <Term>equal interval</Term>, <Term>quantiles</Term>, or{" "}
          <Term>natural breaks</Term> (Jenks) — changes which regions look high or low, and can
          completely alter the story. There's no single right choice, but there is a
          responsibility to pick one that reflects the real distribution rather than the one
          that flatters your point.
        </p>
      </KSection>

      <KSection id="maup" eyebrow="06" title="The MAUP trap">
        <p>
          The deepest trap in spatial analysis has an unglamorous name: the{" "}
          <Term>Modifiable Areal Unit Problem</Term> (MAUP). It says that when you aggregate
          point data into areas, <strong>the boundaries you choose can change — even reverse —
          your results</strong>. The same underlying data can tell different stories depending
          on how you carve up the map. It has two faces:
        </p>
        <ul>
          <li>
            <Term>Scale effect</Term> — the size of the units. Aggregate to states, to council
            areas, or to small census blocks and the same data shows different patterns, even
            though nothing real changed.
          </li>
          <li>
            <Term>Zone effect</Term> — the shape of the units. Redraw the boundaries at the same
            scale (different districts, different groupings) and the result shifts — the
            mechanism behind gerrymandering.
          </li>
        </ul>
        <p>
          The lesson isn't that spatial analysis is hopeless — it's that the choice of
          geographic unit is a real analytical decision with real consequences, not a neutral
          given. Be explicit about why you chose the units you did, and check whether your
          conclusion survives a different choice.
        </p>
      </KSection>

      <KSection id="autocorrelation" eyebrow="07" title="Spatial autocorrelation">
        <p>
          Because near things resemble each other, spatial data exhibits{" "}
          <Term>spatial autocorrelation</Term> — neighbouring areas tend to have similar values.
          Measures like <Term>Moran's I</Term> quantify it: is the pattern clustered (high
          values next to high), dispersed, or random? Detecting and locating clusters —{" "}
          <Term>hotspots</Term> of high values and cold-spots of low — is often the entire point
          of the analysis.
        </p>
        <p>
          It also matters for honesty: spatial autocorrelation violates the independence
          assumption behind ordinary{" "}
          <Link href="/knowledge/linear-statistical-models">regression</Link>, so a naïve model
          on spatial data understates its uncertainty and can manufacture significance that
          isn't there. The fix is spatial models that build the neighbour-relationships in — the
          spatial cousins of the methods on the modelling pages.
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="08" title="Common pitfalls">
        <p>A quick field guide to the mistakes that bite hardest:</p>
        <ul>
          <li><strong>Mismatched CRS</strong> — layers that don't line up; always check first.</li>
          <li><strong>Mapping raw counts</strong> — you've drawn a population map; normalise to rates.</li>
          <li><strong>Cherry-picked classification</strong> — bands chosen to flatter the story.</li>
          <li><strong>Ignoring MAUP</strong> — treating one set of boundaries as the truth.</li>
          <li><strong>Non-spatial stats on spatial data</strong> — ignoring autocorrelation and overstating significance.</li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Where the data meets the map">
          <p>
            Government and social data is spatial to its core, and this is hands-on work for me.
            I've built spatial tools and analyses — including a generator of validated South
            Australian addresses indexed by socio-economic (SEIFA) and remoteness measures — and
            the discipline on this page is exactly what keeps that work honest:{" "}
            <strong>normalise to rates</strong> so I'm not just mapping where people live, mind
            the <strong>MAUP</strong> when I aggregate to suburbs or council areas, and check the{" "}
            <strong>CRS</strong> before trusting any overlay.
          </p>
          <p>
            Spatial analysis pairs naturally with the rest of my toolkit — the{" "}
            <Link href="/knowledge/statistics">statistics</Link> for the inference, the{" "}
            <Link href="/knowledge/business-intelligence-dashboards">dashboards</Link> to put a
            map in front of a decision-maker — and in intelligence and public-safety work,
            "where" is very often the most actionable dimension there is.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Most data has a "where", and near things are more related than distant ones — so
              spatial data clusters and breaks the independence ordinary stats assume.
            </li>
            <li>
              Two data types: <strong>vector</strong> (points/lines/polygons) and{" "}
              <strong>raster</strong> (a value grid). Always check the{" "}
              <strong>CRS / projection</strong> — mismatches are the #1 silent bug.
            </li>
            <li>
              The <strong>spatial join</strong> matches by location, not key (which suburb is
              this point in?) — the bridge from points to area rates.
            </li>
            <li>
              <strong>Choropleths</strong>: shade <strong>rates not raw counts</strong>, and
              choose the classification (equal interval / quantile / natural breaks)
              deliberately.
            </li>
            <li>
              <strong>MAUP</strong>: the boundaries you pick (scale + zone) can change or reverse
              the result — the unit choice is a real decision.
            </li>
            <li>
              <strong>Spatial autocorrelation</strong> (Moran's I) finds hotspots — and means you
              need spatial models, not naïve regression, for honest inference.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The choropleth, classification, and MAUP guidance on this page reflects current
          cartography and spatial-analysis references alongside hands-on government work.
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
        几乎每个数据集都附带一个位置——一个地址、一个邮编、一组坐标——而一旦你把它放到地图上，
        就会浮现出任何表格都无法揭示的模式：聚集、空缺、热点、走廊。<Term>地理空间分析</Term>
        就是处理那个「在哪里」的学科，而 <Term>GIS</Term>（地理信息系统）是为它服务的软件。它
        确实是自成一门的领域，因为空间数据打破了<Link href="/knowledge/statistics">统计</Link>
        其余部分悄悄依赖的一些假设。
      </p>
      <p>
        它也是我政府工作的核心部分——南澳的社会与运营数据深具空间性。这一页是实用的基础：数据
        类型、少数几个要紧的概念，以及——重要的是——空间分析在你不小心时具体会怎样误导你。
      </p>

      <KSection id="why" eyebrow="01" title="为什么位置不一样">
        <p>
          空间数据并不只是多了两列的数据。它带着一条深刻的原理，常被称为地理学第一定律：
          <strong>万物彼此相关，但近处之物比远处之物更相关</strong>。犯罪、疾病、收入、房价——
          它们在空间上聚集，而那种聚集通常正是你在意的信号。
        </p>
        <p>
          同样这种聚集，也是为什么普通统计在空间数据上会误导：标准方法假设观测彼此<em>独立</em>，
          但相邻的地方并不独立——它们互相影响、彼此相像。所以空间分析需要它自己的工具，以及对
          盲目套用非空间工具的一份健康的警惕。
        </p>
      </KSection>

      <KSection id="vectorraster" eyebrow="02" title="矢量与栅格">
        <p>地理数据有两种基本形式，而知道你手上是哪一种，会塑造一切：</p>
        <ul>
          <li>
            <Term>矢量</Term>——离散的形状：<em>点</em>（一起事件、一个地址）、<em>线</em>（道路、
            河流）、以及<em>多边形</em>（街区、议会辖区、州）。每个都附带属性，像表中的行。最
            适合分明的要素与边界。
          </li>
          <li>
            <Term>栅格</Term>——一张连续的单元格网格，每格持有一个值：一幅卫星图像、一个高程面、
            一张热力图。最适合在空间上连续变化的事物（温度、降雨、密度）。
          </li>
        </ul>
        <p>
          大多数分析工作——把记录连到区域、按地区映射比率——都是矢量。栅格则用于影像、地形与
          连续面。许多真实项目会把两者一起用。
        </p>
      </KSection>

      <KSection id="crs" eyebrow="03" title="坐标与投影">
        <p>
          地球是个球体；地图是平的。把前者压到后者上就是一次<Term>投影</Term>，而要做这件事就
          无法不扭曲某样东西——面积、形状、距离或方向。每个空间数据集都带着一个
          <Term>坐标参考系统</Term>（CRS），说明它的坐标如何映射到真实位置，而无声的空间 bug
          最常见的来源，就是把处于不同 CRS 的数据集混在一起。
        </p>
        <Callout type="pitfall">
          <p>
            <strong>每一次都先检查 CRS。</strong>处于不同坐标系统的两个图层不会对齐——点落进了
            海里，或你的区域根本不重叠——而工具往往不会警告你。而选了一个保留了错误属性的投影，
            会悄悄扭曲你的分析：如果你在测量面积或距离，你需要一个<em>等面积</em>或保距的投影，
            而不是数据自带的那个。对南澳这样的地方，那意味着使用合适的本地投影 CRS，而非原始的
            经纬度。
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="04" title="空间连接">
        <p>
          空间分析的主力操作是<Term>空间连接</Term>——按<em>位置</em>而非按一个共享的键来合并
          数据集。它不是「在 ID 相等处匹配」（<Link href="/knowledge/database-systems">数据库
          连接</Link>），而是「在几何关系成立处匹配」：这个点落在哪个街区里？哪些事件在距这个
          地点 500 米以内？每个议会辖区里坐落着多少个地址？
        </p>
        <p>
          这正是你把一列事件连到你想用来分析它们的区域的方式——也是从原始点通往你能映射、能
          比较的区域级比率的桥梁。它是那个把整个关系世界绑在一起的连接在空间上的对应物，且同样
          核心。
        </p>
      </KSection>

      <KSection id="choropleth" eyebrow="05" title="把等值区域图做对">
        <p>
          <Term>等值区域图</Term>——按一个值给区域着色——是最常见的专题地图，也是最常被做错的。
          两条规则，区分了一张诚实的地图与一张误导的地图。
        </p>
        <p>
          第一，<strong>归一化：给比率着色，而非原始计数</strong>。一张「每个街区的案件数」地图，
          大多显示的是<em>人</em>在哪里——大的或人口稠密的区域之所以亮起来，仅仅因为它们大。换成
          一个比率（每千人的案件数、每平方公里的事件数），这样你才是在同类相比。等值区域图是给
          归一化的数值数据用的，而非原始总数，也非类别。
        </p>
        <p>
          第二，<strong>刻意地选择分级</strong>。你如何把数值分桶到颜色带——<Term>等间距</Term>、
          <Term>分位数</Term>，或<Term>自然断点</Term>（Jenks）——会改变哪些区域看起来高或低，并
          可能彻底改写故事。没有唯一正确的选择，但有一份责任：选一个反映真实分布的，而非一个
          迎合你论点的。
        </p>
      </KSection>

      <KSection id="maup" eyebrow="06" title="MAUP 陷阱">
        <p>
          空间分析中最深的陷阱有一个不光鲜的名字：<Term>可变面积单元问题</Term>（MAUP）。它说，
          当你把点数据聚合进区域时，<strong>你所选的边界能改变——甚至反转——你的结果</strong>。
          同样的底层数据，会因你如何切割地图而讲出不同的故事。它有两副面孔：
        </p>
        <ul>
          <li>
            <Term>尺度效应</Term>——单元的大小。聚合到州、到议会辖区、或到小的普查街区，同样的
            数据会显示不同的模式，哪怕没有任何真实的东西改变。
          </li>
          <li>
            <Term>分区效应</Term>——单元的形状。在同一尺度上重画边界（不同的区、不同的分组），
            结果就会变——正是「不公正划区」（gerrymandering）背后的机制。
          </li>
        </ul>
        <p>
          教训不是空间分析没救——而是地理单元的选择是一个有真实后果的、真实的分析决策，而非一个
          中立的既定前提。明确说出你为什么选了你所选的单元，并检查你的结论是否能在另一种选择下
          存活。
        </p>
      </KSection>

      <KSection id="autocorrelation" eyebrow="07" title="空间自相关">
        <p>
          因为近处之物彼此相像，空间数据呈现出<Term>空间自相关</Term>——相邻的区域往往有相似的
          值。像 <Term>Moran's I</Term> 这样的度量把它量化：这个模式是聚集的（高值挨着高值）、
          离散的，还是随机的？探测并定位簇——高值的<Term>热点</Term>与低值的冷点——往往就是整个
          分析的全部要点。
        </p>
        <p>
          它对诚实也要紧：空间自相关违反了普通
          <Link href="/knowledge/linear-statistical-models">回归</Link>背后的独立性假设，所以一个
          在空间数据上的天真模型会低估它的不确定性，并能制造出本不存在的显著性。修法是把邻居
          关系内建进去的空间模型——建模页上那些方法的空间表亲。
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="08" title="常见陷阱">
        <p>一份对咬得最狠的错误的速查指南：</p>
        <ul>
          <li><strong>CRS 不匹配</strong>——对不齐的图层；永远先检查。</li>
          <li><strong>映射原始计数</strong>——你画出来的是一张人口图；归一化为比率。</li>
          <li><strong>挑拣过的分级</strong>——为迎合故事而选的颜色带。</li>
          <li><strong>无视 MAUP</strong>——把某一套边界当作真理。</li>
          <li><strong>在空间数据上用非空间统计</strong>——无视自相关、夸大显著性。</li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="数据与地图相遇之处">
          <p>
            政府与社会数据从内核起就是空间的，而这对我是亲力亲为的工作。我构建过空间工具与
            分析——包括一个按社会经济（SEIFA）与偏远度指标编制索引的、经过校验的南澳地址
            生成器——而这一页上的纪律，正是让那份工作保持诚实的东西：<strong>归一化为比率</strong>，
            这样我才不只是在映射人住在哪里；在聚合到街区或议会辖区时留心 <strong>MAUP</strong>；
            并在信任任何叠加之前检查 <strong>CRS</strong>。
          </p>
          <p>
            空间分析与我工具箱的其余部分自然成对——用<Link href="/knowledge/statistics">统计</Link>
            做推断，用<Link href="/knowledge/business-intelligence-dashboards">仪表板</Link>把一张
            地图摆到决策者面前——而在情报与公共安全工作中，「在哪里」往往是最可付诸行动的那个
            维度。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              大多数数据都有一个「在哪里」，而近处之物比远处之物更相关——所以空间数据会聚集，并
              打破普通统计所假设的独立性。
            </li>
            <li>
              两种数据类型：<strong>矢量</strong>（点/线/多边形）与<strong>栅格</strong>（一张值
              网格）。永远检查 <strong>CRS / 投影</strong>——不匹配是头号无声 bug。
            </li>
            <li>
              <strong>空间连接</strong>按位置而非键来匹配（这个点在哪个街区？）——从点通往区域
              比率的桥梁。
            </li>
            <li>
              <strong>等值区域图</strong>：给<strong>比率而非原始计数</strong>着色，并刻意选择
              分级（等间距 / 分位数 / 自然断点）。
            </li>
            <li>
              <strong>MAUP</strong>：你所选的边界（尺度 + 分区）能改变或反转结果——单元的选择是
              一个真实的决策。
            </li>
            <li>
              <strong>空间自相关</strong>（Moran's I）找出热点——也意味着为了诚实的推断，你需要
              空间模型，而非天真的回归。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          本页上关于等值区域图、分级与 MAUP 的指引，反映了当前的制图学与空间分析参考文献，以及
          亲身的政府工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Geospatial Analysis & GIS",
    subtitle:
      "Most data has a 'where', and where things happen is often the whole story. Spatial analysis is its own discipline — with its own data types, its own statistics, and its own ways to fool you.",
    description:
      "A thorough, practical explainer of geospatial analysis and GIS — vector vs raster data, coordinate reference systems and projections, spatial joins, choropleth maps and classification, normalising to rates, the Modifiable Areal Unit Problem (MAUP), and spatial autocorrelation. In-Practice tier, anchored to Rin Huang's government spatial-intelligence work.",
    course: "Geospatial Analysis & GIS",
    courseCode: "In practice · ArcGIS · GeoPandas",
    level: "Professional",
    learned: "Gov analytics · ongoing",
    applied: "SA spatial intelligence",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Why location is different" },
      { id: "vectorraster", label: "Vector and raster" },
      { id: "crs", label: "Coordinates and projections" },
      { id: "joins", label: "The spatial join" },
      { id: "choropleth", label: "Choropleth maps done right" },
      { id: "maup", label: "The MAUP trap" },
      { id: "autocorrelation", label: "Spatial autocorrelation" },
      { id: "pitfalls", label: "Common pitfalls" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "地理空间分析与 GIS",
    subtitle:
      "大多数数据都有一个「在哪里」，而事情发生在何处，往往就是故事的全部。空间分析是它自己的一门学科——有自己的数据类型、自己的统计，以及自己骗你的方式。",
    description:
      "对地理空间分析与 GIS 的详尽、实用讲解——矢量 vs 栅格数据、坐标参考系统与投影、空间连接、等值区域图与分级、归一化为比率、可变面积单元问题（MAUP），以及空间自相关。实务层，锚定 Rin Huang 的政府空间情报工作。",
    course: "地理空间分析与 GIS",
    courseCode: "实务 · ArcGIS · GeoPandas",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "南澳空间情报",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "为什么位置不一样" },
      { id: "vectorraster", label: "矢量与栅格" },
      { id: "crs", label: "坐标与投影" },
      { id: "joins", label: "空间连接" },
      { id: "choropleth", label: "把等值区域图做对" },
      { id: "maup", label: "MAUP 陷阱" },
      { id: "autocorrelation", label: "空间自相关" },
      { id: "pitfalls", label: "常见陷阱" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistics", label: "统计学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "geospatial-analysis", updated: "2026-06-25", ...meta, Body };
}
