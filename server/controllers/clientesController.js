import Clientes from '../models/Clientes.js';

//listar todos los clientes
export const listarClientes = async(req, res) => {
    try{
        //se obtiene una lista de clientes donde eliminado = 0
        const clientes = await Clientes.findAll( {
            where: {
                eliminado: 0
            },
            attributes: {
                exclude: ['createdAt', "eliminado"]
            },
            order: [['deuda', 'DESC']]
        } )

        //se emite la lista obtenida
        res.json(clientes);
    }
    catch(error){
        console.log(error);
    }
}

//obtener un cliente por id
export const listarUnCliente = async(req, res) => {
    try{
        const id = req.params.id;

        //se obtiene una lista de clientes donde eliminado = 0
        const clientes = await Clientes.findAll( {
            where: {
                id: id,
                eliminado: 0
            },
            attributes: {
                exclude: ['createdAt', "eliminado"]
            },
            order: [['deuda', 'DESC']]
        } )
        
        //se emite la lista obtenida
        res.json(clientes[0]);
    }
    catch(error){
        console.log(error);
    }
}

//insertar un registro de cliente
export const crearCliente = async(req, res) => {
    try{
        const {nombre, telefono, descripcion, monto_total, deuda} = req.body;
        const eliminado = 0;

        //se validan los valores de deuda y monto_total, ambos no pueden ser menor o igual a cero. La deuda puede ser igual o menor a monto total
        if(deuda > 0 && monto_total > 0 && deuda <= monto_total){
            //se crea un nuevo registro para el cliente
            await Clientes.create( {nombre, telefono, descripcion, monto_total, deuda, eliminado} );
        }
        else{
            res.status(400).json( {
                msg: 'Valores no permitidos'
            } );
        }

        //se emite mensaje de confirmación
        res.json( {
            msg: 'Cliente creado'
        } )
    }
    catch(error){
        console.log(error);
    }
}

//actualizar un registro de cliente
export const editarCliente = async(req, res) => {
    try{
        const id = req.params.id;
        const {nombre, telefono, descripcion, monto_total, deuda} = req.body;

        //se validan los valores de deuda y monto_total, deuda debe ser mayor o igual a cero y monto_total mayor a cero. La deuda puede ser igual o menor a monto total
        if(deuda >= 0 && monto_total > 0 && deuda <= monto_total){
            await Clientes.update(
                {nombre, telefono, descripcion, monto_total, deuda},
                {
                    where: {
                        id: id
                    }
                }
            )
        }
        else{
            res.status(400).json( {
                msg: 'Valores no permitidos'
            } );
        }

        res.status(200).json( {
            msg: 'Modicado con exito'
        } )
    }
    catch(error){
        console.log(error);
    }
}

//dar de baja a un cliente
export const eliminarCliente = async(req, res) => {
    try{
        const id = req.params.id;

        //se actualiza la columna eliminado a 1
        await Clientes.update(
            {eliminado: 1},
            {
                where: {
                    id: id
                }
            }
        )

        //se emite mensaje de confirmación
        res.json({
            msg: 'Cliente eliminado'
        } );
    }
    catch(error){
        console.log(error);
    }
}