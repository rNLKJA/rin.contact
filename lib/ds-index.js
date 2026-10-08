/**
 * /ds index data. The route id (label) is the stable identifier shown as
 * /ds/<label>; the note is localised via ds.index.notes[i] (index-aligned).
 *
 * Lives in lib/ so plain Node scripts and /skills can read it without JSX.
 */
export const DS_ITEMS = [
  { href: "/ds/model-card", label: "model-card" },
  { href: "/ds/feature-importance", label: "feature-importance" },
  { href: "/ds/confusion-matrix", label: "confusion-matrix" },
  { href: "/ds/ensemble", label: "ensemble" },
  { href: "/ds/bias-variance", label: "bias-variance" },
  { href: "/ds/training-curves", label: "training-curves" },
  { href: "/ds/pipeline", label: "pipeline" },
  { href: "/ds/survival", label: "survival" },
  { href: "/ds/version-control", label: "version-control" },
  { href: "/ds/null-hypothesis", label: "null-hypothesis" },
  { href: "/ds/regression", label: "regression" },
  { href: "/ds/ab-test", label: "ab-test" },
  { href: "/ds/phacking", label: "phacking" },
  { href: "/ds/eda", label: "eda" },
  { href: "/ds/recommendation", label: "recommendation" },
  { href: "/ds/sentiment", label: "sentiment" },
  { href: "/ds/overfitting", label: "overfitting" },
  { href: "/ds/data-drift", label: "data-drift" },
  { href: "/ds/cicd", label: "cicd" },
  { href: "/ds/technical-debt", label: "technical-debt" },
];
