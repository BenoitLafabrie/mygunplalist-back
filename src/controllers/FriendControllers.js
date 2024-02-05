const {
  insertFriend,
  insertManyFriends,
  updateFriend,
  getAllFriends,
  getFriendById,
  deleteFriend,
} = require("../models/FriendManager");

const createFriendController = (req, res) => {
  insertFriend({
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

const createManyFriendsController = (req, res) => {
  insertManyFriends({
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

const createFriendsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyFriendsController(req, res, next);
  } else {
    return createFriendController(req, res, next);
  }
};

const getAllFriendsController = (req, res) => {
  const { id } = req.payload.sub;
  getAllFriends(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneFriendController = (req, res) => {
  getFriendById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateFriendController = (req, res) => {
  updateFriend(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteFriendController = (req, res) => {
  deleteFriend(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createFriendsController,
  getAllFriendsController,
  getOneFriendController,
  updateFriendController,
  deleteFriendController,
};
