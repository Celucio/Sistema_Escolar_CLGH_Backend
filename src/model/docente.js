var connection = require('../../conexion/connection');

class DocenteModel{
    getAllTeachers(callback){
        connection.query("SELECT * FROM persona WHERE tipo_persona = 'D'", callback)
    }

    getTeacherById(ci, callback){
        connection.query("SELECT * FROM persona WHERE cedula = ?",[ci], callback);
    }
}

module.exports = new DocenteModel();