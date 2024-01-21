import {
  insertFriend,
  insertManyFriends,
  updateFriend,
  getAllFriends,
  getFriendById,
  deleteFriend,
} from "../models/FriendManager.mjs";

const createFriendController = async (req, res) => {
  const { status, data } = await insertFriend({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createManyFriendsController = async (req, res) => {
  const { status, data } = await insertManyFriends({
    ...req.body,
    userId: req.payload.sub.id,
  });
  res.status(status).send(data);
};

const createFriendsController = async (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyFriendsController(req, res, next);
  } else {
    return createFriendController(req, res, next);
  }
};

const getAllFriendsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllFriends(parseInt(id));
  res.status(status).send(data);
};

const getOneFriendController = async (req, res) => {
  const { status, data } = await getFriendById(req.params.id);
  res.status(status).send(data);
};

const updateFriendController = async (req, res) => {
  const { status, data } = await updateFriend(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteFriendController = async (req, res) => {
  const { status, data } = await deleteFriend(req.params.id);
  res.status(status).send(data);
};

export default {
  createFriendsController,
  getAllFriendsController,
  getOneFriendController,
  updateFriendController,
  deleteFriendController,
};
