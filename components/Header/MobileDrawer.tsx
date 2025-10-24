"use client";
import React from "react";
import { Drawer, Stack, Text } from "@mantine/core";

type MobileDrawerProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  categories: string[];
  darkMode: boolean;
};

export default function MobileDrawer({
  mobileMenuOpen,
  setMobileMenuOpen,
  categories,
  darkMode,
}: MobileDrawerProps) {
  return (
    <Drawer
      opened={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      position="right"
      size="sm"
      className={`md:hidden ${
        darkMode ? " bg-gray-900 text-white" : "bg-white text-gray-900"
      } `}
      title={
        <Text
          className={`text-lg font-bold text-emerald-600 dark:text-emerald-400 ${
            darkMode ? " bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          Farmly
        </Text>
      }
    >
      <Stack
        gap="lg"
        className={`p-4 ${
          darkMode ? " bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Text
          className={`text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold`}
        >
          Categories
        </Text>
        {categories.map((category, index) => (
          <Text
            key={category}
            className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 animate-fadeInRight interactive-scale"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {category}
          </Text>
        ))}
      </Stack>
    </Drawer>
  );
}
