//importamos sequelize y dotenv
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const db = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      //al crear una tabla en la BD agrega dos columnas del tiempo de creacion y actualizacion
      timestamps: true,
    },
    //esto es para que en caso de que haya una conexion viva se siga usando y no se cree una nueva
    //max -> maximo de conexiones a mantener
    //min -> minimo de conexiones a mantener
    //acquire: 30000 -> 30.000 milisegundos, el tiempo que intentara acceder a la BD, antes de marcar un error
    //idle: 10000 -> 10.000 milisegundos, el tiempo necesario de inactividad para finalizar la conexión
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
    timezone: "-04:00", // Configura la zona horaria para Paraguay
  }
);

export default db;
