require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MemoryStore = require('memorystore')(session);

var appRouter = require('./routes/app');
var apiRouter = require('./routes/api');
var userRouter = require('./routes/user');

var app = express();
var port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

const cookieExpiration = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date
}
app.use(session({
  secret: 'randobook',
  store: new MemoryStore({
    checkPeriod: cookieExpiration()
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: cookieExpiration()
  }
}));

app.use('/', appRouter);
app.use('/api', apiRouter);
app.use('/user', userRouter);

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

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
