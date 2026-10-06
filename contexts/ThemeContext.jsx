/**
 * ThemeContext — Nothing-style theme preference: light, dark or system.
 * A missing preference still means light (the owner's default); "system"
 * follows prefers-color-scheme live, and only listens while it is chosen.
 * The pre-paint script in _document resolves the same way, so a reload never
 * flashes the wrong theme.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const LS_KEY = "rin_theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const PREFS = ["light", "dark", "system"];

const ThemeContext = createContext({
  theme: "light",
  resolved: "light",
  setTheme: () => {},
  toggle: () => {},
  mounted: false,
});

function readPref() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return PREFS.includes(v) ? v : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [systemDark, setSystemDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read the stored preference (and the OS scheme) once on mount, together,
  // so the first applied theme matches what the pre-paint script set.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from localStorage */
    setThemeState(readPref() ?? "light");
    setSystemDark(window.matchMedia(DARK_QUERY).matches);
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Follow the OS only while "system" is the preference.
  useEffect(() => {
    if (theme !== "system") return undefined;
    const mq = window.matchMedia(DARK_QUERY);
    const update = () => setSystemDark(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [theme]);

  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.setAttribute("data-theme", resolved);
    // Update theme-color meta for browser chrome (manual toggle overrides system media query)
    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#0A0A0A" : "#ffffff");
  }, [resolved, mounted]);

  const setTheme = useCallback((next) => {
    if (!PREFS.includes(next)) return;
    setThemeState(next);
    try {
      localStorage.setItem(LS_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // Today's one-button behaviour: switch to the explicit opposite of what shows.
  const toggle = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
