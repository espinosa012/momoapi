'use strict'
//	Modelo de canción

var mongoose 	=	require('mongoose')
var Schema 		=	mongoose.Schema;

var SongSchema 	=	Schema({
	title: 				String,
	agroupation:		{type: Schema.ObjectId, ref:'Agroupation'}, 
	type: 	 			String, 
	duration:			String,
	file: 				String
});

module.export 	=	mongoose.model('SongSchema', SongSchema);
