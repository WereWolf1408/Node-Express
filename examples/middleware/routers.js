// Import the required modules
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

router.param('id', function (req, res, next, id) {
  console.log(`middleware inside roiters file`);
  console.log(`id = ${id}`);
});

// Define routes and corresponding handlers
router.get('/', (req, res) => {
  res.send('Home Page');
});

router.get('/about', (req, res) => {
  res.send('About Page');
});

router.get('/contact', (req, res) => {
  res.send('Contact Page');
});


router.get('/param/:id', (req, res) => {
  res.send('param with id');
});
// Export the router to use in the main Express app
module.exports = router;
