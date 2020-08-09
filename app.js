'use strict'
//	Cargamos librerías
var express			=	require('express')
var bodyParser		=	require('body-parser')


var app 			=	express();

//	Cargamos rutas
var userRoutes 				=	require('./routes/user');
var authorComponentRoutes	=	require('./routes/authorComponent')
var agroupationRoutes		=	require('./routes/agroupation')



//	Para convertir a json los datos que nos llegan por las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//	Configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');

	next();
})

//	Carga de rutas base
//	utilizamos un middleware (siempre delante /api)
app.use('/api', userRoutes);
app.use('/api', authorComponentRoutes);
app.use('/api', agroupationRoutes);

//	Para usar el código de este fichero en otros
module.exports 	=	app;