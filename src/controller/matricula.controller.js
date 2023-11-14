var matriculaService = require('../service/matricula.service')

class MatriculaController {
    async getAll(req, res) {
        try {
            const matriculas = await matriculaService.getAll();
            res.json(matriculas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { estado, idPErsona, idPEriodo, idGrado } = req.body;
            const matricula = await matriculaService.create({ estado, idPErsona, idPEriodo, idGrado });
            if (matricula) {
                res.json(matricula);
            } else {
                res.status(404).json({ error: 'Matricula no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}
module.exports = new MatriculaController();