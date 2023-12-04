var gradoService = require('../service/grado.service')

class GradoController {
    async getAll(req, res) {
        try {
            const grados = await gradoService.getAll();
            res.json(grados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { nombreGrado, persId } = req.body;
            const grado = await gradoService.create({ nombreGrado,persId });
            if (grado) {
                res.json(grado);
            } else {
                res.status(404).json({ error: 'Grado no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async update(req,res){
        try {
            const {id} = req.params;
            const {nombreGrado, persId} = req.body;
            const grado = await gradoService.update(parseInt(id,10),{nombreGrado, persId});
            if (grado) {
                res.json(grado);
            } else {
                res.status(404).json({ error: 'Grado no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
}
module.exports = new GradoController();