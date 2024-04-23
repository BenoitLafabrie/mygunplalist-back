const { PrismaClient } = require("@prisma/client");
const {
  insertItem,
  insertManyItems,
  updateItems,
  deleteItemsByIds,
  deleteItemsFromGunplaList,
  deleteItemsFromWishlist,
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

const updateItemsController = (req, res) => {
  updateItems(req.body)
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

const deleteItemsByIdController = async (req, res) => {
  const { item_ids } = req.body;

  if (!Array.isArray(item_ids) || item_ids.some((id) => isNaN(parseInt(id)))) {
    return res.status(400).send("Invalid IDs");
  }

  const result = await deleteItemsByIds(item_ids);

  if (result.status === 200) {
    res.status(200).send("Kits deleted");
  } else {
    console.error(result.data);
    res.status(500).send("Internal server error");
  }
};

const deleteItemsFromGunplaListController = (req, res) => {
  const { mygunplalist_id } = req.params;
  const item_ids = req.body.item_ids;
  deleteItemsFromGunplaList(item_ids, mygunplalist_id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteItemsFromWishlistController = (req, res) => {
  const { wishlist_id } = req.params;
  const item_ids = req.body.item_ids;
  deleteItemsFromWishlist(item_ids, wishlist_id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createItemsController,
  updateItemsController,
  getAllItemsController,
  getLatestItemsController,
  getOneItemByIdController,
  deleteItemsByIdController,
  deleteItemsFromGunplaListController,
  deleteItemsFromWishlistController,
};
