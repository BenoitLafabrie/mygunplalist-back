const {
  insertAchievementImage,
  insertManyAchievementImages,
  updateAchievementImage,
  getAllAchievementImages,
  getAchievementImageById,
} = require("../models/AchievementImageManager");

const createAchievementImageController = (req, res) => {
  insertAchievementImage({
    ...req.body,
    achievementId: req.payload.sub.id,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyAchievementImagesController = (req, res) => {
  insertManyAchievementImages(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createAchievementImagesController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyAchievementImagesController(req, res, next);
  } else {
    return createAchievementImageController(req, res, next);
  }
};

const getAllAchievementImagesController = (req, res) => {
  const { id } = req.payload.sub;
  getAllAchievementImages(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneAchievementImageController = (req, res) => {
  getAchievementImageById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateAchievementImageController = (req, res) => {
  updateAchievementImage(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createAchievementImagesController,
  getAllAchievementImagesController,
  getOneAchievementImageController,
  updateAchievementImageController,
};
