var connection = require('../../conexion/connection');

class EstudianteModel{
    getAllStudents(callback){
        connection.query("SELECT * FROM persona WHERE tipo_persona = 'E'", callback)
    }
}

module.exports = new EstudianteModel();