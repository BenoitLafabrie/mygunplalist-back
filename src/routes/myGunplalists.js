const express = require("express");
const myGunplalistsControllers = require("../controllers/MyGunplalistControllers");
const AuthHelper = require("../services/AuthHelper");

const router = express.Router();

router.post("/", myGunplalistsControllers.createMyGunplalistsController);
router.get(
  "/",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  myGunplalistsControllers.getAllMyGunplalistsController
);
router.get(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  myGunplalistsControllers.getOneMyGunplalistController
);
router.put(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  myGunplalistsControllers.updateMyGunplalistController
);
router.delete(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  myGunplalistsControllers.deleteMyGunplalistController
);

module.exports = router;
