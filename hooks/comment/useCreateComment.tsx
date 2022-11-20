import { useRouter } from 'next/navigation';
import { use, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { createComment } from '@/api/comment';
import { GAEventCategories } from '@/constants/gtag';
import { PostCommentBody } from '@/entities/comment';
import { gtag } from '@/utils/gtag';
import { getBlackList } from '@/api/blacklist';

const useCreateComment = (blogId: number) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  // TODO: use 使用错误
  const ensureCommentCanPush = useCallback(({ content, email }: PostCommentBody) => {
    const { blacklist } = use(getBlackList());
    const sensitiveKeyword = blacklist?.keyword.find(k => content.includes(k));
    if (sensitiveKeyword) {
      toast.error(`老铁, 评论内容有敏感词: ${sensitiveKeyword}\n`, {
        duration: 2500,
      });
      return false;
    }
    if (blacklist?.email.includes(email)) {
      toast.error(`老铁, 做了坏事情, 被拉黑了\n`, {
        duration: 2500,
      });
      return false;
    }
    if (!content) {
      toast.error(`老铁, 内容呢?\n`);
      return false;
    }
    return true;
  }, []);

  const postComment = useCallback(
    (params: PostCommentBody) => {
      if (!params.email) {
        toast.loading('请先登陆...');
        return Promise.resolve(false);
      }
      gtag.event('push_comment', {
        category: GAEventCategories.Comment,
        label: `blog_id: ${blogId}`,
      });
      if (ensureCommentCanPush(params)) {
        setLoading(true);
        return toast
          .promise(createComment(params), {
            loading: '发射中...',
            success: <b>👏 发射成功</b>,
            error: <b>🙌 发射失败</b>,
          })
          .then(
            () => {
              router.refresh();
              return true;
            },
            () => false
          )
          .finally(() => {
            setLoading(false);
          });
      }
      return Promise.resolve(false);
    },
    [blogId, ensureCommentCanPush, router]
  );

  return { postComment, isLoading } as const;
};

export default useCreateComment;
