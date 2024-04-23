const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertWishlist = async ({ user_id }) => {
  try {
    const wishlist = await prisma.wishlists.create({
      data: {
        user_id,
      },
      select: {
        wishlist_id: true,
        user_id: true,
      },
    });
    return { status: 201, data: wishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllWishlists = async () => {
  try {
    const getAllWishlists = await prisma.wishlists.findMany({
      select: {
        wishlist_id: true,
        user_id: true,
      },
    });
    return { status: 200, data: getAllWishlists };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getWishlistById = async (id) => {
  try {
    const getWishlist = await prisma.wishlists.findUnique({
      where: {
        user_id: parseInt(id),
      },
      include: {
        Items: {
          include: {
            Items_images: true,
            Items_props: true,
          },
        },
      },
    });
    if (!getWishlist) {
      insertWishlist({ user_id: parseInt(id) });
      return { status: 200, data: "Not found but created" };
    } else {
      return { status: 200, data: getWishlist };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateWishlist = async (id, body) => {
  const { item_id } = body;
  try {
    const wishlist = await prisma.wishlists.update({
      where: {
        user_id: parseInt(id),
      },
      data: {
        Items: {
          connect: {
            item_id: parseInt(item_id),
          },
        },
      },
      select: {
        wishlist_id: true,
        user_id: true,
        Items: {
          select: {
            item_id: true,
          },
        },
      },
    });
    const itemsId = wishlist.Items[0];
    const results = { wishlist, itemsId };

    return { status: 200, data: results };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteWishlist = async (id) => {
  try {
    const wishlist = await prisma.wishlists.delete({
      where: {
        user_id: parseInt(id),
      },
    });
    return { status: 200, data: wishlist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertWishlist,
  updateWishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlistById,
};
