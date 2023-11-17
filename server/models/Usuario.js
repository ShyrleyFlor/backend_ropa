import { DataTypes } from "sequelize";
import db from '../config/db.js';

//creamos nuestra tabla de usuarios
const Usuario = db.define('usuarios', {
    user: {
        //tipo de dato 
        type: DataTypes.STRING,
        //esto es para que no vaya vacio 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    token: DataTypes.BOOLEAN
});


export default Usuario;