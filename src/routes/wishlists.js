const express = require("express");
const wishlistsControllers = require("../controllers/WishlistControllers");
const AuthHelper = require("../services/AuthHelper");

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

module.exports = router;
