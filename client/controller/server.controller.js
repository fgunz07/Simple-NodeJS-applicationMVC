var userModel = require('../model/mongoDB.model');

exports.create = function(req , res){
	var user = new userModel({
		username: req.body.username,
		password: req.body.password	
	});

	user.save(function(err , user){
		if(err) throw err;
		res.json({success: false , message: user});
	})
}
