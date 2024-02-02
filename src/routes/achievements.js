const express = require("express");
const achievementControllers = require("../controllers/AchievementControllers");

const router = express.Router();

router.post("/", achievementControllers.createAchievementsController);
router.get("/", achievementControllers.getAllAchievementsController);
router.get("/:id", achievementControllers.getOneAchievementByIdController);
router.put("/:id", achievementControllers.updateAchievementController);
router.delete("/:id", achievementControllers.deleteAchievementByIdController);

module.exports = router;
