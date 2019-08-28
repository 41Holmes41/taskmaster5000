var express = require('express');
var router = express.Router();
var indexCtlr = require('../controllers/index')
var passport = require('passport');

/* GET home page. */
router.get('/', indexCtlr.index);

 // Google OAuth login route
 router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

 // Google OAuth callback route
 router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/students',
    failureRedirect : '/students'
  }
));

module.exports = router;
