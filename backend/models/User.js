const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxlength: 100 // TODO see requirements
    },

    password: {
        type: String,
        required: true,
        maxlength: 100
    },

});

module.exports = mongoose.model('User', UserSchema);