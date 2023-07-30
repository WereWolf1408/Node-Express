const fs = require('fs');
const path = require('path');

const sourceFolder = 'C:/Users/Anton_Fiadotau/Desktop/1111/example'; // Replace with the path to the source folder
const destinationFolder = 'C:/Users/Anton_Fiadotau/Desktop/1111/333'; // Replace with the path to the destination folder

let counter = 0; // Global index for renaming files

function copyAndRenameFiles(sourceFolder, destinationFolder) {
  // Read the source folder
  fs.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading source folder:', err);
      return;
    }

    // Iterate over each item in the source folder
    files.forEach((file) => {
      const sourceFilePath = path.join(sourceFolder, file.name);
      const destinationFilePath = path.join(destinationFolder, `${counter}-${file.name}`);
      counter++;

      // Check if the item is a directory
      if (file.isDirectory()) {
        // Create the destination subfolder if it doesn't exist
        const subDestinationFolder = path.join(destinationFolder, file.name);
        if (!fs.existsSync(subDestinationFolder)) {
          fs.mkdirSync(subDestinationFolder);
        }

        // Copy and rename files recursively within the subfolder
        copyAndRenameFiles(sourceFilePath, subDestinationFolder);
      } else {
        // Check if the item is a file with an image extension
        if (isImageFile(file.name)) {
          // Copy the file to the destination folder
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

copyAndRenameFiles(sourceFolder, destinationFolder);
