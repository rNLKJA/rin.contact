import { NextResponse } from "next/server";

/**
 * CLI detection — rewrite root requests from terminal clients to /api/curl.
 * Also silences .well-known probes from Chrome DevTools.
 *
 * All real browsers include "Mozilla/" in their User-Agent string.
 * curl, wget, HTTPie, and other CLI tools never do — so this single
 * check is both simple and reliable.
 *
 * Only the root path "/" is intercepted; all other routes (static
 * assets, sitemap, API routes, etc.) pass through normally.
 */
function isCliClient(userAgent = "") {
  if (!userAgent) return false;
  if (userAgent.toLowerCase().includes("mozilla/")) return false;
  const CLI = [
    "curl/",
    "wget/",
    "httpie/",
    "python-httpx",
    "python-requests",
    "go-http-client",
    "libwww",
    "lwp-trivial",
    "axios/",
    "node-fetch",
  ];
  return CLI.some((token) => userAgent.toLowerCase().includes(token));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  // Silently swallow .well-known probes (Chrome DevTools, etc.)
  if (pathname.startsWith("/.well-known/")) {
    return new Response(null, { status: 204 });
  }

  // Terminal clients hitting the homepage get the ANSI profile. With i18n on,
  // the homepage can resolve at a locale-prefixed root, and with trailingSlash
  // on the rewrite target must end in a slash (a bare /api/curl 308-redirects),
  // so match every root form and rewrite to /api/curl/.
  const isRoot =
    pathname === "/" ||
    pathname === "/en-AU" ||
    pathname === "/en-AU/" ||
    pathname === "/zh-Hans" ||
    pathname === "/zh-Hans/";
  if (isRoot && isCliClient(ua)) {
    return NextResponse.rewrite(new URL("/api/curl/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // The "/((?!...).*)" pattern does NOT match the bare root "/", so the curl
  // rewrite never ran for `curl rin.contact`. List "/" explicitly as well.
  // Also exclude static file extensions (fonts, images, css, etc. under
  // /public) — none of them need the CLI-detection or .well-known logic
  // below, so skipping the middleware invocation for them removes an Edge
  // Function hop from every font/image/stylesheet request on every page.
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|.*\\.(?:css|html|ico|jpe?g|js|json|pdf|png|svg|txt|webmanifest|woff2?|xml)$).*)",
  ],
};
