/**
 * LearningPath: the example path on /projects/teaching, one card per session
 * with what it covers, what learners build and how they check it. The session
 * the lesson demo runs links down to it (#demo). Copy is COPY.path in
 * lib/demos/teaching-data.js. Written for this page, so it describes no real
 * session, learner or course.
 */
import { fill } from "@/lib/fill";
import { COPY } from "@/lib/demos/teaching-data";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";

export default function LearningPath({ lang = "en" }) {
  const L = (o) => o[lang];
  const P = COPY.path;
  const facets = ["covers", "builds", "check"];

  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
      {P.sessions.map((s, i) => (
        <li key={s.title.en} className="bg-white dark:bg-[#0A0A0A] p-5 md:p-6 flex flex-col">
          <p
            className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-4"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-3">
            <span className="sr-only">{fill(L(P.session), { n: i + 1 })}</span>
            {L(s.title)}
          </h3>
          <dl className="space-y-3">
            {facets.map((f) => (
              <div key={f}>
                <dt className={`${META} mb-0.5`}>{L(P[f])}</dt>
                <dd className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                  {L(s[f])}
                </dd>
              </div>
            ))}
          </dl>
          {s.runnable && (
            <a
              href="#demo"
              className="mt-4 self-start inline-flex items-center gap-2 min-h-[36px] rounded-full border border-[#CC0000] dark:border-[#FF3C3C] px-3 text-xs text-[#CC0000] dark:text-[#FF6B6B] hover:bg-[#CC0000] hover:text-white dark:hover:bg-[#FF3C3C] dark:hover:text-black transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
            >
              <span className="w-1.5 h-1.5 bg-current" aria-hidden="true" />
              {L(P.runnable)} ↓
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
