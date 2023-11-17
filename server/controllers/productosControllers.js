import Productos from "../models/Productos.js";
import Categorias from "../models/Categorias.js";

//crear productos
const crearProductos = async (req, res) => {
    try {

        //verificamos si existe el producto
        const producto = await Productos.findOne({
            where: {
                descripcion: req.body.descripcion,
                tamanho: req.body.tamanho,
                tipo: req.body.tipo,
                subtipo: req.body.subtipo,
                precio: req.body.precio,
                sexo: req.body.sexo,
                categoriaId: req.body.categoriaId,
            }
        })

        if (producto) {
            if (producto.eliminado == 1) {
                // Si existe y está eliminado, actualizamos el estado de eliminado para recuperarlo
                await producto.update({
                    eliminado: 0,
                    cantidad: req.body.cantidad
                });
                // Enviar respuesta
                res.json({
                    msg: 'Producto creado'
                });
            } else {
                // Si existe y no está eliminado, enviamos un mensaje de error indicando que el producto ya existe
                res.status(400).json({
                    msg: 'El producto ya existe'
                });
            }
        }else /*(!producto)*/ {
             //crear el producto
            await Productos.create({
                descripcion: req.body.descripcion,
                tamanho: req.body.tamanho,
                tipo: req.body.tipo,
                subtipo: req.body.subtipo,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                sexo: req.body.sexo,
                categoriaId: req.body.categoriaId,
                eliminado: 0
            });
            
            //enviar respuesta
            res.json({
                msg: 'Producto creado'
            })
        }

    } catch (error) {
        console.log(error)
        
    }
}

//listar productos
const listarProductos = async (req, res) => {
    try {
        //listamos los productos
        const productos = await Productos.findAll({
            attributes: {exclude: ["createdAt", "updatedAt", "eliminado", "categoriaId"]},
            include: {
                model: Categorias,
                attributes: ["descripcion"]
            },
            where: {
                eliminado: 0
            }
            
        });

        //enviar respuesta
        res.json({
            productos
        })
    } catch (error) {
        console.log(error)
    }
}

//listar un producto
const listarUnProducto = async (req, res) => {
    const { id } = req.params;
    try {
        //listamos el producto
        const producto = await Productos.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt", "eliminado", "categoriaId"]},
            include: {
                model: Categorias,
                attributes: ["id","descripcion"]
            },
            where: {
                eliminado: 0
            }
            
        });

        //enviar respuesta
        res.json({
            producto
        })

    } catch (error) {
        console.log(error)
    }
}

//editar un producto
const editarProducto = async (req, res) => {
    try {

        //verificamos si existe el producto
        const producto = await Productos.findOne({
            where: {
                descripcion: req.body.descripcion,
                tamanho: req.body.tamanho,
                tipo: req.body.tipo,
                subtipo: req.body.subtipo,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                sexo: req.body.sexo,
                categoriaId: req.body.categoriaId
            }
        })
        //si existe el producto
        if(producto){
            if(producto.eliminado == 1){
                // Si existe y está eliminado, actualizamos el estado de eliminado para recuperarlo
                await producto.update({
                    descripcion: req.body.descripcion,
                    tamanho: req.body.tamanho,
                    tipo: req.body.tipo,
                    subtipo: req.body.subtipo,
                    precio: req.body.precio,
                    cantidad: req.body.cantidad,
                    sexo: req.body.sexo,
                    categoriaId: req.body.categoriaId,
                    eliminado: 0
                },
                    {
                    where: {
                        id: producto.id
                    }
                });
                //eliminamos el que acabamos de ingresar
                await Productos.update({
                    eliminado: 1
                },
                {
                    where: {
                        id: req.params.id
                    }
                })
                // Enviar respuesta
                res.json({
                    msg: 'Producto editado'
                })
            }else{
                // Si existe y no está eliminado, enviamos un mensaje de error indicando que el producto ya existe
                res.status(400).json({
                    msg: 'El producto ya existe'
                });
            }
        }else{

        //editamos el producto
        await Productos.update({
            descripcion: req.body.descripcion,
            tamanho: req.body.tamanho,
            tipo: req.body.tipo,
            subtipo: req.body.subtipo,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            sexo: req.body.sexo,
            categoriaId: req.body.categoriaId
        }, {
            where: {
                id: req.params.id
            }
        });

        //enviamos respuesta
        res.json({
            msg: 'Producto editado'
        })
    }

    } catch (error) {
        console.log(error)
    }
}

//eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        //eliminamos el producto
        await Productos.update({
            eliminado: 1
        }, {
            where: {
                id
            }
        });

        //enviamos respuesta
        res.json({
            msg: 'Producto eliminado'
        })

    } catch (error) {
        console.log(error)
    }
}

export {
    crearProductos,
    listarProductos,
    listarUnProducto,
    editarProducto,
    eliminarProducto
}

