const Admin = require('../models/Admin');

var admins = [{ username: "admin", password: "admin" }];

// Gets admins from db
exports.get_admins = function (req, res, next) {
    Admin.deleteMany().exec(function (err) {
        if (err) { return next(err) }
    })
    admins.forEach(admin => admin_create(admin.username, admin.password));

    res.send(admins);
};

function admin_create(username, password, next) {
    var admin = new Admin();
    admin.username = username;
    admin.password = password;

    admin.save(function (err) {
        if (err) { return next(err); }
    });
};