const User = require("../models/users");
const Groups = require("../models/groups");

const openUserPage = (req, res) => {
  res.render("users-page.html");
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "login", "password", "age", "name"],
      where: {
        isdeleted: false,
      },
      include: Groups
    });
    console.log(users);
    res.status(200).send({
      message: "Return all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const users = await User.findAll({
      attributes: ["id", "login", "password", "age"],
      where: {
        id: id,
      },
    });
    console.log(users);
    res.status(200).send({
      message: "Return all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
      data: null,
    });
  }
};

const postUsersUpdate = async (req, res) => {
  const { id, login, password, age, email } = req.body;
  try {
    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      res.status(404).send({
        message: "User not found",
        data: null,
      });
    }

    userToUpdate.login = login;
    userToUpdate.password = password;
    userToUpdate.age = age;

    await userToUpdate.save();

    res.status(200).send({
      message: `user ${userToUpdate.login} updated successfully`,
      data: [
        {
          id: userToUpdate.id,
          login: userToUpdate.name,
          password: userToUpdate.password,
          age: userToUpdate.age,
        },
      ],
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      data: null,
    });
  }
};

const postUsersAdd = async (req, res) => {
  const { login, password, age } = req.body;

  try {
    const createdUser = await User.create({
      login,
      password,
      age,
    });

    res.status(200).send({
      message: "user was created successfully",
      data: [createdUser],
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      data: null,
    });
  }
};

const postUsersDelete = async (req, res) => {
  const { userId } = req.body;

  try {
    const deletedUser = await User.findByPk(userId);
    if (!deletedUser) {
      res.status(404).send({
        message: `There is no user with id ${userId}`,
        data: null,
      });
    }

    deletedUser.isdeleted = true;

    await deletedUser.save();

    res.status(200).send({
      message: `User successfully deleted`,
      data: [deletedUser],
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  postUsersUpdate,
  postUsersAdd,
  postUsersDelete,
  openUserPage,
};
