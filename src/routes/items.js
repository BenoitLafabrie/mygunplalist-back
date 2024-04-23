const express = require("express");
const itemControllers = require("../controllers/ItemControllers");
const authHelper = require("../services/AuthHelper");

const router = express.Router();

router.post("/", itemControllers.createItemsController);
router.get("/", authHelper.verifyToken, itemControllers.getAllItemsController);
router.get("/latest", itemControllers.getLatestItemsController);
router.patch("/", itemControllers.updateItemsController);
router.get("/:id", itemControllers.getOneItemByIdController);
router.delete("/", itemControllers.deleteItemsByIdController);
router.delete(
  "/gunplalist/:mygunplalist_id/items",
  itemControllers.deleteItemsFromGunplaListController
);
router.delete(
  "/wishlist/:wishlist_id/items",
  itemControllers.deleteItemsFromWishlistController
);

module.exports = router;
