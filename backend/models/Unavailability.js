const mongoose = require('mongoose');

const UnavailabilitySchema = mongoose.Schema({

    begin: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    user_id: {
        type: String,
        required: true,
        maxlength: 100
    }
});

module.exports = mongoose.model('Unavailability', UnavailabilitySchema);