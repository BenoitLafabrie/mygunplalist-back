const { PrismaClient } = require("@prisma/client");
const {
  insertAchievement,
  insertManyAchievements,
  updateAchievement,
} = require("../models/AchievementManager");

const prisma = new PrismaClient();

const createAchievementController = (req, res) => {
  insertAchievement(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyAchievementsController = (req, res) => {
  insertManyAchievements(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createAchievementsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyAchievementsController(req, res, next);
  } else {
    return createAchievementController(req, res, next);
  }
};

const updateAchievementController = (req, res) => {
  updateAchievement(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getAllAchievementsController = (req, res) => {
  prisma.achievements
    .findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    })
    .then((achievements) => {
      res.status(200).send(achievements);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneAchievementByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  prisma.achievements
    .findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    })
    .then((oneAchievementById) => {
      if (!oneAchievementById) {
        res.status(404).send("Aucun succès correspondant trouvé");
      } else {
        res.status(200).send(oneAchievementById);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteAchievementByIdController = (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).send("ID non valide");
  }

  prisma.achievements
    .delete({
      where: { id: parseInt(id) },
    })
    .then((deleteById) => {
      if (!deleteById) {
        res.status(404).send("Aucun succès correspondant trouvé");
      } else {
        res.status(200).send("Succès supprimé");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createAchievementsController,
  updateAchievementController,
  getAllAchievementsController,
  getOneAchievementByIdController,
  deleteAchievementByIdController,
};
