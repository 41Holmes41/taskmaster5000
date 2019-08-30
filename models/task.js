var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require('../models/group');

var taskSchema = new mongoose.Schema({
    title: String,
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    available: {
        type: Boolean,
        default: true
    },
    completion: Date,
    completed: {
        type: Boolean,
        default: false
    },
    completionTime: Date,
    completedBy: String,
    completedByAvatar: String,
    description: String,
    points: {
        type: Number,
        default: 1
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creatorName: String,
    creatorAvatar: String,
    assigned: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);