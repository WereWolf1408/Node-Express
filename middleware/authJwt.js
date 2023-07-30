const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwtToken;

  console.log(`process of verifying token`);
  console.log(token);

  if (!token) {
    console.warn("No token provided!");
    res.redirect('/login');
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.warn("Unauthorized!");
      res.redirect('/login');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
