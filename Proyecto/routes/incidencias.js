const express = require("express");
const router = express.Router();

const {
    registrarIncidencia,
    cambiarEstadoIncidencia,
    eliminarIncidencia
} = require("../controllers/incidenciasController");

router.post("/", registrarIncidencia);
router.put("/:id/estado", cambiarEstadoIncidencia);
router.delete("/:id", eliminarIncidencia);

module.exports = router;