var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
	
	nome: String,
	sobrenome: String,
	telefone: String,
	cpf: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);