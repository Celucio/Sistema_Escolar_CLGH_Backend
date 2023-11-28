var personaRolService = require('../service/personaRol.service');

class PersonaRolController {
    async getAll(req, res) {
        try {
            const personaRol = await personaRolService.getAll();
            res.json(personaRol);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const {
                rolId,
                personaId,
                estado
            } = req.body;
            const personaRol = await personaRolService.create({
                rolId,
                personaId,
                estado
            });

            if (personaRol) {
                res.json(personaRol);
            } else {
                res.status(404).json({
                    error: 'No se logro crear'
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


}

module.exports = new PersonaRolController();