const fs = require('fs');
const writeStream = fs.createWriteStream('./result.txt');

let iteration = 0;
let canRead = true;

const read = () => {
  while (iteration < 1000 && canRead) {
    canRead = writeStream.write('1111111111111111111111111111');
    iteration++;
  }

  if (iteration < 1000) {
    writeStream.once('drain', () => {
      console.log(`Buffer overflow:`);
      setTimeout(()=>{
        canRead = true;
        read();
      }, 3000);
    });
    return;
  }
  writeStream.end();
};

writeStream.on('finish', () => {
  console.log('Data writing completed');
});

writeStream.on('error', (error) => {
  console.error('An error occurred:', error);
});

read();