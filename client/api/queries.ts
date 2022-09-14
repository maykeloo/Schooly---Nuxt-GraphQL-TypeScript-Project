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

export const GET_PROFILE_DETAILS = gql`
  query($userId: ID!) {
    profile(userId: $userId) {
      bio
      user {
        name
        email
      }
    }
  }
`

