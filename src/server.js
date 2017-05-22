var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Connected to the database.');
	}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
	req.header('Access-Control-Allow-Credentials', true);
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

var api = require('./routes/nodeAPI')(app, express);
app.use('/nodeAPI', api);


app.get('*', function (req, res) {
    //res.sendFile(__dirname + '/www/ServerTest.html');
});

app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Listening on port 3000');
	}
});