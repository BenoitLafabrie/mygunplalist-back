const express = require("express");
const itemPropsControllers = require("../controllers/ItemPropsControllers");

const router = express.Router();

router.post("/", itemPropsControllers.createItemsPropsController);
router.get("/", itemPropsControllers.getAllItemPropsController);
router.get("/:id", itemPropsControllers.getOneItemPropsController);
router.put("/:id", itemPropsControllers.updateItemPropsController);
router.delete("/:id", itemPropsControllers.deleteItemPropsController);

module.exports = router;
