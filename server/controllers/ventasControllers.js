//importamos el modelo de ventas y productos asi como la relacion entre ellas
// controllers/ventaProductoController.js
import Categorias from '../models/Categorias.js';
import Productos from '../models/Productos.js';
import Ventas from '../models/Ventas.js';
import VentaProducto from '../models/VentasProductos.js';

// Controlador para registrar una venta con productos
async function registrarVentaConProductos(req, res) {
  try {
    const { fecha, precio_total, precio_descuento, productos } = req.body;


    // Crea la venta
    const venta = await Ventas.create({
      fecha,
      precio_total,
      precio_descuento,
      eliminado: 0
    });

  
  // Asocia los productos a la venta en la tabla ventaproducto
  for (const producto of productos) {
  // Verificar si el producto existe en la tabla productos
  const productoExistente = await Productos.findByPk(producto.productoId);
  const cantidadProducto = producto.cantidad;
  if (!productoExistente) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  if(cantidadProducto > productoExistente.cantidad){
    return res.status(400).json({ mensaje: 'La cantidad no puede ser mayor a la existente' });
  }

  await VentaProducto.create({
    productoId: producto.productoId,
    cantidad: cantidadProducto,
    ventaId: venta.id,
    eliminado: 0
  });

   //actualiza el valor de la cantidad de un producto
   await Productos.update(
     { cantidad: productoExistente.cantidad - producto.cantidad },
     { where: { id: productoExistente.id } }
   );
}


    return res.status(201).json({ mensaje: 'Venta registrada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Controlador para actualizar una venta y sus productos
async function actualizarVentaConProductos(req, res) {
  try {
    const { fecha, precio_total, precio_descuento, productos } = req.body;

    // Obtiene la venta
    const venta = await Ventas.findByPk(req.params.id);
    
    //verificamos si existe la venta
    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Actualiza la venta
    await Ventas.update(
      { fecha, precio_total, precio_descuento }, 
      {where: {id: req.params.id}}
    );

    // Asocia los productos actualizados a la venta que esta en la tabla ventaproducto
    for (const producto of productos) {
      // Verificar si el producto existe en la tabla productos
      const productoExistente = await Productos.findByPk(producto.productoId);
      const cantidadProducto = producto.cantidad
      if (!productoExistente) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      if(cantidadProducto > productoExistente.cantidad){
        return res.status(400).json({ mensaje: 'La cantidad no puede ser mayor a la existente' });
      }

    
      await VentaProducto.update(
        {productoId: producto.productoId,
        cantidad: cantidadProducto,
        eliminado: 0},
        {where: {ventaId: venta.id}}
      );

      //actualiza el valor de la cantidad de un producto
      await Productos.update(
        { cantidad: productoExistente.cantidad - producto.cantidad },
        { where: { id: productoExistente.id } }
      );
    }

    

    return res.status(200).json({ mensaje: 'Venta actualizada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Controlador para listar todas las ventas con sus productos
async function listarVentasConProductos(req, res) {
  try {
    const ventas = await Ventas.findAll({
      attributes: {exclude: ["createdAt", "updatedAt", "eliminado"]},
      include: [{ 
        model: Productos,
        attributes: {exclude: ["createdAt", "updatedAt", "eliminado", "categoriaId"]},
        through: {
          attributes: ["cantidad"]
        },
        include: [{
          model: Categorias,
          attributes: ["descripcion"],
        }],
       }],
       where: {
        eliminado: 0
      }
    });

    return res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Controlador para listar una venta con sus productos
async function listarUnaVenta(req, res) {
  try {
    const venta = await Ventas.findByPk(req.params.id, {
      attributes: {exclude: ["createdAt", "updatedAt", "eliminado"]},
      include: [{ 
        model: Productos,
        attributes: {exclude: ["createdAt", "updatedAt", "eliminado", "categoriaId"]},
        through: {
          attributes: ["cantidad"]
        },
        include: [{
          model: Categorias,
          attributes: ["descripcion"],
        }],
       }],
       where: {
        eliminado: 0
      }
    });

    return res.status(200).json(venta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Controlador para eliminar una venta actualizando el campo 'eliminado' a 1
async function eliminarVenta(req, res) {
  try {
    await Ventas.update({ eliminado: 1 }, { where: { id: req.params.id } });
    // Elimina las asociaciones actuales de productos para esta venta
    await VentaProducto.update({eliminado: 1},{ where: { ventaId: req.params.id } });

    return res.status(200).json({ mensaje: 'Venta eliminada' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}


export {
  registrarVentaConProductos,
  actualizarVentaConProductos,
  listarVentasConProductos,
  listarUnaVenta,
  eliminarVenta
};

