const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertItemImage = async ({ image_path, item_id }) => {
  try {
    const itemImage = await prisma.items_images.create({
      data: {
        image_path,
        item_id,
      },
      select: {
        item_image_id: true,
        image_path: true,
        item_id: true,
      },
    });
    return { status: 201, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyItemImages = async (items) => {
  try {
    const result = await prisma.items_images.createMany({
      data: items.map((item) => ({
        image_path: item.image_path,
        item_id: item.item_id,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllItemImages = async () => {
  try {
    const getAllItemImages = await prisma.items_images.findMany({
      select: {
        item_image_id: true,
        image_path: true,
        item_id: true,
      },
    });
    return { status: 200, data: getAllItemImages };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemImageById = async (id) => {
  try {
    const getItemImage = await prisma.items_images.findUnique({
      where: {
        item_image_id: parseInt(id),
      },
    });
    if (!getItemImage) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getItemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItemImage = async (id, body) => {
  const { image_path, item_id } = body;
  try {
    const itemImage = await prisma.items_images.update({
      where: {
        item_image_id: parseInt(id),
      },
      data: {
        image_path: image_path,
        item_id: item_id,
      },
      select: {
        item_image_id: true,
        image_path: true,
        item_id: true,
      },
    });
    return { status: 200, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteItemImage = async (id) => {
  try {
    const itemImage = await prisma.items_images.delete({
      where: {
        item_image_id: parseInt(id),
      },
    });
    return { status: 200, data: itemImage };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertItemImage,
  insertManyItemImages,
  updateItemImage,
  getAllItemImages,
  getItemImageById,
  deleteItemImage,
};
