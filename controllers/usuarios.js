const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGEt = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	// Forma en cadena de hacer la consulta
	// const usuarios = await Usuario.find(query)
	// 	.skip(Number(desde))
	// 	.limit(Number(limite));

	// const total = await Usuario.countDocuments(query);

	// Es mejor porque emite los dos promesas juntas
	// y solo tardaría la mitad
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		usuarios
	});
};

const usuarioPost = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	// Guardar en BD
	await usuario.save();

	res.json({
		usuario,
	});
};

const usuarioPut = async (req, res) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	// TODO: validar contra base de datos
	if (password) {
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(usuario);
};

const usuarioPatch = (req, res) => {
	res.json({
		msg: "patch API - controlador",
	});
};

const usuarioDelete = async(req, res) => {
	const {id, estado} = req.params;

	// Borrado fisíco - No recomendado por la integridad física de la BD
	// const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


	res.json(usuario);
};

module.exports = {
	usuariosGEt,
	usuarioPut,
	usuarioPost,
	usuarioDelete,
	usuarioPatch,
};
