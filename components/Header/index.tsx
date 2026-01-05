"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useMediaQuery } from "@mantine/hooks";

type HeaderProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-gray-900/95 border-gray-700 shadow-xl"
            : "bg-white/95 border-gray-200 shadow-xl"
          : isDark
          ? "bg-gray-900/80 border-gray-700/50"
          : "bg-white/80 border-gray-200/50"
      } border-b backdrop-blur-xl`}
    >
      <Box className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        {!isMobile && (
          <DesktopHeader
            isDark={isDark}
            toggleColorScheme={toggleColorScheme}
          />
        )}

        {/* Mobile Header */}
        {isMobile && (
          <MobileHeader
            isDark={isDark}
            toggleColorScheme={toggleColorScheme}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </Box>
    </Box>
  );
}
