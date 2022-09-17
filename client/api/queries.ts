import { gql } from "@apollo/client/core"

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      published
      user {
        id
        name
      }
      categories {
        category {
          id
          name
        }
      }
    }
  }
`
export const GET_PROFILE = gql`
  query($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        email
        createdAt
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
    }
  }
`

export const GET_POST = gql`
  query($postId: ID!) {
    post(postId: $postId) {
      id
      title
      content
    }
  }
`


export const GET_USER_POSTS = gql`
  query($userId: ID!) {
    userPosts(userId: $userId) {
      id
      title
      content
    }
  }
`

export const GET_PROFILE_DETAILS = gql`
  query($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        email
      }
    }
  }
`

export const GET_POSTS_WITH_CATEGORY = gql`
  query($category: String!) {
    postWithCategory(category: $category) {
      id
      title
      content
      createdAt
      published
      user {
        id
        name
      }
      categories {
        category {
          id
          name
        }
      }
    }
  }
`

