import { DataTypes } from "sequelize";
import db from '../config/db.js';



const Distribuidores = db.define('distribuidores', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


export default Distribuidores;