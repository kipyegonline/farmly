import React from 'react'
import { Card, Flex, Box, Text, Stack ,Burger} from '@mantine/core'
import { Leaf, Sun, Moon,  ChevronRight     } from 'lucide-react'
import { formatDate } from '@/lib/utils';
type IndexProps = {
  darkMode: boolean; 
  sampleArticles: { id: string; title: string; date: string; excerpt: string; coverImage: string; category: string; author: string; readTime: string }[];
  handleArticleClick: (article: { id: string; title: string; date: string; excerpt: string; coverImage: string; category: string; author: string; readTime: string }) => () => void;   
}
export default function Index({darkMode,sampleArticles,handleArticleClick}:IndexProps) {
  const categories = ['Sustainable Farming', 'Organic Practices', 'Agroecology', 'Permaculture', 'Regenerative Agriculture'];
  return (
    <Box className="w-80 hidden lg:block">
            <Box className={`sticky top-24 p-6 rounded-lg ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            } border animate-in slide-in-from-right duration-700`}>
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
                  {sampleArticles.slice(0, 3).map((article, index) => (
                    <Box
                      key={article.id}
                      className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-right duration-300"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                      onClick={() => handleArticleClick(article)}
                    >
                      <Text className="text-sm font-medium line-clamp-2 mb-1">
                        {article.title}
                      </Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        
                        {formatDate(article.date)}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
  )
}
