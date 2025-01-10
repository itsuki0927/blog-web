import { redis } from '@/libs/upstash';
import { kvKeys } from '@/constants/kv';
import { unstable_cache as cache } from 'next/cache';
import { ENV } from '@/constants/env';
import { getAllBlogs } from './blog';

export interface SummaryResponse {
  commentCount: number;
  blogCount: number;
  viewCount: number;
  onlineDays: number;
}

const getCommentCount = cache(
  async () => {
    return 0;
  },
  ['getCommentCount'],
  { revalidate: 3600 }
);

const getOnlineDays = () => {
  const startTime = new Date('06/20/2022');
  const diffTime = Date.now() - startTime.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return days + 1;
};

export const getSummary = cache(
  async () => {
    const result: SummaryResponse = {
      commentCount: 0,
      blogCount: 0,
      viewCount: 0,
      onlineDays: getOnlineDays(),
    };

    result.commentCount = await getCommentCount();

    const blogs = await getAllBlogs();
    if (blogs?.length) {
      result.blogCount = blogs.length;
    }

    if (ENV.isProd) {
      result.viewCount = (await redis.get(kvKeys.totalPageViews)) as number;
    } else {
      result.viewCount = 12345;
    }

    return result;
  },
  ['getSummary'],
  {
    revalidate: 3600,
  }
);
