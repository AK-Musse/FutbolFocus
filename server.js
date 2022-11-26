const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var axios = require('axios');
var passport = require('passport');
var bodyParser = require("body-parser");
require('dotenv').config();

require('./config/database')
// require('./config/passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var updateTeamsRouter = require('./routes/updateTeams');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'nba',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/updateteams', updateTeamsRouter);

const  User = require("./models/user");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userProfile;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOne({ 'googleId': profile.id }, function(err, user) {
    //   if (err) return cb(err);
    //   if (user) {
    //     return cb(null, user);
    //   } else {
    //     // we have a new user via OAuth!
    //     var newUser = new User({
    //       name: profile.displayName,
    //       email: profile.emails[0].value,
    //       googleId: profile.id
    //     });
    //     newUser.save(function(err) {
    //       if (err) return cb(err);
    //       return cb(null, newUser);
    //     });
    //   }
    // });
    userProfile = profile;
    return cb(null, userProfile);
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});


passport.deserializeUser(function(obj, done) {
    done(null, obj)
});

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

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// const db = mongoose.connection;

// // database connection event
// db.on('connected', function () {
//   console.log(`Mongoose connected to: ${db.host}:${db.port}`);
// });

module.exports = app;
