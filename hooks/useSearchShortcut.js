import { useSyncExternalStore } from "react";

/**
 * The site search shortcut: ⌘K on Apple devices, Ctrl+K everywhere else. The
 * header listens for it, and pages can open the palette with openSearch().
 * Kept tiny because the header ships it with every page. The palette itself
 * lives in components/search/CommandPalette.jsx and loads on first use.
 */
export const OPEN_SEARCH_EVENT = "rin:open-search";

export function isApplePlatform() {
  if (typeof navigator === "undefined") return true;
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}

/**
 * ⌘K on Apple devices and Ctrl+K elsewhere. Ctrl+K on a Mac is left alone
 * because text fields use it to delete to the end of the line.
 */
export function isSearchShortcut(e) {
  if (e.isComposing || e.altKey || e.shiftKey) return false;
  if ((e.key || "").toLowerCase() !== "k") return false;
  return isApplePlatform() ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey;
}

/** Ask the header to open the palette (for buttons inside page content). */
export function openSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}

const subscribe = () => () => {};
const clientLabel = () => (isApplePlatform() ? "⌘K" : "Ctrl+K");
const serverLabel = () => "⌘K";

/** "⌘K" or "Ctrl+K" for this device. The server render says ⌘K. */
export function useSearchShortcutLabel() {
  return useSyncExternalStore(subscribe, clientLabel, serverLabel);
}
