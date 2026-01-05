"use client";
import { useEffect } from "react";
import { useComputedColorScheme } from "@mantine/core";

/**
 * Component that syncs Mantine's color scheme with Tailwind's dark mode class.
 * Must be rendered inside MantineProvider.
 */
export function ColorSchemeSync() {
  // Get the actual computed color scheme (resolves 'auto' to 'light' or 'dark')
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  // Sync Tailwind's dark class with Mantine's color scheme
  useEffect(() => {
    const isDark = computedColorScheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, [computedColorScheme]);

  return null;
}
