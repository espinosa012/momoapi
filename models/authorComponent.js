'use strict'
//	Modelo de author_component

var mongoose 	=	require('mongoose')
var Schema 		=	mongoose.Schema;

/*
var AuthorComponentSchema 	=	new Schema({
	name: 			String,
	nickname:		String, 
	origin: 		String, 
	antifaz:		String,
	agroupations:	{},
	image: 			String,
}, {collection:'authors_components_'});
*/



var AuthorComponentSchema 	=	new Schema({
	name: 			String,
	nickname:		String, 
	origin: 		String, 
	antifaz:		String,
	agroupations:	[{
		
	}],
	image: 			String,
}, {collection:'authors_components_'});





module.exports 	=	mongoose.model('AuthorComponent', AuthorComponentSchema);

const UserSchema = new mongoose.Schema({
    username: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })