"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import { Box, Text, Loader, Alert, Container, Flex } from "@mantine/core";
import Article from "@/components/Article/Article";
import { Article as ArticleType, ArticleUI } from "@/types/types";
import { Sparkles, TrendingUp, Newspaper } from "lucide-react";

export default function HomePageComponent() {
  const [darkMode, setDarkMode] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["newsPosts"],
    queryFn: async () => {
      const posts = await getAllNewsPosts(false);
      return transformContentfulPosts(posts) as ArticleUI[];
    },
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  if (isLoading) {
    return (
      <Box className="flex flex-col justify-center items-center py-32 min-h-screen">
        <Box className="relative">
          <Loader size="xl" color="green" className="animate-pulse" />
          <Box className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        </Box>
        <Text className="mt-8 text-xl font-semibold text-gray-600 dark:text-gray-400 animate-pulse">
          Loading amazing content...
        </Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Container size="md" className="py-16">
        <Alert
          color="red"
          title="Oops! Something went wrong"
          className="animate-fadeInUp shadow-xl rounded-2xl border-2 border-red-200"
        >
          <Text className="text-gray-700">
            {error?.message || "Failed to load articles from Contentful"}
          </Text>
        </Alert>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container size="md" className="py-16">
        <Alert
          color="yellow"
          title="No articles yet"
          className="animate-fadeInUp shadow-xl rounded-2xl border-2 border-yellow-200"
        >
          <Text className="text-gray-700">
            No articles available at the moment. Check back soon for fresh
            content!
          </Text>
        </Alert>
      </Container>
    );
  }

  const handleArticleClick = (slug: string) => {
    return () => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.href = `/article/${slug}`;
        });
      } else {
        window.location.href = `/article/${slug}`;
      }
    };
  };

  return (
    <Box
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Hero Section */}
      <Box className="relative overflow-hidden pt-32 pb-16">
        {/* Animated background elements */}
        <Box className="absolute inset-0 overflow-hidden pointer-events-none">
          <Box className="absolute top-20 -left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <Box
            className="absolute top-40 -right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <Box
            className="absolute -bottom-20 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </Box>

        <Container size="xl" className="relative z-10">
          <Box className="text-center mb-16 animate-fadeInDown">
            <Flex justify="center" className="mb-6">
              <Box className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-2xl animate-float">
                <Newspaper size={48} className="text-white" />
              </Box>
            </Flex>

            <Text className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-fadeInUp">
              Latest in Sustainable Agriculture
            </Text>

            <Text
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
              style={{ animationDelay: "200ms" }}
            >
              Discover cutting-edge insights, innovative practices, and
              inspiring stories from the world of sustainable farming
            </Text>

            {/* Stats */}
            <Flex
              justify="center"
              gap="xl"
              className="mt-12 flex-wrap animate-fadeInUp"
              style={{ animationDelay: "400ms" }}
            >
              <Box className="text-center group cursor-pointer">
                <Box className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <Sparkles size={20} className="text-emerald-600" />
                  <Text className="text-2xl font-bold text-emerald-600">
                    {data.length}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    Articles
                  </Text>
                </Box>
              </Box>

              <Box className="text-center group cursor-pointer">
                <Box className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <TrendingUp size={20} className="text-green-600" />
                  <Text className="text-2xl font-bold text-green-600">
                    Fresh
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    Content
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>

      {/* Articles Grid */}
      <Container size="xl" className="pb-24">
        <Box className="space-y-8">
          {data.map((article: ArticleUI, index: number) => (
            <Article
              key={article.id}
              article={article}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </Box>

        {/* Load more indicator */}
        {data.length > 0 && (
          <Box
            className="text-center mt-16 animate-fadeInUp"
            style={{ animationDelay: "600ms" }}
          >
            <Box className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <Text className="font-semibold">More articles coming soon!</Text>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
