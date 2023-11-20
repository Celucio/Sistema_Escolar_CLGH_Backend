const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class EstudianteService {
    async getAllStudents() {
        try {
            const estudiantes = await prisma.persona.findMany({
                where: {
                    tipoPersona: 'E'
                }
            });
            return estudiantes;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los estudiantes: ${error.message}`);
        }
    }
    async getStudentByCi(cedula) {
        try {
            const estudiante = await prisma.persona.findMany({
                where: { cedula,
                tipoPersona: 'E' }
            });
            return estudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener el docente por Cédula: ${error.message}`);
        }
    }
    async createStudent({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona }) {
        try {
        const fechaNacimientoDate = new Date(fechaNacimiento);
        if (isNaN(fechaNacimientoDate.getTime())) {
            throw new Error('Fecha de nacimiento no válida.');
        }
        const fechaNacimientoISO = fechaNacimientoDate.toISOString();
            const es = await prisma.persona.create({
                data: {
                    nombre,
                    apellido,
                    cedula,
                    fechaNacimiento:fechaNacimientoISO,
                    direccion,
                    correo,
                    celular,
                    tipoPersona
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar un estudiante: ${error.message}`)
        }
    }
    async updateStudent(id,{ nombre, apellido, direccion, correo, celular }) {
        try {
            const es = await prisma.persona.update({
                where:{id},
                data: {
                    nombre,
                    apellido,
                    direccion,
                    correo,
                    celular
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede actualizar un estudiante: ${error.message}`)
        }

    }
}

module.exports = new EstudianteService();