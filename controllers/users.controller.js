const userService = require("../controllers/db_connect");

const getAllUsers = (req, res) => {
  const response = userService.getAllUsers();
  console.log(response);
  res.send(response);
};

const getUserById = (req, res) => {
  const { id } = req.body;
  const user = userService.getUserById(id);
  res.send(user);
};

const postUsersUpdate = (req, res) => {
  const { id, name, age, email } = req.body;
  const modifiedUser = userService.updateUser(id, name, age, email);
  res.send(modifiedUser);
};

const postUsersAdd = (req, res) => {
  const { id, name, age, email } = req.body;
  const result = userService.addNewUser(id, name, age, email);
  console.log(result);
  res.send(result);
};

const postUsersDelete = (req, res) => {
  const { userId } = req.body;
  const deletedUser = userService.deleteUser(userId);
  
  if (deletedUser === null) {
    res.status(400).send({
      message: `There is no User with such id = ${userId}`,
    });
  }

  res.send({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getUserById,
  postUsersUpdate,
  postUsersAdd,
  postUsersDelete,
};
