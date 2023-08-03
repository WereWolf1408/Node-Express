const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth.config");

const users = require('../config/users');

const logout = (req, res) => {
  res.cookie("jwtToken", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).send({ message: "Successfully logged out" });
};

const _authenticate = (name, pass, fn) => {
  if (!module.parent) console.log("authenticating %s:%s", name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null);
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(null, null);
  });
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
