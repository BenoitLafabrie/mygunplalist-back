import { PrismaClient } from "@prisma/client";
import {
  insertAchievement,
  insertManyAchievements,
  updateAchievement,
} from "../models/AchievementManager.mjs";

const prisma = new PrismaClient();

const createAchievementController = async (req, res) => {
  const { status, data } = await insertAchievement(req.body);
  res.status(status).send(data);
};

const createManyAchievementsController = async (req, res) => {
  const { status, data } = await insertManyAchievements(req.body);
  res.status(status).send(data);
};

const createAchievementsController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyAchievementsController(req, res, next);
  } else {
    return createAchievementController(req, res, next);
  }
};

const updateAchievementController = async (req, res) => {
  const { status, data } = await updateAchievement(req.params.id, req.body);
  res.status(status).send(data);
};

const getAllAchievementsController = async (req, res) => {
  try {
    const achievements = await prisma.achievements.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    res.status(200).send(achievements);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOneAchievementByIdController = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const oneAchievementById = await prisma.achievements.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!oneAchievementById) {
      res.status(404).send("Aucun succès correspondant trouvé");
    } else {
      res.status(200).send(oneAchievementById);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteAchievementByIdController = async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).send("ID non valide");
  }

  try {
    const deleteById = await prisma.achievements.delete({
      where: { id: parseInt(id) },
    });
    if (!deleteById) {
      res.status(404).send("Aucun succès correspondant trouvé");
    } else {
      res.status(200).send("Succès supprimé");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default {
  createAchievementsController,
  updateAchievementController,
  getAllAchievementsController,
  getOneAchievementByIdController,
  deleteAchievementByIdController,
};
