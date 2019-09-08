var express = require('express');
var router = express.Router();
var messagesCtlr = require('../controllers/messages')
var passport = require('passport');


router.get('/new', isLoggedIn, messagesCtlr.newMessage);
router.post('/new',  isLoggedIn, messagesCtlr.createMessage);
router.get('/show/:id',  isLoggedIn, messagesCtlr.show);
router.post('/newreply/:id',  isLoggedIn, messagesCtlr.createReply);



 function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;