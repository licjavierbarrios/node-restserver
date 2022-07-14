const { Router } = require("express");
const { check } = require("express-validator");



const { validarCampos } = require("../middlewares/validar-campos");

const {
	esRoleValido,
	emailExiste,
	existeUsuarioPorID,
} = require("../helpers/db-validators");


const {
	usuariosGEt,
	usuarioPut,
	usuarioPost,
	usuarioDelete,
	usuarioPatch,
} = require("../controllers/usuarios");


const router = Router();

router.get("/", usuariosGEt);

router.put("/:id", [
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorID),
	check('rol').custom(esRoleValido),
	validarCampos,
] , usuarioPut);

router.post(
	"/", 
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password debe ser más de 6 letras").isLength({
			min: 6,
		}),
		check("correo", "El correo no es válido").isEmail(),
		check('correo').custom( emailExiste ),
		check('rol').custom(esRoleValido),
		// check("rol").custom(esRoleValido),
		// check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
		validarCampos,
	],
	usuarioPost
);

router.patch("/", usuarioPatch);

router.delete("/:id", [
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom(existeUsuarioPorID),
	validarCampos,

] ,usuarioDelete);

module.exports = router;
