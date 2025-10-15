'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, Text, Button, Flex, Stack, Card } from '@mantine/core';
import { Home, ArrowLeft, BookOpen, FileX, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock popular articles (you can replace this with actual data)
const popularArticles = [
  {
    id: '1',
    title: 'Regenerative Agriculture: The Future of Sustainable Farming',
    slug: 'regenerative-agriculture-future',
    category: 'Sustainable Agriculture',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Building Healthy Soil: The Foundation of Agroecology',
    slug: 'building-healthy-soil-agroecology',
    category: 'Agroecology',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Water Conservation Techniques for Modern Farmers',
    slug: 'water-conservation-techniques',
    category: 'Water Management',
    readTime: '7 min read',
  },
];

export default function ArticleNotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-16">
      <Container size="lg">
        <Flex direction="column" align="center" gap="xl">
          {/* Animated Icon */}
          <Box className="relative mb-8">
            <Box
              className={`absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl ${
                mounted ? 'animate-pulse' : 'opacity-0'
              }`}
              style={{
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
              }}
            />

            <Box
              className={`relative z-10 bg-white dark:bg-gray-800 rounded-full p-8 shadow-2xl border-4 border-emerald-200 dark:border-emerald-800 ${
                mounted ? 'animate-scaleIn' : 'opacity-0'
              }`}
            >
              <FileX size={80} className="text-emerald-600 dark:text-emerald-400" />
            </Box>
          </Box>

          {/* Error message */}
          <Stack gap="md" align="center" className={`max-w-2xl text-center ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <Text className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Article Not Found
            </Text>

            <Text className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We couldn't find the article you're looking for. It may have been removed, renamed, or is temporarily unavailable.
            </Text>
          </Stack>

          {/* Action buttons */}
          <Flex
            gap="md"
            wrap="wrap"
            justify="center"
            className={mounted ? 'animate-fadeInUp' : 'opacity-0'}
            style={{ animationDelay: '400ms' }}
          >
            <Button
              size="lg"
              leftSection={<BookOpen size={20} />}
              onClick={() => router.push('/')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white interactive-scale ripple-effect shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            >
              Browse Articles
            </Button>

            <Button
              size="lg"
              variant="outline"
              leftSection={<ArrowLeft size={20} />}
              onClick={() => router.back()}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 interactive-scale ripple-effect transition-all duration-300 px-8"
            >
              Go Back
            </Button>

            <Button
              size="lg"
              variant="outline"
              leftSection={<Home size={20} />}
              onClick={() => router.push('/')}
              className="border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 interactive-scale ripple-effect transition-all duration-300 px-8"
            >
              Home
            </Button>
          </Flex>

          {/* Popular Articles Section */}
          <Box className={`w-full max-w-4xl mt-16 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <Flex align="center" justify="center" gap="sm" className="mb-8">
              <TrendingUp size={28} className="text-emerald-600 dark:text-emerald-400" />
              <Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Popular Articles
              </Text>
            </Flex>

            <Box className="grid gap-6 md:grid-cols-3">
              {popularArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 card-shine rounded-2xl hover-lift animate-fadeInUp`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                  onClick={() => router.push(`/${article.slug}`)}
                >
                  <Stack gap="md" className="p-4">
                    {/* Category Badge */}
                    <Flex align="center" gap="xs">
                      <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <Text className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {article.category}
                      </Text>
                    </Flex>

                    {/* Title */}
                    <Text className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {article.title}
                    </Text>

                    {/* Read Time */}
                    <Flex align="center" gap="xs" className="text-sm text-gray-500 dark:text-gray-400">
                      <BookOpen size={14} />
                      <Text>{article.readTime}</Text>
                    </Flex>

                    {/* Bottom shine effect */}
                    <Box className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                  </Stack>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Help Section */}
          <Box
            className={`mt-12 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 max-w-2xl ${
              mounted ? 'animate-fadeInUp card-shine' : 'opacity-0'
            }`}
            style={{ animationDelay: '1200ms' }}
          >
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
              <strong className="text-emerald-600 dark:text-emerald-400">Still can't find what you're looking for?</strong>
              <br />
              Try using our search feature or browse through our categories to discover more articles about sustainable farming and agriculture.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
