const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const UsuarioService = require('./usuario.service'); 

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
    async getTeacherByCelular(celular) {
        try {
            const docente = await prisma.persona.findMany({
                where: {
                    celular,
                    tipoPersona: 'D'
                }
            });
            return docente;
        } catch (error) {
            throw new Error(`No se pudieron obtener el docente por celular: ${error.message}`);
        }
    }
    async getTeacherByCorreo(correo) {
        try {
            const docente = await prisma.persona.findMany({
                where: {
                    correo,
                    tipoPersona: 'D'
                }
            });
            return docente;
        } catch (error) {
            throw new Error(`No se pudieron obtener docente por correo electrónico: ${error.message}`);
        }
    }
    async createTeacher({ nombre, apellido, cedula, fechaNacimiento, direccion, correo, celular, tipoPersona }) {
        try {
            // Verificar si ya existe un estudiante con la misma cédula
            const existingTeacher = await this.getTeacherByCi(cedula);
    
            if (existingTeacher.length > 0) {
                throw new Error('Ya existe un docente con esta cédula.');
            }

            // Verificar si ya existe un estudiante con el mismo correo electrónico
            const existingTeacherByCorreo = await this.getTeacherByCelular(correo);
            if (existingTeacherByCorreo.length > 0) {
                throw new Error('Ya existe un docente con este correo electrónico.');
            }  
            // Verificar si ya existe un estudiante con el mismo número de teléfono
            const existingTeacherByCelular = await this.getTeacherByCelular(celular);
            if (existingTeacherByCelular.length > 0) {
            throw new Error('Ya existe un estudiante con este número de teléfono.');
            }    
            const fechaNacimientoDate = new Date(fechaNacimiento);
            if (isNaN(fechaNacimientoDate.getTime())) {
                throw new Error('Fecha de nacimiento no válida.');
            }
            // Convierte la fecha a formato ISO-8601
            const fechaNacimientoISO = fechaNacimientoDate.toISOString();
            const es = await prisma.persona.create({
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
              // Crear el usuario con la contraseña igual a la cédula
              await UsuarioService.registrarUsuario({
                cedula,
                personaId: es.id
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
    async getTeacherById(id) {
        try {
            const docente = await prisma.persona.findUnique({
                where: {
                    id,
                    tipoPersona: 'D'
                }
            });

            if (!docente) {
                throw new Error('No se encontró un docente con este ID.');
            }

            return docente;
        } catch (error) {
            throw new Error(`No se pudo obtener el docente por ID: ${error.message}`);
        }
    }
}

module.exports = new DocenteService();