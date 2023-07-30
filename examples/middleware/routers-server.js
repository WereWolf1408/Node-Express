const express = require('express');
const app = express();

// Require and mount the router
const router = require('./routers');
app.use('/api', router);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
