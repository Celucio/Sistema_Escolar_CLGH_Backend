const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class MatriculaService {

    async getAll() {
        try {
            const matriculas = await prisma.matricula.findMany();
            return matriculas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las matriculas: ${error.message}`);
        }
    }

    async create({ estado, idPersona, idPeriodo, idGrado }) {
        try {
            const es = await prisma.matricula.create({
                data: {
                    estado,
                    idPersona,
                    idPeriodo,
                    idGrado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar la matricula: ${error.message}`)
        }
    }
}

module.exports = new MatriculaService();