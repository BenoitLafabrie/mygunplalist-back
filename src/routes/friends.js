const express = require("express");
const friendsControllers = require("../controllers/FriendControllers");

const router = express.Router();

router.post("/", friendsControllers.createFriendsController);
router.get("/", friendsControllers.getAllFriendsController);
router.get("/:id", friendsControllers.getOneFriendController);
router.put("/:id", friendsControllers.updateFriendController);
router.delete("/:id", friendsControllers.deleteFriendController);

export default router;
