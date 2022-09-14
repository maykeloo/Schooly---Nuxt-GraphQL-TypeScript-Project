import { userLoader } from "../loaders/userLoader";
import { Context } from "../index";

interface PostParent {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface PostCategoryPayload {
  postId: number;
  category: {
    name: string;
  };
}

export const Post = {
  user: (parent: PostParent) => {
    return userLoader.load(parent.authorId);
  },
  categories: async (parent: PostParent, __: any, { prisma }: Context) => {
    const categoriesForPost = await prisma.category.findMany({
      where: {
        posts: {
          every: {
            post: {
              categories: {
                every: {
                  postId: parent.id,
                },
              },
            },
          },
        },
      },
    });

    let data: PostCategoryPayload[] = [];

    categoriesForPost.forEach((category) => {
      data.push({
        postId: parent.id,
        category: {
          name: category.name,
        },
      });
    });
    return data;
  },
};
