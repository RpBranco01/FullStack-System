const Team = require('../models/Team');

exports.createTeam = function (req, res, next) {
    var team = new Team();
    team.name = req.body.name;

    team.save(function (err) {
        if (err) { return next(err); }
        res.send(team);
    });
};

exports.getTeams = function (req, res, next) {
    Team.find({}, function (err, teams) {
        res.send(teams);
    });
}

exports.getTeam = function (req, res, next) {
    Team.findById(req.params.id, function (err, team) {
        if (err) { return next(err); }
        res.send(team);
    });
};

exports.updateTeam = function (req, res, next) {
    Team.findById(req.params.id, function (err, team) {
        if (err) { return next(err); }
        team.name = req.body.name;
        team.users_id = req.body.users_id;
        team.project_id = req.body.project_id;

        team.save(function (err) {
            if (err) { return next(err); }
            res.send(team);
        });
    })
}