
const authService = require('../service/authService');

// const handleSuccessfulLogin = (req, res) => {
//   // Proceso de autenticación exitoso
//   const token = authService.generarToken(); // Puedes usar tu lógica para generar el token
//   const redireccion = '/ruta-de-redireccion';

//   res.json({ mensaje: 'Inicio de sesión exitoso', token, redireccion });
// };

const login = async (req, res) => {
  try {
    const { cedula, contrasena } = req.body;

    const { token, usuario, mensaje } = await authService.login(cedula, contrasena);

    return res.status(200).json({ mensaje, token, usuario });
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
};

module.exports = {
  login,
  //   handleSuccessfulLogin,
};