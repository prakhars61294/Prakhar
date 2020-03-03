var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var conn = require('./bin/config.json')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var productsRouter = require('./routes/products.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// const checkAuth = (req, res, next) => {
//     if (!req.headers.authorization) {
//         res.send('unauthorized user')
//     } else {
//         jwt.verify(req.headers.authorization, conn[1].key, function(err, decoded) {
//             if (!err) {

//                 next();
//             } else {
//                 res.send('unauthorized access');
//             }
//         })
//     }
// }
// app.use(checkAuth)

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

module.exports = app;