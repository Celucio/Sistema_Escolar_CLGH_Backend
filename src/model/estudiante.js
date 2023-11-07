var connection = require('../../conexion/connection');

class EstudianteModel {
    getAllStudents(callback) {
        connection.query("SELECT * FROM persona WHERE tipo_persona = 'E'", callback);
    }

    getStudentById(ci, callback) {
        connection.query("SELECT * FROM persona WHERE cedula = ?", [ci], callback);
    }
    createStudent(estudiante, callback) {
        connection.query('INSERT INTO persona SET ?', estudiante, callback);
    }
}

module.exports = new EstudianteModel();