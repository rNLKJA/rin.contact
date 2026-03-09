import { NextResponse } from "next/server";

/**
 * Generates a cryptographically random nonce for Content-Security-Policy.
 * Uses Web Crypto API — compatible with the Next.js Edge Runtime.
 */
function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Builds the Content-Security-Policy header string.
 *
 * Production  → nonce + strict-dynamic (no unsafe-inline/eval for scripts)
 * Development → nonce + unsafe-eval + unsafe-inline (needed for HMR / webpack)
 */
function buildCSP(nonce) {
  const isDev = process.env.NODE_ENV === "development";

  // script-src: nonce approves inline JSON-LD + __NEXT_DATA__;
  // strict-dynamic propagates trust to dynamically loaded Next.js chunks.
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval' 'unsafe-inline'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  // WebSocket needed for Next.js HMR in dev
  const connectSrc = [
    "'self'",
    "https://api.emailjs.com",
    ...(isDev
      ? ["ws://localhost:3000", "ws://localhost:*", "wss://localhost:*"]
      : []),
  ].join(" ");

  // All CDN domains used for company logos in the timeline section
  const imgSrc = [
    "'self'",
    "data:",          // base64 inline logos (e.g. Practera)
    "blob:",          // canvas / NotionGraph WebGL
    "https://upload.wikimedia.org",
    "https://yt3.googleusercontent.com",
    "https://encrypted-tbn0.gstatic.com",
    "https://media.licdn.com",
    "https://s3-symbol-logo.tradingview.com",
    "https://companieslogo.com",
    "https://lh3.googleusercontent.com",
    "https://universitiesaustralia.edu.au",
  ].join(" ");

  const directives = [
    "default-src 'none'",
    `script-src ${scriptSrc}`,
    // unsafe-inline required: Tailwind utilities + Next.js style injection
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src ${imgSrc}`,
    `connect-src ${connectSrc}`,
    "frame-src 'none'",
    "frame-ancestors 'none'",   // prevents clickjacking (supersedes X-Frame-Options)
    "object-src 'none'",        // blocks Flash / plugins
    "base-uri 'self'",          // prevents base-tag injection
    "form-action 'self'",       // prevents form-hijacking
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

export function middleware(request) {
  const nonce = generateNonce();
  const csp   = buildCSP(nonce);

  // Pass the nonce to _document.jsx via a custom request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      // Run on all routes except Next.js static assets and favicons
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        // Skip prefetch requests — they don't render a page
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
