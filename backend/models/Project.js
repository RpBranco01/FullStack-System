const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 100
    },

    acronym: {
        type: String,
        required: true,
        maxlength: 5
    },

    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
    },

    tasks_id: [{
        type: String,
    }],

    team_id: {
        type: String,
    }
});

module.exports = mongoose.model('Project', ProjectSchema);