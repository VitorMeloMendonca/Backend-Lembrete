var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LembreteSchema = new Schema({
	
	nome: String,
	quantidade: Number
});

module.exports = mongoose.model('Lembrete', LembreteSchema);