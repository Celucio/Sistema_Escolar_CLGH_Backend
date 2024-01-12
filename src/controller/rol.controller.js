const rolService = require('../service/rol.service.js');

class RolController {
    async getAll(req, res) {
        try {
            const rol = await rolService.getAll();
            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async create(req, res) {
        try {
            const { nombreRol, estado } = req.body;
            const rol = await rolService.create({ nombreRol, estado });
            if (rol) {
                res.json(rol);
            } else {
                res.status(404).json({ error: 'No se logro crear' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new RolController();