import * as express from "express";
import userControllers from "../controllers/UserControllers.mjs";
import authHelper from "../services/AuthHelper.mjs";

const router = express.Router();

router.get("/", userControllers.getAllUsersController);

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
export default router;
