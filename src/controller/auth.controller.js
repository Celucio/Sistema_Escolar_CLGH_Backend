const authService = require('../service/authService');
const handleSuccessfulLogin = async (req, res) => {
  try {
    const { cedula, contrasena } = req.body;

    // Lógica de autenticación con authService.login
    const { token, mensaje, primerInicioSesion } = await authService.login(cedula, contrasena);

    if (primerInicioSesion) {
      return res.status(200).json({ mensaje, primerInicioSesion });
    }

    // Obtén el ID del estudiante después de la autenticación
    const estudiante = await estudianteService.getEstudianteByCedula(cedula);
    const idEstudiante = estudiante.id;

    // Redirige a la ruta deseada incluyendo el ID del estudiante en los parámetros de la URL
    res.redirect('/vista-estudiante?idEstudiante=${idEstudiante}');
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
};

const login = async (req, res) => {
  try {
    const { cedula, contrasena } = req.body;

    const { token, usuario, mensaje, primerInicioSesion } = await authService.login(cedula, contrasena);

    if (primerInicioSesion) {
      return res.status(200).json({ mensaje, primerInicioSesion });
    }
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
    return res.status(200).json({ mensaje, token, usuario, redireccion: '/pagina-principal' });
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
};

const cambiarContrasena = async (req, res) => {
  try {
    const { cedula, nuevaContrasena } = req.body;

    // Verificar si es el primer inicio de sesión
    const primerInicioSesion = await authService.primerInicioSesion(cedula);

    if (!primerInicioSesion) {
      throw new Error('No se requiere cambio de contraseña');
    }

    // Realiza la lógica necesaria para actualizar la contraseña en la base de datos
    await authService.cambiarContrasena(cedula, nuevaContrasena);

    res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente', cedula, redireccion: '/' });
  } catch (error) {
    console.error('Error en el controlador de cambio de contraseña:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
  }
};

const cambiarContrasenaOlvido = async (req, res) => {
  try {
    const { cedula, nuevaContrasena } = req.body;

    // Realiza la lógica necesaria para actualizar la contraseña en la base de datos
    await authService.cambiarContrasenaOlvido(cedula, nuevaContrasena);

    res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente', redireccion: '/' });
  } catch (error) {
    console.error('Error en el controlador de cambio de contraseña:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
  }
}

module.exports = {
  login,
  handleSuccessfulLogin,
  cambiarContrasena,
  cambiarContrasenaOlvido
};