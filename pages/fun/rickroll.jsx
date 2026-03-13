import Head from "next/head";
import { useEffect, useState } from "react";

export default function RickrollPage() {
  const [countdown, setCountdown] = useState(3);
  const [gone, setGone]           = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setGone(true);
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      return;
    }
    const t = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <>
      <Head>
        <title>definitely not a rickroll — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono text-center">
        {!gone ? (
          <>
            <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-8">
              rin.contact · special announcement
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
              You knew this was coming.
            </h1>

            <p className="text-sm text-[#555] mb-10">
              Redirecting in{" "}
              <span className="text-[#FF3C3C] font-bold text-lg">{countdown}</span>
              ...
            </p>

            <div className="w-48 h-px bg-[#1E1E1E] relative mb-10">
              <div
                className="absolute left-0 top-0 h-full bg-[#FF3C3C]"
                style={{
                  width: `${((3 - countdown) / 3) * 100}%`,
                  transition: "width 1s linear",
                }}
              />
            </div>

            <p className="text-[10px] text-[#2A2A2A] tracking-widest">
              never gonna give you up · never gonna let you down
            </p>
          </>
        ) : (
          <p className="text-[11px] tracking-widest uppercase text-[#555]">
            redirecting...
          </p>
        )}
      </div>
    </>
  );
}
