const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertFriend = async ({ friend_id, userId }) => {
  try {
    const friend = await prisma.friends.create({
      data: {
        friend_id,
        userId,
      },
      select: {
        id: true,
        friend_id: true,
        userId: true,
      },
    });
    return { status: 201, data: friend };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyFriends = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        friend_id: item.friend_id,
        userId: item.userId,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllFriends = async () => {
  try {
    const getAllFriends = await prisma.friends.findMany({
      select: {
        id: true,
        friend_id: true,
        userId: true,
      },
    });
    return { status: 200, data: getAllFriends };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getFriendById = async (id) => {
  try {
    const getFriend = await prisma.friends.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getFriend) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getFriend };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateFriend = async (id, body) => {
  const { friend_id, userId } = body;
  try {
    const friend = await prisma.friends.update({
      where: {
        id: parseInt(id),
      },
      data: {
        friend_id: friend_id,
        userId: userId,
      },
      select: {
        id: true,
        friend_id: true,
        userId: true,
      },
    });
    return { status: 200, data: friend };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteFriend = async (id) => {
  try {
    const friend = await prisma.friends.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: friend };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertFriend,
  insertManyFriends,
  updateFriend,
  getAllFriends,
  getFriendById,
  deleteFriend,
};
