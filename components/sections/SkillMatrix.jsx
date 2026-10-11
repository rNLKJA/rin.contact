/**
 * SkillMatrix — grid of every skill, grouped by area, brightness = in use.
 *
 * All skills from the atlas (passed by getStaticProps): id, label, area,
 * last-used month, evidence count, recent flag (active in last 18 months per the
 * site's own rule). Grid of glyph cells grouped by the 10 areas. A cell is LIT
 * if the skill is in active use; dim otherwise. Hover/focus: skill name in
 * dot-matrix, mono line "last used <where>, <when> · <n> pieces of evidence".
 * Click: go to ?skill=<id> (page already supports this deep link).
 *
 * IMPORTANT site rule: no self-rating. Brightness means only "used in the last
 * 18 months", stated in the note line.
 *
 * Reduced motion shows all cells at their final state, no sweep.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const COPY = {
  en: {
    label: "Skills by domain",
    note: "Lit cells = used in the last 18 months. No proficiency self-rating.",
    idle: (total, active) => `${total} skill${total === 1 ? "" : "s"}`,
    idleSub: (active) => `${active} in active use · no self-rating`,
    lastUsed: (where, when) => `last used ${where}, ${when}`,
    evidence: (n) => `${n} piece${n === 1 ? "" : "s"} of evidence`,
  },
  zh: {
    label: "按领域划分的技能",
    note: "亮起的格子 = 过去 18 个月使用过。不做熟练度自评。",
    idle: (total, active) => `${total} 项技能`,
    idleSub: (active) => `${active} 项正在使用 · 不做自评`,
    lastUsed: (where, when) => `最近使用：${where}，${when}`,
    evidence: (n) => `${n} 份证据`,
  },
};

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  );

export default function SkillMatrix({ skills = [], areas = [] }) {
  const router = useRouter();
  const { locale = "en-AU" } = router;
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);

  // Group skills by domain (not area - skills use domain field)
  const byArea = {};
  areas.forEach((area) => {
    byArea[area.id] = skills.filter((s) => s.domain === area.id);
  });

  const totalSkills = skills.length;
  const activeSkills = skills.filter((s) => s.recent).length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = started || reduce;
  const current = active ? skills.find((s) => s.id === active) : null;

  const goToSkill = (id) => {
    router.push(`?skill=${id}`, undefined, { shallow: true, scroll: false });
  };

  return (
    <section
      ref={ref}
      aria-label={copy.label}
      className="relative overflow-hidden border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
      onMouseLeave={() => setActive(null)}
    >
      <HeroDotField />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Label row */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <p className="text-xs tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] m-0">
            <span aria-hidden="true">■ — </span>
            {copy.label}
          </p>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A] m-0">{copy.note}</p>
        </div>

        {/* Readout box */}
        <div
          className="border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white/80 dark:bg-[#0A0A0A]/80 px-5 py-4 md:px-6 md:py-5 mb-6 min-h-[104px] md:min-h-[116px]"
          aria-live="polite"
        >
          {current ? (
            <>
              <p className="font-display text-2xl md:text-4xl leading-tight text-black dark:text-white m-0">
                {current.label}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-2 m-0">
                {current.lastWhere && current.lastWhen
                  ? `${copy.lastUsed(current.lastWhere, current.lastWhen)} · `
                  : ""}
                {copy.evidence(current.count)}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-3xl md:text-5xl leading-none text-black dark:text-white m-0">
                {copy.idle(totalSkills, activeSkills)}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-3 m-0">
                {copy.idleSub(activeSkills)}
              </p>
            </>
          )}
        </div>

        {/* The matrix, grouped by area */}
        <div className="space-y-6">
          {areas.map((area) => {
            const areaSkills = byArea[area.id] || [];
            if (areaSkills.length === 0) return null;

            return (
              <div key={area.id}>
                {/* Area label */}
                <h3 className="text-xs font-mono tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] mb-3">
                  {area.label}
                </h3>

                {/* Grid of skills in this area */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {areaSkills.map((skill, idx) => {
                    const hot = active === skill.id;
                    const dim = active && !hot;
                    const lit = skill.recent;

                    return (
                      <button
                        key={skill.id}
                        onClick={() => goToSkill(skill.id)}
                        onMouseEnter={() => setActive(skill.id)}
                        onFocus={() => setActive(skill.id)}
                        onBlur={() => setActive(null)}
                        aria-label={`${skill.label}, ${skill.count} ${
                          skill.count === 1 ? "piece" : "pieces"
                        } of evidence${lit ? ", in active use" : ""}`}
                        className="outline-none focus-visible:ring-2 focus-visible:ring-[#FF3C3C] transition-all duration-300"
                        style={{
                          transitionDelay: on && !active ? `${idx * 20}ms` : "0ms",
                        }}
                      >
                        <span
                          className={`block w-full aspect-square rounded-sm transition-all duration-300 ${
                            on
                              ? hot
                                ? "bg-[#FF3C3C] scale-110"
                                : dim
                                  ? lit
                                    ? "bg-black/20 dark:bg-white/20"
                                    : "bg-black/10 dark:bg-white/10"
                                  : lit
                                    ? "bg-black dark:bg-white"
                                    : "bg-black/30 dark:bg-white/30"
                              : "bg-black/10 dark:bg-white/10"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
