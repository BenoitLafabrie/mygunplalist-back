const {
  insertComment,
  insertManyComments,
  updateComment,
  getAllComments,
  getCommentById,
  deleteComment,
} = require("../models/CommentManager");

const createCommentController = async (req, res) => {
  const { status, data } = await insertComment({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createManyCommentsController = async (req, res) => {
  const { status, data } = await insertManyComments(req.body);
  res.status(status).send(data);
};

const createCommentsController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyCommentsController(req, res, next);
  } else {
    return createCommentController(req, res, next);
  }
};

const getAllCommentsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllComments(parseInt(id));
  res.status(status).send(data);
};

const getOneCommentController = async (req, res) => {
  const { status, data } = await getCommentById(req.params.id);
  res.status(status).send(data);
};

const updateCommentController = async (req, res) => {
  const { status, data } = await updateComment(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteCommentController = async (req, res) => {
  const { status, data } = await deleteComment(req.params.id);
  res.status(status).send(data);
};

module.exports = {
  createCommentsController,
  getAllCommentsController,
  getOneCommentController,
  updateCommentController,
  deleteCommentController,
};
