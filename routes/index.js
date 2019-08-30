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
    successRedirect : '/loggedin',
    failureRedirect : '/'
  }
));

router.get('/loggedin', indexCtlr.loggedIn)


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/dashboard/:id', indexCtlr.showDashboard)



module.exports = router;
