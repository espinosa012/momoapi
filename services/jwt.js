'use strict'

var jwt		=	require('jwt-simple');
var moment	=	require('moment');
var secret 	=	'secret_key_momoheque';

exports.createToken 	=	function(user){
	//	Función para almacenar la información de usuario en un hash
	//	para comprobar la correcta identificación del usuario

	var payload =	{
		sub:user._id,
		username:user.username,
		role:user.role,
		image:user.image,

		//	Creación y expiración del token (si no funciona moment, emplear algún equivalente)
		iat:moment.unix(),	//fecha de creación 
		iat:moment.unix().add(30, 'days')	//	fecha de expiración (30 días)
	};

	return jwt.encode(payload, secret);

};