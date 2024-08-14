const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const setupSwagger = require('./config/swagger');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const roomsRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const utilsRoutes = require('./routes/utilsRoutes');
const adminRoutes = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/payment', bookingRoutes);
app.use('/api', utilsRoutes);
app.use('/api/admin', adminRoutes);

setupSwagger(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
