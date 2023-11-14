const tipoService = require('../service/tipo.service.js');

class TipoController {
    async getAll(req, res) {
        try {
            const tipo = await tipoService.getAll();
            res.json(tipo);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async create(req, res) {
        try {
            const { nombreActividad } = req.body;
            const tipo = await tipoService.create({ nombreActividad });
            if (tipo) {
                res.json(tipo);
            } else {
                res.status(404).json({ error: 'No se logro crear' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async update(req, res){
        try{ 
          const {id} = req.params;
          const {nombreActividad} = req.body;
          const tipo = await tipoService.update(parseInt(id, 10),{
            nombreActividad
          });
          res.json(tipo)
        }catch(error){
          res.status(500).json({error: error.message})
        }
      }
}

module.exports = new TipoController();