const gulp = require('gulp');
const through2 = require('through2');
const xml2js = require('xml2js');

// Your src array containing paths to .xml files
const src = ['path/to/file1.xml', 'path/to/file2.xml'];

function parseXmlAndExtractCategories() {
  return through2.obj((file, encoding, callback) => {
    const xmlString = file.contents.toString();
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

    parser.parseString(xmlString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      const categories = result['jcr:root']['categories'];
      file.categories = categories; // Add categories to the file object

      callback(null, file);
    });
  });
}

gulp.task('compile-js', function() {
  return gulp.src(src)
    .pipe(parseXmlAndExtractCategories()) // Use the custom transform stream
    .pipe(gulp.dest(compilePath));
});


// Another example

const gulp = require('gulp');
const through2 = require('through2');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const { parseXml } = require('./your-xml-parser'); // Replace with your XML parser function
const { checkCondition } = require('./your-condition-checker'); // Replace with your condition checking function

// Your src array containing paths to .xml files
const src = ['path/to/file1.xml', 'path/to/file2.xml'];

function processXmlAndCheckCondition() {
  return through2.obj((file, encoding, callback) => {
    const xmlString = file.contents.toString();
    const categories = parseXml(xmlString); // Replace with your XML parser function

    if (checkCondition(categories)) {
      callback(null, file);
    } else {
      // Skip this file and read the next path from src
      callback();
    }
  });
}

gulp.task('compile-js', function() {
  return gulp.src(src)
    .pipe(processXmlAndCheckCondition()) // Use the custom transform stream
    .pipe(concat('compiled-landing-page-components-redesign.js'))
    .pipe(babel({
      'presets': ['es2015'],
    }))
    .pipe(gulp.dest(compilePath));
});
