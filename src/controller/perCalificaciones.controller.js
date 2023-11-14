const perCalService = require('../service/perCalificaciones.service.js')

class PeriodoCalController{
    async getAll(req, res){
        try{
            const perCal = await perCalService.getAll();
            res.json(perCal);
        }catch(error){
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new PeriodoCalController();
