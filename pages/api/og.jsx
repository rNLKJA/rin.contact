import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

// ── Nothing OS colour palette (dark editorial) ─────────────────────────────────
const BG = "#0A0A0A";
const WHITE = "#FFFFFF";
const RED = "#FF3C3C";
const SUBTLE = "#9A9A9A";
const SUB2 = "#AAAAAA";

// ── Module-level font cache ────────────────────────────────────────────────────
// Edge Functions may persist module state across invocations.
let fontCache = null;

async function getFonts() {
  if (fontCache) return fontCache;

  const [interRegular, interSemiBold] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf"
    ).then((r) => r.arrayBuffer()),
  ]);

  fontCache = [
    { name: "Inter", data: interRegular, weight: 400, style: "normal" },
    { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
  ];

  return fontCache;
}

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Rin Huang";
  const subtitle = searchParams.get("subtitle") || "Senior Data Analyst";
  const section = searchParams.get("section") || "";

  const fonts = await getFonts();

  // Faint dot-matrix texture (the brand signature), bottom-right.
  const DOT_COLS = 12;
  const DOT_ROWS = 9;
  const DOT_GAP = 26;
  const dots = [];
  for (let r = 0; r < DOT_ROWS; r++) {
    for (let c = 0; c < DOT_COLS; c++) {
      dots.push(
        <circle key={`${r}-${c}`} cx={6 + c * DOT_GAP} cy={6 + r * DOT_GAP} r={2.4} fill={WHITE} />
      );
    }
  }

  const response = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: 1200,
          height: 630,
          padding: 80,
          background: BG,
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* accent top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: RED, display: "flex" }} />

        {/* dot-matrix texture — bottom-right, faint */}
        <svg
          width={DOT_COLS * DOT_GAP}
          height={DOT_ROWS * DOT_GAP}
          style={{ position: "absolute", right: 64, bottom: 110, opacity: 0.12 }}
        >
          {dots}
        </svg>

        {/* HUD corner ticks */}
        <div style={{ position: "absolute", top: 44, right: 44, width: 44, height: 44, borderTop: `3px solid ${RED}`, borderRight: `3px solid ${RED}`, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 44, left: 44, width: 44, height: 44, borderBottom: `3px solid ${RED}`, borderLeft: `3px solid ${RED}`, display: "flex" }} />

        {/* section label */}
        {section && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 26,
            }}
          >
            <div style={{ width: 12, height: 12, background: RED, display: "flex", marginRight: 14 }} />
            <p
              style={{
                fontSize: 20,
                color: RED,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                margin: 0,
                fontFamily: "monospace",
              }}
            >
              /{section}
            </p>
          </div>
        )}

        {/* title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: WHITE,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 18,
            maxWidth: 980,
          }}
        >
          {title}
        </h1>

        {/* subtitle */}
        <p
          style={{
            fontSize: 30,
            color: SUB2,
            fontWeight: 400,
            lineHeight: 1.35,
            margin: 0,
            maxWidth: 860,
          }}
        >
          {subtitle}
        </p>

        {/* brand mark — red diamond + wordmark, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 54,
            right: 80,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: 11, height: 11, background: RED, transform: "rotate(45deg)", display: "flex", marginRight: 14 }} />
          <p style={{ fontSize: 22, color: SUBTLE, fontWeight: 400, margin: 0 }}>rin.contact</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  // Cache OG images for 1 year — social crawlers request the same params repeatedly
  response.headers.set(
    "Cache-Control",
    "public, max-age=31536000, immutable"
  );

  return response;
}
