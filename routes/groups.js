var express = require('express');
var router = express.Router();
var groupsCtlr = require('../controllers/groups')
var passport = require('passport');

router.get('/new', isLoggedIn, groupsCtlr.new);
router.post('/create', isLoggedIn, groupsCtlr.create);
router.get('/join', isLoggedIn, groupsCtlr.joinpage);
router.post('/join', isLoggedIn, groupsCtlr.joingroup);
router.get('/error', isLoggedIn, groupsCtlr.error);

router.get('/editselectgroup', isLoggedIn, groupsCtlr.editselectgroup);
router.get('/edit/:id', isLoggedIn, groupsCtlr.edit);
router.put('/update/:id', isLoggedIn, groupsCtlr.update);

router.get('/deleteselectgroup', isLoggedIn, groupsCtlr.deleteselectgroup);
router.get('/deletegroup/:id', isLoggedIn, groupsCtlr.deletegroup);
router.get('/delete/:id', isLoggedIn, groupsCtlr.removegroup);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


module.exports = router;