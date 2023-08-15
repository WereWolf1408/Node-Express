const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const readDirFolderService = require("../services/readDirFile");

const uploadFolder = path.join(__dirname, "..", "..", "uploads/");

const openFileUploadPage = (req, res) => {
  res.render("file-upload-page.html");
};

const uploadFiles = (req, res) => {
  console.log(`file upload !!!!`);
  const form = new formidable.IncomingForm({ multiples: true });
  const uploadFiles = [];

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(404).send(err.message);
      return;
    }

    files.filetoupload?.forEach((file) => {
      const oldpath = file.filepath;
      const newpath = uploadFolder + file.originalFilename;

      try {
        fs.copyFileSync(oldpath, newpath, fs.constants.COPYFILE_EXCL);
        uploadFiles.push(file.originalFilename);
        console.log(`file ${file.originalFilename} successfully uploaded`);
      } catch (error) {
        console.warn(`error uploading file ${file.originalFilename}`);
        console.warn(error.message);
      }
    });

    res.status(200).send({
      message: "File uploaded and moved!",
      uploadFiles,
    });
  });
};

const getAllUploadedImages = (req, res) => {
  try {
    const files = readDirFolderService.getFiles(uploadFolder);
    res.send({
      message: `get files successfully`,
      files,
    });
  } catch (error) {
    console.warn(error.message);
    res.status(404).send({
      message: error.message,
      files: null,
    });
  }
};

const getFolderStructure = (req, res) => {
  try {
    const files = readDirFolderService.getFolderStructure(uploadFolder);
    res.send({
      message: `get files structure successfully`,
      files,
    });
  } catch (error) {
    console.warn(error.message);
    res.status(404).send({ message: error.message });
  }
};

module.exports = {
  uploadFiles,
  openFileUploadPage,
  getAllUploadedImages,
  getFolderStructure,
};
