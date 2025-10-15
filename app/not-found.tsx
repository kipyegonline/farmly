'use client';
import React, { useEffect, useState } from 'react';
import { Box, Container, Text, Button, Flex, Stack } from '@mantine/core';
import { Home, ArrowLeft, Search, FileQuestion, Sprout } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-16">
      <Container size="lg">
        <Flex direction="column" align="center" gap="xl" className="text-center">
          {/* Animated 404 Icon */}
          <Box className="relative">
            {/* Background circle with pulse */}
            <Box
              className={`absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl ${
                mounted ? 'animate-pulse' : 'opacity-0'
              }`}
              style={{
                width: '300px',
                height: '300px',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
              }}
            />

            {/* Main 404 graphic */}
            <Box className="relative z-10">
              <Flex align="center" justify="center" gap="md" className="mb-6">
                {/* 4 */}
                <Text
                  className={`text-9xl font-bold text-emerald-600 dark:text-emerald-400 ${
                    mounted ? 'animate-fadeInLeft' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '100ms' }}
                >
                  4
                </Text>

                {/* 0 with icon */}
                <Box
                  className={`relative ${
                    mounted ? 'animate-scaleIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '300ms' }}
                >
                  <Text className="text-9xl font-bold text-emerald-600 dark:text-emerald-400">
                    0
                  </Text>
                  <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Sprout
                      size={56}
                      className="text-emerald-500 dark:text-emerald-300 animate-float"
                    />
                  </Box>
                </Box>

                {/* 4 */}
                <Text
                  className={`text-9xl font-bold text-emerald-600 dark:text-emerald-400 ${
                    mounted ? 'animate-fadeInRight' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '500ms' }}
                >
                  4
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* Error message */}
          <Stack gap="md" align="center" className={`max-w-2xl ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
            <Flex align="center" gap="sm">
              <FileQuestion size={32} className="text-emerald-600 dark:text-emerald-400" />
              <Text className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Page Not Found
              </Text>
            </Flex>

            <Text className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Oops! Looks like this seed didn't sprout. The page you're looking for doesn't exist or may have been moved.
            </Text>
          </Stack>

          {/* Action buttons */}
          <Flex
            gap="md"
            wrap="wrap"
            justify="center"
            className={mounted ? 'animate-fadeInUp' : 'opacity-0'}
            style={{ animationDelay: '900ms' }}
          >
            <Button
              size="lg"
              leftSection={<Home size={20} />}
              onClick={() => router.push('/')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white interactive-scale ripple-effect shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            >
              Go Home
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
              leftSection={<Search size={20} />}
              onClick={() => router.push('/search')}
              className="border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 interactive-scale ripple-effect transition-all duration-300 px-8"
            >
              Search Articles
            </Button>
          </Flex>

          {/* Decorative elements */}
          <Box className={`mt-12 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1100ms' }}>
            <Flex gap="lg" align="center" className="text-gray-400 dark:text-gray-600">
              <Box className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
              <Text className="text-sm font-medium">Error Code: 404</Text>
              <Box className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
            </Flex>
          </Box>

          {/* Additional help text */}
          <Box
            className={`mt-8 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 max-w-xl ${
              mounted ? 'animate-fadeInUp card-shine' : 'opacity-0'
            }`}
            style={{ animationDelay: '1300ms' }}
          >
            <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-emerald-600 dark:text-emerald-400">Need help?</strong> If you believe this is an error,
              try refreshing the page or contact our support team. We're here to help you find what you're looking for.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
