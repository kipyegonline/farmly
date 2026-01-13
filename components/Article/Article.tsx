"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Flex, Box, Text, Stack, Badge } from "@mantine/core";
import { User, Clock, ArrowRight, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { getNewsPostBySlug } from "@/lib/api";

type ArticleProps = {
  article: any;
  index: number;
  darkMode?: boolean;
};

export default function Article({
  article,
  index,
  darkMode = false,
}: ArticleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link href={`/${article.id}`} className="block no-underline ">
      <Card
        ref={cardRef}
        className={`group cursor-pointer relative overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
          isVisible ? "animate-fadeInUp" : "opacity-0"
        } hover-lift rounded-2xl`}
        style={{
          animationDelay: `${index * 100}ms`,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlay on hover */}
        <Box
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
          }}
        />

        <Flex gap="lg" className="flex-col md:flex-row relative z-10">
          {/* Image Section */}
          <Box className="md:w-2/5 relative">
            <Box className="relative overflow-hidden rounded-xl group-hover:shadow-2xl transition-all duration-500">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-56 md:h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                style={{
                  transform: isHovered ? "scale(1.1) rotate(1deg)" : "scale(1)",
                }}
              />
              {/* Dark overlay */}
              <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category badge */}
              <Box className="absolute top-3 left-3 z-10">
                <Badge
                  className="bg-emerald-600 text-white px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                  }}
                >
                  <Flex align="center" gap={4}>
                    <Sparkles size={12} />
                    {article.category}
                  </Flex>
                </Badge>
              </Box>

              {/* Read more indicator */}
              <Box className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                <Box className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-xl">
                  <ArrowRight size={18} className="text-emerald-600" />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Content Section */}
          <Box className="md:w-3/5 flex flex-col justify-between py-2">
            <Stack gap="sm">
              <Text
                fw={700}
                className="text-xl md:text-2xl line-clamp-2 transition-all duration-300 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                style={{
                  transform: isHovered ? "translateX(8px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                {article.title}
              </Text>

              <Text className="line-clamp-3 leading-relaxed transition-all duration-300 text-gray-600 dark:text-gray-400">
                {article.excerpt}
              </Text>
            </Stack>

            {/* Meta information */}
            <Flex
              align="center"
              gap="md"
              className="text-sm mt-4 transition-opacity duration-300 text-gray-500"
            >
              <Flex
                align="center"
                gap="xs"
                className="transition-transform duration-300 hover:scale-105"
              >
                <User size={14} className="text-emerald-600" />
                <Text className="font-medium">{article.author}</Text>
              </Flex>
              <Text>•</Text>
              {article?.date ? (
                <Flex
                  align="center"
                  gap="xs"
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <Clock size={14} className="text-emerald-600" />
                  <Text>{formatDate(article.date)}</Text>
                </Flex>
              ) : null}
              <Text>•</Text>
              <Text className="font-medium text-emerald-600">
                {article.readTime}
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* Bottom shine effect */}
        <Box className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </Link>
  );
}
