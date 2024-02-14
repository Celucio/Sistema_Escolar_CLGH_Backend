const { PrismaClient } = require('@prisma/client');
const { es } = require('date-fns/locale');

const prisma = new PrismaClient();

class NotaService {
    async getAll() {
        try {
            const notas = await prisma.act_Est_Notas.findMany({
                include: {
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    },
                    actividades: {
                        select: {
                            titulo: true,
                            detalleActividad: true,
                            asignatura: {
                                select: {
                                    nombreMateria: true,
                                    grado: {
                                        select: {
                                            nombreGrado: true
                                        }

                                    }
                                }

                            }
                        }
                    }

                }
            });
            return notas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const notas = await prisma.act_Est_Notas.findUnique({
                where: { id },
                include: {
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    },
                    actividades: {
                        select: {
                            titulo: true,
                        }
                    }
                }
            });
            return notas;
        } catch (error) {
            throw new Error(`No se pudo obtener por ID: ${error.message}`);
        }
    }
    async crearNotas(asignaturaId) {
        try {
            console.log('Recibiendo solicitud para cargar notas. Asignatura ID:', asignaturaId);
            // Obtener el grado de la asignatura  
            const asignatura = await prisma.asignatura.findUnique({
                where: { id: asignaturaId },
                select: { idGrado: true }
            });

            const idGrado = asignatura.idGrado;

            // Filtrar matriculas por ese grado
            const estudiantes = await prisma.matricula.findMany({
                where: { idGrado },
                include: { persona: true }
            });

            const actividades = await prisma.actividadesEducativas.findMany({
                where: { asignaturaId }
            });

            const notasCreadas = [];

            // Crear notas para cada estudiante y actividad
            for (let estudiante of estudiantes) {
                for (let actividad of actividades) {
                    // Verificar si ya existe una nota para esta combinación de estudiante y actividad
                    const notaExistente = await prisma.act_Est_Notas.findFirst({
                        where: {
                            personaId: estudiante.idPersona,
                            actId: actividad.id
                        }
                    });

                    if (!notaExistente) {
                        const nuevaNota = await prisma.act_Est_Notas.create({
                            data: {
                                personaId: estudiante.idPersona,
                                actId: actividad.id,
                                valor_nota: 0
                            }
                        });

                        notasCreadas.push(nuevaNota);
                        console.log(`Nota creada para estudiante ${estudiante.idPersona} y actividad ${actividad.id}`)
                    } else {
                        console.log(`Ya existe una nota para estudiante ${estudiante.idPersona} y actividad ${actividad.id}`);
                    }
                }
            }

            return notasCreadas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`);
        }
    }

    async notasEstudiante(id) {
        try {
            const notasEstudiante = await prisma.act_Est_Notas.findMany({
                where: {
                    persona: {
                        id: parseInt(id, 10)
                    }
                },
                select: {
                    valor_nota: true,
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    }
                }
            });
            return notasEstudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`)
        }
    }
    async obtenerActividadesNotas(actividadId, asignaturaId){
        try {
            const filtro = {
                include: {
                    persona: true,
                    actividades: {
                        include: {
                            asignatura: true
                        }
                    }
                },
                where: {}
            };

            // Agregar condiciones si se proporcionan los parámetros
            if (actividadId) filtro.where.actId = parseInt(actividadId);
            if (asignaturaId) filtro.where = {
                ...filtro.where,
                'actividades': {
                    'asignatura': {
                        'id': parseInt(asignaturaId)
                    }
                }
            };

            const notas = await prisma.act_Est_Notas.findMany(filtro);
            return notas.map(nota => {
                return {
                    nombre: nota.persona.nombre,
                    apellido: nota.persona.apellido,
                    tituloActividad: nota.actividades.titulo,
                    fechaInicio: nota.actividades.fechaInicio,
                    nota: nota.valor_nota,
                    idNota: nota.id
                };
            });
        } catch (error) {
            console.error('Error al obtener todas las notas:', error.message);
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`);
        }
    }
    async asignarNota(id, { valor_nota }) {
        try {
            const notaActualizada = await prisma.act_Est_Notas.update({
                where: {
                    id
                },
                data: {
                    valor_nota: parseFloat(valor_nota, 10)
                },
                select: {
                    valor_nota: true,
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    }
                }
            })
            return notaActualizada
        } catch (error) {
            throw new Error(`No se pudo actualizar la nota: ${error.message}`)
        }
    }

    async getAllNotas(actividadId, asignaturaId, gradoId) {
        try {
            const filtro = {
                include: {
                    persona: true,
                    actividades: {
                        include: {
                            asignatura: true
                        }
                    }
                },
                where: {}
            };

            // Agregar condiciones si se proporcionan los parámetros
            if (actividadId) filtro.where.actId = parseInt(actividadId);
            if (asignaturaId) filtro.where = {
                ...filtro.where,
                'actividades': {
                    'asignatura': {
                        'id': parseInt(asignaturaId)
                    }
                }
            };
            if (gradoId) filtro.where = {
                ...filtro.where,
                'actividades': {
                    'asignatura': {
                        'grado': {
                            'id': parseInt(gradoId)
                        }
                    }
                }
            };

            const notas = await prisma.act_Est_Notas.findMany(filtro);

            return notas.map(nota => {
                return {
                    nombre: nota.persona.nombre,
                    apellido: nota.persona.apellido,
                    tituloActividad: nota.actividades.titulo,
                    nombreAsignatura: nota.actividades.asignatura.nombreMateria,
                    nota: nota.valor_nota,
                    idNota: nota.id
                };
            });
        } catch (error) {
            console.error('Error al obtener todas las notas:', error.message);
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`);
        }
    }

    async obtenerNotasEstudiante(idEstudiante, idAsignatura) {
        try {
            const notas = await prisma.$queryRaw`
            SELECT aen.id, ae.titulo, ae.detalleActividad, aen.valor_nota
            FROM Act_Est_Notas aen
            JOIN ActividadesEducativas ae ON aen.actId = ae.id
            WHERE aen.personaId = ${parseInt(idEstudiante)} AND ae.asignaturaId = ${parseInt(idAsignatura)};
            `
            if (!notas) {
                throw new Error(`No se encontraron notas para el estudiante con ID ${idEstudiante} y la asignatura con ID ${idAsignatura}`);
            }

            return notas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las notas: ${error.message}`);
        }
    }



}


module.exports = new NotaService();