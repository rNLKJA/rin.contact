/**
 * PostCover — the 2C cover for a blog post: the post's own key numbers,
 * plotted in dots, or its title in dot-matrix letters when it has no clear
 * number (lib/covers/posts.js). data-values lists exactly the numbers drawn.
 * Inside a card link the cover is decorative (describe={false}), so the
 * link's name stays the post's own text; the post hero carries the alt.
 */
import DotCover from "./DotCover";

export default function PostCover({ slug, cover, describe = true, eager = false, className = "" }) {
  if (!cover) return null;
  return (
    <DotCover
      src={`/covers/posts/${slug}.svg`}
      redSrc={cover.highlight != null ? `/covers/posts/${slug}.red.svg` : null}
      alt={describe ? cover.alt : ""}
      width={600}
      height={250}
      eager={eager}
      className={className}
      data-cover="post"
      data-slug={slug}
      data-values={(cover.values || []).join("|")}
    />
  );
}
