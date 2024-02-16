const {
  insertWishlist,
  updateWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
} = require("../models/WishlistManager");

const createWishlistController = (req, res) => {
  insertWishlist({
    ...req.body,
    userId: req.body.userId,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getAllWishlistsController = (req, res) => {
  const { id } = req.payload.sub;
  getAllWishlists(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneWishlistController = (req, res) => {
  getWishlistById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateWishlistController = (req, res) => {
  updateWishlist(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteWishlistController = (req, res) => {
  deleteWishlist(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createWishlistController,
  getAllWishlistsController,
  getOneWishlistController,
  updateWishlistController,
  deleteWishlistController,
};
