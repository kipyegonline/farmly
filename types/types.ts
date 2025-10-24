export interface Article {
  id: string;
  title: string;
  coverImage: { url: string };
  date: string | Date;
  author: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  content?: {
    json: any;
    links?: any;
  };
  tags?: string[];
}

export interface ContentfulNewsPost {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
  };
  category: string;
  author: string;
  date: string;
  readTime: string;
  content?: {
    json: any;
    links?: any;
  };
}
