const { PrismaClient } = require("@prisma/client");
const {
  insertItemProps,
  insertManyItemProps,
  updateItemProps,
  getItemPropsById,
  deleteItemProps,
} = require("../models/ItemPropsManager");

const prisma = new PrismaClient();

const createItemPropsController = (req, res) => {
  insertItemProps(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyItemPropsController = (req, res) => {
  insertManyItemProps(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createItemsPropsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemPropsController(req, res, next);
  } else {
    return createItemPropsController(req, res, next);
  }
};

const getAllItemPropsController = (req, res) => {
  prisma.items_props
    .findMany({
      select: {
        item_props_id: true,
        grade: true,
        scale: true,
        series: true,
        item_id: true,
      },
    })
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneItemPropsController = (req, res) => {
  getItemPropsById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateItemPropsController = (req, res) => {
  updateItemProps(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteItemPropsController = (req, res) => {
  deleteItemProps(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createItemsPropsController,
  getAllItemPropsController,
  getOneItemPropsController,
  updateItemPropsController,
  deleteItemPropsController,
};
