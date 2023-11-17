import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Compras = db.define("compras", {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


export default Compras