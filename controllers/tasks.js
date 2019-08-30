const User = require('../models/user');
const Task = require('../models/task');
const Group = require('../models/group');

module.exports = {
  new: newTask,
  create

};

function newTask(req, res) {
  Group.findById(req.params.id, function (err, group) {
    res.render('tasks/newtask', {
      user: req.user,
      name: req.query.name,
      group
    });
  });
}

function create(req, res) {
  Group.findById(req.params.id, function (err, group) {
    Task.create(req.body, function (err, task) {

      group.availableTasks.push(task);
      group.save(function (err) {

        task.group = group;
        task.creatorName = req.user.name;
        task.creatorId = req.user._id;
        task.creatorAvatar = req.user.avatar;
        task.save(function (err) {

          group.populate('availableTasks').execPopulate(function (err,group) {
      
            res.render('dashboard', {
              user: req.user,
              name: req.query.name,
              group
            });

          })

        });
      })

    });

  })



}