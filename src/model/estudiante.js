var connection = require('../../conexion/connection');

class EstudianteModel{
    getAllStudents(callback){
        connection.query("SELECT * FROM persona WHERE tipo_persona = 'E'", callback);
    }

    getStudentById(ci, callback){
        connection.query("SELECT * FROM persona WHERE cedula = ?",[ci], callback);
    }
}

module.exports = new EstudianteModel();