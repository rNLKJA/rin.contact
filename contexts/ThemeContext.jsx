/**
 * ThemeContext — Nothing-style light/dark toggle
 * Follows system preference by default; user override persisted to localStorage.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const LS_KEY = "rin_theme";

const ThemeContext = createContext({
  resolved: "light",
  setTheme: () => {},
});

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(LS_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function getResolved(stored) {
  return stored ?? getSystemTheme();
}

export function ThemeProvider({ children }) {
  const [stored, setStored] = useState(null);
  const [resolved, setResolved] = useState("light");

  useEffect(() => {
    setStored(getStoredTheme());
    setResolved(getResolved(getStoredTheme()));
  }, []);

  useEffect(() => {
    const next = stored !== null ? stored : getSystemTheme();
    setResolved(next);
  }, [stored]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);

  useEffect(() => {
    if (stored !== null) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolved(getSystemTheme());
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [stored]);

  const setTheme = useCallback((theme) => {
    const next = theme === "light" || theme === "dark" ? theme : (resolved === "light" ? "dark" : "light");
    setStored(next);
    try {
      localStorage.setItem(LS_KEY, next);
    } catch { /* ignore */ }
  }, [resolved]);

  const toggle = useCallback(() => {
    setTheme(resolved === "light" ? "dark" : "light");
  }, [resolved, setTheme]);

  return (
    <ThemeContext.Provider value={{ resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
