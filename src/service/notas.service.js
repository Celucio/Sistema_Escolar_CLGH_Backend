const { PrismaClient } = require('@prisma/client')

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
    async crearNotas(asignaturaId){
        try {
            const estudiantes = await prisma.matricula.findMany({
                where: {
                    asignaturaId
                },
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
                    valor_nota:0
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



}


module.exports = new NotaService();