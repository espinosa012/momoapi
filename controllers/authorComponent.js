'use strict'

var path 	=	require('path')
var fs 		=	require('fs')

var mongoosePagination 	=	require('mongoose-pagination');

var AuthorComponent 	=	require('../models/authorComponent');

var Song 				=	require('../models/song')


function getAuthorComponent(req, res){
	//	ama: 	5e960fb9fcbfa351f28094e8

	var acId 	=	parseInt(req.params.id);

	AuthorComponent.findOne({id_:acId}, (error, ac) =>{
		if(error){res.status(500).send({message:'Request error'})}
		else{
			if(!ac){res.status(404).send({message:'No se ha encontrado el autor o componente'})}
			else{res.status(200).send({ac})}
		}
	})
}


function getAuthorsComponents(req, res){
	//Pagination
	if(req.params.page){var page 	=	req.params.page;}
	else{var page 	=	1}

	var itemsPerPage 	=	5;
		
	AuthorComponent.find().sort('name').paginate(page, itemsPerPage, function(error, acs, total){
		if(error){res.status(500).send({message:'Request error'})}
		else{
			if(!acs){res.status(404).send({message:'No se encontaron los autores/componentes'})}
			else{
				res.status(200).send({
					totaltems: total, 
					authorsComponents: acs, 
				})
			}
		}
	})
}

function getAuthorComponentImageFile(req, res){
	console.log('getImageFile')
	//	Recibe el nombre del fichero a obtener
	var imageFile 	=	req.params.imageFile
	var pathFile 	=	'./img/authors_components/' + imageFile
	console.log(pathFile)
	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message:'Non existing file'})
		}

	});
}





module.exports	=	{
	getAuthorComponent,
	getAuthorsComponents,
	getAuthorComponentImageFile,
}