import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        posts: [Post!]!
        post(postId: ID!): Post!
        me: MePayload
        profile(userId: ID!): Profile
        categories: [CategoriesOnPosts!]
        postWithCategory(category: String!): [Post!]
    }

    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput): PostPayload!
        postDelete(postId: ID!): PostPayload
        postPublish(postId: ID!): PostPayload
        signUp(user: SignUpInput!): UserPayload!
        signIn(user: SignInInput!): UserPayload!
        categoryCreate(name: String!): CategoryPayload!
    }

    type Post {
        id:         ID!
        title:      String!
        content:    String!
        published:  Boolean!
        createdAt:  String!     
        user:       User
        categories: [CategoriesOnPosts]
    }

    type User {
        id:         ID!
        email:      String!   
        name:       String!
        password:   String!
        createdAt:  String!   
        profile:    Profile!
        posts:      [Post!]!
    }

    type Profile {
        id:         ID!
        bio:        String!
        isMyProfile:Boolean!
        user:       User!
    }

    type Category {
        id:         ID!
        name:       String!
        posts:      [CategoriesOnPosts]
    }

    type CategoriesOnPosts {
        post:       Post     
        postId:     Int 
        category:   Category 
        categoryId: Int 
    }

    type UserError {
        message:    String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post:        Post
    }
    
    type CategoryPayload {
        userErrors:      [UserError!]
        category:        Category
    }

    type UserPayload {
        userErrors: [UserError!]!
        token: String
    }

    type MePayload {
        userErrors: [UserError!]!
        user:       User
    }

    input SignUpInput {
        name:       String!
        email:      String!   
        password:   String!
        bio:        String!
    }

    input SignInInput {
        email:      String!
        password:   String!
    }

    input CategoryInput {
        name:   String!
    }

    input PostInput {
        title:      String
        content:    String
        categories:       [String!]
    }
`;