const {
  insertMygunplalist,
  insertManyGunplalists,
  getAllMygunplalists,
  getMygunplalistById,
  updateMygunplalist,
  deleteMygunplalist,
} = require("../models/MyGunplalistManager");
const jwt = require("jsonwebtoken");

const createMyGunplalistController = (req, res) => {
  const token = req.body.token;
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);
  const userId = decodedToken.user_id;

  insertMygunplalist({
    ...req.body,
    user_id: userId,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createManyMyGunplalistsController = (req, res) => {
  insertManyGunplalists({
    ...req.body,
    item_id: req.payload.sub.id,
    user_id: req.body.user_id,
  })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const createMyGunplalistsController = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return createManyMyGunplalistsController(req, res, next);
  } else {
    return createMyGunplalistController(req, res, next);
  }
};

const getAllMyGunplalistsController = (req, res) => {
  const { id } = req.payload.sub;
  getAllMygunplalists(parseInt(id))
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneMyGunplalistController = (req, res) => {
  getMygunplalistById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateMyGunplalistController = (req, res) => {
  updateMygunplalist(req.params.id, req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteMyGunplalistController = (req, res) => {
  deleteMygunplalist(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createMyGunplalistsController,
  getAllMyGunplalistsController,
  getOneMyGunplalistController,
  updateMyGunplalistController,
  deleteMyGunplalistController,
};
