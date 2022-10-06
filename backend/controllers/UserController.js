const User = require('../models/User');

// Creates a new user
exports.createUser = function (req, res, next) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function (err) {
        if (err) { return next(err); }
        res.send(user);
    });
};

// Deletes a user
exports.deleteUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return next(err); }
        user.deleteOne(user, function (err) {
            if (err) { return next(err); }
            res.send(user);
        });
    });
};

// Checks if user is in db
exports.getUser = function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) { return next(err); }
        res.send(user);
    });
};

exports.getUsers = function (req, res, next) {
    // Get all users
    User.find({}, function (err, users) {
        res.send(users);
    });
}

exports.updateUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return next(err); }
        console.log('uddate User');
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) { return next(err); }
            res.send(user);
        });
    })
}