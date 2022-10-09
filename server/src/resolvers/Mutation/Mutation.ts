import { post } from "./post";
import { Comment } from "./comment";
import { Auth } from "./auth";
import { Edit } from "./edit";

export const Mutation = {
    ...post,
    ...Auth,
    ...Comment,
    ...Edit
}