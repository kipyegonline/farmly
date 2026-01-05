import { Container } from "@mantine/core";
import React from "react";
import ArticlePageClient from "./page.client";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: { article: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await getPostAndMorePosts(params.article, false);

  if (!post) {
    return {
      title: "Article Not Found | Farmly",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | Farmly`,
    description: post.excerpt || "Read this article on Farmly",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage?.url ? [{ url: post.coverImage.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { post, morePosts } = await getPostAndMorePosts(params.article, false);

  return (
    <Container size={"lg"}>
      <ArticlePageClient post={post} morePosts={morePosts} />
    </Container>
  );
}
