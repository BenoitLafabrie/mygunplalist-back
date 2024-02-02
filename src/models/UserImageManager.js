const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertUserImage = async ({ name, description, userId }) => {
  try {
    const userImage = await prisma.userImage.create({
      data: {
        name,
        description,
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });
    return { status: 201, data: userImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyUserImages = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        name: item.name,
        description: item.description,
        userId: item.userId,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllUserImages = async () => {
  try {
    const getAllUserImages = await prisma.userImage.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });
    return { status: 200, data: getAllUserImages };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getUserImageById = async (id) => {
  try {
    const getUserImage = await prisma.UserImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getUserImage) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getUserImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateUserImage = async (id, body) => {
  const { name, description, userId } = body;
  try {
    const userImage = await prisma.userImage.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });
    return { status: 200, data: userImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteUserImage = async (id) => {
  try {
    const userImage = await prisma.userImage.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: userImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertUserImage,
  insertManyUserImages,
  updateUserImage,
  deleteUserImage,
  getAllUserImages,
  getUserImageById,
};
