const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class MatriculaService {

    async getAll() {
        try {
            const matriculas = await prisma.matricula.findMany({
                include: {
                    persona: {
                        select: {
                            nombre:true,
                            apellido: true
                        }
                    },
                    periodo: {
                        select: {
                            anioLectivo:true
                        }
                    },
                    grado:{
                        select:{
                            nombreGrado:true
                        }
                    }
                }
            });
            return matriculas;
        } catch (error) {
            throw new Error(`No se pudieron obtener todas las matriculas: ${error.message}`);
        }
    }
    async getById(id){
        try {
            const matricula = await prisma.matricula.findUnique({
                where: { id },
                include: {
                    persona: {
                        select: {
                            nombre:true,
                            apellido: true
                        }
                    },
                    periodo: {
                        select: {
                            anioLectivo:true
                        }
                    },
                    grado:{
                        select:{
                            nombreGrado:true
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

        // Validar que la persona sea estudiante
        const persona = await prisma.persona.findUnique({ 
          where: {
            id: idPersona
          }
        });
      
        if (!persona || persona.tipoPersona !== 'E') {
          throw new Error('Sólo se pueden matricular estudiantes'); 
        }
      
        // Si es estudiante, crear la matrícula 
        return prisma.matricula.create({
          data: {
            estado,
            idPersona,
            idPeriodo,
            idGrado  
          }
        });
      
      }
}

module.exports = new MatriculaService();