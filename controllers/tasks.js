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

  Task.create(req.body, function (err, task) {


    //must add method to add groupids array to task ------------------------------------------

    if (Array.isArray(req.body.groupids)) {
      if (Array.isArray(task.groups)) {
        console.log("meeeeeeeeeeeeeeeeeeeee")
      Task.findOneAndUpdate(
        { "_id" : task._id },
        { "$push": { "groups": { "$each": req.body.groupids }}}
      )
      } else {
      }
    } else {
      task.groups.push(req.body.groupids)
    }

    //this ends the unfinished part
    Time.updatePostTime(task);
    task.creatorName = req.user.name;
    task.creatorId = req.user._id;
    task.creatorAvatar = req.user.avatar;
    task.posted = new Date();
    task.save(function (err) {

      if (Array.isArray(req.body.groupids)) {
      req.body.groupids.forEach( function (groupid){
        Group.findById(groupid, function (err, group) {
          group.availableTasks.push(task);
          group.save()
        })
      })
    } else {
      Group.findById(req.body.groupids, function (err, group) {
        group.availableTasks.push(task);
        group.save()
      })
    }

      req.user.currentPoints -= 1;
      req.user.save( function (err) {

        req.user.populate('activeGroup').execPopulate(function (err, userPopulated) {

          Group.findById(req.user.activeGroup, function (err, group) {
            group.populate('availableTasks').execPopulate(function (err, group) {
            res.redirect(`../dashboard/${req.user.activeGroup._id}`)
            })
          })
        })
      })
    })
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