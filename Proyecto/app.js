const express = require('express');
const incidenciasController = require('./controllers/incidenciasController');
const incidencias = require('./routes/incidencias');
const helpers = require('./utils/helpers');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/incidencias', incidencias); 

app.listen(port, () => {
  console.log(`Servidor se encuentra ejecutando en http://localhost:${port}`);
});

