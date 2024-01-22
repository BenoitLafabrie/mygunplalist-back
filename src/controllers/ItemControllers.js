import { PrismaClient } from "@prisma/client";
import {
  insertItem,
  insertManyItems,
  updateItem,
} from "../models/ItemManager.js";

const prisma = new PrismaClient();

const createItemController = async (req, res) => {
  const { status, data } = await insertItem(req.body);
  res.status(status).send(data);
};

const createManyItemsController = async (req, res) => {
  const { status, data } = await insertManyItems(req.body);
  res.status(status).send(data);
};

const createItemsController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemsController(req, res, next);
  } else {
    return createItemController(req, res, next);
  }
};

const updateItemController = async (req, res) => {
  const { status, data } = await updateItem(req.params.id, req.body);
  res.status(status).send(data);
};

const getAllItemsController = async (req, res) => {
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
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOneItemByIdController = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const oneItemById = await prisma.items.findUnique({
      where: {
        item_id: id,
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
    if (!oneItemById) {
      res.status(404).send("Aucun item correspondant trouvé");
    } else {
      res.status(200).send(oneItemById);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteItemByIdController = async (req, res) => {
  const { item_id } = req.params;

  if (isNaN(parseInt(item_id))) {
    return res.status(400).send("ID non valide");
  }

  try {
    const deleteById = await prisma.items.delete({
      where: { item_id: parseInt(item_id) },
    });
    if (!deleteById) {
      res.status(404).send("Aucun kit correspondant trouvé");
    } else {
      res.status(200).send("Kit supprimé");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default {
  createItemsController,
  updateItemController,
  getAllItemsController,
  getOneItemByIdController,
  deleteItemByIdController,
};
