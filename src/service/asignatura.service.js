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
                where: { id },
                include:{
                    grado:{
                        select:{
                            nombreGrado: true
                        }
                    }
                }
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
                    idGrado : parseInt(idGrado, 10)
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar una asignatura: ${error.message}`)
        }
    }

    
    async update(id, {nombreMateria, estado, idGrado}) {
        try {
            const es = await prisma.asignatura.update({
                where: {
                    id
                },
                data: {
                    nombreMateria,
                    estado,
                    idGrado
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede actualizar la asignatura: ${error.message}`)
        }
    }
    async getAllAsignaturasWithGrado() {
        try {
            const asignaturas = await prisma.asignatura.findMany({
                include: {
                    grado: {
                        select: {
                            id: true,  // Agrega el id del grado a la selección
                            nombreGrado: true
                        }
                    }
                }
            });
            return asignaturas.map(asignatura => ({
                idAsignatura: asignatura.id,  // Agrega el id de la asignatura
                nombreMateria: asignatura.nombreMateria,
                idGrado: asignatura.grado.id,  // Agrega el id del grado
                nombreGrado: asignatura.grado.nombreGrado,
                estadoMateria: asignatura.estado
            }));
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las asignaturas con grado: ${error.message}`);
        }
    }

    

}

module.exports = new AsignaturaService();