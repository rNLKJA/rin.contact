import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
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
        <Callout type="applied" label="REST APIs in coursework">
          <p>
            I used REST APIs in INFO30005 Snacks in a Van (Express, 2021) and COMP30022 Personal CRM
            (Express, about 35 REST endpoints, 2021). I have not used GraphQL in a production
            project.
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
              restfulapi.net
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
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
        使用一种查询语言。这篇笔记涵盖权衡和什么时候每一个都有意义。在现代 Web
        开发中，选择合适的数据获取策略对应用性能和开发效率都有重大影响。REST
        的成熟生态系统和简单性使其在许多场景下仍是首选，而 GraphQL
        的灵活性在复杂前端需求中展现出独特价值。理解两者的设计哲学和适用场景，能够帮助开发团队做出更明智的技术决策。本笔记通过对比分析和实际案例，深入探讨这两种架构的核心差异。
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
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具展示 REST 响应（多个请求，瀑布流）和 GraphQL
          响应（单一查询）。检查所需字段并查看差异。更大的选择使 GraphQL
          的优势更清晰。这个交互式演示模拟了真实的网络请求场景，包括每次请求的延迟和数据传输大小。通过直观地比较两种方法，可以清楚地看到
          GraphQL 在减少网络往返次数方面的优势。同时，也能观察到当只需要少量字段时，REST
          的简单性可能更适合。建议尝试不同的字段组合，观察性能差异如何随选择复杂度变化。
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
        <Callout type="applied" label="课程作业中的REST API">
          <p>
            我在INFO30005 Snacks in a
            Van（Express，2021年）和COMP30022个人CRM（Express，约35个REST端点，2021年）中使用了REST
            API。我还没有在生产项目中使用过GraphQL。
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
              restfulapi.net
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          在各个项目中比较（2022-2026）。这些实践经验帮助我深入理解了两种架构的适用场景。REST
          的成熟工具链和广泛支持使其成为快速原型开发的首选，而 GraphQL
          在需要精细控制数据传输的场景中展现出明显优势。在实际项目中，技术选择往往需要权衡多个因素：团队经验、现有基础设施、性能需求、开发效率以及长期维护成本。通过对比不同项目的实施经验，可以更清晰地认识到没有绝对的优劣，只有更适合具体场景的方案。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "API Design",
    description: "Comparing REST endpoints and GraphQL schemas for data fetching",
    course: "Web Information Technology",
    courseCode: "INFO30005",
    level: "Undergraduate",
    learned: "2021 S1",
    applied: "Snacks in a Van",
    parent: { href: "/knowledge/web-information-technology", label: "Web & IT" },
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
    subtitle: "API 设计",
    description: "比较 REST 端点和 GraphQL 模式的数据获取",
    course: "网络信息技术",
    courseCode: "INFO30005",
    level: "本科",
    learned: "2021 年第一学期",
    applied: "Snacks in a Van",
    parent: { href: "/knowledge/web-information-technology", label: "网络与信息技术" },
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
