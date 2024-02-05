const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
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
    async getStudentByCi(cedula) {
        try {
            const estudiante = await prisma.persona.findMany({
                where: {
                    cedula,
                    tipoPersona: 'E'
                }
            });
            return estudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener el docente por Cédula: ${error.message}`);
        }
    }

    async getStudentByCelular(celular) {
        try {
            const estudiante = await prisma.persona.findMany({
                where: {
                    celular,
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
            // Verificar si ya existe un estudiante con la misma cédula
            const existingStudent = await this.getStudentByCi(cedula);

            if (existingStudent.length > 0) {
                throw new Error('Ya existe un estudiante con esta cédula.');
            }

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
            throw new Error(`No se puede agregar un estudiante: ${error.message}`)
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
    async getStudentByCorreo(correo) {
        try {
            const estudiante = await prisma.persona.findMany({
                where: {
                    correo,
                    tipoPersona: 'E'
                }
            });
            return estudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener estudiantes por correo electrónico: ${error.message}`);
        }
    }

    async getPersonasPorActividadYAsignatura(actividadId, asignaturaId) {
        try {
            const personasConActividad = await prisma.$queryRaw`
            SELECT
              p.*,
              ac.id as IdActividad,
              a.id as idAsignatura,
              ac.titulo as actividadEducativaTitulo,
              n.valor_nota as nota,
              n.id as id_nota
            FROM persona as p
            INNER JOIN matricula as m ON p.id = m.idPersona
            INNER JOIN grado as g ON m.idGrado = g.id
            INNER JOIN asignatura as a ON g.id = a.idGrado
            INNER JOIN actividadeseducativas as ac ON a.id = ac.asignaturaId
            LEFT JOIN act_est_notas as n ON ac.id = n.actId
            WHERE p.tipoPersona = 'E' AND ac.id = ${actividadId} AND a.id = ${asignaturaId}
            GROUP BY p.id, ac.id, a.id;
          `;

            return personasConActividad;
        } catch (error) {
            throw new Error(`No se pudieron obtener personas con actividad y asignatura: ${error.message}`);
        }
    }
    async getStudentById(id) {
        try {
            const estudiante = await prisma.persona.findUnique({
                where: {
                    id: parseInt(id, 10), // Convertir a número si es un string
                    tipoPersona: 'E'
                }
            });
            return estudiante;
        } catch (error) {
            throw new Error(`No se pudieron obtener detalles del estudiante: ${error.message}`);
        }
    }

}

module.exports = new EstudianteService();