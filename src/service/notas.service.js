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
                            detalleActividad: true
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
            const estudiantes = await prisma.matricula.findMany({
                include: {
                    persona: true
                }
            });
            const actividades = await prisma.actividadesEducativas.findMany({
                where: {
                    asignaturaId
                }
            });
            const notasCreadas = []

            for (let estudiante of estudiantes) {
                for (let actividad of actividades) {
                    const nuevaNota = await prisma.act_Est_Notas.create({
                        data: {
                            personaId: estudiante.idPersona,
                            actId: actividad.id,
                            valor_nota
                        }
                    })

                    notasCreadas.push(nuevaNota)

                }
            }
            return notasCreadas
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
    async asignarNota(id, {valor_nota}) {
        try {
            const notaActualizada = await prisma.act_Est_Notas.update({
                where: {
                    id
                },
                data: {
                    valor_nota
                },
                select: {
                    valor_nota:true,
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



}


module.exports = new NotaService();