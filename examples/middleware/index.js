const express = require('express');
const app = express();

// Custom middleware
const myMiddleware = (req, res, next) => {
  console.log(`insode midleware with trigger error`);
  // Perform some operations
  try {
    // Simulate an error
    throw new Error('Something went wrong');
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};


// Route handler using the custom middleware
app.get('/example', myMiddleware, (req, res) => {
  // Your route logic
});


// Error middleware
const errorHandler = (err, req, res, next) => {
  // Handle the error
  console.log(`inside error handler`);
  console.error(err); // Log the error for debugging purposes
  
  // Set the response status code
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
    },
  });
};

// Register the error middleware
app.use(errorHandler);


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
