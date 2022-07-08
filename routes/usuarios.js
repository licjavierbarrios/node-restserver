const { Router } = require('express');
const {
	usuariosGEt,
	usuarioPut,
	usuarioPost,
	usuarioDelete,
	usuarioPatch,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGEt);

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.patch('/', usuarioPatch);

router.delete('/', usuarioDelete);
module.exports = router;
