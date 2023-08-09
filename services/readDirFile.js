const fs = require("fs");
const path = require("path");

const getFolderStructure = (dir, files = []) => {
  try {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      console.log(dir);
      if (fs.statSync(name).isDirectory()) {
        console.log(`is directory`);
        files.push({
          type: "folder",
        });
      } else {
        files.push({
          type: "file",
          file,
        });
      }
    }
    return files;
  } catch (error) {
    console.warn(
      `error during readdirSync operation getFolderStructure function`
    );
    throw new Error(error.message);
  }
};

const getFiles = (dir, files = [], subFolderPath = "") => {
  try {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        console.log(`is directory`);
        getFiles(name, files, `${subFolderPath}/${file}/`);
      } else {
        console.log(`${subFolderPath}${file}`);
        files.push(`${subFolderPath}${file}`);

      }
    }
    return files;
  } catch (error) {
    console.warn(`error during readdirSync operation`);
    throw new Error(error.message);
  }
};

module.exports = {
  getFiles,
  getFolderStructure,
};
