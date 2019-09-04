var express = require('express');
var router = express.Router();
var usersCtlr = require('../controllers/users');

/* GET users listing. */
router.get('/assigntask/:id', usersCtlr.assigntask);
router.get('/mytasks', usersCtlr.mytasks);
router.get('/removetask/:id', usersCtlr.removetask);
router.get('/completetask/:id', usersCtlr.completetask);
router.get('/myinfo/:id', usersCtlr.myinfo);


module.exports = router;
