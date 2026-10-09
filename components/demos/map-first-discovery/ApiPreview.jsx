/**
 * ApiPreview: the request a nearby search could send for the current view,
 * and the start of the response. The endpoint and fields are made up for this
 * page. People come back as a square's centre with its size and a rounded
 * distance, events with their exact place. The JSON is built from the same
 * synthetic items the map and the list show, so all three always agree.
 */
import { fill } from "@/lib/fill";
import { DEMO as D } from "@/lib/demos/map-first-discovery-data";
import { toLatLng } from "./geo";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const CODE =
  "rounded-lg border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F7F7F7] dark:bg-[#141414] p-3 font-mono text-[11px] leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const SHOW_ITEMS = 2;

const round = (n, places) => Number(n.toFixed(places));

function toJson(item, cell, lang) {
  if (item.kind === "event") {
    const at = toLatLng(item.xy);
    return {
      id: item.id,
      kind: "event",
      title: item.title[lang],
      location: { lat: round(at.lat, 5), lng: round(at.lng, 5) },
      distanceM: Math.round(item.d / 10) * 10,
      startsAt: item.startsAt,
      endsAt: item.endsAt,
    };
  }
  const at = toLatLng(item.shown);
  return {
    id: item.id,
    kind: "person",
    displayName: item.name,
    approxLocation: { lat: round(at.lat, 4), lng: round(at.lng, 4), precisionM: cell },
    approxDistanceM: Math.round(item.d / 100) * 100,
    interests: item.interests.map((i) => i.id),
  };
}

export default function ApiPreview({ you, radius, show, cell, items, lang, id }) {
  const L = (o) => o[lang];
  const at = toLatLng(you);
  const kinds = { all: "people,events", people: "people", events: "events" }[show];
  const request = `GET /api/nearby?lat=${at.lat.toFixed(4)}&lng=${at.lng.toFixed(4)}&radiusM=${radius}&kinds=${kinds}&page=1&pageSize=20`;
  const shown = items.slice(0, SHOW_ITEMS);
  const response = {
    status: 1,
    message: "Success",
    data: {
      items: shown.map((item) => toJson(item, cell, lang)),
      page: 1,
      pageSize: 20,
      total: items.length,
    },
  };

  return (
    <section
      aria-labelledby={id}
      className="mt-6 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5"
    >
      <h3 id={id} className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-2">
        {L(D.apiTitle)}
      </h3>
      <p className="max-w-[680px] text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-4">
        {L(D.apiNote)}
      </p>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="min-w-0">
          <p className={`${META} mb-1.5`}>{L(D.request)}</p>
          <pre className={`${CODE} whitespace-pre-wrap break-all`}>
            <code>{request}</code>
          </pre>
        </div>
        <div className="min-w-0">
          <p className={`${META} mb-1.5`}>{L(D.response)}</p>
          <pre
            className={`${CODE} overflow-x-auto max-h-[360px]`}
            tabIndex={0}
            role="region"
            aria-label={L(D.response)}
          >
            <code>{JSON.stringify(response, null, 2)}</code>
          </pre>
          <p className="mt-1.5 text-xs text-[#595959] dark:text-[#9A9A9A]">
            {fill(L(D.apiShowing), { n: shown.length, total: items.length })}
          </p>
        </div>
      </div>
    </section>
  );
}
