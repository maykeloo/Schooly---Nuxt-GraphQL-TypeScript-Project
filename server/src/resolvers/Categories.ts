import {Context} from "../index";

interface PostParent {
    id: number,
    title: string,
    content: string,
    authorId: number,
}

export const Category = {
    category: async (parent: PostParent, __: any, { prisma }: Context) => {
      console.log('TEST')
    }
}



