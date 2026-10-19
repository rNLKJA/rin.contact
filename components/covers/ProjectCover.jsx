/**
 * ProjectCover — the 1C cover for a project: a halftone dot-matrix picture
 * drawn from the project's own subject (lib/covers/projects.js).
 *
 * `mark` puts data-cover="project", data-title and data-form on the image,
 * once per card. `describe` gives it its alt text; a cover inside a button
 * whose name is already the title stays decorative (empty alt) instead. The
 * alt text is English, so on zh-Hans pages the image says so (lang="en-AU") and
 * a screen reader reads it in an English voice. `red={false}` drops the red
 * overlay of a current project (the arch frame carries the red itself).
 */
import { useRouter } from "next/router";
import DotCover from "./DotCover";
import COVERS from "@/lib/covers/project-covers.json";

export default function ProjectCover({
  id,
  mark = false,
  describe = true,
  eager = false,
  red = true,
  className = "",
}) {
  const { locale } = useRouter();
  const c = COVERS[id];
  if (!c) return null;
  const data = mark ? { "data-cover": "project", "data-title": c.title, "data-form": c.form } : {};
  const lang = describe && locale === "zh-Hans" ? { lang: "en-AU" } : {};
  return (
    <DotCover
      src={`/covers/projects/${id}.svg`}
      redSrc={c.current ? `/covers/projects/${id}.red.svg` : null}
      red={red}
      alt={describe ? c.alt : ""}
      eager={eager}
      className={className}
      {...data}
      {...lang}
    />
  );
}
