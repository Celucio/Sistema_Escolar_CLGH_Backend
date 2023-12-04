const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class ActividadService {
    async getAll() {
        try {
            const actividades = await prisma.actividadesEducativas.findMany({
                include: {
                    periodoCalificaciones: {
                        select: {
                            nombrePeriodo: true
                        }
                    },
                    tipoActividad: {
                        select: {
                            nombreActividad: true
                        }
                    }
                }
            });
            return actividades;
        } catch (error) {
            throw new Error(`No se pudieron obtener: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const actividades = await prisma.actividadesEducativas.findUnique({
                where: { id }
            });
            return actividades;
        } catch (error) {
            throw new Error(`No se pudo obtener por ID: ${error.message}`);
        }
    }
    async create({ titulo, detalleActividad, fechaInicio, fechaFin, tipoActId, perCalId, asignaturaId }) {
        try {
            // Asegúrate de que fechaNacimiento sea un objeto Date
            const fechaInicio = new Date(fechaInicio);
            const fechaFin =new Date(fechaFin)

            // Verifica si fechaNacimiento es un objeto Date válido
            if (isNaN(fechaInicioDate.getTime())) {
                throw new Error('Fecha de nacimiento no válida.');
            }
            if (isNaN(fechaFinDate.getTime())) {
                throw new Error('Fecha de nacimiento no válida.');
            }
            // Convierte la fecha a formato ISO-8601
            const fechaInicioISO = fechaInicioDate.toISOString();
            const fechaFinISO = fechaFinDate.toISOString();
            const act = await prisma.actividadesEducativas.create({
                data: {
                    titulo,
                    detalleActividad,
                    fechaInicio: fechaInicioISO,
                    fechaFin:fechaFinISO,
                    tipoActId,
                    perCalId,
                    asignaturaId
                }
            });
            return act;
        } catch (error) {
            throw new Error(`No se puede agregar: ${error.message}`)
        }
    }
    async update(id, { titulo, detalleActividad, fechaInicio, fechaFin, tipoActId, perCalId, asignaturaId }) {

        try {
            const fechaI = new Date(fechaInicio);
            const fechaF = new Date(fechaFin);
            if (isNaN(fechaI&&fechaF.getTime())) {
                throw new Error('Fecha no válida.');
            }
            const fechaInISO = fechaI.toISOString();
            const fechaFinISO = fechaF.toISOString();
            const act = await prisma.actividadesEducativas.update({
                where: { id },
                data: {
                    titulo,
                    detalleActividad,
                    fechaInicio: fechaInISO,
                    fechaFin: fechaFinISO,
                    tipoActId,
                    perCalId,
                    asignaturaId
                }
            });
            return act;
        } catch (error) {
            throw new Error(`No se puede actualizar: ${error.message}`)
        }
    }
}

module.exports = new ActividadService();