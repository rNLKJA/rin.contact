import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import FdChecker from "@/components/knowledge/widgets/FdChecker";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

/**
 * Concept note /knowledge/notes/functional-dependencies, filed under
 * /knowledge/database-systems. Same six sections as the pilot note. "Where I
 * used it" facts come from the louvre-ops-db and self-driving-db-lab entries
 * in lib/coursework-data.js and the Louvre Ops DB design review.
 */

const SLUG = "functional-dependencies";
const LOUVRE = "https://info20003-louvre-ops-db.vercel.app";
const SELF_DRIVING = "https://comp90050-self-driving-db.vercel.app";

const CALLOUT_LINK =
  "text-accent-ink font-medium underline decoration-[#FF3C3C]/40 underline-offset-4 hover:decoration-current";

const SOURCES = {
  codd: "https://doi.org/10.1145/362384.362685",
  kent: "https://doi.org/10.1145/358024.358054",
  cow: "https://pages.cs.wisc.edu/~dbbook/",
};

const TEX = {
  fd: String.raw`X \to Y \iff \text{for all rows } t_1, t_2:\; t_1[X] = t_2[X] \;\Rightarrow\; t_1[Y] = t_2[Y]`,
  armstrong: String.raw`\frac{Y \subseteq X}{X \to Y} \qquad\qquad \frac{X \to Y}{XZ \to YZ} \qquad\qquad \frac{X \to Y \quad Y \to Z}{X \to Z}`,
  closure: String.raw`X^{+} = \{\, A : X \to A \text{ follows from } F \,\}, \qquad X \text{ is a superkey} \iff X^{+} = R`,
  bcnf: String.raw`R \text{ is in BCNF} \iff \text{every non-trivial } X \to Y \text{ that holds has } X^{+} = R`,
  lossless: String.raw`R \to R_1, R_2 \text{ is lossless} \iff (R_1 \cap R_2) \to R_1 \;\text{ or }\; (R_1 \cap R_2) \to R_2`,
};

const WIDGET_COPY = {
  en: {
    declared: "Rules the designer declared",
    attrs: {
      ticket: "ticket",
      type: "type",
      price: "price",
      wing: "wing",
      level: "level",
      time: "time",
    },
    left: "Left side, X (pick one or more)",
    right: "Right side, Y",
    rowsLabel: "Rows in the sample",
    newSample: "New sample",
    reset: "Reset",
    seed: "Seed {seed}",
    inData: "In this sample",
    inRules: "From the declared rules",
    pickLeft: "Pick at least one column for the left side.",
    trivial: "The right side is already on the left, so this holds trivially.",
    dataBreaks:
      "Broken. Rows {r1} and {r2} agree on {lhs} ({same}) but differ on {rhs}: {v1} against {v2}.",
    dataHolds: "No two of the {rows} rows break it. That is not proof: a bigger sample might.",
    closureLine: "{{lhs}}⁺ = {{closure}}.",
    ruleFollows: "The closure contains {rhs}, so the rules guarantee this dependency.",
    ruleNot: "The closure does not contain {rhs}, so the rules do not promise this.",
    keyStatus: {
      key: "The left side is a key: it determines every column and no smaller set does.",
      superkey:
        "The left side is a superkey: it determines every column, but a smaller set would too.",
      none: "The left side is not a key.",
    },
    via: "Via {steps}.",
    tableCaption: "The first {rows} wing scans, in time order. X columns are marked (X), Y is (Y).",
    clash: "clash",
    showSplit: "Split the table along the rules",
    violations:
      "These declared rules have a left side that is not a key of the wide table, so it breaks BCNF: {list}.",
    tableNames: { scan: "scan", ticket: "ticket", fare: "fare", wing: "wing" },
    tableLine: "{name}({cols}): {rows} rows",
    splitSummary:
      "The wide table stores {wide} cells. The four tables store {cells}. Changing the Adult price touches {adult} rows in the wide table and one row after the split.",
  },
  zh: {
    declared: "设计者声明的规则",
    attrs: {
      ticket: "票号",
      type: "票种",
      price: "票价",
      wing: "展馆",
      level: "楼层",
      time: "时间",
    },
    left: "左边 X（选一个或多个）",
    right: "右边 Y",
    rowsLabel: "样本行数",
    newSample: "换一份样本",
    reset: "重置",
    seed: "种子 {seed}",
    inData: "在这份样本里",
    inRules: "从声明的规则推出",
    pickLeft: "左边至少选一列。",
    trivial: "右边已经在左边里了，这个依赖平凡成立。",
    dataBreaks: "不成立。第 {r1} 行和第 {r2} 行的{lhs}相同（{same}），{rhs}却不同：{v1} 对 {v2}。",
    dataHolds: "这 {rows} 行里没有两行违反它。但这不是证明，更大的样本可能会违反。",
    closureLine: "{{lhs}}⁺ = {{closure}}。",
    ruleFollows: "{rhs}在闭包里，所以规则保证这个依赖成立。",
    ruleNot: "{rhs}不在闭包里，所以规则没有承诺这一点。",
    keyStatus: {
      key: "左边是一个键：它决定所有列，而且没有更小的集合能做到。",
      superkey: "左边是超键：它决定所有列，但更小的集合也能做到。",
      none: "左边不是键。",
    },
    via: "推导：{steps}。",
    tableCaption: "按时间排序的前 {rows} 条展馆扫描记录。X 列标 (X)，Y 列标 (Y)。",
    clash: "冲突",
    showSplit: "按规则拆分这张表",
    violations: "下面这些声明的规则，左边都不是宽表的键，所以宽表不满足 BCNF：{list}。",
    tableNames: { scan: "扫描", ticket: "门票", fare: "票价", wing: "展馆" },
    tableLine: "{name}（{cols}）：{rows} 行",
    splitSummary:
      "宽表存了 {wide} 个单元格，拆成四张表后存 {cells} 个。修改成人票价，在宽表里要改 {adult} 行，拆分后只改一行。",
  },
};

function SourceList({ items }) {
  return (
    <ul className="not-prose my-6 space-y-5 list-none pl-0">
      {items.map((s) => (
        <li key={s.href} className="text-[14px] leading-relaxed">
          <a
            href={s.href}
            rel="noreferrer"
            className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
          >
            {s.title}
          </a>
          <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
            {s.cite}
          </span>
          <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {s.why}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        A functional dependency is a promise about data: whenever two rows agree on these columns,
        they agree on that one too. A good part of database design is writing those promises down
        and then arranging the tables so that each fact is stored in exactly one place. This note
        covers what a dependency says, how to reason from a few of them to everything they imply,
        and why a table that ignores them turns every update into a chance to contradict itself.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Write <TeX>X \to Y</TeX>, read "<TeX>X</TeX> determines <TeX>Y</TeX>", when knowing the
          values in columns <TeX>X</TeX> fixes the value in column <TeX>Y</TeX>. In a ticketing
          table, the ticket number determines the ticket type, and the type determines the price.
          The dependency is a claim about every table the system could ever hold, not only the rows
          in it today. That makes it a business rule, and it comes from what the columns mean.
        </p>
        <p>
          A <Term>key</Term> is a set of columns that determines every other column, with nothing
          spare in it. Declaring a primary key is declaring a dependency from the key to the whole
          row, which is why a key chosen carelessly can quietly stop the table storing what actually
          happens.
        </p>
        <p>
          Trouble starts when a dependency's left side is not a key. Picture one wide table of wing
          scans with the ticket type and price copied into every row. The Adult price now sits in
          every Adult scan. Change it and you must update every one of those rows, and if one is
          missed, the table holds two Adult prices at once. That is an <Term>update anomaly</Term>.
          You also cannot record the price of a new ticket type until someone is scanned with one,
          and deleting the last Member scan forgets what a Member ticket costs.{" "}
          <Term>Normalisation</Term> fixes all three by splitting the table so each dependency's
          left side becomes the key of its own table. The{" "}
          <Link href="/knowledge/database-systems#normalisation">Database Systems</Link> topic walks
          through the normal forms that make this precise.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Formally, a relation satisfies <TeX>X \to Y</TeX> when no two of its rows agree on{" "}
          <TeX>X</TeX> and disagree on <TeX>Y</TeX>.
        </p>
        <Formula
          label="X determines Y if and only if, for all rows t 1 and t 2, t 1 of X equals t 2 of X implies t 1 of Y equals t 2 of Y"
          caption="One pair of rows is enough to break a dependency. No number of rows is enough to prove one."
        >
          {TEX.fd}
        </Formula>
        <p>
          From a declared set of dependencies <TeX>F</TeX>, Armstrong's three rules derive every
          dependency that must also hold: reflexivity, augmentation and transitivity.
        </p>
        <Formula
          label="If Y is a subset of X, then X determines Y. If X determines Y, then X Z determines Y Z. If X determines Y and Y determines Z, then X determines Z."
          caption="The rules are sound, so they never derive a false dependency, and complete, so they derive every true one."
        >
          {TEX.armstrong}
        </Formula>
        <p>
          In practice you rarely apply the rules by hand. You compute a <Term>closure</Term>{" "}
          instead: start with <TeX>X</TeX>, and whenever a declared dependency's left side sits
          inside the set, add its right side, until nothing changes.
        </p>
        <Formula
          label="X plus is the set of attributes A such that X determines A follows from F. X is a superkey if and only if X plus is the whole relation R."
          caption="A key is a superkey that stops being one if any column is removed."
        >
          {TEX.closure}
        </Formula>
        <p>
          Boyce–Codd normal form asks that every dependency that holds has a superkey on its left.
          Third normal form relaxes this slightly, allowing the right side to be part of some key,
          which keeps every dependency checkable inside a single table when BCNF cannot.
        </p>
        <Formula
          label="R is in BCNF if and only if every non-trivial dependency X to Y that holds has X plus equal to R"
          caption="Trivial means Y is already inside X, as in ticket, time determines time."
        >
          {TEX.bcnf}
        </Formula>
        <p>
          A split must not lose information. Joining the pieces back has to give exactly the
          original rows, no more, and that is guaranteed when the shared columns are a key of one of
          the pieces.
        </p>
        <Formula
          label="Splitting R into R 1 and R 2 is lossless if and only if their shared columns determine all of R 1 or all of R 2"
          caption="Split on a dependency X to Y by making one table of X and Y, and keeping X in the other."
        >
          {TEX.lossless}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget holds a log of wing scans at a made-up museum, one row per scan, and the four
          rules its designer declared. Build a dependency with the buttons. The widget answers two
          separate questions about it: does this sample of rows break it, and does it follow from
          the declared rules?
        </p>
        <Figure caption="Scans come from a seeded generator that obeys the four declared rules, so any break you find is a dependency nobody promised.">
          <FdChecker copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            The default asks whether ticket determines wing. The data breaks it, because a ticket
            visits several wings, and the closure of ticket holds only ticket, type and price.
          </li>
          <li>
            Add time to the left side. Ticket and time together determine the wing, the closure
            reaches every column, and the pair is a key.
          </li>
          <li>
            Try price determines type. At 16 rows it holds. Drag the rows to 24, and a Child ticket
            and a Member ticket turn out to cost the same 0. Type determines price, and the reverse
            was never a rule.
          </li>
          <li>
            Try time determines ticket. Up to 32 rows every scan falls on a different minute, so the
            sample cannot refute it. At 40 rows several minutes are shared. A sample can break a
            dependency and never prove one.
          </li>
          <li>
            Tick the split. Three declared rules have a left side that is not a key, and splitting
            on them stores fewer cells and keeps the Adult price in one row.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="INFO20003 · COMP90050">
          <p>
            In INFO20003 in 2020 I designed an entity-relationship model for a Louvre ticketing and
            visitor database, an individual assignment, in a subject that taught dependencies and
            normal forms alongside ER modelling. When I revived it in 2026 as{" "}
            <a href={LOUVRE} className={CALLOUT_LINK}>
              Louvre Ops DB
            </a>
            , I replayed five years of synthetic activity into the 2020 tables, and several of the
            design review's twelve findings are dependency problems. The Wings table was keyed by
            the wing's name alone, which claims that the name determines every other column in the
            row, so it could hold 3 of 19,545 wing visits. The Entrance key could not record a
            visitor re-entering through the same gate, which the brief allowed. A Business Day flag
            repeated what the date already says, and a stored visitor count copied rows that a query
            could compute. The refined schema gives wing scans and entries their own keyed tables.
          </p>
          <p>
            COMP90050 Advanced Database Systems in 2023 picked up where schema design stops. Our
            group survey covered self-driving databases, and I co-wrote its index-selection half. In
            its 2026 revival,{" "}
            <a href={SELF_DRIVING} className={CALLOUT_LINK}>
              Self-Driving DB Lab
            </a>
            , the Louvre database from INFO20003 ships as a second dataset with a museum workload,
            so the same schema meets the index advisors.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Reading dependencies off the data.</strong> A sample can refute{" "}
              <TeX>X \to Y</TeX> but never establish it, as time and ticket show above. Dependencies
              come from what the columns mean, so ask the people who know the rules.
            </li>
            <li>
              <strong>Reading a dependency backwards.</strong> Type determines price. Price does not
              determine type, and a design that assumes it will merge every free ticket into one.
            </li>
            <li>
              <strong>Choosing a key that claims too much.</strong> A key says that two rows can
              never share its values. Before declaring one, ask whether two real events could, as
              two visits to the same wing obviously can.
            </li>
            <li>
              <strong>Splitting without checking the join.</strong> A decomposition whose shared
              columns are not a key of either side produces extra rows when joined back. Check it is
              lossless before you drop the wide table.
            </li>
            <li>
              <strong>Treating normalisation as the last word.</strong> Read-heavy reporting tables
              are often denormalised on purpose. That is a trade for speed, and it is safest when
              the duplicates are derived from a normalised source rather than typed in twice.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <SourceList
          items={[
            {
              href: SOURCES.codd,
              title: "A relational model of data for large shared data banks",
              cite: "Codd, Communications of the ACM 13(6), 1970, pp. 377–387.",
              why: "The paper that started relational databases, including the first discussion of normalising relations.",
            },
            {
              href: SOURCES.kent,
              title: "A simple guide to five normal forms in relational database theory",
              cite: "Kent, Communications of the ACM 26(2), 1983, pp. 120–125.",
              why: "Short and plain, with one example per normal form. Still the quickest way to see what each form forbids.",
            },
            {
              href: SOURCES.cow,
              title: "Database Management Systems",
              cite: "Ramakrishnan and Gehrke, 3rd edition, McGraw-Hill, 2003. Chapter 19.",
              why: "A standard textbook chapter on schema refinement: closures, keys, BCNF and 3NF, and lossless, dependency-preserving decompositions.",
            },
          ]}
        />
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        函数依赖是对数据的一个承诺：只要两行在这几列上相同，它们在那一列上也相同。数据库设计有很大一部分工作，就是把这些承诺写下来，再安排表的结构，让每个事实只存在一个地方。这篇笔记讲一个依赖说的是什么，怎样从几个依赖推出它们蕴含的全部依赖，以及为什么无视依赖的表会让每次更新都有机会自相矛盾。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          当知道列 <TeX>X</TeX> 的值就能确定列 <TeX>Y</TeX> 的值时，写作 <TeX>X \to Y</TeX>
          ，读作“<TeX>X</TeX> 决定 <TeX>Y</TeX>
          ”。在一张售票表里，票号决定票种，票种决定票价。依赖是对系统任何时候可能存的每一张表的断言，而不只是今天表里那些行。所以它是一条业务规则，来自这些列的含义。
        </p>
        <p>
          <Term>键</Term>
          是能决定所有其他列、又没有多余列的一组列。声明主键，就是声明一个从键到整行的依赖。这也是为什么一个随手选的键，会悄悄地让表存不下实际发生的事情。
        </p>
        <p>
          麻烦始于依赖的左边不是键。想象一张很宽的展馆扫描表，每一行都抄着票种和票价。成人票价就出现在每一条成人票扫描记录里。改票价时你得改所有这些行，漏掉一行，表里就同时有两个成人票价。这叫
          <Term>更新异常</Term>
          。你也没法在有人用新票种扫码之前记录它的票价，而删掉最后一条会员票扫描记录，就忘了会员票卖多少钱。
          <Term>规范化</Term>
          通过拆表一次解决这三个问题，让每个依赖的左边成为它自己那张表的键。
          <Link href="/knowledge/database-systems#normalisation">数据库系统</Link>
          主题会一步步讲把这件事精确化的各个范式。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          形式上，如果一个关系里没有两行在 <TeX>X</TeX> 上相同却在 <TeX>Y</TeX> 上不同，就说它满足{" "}
          <TeX>X \to Y</TeX>。
        </p>
        <Formula
          label="X 决定 Y，当且仅当对任意两行 t 1 和 t 2，t 1 的 X 等于 t 2 的 X 蕴含 t 1 的 Y 等于 t 2 的 Y"
          caption="一对行就足以推翻一个依赖。多少行都不足以证明一个依赖。"
        >
          {TEX.fd}
        </Formula>
        <p>
          从一组声明的依赖 <TeX>F</TeX> 出发，Armstrong
          的三条规则能推出所有必然成立的依赖：自反律、增广律和传递律。
        </p>
        <Formula
          label="如果 Y 是 X 的子集，则 X 决定 Y。如果 X 决定 Y，则 X Z 决定 Y Z。如果 X 决定 Y 且 Y 决定 Z，则 X 决定 Z。"
          caption="这些规则是可靠的，不会推出错误的依赖，也是完备的，能推出每一个正确的依赖。"
        >
          {TEX.armstrong}
        </Formula>
        <p>
          实际上很少有人手工套这些规则，而是计算<Term>闭包</Term>：从 <TeX>X</TeX>{" "}
          开始，只要某个声明的依赖的左边落在当前集合里，就把它的右边加进来，直到不再变化。
        </p>
        <Formula
          label="X 的闭包是由 F 能推出被 X 决定的所有属性 A 的集合。X 是超键当且仅当 X 的闭包等于整个关系 R。"
          caption="键就是去掉任何一列都不再是超键的超键。"
        >
          {TEX.closure}
        </Formula>
        <p>
          Boyce–Codd
          范式要求每个成立的依赖左边都是超键。第三范式稍微放宽，允许右边是某个键的一部分，这样在
          BCNF 做不到的时候，每个依赖仍然能在单张表里检查。
        </p>
        <Formula
          label="R 满足 BCNF，当且仅当每个成立的非平凡依赖 X 到 Y 都有 X 的闭包等于 R"
          caption="平凡指 Y 已经包含在 X 里，比如票号和时间决定时间。"
        >
          {TEX.bcnf}
        </Formula>
        <p>
          拆表不能丢信息。把拆出来的表再连接回去，必须正好得到原来的行，不多也不少。当共享的列是其中一张表的键时，这一点就有保证。
        </p>
        <Formula
          label="把 R 拆成 R 1 和 R 2 是无损的，当且仅当它们共享的列决定 R 1 的全部或 R 2 的全部"
          caption="按依赖 X 到 Y 拆分：用 X 和 Y 组成一张表，另一张表保留 X。"
        >
          {TEX.lossless}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具存着一家虚构博物馆的展馆扫描日志，每次扫描一行，还有设计者声明的四条规则。用按钮拼出一个依赖，工具会分别回答两个问题：这份样本有没有违反它，它能不能从声明的规则推出来。
        </p>
        <Figure caption="扫描记录来自一个遵守四条声明规则的带种子生成器，所以你找到的任何违反，都是没有人承诺过的依赖。">
          <FdChecker copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>
            默认问的是票号能不能决定展馆。数据违反了它，因为一张票会去好几个展馆，而票号的闭包只有票号、票种和票价。
          </li>
          <li>在左边加上时间。票号和时间一起决定展馆，闭包覆盖了所有列，这一对就是键。</li>
          <li>
            试试票价决定票种。16 行时它成立。把行数拖到 24，会发现一张儿童票和一张会员票都是 0
            元。票种决定票价，反过来从来不是规则。
          </li>
          <li>
            试试时间决定票号。32 行以内，每次扫描都落在不同的分钟上，样本推翻不了它。到 40
            行时，好几个分钟出现了重复。样本可以推翻依赖，却永远证明不了依赖。
          </li>
          <li>
            勾上拆分。有三条声明的规则左边不是键，按它们拆分后存的单元格更少，成人票价也只存在一行里。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="INFO20003 · COMP90050">
          <p>
            2020 年在 INFO20003
            里，我为卢浮宫的售票和访客数据库设计了实体关系模型，这是一份个人作业，这门课在讲 ER
            建模的同时也讲依赖和范式。2026 年我把它复活成
            <a href={LOUVRE} className={CALLOUT_LINK}>
              Louvre Ops DB
            </a>
            ，把五年的合成活动数据回放进 2020
            年的表里，设计评审的十二条发现中有好几条是依赖问题。Wings
            表只用展馆名称作键，等于声称名称决定这一行的其他所有列，结果 19,545 次展馆参观只能存下 3
            次。Entrance
            表的键记录不了访客从同一个入口再次入场，而作业要求是允许再入场的。一个“营业日”标记重复了日期本身已经说明的信息，一个存下来的访客人数复制了本来用查询就能算出的行。改进后的模式给展馆扫描和入场记录各建了一张有自己键的表。
          </p>
          <p>
            2023 年的 COMP90050
            高级数据库系统，接着讲模式设计之后的事。我们小组的综述讲自驱数据库，我合写了其中索引选择的那一半。在它
            2026 年的复活版
            <a href={SELF_DRIVING} className={CALLOUT_LINK}>
              自驱数据库实验室
            </a>
            里，INFO20003
            的卢浮宫数据库作为第二个数据集，配上博物馆的查询负载，于是同一个模式又遇上了索引顾问。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>从数据里读出依赖。</strong>
              样本能推翻 <TeX>X \to Y</TeX>
              ，却永远确立不了它，上面的时间和票号就是例子。依赖来自列的含义，所以要去问懂规则的人。
            </li>
            <li>
              <strong>把依赖读反。</strong>
              票种决定票价，票价却不决定票种。假设它成立的设计，会把所有免费票合并成一种。
            </li>
            <li>
              <strong>选了一个断言过多的键。</strong>
              键意味着两行永远不会有相同的键值。声明之前先问：两件真实发生的事会不会有相同的值？同一个展馆的两次参观，显然会。
            </li>
            <li>
              <strong>拆表却不检查连接。</strong>
              如果共享的列不是任何一边的键，连接回去时会多出行来。删掉宽表之前，先确认拆分是无损的。
            </li>
            <li>
              <strong>把规范化当成最终答案。</strong>
              以读取为主的报表常常故意反规范化。这是用冗余换速度，最安全的做法是让这些冗余从规范化的源头派生，而不是手工录入两遍。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <SourceList
          items={[
            {
              href: SOURCES.codd,
              title: "A relational model of data for large shared data banks",
              cite: "Codd，Communications of the ACM 第 13 卷第 6 期，1970，第 377–387 页。",
              why: "开创关系数据库的论文，其中第一次讨论了关系的规范化。",
            },
            {
              href: SOURCES.kent,
              title: "A simple guide to five normal forms in relational database theory",
              cite: "Kent，Communications of the ACM 第 26 卷第 2 期，1983，第 120–125 页。",
              why: "短小直白，每个范式一个例子。至今仍是看懂每个范式禁止什么的最快途径。",
            },
            {
              href: SOURCES.cow,
              title: "Database Management Systems",
              cite: "Ramakrishnan 与 Gehrke，第 3 版，McGraw-Hill，2003。第 19 章。",
              why: "讲模式求精的标准教材章节：闭包、键、BCNF 和 3NF，以及无损且保持依赖的分解。",
            },
          ]}
        />
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "A dependency says which columns fix which. Keys, closures and normal forms all follow from taking those promises seriously.",
    description:
      "A concept note on functional dependencies: what X → Y claims, Armstrong's rules, attribute closures and keys, BCNF and lossless splits, with a widget that tests a dependency against seeded data and against the declared rules. Part of Rin Huang's Database Systems topic.",
    course: "Database Systems",
    courseCode: "INFO20003 · COMP90050",
    level: "Undergraduate",
    learned: "2020 S1",
    applied: "Louvre Ops DB",
    parent: { href: "/knowledge/database-systems", label: "Database Systems" },
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
    subtitle: "依赖说明哪些列决定哪些列。键、闭包和范式，都来自认真对待这些承诺。",
    description:
      "关于函数依赖的概念笔记：X → Y 断言了什么、Armstrong 规则、属性闭包与键、BCNF 和无损拆分，并附带一个同时用带种子的数据和声明的规则检验依赖的工具。属于 Rin Huang 的数据库系统主题。",
    course: "数据库系统",
    courseCode: "INFO20003 · COMP90050",
    level: "本科",
    learned: "2020 年第一学期",
    applied: "Louvre Ops DB",
    parent: { href: "/knowledge/database-systems", label: "数据库系统" },
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
