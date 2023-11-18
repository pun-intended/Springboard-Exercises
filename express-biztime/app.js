/** BizTime express application. */


const express = require("express");
const companies = require('./routes/companies')
const invoices = require('./routes/invoices')

const app = express();
const ExpressError = require("./expressError")

app.use(express.json());


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** Routes **/ 
app.use('/companies', companies)

app.use('/invoices', invoices)

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
