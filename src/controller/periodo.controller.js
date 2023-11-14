var periodoService = require('../service/periodo.service')

class PeriodoController {
    async getAll(req, res) {
        try {
            const periodos = await periodoService.getAll();
            res.json(periodos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { anioLectivo, estado } = req.body;
            const periodo = await periodoService.create({ anioLectivo, estado });
            if (periodo) {
                res.json(periodo);
            } else {
                res.status(404).json({ error: 'Periodo no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}
module.exports = new PeriodoController();