const { PrismaClient } = require('@prisma/client')
const UsuarioService = require('./usuario.service');
const { getById } = require('./notas.service');

const prisma = new PrismaClient();

class AdminService {
    async getAll() {
        try {
            const admin = await prisma.persona.findMany({
                where: {
                    tipoPersona: 'A'
                }
            });
            return admin;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los estudiantes: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const admin = await prisma.persona.findMany({
                where: { id,
                    tipoPersona: 'A' }
            });
            return admin;
        } catch (error) {
            throw new Error(`No se pudo obtener el estudiante por ID: ${error.message}`);
        }
    }
    async createAdmin({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona }) {
        try {
            // Verificar que no exista previamente
            const adminExists = await prisma.persona.findUnique({
                where: {
                    cedula,
                    tipoPersona:'A'
                }
            });

            if (adminExists) {
                throw new Error("La cédula ya está registrada");
            }

            // Validar la fecha de nacimiento
            const fechaNacimientoDate = new Date(fechaNacimiento);
            if (isNaN(fechaNacimientoDate.getTime())) {
                throw new Error('Fecha de nacimiento no válida.');
            }

            // Crear el estudiante
            const fechaNacimientoISO = fechaNacimientoDate.toISOString();
            const nuevoAdmin = await prisma.persona.create({
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
                personaId: nuevoAdmin.id
            });

            return nuevoAdmin;
        } catch (error) {
            throw new Error(`No se puede agregar un estudiante: ${error.message}`)
        }
    }
    async updateAdmin(id, { nombre, apellido, direccion, correo, celular }) {
        try {
            const admin = await prisma.persona.update({
                where: { id },
                data: {
                    nombre,
                    apellido,
                    direccion,
                    correo,
                    celular
                }
            });
            return admin;
        } catch (error) {
            throw new Error(`No se pudo actualizar el estudiante: ${error.message}`);
        }
    }
}

module.exports = new AdminService();