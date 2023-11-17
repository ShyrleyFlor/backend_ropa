import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Ventas from "./Ventas.js";

const Productos = db.define("productos", {
    //descripcion del producto(remera[20.000])
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //tamaño -> [s, m, l, xl]
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //tipo -> [remera, pantalon, etc]
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //subtipo -> [manga corta, larga, etc]
    subtipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //precio
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    //cantidad
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //sexo -> [masculino, femenino, niño, niña, bebe, beba]
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

Ventas.belongsToMany(Productos, {
    through: 'VentasProductos',
    foreignKey: 'productoId',
    otherKey: 'ventaId',
    where: { eliminado: false }
});


export default Productos;
