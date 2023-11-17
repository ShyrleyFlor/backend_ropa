import express from 'express';
import { 
    crearCategorias,
    listarCategorias,
    listarUnaCategoria,
    editarCategorias,
    eliminarCategorias } from '../controllers/categoriasControllers.js';

const router = express.Router();

router.get('/categorias/listar', listarCategorias);
router.get('/categorias/listar/:id', listarUnaCategoria);
router.post('/categorias/crear', crearCategorias);
router.put('/categorias/editar/:id', editarCategorias);
router.patch('/categorias/eliminar/:id', eliminarCategorias);

export default router;