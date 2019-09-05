const User = require('../models/user');
const Group = require('../models/group');
const Task = require('../models/task');
const Time = require('../time');
const Message = require('../models/message');
var moment = require('moment');

module.exports = {
  newMessage,
  createMessage,
  show,
  createReply
};

function show(req, res, next) {
  Group.findById(req.user.activeGroup, function(err, group){
    Message.findById(req.params.id, function (err, message){
      message.populate('poster').execPopulate(function(err, message){

    userPopulated= req.user;
    res.render('messages/show', {
      name: req.query.name,
      userPopulated,
      group,
      message
    });
  })
  });
  })
}

function newMessage(req, res, next) {
  userPopulated= req.user;
  res.render('messages/new', {
    name: req.query.name,
    userPopulated
  });
}


function createReply(req, res, next) {
  Group.findById(req.user.activeGroup, function(err, group){
    Message.findById(req.params.id, function (err, message){
    message.replies.unshift({
      content: req.body.content,
      posterName: req.user.name,
      posterId: req.user.id,
      postTime: new moment().format('MMMM Do YYYY, h:mm:ss a')
    })
    message.save();

    res.redirect(`../show/${req.params.id}`)
  })
  })
}


function createMessage(req, res, next) {
  Group.findById(req.user.activeGroup, function(err, group){
    
    Message.create(req.body, function (err, message) {

      message.poster= req.user.id;
      message.group = group;
      message.postTime= new moment().format('MMMM Do YYYY, h:mm:ss a');
      message.save( function (err) {

        group.messages.push(message);
        group.save( function (err) {

          res.redirect(`../dashboard/${req.user.activeGroup}`)
        })
      });
    })

  })
}
