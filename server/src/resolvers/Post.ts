import { userLoader } from '../loaders/userLoader'
import {Context} from "../index";

interface PostParent {
    id: number,
    title: string,
    content: string,
    authorId: number,
}

export const Post = {
    user: (parent: PostParent) => {
        return userLoader.load(parent.authorId)
    },
    // categories: async (parent: PostParent, __: any, { prisma }: Context) => {
    //   const categoriesForPost = await prisma.categoriesOnPosts.findMany({
    //     where: {
    //       postId: parent.id,
    //     }
    //   })
    //   return categoriesForPost
    // }
    categories: async (parent: PostParent, __: any, { prisma }: Context) => {
      const categoriesForPost = await prisma.category.findMany({
        where: {
          posts: {
            some: {
              post: {
                id: parent.id
              }
            }
          }
        }
      })
      console.log(categoriesForPost)
      return [
            {
                  postId: parent.id,
                  category: {
                    name: categoriesForPost[0].name
                  }
            },
      ];
    }
}



