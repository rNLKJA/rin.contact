import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

// ── Nothing OS colour palette ──────────────────────────────────────────────────
const WHITE = "#FFFFFF";
const BLACK = "#1A1A1A";
const RED = "#FF3C3C";
const MID = "#3D3D3D";
const SUBTLE = "#7A7A7A";

// ── Module-level font cache ────────────────────────────────────────────────────
// Edge Functions may persist module state across invocations.
// First request fetches fonts from CDN; subsequent requests skip the network.
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
          background: WHITE,
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* accent top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: RED,
          }}
        />

        {/* section label */}
        {section && (
          <p
            style={{
              fontSize: 20,
              color: RED,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              margin: 0,
              marginBottom: 24,
              fontFamily: "monospace",
            }}
          >
            /{section}
          </p>
        )}

        {/* title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: BLACK,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 16,
            maxWidth: 1000,
          }}
        >
          {title}
        </h1>

        {/* subtitle */}
        <p
          style={{
            fontSize: 28,
            color: MID,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
            maxWidth: 800,
          }}
        >
          {subtitle}
        </p>

        {/* wavy line decoration */}
        <svg
          viewBox="0 0 200 16"
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            width: 160,
            height: 12,
          }}
        >
          <path
            d="M0 8 Q10 0 20 8 T40 8 T60 8 T80 8 T100 8 T120 8 T140 8 T160 8 T180 8 T200 8"
            fill="none"
            stroke={RED}
            strokeWidth="1.5"
          />
        </svg>

        {/* brand */}
        <p
          style={{
            position: "absolute",
            bottom: 56,
            right: 80,
            fontSize: 20,
            color: SUBTLE,
            fontWeight: 400,
            margin: 0,
          }}
        >
          rin.contact
        </p>
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
