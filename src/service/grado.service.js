const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class GradoService {

    async getAll() {
        try {
            const grados = await prisma.grado.findMany({
                include: {
                    persona: {
                        select: {
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

    async create({ nombreGrado, persId }) {
        try {
            persId = parseInt(persId); // Convertir persId a entero
            const persona = await prisma.persona.findUnique({
                where: {
                    id: persId
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
            throw new Error(`${error.message}`)
        }
    }

    async update(id, { nombreGrado, persId }) {
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
    async getGradosNoAsignados() {
        try {
            const gradosNoAsignados = await prisma.$queryRaw`
                SELECT * FROM Grado
                WHERE id NOT IN (
                    SELECT DISTINCT idGrado FROM Asignatura
                )
            `;
            return gradosNoAsignados;
        } catch (error) {
            throw new Error(`No se pudieron obtener los grados no asignados: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const grado = await prisma.grado.findUnique({
                where: {
                    id: parseInt(id) // Convertir id a entero
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

            if (!grado) {
                throw new Error('No se encontró el grado con el ID proporcionado.');
            }

            return grado;
        } catch (error) {
            throw new Error(`No se pudo obtener el grado por ID: ${error.message}`);
        }
    }
}

module.exports = new GradoService();