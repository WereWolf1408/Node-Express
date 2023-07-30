const fs = require('fs');
const path = require('path');

function renameFilesInFolders(rootFolder) {
  // Read the root folder
  fs.readdir(rootFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading root folder:', err);
      return;
    }

    // Iterate over each item in the root folder
    files.forEach((file, index) => {
      const folderPath = path.join(rootFolder, file.name);

      // Check if the item is a directory
      if (file.isDirectory()) {
        // Read the files in the subfolder
        fs.readdir(folderPath, { withFileTypes: true }, (err, subFiles) => {
          if (err) {
            console.error(`Error reading files in ${file.name}:`, err);
            return;
          }

          // Iterate over each file in the subfolder
          subFiles.forEach((subFile, subIndex) => {
            const filePath = path.join(folderPath, subFile.name);
            const newFileName = `${index}-${subFile.name}`;

            // Rename the file
            fs.rename(filePath, path.join(folderPath, newFileName), (err) => {
              if (err) {
                console.error(`Error renaming ${subFile.name} in ${file.name}:`, err);
              } else {
                console.log(`Renamed ${subFile.name} in ${file.name} to ${newFileName}`);
              }
            });
          });
        });
      }
    });
  });
}

// Provide the root folder path where the subfolders and files are located
const rootFolder = 'C:/Users/Anton_Fiadotau/Desktop/1111/123';
renameFilesInFolders(rootFolder);
