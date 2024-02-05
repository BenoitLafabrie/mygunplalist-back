const { PrismaClient } = require("@prisma/client");
const {
  insertItem,
  insertManyItems,
  updateItem,
} = require("../models/ItemManager");

const prisma = new PrismaClient();

const createItemController = (req, res) => {
  insertItem(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyItemsController = (req, res) => {
  insertManyItems(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createItemsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyItemsController(req, res, next);
  } else {
    return createItemController(req, res, next);
  }
};

const updateItemController = (req, res) => {
  updateItem(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getAllItemsController = (req, res) => {
  prisma.items
    .findMany({
      select: {
        item_id: true,
        name: true,
        release_date: true,
        barcode: true,
        description: true,
        ROG_Url: true,
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

const getOneItemByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  prisma.items
    .findUnique({
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
    })
    .then((oneItemById) => {
      if (!oneItemById) {
        res.status(404).send("Aucun item correspondant trouvé");
      } else {
        res.status(200).send(oneItemById);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteItemByIdController = (req, res) => {
  const { item_id } = req.params;

  if (isNaN(parseInt(item_id))) {
    return res.status(400).send("ID non valide");
  }

  prisma.items
    .delete({
      where: { item_id: parseInt(item_id) },
    })
    .then((deleteById) => {
      if (!deleteById) {
        res.status(404).send("Aucun kit correspondant trouvé");
      } else {
        res.status(200).send("Kit supprimé");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createItemsController,
  updateItemController,
  getAllItemsController,
  getOneItemByIdController,
  deleteItemByIdController,
};
