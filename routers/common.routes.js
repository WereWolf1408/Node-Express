const urlsHolder = require('../config/urls');
const User = require('../models/users');

const commonRoutes = (app) => {
  app.get("/", (req, res) => {
    res.redirect(urlsHolder.common.main);
  });

  app.get("/example", async (req, res) => {
    try {
      const users = await User.findAll();
      console.log(users);
      res.send('');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
    
  });

  app.get("/about", (req, res) => {
    res.send("11111");
  });
};

module.exports = commonRoutes;
