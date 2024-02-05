const {
  insertComment,
  insertManyComments,
  updateComment,
  getAllComments,
  getCommentById,
  deleteComment,
} = require("../models/CommentManager");

const createCommentController = (req, res) => {
  insertComment({
    ...req.body,
    userId: req.payload.sub.id,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyCommentsController = (req, res) => {
  insertManyComments(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createCommentsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyCommentsController(req, res, next);
  } else {
    return createCommentController(req, res, next);
  }
};

const getAllCommentsController = (req, res) => {
  const { id } = req.payload.sub;
  getAllComments(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneCommentController = (req, res) => {
  getCommentById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateCommentController = (req, res) => {
  updateComment(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteCommentController = (req, res) => {
  deleteComment(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createCommentsController,
  getAllCommentsController,
  getOneCommentController,
  updateCommentController,
  deleteCommentController,
};
