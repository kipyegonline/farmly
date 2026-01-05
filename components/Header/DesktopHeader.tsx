"use client";
import React from "react";
import { Flex, Box, Text, Button, Image, ActionIcon } from "@mantine/core";
import { Leaf, Sun, Moon } from "lucide-react";
import Link from "next/link";

type DesktopHeaderProps = {
  isDark: boolean;
  toggleColorScheme: () => void;
};

export default function DesktopHeader({
  isDark,
  toggleColorScheme,
}: DesktopHeaderProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      className="h-20  hidden md:flex"
    >
      <Link href="/" className="group">
        <Flex align="center" gap="md" className="cursor-pointer">
          <Box
            className={`p-2 hidden rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              isDark
                ? "bg-gradient-to-br from-emerald-900 to-emerald-800"
                : "bg-gradient-to-br from-emerald-100 to-emerald-200"
            }`}
          >
            <Leaf className="text-emerald-600 animate-float" size={28} />
          </Box>
          <Box className="flex items-center h-10">
            <Image
              src="/farmly_logo.png"
              alt="Farmly logo"
              w={120}
              h={80}
              fit="contain"
            />
          </Box>
        </Flex>
      </Link>

      <Flex align="center" gap="md">
        <ActionIcon
          variant="subtle"
          onClick={toggleColorScheme}
          size="xl"
          radius="xl"
          className={`transition-all duration-300 hover:scale-110 hover:rotate-12 ${
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          {isDark ? (
            <Sun size={22} className="text-yellow-400" />
          ) : (
            <Moon size={22} className="text-gray-700" />
          )}
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
