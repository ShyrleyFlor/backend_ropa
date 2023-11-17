import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ventas = db.define("ventas", {
    //fecha de venta
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    //precio_total
    precio_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    //precio_descuento
    precio_descuento: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});



export default Ventas;