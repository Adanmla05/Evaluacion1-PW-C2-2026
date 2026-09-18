const express = require("express");
const router = express.Router();

const {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
} = require("../controllers/incidenciasController");

router.post("/", registrarIncidencia);

router.get("/estadisticas", obtenerEstadisticas);

router.get("/", listarIncidencias);

router.get("/:id", buscarIncidenciaPorId);

router.put("/:id/estado", cambiarEstadoIncidencia);

router.delete("/:id", eliminarIncidencia);

module.exports = router;