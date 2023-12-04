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
    async create({nombrePeriodo}){
        try{
            const periodoCal = await prisma.periodoCalificaciones.create({
                data:{
                    nombrePeriodo
                }
            });
            return periodoCal;
        }catch(error){
            throw new Error(`No se puede agregar: ${error.message}`)
        }
    }
    async update(id, {nombrePeriodo}){
        try{
            const periodoCal = await prisma.periodoCalificaciones.update({
                where:{
                    id
                },
                data:{
                    nombrePeriodo
                }
            });
            return periodoCal;
        }catch(error){
            throw new Error(`No se puede actualizar: ${error.message}`)
        }
    }
}

module.exports = new PeriodoCalService()