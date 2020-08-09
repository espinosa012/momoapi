'use strict'

var express 					=	require('express');
var AuthorComponentController 	=	require('../controllers/authorComponent');

var api 	=	express.Router();


var md_auth	=	require('../middlewares/authenticated');

api.get('/author-component/:id', md_auth.ensureAuth, AuthorComponentController.getAuthorComponent)
api.get('/authors-components/:page?', md_auth.ensureAuth, AuthorComponentController.getAuthorsComponents)
api.get('/get-author-component-image/:imageFile', AuthorComponentController.getAuthorComponentImageFile)

//	Para poder usar api (el router) fuera de este fichero.
module.exports 		=	api;	


//Los Americanos: 5e9871898673695d4deb5991