# Error Pages Documentation

## Overview
This application includes beautifully designed 404 error pages with smooth animations and intuitive navigation options.

## Pages Created

### 1. Global 404 Page
**Location:** `app/not-found.tsx`

This page handles all general 404 errors across the application.

**Features:**
- Large animated "404" display with a floating sprout icon
- Pulsing background effect
- Multiple navigation options:
  - Go Home
  - Go Back
  - Search Articles
- Staggered fade-in animations
- Dark mode support
- Help section with additional information

**When it's triggered:**
- User navigates to a non-existent route
- Manually by calling `notFound()` from `next/navigation`

### 2. Article-Specific 404 Page
**Location:** `app/[article]/not-found.tsx`

This page handles 404 errors specifically for article routes.

**Features:**
- Article-themed icon (FileX)
- Contextual error message for missing articles
- Navigation buttons:
  - Browse Articles
  - Go Back
  - Home
- Popular articles section with 3 clickable cards
- Smooth animations and transitions
- Dark mode support
- Help section

**When it's triggered:**
- Article slug doesn't exist in the database
- Article has been removed or renamed
- Manually by calling `notFound()` from `next/navigation`

## Usage Examples

### Triggering 404 in Server Components

```tsx
// app/[article]/page.tsx
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api';

export default async function ArticlePage({ params }: { params: { article: string } }) {
  const article = await getArticleBySlug(params.article);

  // If article doesn't exist, trigger 404
  if (!article) {
    notFound();
  }

  return <ArticlePageClient article={article} />;
}
```

### Triggering 404 in Client Components

```tsx
// app/[article]/page.client.tsx
'use client';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function ArticlePageClient({ articleId }: { articleId: string }) {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticle(articleId),
  });

  useEffect(() => {
    // If article is not found after loading
    if (!isLoading && !article) {
      notFound();
    }
  }, [article, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  return <ArticleContent article={article} />;
}
```

### Custom 404 Logic

```tsx
// Example: Check if article exists before rendering
export default function ArticlePageClient() {
  const [articleExists, setArticleExists] = useState(true);

  useEffect(() => {
    async function checkArticle() {
      const exists = await verifyArticleExists(articleId);
      if (!exists) {
        notFound(); // This will show app/[article]/not-found.tsx
      }
    }
    checkArticle();
  }, [articleId]);

  // Rest of component...
}
```

## Customization

### Updating Popular Articles

Edit the `popularArticles` array in `app/[article]/not-found.tsx`:

```tsx
const popularArticles = [
  {
    id: '1',
    title: 'Your Article Title',
    slug: 'your-article-slug',
    category: 'Category Name',
    readTime: '8 min read',
  },
  // Add more articles...
];
```

### Styling

Both 404 pages use:
- Tailwind CSS classes
- Mantine UI components
- Custom animations from `globals.css`:
  - `animate-fadeInUp`
  - `animate-fadeInLeft`
  - `animate-fadeInRight`
  - `animate-scaleIn`
  - `animate-float`
  - `card-shine`
  - `hover-lift`
  - `interactive-scale`
  - `ripple-effect`

### Theme Colors

The pages use your app's emerald color scheme. To change:
- Update `text-emerald-*` classes
- Update `bg-emerald-*` classes
- Update `border-emerald-*` classes

## Animation Details

### Staggered Animations
Elements appear sequentially with delays:
- Icon: 100-500ms
- Title: 700ms
- Buttons: 900ms
- Help section: 1100-1300ms

### Interactive Effects
- Buttons: Scale on hover, ripple on click
- Cards: Lift effect, shine sweep, scale transform
- Icons: Float animation (continuous)

## Best Practices

1. **Always validate article existence:**
   ```tsx
   if (!article) {
     notFound();
   }
   ```

2. **Handle async data properly:**
   ```tsx
   useEffect(() => {
     if (!isLoading && !data) {
       notFound();
     }
   }, [isLoading, data]);
   ```

3. **Provide clear navigation:**
   - Both pages include multiple navigation options
   - Users can go back, go home, or browse content

4. **Maintain consistency:**
   - Use the same color scheme as your app
   - Keep animations smooth and professional
   - Ensure dark mode compatibility

## Testing

To test the 404 pages:

1. **Global 404:**
   - Navigate to: `http://localhost:3000/this-does-not-exist`

2. **Article 404:**
   - Navigate to: `http://localhost:3000/fake-article-slug`
   - Or add this to your article component:
   ```tsx
   if (articleSlug === 'test-404') {
     notFound();
   }
   ```

## Performance

- Both pages are client components for interactivity
- Animations use CSS transforms (GPU accelerated)
- No heavy dependencies
- Optimized for fast rendering

## Accessibility

- Clear error messages
- Multiple navigation options
- Keyboard accessible buttons
- Semantic HTML structure
- High contrast text
- Focus states on interactive elements

## Future Enhancements

Potential improvements:
1. Add search functionality to 404 pages
2. Fetch actual popular articles from API
3. Add breadcrumb navigation
4. Include suggested categories
5. Add contact support button
6. Track 404 errors for analytics
7. A/B test different messaging
8. Add multilingual support
