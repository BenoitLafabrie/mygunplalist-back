import * as express from "express";
import achievementImagesControllers from "../controllers/AchievementImagesControllers.js";

const router = express.Router();

router.post(
  "/",
  achievementImagesControllers.createAchievementImagesController
);
router.get("/", achievementImagesControllers.getAllAchievementImagesController);
router.get(
  "/:id",
  achievementImagesControllers.getOneAchievementImageController
);
router.put(
  "/:id",
  achievementImagesControllers.updateAchievementImageController
);

export default router;
