const Group = require('../models/group');
const User = require('../models/user');

module.exports = {
  new: newGroup,
  create
};

function newGroup(req, res, next) {
  res.render('groups/new', {
    user: req.user,
    name: req.query.name
  });
};

function create(req, res, next) {

  Group.create(req.body, function (err, group) {
    group.creator = req.user
    group.save();

     User.findById(req.user._id, function(err, user){
       user.groups.push(group);
       user.save()

       res.redirect('/');
       
     })
  });
};
