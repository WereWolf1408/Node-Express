const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth.config");

const users = require('../config/users');

const logout = (req, res) => {
  res.cookie("jwtToken", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).send({ message: "Successfully logged out" });
};

const getLoginPage = (req, res) => {
  res.render("login.html");
};

const jwtLogin = (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid user!",
    });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign({ id: user.id }, auth_config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  res.cookie("jwtToken", token, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  });

  res.status(200).send({
    email: user.email,
    accessToken: token,
  });
};

module.exports = {
  logout,
  getLoginPage,
  jwtLogin,
};
