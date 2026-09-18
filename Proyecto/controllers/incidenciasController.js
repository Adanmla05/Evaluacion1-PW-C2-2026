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
