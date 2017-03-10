var express = require('express'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	Parser = require('body-parser'),
	Config = require('./env/config'),
	Route = require('./client/controller/route.controller'),
	Controller = require('./client/controller/server.controller'),
	Auth = require('./client/controller/auth.controller'),
	app = express();

	//database connection
	//mongoose.connect(Config.database);

	//register module middleware
	app.use(logger('dev'));
	app.use(Parser.urlencoded({
		extended: true
	}));
	app.use(Parser.json());

	//route for index page
	app.get('/', Route.indexPAge);

	//API users
	var userAPI = express.Router();

	userAPI.post('/register', Controller.create);
	userAPI.post('/auth', Auth.auth);

	app.use('/userapi', userAPI);
	//API route
	var routeAPI = express.Router();

	routeAPI.use(Auth.validate);

	routeAPI.get('/', Route.APIhomepage);
	routeAPI.post('/', Route.APIhomepage);

	app.use('/api', routeAPI);

	//Template engine set
	app.set('views', './client/view');
	app.set('view engine', 'pug');

	//run server console
	app.listen(Config.port , function(){
		console.log('Server running port: %s' , Config.port);
	});