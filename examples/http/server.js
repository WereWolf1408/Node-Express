const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  // res.send('Hello World!');
  const {url} = req;
  res.send(JSON.stringify(url))
});

app.listen(port, () => {
  console.log(`server started on port = ${port}`);
});