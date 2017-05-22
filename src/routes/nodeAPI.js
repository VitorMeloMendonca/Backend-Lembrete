var User = require('../models/user');
var Usuario = require('../models/usuario');
var Lembrete = require('../models/lembrete');
var config = require('../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');


function createToken(user) {
	
	var token = jsonwebtoken.sign({
		_id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
        //expirtesInMinute: 1440
	});
	
	return token;
}

module.exports = function (app, express) {
	
	var api = express.Router();
	
	api.post('/signup', function (req, res) {
		
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		
		user.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
		});
		
		res.json({ message: 'User has been updated!' });
	});
	
	api.get('/users', function (req, res) {
		
		console.log('Entrou no metodo GET');
		
		User.find({}, function (err, users) {
			
			if (err) {
				res.send(err);
				return;
			}
			
			res.json(users);
		});
	});
	
	api.post('/login', function (req, res) {
		
		User.findOne({
			username: req.body.username
		}).select('password').exec(function (err, user) {
			
			if (err)
				throw err;
			
			if (!user) {
				res.send({ message: "User dosen't exist!" });
			}
			else if (user) {
				
				var validPassword = user.comparePassword(req.body.password);
				
				if (!validPassword) {
					res.send({ message: 'Invalid password' });
				}
				else {
					
					var token = createToken(user);
					
					res.json({
						success: true,
						message: 'Successfuly login!',
						token: token
					});
				}
			}
		});
	});
	
	
	api.post('/SalvarUsuario', function (req, res, next) {
		
		var usuario = new Usuario({
			nome: req.body.nome,
			sobrenome: req.body.sobrenome,
			telefone: req.body.telefone,
			cpf: req.body.cpf
		});
		
		usuario.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
		});
		
		res.json({ message: 'Usuario salvo com sucesso!' });
	});
	
	api.get('/TodosUsuarios', function (req, res) {
		
		Usuario.find({}, function (err, users) {
			
			if (err) {
				res.send(err);
				return;
			}
			
			res.json(users);
		});
	});
	
	//LEMBRETE
	
	api.post('/SalvarLembrete', function (req, res, next) {
		
		console.log('API.');
		console.log(req.body);
		
		var lembrete = new Lembrete({
			nome: req.body.nome,
			quantidade: req.body.quantidade
		});
		
		lembrete.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
		});
		
		res.json({ message: 'Lembrete salvo com sucesso!' });
	});
	
	api.get('/BuscarTodosLembretes', function (req, res) {
		
		Lembrete.find({}, function (err, lembretes) {
			
			if (err) {
				res.send(err);
				return;
			}
			
			res.json(lembretes);
		});
	});
	
	return api;
}
