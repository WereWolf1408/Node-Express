const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const filePath = path.join(__dirname, ".content.xml"); // Replace with the path to your file
const parser = new xml2js.Parser();

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    parser.parseString(data, function (err, result) {
      const a = result['jcr:root']['$']['categories']
      const b = a.slice(1, -1).split(',');
      console.log(b[0]);
    });
  }
});


