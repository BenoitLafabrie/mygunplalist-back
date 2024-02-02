const {
  insertWishlist,
  updateWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
} = require("../models/WishlistManager");

const createWishlistController = async (req, res) => {
  const { status, data } = await insertWishlist({
    ...req.body,
    userId: req.body.userId,
  });
  res.status(status).send(data);
};

const getAllWishlistsController = async (req, res) => {
  const { id } = req.payload.sub;
  const { status, data } = await getAllWishlists(parseInt(id));
  res.status(status).send(data);
};

const getOneWishlistController = async (req, res) => {
  const { status, data } = await getWishlistById(req.params.id);
  res.status(status).send(data);
};

const updateWishlistController = async (req, res) => {
  const { status, data } = await updateWishlist(req.params.id, req.body);
  res.status(status).send(data);
};

const deleteWishlistController = async (req, res) => {
  const { status, data } = await deleteWishlist(req.params.id);
  res.status(status).send(data);
};

module.exports = {
  createWishlistController,
  getAllWishlistsController,
  getOneWishlistController,
  updateWishlistController,
  deleteWishlistController,
};
