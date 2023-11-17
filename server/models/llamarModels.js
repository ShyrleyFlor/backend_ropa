import usuario from './Usuario.js';
import Distribuidores from './Distribuidores.js';
import Categorias from './Categorias.js';
import Compras from './Compras.js';
import Productos from './Productos.js';
import Ventas from './Ventas.js';
import VentasProductos from './VentasProductos.js';
import Clientes from './Clientes.js';
import { registrar } from '../controllers/usuarioControllers.js';

//uno a muchos
Categorias.hasMany(Productos)
Productos.belongsTo(Categorias)

//uno a muchos
Distribuidores.hasMany(Compras)
Compras.belongsTo(Distribuidores);

//agregar usuario
const gerente = {
  user: 'Gerente',
  password: '654321',
  token: 1
};
registrar({ body: gerente }, null);

const vendedor = { 
  user: 'Vendedor',
  password: '123456',
  token: 0
}
registrar({ body: vendedor }, null);

export {
    usuario,
    Distribuidores,
    Categorias,
    Compras,
    Productos,
    Ventas,
    VentasProductos,
    Clientes
}