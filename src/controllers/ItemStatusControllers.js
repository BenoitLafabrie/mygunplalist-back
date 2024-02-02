const { PrismaClient } = require("@prisma/client");
const {
  insertItemStatus,
  getItemStatusById,
  updateItemStatus,
} = require("../models/ItemStatusManager");

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

module.exports = {
  createItemStatusController,
  getOneItemStatusController,
  updateItemStatusController,
};
