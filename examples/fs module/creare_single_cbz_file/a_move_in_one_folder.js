const fs = require('fs');
const path = require('path');

const sourceFolder = 'C:/Users/Anton_Fiadotau/Desktop/1111/123'; // Replace with the path to the source folder
const destinationFolder = 'C:/Users/Anton_Fiadotau/Desktop/1111/final'; // Replace with the path to the destination folder

function copyImagesFromSubfolders(sourceFolder, destinationFolder) {
  // Read the source folder
  fs.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading source folder:', err);
      return;
    }

    // Iterate over each item in the source folder
    files.forEach((file) => {
      const sourceFilePath = path.join(sourceFolder, file.name);
      
      // Check if the item is a directory
      if (file.isDirectory()) {
        // Recursively copy images from sub-folders
        copyImagesFromSubfolders(sourceFilePath, destinationFolder);
      } else {
        // Check if the item is a file with an image extension
        if (isImageFile(file.name)) {
          const destinationFilePath = path.join(destinationFolder, file.name);

          // Copy the image file to the destination folder
          fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
            if (err) {
              console.error(`Error copying file: ${file.name}`, err);
            } else {
              console.log(`Copied file: ${file.name}`);
            }
          });
        }
      }
    });
  });
}

// Function to check if a file has an image extension
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

copyImagesFromSubfolders(sourceFolder, destinationFolder);
