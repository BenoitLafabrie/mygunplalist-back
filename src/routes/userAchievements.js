const express = require("express");
const userAchievementsControllers = require("../controllers/UserAchievementControllers");

const router = express.Router();

router.post("/", userAchievementsControllers.createUserAchievementsController);
router.get("/", userAchievementsControllers.getAllUserAchievementsController);
router.get("/:id", userAchievementsControllers.getOneUserAchievementController);
router.put("/:id", userAchievementsControllers.updateUserAchievementController);
router.delete(
  "/:id",
  userAchievementsControllers.deleteUserAchievementController
);

module.exports = router;
