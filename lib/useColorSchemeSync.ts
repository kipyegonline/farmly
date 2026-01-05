"use client";
import { useEffect } from "react";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

/**
 * Hook to sync Mantine's color scheme with Tailwind's dark mode class
 * This ensures both Mantine components and Tailwind utilities respond to the same color scheme
 */
export function useColorSchemeSync() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useMantineColorScheme();

  // Get the actual computed color scheme (resolves 'auto' to 'light' or 'dark')
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  // Sync Tailwind's dark class with Mantine's color scheme
  useEffect(() => {
    const isDark = computedColorScheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, [computedColorScheme]);

  return {
    colorScheme,
    computedColorScheme,
    isDark: computedColorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
