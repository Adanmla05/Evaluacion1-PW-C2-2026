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

module.exports = {
    registrarIncidencia
};