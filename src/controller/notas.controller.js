const notaService = require('../service/notas.service.js')

class NotasController {
    async getAll(req, res) {
        try {
            const notas = await notaService.getAll();
            res.json(notas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const notas = await notaService.getById(parseInt(id, 10));
            if (notas) {
                res.json(notas);
            } else {
                res.status(404).json({ error: 'No encontrada' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async registrarNotasAsignatura(req, res){
        try {
            const { asignaturaId } = req.params

            try {
                const notasCreadas = await notaService.crearNotas(parseInt(asignaturaId, 10))
                res.json(notasCreadas)
        
            } catch (error) {
                console.error(error)
                res.status(500).json({ mensaje: 'Error registrando notas' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async notasEstudiante(req,res){
        try{
            const { id } = req.params
            const notasEstudiante = await notaService.notasEstudiante(id)
            res.json(notasEstudiante)
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }
    async asignarNota(req,res){
        try{
            const { id } = req.params
            const { valor_nota } = req.body
            const notaAsignada = await notaService.asignarNota(parseInt(id, 10), {
                valor_nota
            })
            res.json(notaAsignada)
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }
    async obtenerNotasPorActividadYAsignatura(req, res) {
        try {
            const { actividadId, asignaturaId, gradoId } = req.query;
            const notas = await notaService.getAllNotas(actividadId, asignaturaId, gradoId);
            res.json(notas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async obtenerNotasEstudiante(req, res) {
        try {
            const { idEstudiante, idAsignatura } = req.query;
            const notas = await notaService.obtenerNotasEstudiante(idEstudiante, idAsignatura);
            res.json(notas);
        } catch (error) {
            throw new Error(`No se pudieron obtener las notas del estudiante: ${error.message}`);
        }
    }
    async obtenerActividadesNotas(req, res) {
        try {
            const { actividadId, asignaturaId } = req.query;
            const notas = await notaService.obtenerActividadesNotas(actividadId, asignaturaId);
            res.json(notas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new NotasController();