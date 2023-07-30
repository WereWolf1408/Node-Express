const mainRoutes = (app) => {
  app.get("/main", (req, res) => {
    res.render("main-page.html");
  });
};

module.exports = mainRoutes;
