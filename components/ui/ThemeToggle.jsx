/**
 * ThemeToggle — Nothing-style sun/moon switch
 * Outlined, no fill; smooth transition.
 */
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
import Segmented from "@/components/ui/Segmented";

export default function ThemeToggle({ className = "", size = "desktop" }) {
  const { t } = useI18n();
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  const iconSize = size === "mobile" ? 20 : 18;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(isDark ? "themeToggle.switchToLight" : "themeToggle.switchToDark")}
      className={`inline-flex items-center justify-center w-10 h-10 md:w-9 md:h-9
                   border border-[#E0E0E0] dark:border-[#3D3D3D]
                   text-[#595959] dark:text-[#AAAAAA]
                   hover:border-black dark:hover:border-white
                   hover:text-black dark:hover:text-white
                   hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]
                   transition-colors duration-200
                   focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-2
                   ${className}`}
    >
      {isDark ? (
        <FiSun size={iconSize} strokeWidth={1.5} aria-hidden />
      ) : (
        <FiMoon size={iconSize} strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}

/** Settings-row variant: LIGHT | SYSTEM | DARK. Nothing is checked until the
 *  stored preference is known on the client, so hydration stays clean. */
export function ThemeSegmented({ labelledBy, size }) {
  const { t } = useI18n();
  const { theme, setTheme, mounted } = useTheme();
  return (
    <Segmented
      label={t("themeToggle.label")}
      labelledBy={labelledBy}
      options={[
        { value: "light", label: t("themeToggle.light") },
        { value: "system", label: t("themeToggle.system") },
        { value: "dark", label: t("themeToggle.dark") },
      ]}
      value={mounted ? theme : undefined}
      onChange={setTheme}
      size={size}
    />
  );
}
