const express = require("express");
const achievementImagesControllers = require("../controllers/AchievementImagesControllers");

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

module.exports = router;
