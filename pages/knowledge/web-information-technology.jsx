import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
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
];

export default function WebInformationTechnologyKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="web-information-technology"
      title="Web Information Technology"
      subtitle="How the web actually works — the request that travels from a click to a server and back, and the handful of technologies that turn it into the page you're reading right now."
      description="A thorough, first-principles explainer of web information technology — the client/server request-response cycle, HTTP, the HTML/CSS/JS front-end triad and the DOM, client vs server rendering, REST APIs and JSON, the full stack down to the database, and web security basics. Foundation tier, anchored to Rin Huang's UniMelb degree (82/H1) — and to this very site."
      course="Web Information Technology"
      courseCode="Bachelor of Science · Data Science core (82/H1)"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Built rin.contact · dashboards"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        This page is, fittingly, a web page — so it's a chance to explain the thing
        you're using to read it. The web can feel like magic, but underneath it's a
        small set of clear ideas: a conversation between two computers, a protocol for
        that conversation, and three languages that build what you see. Understand
        those and the whole stack stops being mysterious.
      </p>
      <p>
        It's also my strongest applied subject from Melbourne, and the foundation under{" "}
        <Link href="/knowledge/database-systems">the data layer</Link> that every
        dashboard, API, and app — including this site — is built on. Here's the web
        from the ground up.
      </p>

      <KSection id="requestresponse" eyebrow="01" title="The web is request and response">
        <p>
          Everything on the web is a conversation between a <Term>client</Term> (your
          browser) and a <Term>server</Term> (a computer holding the website). The
          client asks, the server answers — that single <Term>request-response</Term>{" "}
          cycle is the heartbeat of the entire web. Type an address and hit enter, and a
          remarkable amount happens in a fraction of a second:
        </p>
        <ol>
          <li>
            <Term>DNS lookup</Term> — the human-friendly name (<code>rin.contact</code>)
            is translated into a numeric <Term>IP address</Term>, the web's equivalent
            of a phone number.
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
            <Term>Response</Term> — it sends back the content (HTML, data, an image)
            with a status code, and your browser renders it.
          </li>
        </ol>

        <Figure caption="The request-response round-trip. A click becomes a DNS lookup, an HTTP request to the server, optional database work, and a response the browser renders. Every page load is this loop.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A flow from Browser to Server to Database and back: the browser sends an HTTP request to the server, the server queries the database, and a response returns to the browser."
          >
            <rect x="14" y="55" width="92" height="40" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="60" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">browser</text>
            <rect x="174" y="55" width="92" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="220" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">server</text>
            <rect x="334" y="55" width="92" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="380" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">database</text>
            {/* request */}
            <line x1="106" y1="68" x2="172" y2="68" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#web-ah)" />
            <text x="139" y="61" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">request</text>
            <line x1="266" y1="68" x2="332" y2="68" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#web-ah2)" />
            <text x="299" y="61" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">query</text>
            {/* response */}
            <line x1="332" y1="84" x2="266" y2="84" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#web-ah2)" />
            <text x="299" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.75">rows</text>
            <line x1="172" y1="84" x2="106" y2="84" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#web-ah)" />
            <text x="139" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">response</text>
            <defs>
              <marker id="web-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
              <marker id="web-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="http" eyebrow="02" title="HTTP: the protocol">
        <p>
          <Term>HTTP</Term> (HyperText Transfer Protocol) is the agreed language of
          that conversation — the rules for how a request and response are formatted. A
          request names a <Term>method</Term> (the verb) and a path, plus headers:
        </p>
        <pre><code>{`GET /knowledge/ HTTP/1.1
Host: rin.contact
Accept: text/html`}</code></pre>
        <p>The methods map to the things you can do with a resource:</p>
        <ul>
          <li><Term>GET</Term> — read something (load a page). Should never change data.</li>
          <li><Term>POST</Term> — create something (submit a form).</li>
          <li><Term>PUT / PATCH</Term> — update something.</li>
          <li><Term>DELETE</Term> — remove something.</li>
        </ul>
        <p>
          Every response carries a <Term>status code</Term> — the three-digit number
          that says how it went: <code>200</code> OK, <code>301/302</code> redirect,{" "}
          <code>404</code> not found, <code>403</code> forbidden, <code>500</code>{" "}
          server error. (If you've read the{" "}
          <Link href="/knowledge">site's link checks</Link>, that's exactly what they
          verify.) Crucially, HTTP is <Term>stateless</Term>: each request stands
          alone, the server remembers nothing between them by default. Keeping you
          logged in across pages is a layer built on top — cookies and tokens that
          re-send your identity with every request.
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
            <Term>HTML</Term> — the <em>structure and content</em>. Headings,
            paragraphs, lists, links; the skeleton. It's a tree of nested tags.
          </li>
          <li>
            <Term>CSS</Term> — the <em>presentation</em>. Colours, fonts, spacing,
            layout — everything about how the structure looks.
          </li>
          <li>
            <Term>JavaScript</Term> — the <em>behaviour</em>. The only one that runs as
            a program: it responds to clicks, fetches new data, and changes the page
            live.
          </li>
        </ul>
        <pre><code>{`<article>
  <h1>Web Information Technology</h1>
  <p>HTML is the structure.</p>
</article>`}</code></pre>
        <p>
          The browser parses that HTML into the <Term>DOM</Term> (Document Object
          Model) — a live, in-memory tree of objects representing the page. CSS styles
          the DOM; JavaScript reads and rewrites it. When a page updates without
          reloading, that's JavaScript mutating the DOM. Holding the
          structure/presentation/behaviour split clean is what keeps a site
          maintainable.
        </p>
      </KSection>

      <KSection id="clientserver" eyebrow="04" title="Client vs server">
        <p>
          The deepest question in web architecture is <em>where the work happens</em> —
          on the server before the page is sent, or in the browser after. It's a
          genuine trade-off, not a settled answer:
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
          where — and that anything in the browser is visible and editable by the user,
          so it can never be trusted with secrets — is the core competency of web work.
        </p>
      </KSection>

      <KSection id="apis" eyebrow="05" title="APIs and JSON">
        <p>
          Pages are for people; <Term>APIs</Term> are how programs talk to each other
          over the web. An API is a defined set of URLs (<Term>endpoints</Term>) a
          client can call to get or change data — the same HTTP methods, but the
          response is structured data rather than a page. The dominant style is{" "}
          <Term>REST</Term>: model everything as resources at clean URLs, and use the
          HTTP verbs on them (<code>GET /users/42</code> reads user 42,{" "}
          <code>DELETE /users/42</code> removes them).
        </p>
        <p>
          The data that flows back is almost always <Term>JSON</Term> — a simple,
          human-readable format of key-value pairs that every language can parse:
        </p>
        <pre><code>{`{
  "name": "Rin Huang",
  "role": "Senior Data Analyst",
  "skills": ["Python", "SQL", "Next.js"]
}`}</code></pre>
        <p>
          This is the backbone of the modern web: a front-end fetches JSON from an API,
          a mobile app hits the same API, and a data pipeline pulls from it too. One
          well-designed API serves them all — which is exactly why "data on the web"
          and "analytics" increasingly share the same plumbing.
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
          loop from section 01: the browser requests, the back-end runs logic and asks
          the database, and a response travels back up the stack to the screen. Every
          web application, however large, is variations on this theme.
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
            injection, cross-site scripting) all come from treating user input as
            trusted.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The one rule under all of it: <strong>the browser is hostile territory</strong>.
            Anything you send to it is visible, anything it sends back can be forged. So
            secrets stay on the server, and every input is validated server-side as if
            it were an attack — because sometimes it is. In government and health data
            work, that mindset isn't paranoia, it's the baseline.
          </p>
        </Callout>
      </KSection>

      <KSection id="thissite" eyebrow="08" title="How this site works">
        <p>
          A concrete example: the page you're reading. <Link href="/">rin.contact</Link>{" "}
          is built with <Term>Next.js</Term> (a React framework). The content is written
          as components; Next renders them to HTML <em>on the server</em> for a fast,
          search-friendly first load, then hydrates so JavaScript handles the
          interactive bits — dark mode, the language toggle, navigation. The maths on
          the knowledge pages is rendered to HTML by KaTeX; the whole site deploys
          automatically when code is pushed, through a CI pipeline that lint-checks it
          first. Every concept on this page is doing its job right now to show you this
          one.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From data to something people can use">
          <p>
            Web technology is how analysis becomes something people actually touch. I{" "}
            <strong>built this site</strong> and its tooling end to end, and the same
            skills turn a model or a dataset into a <strong>dashboard</strong> a
            stakeholder can explore rather than a static chart in a slide. Knowing the{" "}
            <strong>request-response</strong> cycle and <strong>REST APIs</strong> is
            also what lets me pull <strong>data from the web</strong> reliably — the
            scrapers and API integrations behind several of my projects are just this
            page applied in reverse.
          </p>
          <p>
            And it's the natural bridge from the <Link href="/knowledge/database-systems">database</Link>{" "}
            layer to the people who need the answers: the back-end queries the data, the
            front-end makes it usable, and the security mindset keeps it safe. For a data
            person, web fluency is the difference between handing over a file and shipping
            a tool.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The web is a <strong>request-response</strong> conversation between a
              client (browser) and server: DNS → request → server work → response.
            </li>
            <li>
              <strong>HTTP</strong> is the protocol — methods (GET/POST/PUT/DELETE),
              status codes (200/404/500), and it's <strong>stateless</strong> (cookies/tokens
              add memory).
            </li>
            <li>
              The <strong>front-end triad</strong>: HTML (structure) · CSS (presentation)
              · JavaScript (behaviour), parsed into the <strong>DOM</strong> the browser
              renders.
            </li>
            <li>
              <strong>Server vs client rendering</strong> is a trade-off (speed/SEO vs
              interactivity); modern frameworks do both (render + hydrate).
            </li>
            <li>
              <strong>APIs</strong> let programs talk: REST endpoints + HTTP verbs,
              exchanging <strong>JSON</strong>. The <strong>full stack</strong> =
              front-end → back-end → database.
            </li>
            <li>
              Security: <strong>HTTPS</strong>, same-origin policy, and{" "}
              <strong>never trust the client</strong> — validate every input server-side.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
