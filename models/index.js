const Users = require("./users");
const Groups = require("./groups");
const sequelize = require("../db");

// Sync the models with the database
Users.belongsTo(Groups);
Groups.hasMany(Users);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database !!!:", error);
  }
})();
