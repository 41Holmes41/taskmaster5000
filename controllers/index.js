const User = require('../models/user');
const Group = require('../models/group');
const Task = require('../models/task');
const Message = require('../models/message');
const Time = require('../time')
var moment = require('moment');

module.exports = {
  index,
  loggedIn,
  showDashboard
};

function index(req, res, next) {
    userPopulated= req.user;
    res.render('index', {
      name: req.query.name,
      userPopulated
    });
  };

function loggedIn(req, res, next) {
  req.user.populate('groups').execPopulate(function (err, userPopulated) {
    Group.find({}, function(err,groups) {
      res.render('index', {
        name: req.query.name,
        userPopulated,
        groups
      });
    });
  });
};


function showDashboard(req, res, next) {
  Group.findById(req.params.id, function (err, group) {
    group.populate('creator').populate('availableTasks').populate({
      path: 'users',
      options: { sort : {currentPoints : -1}}
    }).populate({
      path: 'completedTasks',
      options: { sort : { completion : -1 }}
    }).execPopulate(function (err, group) {
      




      Time.updateTaskPoints();
      Time.postDuration();
      Time.durationToDueDate();
      req.user.activeGroup = group;
      req.user.populate('activeGroup').execPopulate(function (err, userPopulated) {
        req.user.save(function (err) {
          group.populate({
            path: 'messages',
            populate: { path: 'poster', option: { sort : { 'createdAt': -1}}}
          }).execPopulate(function (err, group){
              res.render('dashboard', {
                name: req.query.name,
                group,
                userPopulated
              });
            });
        });
      });
    });
  });
}