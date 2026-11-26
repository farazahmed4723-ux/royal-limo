"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

const emptySubscribe = () => () => {};

function subscribeThemeAttr(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot(): "day" | "night" {
  if (typeof document === "undefined") return "night";
  const currentAttr = document.documentElement.getAttribute("data-theme");
  if (currentAttr === "day" || currentAttr === "night") {
    return currentAttr;
  }
  try {
    const saved =
      localStorage.getItem("luxury-theme-mode") ||
      localStorage.getItem("royal12-theme");
    if (saved === "day" || saved === "light") return "day";
    if (saved === "night" || saved === "dark") return "night";
  } catch {
    // ignore storage restriction
  }
  return "night";
}

export default function ThemeToggle({ showLabel = false, className = "" }: ThemeToggleProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const theme = useSyncExternalStore(
    subscribeThemeAttr,
    getThemeSnapshot,
    () => "night"
  );

  const toggleTheme = () => {
    const nextTheme: "day" | "night" = theme === "night" ? "day" : "night";

    try {
      localStorage.setItem("luxury-theme-mode", nextTheme);
      localStorage.setItem("royal12-theme", nextTheme === "day" ? "light" : "dark");
    } catch {
      // ignore storage restriction
    }

    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.classList.remove("day", "night", "light-mode");
    root.classList.add(nextTheme);
    if (nextTheme === "day") {
      root.classList.add("light-mode");
    }
  };

  const isDay = theme === "day";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--accent-gold)] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg focus:outline-none cursor-pointer flex-shrink-0 ${className}`}
      aria-label={`Switch to ${isDay ? "Night" : "Day"} Mode`}
      title={`Switch to ${isDay ? "Night" : "Day"} Mode`}
    >
      {/* Icon */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        {mounted && isDay ? (
          <Moon className="w-4 h-4 text-[var(--accent-gold)] group-hover:rotate-12 transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-[var(--accent-gold)] group-hover:rotate-90 transition-transform duration-300" />
        )}
      </div>

      {/* Optional Text Label for Mobile Drawer or Explicit Modes */}
      {showLabel && (
        <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide whitespace-nowrap">
          {isDay ? "Night Mode" : "Day Mode"}
        </span>
      )}
    </button>
  );
}
