import { Context } from "../../index";
import validator from "validator";
import { getEnName } from "../../utils/getEnName";
import bcrypt from "bcryptjs";

export const Edit = {
  editName: async (
    _: any,
    { newValue }: { newValue: string },
    { prisma, userInfo }: Context
  ) => {
    if (!newValue) {
      return {
        newValue: null,
        userErrors: [
          {
            message: "No new name found.",
          },
        ],
      };
    }

    await prisma.user.update({
      where: {
        id: userInfo?.userId,
      },
      data: {
        name: newValue,
        nameEN: getEnName(newValue),
      },
    });

    return {
      name: newValue,
      userErrors: [
        {
          message: "",
        },
      ],
    };
  },
  editEmail: async (
    _: any,
    { newValue }: { newValue: string },
    { prisma, userInfo }: Context
  ) => {
    const isEmail = validator.isEmail(newValue);
    if (!newValue) {
      return {
        newValue: null,
        userErrors: [
          {
            message: "No new email found.",
          },
        ],
      };
    }

    if (isEmail) {
      await prisma.user.update({
        where: {
          id: userInfo?.userId,
        },
        data: {
          email: newValue,
        },
      });

      return {
        email: newValue,
        userErrors: [
          {
            message: "",
          },
        ],
      };
    } else {
      return {
        email: null,
        userErrors: [
          {
            message: "Wrong syntax.",
          },
        ],
      };
    }
  },
  editPassword: async (
    _: any,
    { newValue }: { newValue: string },
    { prisma, userInfo }: Context
  ) => {
    const isValidPassword = validator.isLength(newValue, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        password: null,
        userErrors: [
          {
            message: "Invalid password syntax.",
          },
        ],
      };
    }
    const hashedPassword = await bcrypt.hash(newValue, 10);

    await prisma.user.update({
      where: {
        id: userInfo?.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      password: hashedPassword,
      userErrors: [
        {
          message: "",
        },
      ],
    };
  },
  blockUser: async (_: any,{ id }: { id: string },{ prisma, userInfo }: Context) => {
    const userBlock = await prisma.usersBlocking.create({
      data: {
        blockedId: +id,
        userId: userInfo!.userId,
      },
    });
    
  },
};
