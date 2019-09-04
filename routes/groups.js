var express = require('express');
var router = express.Router();
var groupsCtlr = require('../controllers/groups')
var passport = require('passport');

router.get('/new', groupsCtlr.new);
router.post('/create', groupsCtlr.create);
router.get('/join', groupsCtlr.joinpage);
router.post('/join', groupsCtlr.joingroup);
router.get('/error', groupsCtlr.error);

router.get('/editselectgroup', groupsCtlr.editselectgroup);
router.get('/edit/:id', groupsCtlr.edit);
router.put('/update/:id', groupsCtlr.update);

router.get('/deleteselectgroup', groupsCtlr.deleteselectgroup);
router.get('/deletegroup/:id', groupsCtlr.deletegroup);
router.get('/delete/:id', groupsCtlr.removegroup);


module.exports = router;