import { Blog } from '@/types/blog';
import BlogPageHeaderUI from './ui';

interface BlogPageHeaderProps {
  slug: string;
  blog: Blog;
}

const BlogPageHeader = async ({ slug, blog }: BlogPageHeaderProps) => {
  // const blogViews = await getBlogViews(slug);

  return (
    <BlogPageHeaderUI
      blogViews={blog.views}
      createdAt={new Date(blog.createdAt ?? '')}
      publishedAt={new Date(blog.updatedAt ?? '')}
    />
  );
};

export default BlogPageHeader;
