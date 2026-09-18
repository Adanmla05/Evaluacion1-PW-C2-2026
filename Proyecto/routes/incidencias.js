const express = require("express");
const router = express.Router();

const {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
} = require("../controllers/incidenciasController");

router.post("/", registrarIncidencia);

router.get("/estadisticas", obtenerEstadisticas);

router.get("/", listarIncidencias);

router.get("/:id", buscarIncidenciaPorId);

router.get("/:id/clasificacion", clasificarIncidencia);

router.put("/:id/estado", cambiarEstadoIncidencia);

router.delete("/:id", eliminarIncidencia);

module.exports = router;