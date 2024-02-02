const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertAchievementImage = async ({ image_path, achievementId }) => {
  try {
    const achievementImage = await prisma.achievementImage.create({
      data: {
        image_path,
        achievementId,
      },
      select: {
        id: true,
        image_path: true,
        achievementId: true,
      },
    });
    return { status: 201, data: achievementImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyAchievementImages = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        image_path: item.image_path,
        achievementId: item.achievementId,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllAchievementImages = async () => {
  try {
    const getAllAchievementImages = await prisma.achievementImage.findMany({
      select: {
        id: true,
        image_path: true,
        achievementId: true,
      },
    });
    return { status: 200, data: getAllAchievementImages };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAchievementImageById = async (id) => {
  try {
    const getAchievementImage = await prisma.getAchievementImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getAchievementImage) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getAchievementImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateAchievementImage = async (id, body) => {
  const { image_path, achievementId } = body;
  try {
    const achievementImage = await prisma.AchievementImage.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image_path: image_path,
        achievementId: achievementId,
      },
      select: {
        id: true,
        image_path: true,
        achievementId: true,
      },
    });
    return { status: 200, data: achievementImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertAchievementImage,
  insertManyAchievementImages,
  updateAchievementImage,
  getAllAchievementImages,
  getAchievementImageById,
};
