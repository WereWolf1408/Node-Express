const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to use HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', path.join(__dirname, './UI/index.html'));

const publicDirectoryPath = path.join(__dirname, '..', '..', 'assets');
const picsPublicDirectoryPath = path.join(__dirname, '..', '..', 'assets/pictures');

app.use(express.static(publicDirectoryPath));
app.use(express.static(picsPublicDirectoryPath));


// Define a route handler for the root path
app.get('/', (req, res) => {
  // Render the template and send it as the response
  res.render('index');
});

app.get('/picture', (req, res) => {
  // Render the template and send it as the response
  res.render('index-pic');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
