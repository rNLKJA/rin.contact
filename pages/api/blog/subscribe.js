/**
 * POST /api/blog/subscribe — Newsletter signup
 *
 * Accepts: { email: string }
 * Returns: { success: boolean, message: string }
 * Rate-limited by Vercel's built-in WAF (no extra infrastructure needed).
 */
import { subscribe } from "@/lib/newsletter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { email } = req.body || {};

  const result = await subscribe(email);
  const status = result.success ? 200 : 400;

  return res.status(status).json(result);
}
