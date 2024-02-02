const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertAchievement = async ({ name, description }) => {
  try {
    const achievement = await prisma.achievement.create({
      data: {
        name,
        description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return { status: 201, data: achievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyAchievements = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        name: item.name,
        description: item.description,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllAchievements = async () => {
  try {
    const getAllAchievements = await prisma.achievement.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return { status: 200, data: getAllAchievements };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAchievementById = async (id) => {
  try {
    const getAchievement = await prisma.achievement.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getAchievement) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getAchievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateAchievement = async (id, body) => {
  const { name, description } = body;
  try {
    const achievement = await prisma.achievement.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return { status: 200, data: achievement };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertAchievement,
  insertManyAchievements,
  updateAchievement,
  getAllAchievements,
  getAchievementById,
};
