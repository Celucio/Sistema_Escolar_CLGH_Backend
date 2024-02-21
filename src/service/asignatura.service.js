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
    async createAsignature({ nombreMateria, estado, idGrado }) {
        try {
            // Validar si la asignatura ya existe en el grado antes de crearla
            await this.validarAsignaturaPorGrado(nombreMateria, idGrado);
    
            // Crear la asignatura si la validación es exitosa
            const nuevaAsignatura = await prisma.asignatura.create({
                data: {
                    nombreMateria,
                    estado,
                    idGrado: parseInt(idGrado, 10)
                }
            });
            return nuevaAsignatura;
        } catch (error) {
            throw new Error(`No se puede agregar una asignatura: ${error.message}`);
        }
    }
    
    async validarAsignaturaPorGrado(nombreMateria, idGrado) {
        try {
            const asignaturaExistente = await prisma.asignatura.findFirst({
                where: {
                    nombreMateria,
                    idGrado
                }
            });
            if (asignaturaExistente) {
                throw new Error(`La asignatura '${nombreMateria}' ya existe en el grado con ID '${idGrado}'.`);
            }
            // Si no hay asignatura existente con el mismo nombre en el mismo grado, la validación es exitosa.
            return true;
        } catch (error) {
            throw new Error(`Error al validar asignatura por grado: ${error.message}`);
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
    async asignaturaPorGrado(id) {
        try {
            const asignaturas = await prisma.asignatura.findMany({
                where: { idGrado: id },
                include:{
                    grado:{
                        select:{
                            nombreGrado: true
                        }
                    }
                }
            });
            return asignaturas;
        } catch (error) {
            throw new Error(`No se pudo obtener la asignatura por ID: ${error.message}`);
        }
    }
}

module.exports = new AsignaturaService();