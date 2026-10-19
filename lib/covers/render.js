/**
 * Renders a project's cover form into a field. Shared by the build script
 * (static SVG under public/covers) and the share-image route.
 */
import { field, prng } from "../dotmatrix/core.js";
import { PROJECT_COVERS } from "./projects.js";

export function renderProjectCover(id, grid, box) {
  const spec = PROJECT_COVERS[id];
  if (!spec) throw new Error(`No cover form for project "${id}"`);
  const F = field(grid.cols, grid.rows);
  spec.draw(F, box, prng(`cover:${id}`));
  return F;
}
