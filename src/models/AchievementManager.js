const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertAchievement = async ({ name, description }) => {
  try {
    const achievement = await prisma.achievements.create({
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
    const getAllAchievements = await prisma.achievements.findMany({
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
  return prisma.achievements
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((getAchievement) => {
      if (!getAchievement) {
        return { status: 404, data: "Not Found" };
      }
      return { status: 200, data: getAchievement };
    })
    .catch((error) => {
      console.error(error);
      return { status: 500, data: "Internal Error" };
    });
};

const updateAchievement = async (id, body) => {
  const { name, description } = body;
  return prisma.achievements
    .update({
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
    })
    .then((achievement) => ({ status: 200, data: achievement }))
    .catch((error) => {
      console.error(error);
      return { status: 500, data: "Internal Error" };
    });
};

module.exports = {
  insertAchievement,
  insertManyAchievements,
  updateAchievement,
  getAllAchievements,
  getAchievementById,
};
