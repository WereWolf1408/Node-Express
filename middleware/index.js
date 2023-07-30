

const setSessionMessage = (req, res, next) => {
  console.log(`---------> set session message: `);
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
};

const example = (req, res, next) => {
  console.log(`---> example middleware: `);
  next();
}

module.exports = {
  setSessionMessage,
  example,
};
