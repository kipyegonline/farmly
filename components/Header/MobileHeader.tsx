"use client";
import React from "react";
import { Flex, Box, Text, Button, Image } from "@mantine/core";
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
    <Flex justify="space-between" align="center" className="h-16 md:hidden ">
      <Link href="/">
        <Flex align="center" gap="sm" className="cursor-pointer h-10">
          <Image
            src="/farmly_logo.png"
            alt="Farmly logo"
            w={200}
            h={80}
            fit="contain"
          />
        </Flex>
      </Link>

      <Flex align="center" gap="sm">
        <Button
          variant="subtle"
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:scale-110 transition-transform duration-300 interactive-scale ripple-effect"
        >
          {darkMode ? (
            <Sun size={30} className="text-yellow-400" />
          ) : (
            <Moon size={30} className="text-gray-700" />
          )}
        </Button>
        <Button
          variant="subtle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden interactive-scale ripple-effect"
        >
          <Menu size={30} />
        </Button>
      </Flex>
    </Flex>
  );
}
