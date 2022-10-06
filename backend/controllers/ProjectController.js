const Project = require('../models/Project');

exports.getProjects = function (req, res, next) {
    Project.find({}, function (err, projects) {
        if (err) return next(err);
        res.send(projects);
    });
};

exports.createProject = function (req, res, next) {
    var project = new Project();
    project.name = req.body.name;
    project.acronym = req.body.acronym;
    project.start = req.body.start;
    project.end = req.body.end;
    project.tasks_id = req.body.tasks_id;

    project.save(function (err) {
        if (err) { return next(err); }
        res.send(project);
    });
};

exports.getProject = function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) { return next(err); }
        res.send(project);
    });
};

exports.updateTeamProject = function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) { return next(err); }

        project.name = req.body.name;
        project.acronym = req.body.acronym;
        project.start = req.body.start;
        project.end = req.body.end;
        project.team_id = req.body.team_id;
        project.tasks_id = req.body.tasks_id;

        project.save(function (err) {
            if (err) { return next(err); }
            res.send(project);
        });
    });
};

//Deletes a project
exports.deleteProject = function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) { return next(err); }
        project.deleteOne(project, function (err) {
            if (err) { return next(err); }
            res.send(project);
        });
    });
};