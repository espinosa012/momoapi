'use strict'

var path 	=	require('path');
var fs 		=	require('fs');

var Agroupation 	 	=	require('../models/agroupation');

function getAgroupation(req, res){

	//var agroupationId 	=	parseInt(req.params.id);
	var agroupationId 	=	req.params.id;

	Agroupation.findOne({id_:agroupationId}, function(error, ag){
		console.log(agroupationId)
		if(!error && ag){
			res.status(200).send({agroupation:ag})
		}else{
			if(error){res.status(500).send({message:'Request error'})}
			if(!ag){res.status(404).send({message:'No se encontró la agrupación (404)'})}
		}
	});
}

function getAgroupationsByYear(req, res){
	//	Para el ejemplo, obtenemos las agrupaciones por año, ya después especificamos (parámetros opcionales, etc.)
	//	Implementar comportamento por defecto de la variable year
	var itemsPerPage 	=	5;
	if(req.params.year){
		var ag_year =	req.params.year;
		var query 	=	{year:ag_year};		
	}	
	else{var query 	=	{}};

	Agroupation.find(query, function(error, ags, total){
		if(!error && ags){
			res.status(200).send({
				totaltems: total, 
				agroupations: ags, 
			})
		}else{
			if(error){res.status(500).send({message:'Request error'})}
			if(!ags){res.status(404).send({message:'No se encontraron agrupaciones (404)'})}
		}
	});

}




function getAgroupationsByModality(req, res){
	//	Para el ejemplo, obtenemos las agrupaciones por año, ya después especificamos (parámetros opcionales, etc.)
	//	Implementar comportamento por defecto de la variable year.
	var itemsPerPage 	=	5;
	if(req.params.modality){
		var ag_modalty 	=	req.params.modality;
		var query 		=	{modality:ag_modalty};		
	}	
	else{var query 	=	{};}


	Agroupation.find(query, function(error, ags, total){
		if(!error && ags){
			res.status(200).send({
				totaltems: total, 
				agroupations: ags, 
			})
		}else{
			if(error){res.status(500).send({message:'Request error'})}
			if(!ags){res.status(404).send({message:'No se encontraron agrupaciones (404)'})}
		}
	});
}



module.exports 	=	{
	getAgroupation,
	getAgroupationsByYear,
	getAgroupationsByModality,
}
