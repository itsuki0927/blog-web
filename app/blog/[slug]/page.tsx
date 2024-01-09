import { PageProps } from "@/app/types";
import { parsePageId } from "notion-utils";
import React from "react";
import BlogContentRender from "./components/BlogContentRender";
import { Metadata } from "next";
import { getBlog, getBlogs } from "@/app/services/blog";

type BlogPageProps = PageProps<{ slug: string }>;

export interface NotionResponse {
  texts: { type: string; text: string }[];
  blocks: any[];
  recordMap: any;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const blogs = await getBlogs();
  const blog = blogs.find((blog) => (blog.slug || blog.path) === params.slug);
  if (!blog) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = blog;

  let ogImage = image
    ? `https://itsuki.cn${image}`
    : `https://itsuki.cn/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://itsuki.cn/blog/${blog.slug || blog.path || params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const NotionPage = async ({ params }: BlogPageProps) => {
  const slug = parsePageId(params.slug);

  const notionContent = await getBlog(slug);

  // console.log("notionContent:", notionContent);

  return (
    <div className="max-w-3xl mx-auto">
      <BlogContentRender response={notionContent} />
      {/* <CustomNotionPageRender response={res.data} /> */}
    </div>
  );
};

export default NotionPage;
