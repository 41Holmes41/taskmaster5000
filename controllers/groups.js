const Group = require('../models/group');
const User = require('../models/user');

module.exports = {
  new: newGroup,
  create,
  editselectgroup,
  edit,
  update,
  deleteselectgroup,
  deletegroup,
  removegroup,
  joinpage,
  joingroup,
  error
};

function error(req, res, next) {
  res.render('groups/error', {
    userPopulated: req.user,
    name: req.query.name
  });
};

function joingroup(req, res, next) {
  Group.findOne({name : req.body.name}, function(err, group){
    if (group.password === req.body.password){
      group.users.push(req.user._id);
      group.save(function (err){
        req.user.groups.push(group._id);
        req.user.save();
        res.redirect('/loggedin')
      });
    } else {
      res.redirect('/groups/error');
    };
  }); 
};

function joinpage(req, res, next) {
  Group.findById(req.params.id, function(err,group){
    res.render('groups/join', {
      userPopulated: req.user,
      name: req.query.name,
      group
    });
  });
};

function newGroup(req, res, next) {
  res.render('groups/new', {
    userPopulated: req.user,
    name: req.query.name
  });
};

function create(req, res, next) {
  Group.create(req.body, function (err, group) {
    group.creator = req.user
    group.save(function (err) {
      User.findById(req.user._id, function (err, user) {
        user.groups.push(group);
        user.save(function (err) {
          res.redirect('/loggedin');
        })
      })
    });
  });
};

function editselectgroup(req, res, next) {
  req.user.populate('groups').execPopulate(function (err, userPopulated) {
    res.render('groups/selecteditgroup', {
      name: req.query.name,
      userPopulated
    });
  });
};

function edit(req, res, next) {
  Group.findById(req.params.id, function (err, group) {
    res.render('groups/edit', {
      userPopulated: req.user,
      name: req.query.name,
      group
    });
  });
};

function update(req, res) {
  Group.findOneAndUpdate({_id: req.params.id}, req.body, function (err, group){
      res.redirect('/loggedin');
  })
}

function deleteselectgroup(req, res, next) {
  req.user.populate('groups').execPopulate(function (err, userPopulated) {
    res.render('groups/selectdeletegroup', {
      userPopulated: req.user,
      name: req.query.name
    });
  });
};

function deletegroup(req, res, next) {
  Group.findById(req.params.id, function (err, group) {
    res.render('groups/delete', {
      userPopulated: req.user,
      name: req.query.name,
      group
    });
  });
};

function removegroup(req, res) {
  Group.findByIdAndRemove(req.params.id, function (err, group){
    req.user.groups.remove({ _id : req.params.id});
    req.user.save( function(err){
      res.redirect('/loggedin');
    });
  })
}