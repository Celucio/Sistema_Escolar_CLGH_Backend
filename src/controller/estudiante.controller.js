const estudianteService = require('../service/estudiante.service')

class EstudianteController {
    async getAllStudents(req, res) {
        try {
            const estudiantes = await estudianteService.getAllStudents();
            res.json(estudiantes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getStudentByCi(req, res) {
        try {
          const { cedula } = req.params;
          const estudiante = await estudianteService.getStudentByCi(cedula);
          if (estudiante) {
            res.json(estudiante);
          } else {
            res.status(404).json({ error: 'Estudiante no encontrada' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
}

module.exports = new EstudianteController();