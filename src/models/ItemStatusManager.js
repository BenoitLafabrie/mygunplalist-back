import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertItemStatus = async ({ status, item_id, mygunplalist_id }) => {
  try {
    const itemStatus = await prisma.items_status.create({
      data: {
        status,
        item_id,
        mygunplalist_id,
      },
      select: {
        item_status_id: true,
        status: true,
        item_id: true,
        mygunplalist_id: true,
      },
    });
    return { status: 201, data: itemStatus };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemStatusById = async (id) => {
  try {
    const getItemStatus = await prisma.items_status.findUnique({
      where: {
        item_status_id: id,
      },
    });
    if (!getItemStatus) {
      return { status: 404, data: "Not Found" };
    } else {
      return { status: 200, data: getItemStatus };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItemStatus = async ({ id, body }) => {
  const { status, item_status_id } = body;
  try {
    const itemStatus = await prisma.items_status.update({
      where: {
        item_status_id: id,
      },
      data: {
        status,
        item_status_id,
      },
    });
    return { status: 200, data: itemStatus };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export { insertItemStatus, getItemStatusById, updateItemStatus };
