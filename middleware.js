import { NextResponse } from "next/server";

/**
 * CLI detection — rewrite root requests from terminal clients to /api/curl.
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
  const CLI = ["curl/", "wget/", "httpie/", "python-httpx", "python-requests",
               "go-http-client", "libwww", "lwp-trivial", "axios/", "node-fetch"];
  return CLI.some((token) => userAgent.toLowerCase().includes(token));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  if (pathname === "/" && isCliClient(ua)) {
    return NextResponse.rewrite(new URL("/api/curl", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
