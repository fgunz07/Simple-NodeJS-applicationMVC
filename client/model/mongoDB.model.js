var mongoos = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoos.Schema;

	//user schema
	var userSchema = new Schema({
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	});

	//hash the password method
	userSchema.pre('save' , function(next){
		var user = this;

		if(!user.isModified('password')) return next();

		bcrypt.hash(user.password, null , null , function(err , hash){
			if(err) return next(err);

			//change password to hash
			user.password = hash;

			next();
		})
	})

	userSchema.methods.comparePassword = function(password){
		var user = this;

		return bcrypt.compareSync(password , user.password);
	}

module.exports = mongoos.model('usermodel' , userSchema);