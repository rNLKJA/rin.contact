import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You — rin.contact</title>
        <meta name="description" content="Thanks for reaching out." />
        <link rel="canonical" href="https://rin.contact/info/thank-you" />
      </Head>

      <SeoHead
        title="Thank You — rin.contact"
        description="Thanks for reaching out."
        path="/info/thank-you"
        ogImage={{ title: "Thank You", subtitle: "Thanks for reaching out.", section: "info" }}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/info/thank-you</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Thank you.</h1>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed mb-8">
            For reaching out. For the referral. For the coffee offer. For taking the time.
            I genuinely appreciate it.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
