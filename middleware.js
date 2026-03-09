import { NextResponse } from "next/server";

/**
 * Middleware: passes through. CSP is set in next.config.js.
 * Nonce-based CSP was reverted — CDN caching caused nonce mismatch and blocked scripts.
 */
export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
