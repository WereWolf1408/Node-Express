const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Groups = sequelize.define(
  "groups",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Groups;
