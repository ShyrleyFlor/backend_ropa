import Distribuidores from '../models/Distribuidores.js';

//listar todos los distribuidores
export const listarDistribuidores = async(req, res) => {
    try{
        //se obtiene una lista de distribuidores donde eliminado = 0
        const distribuidores = await Distribuidores.findAll( {
            where: {
                eliminado: 0
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', "eliminado"] 
            } 
        } );

        //se emite el listado de distribuidores obtenidos
        res.json(distribuidores);
    }
    catch(error){
        console.log(error);
    }
}

//obtener un distribuidor por id
export const listarUnDistribuidor = async(req, res) => {
    try{
        const id = req.params.id;

        //se obtiene el distribuidor en función del id, si eliminado = 0
        const distribuidor = await Distribuidores.findOne( {
            where: {
                id: id,
                eliminado: 0
            }, 
            attributes: {
                exclude: ['createdAt', 'updatedAt', "eliminado"] 
            } 
        } );

        //se emiten los datos del distribuidor obtenido
        res.json(distribuidor);
    }
    catch(error){
        console.log(error);
    }
}

//insertar un registro de distribuidor
export const crearDistribuidor = async(req, res) => {
    try{
        const {nombre, telefono} = req.body;
        const eliminado = 0;

        //se verifica si ya existe el distribuidor por su nombre
        const distribuidor = await Distribuidores.findOne( {
            where: {
                nombre: nombre
            } 
        } );

        //si distribuidor == null, entonces se crea un nuevo registro; caso contrario, se actualiza eliminado a 0
        if(distribuidor == null){
            await Distribuidores.create( {nombre, telefono, eliminado} );          
        }
        else{
            await distribuidor.update( {telefono: telefono, eliminado: eliminado} );
       }

       //se emite mensaje de confirmación
       res.json( {
            msg: 'Proveedor creado'
       } );
    }
    catch(error){
        console.log(error);
    }
}

//actualizar un registro de distribuidor
export const editarDistribuidor = async(req, res) => {
    try{
        const id = req.params.id;
        const {nombre, telefono} = req.body;

        //se verifica si ya existe el distribuidor en otro registro
        const distribuidorExistente = await Distribuidores.findOne( {
            where: {
                nombre: nombre
            }
        } );

        //se obtiene el nombre actual del distribuidor ingresado, en función de su id en este caso
        const distribuidorIngresado = await Distribuidores.findOne({
            where: {
                id: id
            }
        });

        //si existe el distribuidor
        if (distribuidorExistente) {
            //se verifica si fue eliminado o no
            if(distribuidorExistente.eliminado == 1){
                //se actualiza el eliminado
                await distribuidorExistente.update({
                    nombre: nombre,
                    telefono: telefono,
                    eliminado: 0
                },
                {
                    where: {
                        id: distribuidorExistente.id
                    }
                })
                //se elimina el registro recién ingresado
                await Distribuidores.update({
                    eliminado: 1},
                    {
                    where: {
                        id: id
                    }
                })
                
                res.json({
                    msg: 'Proveedor editado'
                })
                

            }
            else if(distribuidorIngresado.nombre == distribuidorExistente.nombre && distribuidorExistente.telefono != telefono){
                //se modifica el distribuidor
                await Distribuidores.update({telefono: telefono}, {
                    where: {
                        id: id
                    }
                })  
                res.json({
                    msg: 'Proveedor editado'
                })             
            }
            //si no se ha eliminado, entonces muestra un mensaje de error
            else{
                res.status(400).json({
                    msg: 'El proveedor ya existe'
                });
            }
        }else {
            //se modifica el distribuidor
            await Distribuidores.update({nombre: nombre, telefono: telefono}, {
                where: {
                    id: id
                }
            })

            //se emite la respuesta de confirmacion
            res.json({
                msg: 'Proveedor editado'
            });
      }
    }catch(error){
        console.log(error);
    }
}

//dar de baja a un distribuidor
export const eliminarDistribuidor = async(req, res) => {
    try{
        const id = req.params.id;
        const eliminado = 1;
        
        //se actualiza la columna eliminado a 1
        await Distribuidores.update(
            {eliminado: eliminado},
            {where: {
                id: id
            } }
        );

        //se emite mensaje de confirmación
        res.json( {
            msg: 'Proveedor eliminado'
        } );
    }
    catch(error){
        console.log(error);
    }
}