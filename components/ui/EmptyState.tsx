"use client";
import React from "react";
import { Box, Flex, Text, Button, Stack } from "@mantine/core";
import {
  FileQuestion,
  Search,
  RefreshCw,
  Home,
  Sprout,
  Leaf,
  Wind,
} from "lucide-react";
import Link from "next/link";

type EmptyStateVariant = "no-results" | "error" | "no-content" | "search";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  showSearchButton?: boolean;
  onRefresh?: () => void;
  onSearch?: () => void;
  className?: string;
}

const variantConfig = {
  "no-results": {
    icon: FileQuestion,
    defaultTitle: "No articles found",
    defaultDescription: "Check back soon for new content.",
    accentColor: "emerald",
  },
  error: {
    icon: RefreshCw,
    defaultTitle: "Something went wrong",
    defaultDescription: "We couldn't load the content. Please try again.",
    accentColor: "red",
  },
  "no-content": {
    icon: Sprout,
    defaultTitle: "Nothing here yet",
    defaultDescription: "We're working on growing new content for you.",
    accentColor: "emerald",
  },
  search: {
    icon: Search,
    defaultTitle: "No search results",
    defaultDescription: "Try adjusting your search terms or filters.",
    accentColor: "blue",
  },
};

export function EmptyState({
  variant = "no-results",
  title,
  description,
  showHomeButton = false,
  showRefreshButton = false,
  showSearchButton = false,
  onRefresh,
  onSearch,
  className = "",
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <Box
      className={`relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <Box className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating leaves */}
        <Box
          className="absolute top-10 left-[10%] animate-float opacity-20"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        >
          <Leaf size={32} className="text-emerald-500 rotate-45" />
        </Box>
        <Box
          className="absolute top-20 right-[15%] animate-float opacity-15"
          style={{ animationDelay: "1s", animationDuration: "7s" }}
        >
          <Leaf size={24} className="text-emerald-400 -rotate-12" />
        </Box>
        <Box
          className="absolute bottom-20 left-[20%] animate-float opacity-20"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        >
          <Sprout size={28} className="text-green-500" />
        </Box>
        <Box
          className="absolute bottom-16 right-[25%] animate-float opacity-15"
          style={{ animationDelay: "0.5s", animationDuration: "8s" }}
        >
          <Wind size={20} className="text-emerald-300" />
        </Box>

        {/* Background glow */}
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      </Box>

      {/* Main content */}
      <Flex
        direction="column"
        align="center"
        className="relative z-10 text-center"
      >
        {/* Animated icon container */}
        <Box className="relative mb-6 sm:mb-8 animate-in fade-in zoom-in duration-500">
          {/* Outer ring */}
          <Box className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-xl animate-pulse scale-150" />

          {/* Middle ring */}
          <Box
            className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center
            bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900
            border-2 border-dashed border-gray-200 dark:border-gray-700
            animate-in spin-in-1 duration-700`}
          >
            {/* Inner icon circle */}
            <Box
              className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center
              bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30
              shadow-lg shadow-emerald-500/10 animate-bounce`}
              style={{ animationDuration: "3s" }}
            >
              <IconComponent
                size={32}
                className="text-emerald-600 dark:text-emerald-400 sm:w-9 sm:h-9 md:w-10 md:h-10"
              />
            </Box>
          </Box>

          {/* Decorative dots */}
          <Box
            className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-emerald-400 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <Box
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-green-400 animate-ping"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          />
        </Box>

        {/* Title */}
        <Text
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4
          animate-in fade-in slide-in-from-bottom duration-500"
          style={{ animationDelay: "200ms" }}
        >
          {title || config.defaultTitle}
        </Text>

        {/* Description */}
        <Text
          className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed
          animate-in fade-in slide-in-from-bottom duration-500"
          style={{ animationDelay: "400ms" }}
        >
          {description || config.defaultDescription}
        </Text>

        {/* Action buttons */}
        <Flex
          gap="sm"
          wrap="wrap"
          justify="center"
          className="animate-in fade-in slide-in-from-bottom duration-500"
          style={{ animationDelay: "600ms" }}
        >
          {showHomeButton && (
            <Button
              component={Link}
              href="/"
              leftSection={<Home size={18} />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              size="md"
              radius="xl"
            >
              Go Home
            </Button>
          )}

          {showRefreshButton && (
            <Button
              onClick={onRefresh}
              leftSection={
                <RefreshCw
                  size={18}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
              }
              variant="outline"
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group"
              size="md"
              radius="xl"
            >
              Try Again
            </Button>
          )}

          {showSearchButton && (
            <Button
              onClick={onSearch}
              leftSection={<Search size={18} />}
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              size="md"
              radius="xl"
            >
              Search
            </Button>
          )}
        </Flex>

        {/* Helpful tips */}
        {variant === "search" && (
          <Stack
            gap="xs"
            className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 max-w-sm mx-auto
            animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: "800ms" }}
          >
            <Text className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              💡 Search tips:
            </Text>
            <Text className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              • Try using different keywords
            </Text>
            <Text className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              • Check your spelling
            </Text>
            <Text className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              • Use broader search terms
            </Text>
          </Stack>
        )}

        {/* Farming-themed encouragement for no-content */}
        {variant === "no-content" && (
          <Box
            className="mt-8 sm:mt-10 animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: "800ms" }}
          >
            <Flex
              align="center"
              gap="xs"
              className="text-xs sm:text-sm text-gray-400 dark:text-gray-500"
            >
              <Sprout size={16} className="text-emerald-500 animate-pulse" />
              <Text>Good things take time to grow...</Text>
              <Leaf size={16} className="text-green-500" />
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
