import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Huang;Sunchuangyu;;;
FN:Sunchuangyu Huang (Rin)
NICKNAME:Rin
TITLE:ASO7 Senior Data Analyst
ORG:South Australia Police
EMAIL;TYPE=WORK,INTERNET:info@rin.contact
URL:https://rin.contact
X-SOCIALPROFILE;type=github:https://github.com/rNLKJA
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/huangsunchuangyu
NOTE:Data Scientist · Government Intelligence Analyst · Co-founder of Mapiva. Bilingual: English / Mandarin. Adelaide\\, SA\\, Australia.
END:VCARD`;

export default function CardPage() {
  const download = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rin-huang.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      <Head>
        <title>Card — Rin Huang · rin.contact</title>
        <meta name="description" content="Digital business card for Sunchuangyu (Rin) Huang — Senior Data Analyst, Adelaide SA. Download contact card (VCF)." />
        <link rel="canonical" href="https://rin.contact/card" />
      </Head>

      <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-6 py-16">

        {/* Card */}
        <div
          className="w-full max-w-sm bg-white border border-[#E0E0E0]"
          style={{ aspectRatio: "1.7 / 1", minHeight: 200 }}
          aria-label="Rin Huang business card"
        >
          <div className="h-full flex flex-col justify-between p-6">

            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                {/* Avatar squircle */}
                <div
                  className="w-10 h-10 bg-black flex items-center justify-center text-white text-base font-semibold mb-4"
                  style={{ borderRadius: "22%" }}
                  aria-hidden="true"
                >
                  R
                </div>
                <p className="text-lg font-semibold tracking-tight leading-tight">Sunchuangyu Huang</p>
                <p className="text-xs text-[#7A7A7A] tracking-wider mt-0.5">Rin · 黄孙创宇</p>
              </div>

              {/* QR code */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=https%3A%2F%2Frin.contact&color=000000&bgcolor=FFFFFF&margin=0"
                alt="QR code linking to rin.contact"
                width={72}
                height={72}
                className="opacity-80"
              />
            </div>

            {/* Bottom row */}
            <div>
              <div className="h-px w-full bg-[#F0F0F0] mb-3" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-wide">ASO7 Senior Data Analyst</p>
                  <p className="text-[10px] text-[#7A7A7A] tracking-wide">South Australia Police</p>
                  <p className="text-[10px] text-[#AAAAAA] mt-1.5 tracking-wide">info@rin.contact · rin.contact</p>
                </div>
                {/* Nothing-style dot accent */}
                <div className="w-2 h-2 rounded-full bg-[#FF3C3C] opacity-70" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 w-full max-w-sm space-y-3">
          <button
            onClick={download}
            className="w-full border border-black bg-black text-white px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 font-mono"
          >
            ↓ Download .vcf contact card
          </button>
          <div className="flex gap-3">
            <a
              href="mailto:info@rin.contact"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/huangsunchuangyu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rNLKJA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              GitHub
            </a>
          </div>
          <Link
            href="/"
            className="block border border-[#E0E0E0] text-[#7A7A7A] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
          >
            ← Full Profile
          </Link>
        </div>

        {/* Share hint */}
        <p className="mt-6 text-[10px] text-[#AAAAAA] font-mono text-center">
          rin.contact/card · Adelaide SA · UTC+9:30
        </p>
      </div>
    </>
  );
}
