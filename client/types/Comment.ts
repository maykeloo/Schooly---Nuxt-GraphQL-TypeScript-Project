import {Post, User} from "~/types/User";

export interface Comment {
    id:        string
    postId:    string
    createdAt: string
    published: boolean
    updatedAt: string
    user:      User
    userId:    string
    content:   string
    post:      Post
}