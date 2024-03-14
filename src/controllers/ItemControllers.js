const { PrismaClient } = require("@prisma/client");
const {
  insertItem,
  insertManyItems,
  updateItem,
  deleteItemById,
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
      include: {
        Items_images: true,
        Items_props: true,
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

const getLatestItemsController = (req, res) => {
  prisma.items
    .findMany({
      take: 20,
      orderBy: {
        release_date: "desc",
      },
      include: {
        Items_images: true,
        Items_props: true,
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
      include: {
        Items_images: true,
        Items_props: true,
        Item_status: true,
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

const deleteItemByIdController = async (req, res) => {
  const { item_id } = req.params;

  if (isNaN(parseInt(item_id))) {
    return res.status(400).send("ID non valide");
  }

  const result = await ItemManager.deleteItemById(item_id);

  if (result.status === 200) {
    res.status(200).send("Kit supprimé");
  } else {
    console.error(result.data);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = {
  createItemsController,
  updateItemController,
  getAllItemsController,
  getLatestItemsController,
  getOneItemByIdController,
  deleteItemByIdController,
};
