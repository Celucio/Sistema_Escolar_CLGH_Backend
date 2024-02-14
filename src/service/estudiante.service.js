const { PrismaClient } = require('@prisma/client')
const UsuarioService = require('./usuario.service');

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
    async getStudentById(id) {
        try {
            const estudiante = await prisma.persona.findMany({
                where: {
                    id,
                    tipoPersona: 'E'
                }
            });
            return estudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener el docente por Cédula: ${error.message}`);
        }
    }
    async createStudent({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona }) {
        try {
            // Verificar que no exista previamente
            const studentExists = await prisma.persona.findUnique({
                where: {
                    cedula
                }
            });

            if (studentExists) {
                throw new Error("La cédula ya está registrada");
            }

            // Validar la fecha de nacimiento
            const fechaNacimientoDate = new Date(fechaNacimiento);
            if (isNaN(fechaNacimientoDate.getTime())) {
                throw new Error('Fecha de nacimiento no válida.');
            }

            // Crear el estudiante
            const fechaNacimientoISO = fechaNacimientoDate.toISOString();
            const nuevoEstudiante = await prisma.persona.create({
                data: {
                    nombre,
                    apellido,
                    cedula,
                    fechaNacimiento: fechaNacimientoISO,
                    direccion,
                    correo,
                    celular,
                    tipoPersona
                }
            });

            await UsuarioService.registrarUsuario({
                cedula,
                personaId: nuevoEstudiante.id
            });

            return nuevoEstudiante;

        } catch (error) {
            // Mejorar el mensaje de error
            throw new Error(`No se puede agregar un estudiante. ${error.message}`);
        }
    }
    async updateStudent(id, { nombre, apellido, direccion, correo, celular }) {
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
            throw new Error(`No se puede actualizar un estudiante: ${error.message}`)
        }

    }
    async estudianteDisponible() {
        try {
            const estudiantes = await prisma.persona.findMany({
                where: {
                    tipoPersona: 'E',
                    matricula: {
                        none: {}
                    }
                }
            });
            return estudiantes;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los estudiantes: ${error.message}`);
        }
    }

}

module.exports = new EstudianteService();
