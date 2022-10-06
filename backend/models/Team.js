const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 100
    },

    users_id: [{
        type: String,
    }],

    project_id: {
        type: String,
    }
});

module.exports = mongoose.model('Team', TeamSchema);