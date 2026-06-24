import React from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

export default function PostCard({ slug, title, date, tags, description, readingTime }) {
  const { t } = useI18n();
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blog/${slug}`}
      className="relative block group overflow-hidden border border-[#E0E0E0] dark:border-[#3D3D3D] p-6
                 hover:border-black dark:hover:border-white transition-colors duration-200"
    >
      {/* red dot-matrix wash — blooms from the top-left corner on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: "radial-gradient(rgba(255,60,60,0.16) 1px, transparent 1.6px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: "radial-gradient(120% 110% at 0% 0%, #000 0%, transparent 70%)",
          maskImage: "radial-gradient(120% 110% at 0% 0%, #000 0%, transparent 70%)",
        }}
      />
      {/* red accent line — draws across the foot on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#FF3C3C]
                   origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {formattedDate && (
            <time
              dateTime={date}
              className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono"
            >
              {formattedDate}
            </time>
          )}
          {readingTime && (
            <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
              <span className="w-1 h-1 rounded-full bg-[#CCCCCC] dark:bg-[#3D3D3D]" aria-hidden="true" />
              {readingTime} {t("blog.minRead")}
            </span>
          )}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-[#7A7A7A] dark:text-[#9A9A9A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-black dark:text-white group-hover:text-[#FF3C3C] transition-colors duration-200">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A] leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* read affordance — signifier appears and slides in on hover (no layout shift; held in flow) */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#FF3C3C]
                     opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          aria-hidden="true"
        >
          Read
          <span>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
