const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class DocenteService {
    async getAllTeachers() {
        try {
            const docentes = await prisma.persona.findMany({
                where: {
                    tipoPersona: 'D'
                }
            });
            return docentes;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los docentes: ${error.message}`);
        }
    }
    async getTeacherByCi(cedula) {
        try {
            const docente = await prisma.persona.findMany({
                where: {
                    cedula,
                    tipoPersona: 'D'
                }
            });
            return docente;
        } catch (error) {
            throw new Error(`No se pudo obtener el docente por Cédula: ${error.message}`);
        }
    }
    async createTeacher({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona }) {
        try {
            const es = await prisma.persona.create({
                data: {
                    nombre,
                    apellido,
                    cedula,
                    fechaNacimiento,
                    direccion,
                    correo,
                    celular,
                    tipoPersona
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar un docente: ${error.message}`)
        }
    }
    async updateTeacher(id, { nombre, apellido, direccion, correo, celular }) {
        try {
            const es = await prisma.persona.update({
                where: { id },
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
            throw new Error(`No se puede actualizar un docente: ${error.message}`)
        }

    }
}

module.exports = new DocenteService();