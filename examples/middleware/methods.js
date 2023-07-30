const express = require('express');
const app = express();

// Middleware for all routes
app.use((req, res, next) => {
  console.log('Middleware for all routes');
  next();
});

// Middleware for GET requests
app.get('/', (req, res, next) => {
  console.log('Middleware for GET requests');
  next();
});

// Middleware for POST requests
app.post('/', (req, res, next) => {
  console.log('Middleware for POST requests');
  next();
});

// Route handler for all methods
app.all('/', (req, res) => {
  console.log('Route handler for all methods');
  res.send('Hello from the route handler!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
