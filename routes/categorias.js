const { Router } = require("express");
const { check } = require("express-validator");

const {
	crearCategoria,
	obtenerCategorias,
	obtenerCategoria,
	actualizarCategoria,
	borrarCategoria,
} = require("../controllers/categorias");

const {
	existeCategoriaPorID,
	existeCategoriaDuplicada,
} = require("../helpers/db-validators");
const {
	validarJWT,
	validarCampos,
	tieneRole,
	esAdminRole,
} = require("../middlewares");

const router = Router();

/*
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get("/", obtenerCategorias);

// Obtener una categoria por id - público
router.get(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoriaPorID),
		validarCampos,
	],
	obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	crearCategoria
);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoriaPorID),
		check("nombre").custom(existeCategoriaDuplicada),
		validarCampos,
	],
	actualizarCategoria
);

// Delete categoria - privado - solo Admin
router.delete(
	"/:id",
	[
		validarJWT,
		esAdminRole,
		// tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoriaPorID),
		validarCampos,
	],
	borrarCategoria
);

module.exports = router;
