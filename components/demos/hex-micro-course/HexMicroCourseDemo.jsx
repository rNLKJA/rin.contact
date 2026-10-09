/**
 * HexMicroCourseDemo: the concept demo on /projects/hex-micro-course. A sample
 * micro-course module (MicroModule) beside an engagement dashboard on a
 * synthetic cohort (EngagementDashboard). The visitor's own run through the
 * module, { score, minutes }, is held here and passed to the dashboard, so it
 * joins the cohort as You. Both panels stack on narrow screens. Everything
 * lives in memory: nothing is stored or sent.
 */
import { useState } from "react";
import EngagementDashboard from "./EngagementDashboard";
import MicroModule from "./MicroModule";

export default function HexMicroCourseDemo({ lang = "en" }) {
  const [result, setResult] = useState(null);

  return (
    <div className="grid gap-6 lg:grid-cols-2 items-start">
      <MicroModule
        lang={lang}
        result={result}
        onFinish={setResult}
        onReset={() => setResult(null)}
      />
      <EngagementDashboard lang={lang} visitor={result} />
    </div>
  );
}
