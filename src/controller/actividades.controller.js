var actividadService = require('../service/actividades.service.js');

class ActividadController{
    async getAll(req, res){
        try {
            const actividad = await actividadService.getAll();
            res.json(actividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req,res){
        try {
            const { id } = req.params;
            const actividades = await actividadService.getById(parseInt(id, 10));
            if (actividades) {
                res.json(actividades);
            } else {
                res.status(404).json({ error: 'No encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async create(req,res){
        try{
            const {titulo,detalleActividad,fechaInicio,fechaFin,tipoActId,perCalId,asignaturaId,estado} = req.body;
            const actividades = await actividadService.create({titulo,detalleActividad,fechaInicio,fechaFin, tipoActId, perCalId, asignaturaId,estado})
            if(actividades){
                res.json(actividades);
            }else{
                res.status(500).json({error: 'No se pudo agregar'})
            }
        }catch(error){
            console.log(error) 
            res.status(500)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const {titulo,detalleActividad,fechaInicio,fechaFin,tipoActId,perCalId,asignaturaId,estado} = req.body;
            const actividades = await actividadService.update(parseInt(id, 10),{
                titulo,
                detalleActividad,
                fechaInicio,
                fechaFin,
                tipoActId,
                perCalId,
                asignaturaId,
                estado
            });
            res.json(actividades);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    async actividadesPorPeriodoCalificaciones(req,res){
        try{
            const {perCalId, asignaturaId} = req.params;
            const actividades = await actividadService.actividadesPorPeriodoCalificaciones(parseInt(perCalId, 10), asignaturaId );
            res.json(actividades);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
    async actividadesPorAsignatura(req, res) {
        try {
            const { asignaturaId } = req.params;
            const actividades = await actividadService.actividadesPorAsignatura(parseInt(asignaturaId, 10));
            res.json(actividades);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new ActividadController();