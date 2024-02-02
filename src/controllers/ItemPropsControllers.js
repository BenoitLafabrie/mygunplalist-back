const { PrismaClient } = require("@prisma/client");
const {
  insertItemProps,
  insertManyItemProps,
  updateItemProps,
  getItemPropsById,
  deleteItemProps,
} = require("../models/ItemPropsManager");

const prisma = new PrismaClient();

const createItemPropsController = async (req, res) => {
  const { status, data } = await insertItemProps(req.body);
  res.status(status).send(data);
};

const createManyItemPropsController = async (req, res) => {
  const { status, data } = await insertManyItemProps(req.body);
  res.status(status).send(data);
};

const createItemsPropsController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemPropsController(req, res, next);
  } else {
    return createItemPropsController(req, res, next);
  }
};

const getAllItemPropsController = async (req, res) => {
  try {
    const items = await prisma.items_props.findMany({
      select: {
        item_props_id: true,
        grade: true,
        scale: true,
        series: true,
        item_id: true,
      },
    });
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOneItemPropsController = async (req, res) => {
  const { status, data } = await getItemPropsById(req.params.id);
  res.status(status).send(data);
};

const updateItemPropsController = async (req, res) => {
  const { status, data } = await updateItemProps(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteItemPropsController = async (req, res) => {
  const { status, data } = await deleteItemProps(req.params.id);
  res.status(status).send(data);
};

export default {
  createItemsPropsController,
  getAllItemPropsController,
  getOneItemPropsController,
  updateItemPropsController,
  deleteItemPropsController,
};
