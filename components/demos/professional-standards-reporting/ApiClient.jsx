/**
 * ApiClient: the second half of the concept demo. A toy client over a
 * synthetic OpenAPI-style catalogue (./catalogue.js) of made-up, generic
 * endpoints. The visitor searches and filters the catalogue, picks an
 * endpoint, fills in its parameters and sees the Python a person would write,
 * both through the generated method and through the one generic call. Run
 * checks the values against the catalogue first, then shows a simulated
 * response made up in the browser. Nothing is sent anywhere.
 *
 * Accessibility: native inputs, selects, radios and buttons only. Results are
 * a short list of toggle buttons (aria-pressed) with a Show more button, so the
 * tab order stays short. Parameter errors are tied to their fields with
 * aria-describedby, and a status line reads out the result of each run.
 */
import { useId, useMemo, useState } from "react";
import { fill } from "@/lib/fill";
import { DEMO } from "@/lib/demos/professional-standards-reporting-data";
import {
  buildCatalogue,
  genericCall,
  GROUPS,
  METHODS,
  pythonBody,
  pythonCall,
  resolvePath,
  RESOURCE_COUNT,
  simulate,
  validate,
} from "./catalogue";
import { BTN, BTN_SOLID, Code, FIELD, FOCUS, META, RadioPills, Select } from "./ui";

const A = DEMO.api;
const CATALOGUE = buildCatalogue();
const BY_ID = Object.fromEntries(CATALOGUE.map((e) => [e.id, e]));
const PAGE = 8;
const FIRST = "get_record";

const words = (s) => s.replace(/-/g, " ");
const summaryOf = (e, lang) =>
  fill(A.summaries[e.kind][lang], {
    res: e.resource,
    one: words(e.one),
    child: e.child || "",
    childOne: e.childOne ? words(e.childOne) : "",
  });

// Search text for each endpoint, in both languages, built once.
const HAYSTACK = Object.fromEntries(
  CATALOGUE.map((e) => [
    e.id,
    `${e.method} ${e.path} ${e.id} ${summaryOf(e, "en")} ${summaryOf(e, "zh")}`.toLowerCase(),
  ])
);

// Sample path values, so a picked endpoint can run straight away.
const pathDefaults = (e) =>
  Object.fromEntries(
    e.params.filter((p) => p.in === "path").map((p, i) => [p.name, i === 0 ? "42" : "7"])
  );

function MethodBadge({ method }) {
  return (
    <span className="inline-block w-[54px] shrink-0 rounded-sm border border-[#BDBDBD] dark:border-[#595959] py-0.5 text-center font-mono text-[10px] tracking-wider text-[#1A1A1A] dark:text-[#EEEEEE]">
      {method}
    </span>
  );
}

export default function ApiClient({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();

  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("ALL");
  const [group, setGroup] = useState("all");
  const [limit, setLimit] = useState(PAGE);
  const [selectedId, setSelectedId] = useState(FIRST);
  const [values, setValues] = useState({ [FIRST]: pathDefaults(BY_ID[FIRST]) });
  const [result, setResult] = useState(null);

  const matches = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return CATALOGUE.filter(
      (e) =>
        (method === "ALL" || e.method === method) &&
        (group === "all" || e.group === group) &&
        tokens.every((t) => HAYSTACK[e.id].includes(t))
    );
  }, [query, method, group]);

  const filterChange = (fn) => (v) => {
    fn(v);
    setLimit(PAGE);
  };

  const endpoint = BY_ID[selectedId];
  const current = values[selectedId] || {};
  const { args } = validate(endpoint, current);
  const errors = result?.errors || [];
  const errorFor = (name) => errors.find((e) => e.name === name);

  const pick = (id) => {
    setSelectedId(id);
    setResult(null);
    setValues((v) => (v[id] ? v : { ...v, [id]: pathDefaults(BY_ID[id]) }));
  };

  const setValue = (name, value) => {
    setValues((v) => ({ ...v, [selectedId]: { ...(v[selectedId] || {}), [name]: value } }));
  };

  const run = () => {
    const checked = validate(endpoint, current);
    if (checked.errors.length) {
      setResult({ errors: checked.errors });
      return;
    }
    const res = simulate(endpoint, checked.args);
    setResult({ ...res, path: resolvePath(endpoint, checked.args), errors: [] });
  };

  const errorText = (e) => fill(L(A.errors[e.code]), { name: e.name, limit: e.limit });
  const paramMeta = (p) =>
    [
      p.in === "path" ? L(A.inPath) : L(A.inQuery),
      p.in === "path" ? L(A.required) : L(A.optional),
      p.enum
        ? fill(L(A.oneOf), { values: p.enum.join(" / ") })
        : p.type === "integer"
          ? L(A.integer)
          : L(A.text),
      p.max !== undefined ? fill(L(A.upTo), { n: p.max }) : null,
    ]
      .filter(Boolean)
      .join(" · ");

  let statusLine = "";
  if (result && result.errors.length) {
    statusLine =
      result.errors.length === 1
        ? L(A.failedOne)
        : fill(L(A.failedMany), { n: result.errors.length });
  } else if (result) {
    statusLine = fill(L(A.ran), {
      method: endpoint.method,
      path: result.path,
      status: result.status,
    });
  }

  const shown = matches.slice(0, limit);
  const left = matches.length - shown.length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed max-w-[680px]">
        {fill(L(A.intro), { endpoints: CATALOGUE.length, resources: RESOURCE_COUNT })}
      </p>

      <dl className="grid grid-cols-3 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden max-w-[540px]">
        {[
          [L(A.stats.endpoints), CATALOGUE.length],
          [L(A.stats.resources), RESOURCE_COUNT],
          [L(A.stats.wrappers), 0],
        ].map(([k, v]) => (
          <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-3 min-w-0">
            <dt className={`${META} mb-1`}>{k}</dt>
            <dd className="font-display text-2xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE]">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <Code label={L(A.setup)}>
        {`${L(A.setupComment)}\nfrom demo_client import Client\n\nclient = Client.from_spec("demo-catalogue.json")`}
      </Code>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Find an endpoint */}
        <div className="min-w-0 space-y-4">
          <div>
            <label htmlFor={`${uid}-q`} className={`${META} block mb-2`}>
              {L(A.search)}
            </label>
            <input
              id={`${uid}-q`}
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              placeholder={L(A.searchHint)}
              onChange={(e) => filterChange(setQuery)(e.target.value)}
              className={FIELD}
            />
          </div>
          <RadioPills
            legend={L(A.method)}
            name={`${uid}-method`}
            value={method}
            onChange={filterChange(setMethod)}
            options={[
              { value: "ALL", label: L(A.all) },
              ...METHODS.map((m) => ({ value: m, label: m })),
            ]}
          />
          <Select
            id={`${uid}-group`}
            label={L(A.group)}
            value={group}
            onChange={filterChange(setGroup)}
            options={[
              { value: "all", label: L(A.allGroups) },
              ...GROUPS.map((g) => ({ value: g, label: L(A.groups[g]) })),
            ]}
          />

          <div>
            <h4 id={`${uid}-results`} className={`${META} mb-2`}>
              {L(A.results)}
            </h4>
            <p className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-2" aria-live="polite">
              {matches.length
                ? fill(L(A.showing), { n: shown.length, total: matches.length })
                : L(A.noMatch)}
            </p>
            <ul aria-labelledby={`${uid}-results`} className="space-y-1.5">
              {shown.map((e) => {
                const on = e.id === selectedId;
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => pick(e.id)}
                      className={`w-full text-left flex items-start gap-2.5 rounded-md border px-2.5 py-2 transition-colors duration-150 motion-reduce:transition-none ${FOCUS} ${
                        on
                          ? "border-[#1A1A1A] bg-[#F5F5F5] dark:border-[#EEEEEE] dark:bg-[#161616]"
                          : "border-[#F0F0F0] hover:border-[#BDBDBD] dark:border-[#262626] dark:hover:border-[#595959]"
                      }`}
                    >
                      <MethodBadge method={e.method} />
                      <span className="min-w-0">
                        <span className="block font-mono text-xs text-[#1A1A1A] dark:text-[#EEEEEE] break-all">
                          {e.path}
                        </span>
                        <span className="block text-xs text-[#595959] dark:text-[#9A9A9A] break-words">
                          {summaryOf(e, lang)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {left > 0 && (
              <button
                type="button"
                className={`${BTN} mt-3`}
                onClick={() => setLimit((n) => n + PAGE)}
              >
                {fill(L(A.more), { n: Math.min(PAGE, left) })}
              </button>
            )}
          </div>
        </div>

        {/* The picked endpoint */}
        <section
          aria-labelledby={`${uid}-selected`}
          className="min-w-0 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg p-4 md:p-5 space-y-5"
        >
          <div>
            <h4 id={`${uid}-selected`} className={`${META} mb-2`}>
              {L(A.selected)}
            </h4>
            <p className="flex items-start gap-2.5">
              <MethodBadge method={endpoint.method} />
              <span className="min-w-0 font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE] break-all">
                {endpoint.path}
              </span>
            </p>
            <p className="mt-1.5 text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">
              {summaryOf(endpoint, lang)} ·{" "}
              <span className="font-mono text-xs break-all">{endpoint.id}</span>
            </p>
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
            className="space-y-5"
          >
            <fieldset className="min-w-0">
              <legend className={`${META} mb-2`}>{L(A.params)}</legend>
              {endpoint.params.length === 0 ? (
                <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(A.noParams)}</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {endpoint.params.map((p) => {
                    const id = `${uid}-p-${p.name}`;
                    const err = errorFor(p.name);
                    const hint = `${id}-hint`;
                    const errId = `${id}-err`;
                    return (
                      <div key={p.name} className="min-w-0">
                        <label htmlFor={id} className="block mb-1">
                          <span className="font-mono text-xs text-[#1A1A1A] dark:text-[#EEEEEE]">
                            {p.name}
                          </span>
                        </label>
                        {p.enum ? (
                          <select
                            id={id}
                            value={current[p.name] || ""}
                            onChange={(e) => setValue(p.name, e.target.value)}
                            aria-describedby={err ? `${hint} ${errId}` : hint}
                            aria-invalid={!!err}
                            className={FIELD}
                          >
                            <option value="">–</option>
                            {p.enum.map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={id}
                            type="text"
                            inputMode={p.type === "integer" ? "numeric" : "text"}
                            autoComplete="off"
                            spellCheck={false}
                            value={current[p.name] || ""}
                            onChange={(e) => setValue(p.name, e.target.value)}
                            aria-describedby={err ? `${hint} ${errId}` : hint}
                            aria-invalid={!!err}
                            className={`${FIELD} font-mono`}
                          />
                        )}
                        <p
                          id={hint}
                          className="mt-1 text-[11px] text-[#595959] dark:text-[#9A9A9A]"
                        >
                          {paramMeta(p)}
                        </p>
                        {err && (
                          <p
                            id={errId}
                            className="mt-0.5 text-xs text-[#CC0000] dark:text-[#FF6B6B]"
                          >
                            {errorText(err)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </fieldset>

            <div className="space-y-3">
              {endpoint.body && <Code label={L(A.python)}>{pythonBody(endpoint)}</Code>}
              <Code label={endpoint.body ? null : L(A.python)}>{pythonCall(endpoint, args)}</Code>
              <Code label={L(A.generic)}>{genericCall(endpoint, args)}</Code>
            </div>

            <button type="submit" className={BTN_SOLID}>
              {L(A.run)} →
            </button>
          </form>

          <div>
            <h4 className={`${META} mb-2`}>{L(A.response)}</h4>
            <p
              role="status"
              className="text-xs text-[#1A1A1A] dark:text-[#EEEEEE] min-h-[1rem] mb-2"
            >
              {statusLine}
            </p>
            {!result && <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(A.before)}</p>}
            {result && result.errors.length > 0 && (
              <div className="border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-3 space-y-1">
                <ul className="space-y-1">
                  {result.errors.map((e) => (
                    <li key={e.name} className="text-sm text-[#CC0000] dark:text-[#FF6B6B]">
                      {errorText(e)}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#595959] dark:text-[#9A9A9A]">{L(A.blocked)}</p>
              </div>
            )}
            {result && result.errors.length === 0 && (
              <div
                role="region"
                aria-label={L(A.response)}
                tabIndex={0}
                className={`max-h-72 overflow-auto rounded-md border border-[#F0F0F0] dark:border-[#262626] bg-[#F5F5F5] dark:bg-[#141414] ${FOCUS}`}
              >
                <pre className="px-3 py-2.5 font-mono text-xs leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE] whitespace-pre-wrap break-all">
                  <code>
                    {`HTTP ${result.status}\n\n${
                      result.body === null ? L(A.noContent) : JSON.stringify(result.body, null, 2)
                    }`}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
