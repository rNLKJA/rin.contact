/**
 * A synthetic OpenAPI-style catalogue for the toy API client in the professional
 * standards reporting concept demo. Every resource name below is made up and
 * generic (records, tasks, documents and so on). None of them is an endpoint of
 * any real system.
 *
 * The catalogue is built from a short list of resources and a handful of
 * operation shapes, the way a real description file repeats the same patterns.
 * The client then turns each operation into a method, so the number of
 * endpoints it covers grows with the catalogue and not with hand-written code.
 */
import { mulberry32 } from "./stats";

// Generic resources, grouped the way a tag would group them in a description.
// `one` is the singular, used for the path parameter (record → record_id).
// Read-only resources only list, get, search and count.
const RESOURCES = [
  ["core", "records", "record"],
  ["core", "record-types", "record-type"],
  ["core", "categories", "category"],
  ["core", "tags", "tag"],
  ["core", "links", "link"],
  ["core", "locations", "location"],
  ["core", "outcomes", "outcome"],
  ["core", "forms", "form"],
  ["core", "form-fields", "form-field"],
  ["people", "contacts", "contact"],
  ["people", "organisations", "organisation"],
  ["people", "users", "user"],
  ["people", "teams", "team"],
  ["people", "roles", "role"],
  ["people", "permissions", "permission"],
  ["workflow", "tasks", "task"],
  ["workflow", "task-templates", "task-template"],
  ["workflow", "workflows", "workflow"],
  ["workflow", "workflow-steps", "workflow-step"],
  ["workflow", "reminders", "reminder"],
  ["workflow", "queues", "queue"],
  ["workflow", "notifications", "notification"],
  ["workflow", "calendars", "calendar"],
  ["documents", "documents", "document"],
  ["documents", "attachments", "attachment"],
  ["documents", "notes", "note"],
  ["documents", "comments", "comment"],
  ["documents", "templates", "template"],
  ["reporting", "reports", "report"],
  ["reporting", "report-schedules", "report-schedule"],
  ["reporting", "exports", "export"],
  ["reporting", "imports", "import"],
  ["reporting", "metrics", "metric", true],
  ["reporting", "dashboards", "dashboard"],
  ["admin", "audit-events", "audit-event", true],
  ["admin", "settings", "setting"],
  ["admin", "webhooks", "webhook"],
  ["admin", "jobs", "job"],
  ["admin", "lookups", "lookup", true],
  ["admin", "preferences", "preference"],
].map(([group, path, one, readOnly = false]) => ({ group, path, one, readOnly }));

// Child collections under a parent: /records/{record_id}/notes and so on.
const CHILDREN = {
  records: [
    ["notes", "note"],
    ["attachments", "attachment"],
    ["tasks", "task"],
    ["links", "link"],
    ["contacts", "contact"],
  ],
  tasks: [["comments", "comment"]],
  documents: [["versions", "version"]],
  teams: [["members", "member"]],
  workflows: [["transitions", "transition"]],
  reports: [["runs", "run"]],
};

export const GROUPS = ["core", "people", "workflow", "documents", "reporting", "admin"];
export const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const snake = (s) => s.replace(/-/g, "_");
const idParam = (one) => `${snake(one)}_id`;

const PAGE = { name: "page", in: "query", type: "integer", min: 1 };
const PAGE_SIZE = { name: "page_size", in: "query", type: "integer", min: 1, max: 100 };
const SORT = { name: "sort", in: "query", type: "string" };
const STATUS = { name: "status", in: "query", type: "string", enum: ["open", "pending", "closed"] };
const pathParam = (one) => ({ name: idParam(one), in: "path", type: "integer", min: 1 });

// Operation shapes. `kind` picks the summary template and the response shape.
const TOP_OPS = [
  { kind: "list", method: "GET", suffix: "", item: false, query: [PAGE, PAGE_SIZE, SORT, STATUS] },
  { kind: "create", method: "POST", suffix: "", item: false, body: true, write: true },
  { kind: "search", method: "POST", suffix: "/search", item: false, body: true, query: [PAGE] },
  { kind: "count", method: "GET", suffix: "/count", item: false, query: [STATUS] },
  { kind: "get", method: "GET", suffix: "", item: true },
  { kind: "replace", method: "PUT", suffix: "", item: true, body: true, write: true },
  { kind: "update", method: "PATCH", suffix: "", item: true, body: true, write: true },
  { kind: "delete", method: "DELETE", suffix: "", item: true, write: true },
  { kind: "history", method: "GET", suffix: "/history", item: true, query: [PAGE, PAGE_SIZE] },
];
const CHILD_OPS = [
  { kind: "childList", method: "GET", item: false, query: [PAGE, PAGE_SIZE] },
  { kind: "childCreate", method: "POST", item: false, body: true, write: true },
  { kind: "childGet", method: "GET", item: true },
  { kind: "childDelete", method: "DELETE", item: true, write: true },
];
const ACTION = {
  list: "list",
  create: "create",
  search: "search",
  count: "count",
  get: "get",
  replace: "replace",
  update: "update",
  delete: "delete",
  history: "history",
  childList: "list",
  childCreate: "create",
  childGet: "get",
  childDelete: "delete",
};
const OPERATION_ID = {
  list: (r) => `list_${snake(r.path)}`,
  create: (r) => `create_${snake(r.one)}`,
  search: (r) => `search_${snake(r.path)}`,
  count: (r) => `count_${snake(r.path)}`,
  get: (r) => `get_${snake(r.one)}`,
  replace: (r) => `replace_${snake(r.one)}`,
  update: (r) => `update_${snake(r.one)}`,
  delete: (r) => `delete_${snake(r.one)}`,
  history: (r) => `get_${snake(r.one)}_history`,
  childList: (r, c) => `list_${snake(r.one)}_${snake(c.path)}`,
  childCreate: (r, c) => `add_${snake(r.one)}_${snake(c.one)}`,
  childGet: (r, c) => `get_${snake(r.one)}_${snake(c.one)}`,
  childDelete: (r, c) => `remove_${snake(r.one)}_${snake(c.one)}`,
};
const READ_ONLY_KINDS = new Set(["list", "search", "count", "get"]);

/** Every endpoint in the synthetic catalogue, in a stable order. */
export function buildCatalogue() {
  const endpoints = [];
  for (const r of RESOURCES) {
    for (const op of TOP_OPS) {
      if (r.readOnly && !READ_ONLY_KINDS.has(op.kind)) continue;
      const params = [...(op.item ? [pathParam(r.one)] : []), ...(op.query || [])];
      endpoints.push({
        id: OPERATION_ID[op.kind](r),
        kind: op.kind,
        method: op.method,
        path: `/${r.path}${op.item ? `/{${idParam(r.one)}}` : ""}${op.suffix}`,
        group: r.group,
        resource: r.path,
        one: r.one,
        accessor: [snake(r.path)],
        action: ACTION[op.kind],
        params,
        body: !!op.body,
      });
    }
    for (const [cPath, cOne] of CHILDREN[r.path] || []) {
      const c = { path: cPath, one: cOne };
      for (const op of CHILD_OPS) {
        const params = [
          pathParam(r.one),
          ...(op.item ? [pathParam(cOne)] : []),
          ...(op.query || []),
        ];
        endpoints.push({
          id: OPERATION_ID[op.kind](r, c),
          kind: op.kind,
          method: op.method,
          path: `/${r.path}/{${idParam(r.one)}}/${cPath}${op.item ? `/{${idParam(cOne)}}` : ""}`,
          group: r.group,
          resource: r.path,
          one: r.one,
          child: cPath,
          childOne: cOne,
          accessor: [snake(r.path), snake(cPath)],
          action: ACTION[op.kind],
          params,
          body: !!op.body,
        });
      }
    }
  }
  return endpoints;
}

export const RESOURCE_COUNT = RESOURCES.length;

/**
 * Check the values typed for an endpoint against its parameters, the way the
 * client would before sending anything. Returns { args, errors }, where args
 * holds the parsed values that were given and errors lists { name, code }.
 */
export function validate(endpoint, values) {
  const args = {};
  const errors = [];
  for (const p of endpoint.params) {
    const raw = String(values[p.name] ?? "").trim();
    if (!raw) {
      if (p.in === "path") errors.push({ name: p.name, code: "required" });
      continue;
    }
    if (p.type === "integer") {
      if (!/^\d+$/.test(raw)) {
        errors.push({ name: p.name, code: "integer" });
        continue;
      }
      const n = Number(raw);
      if (p.min !== undefined && n < p.min) {
        errors.push({ name: p.name, code: "min", limit: p.min });
        continue;
      }
      if (p.max !== undefined && n > p.max) {
        errors.push({ name: p.name, code: "max", limit: p.max });
        continue;
      }
      args[p.name] = n;
    } else if (p.enum && !p.enum.includes(raw)) {
      errors.push({ name: p.name, code: "enum", limit: p.enum.join(", ") });
    } else {
      args[p.name] = raw;
    }
  }
  return { args, errors };
}

// Python literals for the values the demo uses: whole numbers, strings and
// dicts of those.
const pyValue = (v) => {
  if (typeof v === "number") return String(v);
  if (v && typeof v === "object") {
    return `{${Object.entries(v)
      .map(([k, x]) => `${JSON.stringify(k)}: ${pyValue(x)}`)
      .join(", ")}}`;
  }
  return JSON.stringify(v);
};
const pyArgs = (args) =>
  Object.entries(args)
    .map(([k, v]) => `${k}=${pyValue(v)}`)
    .join(", ");

/** An example request body for a write, made up from the resource name. */
export function exampleBody(endpoint) {
  const one = endpoint.childOne || endpoint.one;
  if (endpoint.kind === "search") return { filters: { status: "open" }, sort: "-updated" };
  return { label: `Synthetic ${one.replace(/-/g, " ")}`, status: "open" };
}

/** The Python a visitor would write: client.records.notes.get(record_id=1, note_id=2). */
export function pythonCall(endpoint, args) {
  const parts = [];
  const a = pyArgs(args);
  if (a) parts.push(a);
  if (endpoint.body) parts.push("json=body");
  return `client.${endpoint.accessor.join(".")}.${endpoint.action}(${parts.join(", ")})`;
}

/** The same call by operation name, through the client's one generic method. */
export function genericCall(endpoint, args) {
  const a = pyArgs(args);
  return `client.call(${JSON.stringify(endpoint.id)}${a ? `, ${a}` : ""}${
    endpoint.body ? ", json=body" : ""
  })`;
}

/** Python for the example body, shown above a write. */
export function pythonBody(endpoint) {
  return `body = ${pyValue(exampleBody(endpoint))}`;
}

/** Fill the path template with the parsed path parameters. */
export function resolvePath(endpoint, args) {
  return endpoint.path.replace(/\{(\w+)\}/g, (m, k) => (k in args ? String(args[k]) : m));
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const STATUSES = ["open", "pending", "closed"];

function item(one, id, rand, status) {
  const year = 1 + Math.floor(rand() * 3);
  const quarter = 1 + Math.floor(rand() * 4);
  return {
    id,
    reference: `DEMO-${String(id).padStart(5, "0")}`,
    label: `Synthetic ${one.replace(/-/g, " ")} ${id}`,
    status: status || STATUSES[Math.floor(rand() * 3)],
    updated: `Y${year} Q${quarter}`,
  };
}

/**
 * A simulated response, seeded by the operation and its arguments, so the same
 * call always gives the same answer. Nothing is sent anywhere.
 */
export function simulate(endpoint, args) {
  const rand = mulberry32(hash(`${endpoint.id}|${JSON.stringify(args)}`));
  const one = endpoint.childOne || endpoint.one;
  const idName = idParam(one);
  const pageSize = args.page_size || 20;
  const page = args.page || 1;
  const listBody = () => {
    const total = 12 + Math.floor(rand() * 400);
    const start = (page - 1) * pageSize;
    const n = Math.max(0, Math.min(3, total - start));
    const items = Array.from({ length: n }, (_, i) =>
      item(one, 1000 + start + i * 7 + Math.floor(rand() * 7), rand, args.status)
    );
    return { page, page_size: pageSize, total, items, synthetic: true };
  };
  switch (endpoint.kind) {
    case "list":
    case "search":
    case "childList":
      return { status: 200, body: listBody() };
    case "history":
      return {
        status: 200,
        body: {
          [idName]: args[idName],
          page,
          changes: Array.from({ length: 3 }, (_, i) => ({
            version: 3 - i,
            field: ["status", "label", "owner"][i],
            changed: `Y${3 - Math.floor(i / 2)} Q${1 + Math.floor(rand() * 4)}`,
          })),
          synthetic: true,
        },
      };
    case "count":
      return {
        status: 200,
        body: { count: 12 + Math.floor(rand() * 4000), synthetic: true },
      };
    case "create":
    case "childCreate":
      return {
        status: 201,
        body: { ...item(one, 5000 + Math.floor(rand() * 900), rand, "open"), synthetic: true },
      };
    case "delete":
    case "childDelete":
      return { status: 204, body: null };
    default:
      // get, replace, update, childGet
      return { status: 200, body: { ...item(one, args[idName] || 1, rand), synthetic: true } };
  }
}
