const urlsHolder = require('../config/urls');

const commonRoutes = (app) => {
  app.get("/", (req, res) => {
    res.redirect(urlsHolder.common.main);
  });

  app.get("/example", (req, res) => {
    res.redirect("/media");
  });

  app.get("/about", (req, res) => {
    res.send("11111");
  });
};

module.exports = commonRoutes;
