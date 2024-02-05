const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

class UsuarioService {
  async registrarUsuario({ cedula, personaId }) {
    try {
      // Verificar que no exista previamente
      const usuarioExists = await prisma.usuario.findUnique({
        where: {
            personaId
          }
        
      });

      if (usuarioExists) {
        throw new Error("El usuario ya está registrado");
      }

      // Crear el usuario con la misma cédula como usuario y contraseña
      const hashedContrasena = await bcrypt.hash(cedula, 10);
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          contrasena: hashedContrasena,
          personaId
    
        }
      });

      return nuevoUsuario;

    } catch (error) {
      // Mejorar el mensaje de error
      throw new Error(`2. No se puede agregar un usuario. ${error.message}`);
    }
  }
}

module.exports = new UsuarioService();
