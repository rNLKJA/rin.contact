/**
 * The search engine behind the tic-tac-toe lesson on /projects/teaching.
 * Written from scratch for this page. Plain JavaScript, no library, nothing
 * stored or sent.
 *
 * A board is an array of nine cells, read left to right and top to bottom,
 * each "X", "O" or null. X moves first. Scores are from X's side: +1 when X
 * wins, -1 when O wins, 0 for a draw. X maximises and O minimises.
 *
 * `minimax` and `alphaBeta` are the two functions the code panel shows
 * (CODE in lib/demos/teaching-data.js). Keep the two in step. The only
 * additions here are the counters: `stats.nodes` adds one for every position a
 * search visits, and `stats.cuts` adds one each time alpha-beta stops a branch.
 */

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const FLAT = LINES.flat();

/** The order a search tries the empty cells in. */
export const ORDERS = {
  reading: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  centre: [4, 0, 2, 6, 8, 1, 3, 5, 7],
};

export const EMPTY = Object.freeze(Array(9).fill(null));

export const other = (player) => (player === "X" ? "O" : "X");

/** X moves first, so X is to move whenever the two marks are level. */
export function toMove(board) {
  const xs = board.filter((c) => c === "X").length;
  const os = board.filter((c) => c === "O").length;
  return xs === os ? "X" : "O";
}

/** The winning line, or null. */
export function winningLine(board) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
  }
  return null;
}

/**
 * +1 X won, -1 O won, 0 draw, null while the game is still going. Plain loops,
 * because the full game from an empty board calls this over half a million times.
 */
export function finalScore(board) {
  for (let i = 0; i < 24; i += 3) {
    const v = board[FLAT[i]];
    if (v && v === board[FLAT[i + 1]] && v === board[FLAT[i + 2]]) return v === "X" ? 1 : -1;
  }
  for (let i = 0; i < 9; i++) if (board[i] === null) return null;
  return 0;
}

export function minimax(board, player, order, stats) {
  stats.nodes += 1;
  const score = finalScore(board);
  if (score !== null) return score;
  let best = player === "X" ? -Infinity : Infinity;
  for (const cell of order) {
    if (board[cell]) continue;
    board[cell] = player;
    const value = minimax(board, other(player), order, stats);
    board[cell] = null;
    best = player === "X" ? Math.max(best, value) : Math.min(best, value);
  }
  return best;
}

export function alphaBeta(board, player, alpha, beta, order, stats) {
  stats.nodes += 1;
  const score = finalScore(board);
  if (score !== null) return score;
  let best = player === "X" ? -Infinity : Infinity;
  for (const cell of order) {
    if (board[cell]) continue;
    board[cell] = player;
    const value = alphaBeta(board, other(player), alpha, beta, order, stats);
    board[cell] = null;
    best = player === "X" ? Math.max(best, value) : Math.min(best, value);
    if (player === "X") alpha = Math.max(alpha, best);
    else beta = Math.min(beta, best);
    if (alpha >= beta) {
      stats.cuts += 1;
      break;
    }
  }
  return best;
}

/**
 * Minimax visits every position under a move whatever the order, so its value
 * and count depend on the position alone. Keep them for the visit: the empty
 * board costs over half a million positions, and switching the search order
 * should not pay that twice.
 */
const MINIMAX_SEEN = new Map();

function minimaxOf(board, player) {
  const key = board.map((c) => c || ".").join("");
  let hit = MINIMAX_SEEN.get(key);
  if (!hit) {
    const stats = { nodes: 0, cuts: 0 };
    const value = minimax(board, player, ORDERS.reading, stats);
    hit = { value, nodes: stats.nodes };
    if (MINIMAX_SEEN.size > 2000) MINIMAX_SEEN.clear();
    MINIMAX_SEEN.set(key, hit);
  }
  return hit;
}

/**
 * Run both searches from `board`, one root move at a time, so the page can show
 * what each move cost. Returns null when the game is already over.
 *
 * For every legal move, in search order: its exact value (minimax), the
 * positions each search visited under it, and what alpha-beta learned. A move
 * alpha-beta marks `exact` set a new best. Any other move came back as a bound:
 * it is known not to beat the best move found before it, so the search moved on.
 * Totals count the starting position once for each search.
 */
export function analyse(board, orderKey = "reading") {
  if (finalScore(board) !== null) return null;
  const order = ORDERS[orderKey] || ORDERS.reading;
  const player = toMove(board);
  const next = other(player);
  const maximising = player === "X";
  const b = [...board];

  let alpha = -Infinity;
  let beta = Infinity;
  let bestCell = null;
  let bestValue = maximising ? -Infinity : Infinity;
  const rows = [];

  for (const cell of order) {
    if (b[cell]) continue;
    b[cell] = player;
    const mm = minimaxOf(b, next);
    const value = mm.value;
    const ab = { nodes: 0, cuts: 0 };
    const abValue = alphaBeta(b, next, alpha, beta, order, ab);
    b[cell] = null;

    const exact = abValue > alpha && abValue < beta;
    rows.push({
      cell,
      value,
      exact,
      beatenBy: exact ? null : bestCell,
      minimaxNodes: mm.nodes,
      alphaBetaNodes: ab.nodes,
      cuts: ab.cuts,
    });
    if (maximising ? value > bestValue : value < bestValue) {
      bestValue = value;
      bestCell = cell;
    }
    if (maximising) alpha = Math.max(alpha, abValue);
    else beta = Math.min(beta, abValue);
  }

  return { player, rows, bestCell, value: bestValue };
}

/** Running totals over the first `n` rows (all rows when n is omitted). */
export function totals(rows, n = rows.length) {
  const shown = rows.slice(0, n);
  const minimaxNodes = 1 + shown.reduce((s, r) => s + r.minimaxNodes, 0);
  const alphaBetaNodes = 1 + shown.reduce((s, r) => s + r.alphaBetaNodes, 0);
  const cuts = shown.reduce((s, r) => s + r.cuts, 0);
  const saved = minimaxNodes > 0 ? Math.round((1 - alphaBetaNodes / minimaxNodes) * 100) : 0;
  return { minimaxNodes, alphaBetaNodes, cuts, saved };
}
