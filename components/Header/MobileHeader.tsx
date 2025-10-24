"use client";
import React from "react";
import { Flex, Box, Text, Button } from "@mantine/core";
import { Leaf, Sun, Moon, Menu } from "lucide-react";
import Link from "next/link";

type MobileHeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export default function MobileHeader({
  darkMode,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileHeaderProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      className="h-16 md:hidden border-red"
    >
      <Link href="/">
        <Flex align="center" gap="sm" className="cursor-pointer">
          <Box
            className={`p-1.5 rounded-lg transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-emerald-900 to-emerald-800"
                : "bg-gradient-to-br from-emerald-100 to-emerald-200"
            }`}
          >
            <Leaf className="text-emerald-600" size={20} />
          </Box>
          <Text
            className={`text-lg font-bold ${
              darkMode ? "text-emerald-400" : "gradient-text"
            }`}
          >
            Farmly
          </Text>
        </Flex>
      </Link>

      <Flex align="center" gap="sm">
        <Button
          variant="subtle"
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:scale-110 transition-transform duration-300 interactive-scale ripple-effect"
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </Button>
        <Button
          variant="subtle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden interactive-scale ripple-effect"
        >
          <Menu size={18} />
        </Button>
      </Flex>
    </Flex>
  );
}
