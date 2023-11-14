const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class AsignaturaService {
    async getAllAsignatures() {
        try {
            const asignaturas = await prisma.asignatura.findMany();
            return asignaturas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las asignaturas: ${error.message}`);
        }
    }
    async getAsignatureById(id) {
        try {
            const asignatura = await prisma.asignatura.findMany({
                where: { id }
            });
            return asignatura;
        } catch (error) {
            throw new Error(`No se pudo obtener la asignatura por ID: ${error.message}`);
        }
    }
    async createAsignature({ nombreMateria, estado, idGrado}) {
        try {
            const es = await prisma.asignatura.create({
                data: {
                    nombreMateria,
                    estado,
                    idGrado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar una asignatura: ${error.message}`)
        }
    }
}

module.exports = new AsignaturaService();