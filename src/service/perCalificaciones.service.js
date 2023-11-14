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
}

module.exports = new PeriodoCalService()