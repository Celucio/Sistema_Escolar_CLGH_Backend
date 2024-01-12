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
                    },
                    //aqui añadi para ver el nombre de la asignatura y agregarle
                    asignatura:	{
                        select:{
                            nombreMateria: true
                        }
                    }
                }
            });
            return actividades;
        } catch (error) {
            throw new Error(`No se puede actualizar: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const actividades = await prisma.actividadesEducativas.findUnique({
                where: { id }
            });
            return actividades;
        } catch (error) {
            throw new Error(`No se puede actualizar: ${error.message}`);
        }
    }
    async create({ titulo, detalleActividad, fechaInicio, fechaFin, tipoActId, perCalId, asignaturaId, estado }) {
        try {
            const fechaI = new Date(fechaInicio);
            const fechaF = new Date(fechaFin);
            if (isNaN(fechaI&&fechaF.getTime())) {
                throw new Error('Fecha no válida.');
            }
            const fechaInISO = fechaI.toISOString();
            const fechaFinISO = fechaF.toISOString();
            const act = await prisma.actividadesEducativas.create({
                data: {
                    titulo,
                    detalleActividad,
                    fechaInicio:fechaInISO,
                    fechaFin:fechaFinISO,
                    tipoActId,
                    perCalId,
                    asignaturaId,
                    estado
                }
            });
            return act;
        } catch (error) {
            throw new Error(`No se puede actualizar: ${error.message}`);
        }
    }
    async update(id, { titulo, detalleActividad, fechaInicio, fechaFin, tipoActId, perCalId, asignaturaId, estado }) {

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
                    asignaturaId,
                    estado
                }
            });
            return act;
        } catch (error) {
            throw new Error(`No se puede actualizar: ${error.message}`);
        }
    }
    async actividadesPorPeriodoCalificaciones(perCalId, asignaturaId) {
        try {
            let where = { perCalId }

            if(asignaturaId) {
            where.asignaturaId = parseInt(asignaturaId)  
            }
            const actividades = await prisma.actividadesEducativas.findMany({
                where,
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
            throw new Error(`No se puede actualizar: ${error.message}`);
        }
    }
    async actividadesPorAsignatura(asignaturaId) {
        try {
            const actividades = await prisma.actividadesEducativas.findMany({
                where: {
                    asignaturaId: parseInt(asignaturaId),
                },
                include: {
                    periodoCalificaciones: {
                        select: {
                            nombrePeriodo: true,
                        },
                    },
                    tipoActividad: {
                        select: {
                            nombreActividad: true,
                        },
                    },
                    asignatura: {
                        select: {
                            nombreMateria: true,
                        },
                    },
                },
            });
            return actividades;
        } catch (error) {
            throw new Error(`No se pueden obtener las actividades por asignatura: ${error.message}`);
        }
    }
    
}

module.exports = new ActividadService()
