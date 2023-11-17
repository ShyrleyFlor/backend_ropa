import express from 'express';
import {
    crearProductos,
    listarProductos,
    listarUnProducto,
    editarProducto,
    eliminarProducto
} from '../controllers/productosControllers.js';

const router = express.Router();

router.get('/productos/listar', listarProductos);
router.post('/productos/crear', crearProductos);
router.get('/productos/listar/:id', listarUnProducto);
router.put('/productos/editar/:id', editarProducto);
router.patch('/productos/eliminar/:id', eliminarProducto);

export default router;