const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const {
  insertUser,
  updateUser,
  getUserById,
} = require("../models/UserManager");
const { insertMygunplalist } = require("../models/MyGunplalistManager");
const { insertWishlist } = require("../models/WishlistManager");
const fs = require("fs");
const { log } = require("console");

const privateKey = process.env.JWTRS256_KEY;
const prisma = new PrismaClient();

const createUserController = (req, res) => {
  insertUser(req.body)
    .then(async ({ status, data }) => {
      if (status === 201) {
        const payload = { sub: data.user_id };
        const token = jwt.sign(payload, privateKey, {
          // expiresIn: "1h",
          algorithm: "RS256",
        });
        data = { token };
        await insertMygunplalist({ user_id: parseInt(data.user_id) });
        await insertWishlist({ user_id: parseInt(data.user_id) });
        res.status(status).send(data);
      } else {
        console.error(error);
        res.sendStatus(500);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateUserController = (req, res) => {
  getUserById(req.params.id)
    .then(({ status: oldStatus, data: oldData }) => {
      if (oldStatus != 200) return res.status(oldStatus).send(oldData);
      if (oldData.email === req.body.email) {
        delete req.body.email;
      }
      return updateUser(req.params.id, req.body);
    })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      res.status(500).send({ error: "An error occurred" });
    });
};

const getAllUsersController = (req, res) => {
  prisma.users
    .findMany({
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
    })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getUsersDebugController = async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM Users`;
    res.status(200).send("Ok");
  } catch (error) {
    fs.appendFile(
      "error.log",
      `${new Date().toISOString()} - ${error}\n`,
      function (err) {
        if (err) console.error("Error writing to log file", err);
      }
    );
    res.status(500).send(error);
  }
};

const getOneUserByIdController = (req, res) => {
  const id = req.payload.sub;
  prisma.users
    .findUnique({
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
    })
    .then((oneUserById) => {
      if (!oneUserById) {
        res.status(404).send("Aucun utilisateur correspondant trouvé");
      } else {
        res.status(200).send(oneUserById);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteUserByIdController = (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).send("ID non valide");
  }

  prisma.users
    .delete({
      where: { user_id: parseInt(id) },
    })
    .then((deleteById) => {
      if (!deleteById) {
        res.status(404).send("Aucun utilisateur correspondant trouvé");
      } else {
        res.status(200).send("Utilisateur supprimé");
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersDebugController,
  getOneUserByIdController,
  updateUserController,
  deleteUserByIdController,
};
