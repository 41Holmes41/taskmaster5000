const User = require('../models/user');
const Group = require('../models/group');

module.exports = {
  index,
  loggedIn,
  showDashboard
};

function index(req, res, next) {
    res.render('index', {
      user: req.user,
      name: req.query.name,
    }); 
};


function loggedIn(req, res, next) {

  req.user.populate('groups').execPopulate(function (err, userPopulated) {
    console.log("yoooooooooooooooo", userPopulated)
    res.render('index', {
      user: req.user,
      name: req.query.name,
      userPopulated
    });
  }); 
};


function showDashboard(req, res, next) {
  Group.findById(req.params.id, function(err, group){
  res.render('dashboard', {
    user: req.user,
    name: req.query.name,
    group
  }); 
})
};
