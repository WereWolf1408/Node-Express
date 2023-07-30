const controller = require("../controllers/video.controller");

const videoRoutes = (app) => {
  app.get("/media", (req, res) => {
    res.render("video-page.html");
  });

  app.get("/videos", controller.getAllVideos);
};

module.exports = videoRoutes
