const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertItemProps = async ({ grade, scale, series, item_id }) => {
  try {
    const itemProps = await prisma.items_props.create({
      data: {
        grade,
        scale,
        series,
        item_id,
      },
      select: {
        item_props_id: true,
        grade: true,
        scale: true,
        series: true,
        item_id: true,
      },
    });
    return { status: 201, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyItemProps = async (items) => {
  try {
    const result = await prisma.items_props.createMany({
      data: items.map((item) => ({
        grade: item.grade,
        scale: item.scale,
        series: item.series,
        item_id: item.item_id,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllItemProps = async () => {
  try {
    const getAllItemProps = await prisma.items_props.findMany({
      select: {
        item_props_id: true,
        grade: true,
        scale: true,
        series: true,
        item_id: true,
      },
    });
    return { status: 200, data: getAllItemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getItemPropsById = async (id) => {
  try {
    const getItemProps = await prisma.items_props.findUnique({
      where: {
        item_props_id: parseInt(id),
      },
    });
    if (!getItemProps) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getItemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateItemProps = async (id, body) => {
  const { grade, scale, series, item_id } = body;
  try {
    const itemProps = await prisma.items_props.update({
      where: {
        item_props_id: parseInt(id),
      },
      data: {
        grade: grade,
        scale: scale,
        series: series,
        item_id: item_id,
      },
      select: {
        item_props_id: true,
        grade: true,
        scale: true,
        series: true,
        item_id: true,
      },
    });
    return { status: 200, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteItemProps = async (id) => {
  try {
    const itemProps = await prisma.items_props.delete({
      where: {
        item_props_id: parseInt(id),
      },
    });
    return { status: 200, data: itemProps };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  insertItemProps,
  insertManyItemProps,
  updateItemProps,
  getAllItemProps,
  getItemPropsById,
  deleteItemProps,
};
