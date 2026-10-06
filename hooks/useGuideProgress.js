import { useCallback, useSyncExternalStore } from "react";

/**
 * Progress for Pawsibly, the site guide, kept in localStorage under rin_guide
 * (next to rin_boot_seen, rin_theme and rin_vault). One small store shared by
 * GuideRoot, the dialogue box, the quest log and the history page's "start
 * again" button. Other tabs stay in sync through the storage event.
 *
 * Shape: { v, started, step, done: [stopIds], side: [ids], hidden, minimised }
 * The guide is off until someone presses START, so minimised starts true.
 */
const KEY = "rin_guide";

export const GUIDE_DEFAULT = Object.freeze({
  v: 1,
  started: false,
  step: 0,
  done: [],
  side: [],
  hidden: false,
  minimised: true,
});

let cache = null;
const listeners = new Set();

function read() {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null");
    cache =
      parsed && parsed.v === 1
        ? {
            ...GUIDE_DEFAULT,
            ...parsed,
            done: Array.isArray(parsed.done) ? parsed.done : [],
            side: Array.isArray(parsed.side) ? parsed.side : [],
          }
        : GUIDE_DEFAULT;
  } catch {
    cache = GUIDE_DEFAULT;
  }
  return cache;
}

function write(next) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or full storage: progress just won't survive a reload */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key !== KEY && e.key !== null) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => GUIDE_DEFAULT;

/** Update the stored progress with a patch object or an updater function. */
export function updateGuide(patch) {
  const current = read();
  write(typeof patch === "function" ? patch(current) : { ...current, ...patch });
}

/** Clear progress and open the guide at the welcome. Used by /info/history. */
export function restartGuide() {
  write({ ...GUIDE_DEFAULT, minimised: false });
}

export function useGuideProgress() {
  const state = useSyncExternalStore(subscribe, read, getServerSnapshot);
  const update = useCallback((patch) => updateGuide(patch), []);
  return [state, update];
}
