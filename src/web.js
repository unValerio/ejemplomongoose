// Dependencies
var express = require('express')
var morgan = require("morgan")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var path = require("path")

var config = require('./config')
var apiRouter = require("./infrastructure/routers/apiRouter")

var app = express()

// Settings
app.set('port', config.port)
app.use(morgan("dev"))
app.use(bodyParser.json())

// Conectar a mongodb
mongoose.connect(config.mongo_url)

// Rutas del API
app.use("/api", apiRouter)

// Error 404
app.use(function(req, res, next){
	res.status(404)

	// respond with html page
	if (req.accepts('html')) {
		return res.send("Página no encontrada")
	}

	// respond with json
	if (req.accepts('json')) {
		return res.json({ error: 'Recurso no encontrado' })
	}

	// default to plain-text. send()
	return res.type('txt').send('Not found')
})

// Start Server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})



