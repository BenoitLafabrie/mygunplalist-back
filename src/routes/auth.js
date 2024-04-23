const express = require("express");
const authControllers = require("../controllers/AuthControllers");
const authHelper = require("../services/AuthHelper");
const mailControllers = require("../controllers/MailControllers");
const authManager = require("../models/AuthManager");

const router = express.Router();

router.post(
  "/login",
  authControllers.getUserByEmailAndPassToNext,
  authHelper.verifyPassword,
  authHelper.verifyRecaptcha
);

/* router.post(
  "/forgottenpassword",
  authManager.findUserByEmail,
  authHelper.generatePasswordToken,
  mailControllers.sendForgottenPassword
);
router.post(
  "/resetpassword",
  authHelper.verifyToken,
  authHelper.hashPassword,
  passwordControllers.resetPassword
); */

module.exports = router;
