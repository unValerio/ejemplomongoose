var mongoose = require('mongoose')

var libroSchema = new mongoose.Schema({
    title: String,
    pages: Number,
    author: String,
    readed: Boolean
})

module.exports = mongoose.model('Libros', libroSchema)
