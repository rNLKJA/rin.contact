/**
 * PostCover — the 2C cover for a blog post (lib/covers/posts.js): the post's
 * own key numbers plotted in dots, or, for a post without a clear number, its
 * outline (date, reading time and the shape of its text). Ink only: a post is
 * never live or current, so it never carries red. data-values lists exactly
 * the numbers plotted (none for an outline).
 *
 * Inside a card link the cover is decorative (describe={false}), so the link's
 * name stays the post's own text. On the post page a number cover carries its
 * alt; an outline only restates the date and reading time printed beside it,
 * so it stays decorative. The alt is English, like the post, so on zh-Hans
 * pages the image is marked lang="en-AU".
 */
import { useRouter } from "next/router";
import DotCover from "./DotCover";

export default function PostCover({ slug, cover, describe = true, eager = false, className = "" }) {
  const { locale } = useRouter();
  if (!cover) return null;
  // An outline's alt is empty by design (lib/covers/posts.js).
  const alt = describe ? cover.alt || "" : "";
  return (
    <DotCover
      src={`/covers/posts/${slug}.svg`}
      alt={alt}
      width={600}
      height={250}
      eager={eager}
      className={className}
      data-cover="post"
      data-slug={slug}
      data-values={(cover.values || []).join("|")}
      {...(alt && locale === "zh-Hans" ? { lang: "en-AU" } : {})}
    />
  );
}
