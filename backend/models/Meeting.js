const mongoose = require('mongoose');

const MeetingSchema = mongoose.Schema({

    begin: {
        type: Date,
    },

    end: {
        type: String,
    },

    duration: {
        type: Number,
    },

    users_id: [{
        type: String,
        required: true,
    }],

    available_dates: [{
        type: Date,
    }]
});

module.exports = mongoose.model('Meeting', MeetingSchema);