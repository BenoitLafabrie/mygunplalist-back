const {
  insertUserImage,
  insertManyUserImages,
  updateUserImage,
  getAllUserImages,
  getUserImageById,
  deleteUserImage,
} = require("../models/UserImageManager");

const createUserImageController = (req, res) => {
  insertUserImage({
    ...req.body,
    userId: req.payload.sub.id,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyUserImagesController = (req, res) => {
  insertManyUserImages({
    ...req.body,
    userId: req.payload.sub.id,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createUserImagesController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyUserImagesController(req, res, next);
  } else {
    return createUserImageController(req, res, next);
  }
};

const getAllUserImagesController = (req, res) => {
  const { id } = req.payload.sub;
  getAllUserImages(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneUserImageController = (req, res) => {
  getUserImageById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateUserImageController = (req, res) => {
  updateUserImage(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteUserImageController = (req, res) => {
  deleteUserImage(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createUserImagesController,
  getAllUserImagesController,
  getOneUserImageController,
  updateUserImageController,
  deleteUserImageController,
};
