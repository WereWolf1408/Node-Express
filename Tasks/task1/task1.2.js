const { log } = require("console");
const csv = require("csvtojson");

const csvFilePath = "data.csv";
const outputFilePath = "output.txt";

const readStream = require("fs").createReadStream(csvFilePath);

const writeStream = require("fs").createWriteStream(outputFilePath);


const csvCallback = (json) => {
  console.log(json);
  json.Book = 'Enot';
};

/**
 * .subscribe - (see docs) method to modify json object
 */
const csvHandler = csv().subscribe(csvCallback);

readStream.pipe(csvHandler).pipe(writeStream);