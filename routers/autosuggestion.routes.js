const autosuggestion = require("../controllers/autosuggestion.controller");

const autoSuggestion = (app) => {
  app.post("/autosuggestion", autosuggestion);
};

module.exports = autoSuggestion;
