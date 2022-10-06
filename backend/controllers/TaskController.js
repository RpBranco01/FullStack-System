const Task = require('../models/Task');
const User = require('../models/User');

exports.getUser = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
};

exports.getTasks = function (req, res, next) {
    Task.find({}, function (err, tasks) {
        if (err) return next(err);
        res.send(tasks);
    });
};

exports.getTask = function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) return next(err);
        res.send(task);
    });
};

exports.updateTask = function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) { return next(err); }
        task.name = req.body.name;
        task.priority = req.body.priority;
        task.progress = req.body.progress;
        task.start_date = req.body.start_date;
        task.finish_date = req.body.finish_date;
        task.user_id = req.body.user_id;
        task.users_id = req.body.users_id;
        task.project_id = req.body.project_id;


        task.save(function (err) {
            if (err) { return next(err); }
            res.send(task);
        });
    })
}

exports.createTask = function (req, res, next) {
    var task = new Task();
    task.name = req.body.name;
    task.priority = req.body.priority;
    task.progress = req.body.progress;
    task.user_id = req.body.user_id;
    task.users_id = req.body.users_id;

    task.save(function (err) {
        if (err) { return next(err); }
        res.send(task);
    });
};

exports.getUserTasks = function (req, res, next) {
    Task.find({ users_id: req.params.id }, function (err, tasks) {
        if (err) return next(err);
        res.send(tasks);
    });
};

exports.deleteTask = function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            return next(err);
        }

        task.deleteOne(task, function (err) {
            if (err) {
                return next(err);
            }
            res.send(task)
        });
    });
}