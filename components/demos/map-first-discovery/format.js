/**
 * Distance and time wording for the map-first discovery demo, in the
 * visitor's language. Times are minutes from the demo's synthetic 2:00 pm.
 */
import { fill, joinNames } from "@/lib/fill";
import { DEMO as D, NOW_MINUTES } from "@/lib/demos/map-first-discovery-data";

export function makeFormat(lang) {
  const L = (o) => o[lang];

  /** "450 m" or "1.5 km": tens of metres under a kilometre, then tenths of a kilometre. */
  const distance = (m) =>
    m < 1000
      ? fill(L(D.metres), { n: Math.round(m / 10) * 10 })
      : fill(L(D.km), { n: (m / 1000).toFixed(1).replace(/\.0$/, "") });

  const clock = (offset) => {
    const total = NOW_MINUTES + offset;
    const h = Math.floor(total / 60) % 24;
    const t = `${h % 12 || 12}:${String(total % 60).padStart(2, "0")}`;
    return fill(L(h < 12 ? D.am : D.pm), { t });
  };

  /**
   * How far away a person reads. Their distance is measured to the centre of
   * their square, rounded to 100 m, and anything closer than one square just
   * says "within" that square's size.
   */
  const personDistance = (d, cell) =>
    d < cell
      ? fill(L(D.within), { d: distance(cell) })
      : fill(L(D.about), { d: distance(Math.round(d / 100) * 100) });

  const when = (event) => {
    if (event.start <= 0) return fill(L(D.onNow), { time: clock(event.end) });
    if (event.start <= 60) return fill(L(D.startsIn), { n: event.start });
    return fill(L(D.startsAt), { time: clock(event.start) });
  };

  const interests = (list) =>
    fill(L(D.into), {
      list: joinNames(
        list.map((i) => i[lang]),
        { separator: lang === "zh" ? "、" : ", ", conjunction: L(D.and) }
      ),
    });

  /** The one-line description of an item, used by the feed and the selected line. */
  const describe = (item, cell) =>
    item.kind === "event"
      ? `${distance(item.d)} · ${when(item)}`
      : `${personDistance(item.d, cell)} · ${interests(item.interests)}`;

  return { distance, clock, personDistance, when, interests, describe };
}
