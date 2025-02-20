var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
require('./authenticate')(passport);
var flash = require('connect-flash');
const methodOverride = require('method-override');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

require('./authenticate')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/fa', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

// sirviendo los archivos estaticos de mis tiendas en react
app.use('/menu', express.static(path.join(__dirname, '../tienda_react/build')));
app.use('/rapiweb', express.static(path.join(__dirname, '../rapi-web-client/build')));

app.use(flash());
app.use(session({
  // name: 'session-id',
  secret: 'slaesiON-queE-sseecretA',
  saveUninitialized: false,
  resave: false,
  // store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);

// servir mis tiendas de React en todas sus rutas (cuando se recarga el navegador)
var storeRouter = express.Router();
storeRouter.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../tienda_react/build', 'index.html'));
});
app.use('/menu', storeRouter);

const rapiWebRouter = express.Router();
rapiWebRouter.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../rapi-web-client/build', 'index.html'));
});
app.use('/rapiweb', rapiWebRouter);

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
