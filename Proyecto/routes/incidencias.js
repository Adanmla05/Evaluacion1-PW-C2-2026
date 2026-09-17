const express = require("express");
const router = express.router();

const {
    registrarIncidencia
} = require("../controllers/incidenciasController");
router.post("/", registrarIncidencia);

module.exports = router;