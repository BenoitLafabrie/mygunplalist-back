const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = process.env.JWTRS256_KEY;

const saltRounds = 10;

const hashPassword = (req, res, next) => {
  if (typeof req.body.password !== "string") return next();
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(400);
    });
};

const verifyPassword = (req, res) => {
  bcrypt.compare(req.body.password, req.user.password).then((isVerified) => {
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
  });
};

const generatePasswordToken = (id) => {
  const payload = {
    sub: id,
  };
  return jwt.sign(payload, privateKey, {
    expiresIn: "5m",
    algorithm: "RS256",
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Accès refusé");
  }

  jwt.verify(token, privateKey, (error, decoded) => {
    if (error) {
      console.error(error);
      return res.status(401).send("Token non valide");
    }
    req.payload = decoded;
    next();
  });
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

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_KEY;
  const response = await fetch(`process.env.RECAPTCHA_VERIFY_URL`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();

  if (data.success) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  generatePasswordToken,
  hashPassword,
  verifyPassword,
  verifyToken,
  checkSameParamsIdAsToken,
  verifyRecaptcha,
};
