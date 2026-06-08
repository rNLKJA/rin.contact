import React from "react";
import Link from "next/link";

export default function PostCard({ slug, title, date, tags, description }) {
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
      className="block group border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 hover:border-black dark:hover:border-white transition-colors duration-200"
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {formattedDate && (
          <time
            dateTime={date}
            className="text-[10px] tracking-widest uppercase text-[#B0B0B0] dark:text-[#7A7A7A] font-mono"
          >
            {formattedDate}
          </time>
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
      <h3 className="text-lg font-semibold tracking-tight mb-2 text-black dark:text-white group-hover:text-[#FF3C3C] transition-colors duration-200">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A] leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
    </Link>
  );
}
