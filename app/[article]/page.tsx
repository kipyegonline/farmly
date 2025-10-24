import { Container } from "@mantine/core";
import React from "react";
import ArticlePageClient from "./page.client";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, false);
  console.log({ post, morePosts }, "post and more posts");
  return (
    <Container>
      <ArticlePageClient />
    </Container>
  );
}
