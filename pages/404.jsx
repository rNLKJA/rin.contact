import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Canvas + browser APIs — must never run on the server
const SnakeGame = dynamic(() => import("@/components/ui/SnakeGame"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 border border-[#1E1E1E] bg-[#0C0C0C] flex items-center justify-center font-mono text-[10px] text-[#2A2A2A]"
         style={{ width: 320, height: 224 }}>
      loading game...
    </div>
  ),
});

const SUGGESTIONS = [
  { href: "/",         label: "Home"         },
  { href: "/career",   label: "Career"       },
  { href: "/projects", label: "Projects"     },
  { href: "/lab",      label: "Lab"          },
  { href: "/about",    label: "About"        },
  { href: "/resume",   label: "CLI Resume"   },
  { href: "/hire-me",  label: "Hire Me"      },
  { href: "/card",     label: "Business Card"},
];

export default function Custom404() {
  const { asPath } = useRouter();
  const path = asPath.split("?")[0];

  return (
    <>
      <Head>
        <title>404 · rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24 font-mono">

        {/* Error header */}
        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4">
          404 · page not found
        </p>

        {/* Traceback card */}
        <div className="bg-[#0C0C0C] border border-[#1E1E1E] p-5 mb-6 text-xs leading-loose">
          <p className="text-[#555]">Traceback (most recent call last):</p>
          <p className="text-[#555] ml-4">
            File <span className="text-[#888]">&quot;rin.contact&quot;</span>,
            line 1, in <span className="text-[#888]">navigate()</span>
          </p>
          <p className="text-[#444] mt-2">
            <span className="text-[#686868]">KeyError: </span>
            <span className="text-[#FF6B6B]">&apos;{path}&apos;</span>
            <span className="text-[#444]"> does not exist in this namespace</span>
          </p>
          <p className="text-[#555] mt-3">
            <span className="text-[#888]">Suggestion: </span>
            try one of the routes below, play a game, or return home
          </p>
        </div>

        {/* Suggestions */}
        <p className="text-[10px] tracking-widest uppercase text-[#AAAAAA] mb-3">
          Available routes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {SUGGESTIONS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="border border-[#E0E0E0] px-3 py-2 text-xs text-[#595959]
                         hover:border-black hover:text-black transition-colors duration-150"
            >
              → {label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block border border-black px-6 py-2.5 text-xs tracking-widest uppercase
                     hover:bg-black hover:text-white transition-colors duration-200"
        >
          ← Home
        </Link>

        {/* Snake game — client-only, no SSR */}
        <SnakeGame />

      </div>
    </>
  );
}
