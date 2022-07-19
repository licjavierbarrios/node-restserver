const { Router } = require("express");
const { check } = require("express-validator");

const {
	obtenerProductos,
	obtenerProducto,
	crearProducto,
	actualizarProducto,
	borrarProducto,
} = require("../controllers/productos");

const {
	existeProductoPorID,
	existeProductoDuplicado,
	existeCategoriaPorID,
} = require("../helpers/db-validators");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

/*
 * {{url}}/api/productos
 */

// Obtener todas las productos - público
router.get("/", obtenerProductos);

// Obtener una productos por id - público
router.get(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeProductoPorID),
		validarCampos,
	],
	obtenerProducto
);

// Crear producto - privado - cualquier persona con un token válido
router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("categoria", "No es un id de categoría válido").isMongoId(),
		check("categoria").custom(existeCategoriaPorID),
		validarCampos,
	],
	crearProducto
);

// Actualizar PRODUCTO - privado - cualquier persona con un token válido
router.put(
	"/:id",
	[
		validarJWT,
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeProductoPorID),
		validarCampos,
	],
	actualizarProducto
);

// Delete Producto - privado - solo Admin
router.delete(
	"/:id",
	[
		validarJWT,
		esAdminRole,
		// tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"),
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeProductoPorID),
		validarCampos,
	],
	borrarProducto
);

module.exports = router;
