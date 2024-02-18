const adminService = require('../service/admin.service.js');

class AdminController {
    async getAll(req, res) {
        try {
            const admin = await adminService.getAll();
            res.json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const admin = await adminService.getById(parseInt(id, 10));
            if (admin) {
                res.json(admin);
            } else {
                res.status(404).json({ error: 'No encontrada' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAdminByCi(req, res) {
        try {
            const { cedula } = req.params;
            const admin = await adminService.getAdminByCi(cedula);
            if (admin) {
              res.json(admin);
            } else {
              res.status(404).json({ error: 'Admin no encontrado' });
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    async getAdminByCorreo(req, res) {
      try {
        const { correo } = req.params;
        const admin = await adminService.getAdminByCorreo(correo);
        if (admin) {
          res.json(admin);
        } else {
          res.status(404).json({ error: 'Admin no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
      
  async getAdminByCelular(req, res) {
    try {
      const { celular } = req.params;
      const admin = await adminService.getAdminByCelular(celular);
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).json({ error: 'Admin no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
    async create(req, res) {
        try {
            const { nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona } = req.body;
            const admin = await adminService.createAdmin({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona: tipoPersona || 'A' });
            if (admin) {
                res.json(admin);
            } else {
                res.status(500).json({ error: 'No se pudo agregar' });
            }
        } catch (error) {
            console.log(error)
            res.status(500)
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, apellido, direccion, correo, celular } = req.body;
            const admin = await adminService.updateAdmin(parseInt(id, 10), {
                nombre,
                apellido,
                direccion,
                correo,
                celular
            });
            res.json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new AdminController();