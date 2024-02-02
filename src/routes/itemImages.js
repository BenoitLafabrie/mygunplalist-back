const express = require("express");
const itemImagesControllers = require("../controllers/ItemImageControllers");

const router = express.Router();

router.post("/", itemImagesControllers.createItemImagesController);
router.get("/", itemImagesControllers.getAllItemImagesController);
router.get("/:id", itemImagesControllers.getOneItemImageController);
router.put("/:id", itemImagesControllers.updateItemImageController);
router.delete("/:id", itemImagesControllers.deleteItemImageController);

module.exports = router;
