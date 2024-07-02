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
    // Get the user's wishlist_id
    let getWishlistId = await prisma.wishlists.findUnique({
      where: {
        user_id: parseInt(id),
      },
      select: {
        wishlist_id: true,
      },
    });
    if (!getWishlistId) {
      getWishlistId = await insertWishlist({ user_id: parseInt(id) });
    }
    const wishlistId = getWishlistId.wishlist_id;
    // Get wishlist's items
    const itemsToWishlists = await prisma.itemsToWishlists.findMany({
      where: {
        B: parseInt(wishlistId),
      },
    });
    const result = {
      itemsToWishlists,
      wishlistId,
    };

    // Get the item_ids from the result array
    const itemIds = result.itemsToWishlists.map((wishlist) => wishlist.A);

    // Fetch the corresponding items
    const items = await prisma.items.findMany({
      where: {
        item_id: {
          in: itemIds,
        },
      },
      include: {
        Items_images: true,
        Items_props: true,
      },
    });

    return {
      status: 200,
      data: { items: items, wishlist_id: result?.wishlistId },
    };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateWishlist = async (id, body) => {
  const { item_id } = body;
  try {
    const getWishlistId = await prisma.wishlists.findUnique({
      where: {
        user_id: parseInt(id),
      },
      select: {
        wishlist_id: true,
      },
    });
    const wishlistId = getWishlistId.wishlist_id;

    const wishlist = await prisma.itemsToWishlists.create({
      data: {
        A: parseInt(item_id),
        B: parseInt(wishlistId),
      },
      select: {
        A: true,
        B: true,
      },
    });

    const itemId = wishlist.B;
    const results = { wishlist, itemId };

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
        wishlist_id: parseInt(id),
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
