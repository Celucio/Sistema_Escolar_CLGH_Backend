const notaService = require('../service/notas.service.js')

class NotasController {
    async getAll() {

    }
}
const registrarNotasAsignatura = async (req, res) => {

    const { asignaturaId } = req.params

    try {
        const notasCreadas = await notaService.registrarNotas(asignaturaId)
        res.json(notasCreadas)

    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error registrando notas' })
    }

}

module.exports = {
    registrarNotasAsignatura
}
module.exports = new NotasController();