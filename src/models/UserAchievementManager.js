const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertUserAchievement = async ({ name, description, userId }) => {
  try {
    const userAchievement = await prisma.user_achievements.create({
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
    return { status: 201, data: userAchievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyUserAchievements = async (items) => {
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

const getAllUserAchievements = async () => {
  try {
    const getAllUserAchievements = await prisma.user_achievements.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });
    return { status: 200, data: getAllUserAchievements };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getUserAchievementById = async (id) => {
  try {
    const getUserAchievement = await prisma.user_achievements.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getUserAchievement) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getUserAchievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateUserAchievement = async (id, body) => {
  const { name, description, userId } = body;
  try {
    const userAchievement = await prisma.user_achievements.update({
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
    return { status: 200, data: userAchievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteUserAchievement = async (id) => {
  try {
    const userAchievement = await prisma.user_achievements.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: userAchievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertUserAchievement,
  insertManyUserAchievements,
  updateUserAchievement,
  deleteUserAchievement,
  getAllUserAchievements,
  getUserAchievementById,
};
