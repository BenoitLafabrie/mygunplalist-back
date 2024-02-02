const express = require("express");
const userImagesControllers = require("../controllers/UserImageControllers");

const router = express.Router();

router.post("/", userImagesControllers.createUserImagesController);
router.get("/", userImagesControllers.getAllUserImagesController);
router.get("/:id", userImagesControllers.getOneUserImageController);
router.put("/:id", userImagesControllers.updateUserImageController);
router.delete("/:id", userImagesControllers.deleteUserImageController);

export default router;
