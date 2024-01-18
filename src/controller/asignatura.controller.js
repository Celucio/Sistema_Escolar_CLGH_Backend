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
  

    
}
module.exports = new AsignaturaController();