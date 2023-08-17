const sequelize = require("../db");
const { DataTypes } = require("sequelize");

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

    groupid: {
      type: DataTypes.INTEGER,
      references: {
        model: "groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { timestamps: false }
);

module.exports = Users;
