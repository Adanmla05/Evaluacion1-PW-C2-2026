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
    if (
        empleado.trim() === "" ||
        descripcion.trim() === "" ||
        prioridad.trim() === ""
    ) {
        return res.status(400).json({
            mensaje: "No se permiten campos vacíos"
        });
    }

    if (
        prioridad !== "Alta" &&
        prioridad !== "Media" &&
        prioridad !== "Baja"
    ) {
        return res.status(400).json({
            mensaje: "La prioridad debe ser Alta, Media o Baja"
        });
    }

    const nuevaIncidencia = {
        id: incidencias.length + 1,
        empleado: empleado,
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "Pendiente"
    };
    incidencias.push(nuevaIncidencia);

    return res.status(201).json({
        mensaje: "Incidencia registrada correctamente",
        incidencia: nuevaIncidencia
    });
};

const cambiarEstadoIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    //Validacion que el ID sea un numero entero positivo
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es valido"
        });
    }

    //Busqueda de incidencia por su ID
    const incidenciaEncontrada = incidencias.find(
        (incidencia) => incidencia.id === id
    );

    if (!incidenciaEncontrada) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    if (!estado || typeof estado !== "String" || estado.trim() === ""){
        return res.status(400).json({
            mensaje: "El estado es obligatorio"
        });
    }

    switch (estado.trim().toLowerCase()){
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
                mensaje: "El estado debe ser Pendiente, En proceso, Resuelta o Cancelada"
            });
    }

    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia: incidenciaEncontrada
    });
};

//Eliminar incidencia
const eliminarIncidencia = (req, res)  => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID proporcionado no es valido"
        });
    }

    const indiceIncidencia = incidencias.findIndex(
        (incidencia) => incidencia.id === id
    );

    if(indiceIncidencia === -1){
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    const incidenciaEliminada =incidencias.splice(
        indiceIncidencia, 1
    )[0];

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: incidenciaEliminada
    });
};

module.exports = {
    registrarIncidencia,
    cambiarEstadoIncidencia,
    eliminarIncidencia
};