/**
 * ProjectCover — the 1C cover for a project: a halftone dot-matrix picture
 * drawn from the project's own subject (lib/covers/projects.js).
 *
 * `mark` puts data-cover="project", data-title and data-form on the image,
 * once per card. `describe` gives it its alt text; a cover inside a button
 * whose name is already the title stays decorative (empty alt) instead.
 */
import DotCover from "./DotCover";
import COVERS from "@/lib/covers/project-covers.json";

export default function ProjectCover({
  id,
  mark = false,
  describe = true,
  eager = false,
  className = "",
}) {
  const c = COVERS[id];
  if (!c) return null;
  const data = mark ? { "data-cover": "project", "data-title": c.title, "data-form": c.form } : {};
  return (
    <DotCover
      src={`/covers/projects/${id}.svg`}
      redSrc={c.current ? `/covers/projects/${id}.red.svg` : null}
      alt={describe ? c.alt : ""}
      eager={eager}
      className={className}
      {...data}
    />
  );
}
