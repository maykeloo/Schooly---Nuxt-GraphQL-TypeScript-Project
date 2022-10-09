import { gql } from "@apollo/client/core";

export const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
        published
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation ($user: SignUpInput!) {
    signUp(user: $user) {
      token
      userErrors {
        message
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation ($user: SignInInput!) {
    signIn(user: $user) {
      token
      userErrors {
        message
      }
    }
  }
`;

export const POST_CREATE = gql`
  mutation ($post: PostInput!) {
    postCreate(post: $post) {
      post {
        title
        content
        categories {
          category {
            name
          }
        }
      }
    }
  }
`;

export const COMMENT_CREATE = gql`
  mutation ($comment: CommentInput!) {
    commentCreate(comment: $comment) {
      comment {
        userId
        postId
        content
        user {
          id
          name
        }
      }
      userErrors {
        message
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($postId: ID!) {
    postDelete(postId: $postId) {
      post {
        title
        content
      }
    }
  }
`;

export const EDIT_NAME = gql`
  mutation ($newValue: String!) {
    editName(newValue: $newValue) {
      name
      userErrors {
        message
      }
    }
  }
`;

export const EDIT_MAIL = gql`
  mutation ($newValue: String!) {
    editEmail(newValue: $newValue) {
      email
      userErrors {
        message
      }
    }
  }
`;

export const EDIT_PASSWORD = gql`
  mutation ($newValue: String!) {
    editPassword(newValue: $newValue) {
      password
      userErrors {
        message
      }
    }
  }
`;
