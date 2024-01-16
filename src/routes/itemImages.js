import * as express from "express";
import itemImagesControllers from "../controllers/ItemImageControllers.js";

const router = express.Router();

router.post("/", itemImagesControllers.createItemImagesController);
router.get("/", itemImagesControllers.getAllItemImagesController);
router.get("/:id", itemImagesControllers.getOneItemImageController);
router.put("/:id", itemImagesControllers.updateItemImageController);
router.delete("/:id", itemImagesControllers.deleteItemImageController);

export default router;
