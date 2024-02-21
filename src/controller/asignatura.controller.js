var asignaturaService = require('../service/asignatura.service')

class AsignaturaController {
    async getAllAsignatures(req, res) {
        try {
            const asignaturas = await asignaturaService.getAllAsignatures();
            res.json(asignaturas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAsignatureById(req, res) {
        try {
            const { id } = req.params;
            const asignatura = await asignaturaService.getAsignatureById(id);
            if (asignatura) {
                res.json(asignatura);
            } else {
                res.status(404).json({ error: 'Asignatura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createAsignature(req, res) {
        try {
            const { nombreMateria, estado, idGrado } = req.body;
            const asignatura = await asignaturaService.createAsignature({ nombreMateria, estado, idGrado });
            if (asignatura) {
                res.json(asignatura);
            } else {
                res.status(404).json({ error: 'Asignatura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombreMateria, estado, idGrado } = req.body;
            const asignatura = await asignaturaService.update(parseInt(id, 10), { nombreMateria, estado, idGrado });
            if (asignatura) {
                res.json(asignatura);
            } else {
                res.status(404).json({ error: 'Asignatura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getAllAsignaturasWithGrado(req, res) {
        try {
            const asignaturas = await asignaturaService.getAllAsignaturasWithGrado();
            res.json(asignaturas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async asignaturaPorGrado(req, res) {
        try {
            const { id } = req.params;
            const asignaturas = await asignaturaService.asignaturaPorGrado(parseInt(id, 10));
            if (asignaturas) {
                res.json(asignaturas);
            } else {
                res.status(404).json({ error: 'Asignatura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async validarAsignaturaPorGrado(req, res) {
        try {
            const { nombreMateria, idGrado } = req.body;

            // Llamada directa a la función validarAsignaturaPorGrado
            const validacionExitosa = await validarAsignaturaPorGrado(nombreMateria, idGrado);

            if (!validacionExitosa) {
                return res.status(400).json({ error: `La asignatura '${nombreMateria}' ya existe en el grado con ID '${idGrado}'.` });
            }

            res.json({ mensaje: 'Validación exitosa' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }






}
module.exports = new AsignaturaController();