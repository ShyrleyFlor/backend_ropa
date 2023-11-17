import Router from 'express';
import {
    listarClientes,
    listarUnCliente,
    crearCliente,
    editarCliente,
    eliminarCliente
}
from '../controllers/clientesController.js';

const clientesRouter = Router();

//listar todos los clientes
clientesRouter.get('/clientes/listar', listarClientes);

//obtener un cliente por id
clientesRouter.get('/clientes/listar/:id', listarUnCliente);

//crear un registro de cliente
clientesRouter.post('/clientes/crear', crearCliente);

//actualizar un registro de cliente
clientesRouter.put('/clientes/editar/:id', editarCliente);

//dar de baja a un cliente
clientesRouter.patch('/clientes/eliminar/:id', eliminarCliente);

export default clientesRouter;
