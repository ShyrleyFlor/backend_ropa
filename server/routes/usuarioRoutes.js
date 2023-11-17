import express from 'express';
import { registrar, autenticar, listar } from '../controllers/usuarioControllers.js';
import { checkUserDuplicado} from '../middleware/verificaRegistrar.js';

const router = express.Router();

//Routing
router.post(
    '/registrar', 
    [checkUserDuplicado],
    registrar);

router.post('/autenticar', autenticar);
router.get('/listar', listar);

export default router;