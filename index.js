//aqui haremos todas las conexiones
import express from 'express';
import cookieParser from 'cookie-parser';
import db from './server/config/db.js';
import './server/models/llamarModels.js';
import userRoutes from './server/routes/usuarioRoutes.js';
import categoriasRoutes from './server/routes/categoriasRoutes.js';
import productosRoutes from './server/routes/productosRoutes.js';
import cookieSession from 'cookie-session';
import cors from 'cors';
import distribuidoresRoutes from './server/routes/distribuidoresRoutes.js';
import comprasRoutes from './server/routes/comprasRoutes.js';
import clientesRouter from './server/routes/clientesRoutes.js';
import ventasRouter from './server/routes/ventasRoutes.js';

//crear la app
const app = express();

//habilitar cors
app.use(cors());

//habilitar lectura de datos del formulario
app.use(express.urlencoded({ extended: true }));

//habilitar cookie-parser
app.use(cookieParser());

app.use(
    cookieSession({
        name: 'session',
        keys: ["COOKIE_SECRET"],
        httpOnly: true,
        sameSite:'strict'
    })
);

//middleware global
app.use(express.json());


//conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión a la BD exitosa');
} catch (error) {
    console.log(error);
}


//habilitar las rutas
app.use(userRoutes);
app.use(categoriasRoutes);
app.use(productosRoutes);
app.use(distribuidoresRoutes);
app.use(comprasRoutes);
app.use(clientesRouter);
app.use(ventasRouter);


//configuracion del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})