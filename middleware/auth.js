const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret3", (err, decoded) => {
      if (decoded) {
        req.userId = decoded.userId;
        next();
      } else {
        res.status(400).send({ msg: "please log in first" });
      }
    });
  } else {
    res.status(400).send({ msg: "please log in first" });
  }
};

module.exports = auth;
