import { Category } from "./Category"

export interface User {
    id:            number
    email:         string
    name:          string
    password:      string
    createdAt:     Date
    updatedAt:     Date
    posts:         Post[]
    profile:       Profile
}

export interface Post {
    id:            string | number
    title:         string
    content:       string
    published:     boolean
    createdAt:     string
    user:          User
    categories:    Category[]
}

export interface Profile {
    id:            string | number
    bio:           string
    isMyProfile:   boolean
    user:          User
}

export interface ProfileDetails {
    id:            string | number
    bio:           string
    isMyProfile:   boolean
    user: {
        name:      string,
        email:     string
    }
}