const express = require("express");
const commentsControllers = require("../controllers/CommentControllers");

const router = express.Router();

router.post("/", commentsControllers.createCommentsController);
router.get("/", commentsControllers.getAllCommentsController);
router.get("/:id", commentsControllers.getOneCommentController);
router.put("/:id", commentsControllers.updateCommentController);
router.delete("/:id", commentsControllers.deleteCommentController);

module.exports = router;
