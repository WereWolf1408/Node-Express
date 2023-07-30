const bcrypt = require("bcryptjs");

const users = {
  enot: { name: "enot", password: bcrypt.hashSync("admin", 8), id: "100" },
  alex: { name: "alex", password: bcrypt.hashSync("admin", 8), id: "100" },
  cat: { name: "cat", password: bcrypt.hashSync("admin", 8), id: "100" },
  michael: { name: "michael", password: bcrypt.hashSync("admin", 8), id: "100" },
  din: { name: "din", password: bcrypt.hashSync("admin", 8), id: "100" },
  sam: { name: "sam", password: bcrypt.hashSync("admin", 8), id: "100" },
  ann: { name: "ann", password: bcrypt.hashSync("admin", 8), id: "100" },
  jibril: { name: "jibril", password: bcrypt.hashSync("admin", 8), id: "100" },
  samuel: { name: "samuel", password: bcrypt.hashSync("admin", 8), id: "100" },
  baal: { name: "baal", password: bcrypt.hashSync("admin", 8), id: "100" },
  demiurge: { name: "demiurge", password: bcrypt.hashSync("admin", 8), id: "100" },
  albedo: { name: "albedo", password: bcrypt.hashSync("admin", 8), id: "100" },
};

module.exports = users;