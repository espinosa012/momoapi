'use strict'

var express					=	require('express');
var AgroupationController 	=	require('../controllers/agroupation');

var api 	=	express.Router();

var md_auth	=	require('../middlewares/authenticated');


api.get('/agroupation/:id', md_auth.ensureAuth, AgroupationController.getAgroupation)
api.get('/agroupations/year/:year', md_auth.ensureAuth, AgroupationController.getAgroupationsByYear)			//	metemos year en la ruta
api.get('/agroupations/modality/:modality', md_auth.ensureAuth, AgroupationController.getAgroupationsByModality)	//	metemos modality en la ruta


module.exports 	=	api;