/**
 * GET /api/ping
 * A tiny heartbeat endpoint. Because every data engineer needs a /ping.
 */
export default function handler(req, res) {
  const isTerminal = /curl|wget|httpie|fetch|python-requests/i.test(
    req.headers["user-agent"] || ""
  );

  if (isTerminal) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res
      .status(200)
      .send(
        [
          "",
          "  pong.",
          "",
          "  rin.contact is alive.",
          "  Latency measured. Handshake established.",
          "  Status: all systems nominal.",
          "",
          "  ─────────────────────────────────────────",
          "  UPTIME    continuous since 2022",
          "  LOCATION  Adelaide, SA  ·  UTC+9:30",
          "  OPERATOR  Sunchuangyu (Rin) Huang",
          "  ─────────────────────────────────────────",
          "",
          "  Try also:",
          "    curl rin.contact           → full profile",
          "    open https://rin.contact/tools/card    → business card",
          "    open https://rin.contact/fun/secret  → take a look",
          "",
        ].join("\n")
      );
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    status: "ok",
    message: "pong",
    operator: "Sunchuangyu (Rin) Huang",
    site: "https://rin.contact",
    timestamp: new Date().toISOString(),
  });
}
