import { DataTypes } from "sequelize";
import db from '../config/db.js';
import Ventas from "./Ventas.js";
import Productos from "./Productos.js";

const VentasProductos = db.define('VentasProductos', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  });

//muchos a muchos
Ventas.belongsToMany(Productos, {
    through: "VentasProductos",
});
Productos.belongsToMany(Ventas, {
  through: 'VentasProductos',
});

export default VentasProductos;