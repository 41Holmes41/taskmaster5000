var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({

    name: String,
    email: String,
    googleId: String,
    avatar: String,
    activeGroup: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },

    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],

    currentPoints: {
        type: Number,
        default: 1
    },

    totalPoints: {
        type: Number,
        default: 1
    },

    currentTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],

    completedTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);