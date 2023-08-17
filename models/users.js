const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Groups = require('./groups');

const Users = sequelize.define(
  "users",
  {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    age: {
      type: DataTypes.INTEGER,
    },

    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

Users.belongsTo(Groups);
Groups.hasMany(Users);

(async () => {
  await sequelize.sync(); // Sync the models with the database
})();

module.exports = Users;
