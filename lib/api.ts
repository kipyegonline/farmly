/** author {
    name
    picture {
      url
    }
  } */
const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author
  excerpt
  body {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

const NEWS_POST_FIELDS = `
  sys {
    id
  }
  title
  slug
  excerpt
  coverImage {
    url
  }
  category
  author
  date
  readTime
  body {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

const BOOK_FIELDS = `{
title,
author,
year,

body  {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
    }`;
const prev = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const prod = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const collectionName = `bookshopCollection`;
async function fetchGraphQL(query: string, preview = true): Promise<any> {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${preview ? prev : prod}`,
    },
    body: JSON.stringify({ query }),
    next: { tags: ["posts"] },
  }).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  console.log(fetchResponse, "______fetchResponse");
  if (fetchResponse) {
    const {
      data: {
        payload: { posts },
      },
    } = fetchResponse;

    return posts; // fetchResponse?.payload.books;
  } else {
    return [];
  }
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      bookReaderCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  try {
    const entries = await fetchGraphQL(
      `query {
  
      bookReaderCollection(where: { slug_exists: true }, order: date_DESC,limit:10, preview: ${isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
      isDraftMode
    );

    return extractPost(entries);
  } catch (error) {
    return [];
  }
}

export async function getAllNewsPosts(
  isDraftMode: boolean = false
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      news:bookReaderCollection( preview: ${isDraftMode ? "true" : "false"
    }, limit:10, order: date_DESC) {
        posts:items {
          ${NEWS_POST_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  console.log("entries:", entries);
  return entries?.data?.news?.posts || [];
}

export async function getNewsPostBySlug(
  slug: string,
  preview: boolean = false
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      newsPostCollection(where: { slug: "${slug}" }, preview: ${preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${NEWS_POST_FIELDS}
        }
      }
    }`,
    preview
  );

  return entry?.data?.newsPostCollection?.items?.[0] || null;
}

export async function getPostAndMorePosts(
  id: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      post:bookReaderCollection(where: { sys: { id: "${id}" } }, preview: ${preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${NEWS_POST_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
     posts: bookReaderCollection(where: { sys: { id_not: "${id}" } }, order: date_DESC, preview: ${preview ? "true" : "false"
    }, limit: 4) {
        items {
          ${NEWS_POST_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    post: entry?.data?.post?.items?.[0] || null,
    morePosts: entries?.data?.posts?.items || [],
  };
}
