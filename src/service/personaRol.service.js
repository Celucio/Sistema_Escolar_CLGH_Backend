const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class PersonaRol{
    async getAll(){
        try{
            const personaRol = await prisma.personaRol.findMany()
            return personaRol;
        }catch(error){
            throw new Error(`No se pudieron obtener todos: ${error.message}`);
        }
    }
    async create({rolId,personaId, estado}){
        try{
            const personaRol = await prisma.personaRol.create({
                data:{
                    rolId,
                    personaId,
                    estado
                }
            });
            return personaRol;
        }catch(error){
            throw new Error(`No se puede agregar: ${error.message}`)
        }
    }

    
}

module.exports = new PersonaRol()