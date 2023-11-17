import { Router } from 'express';
import {
    listarCompras,
    listarUnaCompra,
    crearCompra,
    editarCompras,
    eliminarCompra
} from '../controllers/comprasControllers.js';

const comprasRoutes = Router();

//listar todas las compras
comprasRoutes.get('/compras/listar', listarCompras);

//obtener un registro de compra
comprasRoutes.get('/compras/listar/:id', listarUnaCompra);

//insertar un registro de compra
comprasRoutes.post('/compras/crear', crearCompra);

//editar un registro de compra
comprasRoutes.put('/compras/editar/:id', editarCompras);

//eliminar un registro de compra
comprasRoutes.patch('/compras/eliminar/:id', eliminarCompra);

export default comprasRoutes;