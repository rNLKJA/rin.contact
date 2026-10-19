import { ImageResponse } from "@vercel/og";
import { composeOg, OG_W, OG_H } from "@/lib/og/compose";
import PROJECT_COVERS from "@/lib/covers/project-covers.json";
import POST_COVERS from "@/lib/covers/post-covers.json";

export const config = { runtime: "edge" };

/**
 * Share images (5A): a distinct 1200 × 630 dot-matrix card for every page.
 *
 *   /api/og/?title=…&subtitle=…&section=…[&project=<id>][&post=<slug>]
 *
 * The card is drawn as SVG by lib/og/compose.js (the rin.contact wordmark,
 * the page title and section in the dot font, red corner brackets) and
 * rasterised here. `project` adds that project's cover as the art; `post`
 * adds the post's 2C cover, the numbers it plots. Nothing is fetched: the
 * dot font and the covers are part of the bundle, so a cold start cannot
 * fall back to a different look. Build URLs with ogImageUrl() in lib/og.js.
 */
const clip = (v, n) => (v ? String(v).slice(0, n) : "");

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = clip(searchParams.get("title"), 140) || "Rin Huang";
  const subtitle = clip(searchParams.get("subtitle"), 200);
  const section = clip(searchParams.get("section"), 24);
  const projectId = searchParams.get("project");
  const slug = searchParams.get("post");
  const project = projectId && PROJECT_COVERS[projectId] ? projectId : undefined;
  const post = slug && POST_COVERS[slug] ? { slug, title, cover: POST_COVERS[slug] } : undefined;

  const svg = composeOg({ title, subtitle, section, project, post });
  const src = `data:image/svg+xml;base64,${toBase64(svg)}`;

  const response = new ImageResponse(
    <div style={{ display: "flex", width: OG_W, height: OG_H, background: "#0A0A0A" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- rasterised by satori, not rendered in a page */}
      <img src={src} width={OG_W} height={OG_H} alt="" />
    </div>,
    { width: OG_W, height: OG_H }
  );

  // The same parameters always draw the same card, so it can be cached for good.
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}
