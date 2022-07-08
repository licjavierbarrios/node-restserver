const { response, request } = require('express');

const usuariosGEt = (req = request, res = response) => {
	const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;
	res.json({
		msg: 'get API - controlador',
		q,
		nombre,
		apikey,
		page,
		limit,
	});
};

const usuarioPut = (req, res) => {
	const { id } = req.params;
	res.json({
		msg: 'put API - controlador',
		id,
	});
};

const usuarioPost = (req, res) => {
	const { nombre, edad } = req.body;

	res.json({
		msg: 'post API - controlador',
		nombre,
		edad,
	});
};

const usuarioPatch = (req, res) => {
	res.json({
		msg: 'patch API - controlador',
	});
};

const usuarioDelete = (req, res) => {
	res.json({
		msg: 'delete API - controlador',
	});
};

module.exports = {
	usuariosGEt,
	usuarioPut,
	usuarioPost,
	usuarioDelete,
	usuarioPatch,
};
