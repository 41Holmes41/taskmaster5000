const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');
const Time = require('../time')

module.exports = {
  new: newTask,
  create,
  show,
  remove
};

function newTask(req, res) {
  req.user.populate('activeGroup').populate('groups').execPopulate(function (err, userPopulated) {
    res.render('tasks/newtask', {
      name: req.query.name,
      group: req.user.activeGroup,
      userPopulated
    });
  });
}

function create(req, res) {
  console.log("yppppppppppppppppppppp", req.body);
  Group.findById(req.user.activeGroup, function (err, group) {
    Task.create(req.body, function (err, task) {
      Time.updatePostTime(task);

      group.availableTasks.push(task);
      group.save(function (err) {

        task.group = group;
        task.creatorName = req.user.name;
        task.creatorId = req.user._id;
        task.creatorAvatar = req.user.avatar;
        task.posted = new Date();
        task.save(function (err) {

          req.user.currentPoints -= 1;
          req.user.save();

          group.populate('availableTasks').execPopulate(function (err, group) {
            req.user.populate('activeGroup').execPopulate(function (err, userPopulated) {

              res.render('dashboard', {
                name: req.query.name,
                group,
                userPopulated
              });
            });
          })
        });
      })
    });
  })
}

function show(req, res) {
  Task.findById(req.params.id, function (err, task) {
    req.user.populate('activeGroup').execPopulate(function (err, userPopulated) {
      res.render('tasks/show', {
        task,
        name: req.query.name,
        userPopulated
      });
    });
  });
};

function remove(req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {
    Group.findById(req.user.activeGroup, function (err, group) {
      group.availableTasks.remove({ _id: task.id });
      group.save( function(err) {
      res.redirect(`/dashboard/${req.user.activeGroup}`);
    })
    })
  })
}