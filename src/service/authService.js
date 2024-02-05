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

    if (!usuario) {
      throw new Error('Credenciales incorrectas');
    }

    const { persona, contrasena: hashedContrasena } = usuario;
    const contraseñaCoincide = await bcrypt.compare(contrasena, hashedContrasena);

    if (!contraseñaCoincide) {
      throw new Error('Credenciales incorrectas');
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
    console.error('Error en el proceso de autenticación:', error);
    throw new Error('Error en el servidor');
  }
}


module.exports = {
  login,
};