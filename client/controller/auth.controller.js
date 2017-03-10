var userModel = require('../model/mongoDB.model'),
	Config = require('../../env/config'),
	jwt = require('jsonwebtoken');

exports.auth = function(req , res){
	userModel.findOne({
		username: req.body.username
	}, function(err, user){
		if(err) throw err;

		if(!user){
			res.json({
				success: false ,
				 message: 'Username doesnt exist!'})
		}
		else if(user){
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success: false,
					message: 'Invalid password'
				});
			}else{
				var token = jwt.sign(user , Config.secretString ,{
					expiresIn: 1440 //24hours
				})

				res.json({
					success: true,
					message: 'Welcome' +' '+ user.username,
					token: token
				})
			}
		}
	})
}

exports.validate = function(req , res, next){
	var token = req.body.token || req.headers['x-access-token'];

	if(token){
		jwt.verify(token , Config.secretString, function(err , decode){
			if(err) res.json({success: false , message: 'Token auth faild'});
			else{
				req.decode = decode;

				next();
			}
		})
	}else{
		res.json({
			success: false,
			message: 'No token provided'
		})
	}

	next();
}