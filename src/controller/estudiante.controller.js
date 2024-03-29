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
  async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const estudiante = await estudianteService.getStudentById(parseInt(id, 10));
      if (estudiante) {
        res.json(estudiante);
      } else {
        res.status(404).json({ error: 'Estudiante no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createStudent(req, res){
    try{
      const { nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona } = req.body;
      const estudiante = await estudianteService.createStudent({nombre,apellido,cedula,fechaNacimiento,direccion,correo,celular,tipoPersona: tipoPersona || 'E'});
      if (estudiante) {
        res.json(estudiante);
      } else {
        res.status(404).json({ error: 'Estudiante no encontrada' });
      }
    }catch(error){
      res.status(500).json({error: error.message})
    }
  }
  async updateStudent(req, res){
    try{ 
      const {id} = req.params;
      const {nombre, apellido, direccion, correo, celular} = req.body;
      const estudiante = await estudianteService.updateStudent(parseInt(id, 10),{
        nombre,
        apellido,
        direccion,
        correo,
        celular
      });
      res.json(estudiante)
    }catch(error){
      res.status(500).json({error: error.message})
    }
  }
  async estudianteDisponible(req,res){
    try{
      const estudianteDisponible = await estudianteService.estudianteDisponible();
      res.json(estudianteDisponible);
    }catch(error){
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new EstudianteController();
