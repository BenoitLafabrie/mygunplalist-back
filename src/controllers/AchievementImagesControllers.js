const {
  insertAchievementImage,
  insertManyAchievementImages,
  updateAchievementImage,
  getAllAchievementImages,
  getAchievementImageById,
} = require("../models/AchievementImageManager");

const createAchievementImageController = async (req, res) => {
  const { status, data } = await insertAchievementImage({
    ...req.body,
    achievementId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createManyAchievementImagesController = async (req, res) => {
  const { status, data } = await insertManyAchievementImages(req.body);
  res.status(status).send(data);
};

const createAchievementImagesController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyAchievementImagesController(req, res, next);
  } else {
    return createAchievementImageController(req, res, next);
  }
};

const getAllAchievementImagesController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllAchievementImages(parseInt(id));
  res.status(status).send(data);
};

const getOneAchievementImageController = async (req, res) => {
  const { status, data } = await getAchievementImageById(req.params.id);
  res.status(status).send(data);
};

const updateAchievementImageController = async (req, res) => {
  const { status, data } = await updateAchievementImage(
    req.params.id,
    req.body
  );
  res.status(status).send(data);
};

export default {
  createAchievementImagesController,
  getAllAchievementImagesController,
  getOneAchievementImageController,
  updateAchievementImageController,
};
