var express = require('express');
var router = express.Router();
var usersCtlr = require('../controllers/users');

/* GET users listing. */
router.get('/assigntask/:id',  isLoggedIn, usersCtlr.assigntask);
router.get('/mytasks', isLoggedIn,  usersCtlr.mytasks);
router.get('/removetask/:id', isLoggedIn,  usersCtlr.removetask);
router.get('/completetask/:id',  isLoggedIn, usersCtlr.completetask);
router.get('/myinfo/:id', isLoggedIn,  usersCtlr.myinfo);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
