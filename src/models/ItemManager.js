const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertItem = async ({
  name,
  release_date,
  barcode,
  description,
  ROG_Url,
}) => {
  try {
    const item = await prisma.items.create({
      data: {
        name,
        release_date,
        barcode,
        description,
        ROG_Url,
      },
      select: {
        item_id: true,
        name: true,
        release_date: true,
        barcode: true,
        description: true,
        ROG_Url: true,
      },
    });
    return { status: 201, data: item };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyItems = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        name: item.name,
        release_date: item.release_date,
        barcode: item.barcode,
        description: item.description,
        ROG_Url: item.ROG_Url,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllItems = async () => {
  try {
    const items = await prisma.items.findMany({
      select: {
        item_id: true,
        name: true,
        release_date: true,
        barcode: true,
        description: true,
        ROG_Url: true,
      },
    });
    return { status: 200, data: items };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemById = async (item_id) => {
  try {
    const getItem = await prisma.items.findUnique({
      where: {
        item_id: parseInt(item_id),
      },
    });
    if (!getItem) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getItem };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItem = async (item_id, body) => {
  const { name, release_date, barcode, description, ROG_Url } = body;
  try {
    const item = await prisma.items.update({
      where: {
        item_id: parseInt(item_id),
      },
      data: {
        name: name,
        release_date: release_date,
        barcode: barcode,
        description: description,
        ROG_Url: ROG_Url,
      },
      select: {
        item_id: true,
        name: true,
        release_date: true,
        barcode: true,
        description: true,
        ROG_Url: true,
      },
    });
    return { status: 200, data: item };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export { insertItem, insertManyItems, updateItem, getAllItems, getItemById };
