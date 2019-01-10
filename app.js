var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//const cors = require("cors");
var logger = require('morgan');
var connection = require('./database/connection');
var utillogger =require('./util/logger');
var emproute = require('./routes/emp_route');
var loginroute = require('./routes/login_route');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// //app.use(cors());
// app.options('*',cors());
// app.use(function(req, res, next)
// {
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "*");
// next();
// });
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/emp',emproute);
app.use('/login',loginroute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  var err=new Error('Not Found');
  err.status=400;
  err.info="Route not Found";
  next(err);
});
// error handler
app.use((err,req,res,next)=>{
  if(err.isBoom){
    var error={
      "statusCode":400,
      "info":"check request body",
      "error":err
    };
    res.status(400).send(error);
  }
  else
  {
    if (err.name == "SequelizeDatabaseError") {
      // console.log("Invalid Column Name");
      var errorMessage = {
        "statusCode": 404,
        "info": "Invalid Column Name / Check DB Columns",
        "error": err
      };
      res.status(404).send(errorMessage);
    }
    //DB Credentials Error
    else if (err.name == "SequelizeAccessDeniedError") {
      console.log("Invalid Password")
      var errorMessage = {
        "status": 500,
        "info": "DB Credentials Error",
        "error": err
      };
      res.status(500).send(errorMessage);
    }
    //404 Error
    else if (err.statusCode == 404) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "error": err
      };
      res.status(404).json(errorMessage);
    }
    //400 Error
    else if (err.statusCode == 400) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "info": "Bad Request",
        "error": err.error
      };
      res.status(400).json(errorMessage);
    }
    //500 Error
    else {
      res.status(500).send(err);
    }
  }

});
app.listen(3000,()=>{
  console.log("listining on 3000");
});

module.exports = app;
