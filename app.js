var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var UserRouter = require('./routes/users');
var AdminRouter = require('./routes/admin');
var AuthRouter = require('./routes/auth');
var EventRouter = require('./routes/event');
var ExpenseRouter = require('./routes/expense');

var mongoose = require('mongoose');
require('dotenv').config()

var app = express();

//Connect to MongoDB
var db = mongoose.connect('mongodb://localhost/MunshiSystem',{
  useCreateIndex: true,
  useNewUrlParser: true
});

var port = process.env.PORT || 3000;

//swig
var swig = require('swig');
app.engine('html',swig.renderFile)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', UserRouter);
app.use('/admin', AdminRouter);
app.use('/auth',AuthRouter);
app.use('/event',EventRouter);
app.use('/expense',ExpenseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,()=>{
  console.log("App is runnig on " + port);
})

module.exports = app;