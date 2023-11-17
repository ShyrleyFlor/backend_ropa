import Compras from '../models/Compras.js';
import Distribuidores from '../models/Distribuidores.js';

//listar todas las compras
export const listarCompras = async(req, res) => {
    try{
        //se obtiene una lista de las compras donde eliminado = 0
        const compras = await Compras.findAll( {
            where: {
                eliminado: 0
            },
            include: {
                model: Distribuidores,
                attributes: ['nombre']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', "eliminado"]
            },
        } );

        //se emite la lista
        res.json(compras);
    }
    catch(error){
        console.log(error);
    }
}

//obtener una compra por id
export const listarUnaCompra = async(req, res) => {
    try{
        const id = req.params.id;

        //se obtiene un registro de compra en función de su id, si eliminado = 0
        const compra = await Compras.findOne( {
            where: {
                id: id,
                eliminado: 0
            },
            include: {
                model: Distribuidores,
                attributes: ['nombre']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', "eliminado"]
            }
        } );
        
        //se emiten los datos del registro obtenido
        res.json(compra);
    }
    catch(error){
        console.log(error);
    }
}

//insertar un registro de compra
export const crearCompra = async(req, res) => {
    try{
        const {fecha, total, distribuidoreId} = req.body;
        const eliminado = 0;

        //se crea un registro para la compra
        await Compras.create( {fecha, total, eliminado, distribuidoreId} );
        
        //se emite mensaje de confirmación
        res.json( {
            msg: 'Compra creada'
        } );
    }
    catch(error){
        console.log(error);
    }
}

export const editarCompras = async(req, res) => {
    try{
        const id = req.params.id;
        const {fecha, total, distribuidoreId} = req.body;

        //se actualizan los datos de la compra
        await Compras.update( 
            {
                fecha: fecha,
                total: total,
                distribuidoreId: distribuidoreId
            },
            {
                where: {
                    id: id
                }
            }
        );

        //se emite mensaje de confirmación
        res.json( {
            msg: 'Compra editada'
        } );
    }
    catch(error){
        console.log(error);
    }
}

export const eliminarCompra = async(req, res) => {
    try{
        const id = req.params.id;
        
        //se elimina la compra en funcion del id
        await Compras.update( 
            {eliminado: 1},
            {
                where: {
                    id: id
                }
            } 
        );

        //se emite mensaje de confirmación
        res.json( {
            msg: 'Compra eliminada'
        } );
    }
    catch(error){
        console.log(error);
    }

}