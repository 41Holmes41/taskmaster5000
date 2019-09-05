var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var replySchema = new Schema({
  posterName: String,
  posterId: String,
  content: String,
  postTime: String,
  editTime: Date
})


var messageSchema = new Schema({
  title: String,
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  postTime: String,
  editTime: Date,
  replies: [replySchema],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Message', messageSchema);