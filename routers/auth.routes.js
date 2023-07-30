const middleware = require('../middleware/index');
const controller = require('../controllers/auth.controller');


const authRoutes = (app) => {
  app.get("/logout", controller.logout);

  app.post("/login", [middleware.example], controller.jwtLogin);

  app.get("/login", controller.getLoginPage);
};

module.exports = authRoutes;