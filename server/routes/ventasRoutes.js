import express from "express";

import {
    registrarVentaConProductos,
    actualizarVentaConProductos,
    listarVentasConProductos,
    listarUnaVenta,
    eliminarVenta
} from "../controllers/ventasControllers.js";
  
const router = express.Router();

router.post("/ventas/crear", registrarVentaConProductos);
router.put("/ventas/editar/:id", actualizarVentaConProductos);
router.get("/ventas/listar", listarVentasConProductos);
router.get("/ventas/listar/:id", listarUnaVenta);
router.patch("/ventas/eliminar/:id", eliminarVenta);

export default router;
