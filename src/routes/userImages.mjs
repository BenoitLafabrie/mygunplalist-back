import * as express from "express";
import userImagesControllers from "../controllers/UserImageControllers.mjs";

const router = express.Router();

router.post("/", userImagesControllers.createUserImagesController);
router.get("/", userImagesControllers.getAllUserImagesController);
router.get("/:id", userImagesControllers.getOneUserImageController);
router.put("/:id", userImagesControllers.updateUserImageController);
router.delete("/:id", userImagesControllers.deleteUserImageController);

export default router;
