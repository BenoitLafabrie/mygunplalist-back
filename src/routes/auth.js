import * as express from "express";
import authControllers from "../controllers/AuthControllers.js";
import authHelper from "../services/AuthHelper.js";

const router = express.Router();

router.post(
  "/login",
  authControllers.getUserByEmailAndPassToNext,
  authHelper.verifyPassword
);

export default router;
