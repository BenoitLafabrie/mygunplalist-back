import { PrismaClient } from "@prisma/client";
import pkg from "jsonwebtoken";
import { insertUser, updateUser, getUserById } from "../models/UserManager.js";
import * as fs from "fs";

const privateKey = process.env.JWTRS256_KEY;
const { sign } = pkg;
const prisma = new PrismaClient();

const createUserController = async (req, res) => {
  let { status, data } = await insertUser(req.body);
  if (status === 201) {
    const payload = { user_id: data.user_id };
    const token = sign(payload, privateKey, {
      // expiresIn: "1h",
      algorithm: "RS256",
    });
    data = { token };
  }
  res.status(status).send(data);
};

const updateUserController = async (req, res) => {
  const { status: oldStatus, data: oldData } = await getUserById(req.params.id);
  if (oldStatus != 200) return res.status(oldStatus).send(oldData);
  if (oldData.email === req.body.email) {
    delete req.body.email;
  }
  const { status, data } = await updateUser(req.params.id, req.body);
  res.status(status).send(data);
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true,
        address: true,
        postcode: true,
        city: true,
        country: true,
        gender: true,
        createdAt: true,
        role: true,
      },
    });
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getOneUserByIdController = async (req, res) => {
  const id = req.payload.sub;
  try {
    const oneUserById = await prisma.users.findUnique({
      where: {
        user_id: id,
      },
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true,
        address: true,
        postcode: true,
        city: true,
        country: true,
        gender: true,
        createdAt: true,
        role: true,
      },
    });
    if (!oneUserById) {
      res.status(404).send("Aucun utilisateur correspondant trouvé");
    } else {
      res.status(200).send(oneUserById);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteUserByIdController = async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).send("ID non valide");
  }

  try {
    const deleteById = await prisma.users.delete({
      where: { user_id: parseInt(id) },
    });
    if (!deleteById) {
      res.status(404).send("Aucun utilisateur correspondant trouvé");
    } else {
      res.status(200).send("Utilisateur supprimé");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default {
  createUserController,
  getAllUsersController,
  getOneUserByIdController,
  updateUserController,
  deleteUserByIdController,
};
