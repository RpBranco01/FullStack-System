var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//CONNECT TO DB
var mongoose = require('mongoose');

//var mongoDB = *USE SERVER ID HERE*

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SET ROUTES
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);
const UserRouter = require('./routes/user');
app.use('/api/user', UserRouter);
const TaskRouter = require('./routes/task');
app.use('/api/task', TaskRouter);
const TeamRouter = require('./routes/team');
app.use('/api/team', TeamRouter);
const ProjectRouter = require('./routes/project');
app.use('/api/project', ProjectRouter);
const UnavailabilityRouter = require('./routes/unavailability');
app.use('/api/unavailability', UnavailabilityRouter);
const MeetingRouter = require('./routes/meeting');
app.use('/api/meeting', MeetingRouter);

module.exports = app;
