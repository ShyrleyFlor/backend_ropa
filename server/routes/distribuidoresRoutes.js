import {Router} from 'express'
import {
    listarDistribuidores,
    listarUnDistribuidor,
    crearDistribuidor,
    editarDistribuidor,
    eliminarDistribuidor
}from '../controllers/distribuidoresControllers.js'

const distribuidoresRoutes = Router();

//listar todos los distribuidores
distribuidoresRoutes.get('/distribuidores/listar', listarDistribuidores);

//obtener un distribuidor por id
distribuidoresRoutes.get('/distribuidores/listar/:id', listarUnDistribuidor);

//insertar un registro de distribuidor
distribuidoresRoutes.post('/distribuidores/crear', crearDistribuidor);

//actualizar un registro de distribuidor
distribuidoresRoutes.put('/distribuidores/editar/:id', editarDistribuidor);

//cambiar estado de un distribuidor
distribuidoresRoutes.patch('/distribuidores/eliminar/:id', eliminarDistribuidor);

export default distribuidoresRoutes;