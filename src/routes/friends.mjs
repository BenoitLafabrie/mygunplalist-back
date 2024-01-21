import * as express from "express";
import friendsControllers from "../controllers/FriendControllers.mjs";

const router = express.Router();

router.post("/", friendsControllers.createFriendsController);
router.get("/", friendsControllers.getAllFriendsController);
router.get("/:id", friendsControllers.getOneFriendController);
router.put("/:id", friendsControllers.updateFriendController);
router.delete("/:id", friendsControllers.deleteFriendController);

export default router;
