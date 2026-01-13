"use client";
import React from "react";
import { Box, Flex, Text, Stack, Skeleton, Pagination } from "@mantine/core";

import Article from "@/components/Article/Article";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import { usePagination } from "@/components/ui/PaginatedList";
import { EmptyState } from "@/components/ui/EmptyState";
import { ar } from "date-fns/locale";
import LoadingSkeleton from "@/components/ui/LoadingSkeleon";

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
  //console.log("displayArticles:___", displayArticles);
  return (
    <Box>
      <Text
        style={{ fontSize: "clamp(1.25rem, 2vw + 1rem, 2.5rem)" }}
        className="font-bold mb-4 sm:mb-6 md:mb-8 animate-in slide-in-from-bottom duration-700 py-2 bg-gradient-to-r from-emerald-600 via-green-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-sweep"
      >
        Latest in Sustainable Agriculture...
      </Text>

      <Stack gap="xl">
        {isLoading ? (
          <Stack gap="xl">
            {[1, 2, 3].map((i) => (
              <LoadingSkeleton index={i} />
            ))}
          </Stack>
        ) : isError ? (
          <EmptyState
            variant="error"
            title="Failed to load articles"
            description="We couldn't fetch the latest articles. Please try again."
            showRefreshButton
            onRefresh={() => window.location.reload()}
          />
        ) : displayArticles.length === 0 ? (
          <EmptyState
            variant="no-content"
            title="No articles found"
            description="We're cultivating fresh content for you. Check back soon!"
          />
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
