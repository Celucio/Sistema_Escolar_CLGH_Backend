const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class MatriculaService {

    async getAll() {
        try {
            const matriculas = await prisma.matricula.findMany({
                include: {
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    },
                    periodo: {
                        select: {
                            anioLectivo: true
                        }
                    },
                    grado: {
                        select: {
                            nombreGrado: true
                        }
                    }
                }
            });
            return matriculas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las matriculas: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const matricula = await prisma.matricula.findUnique({
                where: { id },
                include: {
                    persona: {
                        select: {
                            nombre: true,
                            apellido: true
                        }
                    },
                    periodo: {
                        select: {
                            anioLectivo: true
                        }
                    },
                    grado: {
                        select: {
                            nombreGrado: true
                        }
                    }
                }
            });
            return matricula;
        } catch (error) {
            throw new Error(`No se pudo obtener por ID: ${error.message}`);
        }
    }

    async create({ estado, idPersona, idPeriodo, idGrado }) {

        const matriculaExistente = await prisma.matricula.findFirst({
            where: {
                AND: [
                    { idPersona },
                    { estado: 'A' }
                ]
            }
        });

        if (matriculaExistente) {
            throw new Error('El estudiante ya está matriculado');
        }

        const persona = await prisma.persona.findUnique({
            where: {
                id: idPersona
            }
        });

        if (!persona || persona.tipoPersona !== 'E') {
            throw new Error('Sólo se pueden matricular estudiantes');
        }
        return prisma.matricula.create({
            data: {
                estado,
                idPersona,
                idPeriodo,
                idGrado
            }
        });

    }

    async update(id, { estado, idPersona, idPeriodo, idGrado }) {
        try {
            const matricula = await prisma.matricula.update({
                where: { id },
                data: {
                    estado,
                    idPersona,
                    idPeriodo,
                    idGrado
                }
            });
            return matricula;
        } catch (error) {
            throw new Error(`No se puede actualizar una matricula: ${error.message}`);
        }
    }
    

}

module.exports = new MatriculaService();