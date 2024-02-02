const {
  insertUserImage,
  insertManyUserImages,
  updateUserImage,
  getAllUserImages,
  getUserImageById,
  deleteUserImage,
} = require("../models/UserImageManager");

const createUserImageController = async (req, res) => {
  const { status, data } = await insertUserImage({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createManyUserImagesController = async (req, res) => {
  const { status, data } = await insertManyUserImages({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createUserImagesController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyUserImagesController(req, res, next);
  } else {
    return createUserImageController(req, res, next);
  }
};

const getAllUserImagesController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllUserImages(parseInt(id));
  res.status(status).send(data);
};

const getOneUserImageController = async (req, res) => {
  const { status, data } = await getUserImageById(req.params.id);
  res.status(status).send(data);
};

const updateUserImageController = async (req, res) => {
  const { status, data } = await updateUserImage(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteUserImageController = async (req, res) => {
  const { status, data } = await deleteUserImage(req.params.id);
  res.status(status).send(data);
};

export default {
  createUserImagesController,
  getAllUserImagesController,
  getOneUserImageController,
  updateUserImageController,
  deleteUserImageController,
};
