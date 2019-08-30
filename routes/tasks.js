var express = require('express');
var router = express.Router();
//var passport = require('passport');
var tasksCtlr = require('../controllers/tasks');

router.get('/new/:id', isLoggedIn, tasksCtlr.new);
router.post('/new/:id', isLoggedIn, tasksCtlr.create);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


module.exports = router;