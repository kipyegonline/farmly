"use client";
import React from "react";
import { Box, Flex, Text, Stack, Skeleton, Pagination } from "@mantine/core";
import { AlertCircle } from "lucide-react";
import Article from "@/components/Article/Article";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import { usePagination } from "@/components/ui/PaginatedList";

const ARTICLES_PER_PAGE = 15;

export default function Farmly() {
  // Fetch articles from Contentful
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsPosts"],
    queryFn: async () => {
      const posts = await getAllNewsPosts(false);
      return transformContentfulPosts(posts);
    },
  });

  // Use Contentful data or fallback to sample articles
  const displayArticles = articles && articles.length > 0 ? articles : [];

  // Pagination for main articles list
  const {
    paginatedItems: paginatedArticles,
    activePage: articlesPage,
    setActivePage: setArticlesPage,
    totalPages: articlesTotalPages,
    shouldShowPagination: showArticlesPagination,
    startIndex: articlesStartIndex,
    endIndex: articlesEndIndex,
    totalItems: totalArticles,
  } = usePagination(displayArticles, ARTICLES_PER_PAGE);

  return (
    <Box>
      <Text className="text-3xl md:text-4xl font-bold mb-8 animate-in slide-in-from-bottom duration-700">
        Latest in Sustainable Agriculture
      </Text>

      <Stack gap="xl">
        {isLoading ? (
          <Stack gap="xl">
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
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
            <Text className="text-gray-500">Please try again later.</Text>
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
          <>
            {paginatedArticles.map((article, index) => (
              <Article
                key={article.id}
                article={article}
                index={(articlesPage - 1) * ARTICLES_PER_PAGE + index}
              />
            ))}

            {/* Pagination for main articles */}
            {showArticlesPagination && (
              <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                gap="md"
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {articlesStartIndex}-{articlesEndIndex} of{" "}
                  {totalArticles} articles
                </Text>
                <Pagination
                  total={articlesTotalPages}
                  value={articlesPage}
                  onChange={setArticlesPage}
                  size="sm"
                  radius="md"
                  withEdges
                  classNames={{
                    control:
                      "border-gray-300 dark:border-gray-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 data-[active=true]:bg-emerald-600 data-[active=true]:border-emerald-600",
                  }}
                />
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
