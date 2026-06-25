import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const CSV_ROWS = [
  ["column", "type", "description"],
  ["imposter_syndrome", "float", "0.0 to 1.0, usually 0.99"],
  ["coffee_cups_today", "int", "underreported"],
  ["tabs_open", "int", "always 47"],
  ["documentation_written", "str", "TODO"],
  ["random_state", "int", "42"],
  ["p_value", "float", "always < 0.05"],
  ["confidence", "float", "95% CI for when this will ship"],
];

export default function CsvPage() {
  const csv = CSV_ROWS.map((r) => r.join(",")).join("\n");

  return (
    <>
      <Head>
        <title>Data-And-More — rin.contact</title>
        <meta name="description" content="Joke CSV. Data science puns as column headers." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/csv" />
      </Head>

      <SeoHead
        title="Data-And-More — rin.contact"
        description="Joke CSV. Data science puns as column headers."
        path="/fun/csv"
        ogImage={{
          title: "Data-And-More",
          subtitle: "Joke CSV. Data science puns as column headers.",
          section: "fun",
        }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/csv
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Data-And-More(9_001).csv
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            A living document. Pull requests welcome (metaphorically).
          </p>

          <div className="border border-[#E0E0E0] p-4 mb-6 overflow-x-auto">
            <pre className="font-mono text-[11px] text-[#3D3D3D] whitespace-pre">{csv}</pre>
          </div>

          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
            download="Data-And-More(9_001).csv"
            className="inline-block border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            Download CSV
          </a>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link
              href="/fun"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← /fun
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
