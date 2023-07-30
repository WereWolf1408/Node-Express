const userService = require('../controllers/db_connect');
const authMiddleWare = require("../middleware/authJwt");

const usersRoutes = (app) => {
  app.use((req, res, next) => {
    console.log(`---- request params --------`);
    console.log(req.body);
    next();
  });

  app.get("/users", [authMiddleWare.verifyToken], (req, res) => {
    res.render("users-page.html");
  });

  app.get("/users/all", (req, res) => {
    const response = userService.getAllUsers();
    console.log(response);
    res.send(response);
  });

  app.post("/users/id", (req, res) => {
    const { id } = req.body;
    const user = userService.getUserById(id);
    res.send(user);
  });
  
  app.post("/users/update", (req, res) => {
    const {id, name, age, email} = req.body;
    const modifiedUser = userService.updateUser(id, name, age, email);
    res.send(modifiedUser);
  });
  
  app.post("/users/add", (req, res) => {
    const {id, name, age, email} = req.body;
    const result = userService.addNewUser(id, name, age, email);
    console.log(result);
    res.send(result);
  });

  app.post('/delete', userService.deleteUser);

}

module.exports = usersRoutes;
