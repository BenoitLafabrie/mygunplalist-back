import * as express from "express";
import authControllers from "../controllers/AuthControllers.mjs";
import authHelper from "../services/AuthHelper.mjs";

const router = express.Router();

router.post(
  "/login",
  authControllers.getUserByEmailAndPassToNext,
  authHelper.verifyPassword
);

export default router;
