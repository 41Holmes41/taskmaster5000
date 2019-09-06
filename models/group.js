var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupSchema = new mongoose.Schema({
    name: String,
    password: String,
    description: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    availableTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    activeTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    completedTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);