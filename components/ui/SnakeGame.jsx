import { useEffect, useRef, useState, useCallback } from "react";

const COLS = 20;
const ROWS = 14;
const CELL = 16;
const W    = COLS * CELL;
const H    = ROWS * CELL;
const TICK = 140;

const DIR = { UP: [0, -1], DOWN: [0, 1], LEFT: [-1, 0], RIGHT: [1, 0] };

function rndFood(snake) {
  let pos;
  do {
    pos = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
  } while (snake.some(([sx, sy]) => sx === pos[0] && sy === pos[1]));
  return pos;
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const tickRef   = useRef(null);
  const [status, setStatus] = useState("idle");
  const [score,  setScore]  = useState(0);
  const [best,   setBest]   = useState(0);

  const initState = useCallback(() => {
    const snake = [[10, 7], [9, 7], [8, 7]];
    return { snake, dir: DIR.RIGHT, next: DIR.RIGHT, food: rndFood(snake), score: 0 };
  }, []);

  const draw = useCallback((st) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0C0C0C";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1A1A1A";
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
    ctx.fillStyle = "#FF3C3C";
    ctx.beginPath();
    ctx.arc(st.food[0] * CELL + CELL / 2, st.food[1] * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    st.snake.forEach(([x, y], i) => {
      const alpha = i === 0 ? 1 : 0.4 + 0.5 * (1 - i / st.snake.length);
      ctx.fillStyle = `rgba(204,204,204,${alpha})`;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const tick = useCallback(() => {
    const st = stateRef.current;
    if (!st) return;
    st.dir = st.next;
    const [hx, hy] = st.snake[0];
    const [dx, dy] = st.dir;
    const nx = (hx + dx + COLS) % COLS;
    const ny = (hy + dy + ROWS) % ROWS;
    if (st.snake.some(([sx, sy]) => sx === nx && sy === ny)) {
      setStatus("dead");
      setBest((b) => Math.max(b, st.score));
      clearInterval(tickRef.current);
      return;
    }
    const ate = nx === st.food[0] && ny === st.food[1];
    const newSnake = [[nx, ny], ...st.snake];
    if (!ate) newSnake.pop();
    st.snake = newSnake;
    if (ate) { st.score++; st.food = rndFood(newSnake); setScore(st.score); }
    draw(st);
  }, [draw]);

  const start = useCallback(() => {
    clearInterval(tickRef.current);
    const st = initState();
    stateRef.current = st;
    draw(st);
    setScore(0);
    setStatus("playing");
    tickRef.current = setInterval(tick, TICK);
  }, [initState, draw, tick]);

  // Draw idle screen on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0C0C0C";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#2A2A2A";
    ctx.font = "10px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("press SPACE or tap Start", W / 2, H / 2);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      const s = stateRef.current;
      if (e.code === "Space") { e.preventDefault(); if (status !== "playing") start(); return; }
      if (!s || status !== "playing") return;
      if (e.key === "ArrowUp"    && s.dir !== DIR.DOWN)  s.next = DIR.UP;
      if (e.key === "ArrowDown"  && s.dir !== DIR.UP)    s.next = DIR.DOWN;
      if (e.key === "ArrowLeft"  && s.dir !== DIR.RIGHT) s.next = DIR.LEFT;
      if (e.key === "ArrowRight" && s.dir !== DIR.LEFT)  s.next = DIR.RIGHT;
      if ((e.key === "w" || e.key === "W") && s.dir !== DIR.DOWN)  s.next = DIR.UP;
      if ((e.key === "s" || e.key === "S") && s.dir !== DIR.UP)    s.next = DIR.DOWN;
      if ((e.key === "a" || e.key === "A") && s.dir !== DIR.RIGHT) s.next = DIR.LEFT;
      if ((e.key === "d" || e.key === "D") && s.dir !== DIR.LEFT)  s.next = DIR.RIGHT;
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearInterval(tickRef.current); };
  }, [status, start]);

  const mobileDir = useCallback((d) => {
    const s = stateRef.current;
    if (!s || status !== "playing") return;
    if (d === "UP"    && s.dir !== DIR.DOWN)  s.next = DIR.UP;
    if (d === "DOWN"  && s.dir !== DIR.UP)    s.next = DIR.DOWN;
    if (d === "LEFT"  && s.dir !== DIR.RIGHT) s.next = DIR.LEFT;
    if (d === "RIGHT" && s.dir !== DIR.LEFT)  s.next = DIR.RIGHT;
  }, [status]);

  const btn = "border border-[#2A2A2A] text-[#555] font-mono text-xs px-3 py-2 hover:border-[#555] hover:text-[#888] transition-colors select-none touch-manipulation";

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#555]">
          snake — while you wait
        </p>
        <div className="flex gap-4 font-mono text-[10px] text-[#3A3A3A]">
          <span>score: <span className="text-[#888]">{score}</span></span>
          <span>best: <span className="text-[#888]">{best}</span></span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="block border border-[#1E1E1E]"
        style={{ imageRendering: "pixelated" }}
      />

      {status === "dead" && (
        <p className="font-mono text-[10px] text-[#FF3C3C] mt-1.5">
          self-collision detected · score: {score} · SPACE to retry
        </p>
      )}

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <button onClick={start} className={btn}>
          {status === "idle" ? "▶ Start" : "↺ Restart"}
        </button>
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={() => mobileDir("LEFT")}  className={btn}>←</button>
          <div className="flex flex-col gap-1">
            <button onClick={() => mobileDir("UP")}   className={btn}>↑</button>
            <button onClick={() => mobileDir("DOWN")}  className={btn}>↓</button>
          </div>
          <button onClick={() => mobileDir("RIGHT")} className={btn}>→</button>
        </div>
        <p className="hidden md:block font-mono text-[9px] text-[#2A2A2A]">
          arrow keys / WASD · SPACE to start
        </p>
      </div>
    </div>
  );
}
