const { findUserByEmail } = require("../models/AuthManager");

const getUserByEmailAndPassToNext = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send("Unprocessable Entity");

  findUserByEmail(email)
    .then(({ status, data }) => {
      if (status !== 200) return res.status(status).send(data);
      req.user = data;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = { getUserByEmailAndPassToNext };
