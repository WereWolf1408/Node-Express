const users = require("../config/users");

const findMatchesUsers = (username, limit) => {
  // const filteredArrayIncludes = users.filter(({}) => item.includes(searchString));
  const result = [];

  for (const [, {name}] of Object.entries(users)) {
    if (name.includes(username)) {
      result.push(name);
    }
    if (result.length >= limit) {
      break;
    }
  }
  return result;
};

const autosuggestion = (req, res) => {
  console.log(`autosuggestion route`);
  const { username, limit } = req.body;
  const suggestionData = findMatchesUsers(username, limit);
  res.send({
    suggestionData,
  });
};

module.exports = autosuggestion;
