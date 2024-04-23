const { PrismaClient } = require("@prisma/client");
const {
  insertItemImage,
  insertManyItemImages,
  updateItemImage,
  getItemImageById,
  deleteItemImage,
} = require("../models/ItemImageManager");

const prisma = new PrismaClient();

const createItemImageController = (req, res) => {
  insertItemImage(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyItemImagesController = (req, res) => {
  insertManyItemImages(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createItemImagesController = (req, res, next) => {
  if (Array.isArray(req.body.image_path)) {
    return createManyItemImagesController(req, res, next);
  } else {
    return createItemImageController(req, res, next);
  }
};

const getAllItemImagesController = (req, res) => {
  prisma.items_images
    .findMany({
      select: {
        item_image_id: true,
        image_path: true,
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

const getOneItemImageController = (req, res) => {
  getItemImageById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateItemImageController = (req, res) => {
  updateItemImage(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteItemImageController = (req, res) => {
  deleteItemImage(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createItemImagesController,
  getAllItemImagesController,
  getOneItemImageController,
  updateItemImageController,
  deleteItemImageController,
};
