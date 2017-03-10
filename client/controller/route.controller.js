//default route for the website
 exports.indexPAge = function(req ,res){
 	res.render('index',{message: 'Index default PAge'});
}

//default homepage controller for API route one's user auth
exports.APIhomepage = function(req , res){
	res.render('home' ,{message: 'API Home page'});
}