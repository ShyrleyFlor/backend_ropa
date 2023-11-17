import Categorias from "../models/Categorias.js";

//crear categorias
const crearCategorias = async (req, res) => {
    try {
        //verificamos si existe la categoría
        const categoria = await Categorias.findOne({
            where: {
                descripcion: req.body.descripcion
            }
        })

        if (categoria) {
            await categoria.update({
                eliminado: 0
            })
        } else {
            //creamos la categoría
            await Categorias.create({
                descripcion: req.body.descripcion,
                eliminado: 0
            })
        }

        //enviamos respuesta
        res.json({
            msg: 'Categoría creada'
        })
    } catch (error) {
        console.log(error)
    }
}

//listar categorias
const listarCategorias = async (req, res) => {
    try {
        //listamos todas las categorías
        const categorias = await Categorias.findAll({
            attributes: ["id","descripcion"],
            where: {
                eliminado: 0
            }
        });

        //enviamos respuesta
        res.json({
            categorias
        })
    } catch (error) {
        console.log(error)
    }
}

//listar una categoría
const listarUnaCategoria = async (req, res) => {
    try {
        //listamos la categoría
        const categorias = await Categorias.findOne({
            attributes: ["id","descripcion"],
            where: {
                id: req.params.id
            }
        });

        //enviamos respuesta
        res.json({
            categorias
        })
    } catch (error) {
        console.log(error)
    }
}

//editar categorias
const editarCategorias = async (req, res) => {
    try {
        //verificamos si existe la categoría
        const categoria = await Categorias.findOne({
            where: {
                descripcion: req.body.descripcion
            }
        })

        //si existe la categoria
        if (categoria) {
            //verificara si fue eliminado o no
            if(categoria.eliminado == 1){
                //actualizamos el eliminado
                await categoria.update({
                    descripcion: req.body.descripcion,
                    eliminado: 0
                },
                {
                    where: {
                        id: categoria.id
                    }
                })
                //eliminamos el que acabamos de ingresar
                await Categorias.update({
                    eliminado: 1},
                    {
                    where: {
                        id: req.params.id
                    }
                })
                
                res.json({
                    msg: 'Categoría editada'
                })
                

            }
            //si no esta eliminado muestra un mensaje de error
            else{
                res.status(400).json({
                    msg: 'La categoria ya existe'
                });
            }
        }else {
        //editamos la categoría
        await Categorias.update({descripcion: req.body.descripcion}, {
            where: {
                id: req.params.id
            }
        })

        //enviamos respuesta
        res.json({
            msg: 'Categoría editada'
        })

    }
    } catch (error) {
        console.log(error)
    }
}

//eliminar categorias (eliminado=1)
const eliminarCategorias = async (req, res) => {
    try {

        //eliminamos la categoría cambiando el estado de la variable (eliminado)
        await Categorias.update({
            eliminado: 1
        }, {
            where: {
                id: req.params.id
            }
        })

        //enviamos respuesta
        res.json({
            msg: 'Categoría eliminada'
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    crearCategorias,
    listarCategorias,
    listarUnaCategoria,
    editarCategorias,
    eliminarCategorias
}