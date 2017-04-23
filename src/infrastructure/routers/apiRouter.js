// DEPENDENCIAS
var express = require("express")
var router = express.Router()

var librosRepository = require('../../domain/librosRepository')

router.post('/libros', function(req, res) {

	var data = req.body

	librosRepository.createLibro(data, function(libro) {
		res.json({
			status: "Libro creado en BD",
			libro: libro
		})
	}, function(err) {
		res.json({
			status: "Error al guardar libro",
			error: err
		})
	})

})

router.get('/libros', function(req, res) {

	librosRepository.encuentraTodos(function(libros) {
		res.json({
			status: "Todos los libros encontrados",
			libros: libros
		})
	}, function(err) {
		res.json({
			status: "Error al obtener todos los libros",
			error: err
		})
	})
})

router.get('/libros/:id', function(req, res) {

	var id = req.params.id

	librosRepository.encuentraMiLibro(id, function(libro) {
		res.json({
			status: "Libro encontrado",
			libro: libro
		})
	}, function(err) {
		res.json({
			status: "Error al obtener tu libro",
			error: err
		})
	})
})

router.delete('/libros/:id', function (req, res) {

	var id = req.params.id

	librosRepository.borraMiLibro(id, function() {
		res.json({
			status: "Libro borrado"
		})
	}, function(err) {
		res.json({
			status: "Error al borrar tu libro",
			error: err
		})
	})

})



module.exports = router

