import { PrismaClient } from "@prisma/client";

import {
  insertItemStatus,
  getItemStatusById,
  updateItemStatus,
} from "../models/ItemStatusManager.js";

const prisma = new PrismaClient();

const createItemStatusController = async (req, res) => {
  const { status, data } = await insertItemStatus(req.body);
  res.status(status).send(data);
};

const getOneItemStatusController = async (req, res) => {
  const { status, data } = await getItemStatusById(req.params.id);
  res.status(status).send(data);
};

const updateItemStatusController = async (req, res) => {
  const { status, data } = await updateItemStatus(req.params.id, req.body);
  res.status(status).send(data);
};

export default {
  createItemStatusController,
  getOneItemStatusController,
  updateItemStatusController,
};
