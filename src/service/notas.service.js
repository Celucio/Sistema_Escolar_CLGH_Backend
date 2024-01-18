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
                                    id: true,
                                    nombreMateria: true
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


    async crearNotas(asignaturaId) {
        try {
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
    async asignarNota(id, { valor_nota }) {
        try {
            const notaActualizada = await prisma.act_Est_Notas.update({
                where: {
                    id
                },
                data: {
                    valor_nota
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
            console.log('Respuesta del servicio después de asignar:', notaActualizada);

            return notaActualizada
        } catch (error) {
            throw new Error(`No se pudo actualizar la nota: ${error.message}`)
        }
    }

    async getAllByActividadYAsignatura(actividadId, asignaturaId) {
        try {
            if (!actividadId || !asignaturaId) {
                throw new Error("Los parámetros de la URL son inválidos.");
            }
    
            const notas = await prisma.act_Est_Notas.findMany({
                where: {
                    actId: actividadId,
                    AND: {
                        asignaturaId: asignaturaId,
                    },
                },
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
                                    id: true,
                                    nombreMateria: true
                                }
                            }
                        }
                    }
                }
            });
    
            return notas;
        } catch (error) {
            console.error("Error al obtener las notas por actividad y asignatura:", error);
            throw new Error(`No se pudieron obtener las notas: ${error.message}`);
        }
    }

    
    async getAllNotas(actividadId, asignaturaId) {
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
    
            //console.log('Notas obtenidas:', notas);
    
            return notas.map(nota => {
                //console.log('Nota actual:', nota);
    
                return {
                    idPersona: nota.persona.id,
                    nombre: nota.persona.nombre,
                    apellido: nota.persona.apellido,
                    idActividad: nota.actividades.id,
                    tituloActividad: nota.actividades.titulo,
                    detalleActividad: nota.actividades.detalleActividad,
                    idAsignatura: nota.actividades.asignatura.id,
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    



}


module.exports = new NotaService();