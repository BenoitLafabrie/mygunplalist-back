import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (user) return { status: 200, data: user };
    else return { status: 404, data: "User Not Found" };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export { findUserByEmail };
