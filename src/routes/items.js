const express = require("express");
const itemControllers = require("../controllers/ItemControllers");

const router = express.Router();

router.post("/", itemControllers.createItemsController);
router.get("/", itemControllers.getAllItemsController);
router.get("/:id", itemControllers.getOneItemByIdController);
router.put("/:id", itemControllers.updateItemController);
router.delete("/:id", itemControllers.deleteItemByIdController);

module.exports = router;
