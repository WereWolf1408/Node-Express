const express = require('express');
const app = express();

const logger = (req, res, next) => {
  const { url } = req;
  console.log(`logged data: url = ${url}`);
  next();
};


app.use(logger);

app.get('/', (req, res) => {
  console.log(`inside app.get`);
  res.send('hello world');
});


app.listen('3000', (req, res) => {
  console.log(`server started on 3000 port`);
})