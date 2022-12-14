import { Context } from "../../index";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_SIGNATURE } from "../../keys";
import { getEnName } from "../../utils/getEnName";

interface UserArgs {
  user: {
    name: string;
    email: string;
    password: string;
    bio: string;
  };
}

interface UserPayloadType {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const Auth = {
  signUp: async (_: any,{ user: u }: UserArgs,{ prisma }: Context): Promise<UserPayloadType> => {
    const { name, email, password, bio } = u;

    const isEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    //NAME
    if (!name) {
      return {
        userErrors: [
          {
            message: "Name not found.",
          },
        ],
        token: null,
      };
    }
    //EMAIL
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "Invalid e-mail syntax.",
          },
        ],
        token: null,
      };
    }
    //PASSWORD
    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: "Invalid password syntax.",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        name,
        nameEN: getEnName(name),
        email,
        password: hashedPassword,
      },
    });
    const days360 = 31_104_000;
    const token = JWT.sign(
      {
        userId: user.id,
      },
      JWT_SIGNATURE,
      {
        expiresIn: days360,
      }
    );

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    return {
      userErrors: [],
      token,
    };
  },
  signIn: async (_: any,{ user: u }: UserArgs,{ prisma }: Context): Promise<UserPayloadType> => {
    const { email, password } = u;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!email && !password) {
      return {
        userErrors: [
          {
            message: "Invalid credentials.",
          },
        ],
        token: null,
      };
    }
    if (!email) {
      return {
        userErrors: [
          {
            message: "Invalid e-mail",
          },
        ],
        token: null,
      };
    }
    if (!password) {
      return {
        userErrors: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
      };
    }
    if (!user) {
      return {
        userErrors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return {
        userErrors: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
      };
    }

    const days360 = 31_104_000;
    const token = JWT.sign(
      {
        userId: user.id,
      },
      JWT_SIGNATURE,
      {
        expiresIn: days360,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
