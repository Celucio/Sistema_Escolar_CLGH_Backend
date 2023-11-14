const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class TipoService{
    async getAll(){
        try{
            const tipo = await prisma.tipoActividad.findMany();
            return tipo;
        }catch(error){
            throw new Error(`No se pudieron obtener todos: ${error.message}`);
        }
    }
    async create({nombreActividad}){
        try{
            const tipo = await prisma.tipoActividad.create({
                data:{
                    nombreActividad
                }
            });
            return tipo;
        }catch(error){
            throw new Error(`No se puede agregar: ${error.message}`)
        }
    }
    async update(id,{ nombreActividad }) {
        try {
            const tipo = await prisma.tipoActividad.update({
                where:{id},
                data: {
                    nombreActividad
                }
            });
            return tipo;
        } catch (error) {
            throw new Error(`No se puede actualizar un estudiante: ${error.message}`)
        }
    }
}

module.exports = new TipoService()