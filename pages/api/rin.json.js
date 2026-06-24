/**
 * GET /api/rin.json — structured profile (machine-readable).
 *
 * This path is advertised in the console easter egg, /info/api, /info/colophon,
 * and /api/fortune, but the file lived only at public/rin.json (so /api/rin.json
 * 404'd). This route serves that same file — single source of truth, no copy —
 * at the advertised path. The filename rin.json.js maps to /api/rin.json, the
 * same dotted-route pattern the site already uses for sitemap.xml / feed.xml.
 */
import profile from "../../public/rin.json";

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(profile);
}
