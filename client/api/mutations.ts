import { gql } from "@apollo/client/core"

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
`

export const SIGN_UP = gql`
    mutation($user: SignUpInput!) {
        signUp(user: $user) {
            token
            userErrors {
                message
            }
        }
    }
`

export const SIGN_IN = gql`
    mutation($user: SignInInput!) {
        signIn(user: $user) {
            token
            userErrors {
                message
            }
        }
    }
`

export const POST_CREATE = gql`
    mutation($post: PostInput!) {
        postCreate(post: $post) {
            post {
                title
                content
                categories
            }
        }
    }
`