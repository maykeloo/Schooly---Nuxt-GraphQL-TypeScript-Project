import {Context} from "../index";

interface PostParent {
    id: number,
    title: string,
    content: string,
    authorId: number,
}

export const Categories = {
    category: async (parent: PostParent, __: any, { prisma }: Context) => {
      
    }
}



