import { Content, Markdown } from "@/lib/markdown";
interface CoverImage {
  url: string;
}

interface ArticleSys {
  id: string;
}

export interface Article {
  sys: ArticleSys;
  title: string;
  coverImage?: CoverImage;
  date?: string | Date;
  author: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  body?: Content;
}
export interface ArticleUI {
  id: string;
  title: string;
  coverImage?: string;
  date?: string | Date;
  author: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  body?: Content;
  slug?: string;
  content?: Content;
}
export interface ContentfulNewsPost {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: CoverImage;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content?: {
    json: any;
    links?: any;
  };
}
