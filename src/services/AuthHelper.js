const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("jwtRS256.key");

const saltRounds = 10;

const hashPassword = async (req, res, next) => {
  if (typeof req.body.password !== "string") return next();
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

const verifyPassword = async (req, res) => {
  const isVerified = await bcrypt.compare(req.body.password, req.user.password);
  console.log(isVerified);
  if (!isVerified) {
    res.status(401).send("Unauthorized");
  } else {
    try {
      const userWithoutPassword = req.user.user_id;
      const payload = {
        sub: userWithoutPassword,
      };
      const token = jwt.sign(payload, privateKey, {
        // expiresIn: "1h",
        algorithm: "RS256",
      });
      res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Error");
    }
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Accès refusé");
  }

  try {
    const decoded = jwt.verify(token, privateKey);
    req.payload = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Token non valide");
  }
};

function checkSameParamsIdAsToken(req, res, next) {
  if (!req.payload) {
    console.error(
      "Make sure to use checkSameParamsIdAsToken after verifyToken in routes"
    );
    return res.status(401).send("Invalid token");
  }
  if (req.payload.sub === parseInt(req.params.id)) {
    next();
  } else res.sendStatus(403);
}

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkSameParamsIdAsToken,
};
