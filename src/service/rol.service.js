const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

class RolService{
    async getAll() {
        try {
            const rol = await prisma.rol.findMany();
            return rol;
        } catch (error) {
            throw new Error(`No se pudieron obtener todos los roles: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const rol = await prisma.rol.findUnique({
                where: { id }
            });
            return rol;
        } catch (error) {
            throw new Error(`No se pudo encontrar el rol: ${error.message}`);
        }
    }
    async create({nombreRol, estado}){
        try {
            const rol = await prisma.rol.create({
                data: {
                    nombreRol,
                    estado
                }
            });
            return rol;
        } catch (error) {
            throw new Error(`No se puede agregar un estudiante: ${error.message}`)
        }
    }
    async update(id,{nombreRol, estado}){
        try {
            const rol = await prisma.rol.update({
                where: { id },
                data: {
                    nombreRol,
                    estado
                }
            });
            return rol;
        } catch (error) {
            throw new Error(`No se puede actualizar el rol: ${error.message}`)
        }
    }
}
module.exports = new RolService();
