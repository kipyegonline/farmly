import React from 'react'
import { Card,Flex,Box,Text,Stack } from '@mantine/core'
import { User, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

type ArticleProps = {article:any, index:number, darkMode:boolean, handleArticleClick:(article:any)=>()=>void}   
export default function Article({article, index, darkMode, handleArticleClick}:ArticleProps) {
  return (
     <Card
                  key={article.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${
                    darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                  } animate-in slide-in-from-bottom duration-700`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  onClick={handleArticleClick}
                >
                  <Flex gap="lg" className="flex-col md:flex-row">
                    <Box className="md:w-1/3">
                      <Box className="relative overflow-hidden rounded-lg">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-48 md:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Box className="absolute top-3 left-3">
                          <Text className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {article.category}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box className="md:w-2/3">
                      <Stack gap="sm">
                        <Text className="text-xl md:text-2xl font-bold line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {article.title}
                        </Text>
                        
                        <Text className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </Text>
                        
                        <Flex align="center" gap="md" className="text-sm text-gray-500 dark:text-gray-400">
                          <Flex align="center" gap="xs">
                            <User size={14} />
                            <Text>{article.author}</Text>
                          </Flex>
                          <Text>•</Text>
                          <Flex align="center" gap="xs">
                            <Clock size={14} />
                            <Text>{formatDate(article.date)}</Text>
                          </Flex>
                          <Text>•</Text>
                          <Text>{article.readTime}</Text>
                        </Flex>
                      </Stack>
                    </Box>
                  </Flex>
                </Card>
  )
}
