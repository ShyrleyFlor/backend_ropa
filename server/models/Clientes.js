import { DataTypes } from "sequelize";
import db from "../config/db.js";

/*para listar a los clientes debemos tener encuenta
- deuda > 0 (Pendiente)
- deuda = 0 (Pagado)
- createdAt (cuando empezo o se registro la deuda)
- updatedAt (cuando se actualizo la deuda)

PARA LISTAR A LOS CLIENTES DEBEMOS ORDENAR POR: deuda (de mayor a menos)

-> monto_total: es el monto total que se debe y debe mantenerse para tener un historial de cuanto debio esa persona
-> descripcion: es una descripcion de porque esta debiendo o cuales son las cosas por las que debe
OBS: se debe contemplar que quie se puede repetir la deuda con el cliente, es decir no haremos un control de 
repetido y si esta eliminado se mantiene eliminado y se crea uno nuevo*/


const Clientes = db.define("clientes", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    //cambiara de valor segun lo que se vaya ingresando/pagando
    deuda: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export default Clientes