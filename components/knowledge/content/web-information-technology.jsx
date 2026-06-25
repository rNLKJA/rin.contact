import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/web-information-technology.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Code
 * blocks (HTTP request, HTML, JSON) and the SVG geometry are shared; prose,
 * captions, aria-labels, and figure text labels are localised. Technology
 * proper nouns (HTTP, REST, JSON, Next.js, KaTeX, DOM…) stay as-is.
 */

const CODE = {
  http: `GET /knowledge/ HTTP/1.1
Host: rin.contact
Accept: text/html`,
  html: `<article>
  <h1>Web Information Technology</h1>
  <p>HTML is the structure.</p>
</article>`,
  json: `{
  "name": "Rin Huang",
  "role": "Senior Data Analyst",
  "skills": ["Python", "SQL", "Next.js"]
}`,
};

function RoundTripFigure({ caption, ariaLabel, browser, server, database, request, query, rows, response }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect x="14" y="55" width="92" height="40" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="60" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{browser}</text>
        <rect x="174" y="55" width="92" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x="220" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{server}</text>
        <rect x="334" y="55" width="92" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x="380" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{database}</text>
        <line x1="106" y1="68" x2="172" y2="68" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#web-ah)" />
        <text x="139" y="61" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{request}</text>
        <line x1="266" y1="68" x2="332" y2="68" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#web-ah2)" />
        <text x="299" y="61" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{query}</text>
        <line x1="332" y1="84" x2="266" y2="84" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#web-ah2)" />
        <text x="299" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.75">{rows}</text>
        <line x1="172" y1="84" x2="106" y2="84" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#web-ah)" />
        <text x="139" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{response}</text>
        <defs>
          <marker id="web-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
          <marker id="web-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
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
        This page is, fittingly, a web page — so it's a chance to explain the thing
        you're using to read it. The web can feel like magic, but underneath it's a small
        set of clear ideas: a conversation between two computers, a protocol for that
        conversation, and three languages that build what you see. Understand those and
        the whole stack stops being mysterious.
      </p>
      <p>
        It's also my strongest applied subject from Melbourne, and the foundation under{" "}
        <Link href="/knowledge/database-systems">the data layer</Link> that every
        dashboard, API, and app — including this site — is built on. Here's the web from
        the ground up.
      </p>

      <KSection id="requestresponse" eyebrow="01" title="The web is request and response">
        <p>
          Everything on the web is a conversation between a <Term>client</Term> (your
          browser) and a <Term>server</Term> (a computer holding the website). The client
          asks, the server answers — that single <Term>request-response</Term> cycle is
          the heartbeat of the entire web. Type an address and hit enter, and a remarkable
          amount happens in a fraction of a second:
        </p>
        <ol>
          <li>
            <Term>DNS lookup</Term> — the human-friendly name (<code>rin.contact</code>)
            is translated into a numeric <Term>IP address</Term>, the web's equivalent of
            a phone number.
          </li>
          <li>
            <Term>Request</Term> — your browser opens a connection and sends an HTTP
            request: "please give me this page."
          </li>
          <li>
            <Term>Server work</Term> — the server processes it, perhaps querying a
            database, and builds a response.
          </li>
          <li>
            <Term>Response</Term> — it sends back the content (HTML, data, an image) with
            a status code, and your browser renders it.
          </li>
        </ol>

        <RoundTripFigure
          caption="The request-response round-trip. A click becomes a DNS lookup, an HTTP request to the server, optional database work, and a response the browser renders. Every page load is this loop."
          ariaLabel="A flow from Browser to Server to Database and back: the browser sends an HTTP request to the server, the server queries the database, and a response returns to the browser."
          browser="browser"
          server="server"
          database="database"
          request="request"
          query="query"
          rows="rows"
          response="response"
        />
      </KSection>

      <KSection id="http" eyebrow="02" title="HTTP: the protocol">
        <p>
          <Term>HTTP</Term> (HyperText Transfer Protocol) is the agreed language of that
          conversation — the rules for how a request and response are formatted. A request
          names a <Term>method</Term> (the verb) and a path, plus headers:
        </p>
        <pre><code>{CODE.http}</code></pre>
        <p>The methods map to the things you can do with a resource:</p>
        <ul>
          <li><Term>GET</Term> — read something (load a page). Should never change data.</li>
          <li><Term>POST</Term> — create something (submit a form).</li>
          <li><Term>PUT / PATCH</Term> — update something.</li>
          <li><Term>DELETE</Term> — remove something.</li>
        </ul>
        <p>
          Every response carries a <Term>status code</Term> — the three-digit number that
          says how it went: <code>200</code> OK, <code>301/302</code> redirect,{" "}
          <code>404</code> not found, <code>403</code> forbidden, <code>500</code> server
          error. (If you've read the <Link href="/knowledge">site's link checks</Link>,
          that's exactly what they verify.) Crucially, HTTP is <Term>stateless</Term>:
          each request stands alone, the server remembers nothing between them by default.
          Keeping you logged in across pages is a layer built on top — cookies and tokens
          that re-send your identity with every request.
        </p>
      </KSection>

      <KSection id="triad" eyebrow="03" title="The front-end triad">
        <p>
          What the server sends back, for a page, is built from three languages with a
          clean division of labour — a separation worth internalising because it's the
          mental model for all front-end work:
        </p>
        <ul>
          <li>
            <Term>HTML</Term> — the <em>structure and content</em>. Headings, paragraphs,
            lists, links; the skeleton. It's a tree of nested tags.
          </li>
          <li>
            <Term>CSS</Term> — the <em>presentation</em>. Colours, fonts, spacing, layout
            — everything about how the structure looks.
          </li>
          <li>
            <Term>JavaScript</Term> — the <em>behaviour</em>. The only one that runs as a
            program: it responds to clicks, fetches new data, and changes the page live.
          </li>
        </ul>
        <pre><code>{CODE.html}</code></pre>
        <p>
          The browser parses that HTML into the <Term>DOM</Term> (Document Object Model) —
          a live, in-memory tree of objects representing the page. CSS styles the DOM;
          JavaScript reads and rewrites it. When a page updates without reloading, that's
          JavaScript mutating the DOM. Holding the structure/presentation/behaviour split
          clean is what keeps a site maintainable.
        </p>
      </KSection>

      <KSection id="clientserver" eyebrow="04" title="Client vs server">
        <p>
          The deepest question in web architecture is <em>where the work happens</em> — on
          the server before the page is sent, or in the browser after. It's a genuine
          trade-off, not a settled answer:
        </p>
        <ul>
          <li>
            <Term>Server-side rendering</Term> — the server builds the finished HTML and
            sends it ready to display. Fast first paint, and search engines see real
            content. (This page is rendered this way.)
          </li>
          <li>
            <Term>Client-side rendering</Term> — the server sends a near-empty shell plus
            JavaScript, and the browser builds the page. Richer interactivity, but a
            slower first load and weaker for SEO if done naively.
          </li>
        </ul>
        <p>
          Modern frameworks blend the two: render on the server for the first load, then
          "hydrate" so JavaScript takes over for interactivity. Knowing which code runs
          where — and that anything in the browser is visible and editable by the user, so
          it can never be trusted with secrets — is the core competency of web work.
        </p>
      </KSection>

      <KSection id="apis" eyebrow="05" title="APIs and JSON">
        <p>
          Pages are for people; <Term>APIs</Term> are how programs talk to each other over
          the web. An API is a defined set of URLs (<Term>endpoints</Term>) a client can
          call to get or change data — the same HTTP methods, but the response is
          structured data rather than a page. The dominant style is <Term>REST</Term>:
          model everything as resources at clean URLs, and use the HTTP verbs on them
          (<code>GET /users/42</code> reads user 42, <code>DELETE /users/42</code> removes
          them).
        </p>
        <p>
          The data that flows back is almost always <Term>JSON</Term> — a simple,
          human-readable format of key-value pairs that every language can parse:
        </p>
        <pre><code>{CODE.json}</code></pre>
        <p>
          This is the backbone of the modern web: a front-end fetches JSON from an API, a
          mobile app hits the same API, and a data pipeline pulls from it too. One
          well-designed API serves them all — which is exactly why "data on the web" and
          "analytics" increasingly share the same plumbing.
        </p>
      </KSection>

      <KSection id="stack" eyebrow="06" title="The full stack">
        <p>
          Put it together and you have the <Term>full stack</Term> — the layers a request
          passes through, top to bottom:
        </p>
        <ul>
          <li>
            <Term>Front-end</Term> (the browser) — HTML/CSS/JS, what the user sees and
            touches.
          </li>
          <li>
            <Term>Back-end</Term> (the server) — the application logic: authentication,
            business rules, building responses, calling the database.
          </li>
          <li>
            <Term>Database</Term> — where data persists, queried with{" "}
            <Link href="/knowledge/database-systems">SQL</Link>. The bottom of the stack.
          </li>
        </ul>
        <p>
          A "full-stack" developer works across all three. The flow is always the same
          loop from section 01: the browser requests, the back-end runs logic and asks the
          database, and a response travels back up the stack to the screen. Every web
          application, however large, is variations on this theme.
        </p>
      </KSection>

      <KSection id="security" eyebrow="07" title="Web security basics">
        <p>
          The web is public, so a few security ideas are non-negotiable — and they're
          exactly the ones that matter when the data is sensitive:
        </p>
        <ul>
          <li>
            <Term>HTTPS</Term> — HTTP encrypted with TLS, so traffic can't be read or
            tampered with in transit. The padlock. Non-optional today.
          </li>
          <li>
            <Term>Same-origin policy</Term> — the browser stops a page from one site
            reading data from another, the fundamental wall between sites.
          </li>
          <li>
            <Term>Never trust the client</Term> — anything sent from the browser can be
            faked, so the server must always re-validate. The classic attacks (SQL
            injection, cross-site scripting) all come from treating user input as trusted.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The one rule under all of it: <strong>the browser is hostile territory</strong>.
            Anything you send to it is visible, anything it sends back can be forged. So
            secrets stay on the server, and every input is validated server-side as if it
            were an attack — because sometimes it is. In government and health data work,
            that mindset isn't paranoia, it's the baseline.
          </p>
        </Callout>
      </KSection>

      <KSection id="thissite" eyebrow="08" title="How this site works">
        <p>
          A concrete example: the page you're reading. <Link href="/">rin.contact</Link>{" "}
          is built with <Term>Next.js</Term> (a React framework). The content is written
          as components; Next renders them to HTML <em>on the server</em> for a fast,
          search-friendly first load, then hydrates so JavaScript handles the interactive
          bits — dark mode, the language toggle, navigation. The maths on the knowledge
          pages is rendered to HTML by KaTeX; the whole site deploys automatically when
          code is pushed, through a CI pipeline that lint-checks it first. Every concept on
          this page is doing its job right now to show you this one.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From data to something people can use">
          <p>
            Web technology is how analysis becomes something people actually touch. I{" "}
            <strong>built this site</strong> and its tooling end to end, and the same
            skills turn a model or a dataset into a <strong>dashboard</strong> a
            stakeholder can explore rather than a static chart in a slide. Knowing the{" "}
            <strong>request-response</strong> cycle and <strong>REST APIs</strong> is also
            what lets me pull <strong>data from the web</strong> reliably — the scrapers
            and API integrations behind several of my projects are just this page applied
            in reverse.
          </p>
          <p>
            And it's the natural bridge from the{" "}
            <Link href="/knowledge/database-systems">database</Link> layer to the people
            who need the answers: the back-end queries the data, the front-end makes it
            usable, and the security mindset keeps it safe. For a data person, web fluency
            is the difference between handing over a file and shipping a tool.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The web is a <strong>request-response</strong> conversation between a client
              (browser) and server: DNS → request → server work → response.
            </li>
            <li>
              <strong>HTTP</strong> is the protocol — methods (GET/POST/PUT/DELETE), status
              codes (200/404/500), and it's <strong>stateless</strong> (cookies/tokens add
              memory).
            </li>
            <li>
              The <strong>front-end triad</strong>: HTML (structure) · CSS (presentation) ·
              JavaScript (behaviour), parsed into the <strong>DOM</strong> the browser
              renders.
            </li>
            <li>
              <strong>Server vs client rendering</strong> is a trade-off (speed/SEO vs
              interactivity); modern frameworks do both (render + hydrate).
            </li>
            <li>
              <strong>APIs</strong> let programs talk: REST endpoints + HTTP verbs,
              exchanging <strong>JSON</strong>. The <strong>full stack</strong> = front-end
              → back-end → database.
            </li>
            <li>
              Security: <strong>HTTPS</strong>, same-origin policy, and{" "}
              <strong>never trust the client</strong> — validate every input server-side.
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
        这一页恰好就是一个网页——所以正好借此解释你正用来阅读它的那个东西。Web 可能感觉像
        魔法，但其底下是一小撮清晰的想法：两台计算机之间的一场对话、为这场对话立的一套协议，
        以及构建你所见之物的三种语言。理解了它们，整个技术栈就不再神秘。
      </p>
      <p>
        它也是我在墨尔本最拿手的应用科目，是{" "}
        <Link href="/knowledge/database-systems">数据层</Link>之下的地基，每一个仪表板、API
        和应用——包括这个网站——都建立其上。下面是从头讲起的 Web。
      </p>

      <KSection id="requestresponse" eyebrow="01" title="Web 就是请求与响应">
        <p>
          Web 上的一切都是<Term>客户端</Term>（你的浏览器）与<Term>服务器</Term>（存放网站的
          一台计算机）之间的对话。客户端发问，服务器作答——这单一的<Term>请求-响应</Term>循环
          是整个 Web 的心跳。输入一个地址、按下回车，在不到一秒里就发生了相当多的事：
        </p>
        <ol>
          <li>
            <Term>DNS 查询</Term>——人类友好的名字（<code>rin.contact</code>）被翻译成一个
            数字 <Term>IP 地址</Term>，相当于 Web 的电话号码。
          </li>
          <li>
            <Term>请求</Term>——你的浏览器打开一个连接，发出一个 HTTP 请求：「请把这个页面
            给我。」
          </li>
          <li>
            <Term>服务器处理</Term>——服务器处理它，也许会查询一个数据库，并构建一个响应。
          </li>
          <li>
            <Term>响应</Term>——它把内容（HTML、数据、一张图片）连同一个状态码送回，你的
            浏览器把它渲染出来。
          </li>
        </ol>

        <RoundTripFigure
          caption="请求-响应的往返。一次点击变成一次 DNS 查询、一个发往服务器的 HTTP 请求、可选的数据库处理，以及一个被浏览器渲染的响应。每一次页面加载都是这个循环。"
          ariaLabel="一条从浏览器到服务器再到数据库并返回的流程：浏览器向服务器发出 HTTP 请求，服务器查询数据库，一个响应返回浏览器。"
          browser="浏览器"
          server="服务器"
          database="数据库"
          request="请求"
          query="查询"
          rows="行"
          response="响应"
        />
      </KSection>

      <KSection id="http" eyebrow="02" title="HTTP：协议">
        <p>
          <Term>HTTP</Term>（超文本传输协议）是那场对话约定好的语言——规定请求与响应如何
          格式化的规则。一个请求会指明一个<Term>方法</Term>（动词）和一个路径，外加若干头部：
        </p>
        <pre><code>{CODE.http}</code></pre>
        <p>这些方法对应你能对一个资源做的事：</p>
        <ul>
          <li><Term>GET</Term>——读取某物（加载一个页面）。绝不应改变数据。</li>
          <li><Term>POST</Term>——创建某物（提交一个表单）。</li>
          <li><Term>PUT / PATCH</Term>——更新某物。</li>
          <li><Term>DELETE</Term>——移除某物。</li>
        </ul>
        <p>
          每个响应都带着一个<Term>状态码</Term>——那个说明结果如何的三位数：<code>200</code>{" "}
          成功、<code>301/302</code> 重定向、<code>404</code> 未找到、<code>403</code> 禁止、
          <code>500</code> 服务器错误。（如果你读过{" "}
          <Link href="/knowledge">本站的链接检查</Link>，它们验证的正是这个。）关键在于，
          HTTP 是<Term>无状态</Term>的：每个请求各自独立，服务器默认在它们之间什么都不记得。
          让你跨页面保持登录是搭在其上的一层——cookie 与令牌随每个请求重新发送你的身份。
        </p>
      </KSection>

      <KSection id="triad" eyebrow="03" title="前端三件套">
        <p>
          对于一个页面，服务器送回的东西由三种分工清晰的语言构建——这种分离值得内化，因为它
          是一切前端工作的心智模型：
        </p>
        <ul>
          <li>
            <Term>HTML</Term>——<em>结构与内容</em>。标题、段落、列表、链接；骨架。它是一棵
            嵌套标签的树。
          </li>
          <li>
            <Term>CSS</Term>——<em>呈现</em>。颜色、字体、间距、布局——关乎结构看起来如何的
            一切。
          </li>
          <li>
            <Term>JavaScript</Term>——<em>行为</em>。唯一作为程序运行的那个：它响应点击、获取
            新数据、并实时改变页面。
          </li>
        </ul>
        <pre><code>{CODE.html}</code></pre>
        <p>
          浏览器把那段 HTML 解析成 <Term>DOM</Term>（文档对象模型）——一棵代表页面的、活的、
          驻留内存的对象树。CSS 为 DOM 设定样式；JavaScript 读取并改写它。当一个页面不重新
          加载就更新时，那就是 JavaScript 在改动 DOM。把结构／呈现／行为这一分工保持清晰，
          正是让一个网站可维护的关键。
        </p>
      </KSection>

      <KSection id="clientserver" eyebrow="04" title="客户端 vs 服务器">
        <p>
          Web 架构中最深的问题是<em>工作在哪里发生</em>——在页面送出之前于服务器上，还是在
          那之后于浏览器里。这是一个真正的权衡，而非已有定论的答案：
        </p>
        <ul>
          <li>
            <Term>服务器端渲染</Term>——服务器构建好成品 HTML，送出时即可显示。首次绘制快，
            搜索引擎也能看到真实内容。（本页就是这样渲染的。）
          </li>
          <li>
            <Term>客户端渲染</Term>——服务器送出一个近乎空壳外加 JavaScript，由浏览器构建
            页面。交互更丰富，但首次加载更慢，若做得草率则对 SEO 不利。
          </li>
        </ul>
        <p>
          现代框架把两者糅合：首次加载在服务器渲染，然后「水合」（hydrate），让 JavaScript
          接管交互。知道哪段代码在哪里运行——以及浏览器里的任何东西用户都看得见、改得了，
          所以绝不能托付给它任何秘密——正是 Web 工作的核心能力。
        </p>
      </KSection>

      <KSection id="apis" eyebrow="05" title="API 与 JSON">
        <p>
          页面是给人看的；<Term>API</Term> 则是程序之间在 Web 上彼此交谈的方式。一个 API 是
          一组定义好的 URL（<Term>端点</Term>），客户端可以调用它们来获取或改变数据——同样的
          HTTP 方法，但响应是结构化的数据而非一个页面。主流风格是 <Term>REST</Term>：把一切
          建模为位于干净 URL 上的资源，并对它们使用 HTTP 动词（<code>GET /users/42</code>{" "}
          读取用户 42，<code>DELETE /users/42</code> 移除他们）。
        </p>
        <p>
          回流的数据几乎总是 <Term>JSON</Term>——一种简单、人类可读的键值对格式，每种语言都能
          解析它：
        </p>
        <pre><code>{CODE.json}</code></pre>
        <p>
          这是现代 Web 的骨干：一个前端从 API 获取 JSON，一个手机应用访问同一个 API，一条
          数据管线也从它拉取。一个设计良好的 API 服务于它们所有——这正是为什么「Web 上的
          数据」与「分析」越来越共用同一套管道。
        </p>
      </KSection>

      <KSection id="stack" eyebrow="06" title="全栈">
        <p>
          把它们拼起来，你就有了<Term>全栈</Term>——一个请求自上而下穿过的各层：
        </p>
        <ul>
          <li>
            <Term>前端</Term>（浏览器）——HTML/CSS/JS，用户看到并触碰的东西。
          </li>
          <li>
            <Term>后端</Term>（服务器）——应用逻辑：认证、业务规则、构建响应、调用数据库。
          </li>
          <li>
            <Term>数据库</Term>——数据持久存放之处，用{" "}
            <Link href="/knowledge/database-systems">SQL</Link> 查询。栈的最底层。
          </li>
        </ul>
        <p>
          一个「全栈」开发者跨这三层工作。流程始终是第 01 节里那同一个循环：浏览器发出请求，
          后端运行逻辑并询问数据库，一个响应沿栈向上回到屏幕。每一个 Web 应用，无论多大，都是
          这一主题的变奏。
        </p>
      </KSection>

      <KSection id="security" eyebrow="07" title="Web 安全基础">
        <p>
          Web 是公开的，所以有几条安全观念没有商量余地——而当数据敏感时，要紧的正是它们：
        </p>
        <ul>
          <li>
            <Term>HTTPS</Term>——用 TLS 加密的 HTTP，使流量在传输途中无法被读取或篡改。那把
            小锁。今天没有不用的余地。
          </li>
          <li>
            <Term>同源策略</Term>——浏览器阻止一个站点的页面读取另一个站点的数据，是站点之间
            最根本的那道墙。
          </li>
          <li>
            <Term>永远不要相信客户端</Term>——任何从浏览器发来的东西都可能是伪造的，所以
            服务器必须始终重新校验。那些经典的攻击（SQL 注入、跨站脚本）全都源于把用户输入
            当作可信。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            贯穿这一切的那一条规则：<strong>浏览器是敌方领地</strong>。你送给它的任何东西都
            可见，它送回的任何东西都可能被伪造。所以秘密留在服务器上，每一个输入都在服务器端
            被当作一次攻击来校验——因为有时它确实是。在政府与健康数据的工作里，那种心态不是
            多疑，而是底线。
          </p>
        </Callout>
      </KSection>

      <KSection id="thissite" eyebrow="08" title="这个网站如何运作">
        <p>
          一个具体的例子：你正在读的这个页面。<Link href="/">rin.contact</Link> 用{" "}
          <Term>Next.js</Term>（一个 React 框架）构建。内容写成组件；Next 把它们<em>在服务器
          上</em>渲染成 HTML，以求一次快速、对搜索友好的首次加载，然后水合，让 JavaScript
          处理交互的部分——深色模式、语言切换、导航。知识页上的数学由 KaTeX 渲染成 HTML；
          整个网站在代码推送时自动部署，经由一条先做 lint 检查的 CI 管线。本页上的每一个
          概念，此刻都在各司其职，把这一页展示给你。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="从数据到人们用得上的东西">
          <p>
            Web 技术是分析变成人们真正能触碰之物的途径。我<strong>端到端地构建了这个网站
            </strong>及其工具，同样的技能把一个模型或一个数据集变成利益相关方能探索的
            <strong>仪表板</strong>，而不是幻灯片里一张静态图表。懂得<strong>请求-响应
            </strong>循环与 <strong>REST API</strong>，也正是让我能可靠地<strong>从 Web 拉取
            数据</strong>的本事——我好几个项目背后的爬虫与 API 集成，不过是这一页反过来应用。
          </p>
          <p>
            而它是从<Link href="/knowledge/database-systems">数据库</Link>层通往需要答案的
            人们的天然桥梁：后端查询数据，前端让它可用，安全心态让它安全。对一个做数据的人而
            言，Web 上的熟练与否，就是「递出一个文件」与「交付一个工具」之间的区别。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Web 是客户端（浏览器）与服务器之间的一场<strong>请求-响应</strong>对话：DNS →
              请求 → 服务器处理 → 响应。
            </li>
            <li>
              <strong>HTTP</strong> 是协议——方法（GET/POST/PUT/DELETE）、状态码
              （200/404/500），而且它是<strong>无状态</strong>的（cookie／令牌添上记忆）。
            </li>
            <li>
              <strong>前端三件套</strong>：HTML（结构）· CSS（呈现）· JavaScript（行为），
              被解析成浏览器渲染的 <strong>DOM</strong>。
            </li>
            <li>
              <strong>服务器 vs 客户端渲染</strong>是一个权衡（速度／SEO vs 交互性）；现代
              框架两者都做（渲染 + 水合）。
            </li>
            <li>
              <strong>API</strong> 让程序交谈：REST 端点 + HTTP 动词，交换 <strong>JSON
              </strong>。<strong>全栈</strong> = 前端 → 后端 → 数据库。
            </li>
            <li>
              安全：<strong>HTTPS</strong>、同源策略，以及<strong>永远不要相信客户端</strong>
              ——每一个输入都在服务器端校验。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Web Information Technology",
    subtitle:
      "How the web actually works — the request that travels from a click to a server and back, and the handful of technologies that turn it into the page you're reading right now.",
    description:
      "A thorough, first-principles explainer of web information technology — the client/server request-response cycle, HTTP, the HTML/CSS/JS front-end triad and the DOM, client vs server rendering, REST APIs and JSON, the full stack down to the database, and web security basics. Foundation tier, anchored to Rin Huang's UniMelb degree (82/H1) — and to this very site.",
    course: "Web Information Technology",
    courseCode: "Bachelor of Science · Data Science core (82/H1)",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Built rin.contact · dashboards",
    readingTime: "~15 min read",
    sections: [
      { id: "requestresponse", label: "The web is request and response" },
      { id: "http", label: "HTTP: the protocol" },
      { id: "triad", label: "The front-end triad" },
      { id: "clientserver", label: "Client vs server" },
      { id: "apis", label: "APIs and JSON" },
      { id: "stack", label: "The full stack" },
      { id: "security", label: "Web security basics" },
      { id: "thissite", label: "How this site works" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "Web 信息技术",
    subtitle:
      "Web 究竟如何运作——从一次点击出发、抵达服务器再返回的那个请求，以及把它变成你此刻正在阅读的页面的那一小撮技术。",
    description:
      "对 Web 信息技术的详尽、第一性原理式讲解——客户端/服务器的请求-响应循环、HTTP、HTML/CSS/JS 前端三件套与 DOM、客户端 vs 服务器渲染、REST API 与 JSON、从前端一路到数据库的全栈，以及 Web 安全基础。基础层，锚定 Rin Huang 的墨尔本大学学位（82/H1）——也锚定这个网站本身。",
    course: "Web 信息技术",
    courseCode: "理学学士 · 数据科学核心（82/H1）",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "构建 rin.contact · 仪表板",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "requestresponse", label: "Web 就是请求与响应" },
      { id: "http", label: "HTTP：协议" },
      { id: "triad", label: "前端三件套" },
      { id: "clientserver", label: "客户端 vs 服务器" },
      { id: "apis", label: "API 与 JSON" },
      { id: "stack", label: "全栈" },
      { id: "security", label: "Web 安全基础" },
      { id: "thissite", label: "这个网站如何运作" },
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
  return { slug: "web-information-technology", updated: "2026-06-25", ...meta, Body };
}
