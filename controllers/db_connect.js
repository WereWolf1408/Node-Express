const fs = require("fs");
let users = [];
const path = "./Tasks/task2/data.json";

const readUsersFromDB = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject("error");
      }
      resolve(data);
    });
  });
};

readUsersFromDB().then((data) => {
  let parseData = JSON.parse(data);
  users = parseData.users;
});

const getAllUsers = () => {
  return {
    status: 200,
    message: "Return all users",
    data: users,
  };
};

const updateUser = (id, name, age, email) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (Number(user.id) === Number(id)) {
      user.id = id;
      user.name = name;
      user.age = age;
      user.email = email;
      return {
        status: 200,
        message: `Update User Successfully`,
        data: [user],
      };
    }
  }
  return {
    status: 200,
    message: `There is no user with such id = ${id}}`,
    data: users,
  };
};

const getUserById = (id) => {
  const user = users.filter((user) => Number(user.id) === Number(id));
  console.log(user);
  if (user.length === 0) {
    return {
      status: 200,
      message: `there is no user with such id = ${id}`,
      data: user,
    };
  }
  return {
    status: 200,
    message: `Return user by id = ${id}`,
    data: user,
  };
};

const addNewUser = (id, name, age, email) => {
  users.push({
    id,
    name,
    age,
    email,
  });
  return {
    status: 200,
    message: `New user was successfully added`,
    data: users,
  };
};

const deleteUser = (userId) => {
  let deletedUser = null;

  users = users.filter((user) => {
    if (user.id !== Number(userId)) {
      return user;
    }
    deletedUser = user;
    return false;
  });

  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  addNewUser,
  deleteUser,
};
