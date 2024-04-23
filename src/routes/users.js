const express = require("express");
const userControllers = require("../controllers/UserControllers");
const authHelper = require("../services/AuthHelper");

const router = express.Router();

router.get(
  "/",
  authHelper.verifyToken,
  authHelper.checkAdmin,
  userControllers.getAllUsersController
);

router.get(
  "/debug",
  authHelper.verifyToken,
  userControllers.getUsersDebugController
);

router.get(
  "/me",
  authHelper.verifyToken,
  userControllers.getOneUserByIdController
);

router.get(
  "/:id",
  authHelper.verifyToken,
  authHelper.checkSameParamsIdAsToken,
  userControllers.getOneUserByIdController
);

router.put(
  "/:id",
  authHelper.verifyToken,
  authHelper.checkSameParamsIdAsToken,
  authHelper.hashPassword,
  userControllers.updateUserController
);

router.post("/", authHelper.hashPassword, userControllers.createUserController);

router.delete(
  "/:id",
  authHelper.verifyToken,
  authHelper.checkSameParamsIdAsToken,
  userControllers.deleteUserByIdController
);
module.exports = router;
