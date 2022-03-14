import { CommentSchema, SearchCommentsBody } from '@/entities/comment';
import { GetAPISchema } from '..';
import { BlogAPIError } from '../utils/errors';
import isAllowedOperation from '../utils/is-allowed-operation';

const commentEndpoints: GetAPISchema<
  any,
  CommentSchema
>['endpoint']['handler'] = async ctx => {
  const { req, res, handlers } = ctx;

  if (
    !isAllowedOperation(req, res, {
      GET: handlers.getComment,
      POST: handlers.postComment,
      PATCH: handlers.likeComment,
    })
  ) {
    return;
  }

  try {
    if (req.method === 'GET') {
      const body = req.query as unknown as SearchCommentsBody;
      handlers.getComment({ ...ctx, body });
    } else if (req.method === 'POST') {
      const { body } = req;
      handlers.postComment({ ...ctx, body });
    } else if (req.method === 'PATCH') {
      const { body } = req;
      handlers.likeComment({ ...ctx, body });
    }
  } catch (error) {
    const message =
      error instanceof BlogAPIError
        ? 'An unexpected error ocurred with the Blog API'
        : 'An unexpected error ocurred';

    res.status(500).json({ data: null, errors: [{ message }] });
  }
};

export default commentEndpoints;
