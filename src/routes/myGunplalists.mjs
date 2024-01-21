import * as express from "express";
import myGunplalistsControllers from "../controllers/MyGunplalistControllers.mjs";
// import AuthHelper from "../services/AuthHelper.mjs";

const router = express.Router();

router.post(
  "/",
  /* AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken, */
  myGunplalistsControllers.createMyGunplalistsController
);
router.get(
  "/",
  /* AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken, */
  myGunplalistsControllers.getAllMyGunplalistsController
);
router.get(
  "/:id",
  /* AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken, */
  myGunplalistsControllers.getOneMyGunplalistController
);
router.put(
  "/:id",
  /* AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken, */
  myGunplalistsControllers.updateMyGunplalistController
);
router.delete(
  "/:id",
  /* AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken, */
  myGunplalistsControllers.deleteMyGunplalistController
);

export default router;
