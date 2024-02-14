const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class PeriodoCalService{
    async getAll(){
        try{
            const periodoCal = await prisma.periodoCalificaciones.findMany()
            return periodoCal;
        }catch(error){
            throw new Error(`No se pudieron obtener todos: ${error.message}`);
        }
    }
    async getById(id){
        try{
            const periodoCal = await prisma.periodoCalificaciones.findUnique({
                where:{
                    id
                }
            });
            return periodoCal;
        }catch(error){
            throw new Error(`No se pudo obtener por ID: ${error.message}`);
        }
    }
    async create({nombrePeriodo, estado}){
        try{
            const periodoCal = await prisma.periodoCalificaciones.create({
                data:{
                    nombrePeriodo,
		    estado
                }
            });
            return periodoCal;
        }catch(error){
            throw new Error(`No se puede agregar: ${error.message}`)
        }
    }
    async update(id, {nombrePeriodo,estado}){
        try{
            const periodoCal = await prisma.periodoCalificaciones.update({
                where:{
                    id
                },
                data:{
                    nombrePeriodo,
		    estado
                }
            });
            return periodoCal;
        }catch(error){
            throw new Error(`No se puede actualizar: ${error.message}`)
        }
    }
}

module.exports = new PeriodoCalService()
