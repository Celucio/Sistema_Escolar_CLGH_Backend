const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class GradoService {

    async getAll() {
        try {
            const grados = await prisma.grado.findMany({
                include:{
                    persona:{
                        select:{
                            nombre: true,
                            apellido: true
                        }
                    }
                }
            });
            return grados;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los grados: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const grado = await prisma.grado.findUnique({
                where: {
                    id
                },
                include: {
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    }
                }
            });
            return grado;
        } catch (error) {
            throw new Error(`No se pudo encontrar el grado: ${error.message}`);
        }
    }
    async create({ nombreGrado, persId }) {
        try {
            const persona = await prisma.persona.findUnique({
                where: {
                    id: parseInt(persId,10)
                }
            });
            
            if (!persona || persona.tipoPersona !== 'D') {
                throw new Error('Sólo se pueden ingresar docentes');
            }
            return prisma.grado.create({
                data: {
                  nombreGrado,
                  persId
                }
              });
        } catch (error) {
            throw new Error(`El docente ya pertenece a un grado, no se puede crear: ${error.message}`)
        }
    }
    async update(id, {nombreGrado, persId}) {
        try {
            const es = await prisma.grado.update({
                where: {
                    id
                },
                data: {
                    nombreGrado,
                    persId
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede actualizar el grado: ${error.message}`)
        }
    }
}

module.exports = new GradoService();
