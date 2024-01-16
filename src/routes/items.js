import * as express from "express";
import itemControllers from "../controllers/ItemControllers.js";

const router = express.Router();

router.post("/", itemControllers.createItemsController);
router.get("/", itemControllers.getAllItemsController);
router.get("/:id", itemControllers.getOneItemByIdController);
router.put("/:id", itemControllers.updateItemController);
router.delete("/:id", itemControllers.deleteItemByIdController);

export default router;
