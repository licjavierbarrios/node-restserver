const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["categorias", "productos", "roles", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
	const esMongoID = ObjectId.isValid(termino); // True

	if (esMongoID) {
		const usuario = await Usuario.findById(termino);
		return res.json({
			results: usuario ? [usuario] : [],
		});
	}

	const regex = new RegExp(termino, "i");

	const usuarios = await Usuario.find({
		$or: [{ nombre: regex }, { correo: regex }],
		$and: [{ estado: true }],
	});
	res.json({
		results: usuarios,
	});
};

const buscarCategorias = async (termino = "", res = response) => {
	const esMongoID = ObjectId.isValid(termino); // True

	if (esMongoID) {
		const categoria = await Categoria.findById(termino);
		return res.json({
			results: categoria ? [categoria] : [],
		});
	}

	const regex = new RegExp(termino, "i");

	const categorias = await Categoria.find({
		nombre: regex,
		estado: true,
	});

	res.json({
		results: categorias,
	});
};

const buscarProductos = async (termino = "", res = response) => {
	const esMongoID = ObjectId.isValid(termino); // True

	if (esMongoID) {
		const producto = await Producto.findById(termino)
			.populate("categoria", {
				nombre: 1,
				_id: 0,
			})
			.populate("usuario", {
				nombre: 1,
				_id: 0,
			});
		return res.json({
			results: producto ? [producto] : [],
		});
	}

	const regex = new RegExp(termino, "i");

	const resProductos = await Producto.find({
		nombre: regex,
		estado: true,
	})
		.populate("categoria", {
			nombre: 1,
			_id: 0,
		})
		.populate("usuario", {
			nombre: 1,
			_id: 0,
		});

	res.json({
		results: resProductos,
	});
};

const buscar = (req, res = response) => {
	const { coleccion, termino } = req.params;

	if (!coleccionesPermitidas.includes(coleccion)) {
		return res.status(400).json({
			msg: `Las colecciones permitidas son ${coleccionesPermitidas} `,
		});
	}

	switch (coleccion) {
		case "usuarios":
			buscarUsuarios(termino, res);
			break;
		case "categorias":
			buscarCategorias(termino, res);
			break;
		case "productos":
			buscarProductos(termino, res);
			break;

		default:
			res.status(500).json({
				msg: "Se me olvidó hacer esta búsqueda",
			});
	}
};

module.exports = {
	buscar,
};
