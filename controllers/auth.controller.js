const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth.config");
const User = require("../models/users");

const users = require("../config/users");

const logout = (req, res) => {
  res.cookie("jwtToken", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).send({ message: "Successfully logged out" });
};

const getLoginPage = (req, res) => {
  res.render("login.html");
};

const jwtLogin = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({
      where: { login: login },
    });


    console.log(user);

    if (!user) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid login!",
      });
    }

    console.log(user.password);
    console.log(bcrypt.compareSync('admin', user.password));

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user.id }, auth_config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.cookie("jwtToken", token, {
      expires: new Date(Date.now() + 120 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).send({
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(401).send({
      accessToken: null,
      message: `${error}}`,
    });
  }
};

module.exports = {
  logout,
  getLoginPage,
  jwtLogin,
};
