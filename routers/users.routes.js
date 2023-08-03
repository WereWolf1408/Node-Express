const authMiddleWare = require("../middleware/authJwt");
const usersController = require('../controllers/users.controller');

const usersRoutes = (app) => {
  app.use((req, res, next) => {
    console.log(`---- request params --------`);
    console.log(req.body);
    next();
  });

  app.get("/users", [authMiddleWare.verifyToken], (req, res) => {
    res.render("users-page.html");
  });

  app.get("/users/all", usersController.getAllUsers);

  app.post("/users/id", usersController.getUserById);
  
  app.post("/users/update", [authMiddleWare.verifyToken], usersController.postUsersUpdate);
  
  app.post("/users/add", [authMiddleWare.verifyToken], usersController.postUsersAdd);

  app.post('/delete', usersController.postUsersDelete);

}

module.exports = usersRoutes;
