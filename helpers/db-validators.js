const { Usuario, Categoria, Producto } = require("../models");
const Role = require("../models/role");

// USUARIOS
const esRoleValido = async (rol = "") => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`);
	}
};

const emailExiste = async (correo = "") => {
	// Verificar si el correo existe
	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(`El correo: ${correo}, ya está registrado`);
	}
};

const existeUsuarioPorID = async (id = "") => {
	// Verificar si el correo existe
	const existeUsuario = await Usuario.findById(id);
	if (!existeUsuario) {
		throw new Error(`El id: ${id} no existe`);
	}
};

// CATEGORIAS
const existeCategoriaPorID = async (id = "") => {
	// Verificar si existe categoria
	const existeCategoria = await Categoria.findById(id);
	if (!existeCategoria) {
		throw new Error(`El id: ${id} no existe`);
	}
};

const existeCategoriaDuplicada = async (nombre = "", id) => {
	nombre = nombre.toUpperCase();

	const nombredb = await Categoria.findOne({ id });
	if (nombredb.nombre === nombre) {
		throw new Error(`La categoria ${nombre} ya existe`);
	}
};

// PRODUCTOS
const existeProductoPorID = async (id = "") => {
	// Verificar si existe producto
	const existeProducto = await Producto.findById(id);
	if (!existeProducto) {
		throw new Error(`El id: ${id} no existe`);
	}
};
const existeProductoDuplicado = async (nombre = "", id) => {
	nombre = nombre.toUpperCase();

	const nombredb = await Producto.findOne({ id });
	if (nombredb.nombre === nombre) {
		throw new Error(`El producto ${nombre} ya existe`);
	}
};

// VALIDAR COLECCIONES PERMITIDAS
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
	const incluida = colecciones.includes(coleccion);
	if (!incluida) {
		throw new Error(
			`La colección '${coleccion}' no es permitida. Colecciones permitidas: ${colecciones}`
		);
	}
	return true;
};

module.exports = {
	esRoleValido,
	emailExiste,
	existeUsuarioPorID,
	existeCategoriaPorID,
	existeCategoriaDuplicada,
	existeProductoPorID,
	existeProductoDuplicado,
	coleccionesPermitidas,
};
