'use strict'

var fs 	=	require('fs');
var path=	require('path')

//	Cargamos el modelo de la base de datos
var User 	=	require('../models/user');

var bcrypt	=	require('bcrypt');

var jwt 	=	require('../services/jwt');

function pruebas(req, res){
	res.status(200).send({
		message:'Probando una acción del controlador de usuario.'
	});
}

function loginUser(req, res){
	/*	Los parámetros llegarán por post. Buscamos el usuario en la base
		de datos por su usuario. Si lo encontramos, comprobamos que la c
		contraseña sea la correcta.
	*/
	var params 		=	req.body;

	var username	=	params.username;
	var password	=	params.password;

	//	Buscamos en la base de datos
	User.findOne({username: username.toLowerCase()}, (err, user) =>{
		if(err){
			res.status(500).send({message:'Error en la conexión con la base de datos'})

		}else{
			if(user){
				//	Comprobamos si la contraseña es correcta (bcrypt.compare)
				if(user.password != password){
					res.status(404).send({message:'Contraseña incorrecta'})	
				}else{
					//	Si la identificación es correcta
					if(params.getHash){
						//	Devolvemos token jwt, que contiene toda la información del usuario codificados
						res.status(200).send({token:jwt.createToken(user)});


					}else{res.status(200).send({user})}
				}
			}else{res.status(404).send({message:'El usuario no existe'})}
			
		}
	})
}	

function registerUser(req, res){
	var user 	=	new User();	
	//	cogemos los datos que nos llegan por la petición http
	var params 	=	req.body	//body parser convierte en json los campos de la petición http
	user.username	=	params.username
	//user.email		=	params.email
	user.password 	=	params.password
	user.role 		=	'role_user'	
	user.img 		=	'null'

	if(params.password && params.username){
		//	Comprobar que username es único en la base de datos
		//	encriptar contraseña mediante bcrypt o algún otro método
		//	...
		user.save((err, userStored) =>{
			if(err){
				res.status(500).send({message:'Error en el registro'})
			}else{
				if(!userStored){
					res.status(404).send({message:'No se ha podido registrar'})
				}else{res.status(200).send({user:userStored})}
			}
		});
	}else{res.status(200).send({message:'Introduzca todos los campos para formalizar el registro'})}
}

function updateUser(req, res){
	var userId 	=	req.params.id;	//	id de mongo
	//	Tomamos el body de la petición (put en este caso)
	var update 	=	req.body

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){res.status(500).send({message:'Error al actualizar datos del usuario (Error 500)'})}
		else{
			if(!userUpdated){res.status(404).send({message:'Error al actualizar datos del usuario (Error 404)'})}
			else{res.status(200).send({message:userUpdated})}
		}
	});
}




//	Subir ficheros
function uploadUserImage(req, res){
	var userId 	=	req.params.id;
	var filename=	'not_uploaded';

	if(req.files){
		console.log(req.files)
		var file_path 	=	req.files.image.path;
		var filename 	=	file_path.split('\\')[2];
		var extension	=	filename.split('.')[1];

		if(extension.toLowerCase() == 'png' || extension.toLowerCase() == 'jpg'){
			User.findByIdAndUpdate(userId, {image:filename}, (error, userUpdated) => {
				if(error){res.status(500).send({message:'Error al actualizar image de usuario (Error 500)'})}
				else{
					if(!userUpdated){res.status(404).send({message:'Error al actualizar imagen de usuario (Error 404)'})}
					else{res.status(200).send({message:userUpdated, image:filename})}
				}
			})
		}else{res.status(200).send({message:'Invalid image file'})}


	}
	else{res.status(200).send({message:'Selecciona una archivo'})}

}

function getImageFile(req, res){
	console.log('getImageFile')
	//	Recibe el nombre del fichero a obtener
	var imageFile 	=	req.params.imageFile
	var pathFile 	=	'./img/users/' + imageFile
	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message:'Non existing file'})
		}

	});
}


module.exports =	{
	pruebas,
	registerUser,
	loginUser,
	updateUser, 
	uploadUserImage,
	getImageFile,
};