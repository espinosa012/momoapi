'use strict'
//	Modelo de usuario

var mongoose 	=	require('mongoose')
var Schema 		=	mongoose.Schema;

var UserSchema 	=	Schema({
	username: 	String,
	//email: 		String, 
	password: 	String, 
	role: 		String,
	image: 		String,
});

module.exports 	=	mongoose.model('User', UserSchema);