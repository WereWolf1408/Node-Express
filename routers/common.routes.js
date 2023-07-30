const commonRoutes = (app) => {
  app.get("/", (req, res) => {
    res.redirect("/media");
  });

  app.get("/example", (req, res) => {
    res.redirect("/media");
  });

  app.get("/about", (req, res) => {
    console.log(`try to return index`);
    res.send("11111");
  });
};

module.exports = commonRoutes;
