"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Card, Group, Stack, Button } from "@mantine/core";
import { Sun, Moon, Clock, User, ChevronRight } from "lucide-react";
import Article from "@/components/Article/Article";
import Header from "@/components/Header";
import MobileDrawer from "@/components/Header/MobileDrawer";
import { Article as ArticleType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getAllNewsPosts } from "@/lib/api";
import { transformContentfulPosts } from "@/lib/utils";
import { useRouter } from "next/navigation";

const categories = [
  "Sustainable Agriculture",
  "Organic Farming",
  "Agroecology",
  "Soil Health",
  "Water Management",
  "Pest Control",
];

export default function Farmly() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );
  const router = useRouter();
  // Fetch articles from Contentful
  const { data: articles, isLoading } = useQuery({
    queryKey: ["newsPosts"],
    queryFn: async () => {
      const posts = await getAllNewsPosts(false);
      console.log(posts, "cette posts");
      return transformContentfulPosts(posts);
    },
  });

  // Use Contentful data or fallback to sample articles
  const displayArticles = articles && articles.length > 0 ? articles : [];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleArticleClick = (article: ArticleType) => {
    return () => {
      console.log(article, `pushing....`);
      router.push(`/posts/${article.slug}`);
      //router.push(`/${article.slug}`);
      //setSelectedArticle(article);
    };
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (selectedArticle) {
    return (
      <Box
        className={`min-h-screen transition-colors duration-300  border-red ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header with Back Button */}
        <Box
          className={`sticky top-0 z-50 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          } border-b backdrop-blur-md bg-opacity-95`}
        >
          <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Flex justify="space-between" align="center" className="h-16">
              <Button
                variant="subtle"
                onClick={() => setSelectedArticle(null)}
                className="text-emerald-600 hover:text-emerald-700 interactive-scale ripple-effect"
              >
                ← Back to Home
              </Button>
              <Button
                variant="subtle"
                onClick={toggleDarkMode}
                className="p-2 interactive-scale ripple-effect rounded-full"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </Flex>
          </Box>
        </Box>

        {/* Article Content */}
        <Box className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Box className="animate-in fade-in duration-700">
            <Text className="text-emerald-600 font-medium mb-4">
              {selectedArticle.category}
            </Text>
            <Text className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {selectedArticle.title}
            </Text>
            <Flex
              align="center"
              gap="md"
              className="mb-8 text-gray-600 dark:text-gray-400"
            >
              <Flex align="center" gap="xs">
                <User size={16} />
                <Text size="sm">{selectedArticle.author}</Text>
              </Flex>
              <Text size="sm">•</Text>
              <Flex align="center" gap="xs">
                <Clock size={16} />
                <Text size="sm">{formatDate(selectedArticle.date)}</Text>
              </Flex>
              <Text size="sm">•</Text>
              <Text size="sm">{selectedArticle.readTime}</Text>
            </Flex>
            <Box className="mb-8 rounded-lg overflow-hidden">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </Box>
            <Box className="prose prose-lg max-w-none dark:prose-invert">
              <Text className="text-xl leading-relaxed mb-6">
                {selectedArticle.excerpt}
              </Text>
              <Text className="leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text className="leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>
              <Text className="leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className={`min-h-screen border-red transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Modular Header Component */}{" "}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* Mobile Menu Drawer */}
      <div className="md:hidden">
        {" "}
        <MobileDrawer
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          categories={categories}
          darkMode={darkMode}
        />
      </div>
      {/* Main Content */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Flex gap="xl" className="relative">
          {/* Articles Section */}
          <Box className="flex-1">
            <Text className="text-3xl md:text-4xl font-bold mb-8 animate-in slide-in-from-bottom duration-700">
              Latest in Sustainable Agriculture
            </Text>

            <Stack gap="xl">
              {isLoading ? (
                <Text className="text-center text-gray-500">
                  Loading articles...
                </Text>
              ) : (
                displayArticles.map((article, index) => (
                  <Article
                    key={article.id}
                    article={article}
                    index={index}
                    handleArticleClick={handleArticleClick(article)}
                    darkMode={darkMode}
                  />
                ))
              )}
            </Stack>
          </Box>

          {/* Sidebar - Hidden on mobile */}
          <Box className="w-80 hidden lg:block">
            <Box
              className={`sticky top-24 p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } border animate-in slide-in-from-right duration-700`}
            >
              <Text className="font-bold text-lg mb-4">Categories</Text>
              <Stack gap="sm">
                {categories.map((category, index) => (
                  <Flex
                    key={category}
                    justify="space-between"
                    align="center"
                    className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-right duration-300"
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
                    <Box
                      key={article.id}
                      className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-right duration-300"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                      onClick={handleArticleClick(article)}
                    >
                      <Text className="text-sm font-medium line-clamp-2 mb-1">
                        {article.title}
                      </Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {article?.date ? formatDate(article.date) : null}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
