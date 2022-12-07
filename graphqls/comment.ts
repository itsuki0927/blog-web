import { gql } from 'graphql-request';

export const QUERY_COMMENTS = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        state
        nickname
        email
        content
        liking
        emoji
        provider
        avatar
        ip
        agent
        city
        province
        fix
        expand
        blogTitle
        blogDescription
        parentNickName
        parentId
        blogId
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      createAt
      updateAt
      state
      nickname
      email
      content
      liking
      provider
      avatar
      ip
      agent
      city
      province
      fix
      expand
      blogTitle
      blogDescription
      parentNickName
      parentId
      blogId
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($id: ID!, $emoji: String!) {
    likeComment(id: $id, emoji: $emoji)
  }
`;

export const VALIDATE_COMMENT_ALLOW_OPERATE = gql`
  query validateCommentAllowOperate($id: ID!, $uid: String!) {
    validateCommentAllowOperate(id: $id, uid: $uid)
  }
`;
