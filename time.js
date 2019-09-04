const User = require('./models/user');
const Task = require('./models/task');
const Group = require('./models/group');
var moment = require('moment');

module.exports = {
  updateTaskPoints,
  updatePostTime,
  postDuration,
  durationToDueDate
}


//this function updates ALL tasks. should be updated to only update necessary tasks
function updateTaskPoints() {
  Task.find({}, function (err, tasks) {
    tasks.forEach(function (task) {
      task.points = 1 + Math.floor(((new Date() - task.createdAt) / 3600000))
      task.save();
    })
  })
}

function updatePostTime(task) {
  task.posted = new Date();
  task.save();
}

function postDuration() {
  Task.find({}, function (err, tasks) {
    tasks.forEach(function (task) {
      task.postDuration = moment(task.posted, "YYMMDD").fromNow();
      task.save();
    })
  })
}

function durationToDueDate() {
  Task.find({}, function (err, tasks) {
    tasks.forEach(function (task) {
      var exp = new moment(task.completion);
      var now = new moment();
      var days = exp.diff(now, 'days');
      var hours = exp.subtract(days, 'days').diff(now, 'hours');
      var minutes = exp.subtract(hours, 'hours').diff(now, 'minutes');
      task.timeuntilcompletion=`${days} D, ${hours} H, ${minutes} M`;
      task.save();
    })
  })
}