var mongoose = require('mongoose')

var librosEntity = require("./librosEntity")

exports.createLibro = function (data, onSuccess, onError) {

	var libro = new librosEntity()

	libro.title = data.titulo
	libro.pages = data.paginas
	libro.author = data.autor
	libro.readed = false

	libro.save(function (err, libro) {
		if(err)
			onError(err)
		else
			onSuccess(libro)
	})
}

exports.encuentraTodos = function(onSuccess, onError) {
	
	librosEntity.find({}, function(err, libros) {
	   	if (err)
			onError(err)
		else{

			/*
			var idLibros = []

			for (var i = libros.length - 1; i >= 0; i--) {
				idLibros.push(libros[i]._id)
			}

			onSuccess(idLibros)
			*/

			onSuccess(libros)
		}
    })
}

exports.encuentraMiLibro = function(id, onSuccess, onError) {
	
	// onSuccess({message: "Esto si funciona"})

	librosEntity.findOne({_id: id}, function(err, libro) {
	   	if (err)
			onError(err)
		else
			onSuccess(libro)
    })	
}

exports.borraMiLibro = function(id, onSuccess, onError) {
	
	this.encuentraMiLibro(id, function(libro) {
		
		librosEntity.remove({_id: id}, function (err){
			if (err)
				onError(err)
			else
				onSuccess()
		})

	}, onError)

}

