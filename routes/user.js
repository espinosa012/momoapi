'use strict'

//	Cargamos el módulo de Express para definir una instancia
var express 		=	require('express');
//	Cargamos el controlador de usuario que hemos implementado para poder usar los métodos que hemos definido allí
var UserController	=	require('../controllers/user');
//	El módulo Express tiene un 'objeto' Router que nos permite crear rutas para nuestra api rest
var	api				= 	express.Router();
//	Cargamos el middleware de autenticación
var md_auth 		=	require('../middlewares/authenticated');
//	Para el envío de ficheros por http
var multipart 		=	require('connect-multiparty')
//	Middleware para la subida de ficheros
var md_upload 		=	multipart({uploadDir: './img/users/'})

//	Así cargamos las rutas
api.post('/register', UserController.registerUser);//	Argumentos: ruta a escribir en el nav y método a ejecutar
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser)
api.post('/upload-user-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadUserImage)
api.get('/get-user-image/:imageFile', UserController.getImageFile)
//	Para poder usar api (el router) fuera de este fichero.
module.exports 		=	api;	