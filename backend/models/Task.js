const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 100
    },

    priority: {
        type: String,
        required: true,
        maxlength: 100
    },

    progress: {
        type: Number,
        required: true,
    },

    start_date: {
        type: String,
    },

    finish_date: {
        type: String,
    },

    user_id: {
        type: String,
        required: true,
        maxlength: 100
    },

    users_id: [{
        type: String
    }],

    project_id: {
        type: String,
        maxlength: 100
    }
});

module.exports = mongoose.model('Task', TaskSchema);