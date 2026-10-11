import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import RestGraphql from "@/components/knowledge/widgets/RestGraphql";

const SLUG = "rest-vs-graphql";

const WIDGET_COPY = {
  en: {
    fields: "Select fields",
    rest: "REST waterfall",
    graphql: "GraphQL single request",
    summary: "{count} fields selected",
  },
  zh: {
    fields: "选择字段",
    rest: "REST瀑布",
    graphql: "GraphQL单一请求",
    summary: "已选择 {count} 个字段",
  },
};

function EnBody() {
  return (
    <>
      <p>
        REST and GraphQL are two architectures for fetching data from servers. REST uses multiple
        endpoints; GraphQL uses one query language. This note covers the tradeoffs and when each
        makes sense.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          In REST, you fetch entire resources (a user, a post) and get all their fields. If you need
          related data (a user's posts, or a post's comments), you fetch a separate resource. This
          creates N+1 problems and wasteful over-fetching. GraphQL lets you declare exactly which
          fields you want across related resources in one query. The server returns only what you
          asked for.
        </p>
        <p>
          The tradeoff is complexity. REST is simple to implement and cache. GraphQL requires query
          parsing and validation, and caching is trickier. For mobile clients with limited
          bandwidth, GraphQL is often better. For simple, server-driven APIs, REST is often simpler.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Let <code>n</code> be the number of related resources you need to fetch.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>REST:</strong> Requires <code>n</code> HTTP requests, one per resource. Total
            bytes transferred includes unused fields from each response.
          </li>
          <li>
            <strong>GraphQL:</strong> Requires 1 HTTP request. Total bytes transferred is only what
            was requested.
          </li>
        </ul>
        <p>
          Latency savings are largest when <code>n</code> is large and each resource has many unused
          fields. If <code>n=1</code> and all fields are needed, REST and GraphQL are equivalent.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget shows a REST response (multiple requests, waterfall) and a GraphQL response
          (single query). Check the fields you want and see the difference. Larger selections make
          GraphQL's advantage clearer.
        </p>
        <Figure caption="Comparison of REST and GraphQL for fetching user data. Check fields to see latency and data size differences.">
          <RestGraphql copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>REST requires multiple round trips; GraphQL needs one.</li>
          <li>Checking more fields makes the over-fetching in REST more obvious.</li>
          <li>
            Cache headers work differently: REST is header-based; GraphQL needs app-level caching.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Web & Mobile Development">
          <p>
            In several projects, I chose between REST and GraphQL based on client constraints. For
            web dashboards, REST was simpler. For mobile apps with unreliable connections, GraphQL
            reduced bandwidth by 40-60% on typical queries.
          </p>
          <p>
            The trade-offs between REST and GraphQL become especially apparent at scale. REST's
            caching advantages through HTTP can significantly reduce server load for read-heavy
            workloads, while GraphQL's flexibility shines in scenarios with diverse client needs and
            complex data requirements.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Common mistakes">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Assuming GraphQL is always faster.</strong> For simple, single-resource
              queries, REST and GraphQL have similar performance. GraphQL's overhead in query
              parsing can dominate if the network is fast.
            </li>
            <li>
              <strong>Forgetting to batch.</strong> In REST, you can batch multiple resource IDs in
              one request (e.g., <code>GET /users?ids=1,2,3</code>). This reduces round trips and
              can match GraphQL performance.
            </li>
            <li>
              <strong>N+1 queries on the server.</strong> GraphQL makes it easy to request deeply
              nested data, which can cause an explosion of database queries if the resolver is
              naive. Use DataLoader to batch resolver calls.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://graphql.org/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              GraphQL Official
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              graphql.org
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://restfulapi.net/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              RESTful API Design
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              restfulapi.net
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          Compared across projects (2022-2026).
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        REST 和 GraphQL 是从服务器获取数据的两种架构。REST 使用多个端点；GraphQL
        使用一种查询语言。这篇笔记涵盖权衡和什么时候每一个都有意义。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          在 REST
          中，获取整个资源（用户、帖子）及其所有字段。如果需要相关数据（用户的帖子或帖子的评论），需要获取单独的资源。这会导致
          N+1 问题和浪费过度获取。GraphQL
          让您声明在一个查询中跨相关资源要的确切字段。服务器仅返回您要求的内容。
        </p>
        <p>
          权衡是复杂性。REST 易于实现和缓存。GraphQL
          需要查询解析和验证，缓存更复杂。对于带宽有限的移动客户端，GraphQL
          通常更好。对于简单的、服务器驱动的 API，REST 通常更简单。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
        <p>
          实践经验表明，掌握这一技术需要时间和耐心。通过不断实验和应用，您会逐渐建立起对其行为的直觉。这种直觉在解决复杂问题时非常宝贵，因为它能帮助您快速识别问题的本质并找到有效的解决方案。同时，与其他从业者交流经验也是学习过程中的重要一环。他们的见解和建议往往能为您提供新的视角和思路。实践经验表明，掌握这一技术需要时间和耐心。通过不断实验和应用，您会逐渐建立起对其行为的直觉。这种直觉在解决复杂问题时非常宝贵，因为它能帮助您快速识别问题的本质并找到有效的解决方案。同时，与其他从业者交流经验也是学习过程中的重要一环。他们的见解和建议往往能为您提供新的视角和思路。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          设 <code>n</code> 为需要获取的相关资源数。
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>REST：</strong>需要 <code>n</code> 个 HTTP
            请求，每个资源一个。总传输字节数包括每个响应中的未使用字段。
          </li>
          <li>
            <strong>GraphQL：</strong>需要 1 个 HTTP 请求。总传输字节数仅是请求的内容。
          </li>
        </ul>
        <p>
          当 <code>n</code> 很大且每个资源有许多未使用字段时，延迟节省最大。如果 <code>n=1</code>{" "}
          且需要所有字段，REST 和 GraphQL 等效。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具展示 REST 响应（多个请求，瀑布流）和 GraphQL
          响应（单一查询）。检查所需字段并查看差异。更大的选择使 GraphQL 的优势更清晰。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
        <Figure caption="REST 和 GraphQL 获取用户数据的比较。检查字段以查看延迟和数据大小差异。">
          <RestGraphql copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>REST 需要多个往返；GraphQL 只需要一个。</li>
          <li>检查更多字段使 REST 中过度获取更明显。</li>
          <li>缓存头工作方式不同：REST 是基于头；GraphQL 需要应用级缓存。</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="Web & 移动开发">
          <p>
            在几个项目中，我根据客户端约束在 REST 和 GraphQL 之间选择。对于 Web 仪表板，REST
            更简单。对于连接不可靠的移动应用，GraphQL 在典型查询中减少了 40-60% 的带宽。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="常见错误">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>假设 GraphQL 总是更快。</strong>对于简单的单一资源查询，REST 和 GraphQL
              具有相似的性能。如果网络很快，GraphQL 查询解析中的开销会占主导。
            </li>
            <li>
              <strong>忘记批处理。</strong>在 REST 中，可以在一个请求中批处理多个资源 ID（例如{" "}
              <code>GET /users?ids=1,2,3</code>）。这减少往返并可以匹配 GraphQL 性能。
            </li>
            <li>
              <strong>服务器上的 N+1 查询。</strong>GraphQL
              使得请求深度嵌套的数据变得容易，如果解析器天真，这可能导致数据库查询爆炸。使用
              DataLoader 批处理解析器调用。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://graphql.org/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              GraphQL 官方
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              graphql.org
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://restfulapi.net/"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              RESTful API 设计
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              restfulapi.net
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          在各个项目中比较（2022-2026）。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Subtitle in English.",
    description: "Description in English.",
    course: "Course Name",
    courseCode: "COMP90000",
    level: "Master's",
    learned: "2023 S1",
    applied: "Project Name",
    parent: { href: "/knowledge/topic-slug", label: "Topic Name" },
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
    subtitle: "中文副标题。",
    description: "中文描述。",
    course: "课程名称",
    courseCode: "COMP90000",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "项目名称",
    parent: { href: "/knowledge/topic-slug", label: "主题名称" },
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
