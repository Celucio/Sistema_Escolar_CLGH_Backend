const perCalService = require('../service/perCalificaciones.service.js')

class PeriodoCalController {
    async getAll(req, res) {
        try {
            const perCal = await perCalService.getAll();
            res.json(perCal);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const perCal = await perCalService.getById(parseInt(id, 10));
            if (perCal) {
                res.json(perCal);
            } else {
                res.status(404).json({ error: 'Periodo no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async create(req, res) {
        try {
            const { nombrePeriodo,estado } = req.body;
            const perCal = await perCalService.create({ nombrePeriodo,estado });
            if (perCal) {
                res.json(perCal);
            } else {
                res.status(404).json({ error: 'No se logro crear' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombrePeriodo,estado } = req.body;
            const perCal = await perCalService.update(parseInt(id, 10), {
                nombrePeriodo,
		estado
            });
            res.json(perCal)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new PeriodoCalController();
