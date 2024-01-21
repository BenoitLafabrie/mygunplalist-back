import * as express from "express";
import userAchievementsControllers from "../controllers/UserAchievementControllers.mjs";

const router = express.Router();

router.post("/", userAchievementsControllers.createUserAchievementsController);
router.get("/", userAchievementsControllers.getAllUserAchievementsController);
router.get("/:id", userAchievementsControllers.getOneUserAchievementController);
router.put("/:id", userAchievementsControllers.updateUserAchievementController);
router.delete(
  "/:id",
  userAchievementsControllers.deleteUserAchievementController
);

export default router;
