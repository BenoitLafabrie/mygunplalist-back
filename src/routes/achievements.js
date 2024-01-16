import * as express from "express";
import achievementControllers from "../controllers/AchievementControllers.js";

const router = express.Router();

router.post("/", achievementControllers.createAchievementsController);
router.get("/", achievementControllers.getAllAchievementsController);
router.get("/:id", achievementControllers.getOneAchievementByIdController);
router.put("/:id", achievementControllers.updateAchievementController);
router.delete("/:id", achievementControllers.deleteAchievementByIdController);

export default router;
