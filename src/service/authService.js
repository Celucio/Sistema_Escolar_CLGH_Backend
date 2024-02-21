const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

const obtenerDatosUsuario = async (id) => {
  // Lógica para obtener los datos completos del usuario desde tu base de datos
  const usuario = await prisma.persona.findUnique({
    where: {
      id: id,
    },
  });

  return usuario;
};

async function login(cedula, contrasena) {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: { persona: { cedula } },
      include: { persona: true },
    });

    console.log('Usuario encontrado:', usuario);

    if (!usuario) {
      throw new Error('Credenciales incorrectas');
    }

    const { persona, contrasena: hashedContrasena, primerInicioSesion } = usuario;
    console.log('Contraseña hasheada en la base de datos:', hashedContrasena);

    try {
      const contrasenaCoincide = await bcrypt.compare(contrasena, hashedContrasena);

      if (!contrasenaCoincide) {
        throw new Error('Credenciales incorrectas');
      }

      if (primerInicioSesion) {
        return { mensaje: 'Cambio de contraseña requerido ', primerInicioSesion: true, cedula };
      }

      const detallesPersona = await obtenerDatosUsuario(persona.id);

      const tokenPayload = {
        id: detallesPersona.id,
        cedula,
        tipoPersona: detallesPersona.tipoPersona,
        // Otros campos que desees incluir
      };


      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

      return { token, usuario: detallesPersona, mensaje: 'Inicio de sesión exitoso' };
    } catch (error) {
      console.error('Error en la comparación de contraseñas:', error);
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al buscar el usuario en la base de datos:', error);
    throw new Error('Error al buscar el usuario en la base de datos');
  }
}

async function primerInicioSesion(cedula) {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: { persona: { cedula } },
      include: { persona: true },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario.primerInicioSesion;
  } catch (error) {
    console.error('Error al verificar el primer inicio de sesión:', error);
    throw new Error('Error al verificar el primer inicio de sesión');
  }
}

async function cambiarContrasena(cedula, nuevaContrasena) {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: { persona: { cedula } },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const { id } = usuario;

    const hashedContrasena = await bcrypt.hash(nuevaContrasena, saltRounds);

    await prisma.usuario.update({
      where: { id },
      data: {
        contrasena: hashedContrasena,
        primerInicioSesion: false,
      },
    });

    console.log('Contraseña actualizada correctamente en la base de datos');
    console.log('Contraseña hasheada en la base de datos:', hashedContrasena);
  } catch (error) {
    console.error('Error en el servicio de cambio de contraseña:', error);
    throw new Error('Error al actualizar la contraseña en la base de datos');
  }
}

async function cambiarContrasenaOlvido(cedula, nuevaContrasena) {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: { persona: { cedula } },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const { id } = usuario;

    const hashedContrasena = await bcrypt.hash(nuevaContrasena, saltRounds);

    await prisma.usuario.update({
      where: { id },
      data: {
        contrasena: hashedContrasena,
      },
    });

    console.log('Contraseña actualizada correctamente en la base de datos');
    console.log('Contraseña hasheada en la base de datos:', hashedContrasena);
    return { mensaje: 'Contraseña cambiada con éxito' };
  } catch (error) {
    console.error('Error en el servicio de cambio de contraseña:', error);
    throw new Error('Error al actualizar la contraseña en la base de datos');
  }
}

module.exports = {
  login,
  primerInicioSesion,
  cambiarContrasena,
  cambiarContrasenaOlvido
};