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
    async getById(req, res) {
        try {
            const { id } = req.params;
            const rol = await rolService.getById(parseInt(id, 10));
            if (rol) {
                res.json(rol);
            } else {
                res.status(404).json({ error: 'No encontrada' });
            }
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
    async update(req, res) {
        try {
            const {id} = req.params;
            const { nombreRol, estado } = req.body;
            const rol = await rolService.update(parseInt(id, 10), {nombreRol, estado});
            if (rol) {
                res.json(rol);
            } else {
                res.status(404).json({ error: 'No se logro actualizar' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new RolController();