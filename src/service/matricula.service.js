const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class MatriculaService {

    async getAll() {
        try {
            const matriculas = await prisma.matricula.findMany();
            return matriculas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los grados: ${error.message}`);
        }
    }

    async create({ estado, idPErsona, idPEriodo, idGrado }) {
        try {
            const es = await prisma.matricula.create({
                data: {
                    estado,
                    idPErsona,
                    idPEriodo,
                    idGrado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar un grado: ${error.message}`)
        }
    }
}

module.exports = new MatriculaService();