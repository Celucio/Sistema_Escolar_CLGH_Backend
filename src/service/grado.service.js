const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class GradoService {
    
    async getAll() {
        try {
            const grados = await prisma.grado.findMany();
            return grados;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los grados: ${error.message}`);
        }
    }
  
    async create({ nombreGrado, persId}) {
        try {
            const es = await prisma.grado.create({
                data: {
                    nombreGrado,
                    persId
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar un grado: ${error.message}`)
        }
    }
}

module.exports = new GradoService();