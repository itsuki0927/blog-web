import BlogDetailEntry from '@/app/blog/[slug]/components/BlogDetailEntry';
import { ENV } from '@/constants/env';
import { Blog } from '@/types/blog';
import { PageProps } from '@/types/common';
import getHeadings from '@/utils/getHeadings';
import { notFound } from 'next/navigation';
import { getDraftBlog } from '../action';
import splitPage from '@/utils/splitPage';

export type PreviewBlogPageProps = PageProps<{ slug: string }>;

const fetchBlog = async (slug: string) => {
  let blog: Blog | null | undefined;

  try {
    blog = await getDraftBlog(slug);
    if (blog === null) {
      return notFound();
    }
  } catch (err) {
    return notFound();
  }

  const headings = getHeadings(blog?.content ?? '');

  return { headings, blog };
};

const PreviewBlogPage = async ({ params }: PreviewBlogPageProps) => {
  if (ENV.isProd) {
    return null;
  }
  const slug = params.slug;
  if (!slug) {
    notFound();
  }
  const { blog } = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const a = splitPage(blog.content,blog.id)

  const { content, length: numSections } = splitPage(blog.content, blog.id);

  return <BlogDetailEntry blog={{  ...blog, content }} slug={slug} numSections={numSections} />;
};

export default PreviewBlogPage;
