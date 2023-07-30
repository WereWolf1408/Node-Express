const fileUploadHandler = (req, res) => {
  const filesName = [];
  req.files.forEach(file => {
    filesName.push(file.originalname);
  })
  res.send({
    message: 'Files were uploaded successfully',
    uploadFiles: filesName
  });
}

module.exports = {
  fileUploadHandler
}