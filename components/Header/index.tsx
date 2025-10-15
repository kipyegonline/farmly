'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mantine/core';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export default function Header({
  darkMode,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? darkMode
            ? 'bg-gray-900/95 border-gray-700 shadow-xl'
            : 'bg-white/95 border-gray-200 shadow-xl'
          : darkMode
          ? 'bg-gray-900/80 border-gray-700/50'
          : 'bg-white/80 border-gray-200/50'
      } border-b backdrop-blur-xl`}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <DesktopHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Mobile Header */}
        <MobileHeader
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </Box>
    </Box>
  );
}

