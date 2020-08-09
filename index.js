'use strict'

//	Cargamos módulos 
var mongoose 	=	require('mongoose');
var app	 		=	require('./app');
//	Puerto
var port 		=	process.env.PORT || 3977
//	Conectamos con la base de datos
//	Para evitar warnings por deprecated
mongoose.Promise = global.Promise;
//	Ajustes de mongo
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//	Conectamos con base de datos y ponemos servidor a la escucha
mongoose.connect('mongodb://localhost:27017/momodb', (err, res) => {
	if(err){
		throw err
		return 0
	}
	console.log('momodb running ok.')

	app.listen(port, function(){
		console.log('momotheque server listening at http://localhost:' + port)
	})
})
