/**
 * Print rules shared by /resume and /cv. "Save as PDF" uses the browser's own
 * print, which keeps selectable, searchable text and working links (an image
 * capture would not). Whatever the on-screen theme, the printout is a clean
 * black-on-white A4 document with the brand red kept on .cv-accent elements.
 *
 * Mark anything screen-only with Tailwind's `print:hidden` or `.cv-noprint`.
 */
export default function PrintStyles() {
  return (
    <style>{`
      @media print {
        @page { size: A4; margin: 14mm 14mm 16mm; }

        html, body { background: #ffffff !important; }
        .print-root { background: #ffffff !important; padding-bottom: 0 !important; }
        .print-root *:not(.cv-accent):not(.print-keep-bg) {
          color: #1a1a1a !important;
          background-color: transparent !important;
          border-color: #d8d8d8 !important;
          box-shadow: none !important;
        }
        .print-root .cv-accent { color: #cc0000 !important; }
        .print-root .bg-current.print-keep-bg { background-color: #cc0000 !important; }
        .print-root, .print-root * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          animation: none !important;
          transition: none !important;
        }
        .cv-noprint { display: none !important; }

        .print-root a { text-decoration: none; }
        .print-root h1 { font-family: var(--font-dm-sans), system-ui, sans-serif !important; font-size: 22pt !important; }
        /* Screen sizes are generous; scale the document so a resume prints
           in about three A4 pages. Long roles may split across pages, but a
           single bullet, glance cell or credential never does. */
        .print-root > * { zoom: 0.72; }
        .print-root li,
        .print-root .print-avoid { break-inside: avoid; }
        .print-root h2, .print-root h3 { break-after: avoid; }
        .print-root section { padding-top: 10pt !important; padding-bottom: 10pt !important; }

        .print-block { display: block !important; }
        .print-static { position: static !important; }
        .print-glance { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        .print-impact { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .print-impact .print-value { font-size: 15pt !important; }

        /* Career strip: light, print-safe colours whatever the screen theme */
        .print-root .strip-track { background-color: #f0f0f0 !important; }
        .print-root .strip-grid { background-color: #ffffff !important; }
        .print-root .strip-government { background-color: #e02020 !important; }
        .print-root .strip-research { background-color: #8a8a8a !important; }
        .print-root .strip-engineering { background-color: #1a1a1a !important; }
      }
    `}</style>
  );
}
