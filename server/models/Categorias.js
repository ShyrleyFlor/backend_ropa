import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Categorias = db.define('categorias', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default Categorias;