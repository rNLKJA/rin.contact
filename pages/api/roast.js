const ROASTS = [
  {
    sin: "random_state=42",
    roast: "Setting random_state=42 and calling it reproducible research. Bold move.",
  },
  {
    sin: "accuracy on imbalanced data",
    roast:
      "99% accuracy on a dataset that's 99% class A. Groundbreaking. Nobel committee has been notified.",
  },
  {
    sin: "overfit model",
    roast: "Your training accuracy is 100%. Your test accuracy is a cry for help.",
  },
  {
    sin: "no EDA",
    roast:
      "Skipped exploratory data analysis and went straight to a neural network. The data saw that.",
  },
  {
    sin: "print debugging",
    roast: "print('here') print('here 2') print('HERE 2b') — a classic three-act tragedy.",
  },
  {
    sin: "df.copy() missing",
    roast:
      "Forgot to call .copy() on your DataFrame slice. SettingWithCopyWarning has entered the chat.",
  },
  {
    sin: "data leakage",
    roast:
      "Scaled the whole dataset before the train/test split. The test set saw your future. Spooky.",
  },
  {
    sin: "magic numbers",
    roast: "threshold = 0.73. Why 0.73? We may never know. The codebase whispers secrets.",
  },
  {
    sin: "ignoring NaN",
    roast:
      "Dropped all NaN rows without asking why they were missing. The data has feelings, you know.",
  },
  { sin: "p-hacking", roast: "Ran 47 models until p < 0.05. Science is not a slot machine." },
  {
    sin: "no version control",
    roast: "final_model_v2_FINAL_actualfinal_USE_THIS.pkl found in the wild.",
  },
  {
    sin: "feature engineering late",
    roast: "Discovered the most predictive feature after presenting to stakeholders. Classic.",
  },
  {
    sin: "default hyperparameters",
    roast: "Submitted the model with sklearn default parameters. The baseline would like a word.",
  },
  {
    sin: "correlation = causation",
    roast: "Ice cream sales predict shark attacks. You'd get along well.",
  },
  {
    sin: "no business context",
    roast: "Built a beautiful model that solves a problem nobody has. A work of art.",
  },
  {
    sin: "R² = 1.0",
    roast:
      "R² of exactly 1.0. Either you've cracked physics or something went very wrong. Probably the second one.",
  },
  {
    sin: "forgot to shuffle data",
    roast: "Forgot to shuffle before splitting. Your model learned the alphabet, not the signal.",
  },
  {
    sin: "pip install everything",
    roast: "requirements.txt has 94 packages for a linear regression. Respect the ruthlessness.",
  },
];

export default function handler(req, res) {
  const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Roast-Count", ROASTS.length);
  res.setHeader("X-Powered-By", "rin.contact honest feedback engine");

  res.status(200).json({
    sin: roast.sin,
    roast: roast.roast,
    severity: "non-fatal, but embarrassing",
    prescription: "curl https://rin.contact/api/fortune for recovery",
    generated_at: new Date().toISOString(),
    tip: "Run again to receive a fresh humbling.",
  });
}
