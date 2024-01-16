import { PrismaClient } from "@prisma/client";
import {
  insertItemImage,
  insertManyItemImages,
  updateItemImage,
  getItemImageById,
  deleteItemImage,
} from "../models/ItemImageManager.js";

const prisma = new PrismaClient();

const createItemImageController = async (req, res) => {
  const { status, data } = await insertItemImage(req.body);
  res.status(status).send(data);
};

const createManyItemImagesController = async (req, res) => {
  const { status, data } = await insertManyItemImages(req.body);
  res.status(status).send(data);
};

const createItemImagesController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemImagesController(req, res, next);
  } else {
    return createItemImageController(req, res, next);
  }
};

const getAllItemImagesController = async (req, res) => {
  try {
    const items = await prisma.items_images.findMany({
      select: {
        item_image_id: true,
        image_path: true,
        item_id: true,
      },
    });
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOneItemImageController = async (req, res) => {
  const { status, data } = await getItemImageById(req.params.id);
  res.status(status).send(data);
};

const updateItemImageController = async (req, res) => {
  const { status, data } = await updateItemImage(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteItemImageController = async (req, res) => {
  const { status, data } = await deleteItemImage(req.params.id);
  res.status(status).send(data);
};

export default {
  createItemImagesController,
  getAllItemImagesController,
  getOneItemImageController,
  updateItemImageController,
  deleteItemImageController,
};
