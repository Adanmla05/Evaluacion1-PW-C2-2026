const incidencias = [];

const registrarIncidencia = (req, res) => {

const {
    empleado,
    descripcion,
    prioridad
} = req.body;


if (
    !empleado ||
    !descripcion ||
    !prioridad
) {
    return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
    });
}

    const nuevaIncidencia = {

    id: incidencias.length + 1,
    empleado,
    descripcion,
    prioridad,
    estado: "Pendiente"

};


incidencias.push(nuevaIncidencia);


return res.status(201).json({
    mensaje: "Incidencia registrada correctamente",
    incidencia: nuevaIncidencia
});


};

const listarIncidencias = (req, res) => {
    return res.status(200).json({
        incidencias: incidencias
    });
};

const buscarIncidenciaPorId = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es valido"
        });
    }

    const incidenciaEncontrada = incidencias.find(
        (incidencia) => incidencia.id === id
    );

    if (!incidenciaEncontrada) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    return res.status(200).json({
        incidencia: incidenciaEncontrada
    });
};

const cambiarEstadoIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es valido"
        });
    }

    const incidenciaEncontrada = incidencias.find(
        (incidencia) => incidencia.id === id
    );

    if (!incidenciaEncontrada) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    if (
        !estado ||
        typeof estado !== "string" ||
        estado.trim() === ""
    ) {
        return res.status(400).json({
            mensaje: "El estado es obligatorio"
        });
    }

    switch (estado.trim().toLowerCase()) {
        case "pendiente":
            incidenciaEncontrada.estado = "Pendiente";
            break;

        case "en proceso":
            incidenciaEncontrada.estado = "En proceso";
            break;

        case "resuelta":
            incidenciaEncontrada.estado = "Resuelta";
            break;

        case "cancelada":
            incidenciaEncontrada.estado = "Cancelada";
            break;

        default:
            return res.status(400).json({
                mensaje:
                    "El estado debe ser Pendiente, En proceso, Resuelta o Cancelada"
            });
    }

    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia: incidenciaEncontrada
    });
};

const eliminarIncidencia = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es valido"
        });
    }

    const indiceIncidencia = incidencias.findIndex(
        (incidencia) => incidencia.id === id
    );

    if (indiceIncidencia === -1) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    const incidenciaEliminada = incidencias.splice(
        indiceIncidencia,
        1
    )[0];

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: incidenciaEliminada
    });
};

const obtenerEstadisticas = (req,res)=>{

const totalIncidencias = incidencias.length;


const pendientes = incidencias.filter(
    incidencia => incidencia.estado === "Pendiente"
).length;


const enProceso = incidencias.filter(
    incidencia => incidencia.estado === "En proceso"
).length;


const resueltas = incidencias.filter(
    incidencia => incidencia.estado === "Resuelta"
).length;


const canceladas = incidencias.filter(
    incidencia => incidencia.estado === "Cancelada"
).length;



return res.status(200).json({

    totalIncidencias,
    pendientes,
    enProceso,
    resueltas,
    canceladas

});

};

const clasificarIncidencia = (req, res) => {

    const id = Number(req.params.id);

    const incidenciaEncontrada = incidencias.find(
        (incidencia) => incidencia.id === id
    );


    if (!incidenciaEncontrada) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }


    let clasificacion;


    switch (incidenciaEncontrada.prioridad.trim().toLowerCase()) {

        case "alta":
            clasificacion = "Crítica";
            break;

        case "media":
            clasificacion = "Importante";
            break;

        case "baja":
            clasificacion = "Normal";
            break;

        default:
            clasificacion = "No definida";
    }


    return res.status(200).json({
        id: incidenciaEncontrada.id,
        clasificacion
    });

};

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
};