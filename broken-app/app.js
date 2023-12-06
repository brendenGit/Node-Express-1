const express = require('express');
const { getData } = require('./middleware');


const app = express();
app.use(express.json());


app.post('/', async function (req, res, next) {
  try {
    const developers = req.body.developers;
    const results = await getData(developers);
    return res.status(200).json(results);
  } catch {
    next(err);
  };
});


// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});


// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});


module.exports = app;