// 1. First install the required packages:
// npm install @tanstack/react-query
// npm install @tanstack/react-query-devtools (optional for development)

// main.tsx or index.tsx - App entry point
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds before data is considered stale
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Time in milliseconds to cache data
      gcTime: 1000 * 60 * 10, // 10 minutes (previously called cacheTime)
      // Retry failed requests
      retry: 2,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Add React Query Devtools in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

// ===================================
// Alternative: Custom QueryClient Provider Component
// ===================================

// providers/QueryProvider.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryProviderProps {
  children: React.ReactNode
}

// Create query client with custom configuration
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: (failureCount, error: any) => {
          // Don't retry on 404 or 401 errors
          if (error?.status === 404 || error?.status === 401) {
            return false
          }
          // Retry up to 3 times for other errors
          return failureCount < 3
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        // Global mutation settings
        onError: (error: any) => {
          console.error('Mutation error:', error)
          // You can add global error handling here
          // e.g., show toast notification
        },
      },
    },
  })
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const queryClient = React.useMemo(() => createQueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

// ===================================
// Usage in your main App component
// ===================================

// App.tsx
import { QueryProvider } from './providers/QueryProvider'
import { Farmly } from './components/Farmly'

function App() {
  return (
    <QueryProvider>
      <Farmly />
    </QueryProvider>
  )
}

export default App

// ===================================
// Example: Using React Query in components
// ===================================

// hooks/useArticles.ts - Custom hook for fetching articles
import { useQuery } from '@tanstack/react-query'

export interface Article {
  id: string
  title: string
  coverImage: string
  date: string | Date
  author: string
  slug: string
  excerpt: string
  category: string
  readTime: string
}

// API function
const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('/api/articles')
  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }
  return response.json()
}

// Custom hook
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5, // Override default if needed
    // Enable the query (useful for conditional fetching)
    enabled: true,
    // Transform data if needed
    select: (data: Article[]) => {
      return data.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    },
  })
}

// ===================================
// Example: Using the hook in a component
// ===================================

// components/ArticlesList.tsx
import React from 'react'
import { useArticles } from '../hooks/useArticles'
import { Box, Text, Loader } from '@mantine/core'

export const ArticlesList: React.FC = () => {
  const {
    data: articles,
    isLoading,
    isError,
    error,
    refetch,
  } = useArticles()

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box className="text-center p-8">
        <Text className="text-red-500 mb-4">
          Error loading articles: {error?.message}
        </Text>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </Box>
    )
  }

  return (
    <Box>
      {articles?.map((article) => (
        <Box key={article.id} className="mb-6 p-4 border rounded">
          <Text className="text-xl font-bold mb-2">{article.title}</Text>
          <Text className="text-gray-600">{article.excerpt}</Text>
        </Box>
      ))}
    </Box>
  )
}

// ===================================
// Example: Mutation for creating articles
// ===================================

// hooks/useMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateArticleData {
  title: string
  content: string
  category: string
  author: string
}

const createArticle = async (data: CreateArticleData): Promise<Article> => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create article')
  }
  
  return response.json()
}

export const useCreateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createArticle,
    onSuccess: (newArticle) => {
      // Invalidate and refetch articles query
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      
      // Or optimistically update the cache
      queryClient.setQueryData(['articles'], (oldData: Article[] | undefined) => {
        return oldData ? [newArticle, ...oldData] : [newArticle]
      })
      
      console.log('Article created successfully!')
    },
    onError: (error) => {
      console.error('Failed to create article:', error)
      // Handle error (show toast, etc.)
    },
  })
}

// ===================================
// Advanced: Query with parameters
// ===================================

// hooks/useArticlesByCategory.ts
import { useQuery } from '@tanstack/react-query'

const fetchArticlesByCategory = async (category: string): Promise<Article[]> => {
  const response = await fetch(`/api/articles?category=${encodeURIComponent(category)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch articles by category')
  }
  return response.json()
}

export const useArticlesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['articles', 'category', category],
    queryFn: () => fetchArticlesByCategory(category),
    enabled: !!category, // Only run query if category is provided
    staleTime: 1000 * 60 * 5,
  })
}

// ===================================
// Infinite Query Example (for pagination)
// ===================================

// hooks/useInfiniteArticles.ts
import { useInfiniteQuery } from '@tanstack/react-query'

interface ArticlesPage {
  articles: Article[]
  nextCursor?: string
  hasNextPage: boolean
}

const fetchArticlesPage = async ({ pageParam = 0 }): Promise<ArticlesPage> => {
  const response = await fetch(`/api/articles?page=${pageParam}&limit=10`)
  if (!response.ok) {
    throw new Error('Failed to fetch articles page')
  }
  return response.json()
}

export const useInfiniteArticles = () => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite'],
    queryFn: ({ pageParam }) => fetchArticlesPage({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length : undefined
    },
  })
}