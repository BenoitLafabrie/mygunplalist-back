import * as express from "express";
import commentsControllers from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/", commentsControllers.createCommentsController);
router.get("/", commentsControllers.getAllCommentsController);
router.get("/:id", commentsControllers.getOneCommentController);
router.put("/:id", commentsControllers.updateCommentController);
router.delete("/:id", commentsControllers.deleteCommentController);

export default router;
