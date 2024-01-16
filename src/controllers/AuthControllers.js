import { findUserByEmail } from "../models/AuthManager.js";

const getUserByEmailAndPassToNext = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send("Unprocessable Entity");
  const { status, data } = await findUserByEmail(email);
  if (status !== 200) return res.status(status).send(data);
  req.user = data;
  next();
};

export default { getUserByEmailAndPassToNext };
