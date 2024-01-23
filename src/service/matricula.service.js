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
        try {
            const es = await prisma.matricula.create({
                data: {
                    estado,
                    idPersona: parseInt(idPersona, 10),
                    idPeriodo:parseInt(idPeriodo, 10),
                    idGrado:parseInt(idGrado, 10),
                }
            });
            return es;
        } catch (error) {
            throw new Error(`No se puede agregar la matricula: ${error.message}`)
        }
    }
    async update(id, { estado, idPersona, idPeriodo, idGrado }) {
        try {
            const matricula = await prisma.matricula.update({
                where: { id },
                data: {
                    estado,
                    idPersona,
                    idPeriodo,
                    idGrado
                }
            });
            return matricula;
        } catch (error) {
            throw new Error(`No se puede actualizar una matricula: ${error.message}`);
        }
    }
}

module.exports = new MatriculaService();