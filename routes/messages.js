var express = require('express');
var router = express.Router();
var messagesCtlr = require('../controllers/messages')
var passport = require('passport');


router.get('/new', messagesCtlr.newMessage);
router.post('/new', messagesCtlr.createMessage);
router.get('/show/:id', messagesCtlr.show);
router.post('/newreply/:id', messagesCtlr.createReply);

module.exports = router;