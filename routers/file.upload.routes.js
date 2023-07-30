const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/file.upload.controller");

const fileUploadRoutes = (app) => {
  app.use((req, res, next) => {
    console.log(`=== File upload Routes`);
    console.log(req.body);
    next();
  });

  app.get("/upload", (req, res) => {
    res.render("file_upload.html");
  });

  // app.get("/getfiles", (req, res) => {
  //   const filePath = "assets/pictures/Rias in the beach.png"; // Replace with the path to the file you want to send

  //   const fileName = path.basename(filePath);
  //   const fileStream = fs.createReadStream(filePath);

  //   fileStream.on("error", (err) => {
  //     console.error("Error reading file:", err);
  //     res.statusCode = 500;
  //     res.end("Internal Server Error");
  //   });

  //   res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  //   res.setHeader("Content-Type", "application/octet-stream");

  //   fileStream.pipe(res);
  // });

  app.get("/getfiles", (req, res) => {
    const imagesFolderPath = "assets/pics/"; // Replace with the path to the folder containing the images

    fs.readdir(imagesFolderPath, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const imageArray = files.map((file) => {
        const imagePath = path.join(imagesFolderPath, file);
        const imageStat = fs.statSync(imagePath);

        return {
          path: imagePath,
          filename: file,
          size: imageStat.size,
          // Add any additional metadata you want to include
        };
      });

      res.json(imageArray);
    });
  });

  app.post(
    "/fileupload",
    upload.array("manga_image"),
    controller.fileUploadHandler
  );
};

module.exports = fileUploadRoutes;
