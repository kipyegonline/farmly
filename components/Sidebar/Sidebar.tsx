"use client";
import React from "react";
import { Box, Flex, Text, Stack, Skeleton, Pagination } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import { usePagination } from "@/components/ui/PaginatedList";

const POPULAR_ARTICLES_PER_PAGE = 10;

const categories = [
  "Sustainable Agriculture",
  "Organic Farming",
  "Agroecology",
  "Soil Health",
  "Water Management",
  "Pest Control",
];

export function Sidebar() {
  // Fetch articles from Contentful (shares cache with home page via React Query)
  const { data: articles, isLoading } = useQuery({
    queryKey: ["newsPosts"],
    queryFn: async () => {
      const posts = await getAllNewsPosts(false);
      return transformContentfulPosts(posts);
    },
  });

  const displayArticles = articles && articles.length > 0 ? articles : [];

  // Pagination for popular articles
  const {
    paginatedItems: paginatedPopularArticles,
    activePage: popularPage,
    setActivePage: setPopularPage,
    totalPages: popularTotalPages,
    shouldShowPagination: showPopularPagination,
  } = usePagination(displayArticles, POPULAR_ARTICLES_PER_PAGE);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box className="w-80 hidden lg:block shrink-0">
      <Box className="sticky top-24 p-6 rounded-lg bg-gray-50 dark:text-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-in slide-in-from-right duration-700">
        <Text className="font-bold text-lg mb-4">Categories</Text>
        <Stack gap="sm">
          {categories.map((category, index) => (
            <Flex
              key={category}
              justify="space-between"
              align="center"
              role="button"
              tabIndex={0}
              aria-label={`View ${category} articles`}
              onKeyDown={(e) =>
                e.key === "Enter" && console.log(`Filter by: ${category}`)
              }
              className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-right duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <Text className="text-sm">{category}</Text>
              <ChevronRight size={14} className="text-gray-400" />
            </Flex>
          ))}
        </Stack>

        <Box className="mt-8">
          <Text className="font-bold text-lg mb-4">Popular Articles</Text>
          <Stack gap="sm">
            {isLoading
              ? // Loading skeleton for popular articles
                Array.from({ length: 3 }).map((_, i) => (
                  <Box key={i} className="p-2">
                    <Skeleton height={16} width="90%" mb="xs" />
                    <Skeleton height={12} width="50%" />
                  </Box>
                ))
              : paginatedPopularArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/${article.slug}`}
                    className="block no-underline cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-right duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <Text className="text-sm font-medium line-clamp-2 mb-1">
                      {article.title}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                      {article?.date ? formatDate(article.date) : null}
                    </Text>
                  </Link>
                ))}
          </Stack>

          {/* Pagination for popular articles */}
          {showPopularPagination && (
            <Flex
              justify="center"
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <Pagination
                total={popularTotalPages}
                value={popularPage}
                onChange={setPopularPage}
                size="xs"
                radius="md"
                siblings={0}
                boundaries={1}
                classNames={{
                  control:
                    "border-gray-300 dark:border-gray-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 data-[active=true]:bg-emerald-600 data-[active=true]:border-emerald-600",
                }}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}
