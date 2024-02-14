const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class PeriodoService {
    
    async getAll() {
        try {
            const periodos = await prisma.periodo.findMany();
            return periodos;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los periodos: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const periodo = await prisma.periodo.findUnique({
                where: {
                    id
                }
            });
            return periodo;
        } catch (error) {
            throw new Error(`No se pudo obtener el periodo: ${error.message}`);
        }
    }
    async create({ anioLectivo, estado}) {
        try {
            const es = await prisma.periodo.create({
                data: {
                    anioLectivo,
                    estado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar un periodo: ${error.message}`)
        }
    }
   async update(id, {anioLectivo, estado}) {
        try {
            const es = await prisma.periodo.update({
                where: {
                    id
                },
                data: {
                    anioLectivo,
                    estado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede actualizar el periodo: ${error.message}`)
        }
    }
}

module.exports = new PeriodoService();
