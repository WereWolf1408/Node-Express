"use strict";
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require('cookie-parser');
// @ts-ignore
var port = parseInt(process.env.PORT, 10) || 3100;
var app = express();
// Set the view engine to use HTML
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "../UI"));
var uploadedImagePath = path.join(__dirname, "../uploads");
var publicDirectoryPath = path.join(__dirname, "../assets");
var picturesPublicDirectoryPath = path.join(__dirname, "../assets/pictures");
var picsPublicDirectoryPath = path.join(__dirname, "../assets/pics");
var clientLibs = path.join(__dirname, "../libs");
app.use(express.static(uploadedImagePath));
app.use(express.static(publicDirectoryPath));
app.use(express.static(picturesPublicDirectoryPath));
app.use(express.static(picsPublicDirectoryPath));
app.use(express.static(clientLibs));
app.use(express.json());
app.use(cookieParser());
//sync data base models
require('./models');
require("./routers/auth.routes")(app);
require("./routers/common.routes")(app);
require("./routers/users.routes")(app);
require("./routers/file.upload.routes")(app);
require("./routers/autosuggestion.routes")(app);
require("./routers/main.routes")(app);
require("./routers/video.routes")(app);
app.listen(port, function () {
    console.log("Running app on port ".concat(port));
    console.log('123');
});
