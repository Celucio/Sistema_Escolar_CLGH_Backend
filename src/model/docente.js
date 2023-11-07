var connection = require('../../conexion/connection');

class DocenteModel{
    getAllTeachers(callback){
        connection.query("SELECT * FROM persona WHERE tipo_persona = 'D'", callback)
    }

    getTeacherById(ci, callback){
        connection.query("SELECT * FROM persona WHERE cedula = ?",[ci], callback);
    }

    createTeacher(newTeacher, callback) {
        connection.query('INSERT INTO persona SET ?', newTeacher, callback);
      }
}

module.exports = new DocenteModel();