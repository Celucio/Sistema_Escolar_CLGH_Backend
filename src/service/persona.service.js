const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class PersonaService {
    async asignaturasPorIdPersona(id) {
        try {
            const persona = await prisma.$queryRaw`
            SELECT a.id, a.nombreMateria
            FROM Matricula m
            JOIN Grado g ON m.idGrado = g.id
            JOIN Asignatura a ON g.id = a.idGrado
            WHERE m.idPersona = ${parseInt(id)}
            UNION
            SELECT a.id, a.nombreMateria
            FROM Grado g
            JOIN Asignatura a ON g.id = a.idGrado
            WHERE g.persId = ${parseInt(id)}`

            if (!persona) {
                throw new Error(`No se encontró la persona con ID ${id}`);
            }

            return persona;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las asignaturas: ${error.message}`);
        }
    }
    async obtenerPersonaPorId(id) {
        try {
            const persona = await prisma.persona.findUnique({
                where: {
                    id: parseInt(id)
                },
                select:{
                    cedula: true
                }
            })

            if (!persona) {
                throw new Error(`No se encontró la persona con ID ${id}`);
            }

            return persona;
        } catch (error) {
            throw new Error(`No se pudo obtener la persona: ${error.message}`);
        }
    }
}

module.exports = new PersonaService();