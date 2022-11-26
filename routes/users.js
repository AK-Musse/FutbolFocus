var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 const passport = require('passport');


 router.get('/', function(req, res, next) {
    res.render('user');
  });



// Google OAuth login route
 router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

 //Google OAuth callback route
 router.get('/oauth2callback', passport.authenticate(
   'google',
   {
     successRedirect : '/teams',
     failureRedirect : '/teams'
   }
));

// OAuth logout route
 router.get('/logout', function(req, res){
    req.logout(function (req, err){
    
    });
  res.redirect('/teams');
});




module.exports = router;
