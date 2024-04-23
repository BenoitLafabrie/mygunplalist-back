const { PrismaClient } = require("@prisma/client");
const {
  insertItemStatus,
  getItemStatusById,
  updateItemStatus,
} = require("../models/ItemStatusManager");

const prisma = new PrismaClient();

const createItemStatusController = (req, res) => {
  insertItemStatus(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneItemStatusController = (req, res) => {
  getItemStatusById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateItemStatusController = (req, res) => {
  updateItemStatus({ id: req.params.id, body: req.body })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createItemStatusController,
  getOneItemStatusController,
  updateItemStatusController,
};
