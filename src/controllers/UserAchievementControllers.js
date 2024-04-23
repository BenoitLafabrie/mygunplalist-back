const {
  insertUserAchievement,
  insertManyUserAchievements,
  updateUserAchievement,
  getAllUserAchievements,
  getUserAchievementById,
  deleteUserAchievement,
} = require("../models/UserAchievementManager");

const createUserAchievementController = (req, res) => {
  insertUserAchievement({
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

const createManyUserAchievementsController = (req, res) => {
  insertManyUserAchievements({
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

const createUserAchievementsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyUserAchievementsController(req, res, next);
  } else {
    return createUserAchievementController(req, res, next);
  }
};

const getAllUserAchievementsController = (req, res) => {
  const { id } = req.payload.sub;
  getAllUserAchievements(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneUserAchievementController = (req, res) => {
  getUserAchievementById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateUserAchievementController = (req, res) => {
  updateUserAchievement(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteUserAchievementController = (req, res) => {
  deleteUserAchievement(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createUserAchievementsController,
  getAllUserAchievementsController,
  getOneUserAchievementController,
  updateUserAchievementController,
  deleteUserAchievementController,
};
