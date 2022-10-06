var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//CONNECT TO DB
var mongoose = require('mongoose');

var mongoDB = "mongodb+srv://vasco2001:vasco2001@rest.h0djr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//var mongoDB = 'mongodb+srv://manuel:123@cluster0.mwbfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//var mongoDB = 'mongodb://psi015:psi015@localhost:27017/psi015?retryWrites=true&authSource=psi015';
//var mongoDB = 'mongodb+srv://rodas2001:rodas2001@cluster0.zb3qz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
