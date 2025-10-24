"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Card,
  Button,
  Avatar,
  Stack,
  Group,
} from "@mantine/core";
import {
  Sun,
  Moon,
  ArrowLeft,
  ChevronDown,
  Clock,
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Heart,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Markdown } from "@/lib/markdown";

interface Article {
  id: string;
  title: string;
  coverImage: string;
  date: string | Date;
  author: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
  authorAvatar?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
}

const currentArticle: Article = {
  id: "1",
  title: "Regenerative Agriculture: The Future of Sustainable Farming",
  coverImage:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop",
  date: "2024-05-20",
  author: "Sarah Mitchell",
  slug: "regenerative-agriculture-future",
  excerpt:
    "Discover how regenerative agriculture practices are revolutionizing farming by restoring soil health, increasing biodiversity, and creating more resilient food systems for the future.",
  category: "Sustainable Agriculture",
  readTime: "8 min read",
  authorAvatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  content: `
    <p>Regenerative agriculture represents a paradigm shift in how we approach farming and land management. Unlike conventional agriculture that often depletes soil and relies heavily on external inputs, regenerative practices work with natural systems to restore and enhance the health of our agricultural ecosystems.</p>
    
    <h2>The Principles of Regenerative Agriculture</h2>
    <p>At its core, regenerative agriculture is built on several key principles that work together to create thriving, sustainable farming systems:</p>
    
    <h3>1. Soil Health First</h3>
    <p>Healthy soil is the foundation of regenerative agriculture. This means focusing on building soil organic matter, improving soil structure, and supporting the billions of microorganisms that make soil come alive. Practices like cover cropping, composting, and minimal tillage all contribute to healthier soils.</p>
    
    <h3>2. Biodiversity Enhancement</h3>
    <p>Diverse ecosystems are more resilient ecosystems. Regenerative farms integrate multiple plant species, beneficial insects, and wildlife habitats to create balanced agricultural landscapes that naturally regulate pests and diseases.</p>
    
    <h3>3. Water Cycle Restoration</h3>
    <p>Healthy soils with good structure can hold more water, reducing the need for irrigation and preventing erosion. Regenerative practices help restore natural water cycles, making farms more resilient to both droughts and floods.</p>
    
    <h2>The Benefits Extend Beyond the Farm</h2>
    <p>The impact of regenerative agriculture reaches far beyond individual farms. These practices contribute to climate change mitigation by sequestering carbon in soil, reduce water pollution by minimizing chemical runoff, and support rural communities by creating more sustainable livelihoods for farmers.</p>
    
    <h3>Climate Impact</h3>
    <p>Regenerative agriculture has the potential to be a significant tool in combating climate change. Healthy soils can sequester substantial amounts of carbon dioxide from the atmosphere, effectively turning farms into carbon sinks rather than carbon sources.</p>
    
    <h3>Economic Viability</h3>
    <p>While the transition to regenerative practices may require initial investment and learning, many farmers find that these methods ultimately reduce input costs and increase profitability through improved soil fertility, reduced pest pressure, and premium market opportunities.</p>
    
    <h2>Getting Started with Regenerative Practices</h2>
    <p>For farmers interested in transitioning to regenerative agriculture, the journey often begins with small steps. Start with one field or one practice, such as planting cover crops or reducing tillage. Building soil health takes time, but the benefits compound over years of consistent application.</p>
    
    <p>The future of agriculture lies not in fighting against natural systems, but in working with them. Regenerative agriculture offers a path forward that can feed the world while healing the land we depend on.</p>
  `,
  tags: [
    "Regenerative Agriculture",
    "Soil Health",
    "Climate Change",
    "Sustainable Farming",
  ],
  likes: 234,
  comments: 18,
};

const recommendedArticles: Article[] = [
  {
    id: "2",
    title: "Building Healthy Soil: The Foundation of Agroecology",
    coverImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop",
    date: "2024-05-18",
    author: "Maria Santos",
    slug: "building-healthy-soil-agroecology",
    excerpt: "Understanding soil health is crucial for sustainable farming.",
    category: "Agroecology",
    readTime: "6 min read",
    content: "",
  },
  {
    id: "3",
    title: "Water Conservation Techniques for Modern Farmers",
    coverImage:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop",
    date: "2024-05-17",
    author: "David Chen",
    slug: "water-conservation-techniques",
    excerpt: "Innovative irrigation methods and water management strategies.",
    category: "Water Management",
    readTime: "7 min read",
    content: "",
  },
  {
    id: "4",
    title: "Organic Pest Control Methods That Actually Work",
    coverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
    date: "2024-05-16",
    author: "James Rodriguez",
    slug: "organic-pest-control-methods",
    excerpt:
      "Effective organic pest control strategies for sustainable farming.",
    category: "Organic Farming",
    readTime: "5 min read",
    content: "",
  },
];

export default function ArticlePage({ post, morePosts }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollAnimation, setShowScrollAnimation] = useState(true);
  const [liked, setLiked] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setShowScrollAnimation(false);
      }

      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async (platform?: string) => {
    const shareData = {
      title: currentArticle.title,
      text: currentArticle.excerpt,
      url: window.location.href,
    };

    if (platform) {
      let shareUrl = "";
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            currentArticle.title
          )}&url=${encodeURIComponent(window.location.href)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            window.location.href
          )}`;
          break;
        case "copy":
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
          return;
      }
      window.open(shareUrl, "_blank", "width=600,height=400");
    } else if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };
  console.log({ post, morePosts }, "post and more posts");
  return (
    <Box
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Reading Progress Bar */}
      <Box
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/50"
        style={{
          width: `${readingProgress}%`,
          opacity: readingProgress > 5 ? 1 : 0,
        }}
      />

      {/* Header */}
      <Box
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slideInFromTop ${
          darkMode
            ? "bg-gray-900/95 border-gray-700"
            : "bg-white/95 border-gray-200"
        } border-b backdrop-blur-md shadow-sm`}
      >
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Flex justify="space-between" align="center" className="h-16">
            <Button
              onClick={() => (location.pathname = "/")}
              variant="subtle"
              leftSection={<ArrowLeft size={18} />}
              className="text-emerald-600 hover:text-emerald-700 font-medium interactive-scale ripple-effect transition-all duration-300 hover:translate-x-[-4px]"
            >
              Back to Articles
            </Button>
            <Button
              variant="subtle"
              onClick={toggleDarkMode}
              className="p-2 interactive-scale ripple-effect rounded-full hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {darkMode ? (
                <Sun size={20} className="animate-rotateIn" />
              ) : (
                <Moon size={20} className="animate-rotateIn" />
              )}
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay and Parallax */}
        <Box
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
          style={{
            backgroundImage: `url(${post.coverImage.url})`,
            transform: `translateY(${scrollY * 0.5}px) scale(${
              1 + scrollY * 0.0002
            })`,
          }}
        >
          <Box className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </Box>

        {/* Hero Content */}
        <Box className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Text className="text-emerald-400 font-semibold mb-4 text-lg tracking-wide uppercase animate-fadeInUp stagger-1">
            {post.category}
          </Text>

          <Text className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeInUp stagger-2">
            {post.title}
          </Text>

          <Text className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fadeInUp stagger-3">
            {post.excerpt}
          </Text>

          {/* Author Info */}
          <Flex
            justify="center"
            align="center"
            gap="md"
            className="mb-12 animate-fadeInUp stagger-4"
          >
            <Avatar
              src={post.author}
              display="none"
              alt={post.author}
              size="lg"
              className="border-2 border-white/20 animate-scaleIn stagger-4 transition-transform duration-300 hover:scale-110 hover:border-emerald-400"
            />
            <Box className="text-left">
              <Text className="font-semibold text-lg transition-colors duration-300 hover:text-emerald-400">
                {post.author}
              </Text>
              {post?.date && (
                <Flex align="center" gap="sm" className="text-gray-300">
                  <Calendar size={16} className="text-emerald-400" />
                  <Text>{formatDate(post.date)}</Text>
                  <Text>•</Text>
                  <Clock size={16} className="text-emerald-400" />
                  <Text>{post.readTime}</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        </Box>

        {/* Scroll Down Animation */}
        {showScrollAnimation && (
          <Box className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <Flex direction="column" align="center" gap="xs">
              <Text className="text-sm font-medium">Scroll to read</Text>
              <ChevronDown size={24} />
            </Flex>
          </Box>
        )}
      </Box>

      {/* Article Content */}
      <Box
        className={`${
          darkMode ? "bg-gray-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Flex gap="xl" className="relative">
            {/* Main Article Content - 80% width */}
            <Box className="w-full lg:w-4/5">
              <Box className="max-w-none animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                {/* Article Tags */}
                <Flex wrap="wrap" gap="xs" className="mb-8">
                  {currentArticle.tags?.map((tag, index) => (
                    <Text
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer interactive-scale animate-fadeInUp ${
                        darkMode
                          ? "bg-gray-800 text-emerald-400 border border-gray-700 hover:bg-gray-700 hover:border-emerald-500"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400"
                      } transition-all duration-300`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      #{tag}
                    </Text>
                  ))}
                </Flex>

                {/* Article Body */}
                <Box
                  className={`prose hidden prose-lg max-w-none leading-relaxed ${
                    darkMode ? "prose-invert" : ""
                  } 
                  prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:mb-6 prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-p:text-lg prose-p:leading-relaxed
                  `}
                  dangerouslySetInnerHTML={{ __html: currentArticle.content }}
                />
                <Markdown content={post.body} />
                {/* Engagement Stats */}
                <Flex
                  justify="space-between"
                  align="center"
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                >
                  <Flex gap="lg">
                    <Button
                      variant="subtle"
                      leftSection={
                        <Heart
                          size={18}
                          className={`transition-all duration-300 ${
                            liked
                              ? "fill-red-500 text-red-500 animate-pulse"
                              : ""
                          }`}
                        />
                      }
                      onClick={() => setLiked(!liked)}
                      className={`interactive-scale ripple-effect transition-all duration-300 ${
                        liked ? "text-red-500 scale-110" : "text-gray-500"
                      } hover:text-red-500`}
                    >
                      {currentArticle.likes! + (liked ? 1 : 0)} Likes
                    </Button>
                    <Button
                      variant="subtle"
                      leftSection={<MessageCircle size={18} />}
                      className="text-gray-500 hover:text-blue-500 interactive-scale ripple-effect transition-all duration-300"
                    >
                      {currentArticle.comments} Comments
                    </Button>
                    <Button
                      variant="subtle"
                      leftSection={<BookOpen size={18} />}
                      className="text-gray-500 interactive-scale ripple-effect transition-all duration-300 hover:text-emerald-500"
                    >
                      {post.readTime}
                    </Button>
                  </Flex>
                </Flex>

                {/* Social Share Section */}
                <Box className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Text className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Share2 size={20} className="text-emerald-600" />
                    Share this article
                  </Text>
                  <Flex gap="md" wrap="wrap">
                    <Button
                      leftSection={<Share2 size={18} />}
                      onClick={() => handleShare()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white interactive-scale ripple-effect transition-all duration-300 shadow-lg hover:shadow-xl animate-glow"
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      leftSection={<Facebook size={18} />}
                      onClick={() => handleShare("facebook")}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 interactive-scale ripple-effect transition-all duration-300 hover:border-blue-700 hover:shadow-lg"
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      leftSection={<Twitter size={18} />}
                      onClick={() => handleShare("twitter")}
                      className="border-sky-500 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 interactive-scale ripple-effect transition-all duration-300 hover:border-sky-600 hover:shadow-lg"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      leftSection={<Linkedin size={18} />}
                      onClick={() => handleShare("linkedin")}
                      className="border-blue-700 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 interactive-scale ripple-effect transition-all duration-300 hover:border-blue-800 hover:shadow-lg"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      leftSection={<Copy size={18} />}
                      onClick={() => handleShare("copy")}
                      className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 interactive-scale ripple-effect transition-all duration-300 hover:border-gray-500 hover:shadow-lg"
                    >
                      Copy Link
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>

            {/* Recommended Articles Sidebar - 20% width, hidden on mobile */}
            <Box className="hidden lg:block w-2/5">
              <Box className="sticky top-24">
                <Card
                  className={`p-6 card-shine ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } border shadow-lg hover:shadow-xl animate-slideInFromRight stagger-5 transition-all duration-500 rounded-2xl`}
                >
                  <Text className="font-bold text-lg mb-6 text-gradient-animated">
                    Recommended Reading
                  </Text>
                  <Stack gap="md">
                    {morePosts.map((article: Article, index: number) => (
                      <Box
                        key={article.id}
                        className={`group cursor-pointer p-3 rounded-lg transition-all duration-300 hover:shadow-lg animate-fadeInUp card-shine ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}
                        style={{ animationDelay: `${(index + 6) * 100}ms` }}
                      >
                        <Box className="relative overflow-hidden rounded-md mb-3 shadow-md">
                          <img
                            src={article.coverImage?.url}
                            alt={article.title}
                            className="w-full h-20 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-1"
                          />
                          <Box className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Box>
                        <Text className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-emerald-600 transition-all duration-300 group-hover:translate-x-1">
                          {article.title}
                        </Text>
                        <Flex
                          align="center"
                          gap="xs"
                          className="text-xs text-gray-500 dark:text-gray-400 transition-colors group-hover:text-emerald-600"
                        >
                          <Text>{article.author}</Text>
                          <Text>•</Text>
                          <Text>{article.readTime}</Text>
                        </Flex>
                      </Box>
                    ))}
                  </Stack>
                </Card>

                {/* Mobile recommendation - Bottom section */}
              </Box>
            </Box>
          </Flex>

          {/* Mobile Recommended Articles - Show at bottom on mobile */}
          <Box className="lg:hidden mt-16">
            <Text className="text-2xl font-bold mb-6 text-gradient-animated">
              You might also like
            </Text>
            <Box className="grid gap-6">
              {morePosts.map((article: Article, index: number) => (
                <Card
                  key={article.id}
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-xl border card-shine rounded-2xl ${
                    darkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  } animate-fadeInUp hover-lift`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Flex gap="md">
                    <Box className="w-24 h-24 flex-shrink-0">
                      <img
                        src={article.coverImage?.url}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 shadow-md"
                      />
                    </Box>
                    <Box className="flex-1">
                      <Text className="font-semibold line-clamp-2 mb-2 group-hover:text-emerald-600 transition-all duration-300 group-hover:translate-x-2">
                        {article.title}
                      </Text>
                      <Flex
                        align="center"
                        gap="xs"
                        className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-emerald-600"
                      >
                        <Text>{article.author}</Text>
                        <Text>•</Text>
                        <Text>{article.readTime}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
