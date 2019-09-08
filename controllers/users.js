const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');
const Time = require('../time')

module.exports = {
  assigntask,
  mytasks,
  removetask,
  completetask,
  myinfo
};

function assigntask(req, res) {
  Task.findById(req.params.id, function (err, task) {
    task.available = false;
    task.save(function (err) {
      Group.findById(req.user.activeGroup, function (err, group) {
        group.availableTasks.remove({
          _id: task.id
        });
        group.activeTasks.push(task.id);
        group.save(function (err) {
          req.user.currentTasks.push(task.id);
          req.user.save(function (err) {
            req.user.populate('currentTasks').populate('activeGroup').populate('completedTasks').execPopulate(function (err, userPopulated) {
              res.render('tasks/mytasks', {
                name: req.query.name,
                group: req.user.activeGroup,
                userPopulated
              });
            });
          });
        });
      });
    });
  });
};

function mytasks(req, res) {
  req.user.populate('currentTasks').populate('activeGroup').populate('completedTasks').execPopulate(function (err, userPopulated) {
    Time.updateTaskPoints();
    res.render('tasks/mytasks', {
      name: req.query.name,
      group: req.user.activeGroup,
      userPopulated
    });
  });
};


function removetask(req, res) {
  Task.findById(req.params.id, function (err, task) {
    task.available = true;
    Time.updatePostTime(task);
    task.save(function (err) {
      req.user.currentTasks.remove({
        _id: task.id
      });
      req.user.save(function (err) {
        Group.findById(req.user.activeGroup, function (err, group) {
          group.activeTasks.remove({
            _id: task.id
          });
          group.availableTasks.push(task.id);
          group.save(function (err) {
            req.user.populate('currentTasks').populate('activeGroup').populate('completedTasks').execPopulate(function (err, userPopulated) {
              res.render('tasks/mytasks', {
                name: req.query.name,
                group: req.user.activeGroup,
                userPopulated
              });
            })
          })
        })
      })
    });
  });
};

function completetask(req, res) {
  Task.findById(req.params.id, function (err, task) {
    task.completed = true;
    task.completedBy = req.user.id;
    task.save(function (err) {
      req.user.currentTasks.remove({
        _id: task.id
      });
      req.user.completedTasks.push(task.id);
      req.user.currentPoints += task.points;
      req.user.totalPoints += task.points;
      req.user.save(function (err) {
        Group.findById(req.user.activeGroup, function (err, group) {
          group.activeTasks.remove({
            _id: task.id
          });
          group.completedTasks.push(task.id);
          group.save(function (err) {
            req.user.populate('currentTasks').populate('activeGroup').populate('completedTasks').execPopulate(function (err, userPopulated) {
              res.render('tasks/mytasks', {
                name: req.query.name,
                group: req.user.activeGroup,
                userPopulated
              });
            });
          });
        });
      });
    });
  });
};

function myinfo(req, res) {
  User.findById(req.params.id, function (err, user) {
    user.populate('groups').populate('activeGroup').execPopulate(function (err, userPopulated) {
      res.render('users/myinfo', {
        name: req.query.name,
        userPopulated
      });
    });
  });
};