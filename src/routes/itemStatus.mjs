import * as express from "express";
import itemStatusControllers from "../controllers/ItemStatusControllers.mjs";

const router = express.Router();

router.post("/", itemStatusControllers.createItemStatusController);
router.get("/:id", itemStatusControllers.getOneItemStatusController);
router.put("/:id", itemStatusControllers.updateItemStatusController);

export default router;
