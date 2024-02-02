const express = require("express");
const itemStatusControllers = require("../controllers/ItemStatusControllers");

const router = express.Router();

router.post("/", itemStatusControllers.createItemStatusController);
router.get("/:id", itemStatusControllers.getOneItemStatusController);
router.put("/:id", itemStatusControllers.updateItemStatusController);

export default router;
