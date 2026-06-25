import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/elements-of-data-processing.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths on this page.
 */

// labels: [raw, acquire, clean, transform, integrate, ready].
// accent = clean/transform (index 2,3); endpoint = raw/ready (index 0,5).
function PipelineFigure({ caption, ariaLabel, labels, hint }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 110"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {labels.map((label, i) => {
          const x = 4 + i * 73;
          const accent = i === 2 || i === 3;
          const endpoint = i === 0 || i === 5;
          return (
            <g key={i}>
              <rect
                x={x}
                y={42}
                width={60}
                height={30}
                rx={2}
                fill={accent ? "#FF3C3C" : endpoint ? "#FF3C3C" : "none"}
                fillOpacity={accent ? 0.12 : endpoint ? 0.18 : 0}
                stroke={accent || endpoint ? "#FF3C3C" : "currentColor"}
                strokeWidth={accent ? 1.4 : 1}
                opacity={accent || endpoint ? 1 : 0.6}
              />
              <text
                x={x + 30}
                y={61}
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fill="currentColor"
              >
                {label}
              </text>
              {i < 5 && (
                <line
                  x1={x + 60}
                  y1={57}
                  x2={x + 77}
                  y2={57}
                  stroke="#FF3C3C"
                  strokeWidth={1.3}
                  markerEnd="url(#dp-ah)"
                />
              )}
            </g>
          );
        })}
        <text
          x="155"
          y="92"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.55"
        >
          {hint}
        </text>
        <defs>
          <marker id="dp-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
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
        There's a number every data scientist learns the hard way: roughly{" "}
        <strong>80% of the work is preparing the data</strong>, and only the last 20% is the
        modelling everyone talks about. Raw data is almost never ready to use — it's messy,
        inconsistent, scattered across sources, and full of gaps. Turning it into something clean
        and analysable is <Term>data processing</Term>, and it's the foundation the whole rest of
        the field stands on.
      </p>
      <p>
        It's unglamorous, but it's where the leverage is: the best model in the world can't rescue
        bad inputs (<em>garbage in, garbage out</em>), while careful prep makes even a simple method
        work. This page is the practical craft — the steps, the principles, and the traps — that
        turns raw data into a clean table you can actually trust.
      </p>

      <KSection id="why" eyebrow="01" title="The unglamorous 80%">
        <p>
          Why does data prep dominate? Because raw data is collected for some <em>other</em> purpose
          than your analysis — a transaction log records sales, not your research question — so it
          never arrives in the shape you need. It has typos, missing fields, inconsistent formats
          ("NSW" / "N.S.W." / "New South Wales"), duplicate records, and values that are simply
          wrong.
        </p>
        <p>
          The discipline matters because every error here propagates. A mis-parsed date, a silently
          dropped row, a units mix-up — none of it announces itself, and all of it quietly corrupts
          everything downstream. So the goal isn't just "clean the data"; it's to clean it{" "}
          <em>deliberately and reproducibly</em>, knowing exactly what you changed and why. The
          analysts who are trusted are the ones whose data prep you can audit.
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="The data pipeline">
        <p>
          Data processing is best seen as a <Term>pipeline</Term> — a sequence of stages that takes
          raw inputs and produces analysis-ready data. The stages are always roughly the same,
          whatever the project:
        </p>
        <ul>
          <li>
            <Term>Acquire</Term> — pull the data from its sources (files, databases, APIs).
          </li>
          <li>
            <Term>Clean</Term> — fix errors, handle missing values, remove duplicates.
          </li>
          <li>
            <Term>Transform</Term> — reshape, derive new fields, standardise formats.
          </li>
          <li>
            <Term>Integrate</Term> — combine multiple sources into one coherent dataset.
          </li>
          <li>
            <Term>Store</Term> — save the result in a form ready for analysis.
          </li>
        </ul>

        <PipelineFigure
          caption="The data pipeline. Raw sources flow through acquire → clean → transform → integrate, producing the analysis-ready dataset that modelling and visualisation depend on. Most of the real effort lives in the middle two stages."
          ariaLabel="A left-to-right pipeline: raw data into acquire, clean, transform, integrate, then out to analysis-ready data."
          labels={["raw", "acquire", "clean", "transform", "integrate", "ready"]}
          hint="— where the 80% lives —"
        />
      </KSection>

      <KSection id="types" eyebrow="03" title="Types and structures of data">
        <p>How hard the processing is depends on how structured the data already is:</p>
        <ul>
          <li>
            <Term>Structured</Term> — neat rows and columns with a fixed schema, like a{" "}
            <Link href="/knowledge/database-systems">database</Link> table or a CSV. Easiest to work
            with.
          </li>
          <li>
            <Term>Semi-structured</Term> — has some organisation but no rigid table shape: JSON,
            XML, log files. Common from{" "}
            <Link href="/knowledge/web-information-technology">web APIs</Link>, and needs flattening
            into tables.
          </li>
          <li>
            <Term>Unstructured</Term> — free text, images, audio. No inherent table form; extracting
            features from it is a project in itself (the{" "}
            <Link href="/knowledge/natural-language-processing">NLP page</Link> is exactly this for
            text).
          </li>
        </ul>
        <p>
          It also pays to know each column's <Term>measurement type</Term> — numerical (continuous
          or count), categorical (ordered or not), date/time — because that decides what cleaning
          and which analysis are valid. Treating a postcode as a number, or an ordered rating as
          unordered, is a classic and costly slip.
        </p>
      </KSection>

      <KSection id="tidy" eyebrow="04" title="Tidy data">
        <p>
          The single most useful organising principle is <Term>tidy data</Term>, and it's
          deceptively simple:{" "}
          <strong>
            each variable is a column, each observation is a row, and each cell holds one value
          </strong>
          . Data that follows this shape is trivial to filter, group, join, and plot; data that
          doesn't fights you at every step.
        </p>
        <p>
          Most messy real data violates it — values stuffed into column headers (a column per year),
          multiple variables crammed in one cell ("Male 25–34"), or one observation spread across
          several rows. A huge share of "data wrangling" is simply reshaping messy data into the
          tidy form, after which the analysis becomes almost easy. Learn to recognise the tidy shape
          and you have a target to wrangle toward every time.
        </p>
        <Callout type="intuition">
          <p>
            The tidy rule pays off because every downstream tool — group-by, joins, plotting
            libraries, <Link href="/knowledge/statistical-machine-learning">model</Link> inputs — is{" "}
            <em>designed</em> around it: one row per example, one column per feature. Tidy your data
            once and everything after it cooperates; skip it and you fight the same mess in every
            step.
          </p>
        </Callout>
      </KSection>

      <KSection id="cleaning" eyebrow="05" title="Cleaning">
        <p>
          Cleaning is the heart of the work — finding and fixing what's wrong. The recurring jobs:
        </p>
        <ul>
          <li>
            <Term>Missing values</Term> — decide per case: drop the row, drop the column, or{" "}
            <Term>impute</Term> (fill with the mean/median, or a model). The dangerous move is
            ignoring them — and always ask <em>why</em> it's missing, because "not recorded" and
            "not applicable" mean different things.
          </li>
          <li>
            <Term>Duplicates</Term> — the same record entered twice silently double-counts;
            de-duplicate, but carefully (two real people can share a name).
          </li>
          <li>
            <Term>Outliers</Term> — flag extreme values and investigate. Some are errors (a typo'd
            age of 200); some are the most important real signal. Never delete blindly.
          </li>
          <li>
            <Term>Inconsistent formats &amp; types</Term> — standardise dates, units, categories,
            and capitalisation; parse numbers stored as text. This is the tedious bulk of cleaning,
            and where reproducibility matters most.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>Never edit data by hand.</strong> Every cleaning step should be <em>code</em> —
            a script that turns raw into clean — not manual edits in a spreadsheet. Code is
            auditable, repeatable when the data refreshes, and self-documenting. Hand-edited data is
            a one-off you can never reproduce or trust, and it's the fastest way to lose a result
            you can't defend.
          </p>
        </Callout>
      </KSection>

      <KSection id="reshape" eyebrow="06" title="Reshaping and joining">
        <p>
          With clean columns, two transformations do most of the heavy lifting.{" "}
          <Term>Reshaping</Term> moves data between <em>wide</em> (a column per category) and{" "}
          <em>long</em> (a row per category) — pivoting and melting — to reach the tidy form a given
          task needs. <Term>Joining</Term> stitches datasets together on a shared key, the exact
          same operation as the SQL joins on the{" "}
          <Link href="/knowledge/database-systems">database page</Link>: an inner join keeps only
          matches, a left join keeps everything on one side. Integrating sources well — and not
          accidentally multiplying or dropping rows in the process — is a core data-processing
          skill.
        </p>
      </KSection>

      <KSection id="acquire" eyebrow="07" title="Getting the data in">
        <p>
          Before any of that, you have to get the data — and where it comes from shapes how you
          process it:
        </p>
        <ul>
          <li>
            <Term>Files</Term> — CSV, Excel, JSON. Simple, but watch encodings and inconsistent
            schemas.
          </li>
          <li>
            <Term>Databases</Term> — query exactly the slice you need with{" "}
            <Link href="/knowledge/database-systems">SQL</Link>, rather than pulling everything.
          </li>
          <li>
            <Term>APIs</Term> — request structured data over the{" "}
            <Link href="/knowledge/web-information-technology">web</Link>, usually JSON, often
            paginated.
          </li>
          <li>
            <Term>Web scraping</Term> — extract data from pages built for humans when there's no
            API. Powerful but brittle, and you must respect terms and rate limits.
          </li>
        </ul>
        <p>
          Whatever the source, the first move is the same: understand the data before transforming
          it — its shape, its types, its quirks. Exploratory checks up front save you from cleaning
          the wrong thing.
        </p>
      </KSection>

      <KSection id="features" eyebrow="08" title="Features and reproducibility">
        <p>
          Processing shades into <Term>feature engineering</Term> — creating the input columns a
          model actually learns from: deriving "age" from a birth date, encoding categories as
          numbers, scaling values to a common range, bucketing a continuous variable. Thoughtful
          features routinely beat a fancier algorithm on raw inputs, which is why this step is where
          a lot of real modelling skill lives — it's the on-ramp to the{" "}
          <Link href="/knowledge/statistical-machine-learning">machine learning</Link> page.
        </p>
        <p>
          Underpinning all of it is <Term>reproducibility</Term>: the entire path from raw to ready
          should be a script anyone can re-run to get the identical result. That's what makes data
          work trustworthy and auditable — and it's the difference between an analysis people can
          rely on and a number nobody can explain. <Term>Data quality</Term> — completeness,
          accuracy, consistency, timeliness — is the standard you're processing toward.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Where every project actually begins">
          <p>
            Every project I've done started here, and the discipline is the part that separates
            trustworthy analysis from the rest. I treat data prep as{" "}
            <strong>code, never hand-edits</strong> — a reproducible script from raw to clean —
            because in government and health work the data <em>will</em> refresh and the result{" "}
            <em>will</em> be questioned, and "here's exactly what I did and why" is the only
            defensible answer. The <strong>tidy-data</strong> habit and careful{" "}
            <strong>missing-value and join</strong> handling are what keep the downstream numbers
            honest.
          </p>
          <p>
            It's also the least glamorous and most valuable skill on these pages: the{" "}
            <Link href="/knowledge/statistical-machine-learning">models</Link> only matter if
            they're fed clean, well-understood data — and getting it there is <em>the</em> job, far
            more often than the modelling that gets the credit.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ~<strong>80% of data work is preparation</strong>. Garbage in, garbage out — clean
              inputs beat a fancy model on messy ones.
            </li>
            <li>
              The <strong>pipeline</strong>: acquire → clean → transform → integrate → store. Most
              effort is in clean + transform.
            </li>
            <li>
              Know your data: <strong>structured / semi / unstructured</strong>, and each column's
              measurement type. Aim for <strong>tidy data</strong> (one variable per column, one
              observation per row).
            </li>
            <li>
              <strong>Clean</strong>: handle missing values (drop/impute, ask why), duplicates,
              outliers (investigate, don't delete), and inconsistent formats/types.
            </li>
            <li>
              <strong>Reshape</strong> (wide↔long) and <strong>join</strong> (inner/left) to
              integrate; <strong>acquire</strong> from files/DBs/APIs/scraping — understand before
              transforming.
            </li>
            <li>
              <strong>Feature engineering</strong> bridges to ML; do it all as{" "}
              <strong>reproducible code, never hand-edits</strong>. That's what makes it
              trustworthy.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        有一个数字，每位数据科学家都是吃过苦头才学会的：大约 <strong>80% 的工作是准备数据</strong>
        ，只有最后 20% 才是人人挂在嘴边的建模。原始数据几乎从不是拿来就能用的——它
        杂乱、不一致、散落在各个来源、且满是缺口。把它变成干净、可分析之物，就是
        <Term>数据处理</Term>，也是这个领域其余一切赖以站立的地基。
      </p>
      <p>
        它不光鲜，但杠杆就在这里：世上最好的模型也救不了糟糕的输入（<em>垃圾进，垃圾出</em>），
        而细致的准备能让哪怕最简单的方法也奏效。本页讲的就是那门实用的手艺——步骤、原则与
        陷阱——把原始数据变成一张你真正能信赖的干净表格。
      </p>

      <KSection id="why" eyebrow="01" title="不光鲜的那 80%">
        <p>
          为什么数据准备占了大头？因为原始数据是为你分析<em>之外</em>的某个目的而采集的——一份
          交易日志记录的是销售，而非你的研究问题——所以它从不会以你需要的形状到来。它有拼写
          错误、缺失字段、不一致的格式（「NSW」/「N.S.W.」/「New South Wales」）、重复记录，以及
          干脆就是错的值。
        </p>
        <p>
          这门纪律之所以要紧，是因为这里的每个错误都会向下传播。一个解析错的日期、一行被悄悄
          丢掉的记录、一处单位混淆——它们都不会自报家门，却都在悄悄腐蚀下游的一切。所以目标
          不只是「把数据清干净」；而是要<em>有意识地、可复现地</em>清，确切知道你改了什么、为
          什么改。被信任的分析师，是那些数据准备经得起审计的人。
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="数据管线">
        <p>
          数据处理最好被看作一条<Term>管线</Term>——一连串阶段，把原始输入变成可供分析的数据。
          无论什么项目，这些阶段大致总是相同的：
        </p>
        <ul>
          <li>
            <Term>获取</Term>——从来源（文件、数据库、API）拉取数据。
          </li>
          <li>
            <Term>清洗</Term>——修正错误、处理缺失值、移除重复。
          </li>
          <li>
            <Term>转换</Term>——重塑、派生新字段、统一格式。
          </li>
          <li>
            <Term>整合</Term>——把多个来源合并成一个连贯的数据集。
          </li>
          <li>
            <Term>存储</Term>——把结果以可供分析的形式保存。
          </li>
        </ul>

        <PipelineFigure
          caption="数据管线。原始来源流经获取 → 清洗 → 转换 → 整合，产出建模与可视化所依赖的可分析数据集。真正的功夫大多在中间两个阶段。"
          ariaLabel="一条从左到右的管线：原始数据进入获取、清洗、转换、整合，再输出为可供分析的数据。"
          labels={["原始", "获取", "清洗", "转换", "整合", "就绪"]}
          hint="—— 80% 的工作在这里 ——"
        />
      </KSection>

      <KSection id="types" eyebrow="03" title="数据的类型与结构">
        <p>处理有多难，取决于数据本身已经有多结构化：</p>
        <ul>
          <li>
            <Term>结构化</Term>——带固定模式的整齐行列，如一张{" "}
            <Link href="/knowledge/database-systems">数据库</Link>表或一个 CSV。最容易处理。
          </li>
          <li>
            <Term>半结构化</Term>——有一些组织，但没有刚性的表格形状：JSON、XML、日志文件。 常见于{" "}
            <Link href="/knowledge/web-information-technology">Web API</Link>，需要展平 成表格。
          </li>
          <li>
            <Term>非结构化</Term>——自由文本、图像、音频。没有天然的表格形式；从中提取特征本身
            就是一个项目（<Link href="/knowledge/natural-language-processing">NLP 页</Link>对
            文本而言正是此事）。
          </li>
        </ul>
        <p>
          搞清每一列的<Term>测量类型</Term>也很值得——数值（连续或计数）、类别（有序或无序）、
          日期/时间——因为它决定了哪种清洗、哪种分析才有效。把邮编当作数字，或把一个有序的评分
          当作无序，是一个经典且代价高昂的失误。
        </p>
      </KSection>

      <KSection id="tidy" eyebrow="04" title="整洁数据">
        <p>
          最有用的单一组织原则是<Term>整洁数据</Term>，它简单得有点出人意料：
          <strong>每个变量 是一列，每个观测是一行，每个单元格放一个值</strong>
          。遵循这种形状的数据，过滤、分组、 连接、作图都轻而易举；不遵循的，则在每一步都跟你作对。
        </p>
        <p>
          大多数杂乱的真实数据都违反它——值被塞进列名（一年一列）、多个变量挤在一个单元格里 （「男
          25–34」）、或一个观测被摊在好几行上。「数据整理」中很大一部分，不过是把杂乱
          数据重塑成整洁的形状，之后分析就几乎变得容易了。学会认出整洁的形状，你每次就有了一个
          可供整理的目标。
        </p>
        <Callout type="intuition">
          <p>
            整洁规则之所以划算，是因为每一件下游工具——分组、连接、绘图库、
            <Link href="/knowledge/statistical-machine-learning">模型</Link>输入——都是
            <em>围绕它设计</em>的：一行一个样本，一列一个特征。把数据整理一次，之后的一切都会
            配合；跳过它，你就在每一步都跟同样的杂乱搏斗。
          </p>
        </Callout>
      </KSection>

      <KSection id="cleaning" eyebrow="05" title="清洗">
        <p>清洗是这项工作的核心——找出并修正错的东西。反复出现的活计：</p>
        <ul>
          <li>
            <Term>缺失值</Term>——逐例决定：丢掉这一行、丢掉这一列，或<Term>插补</Term>（用
            均值/中位数，或一个模型来填）。危险的做法是无视它们——并且永远要问<em>为什么</em>
            缺失，因为「未记录」与「不适用」意思不同。
          </li>
          <li>
            <Term>重复</Term>——同一条记录录入两次会悄悄地重复计数；去重，但要小心（两个真实的
            人可能同名）。
          </li>
          <li>
            <Term>离群点</Term>——标出极端值并加以调查。有些是错误（打错成 200 岁的年龄）；有些
            则是最重要的真实信号。切勿盲目删除。
          </li>
          <li>
            <Term>不一致的格式与类型</Term>——统一日期、单位、类别与大小写；解析以文本存储的
            数字。这是清洗中乏味的大头，也是可复现性最要紧之处。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>永远不要手工编辑数据。</strong>每一个清洗步骤都应是<em>代码</em>——一段把
            原始变成干净的脚本——而非在电子表格里手动修改。代码可审计、在数据刷新时可重跑、且能
            自我记录。手工编辑过的数据是一次性的，你永远无法复现或信赖它，而它是丢掉一个你无法
            辩护的结果的最快方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="reshape" eyebrow="06" title="重塑与连接">
        <p>
          有了干净的列，两种转换承担了大部分重活。<Term>重塑</Term>在<em>宽</em>（一类一列）与
          <em>长</em>（一类一行）之间搬动数据——透视与熔化——以达到某个任务所需的整洁形状。
          <Term>连接</Term>按一个共享的键把数据集缝在一起，与
          <Link href="/knowledge/database-systems">数据库 页</Link>上的 SQL
          连接是完全相同的操作：内连接只保留匹配项，左连接保留一侧的全部。把
          来源整合好——并且不在过程中意外地把行翻倍或丢掉——是一项核心的数据处理技能。
        </p>
      </KSection>

      <KSection id="acquire" eyebrow="07" title="把数据取进来">
        <p>在那一切之前，你得先把数据弄到手——而它从哪里来，塑造了你如何处理它：</p>
        <ul>
          <li>
            <Term>文件</Term>——CSV、Excel、JSON。简单，但要留意编码和不一致的模式。
          </li>
          <li>
            <Term>数据库</Term>——用 <Link href="/knowledge/database-systems">SQL</Link> 精确
            查询你需要的那一片，而不是把一切都拉出来。
          </li>
          <li>
            <Term>API</Term>——通过 <Link href="/knowledge/web-information-technology">Web</Link>{" "}
            请求结构化数据，通常是 JSON，常常分页。
          </li>
          <li>
            <Term>网页抓取</Term>——在没有 API 时，从为人而建的页面里提取数据。强大却脆弱，而且
            你必须尊重条款与速率限制。
          </li>
        </ul>
        <p>
          无论来源如何，第一步都一样：在转换之前先<em>理解</em>数据——它的形状、它的类型、它的
          怪癖。事先的探索性检查，能让你免于清洗错了东西。
        </p>
      </KSection>

      <KSection id="features" eyebrow="08" title="特征与可复现性">
        <p>
          处理逐渐过渡到<Term>特征工程</Term>——创造模型真正从中学习的输入列：从出生日期派生
          「年龄」、把类别编码成数字、把值缩放到一个共同的范围、把一个连续变量分桶。深思熟虑的
          特征，常常胜过在原始输入上跑一个更花哨的算法，这正是为什么这一步藏着许多真正的建模
          功夫——它是通往<Link href="/knowledge/statistical-machine-learning">机器学习</Link>页
          的入口匝道。
        </p>
        <p>
          支撑这一切的是<Term>可复现性</Term>：从原始到就绪的整条路径，都应是一段任何人都能
          重跑、得到完全相同结果的脚本。正是这一点让数据工作可信、可审计——也是「人们能依赖的
          分析」与「没人能解释的数字」之间的区别。<Term>数据质量</Term>——完整性、准确性、
          一致性、时效性——是你处理时所朝向的标准。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="每个项目真正开始的地方">
          <p>
            我做过的每个项目都从这里开始，而这门纪律正是把可信的分析与其余区分开来的那部分。我
            把数据准备当作<strong>代码，绝不手工编辑</strong>——一段从原始到干净的可复现脚本——
            因为在政府与健康工作中，数据<em>会</em>刷新、结果<em>会</em>被质疑，而「这就是我做了
            什么、为什么这么做」是唯一站得住脚的答复。<strong>整洁数据</strong>的习惯，以及对
            <strong>缺失值与连接</strong>的细致处理，正是让下游数字保持诚实的东西。
          </p>
          <p>
            它也是这些页面上最不光鲜、却最有价值的技能：
            <Link href="/knowledge/statistical-machine-learning">模型</Link>只有在被喂以干净、
            被充分理解的数据时才有意义——而把数据弄到那个地步，远比那个抢走功劳的建模更常常
            <em>就是</em>那份工作本身。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              约 <strong>80% 的数据工作是准备</strong>。垃圾进，垃圾出——干净的输入胜过在杂乱
              数据上跑的花哨模型。
            </li>
            <li>
              <strong>管线</strong>：获取 → 清洗 → 转换 → 整合 → 存储。大部分功夫在清洗 + 转换。
            </li>
            <li>
              了解你的数据：<strong>结构化 / 半结构化 / 非结构化</strong>，以及每一列的测量 类型。以
              <strong>整洁数据</strong>为目标（一列一个变量，一行一个观测）。
            </li>
            <li>
              <strong>清洗</strong>：处理缺失值（丢弃/插补，问为什么）、重复、离群点（调查，别
              删除）以及不一致的格式/类型。
            </li>
            <li>
              <strong>重塑</strong>（宽↔长）与<strong>连接</strong>（内/左）以整合；从
              文件/数据库/API/抓取<strong>获取</strong>——转换前先理解。
            </li>
            <li>
              <strong>特征工程</strong>是通往机器学习的桥；这一切都要做成
              <strong>可复现的代码， 绝不手工编辑</strong>。这正是让它可信的原因。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Elements of Data Processing",
    subtitle:
      "The work nobody puts in the highlight reel — and the work that decides whether everything downstream succeeds. Before a model, before a chart, the data has to be wrangled into shape.",
    description:
      "A thorough, first-principles explainer of data processing — the data pipeline, structured vs unstructured data, the tidy-data principle, cleaning (missing values, duplicates, outliers, types), reshaping and joins, data acquisition, feature engineering, and reproducibility. Foundation tier, anchored to Rin Huang's UniMelb degree — the practical craft under every project.",
    course: "Elements of Data Processing",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Every project starts here",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "The unglamorous 80%" },
      { id: "pipeline", label: "The data pipeline" },
      { id: "types", label: "Types and structures of data" },
      { id: "tidy", label: "Tidy data" },
      { id: "cleaning", label: "Cleaning" },
      { id: "reshape", label: "Reshaping and joining" },
      { id: "acquire", label: "Getting the data in" },
      { id: "features", label: "Features and reproducibility" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据处理要素",
    subtitle:
      "没人会把它放进高光集锦的工作——却是决定下游一切成败的工作。在模型之前、在图表之前，数据必须被整理成形。",
    description:
      "对数据处理的详尽、第一性原理式讲解——数据管线、结构化 vs 非结构化数据、整洁数据原则、清洗（缺失值、重复、离群点、类型）、重塑与连接、数据获取、特征工程与可复现性。基础层，锚定 Rin Huang 的墨尔本大学学位——每个项目之下的实用手艺。",
    course: "数据处理要素",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "每个项目都从这里开始",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "不光鲜的那 80%" },
      { id: "pipeline", label: "数据管线" },
      { id: "types", label: "数据的类型与结构" },
      { id: "tidy", label: "整洁数据" },
      { id: "cleaning", label: "清洗" },
      { id: "reshape", label: "重塑与连接" },
      { id: "acquire", label: "把数据取进来" },
      { id: "features", label: "特征与可复现性" },
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
  return { slug: "elements-of-data-processing", updated: "2026-06-25", ...meta, Body };
}
