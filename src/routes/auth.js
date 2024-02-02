const express = require("express");
const authControllers = require("../controllers/AuthControllers");
const authHelper = require("../services/AuthHelper");

const router = express.Router();

router.post(
  "/login",
  authControllers.getUserByEmailAndPassToNext,
  authHelper.verifyPassword
);

export default router;
