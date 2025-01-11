import type { BlogPosting, WithContext } from 'schema-dts';
import MdxContent from '@/components/common/MdxContent';
import { Suspense } from 'react';
import { Blog } from '@/types/blog';
import BlogTableOfContent from '../BlogTableOfContent';
import BlogHeader from '../BlogHeader';
import { IndexProvider } from '../PageSection/IndexProvider';
// import BlogContentSkeleton from '../BlogContentRender/skeleton';
import BlogReactionsUI from '../BlogReactions/UI';
import MobileNavIsland from '../MobileNavIsland';
import { META } from '@/constants/seo';
import JsonLd from '@/components/common/JsonLd';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface BlogDetailEntryProps {
  blog: Blog;
  slug: string;
  numSections: number;
}

const BlogDetailEntry = ({ blog, slug, numSections }: BlogDetailEntryProps) => {
  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url: `https://itsuki.cn/blog/${blog?.slug}`,
    headline: blog?.title,
    description: blog?.description,
    dateCreated: blog?.createdAt?.toString(),
    dateModified: blog?.updatedAt?.toString(),
    author: [
      {
        '@type': 'Person',
        name: META.author,
        url: META.url,
      },
    ],
  };

  return (
    <>
      <JsonLd content={jsonLd} />

      <BlogTableOfContent blog={blog} />

      <div className="max-w-4xl mx-auto bg-white text-zinc-800 p-4 rounded-xl">
        <BlogHeader blog={blog} />

        <IndexProvider numSections={numSections}>
          <Suspense fallback={<div>Loading...</div>}>
            <MdxContent options={{ scope: blog }} source={blog.content} />
          </Suspense>
        </IndexProvider>
      </div>

      <aside className="top-1/2 right-12 hidden -translate-y-1/2 p-6 text-zinc-400 sm:fixed sm:flex w-[90px]">
        <Suspense>
          <BlogReactionsUI slug={slug} blog={blog} />
        </Suspense>
      </aside>

      <div className="fixed bottom-4 left-4 right-4 z-20 block sm:hidden">
        <MobileNavIsland blog={blog} />
      </div>
    </>
  );
};

export default BlogDetailEntry;
