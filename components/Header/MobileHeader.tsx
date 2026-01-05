"use client";
import React from "react";
import { Flex, Box, Text, Button, Image, ActionIcon } from "@mantine/core";
import { Leaf, Sun, Moon, Menu } from "lucide-react";
import Link from "next/link";

type MobileHeaderProps = {
  isDark: boolean;
  toggleColorScheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export default function MobileHeader({
  isDark,
  toggleColorScheme,
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
        <ActionIcon
          variant="subtle"
          onClick={toggleColorScheme}
          size="lg"
          radius="xl"
          className="hover:scale-110 transition-transform duration-300"
        >
          {isDark ? (
            <Sun size={24} className="text-yellow-400" />
          ) : (
            <Moon size={24} className="text-gray-700 dark:text-gray-300" />
          )}
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          size="lg"
          radius="xl"
          className="md:hidden"
        >
          <Menu size={24} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
