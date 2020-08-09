'use strict'
//	Modelo de agroupation

var mongoose 	=	require('mongoose')
mongoose.connect('mongodb://localhost:27017/momodb', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema 		=	mongoose.Schema;

var AgroupationSchema 	=	new Schema({
	id_: 				String,
	name: 				String,
	year:				String, 
	modality: 			String, 
	ranking:			String,
	origin: 			Array,
	custome:			String,
	previous:			String,
	authors_components:	Object,
	image: 	 			String,
},{collection:'agroupations'});//agroupations_


module.exports	=	mongoose.model('Agroupation', AgroupationSchema);
