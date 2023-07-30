require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3100;

const app = express();

// Set the view engine to use HTML
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "./UI"));

const publicDirectoryPath = path.join(__dirname, "assets");
const picturesPublicDirectoryPath = path.join(__dirname, "assets/pictures");
const picsPublicDirectoryPath = path.join(__dirname, "assets/pics");
const clientLibs = path.join(__dirname, "libs");

app.use(express.static(publicDirectoryPath));
app.use(express.static(picturesPublicDirectoryPath));
app.use(express.static(picsPublicDirectoryPath));
app.use(express.static(clientLibs));
app.use(express.json());

app.use(cookieParser());

require("./routers/auth.routes")(app);
require("./routers/common.routes")(app);
require("./routers/users.routes")(app);
require("./routers/file.upload.routes")(app);
require("./routers/autosuggestion.routes")(app);
require("./routers/main.routes")(app);
require("./routers/video.routes")(app);

app.listen(port, () => {
  console.log(`Running app on port ${port}`);
});
