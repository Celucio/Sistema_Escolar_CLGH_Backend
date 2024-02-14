const personaService = require('../service/persona.service.js')

class PersonaController {
    async asignaturasPorIdPersona(req, res) {
        try {
            const { id } = req.params;
            const asignaturas = await personaService.asignaturasPorIdPersona(parseInt(id, 10));
            if (asignaturas) {
                res.json(asignaturas);
            } else {
                res.status(404).json({ error: 'Asignatura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async obtenerPersonaPorId(req, res) {
        try {
            const { id } = req.params;
            const persona = await personaService.obtenerPersonaPorId(parseInt(id, 10));
            if (persona) {
                res.json(persona);
            } else {
                res.status(404).json({ error: 'Persona no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PersonaController();