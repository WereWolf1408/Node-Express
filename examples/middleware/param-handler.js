const express = require('express');
const app = express();

// Custom middleware to handle route parameter
app.param('id', (req, res, next, id) => {
  console.log('ID parameter:', id);
  // You can perform any custom logic here based on the parameter value
  // For example, you can fetch data from a database and attach it to the request object
  req.user = { id: id, name: 'John Doe' };
  next();
});

// Route handler that uses the route parameter
app.get('/users/:id', (req, res) => {
  console.log('User:', req.user);
  res.send('User details: ' + JSON.stringify(req.user));
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
