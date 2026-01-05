import { Article, ArticleUI, ContentfulNewsPost } from "@/types/types";

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const transformContentfulPost = (
  post: ContentfulNewsPost
): ArticleUI => {
  return {
    id: post.sys.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post?.coverImage?.url,
    category: post.category,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    // content: post.content,
  };
};

export const transformContentfulPosts = (
  posts: ContentfulNewsPost[]
): ArticleUI[] => {
  return posts.map(transformContentfulPost);
};
