const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class EstudianteService {
    async getAllStudents() {
        try {
            const estudiantes = await prisma.persona.findMany({
                where:{
                    tipoPersona:'E'
                }
            });
            return estudiantes;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los estudiantes: ${error.message}`);
        }
    }
    async getStudentByCi(cedula){
        try{
            const estudiante = await prisma.persona.findMany({
                where:{cedula}
            });
            return estudiante;
        }catch(error){
            throw new Error(`No se pudieron obtener el docente por Cédula: ${error.message}`);
        }
    }
}

module.exports = new EstudianteService();