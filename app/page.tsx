import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";
import { Markdown } from "@/lib/markdown";
import Farmly from "./home";
import { useQuery } from "@tanstack/react-query";
import HomePageComponent from "@/components/Homepage";
import { Divider } from "@mantine/core";
export const metadata = {
  title: `Farmly | Homepage`,
  description: `Your sustainable farming stop over`,
};

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}======
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();

  const allPosts = await getAllPosts(isEnabled);

  const heroPost = allPosts?.[0];
  console.log("all posts", allPosts);

  return (
    <div className="container mx-auto px-0  ">
      {/**<HomePageComponent /> */}

      <Divider />
      <Farmly />
    </div>
  );
}
