#!/usr/bin/env node
/**
 * WCAG contrast audit for rin.contact
 * AA: 4.5:1 normal text, 3:1 large text
 */

function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrast(hex1, hex2) {
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const [light, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

const pairs = [
  // CAREER PATH button (HeroSection)
  { fg: "#F5F5F5", bg: "#FF3C3C", label: "CAREER PATH button (text on red)", size: "normal" },
  { fg: "#FFFFFF", bg: "#FF3C3C", label: "White on red (for comparison)", size: "normal" },
  // Contact section submit button
  { fg: "#FFFFFF", bg: "#FF3C3C", label: "Contact submit button (white on red)", size: "normal" },
  // Light backgrounds
  { fg: "#3D3D3D", bg: "#FFFFFF", label: "Body text on white", size: "normal" },
  { fg: "#7A7A7A", bg: "#FFFFFF", label: "Subtle text (#7A7A7A) on white", size: "normal" },
  { fg: "#595959", bg: "#FFFFFF", label: "Mid gray (#595959) on white", size: "normal" },
  { fg: "#5A5A5A", bg: "#FFFFFF", label: "FAQ answer text on white", size: "normal" },
  // Dark backgrounds (Footer, Contact)
  { fg: "#FFFFFF", bg: "#1A1A1A", label: "White on dark (#1A1A1A)", size: "normal" },
  { fg: "#AAAAAA", bg: "#1A1A1A", label: "Gray (#AAAAAA) on dark", size: "normal" },
  { fg: "#9A9A9A", bg: "#1A1A1A", label: "Gray (#9A9A9A) on dark", size: "normal" },
  { fg: "#C0C0C0", bg: "#1A1A1A", label: "Light gray (#C0C0C0) on dark", size: "normal" },
  { fg: "#555555", bg: "#1A1A1A", label: "Footer link arrow (#555555) on dark", size: "normal" },
  // Form inputs
  { fg: "#FFFFFF", bg: "#252525", label: "Input text on dark input bg", size: "normal" },
  { fg: "#9A9A9A", bg: "#252525", label: "Placeholder on dark input", size: "normal" },
  // Accent text (decorative)
  { fg: "#FF3C3C", bg: "#FFFFFF", label: "Accent red on white", size: "normal" },
];

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

console.log("WCAG AA: 4.5:1 normal text, 3:1 large text\n");
console.log("─".repeat(70));

for (const { fg, bg, label, size } of pairs) {
  const cr = contrast(fg, bg);
  const required = size === "large" ? AA_LARGE : AA_NORMAL;
  const pass = cr >= required;
  const status = pass ? "✓ PASS" : "✗ FAIL";
  console.log(`${label}`);
  console.log(`  ${fg} on ${bg} → ${cr.toFixed(2)}:1 ${status} (needs ${required}:1)`);
  if (!pass && size === "normal") {
    const largePass = cr >= AA_LARGE;
    console.log(`  → Would pass for large text (3:1): ${largePass ? "yes" : "no"}`);
  }
  console.log("");
}
