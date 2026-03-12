export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("X-Powered-By", "rin.contact");

  res.status(200).json({
    meta: {
      updated:    "2026-03-10",
      timezone:   "ACST (UTC+9:30)",
      location:   "Adelaide, SA, Australia",
      note:       "Manually curated. Inspired by nownownow.com",
      source:     "https://rin.contact/now",
    },
    status: "open_to_opportunities",
    building: [
      "Mapiva — a location-intelligence platform for smarter city planning",
      "Internal analytics dashboards for SAPOL Professional & Ethical Standards",
      "This website, apparently — new easter eggs every sprint",
    ],
    learning: [
      "Causal inference methods for observational data",
      "Rust — slowly, patiently, with great humility",
      "How to explain model uncertainty to non-technical stakeholders",
    ],
    reading: [
      { title: "Thinking, Fast and Slow",     author: "Daniel Kahneman" },
      { title: "The Signal and the Noise",     author: "Nate Silver"     },
      { title: "Staff Engineer",               author: "Will Larson"     },
    ],
    listening: [
      "Lo-fi hip hop while writing SQL",
      "Podcasts: Lex Fridman, Practical AI, Software Engineering Daily",
    ],
    not_doing: [
      "Accepting meetings that could have been an email",
      "Writing models without first understanding the business problem",
      "Adding more dependencies when vanilla JS will do",
    ],
    vibe: "heads-down, shipping things, drinking too much coffee",
  });
}
