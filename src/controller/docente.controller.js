var docenteService = require('../service/docente.service')

class DocenteController {
    async getAllTeachers(req, res) {
        try {
            const docentes = await docenteService.getAllTeachers();
            res.json(docentes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getTeacherByCi(req, res) {
        try {
            const { cedula } = req.params;
            const docente = await docenteService.getTeacherByCi(cedula);
            if (docente) {
                res.json(docente);
            } else {
                res.status(404).json({ error: 'Estudiante no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getTeacherById(req, res) {
        try {
            const { id } = req.params;
            const docente = await docenteService.getTeacherById(parseInt(id,10));
            if (docente) {
                res.json(docente);
            } else {
                res.status(404).json({ error: 'Estudiante no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createTeacher(req, res) {
        try {
            const { nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona } = req.body;
            const docente = await docenteService.createTeacher({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona: tipoPersona || 'D' });
            if (docente) {
                res.json(docente);
            } else {
                res.status(404).json({ error: 'No se pudo agregar un docente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateTeacher(req, res){
        try{ 
          const {id} = req.params;
          const {nombre, apellido, direccion, correo, celular} = req.body;
          const docente = await docenteService.updateTeacher(parseInt(id, 10),{
            nombre,
            apellido,
            direccion,
            correo,
            celular
          });
          res.json(docente)
        }catch(error){
          res.status(500).json({error: error.message})
        }
    }
    async docenteDisponible(req,res){
        try{
            const docenteDisponible = await docenteService.docenteDisponible();
            res.json(docenteDisponible);
        }catch(error){
            res.status(500).json({ error: error.message })
        }
    }
}
module.exports = new DocenteController();
