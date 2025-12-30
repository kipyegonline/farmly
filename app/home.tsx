"use client";
import React from "react";
import { Box, Flex, Text, Stack, Skeleton } from "@mantine/core";
import { ChevronRight, AlertCircle } from "lucide-react";
import Article from "@/components/Article/Article";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import Link from "next/link";

const categories = [
  "Sustainable Agriculture",
  "Organic Farming",
  "Agroecology",
  "Soil Health",
  "Water Management",
  "Pest Control",
];

export default function Farmly() {
  // Fetch articles from Contentful
  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ["newsPosts"],
    queryFn: async () => {
      const posts = await getAllNewsPosts(false);
      return transformContentfulPosts(posts);
    },
  });

  // Use Contentful data or fallback to sample articles
  const displayArticles = articles && articles.length > 0 ? articles : [];

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Flex gap="xl" className="relative">
        {/* Articles Section */}
        <Box className="flex-1">
          <Text className="text-3xl md:text-4xl font-bold mb-8 animate-in slide-in-from-bottom duration-700">
            Latest in Sustainable Agriculture
          </Text>

          <Stack gap="xl">
            {isLoading ? (
              <Stack gap="xl">
                {[1, 2, 3].map((i) => (
                  <Box key={i} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <Flex gap="lg" className="flex-col md:flex-row">
                      <Skeleton height={192} radius="xl" className="md:w-2/5" />
                      <Box className="md:w-3/5">
                        <Skeleton height={28} width="80%" mb="sm" />
                        <Skeleton height={16} mb="xs" />
                        <Skeleton height={16} mb="xs" />
                        <Skeleton height={16} width="60%" mb="md" />
                        <Flex gap="md">
                          <Skeleton height={14} width={80} />
                          <Skeleton height={14} width={100} />
                          <Skeleton height={14} width={60} />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            ) : isError ? (
              <Box className="text-center py-12">
                <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Failed to load articles
                </Text>
                <Text className="text-gray-500">
                  Please try again later.
                </Text>
              </Box>
            ) : displayArticles.length === 0 ? (
              <Box className="text-center py-12">
                <Text className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No articles found
                </Text>
                <Text className="text-gray-500">
                  Check back soon for new content.
                </Text>
              </Box>
            ) : (
              displayArticles.map((article, index) => (
                <Article
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))
            )}
          </Stack>
        </Box>

        {/* Sidebar - Hidden on mobile */}
        <Box className="w-80 hidden lg:block">
          <Box className="sticky top-24 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-in slide-in-from-right duration-700">
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
                  onKeyDown={(e) => e.key === 'Enter' && console.log(`Filter by: ${category}`)}
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
                {displayArticles.slice(0, 3).map((article, index) => (
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
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
