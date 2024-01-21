import * as express from "express";
import wishlistsControllers from "../controllers/WishlistControllers.mjs";
import AuthHelper from "../services/AuthHelper.mjs";

const router = express.Router();

router.post(
  "/",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  wishlistsControllers.createWishlistController
);
router.get(
  "/",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  wishlistsControllers.getAllWishlistsController
);
router.get(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  wishlistsControllers.getOneWishlistController
);
router.put(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  wishlistsControllers.updateWishlistController
);
router.delete(
  "/:id",
  AuthHelper.verifyToken,
  AuthHelper.checkSameParamsIdAsToken,
  wishlistsControllers.deleteWishlistController
);

export default router;
