const fs = require("fs");
const path = require("path");

const getAllVideos = function (req, res) {
  console.log("gggg");

  const videosPath = path.join(__dirname, "..", '..', "assets", "videos");
  console.log(videosPath);
  fs.readdir(videosPath, function (err, files) {
    if (err) {
      console.log(`unable to read directory ${err}`);
      res.send({
        message: err,
        videos: [],
      });
    }

    console.log(files);
    console.log(typeof files);
    res.send({
      message: null,
      videos: files,
    });
  });
};

module.exports = {
  getAllVideos,
};
