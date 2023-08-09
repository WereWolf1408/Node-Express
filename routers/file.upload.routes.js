const fileUploadController = require('../controllers/file.upload.controller');

const fileUploadRoutes = (app) => {
  app.get('/file_upload', fileUploadController.openFileUploadPage)
  app.post('/file_upload', fileUploadController.uploadFiles);
  app.get('/get_all_uploaded_file', fileUploadController.getAllUploadedImages);
  app.get('/get_folder_structure', fileUploadController.getFolderStructure);
};

module.exports = fileUploadRoutes;