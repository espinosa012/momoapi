'use strict'

var jwt		=	require('jwt-simple');
var moment	=	require('moment');
var secret 	=	'secret_key_momoheque';


exports.ensureAuth	=	function(req, res, next){
	/*
		Para comprobar si los datos del token que recibamos 
		son correctos.
	*/
	if (!req.headers.authorization){return res.status(403).send({message:'Request has not auth header'});}

	var token	=	req.headers.authorization.replace(/['"]+/g, '')

	try{
		var payload 	=	jwt.decode(token, secret);

		//	Comprobamos si el toke ha expirado
		if(payload.exp <= moment.unix()){return res.status(404).send({message:'Token expired'});}

	}catch(ex){
		console.log(ex);
		return res.status(404).send({message:'Invalid token'});
	}

	req.user =	payload;

	//	Salimos del middleware
	next();

}	