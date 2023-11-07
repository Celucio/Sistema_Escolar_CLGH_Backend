var eModel = require('../model/docente')

class DocenteService{

    getAllTeachers(callback){
        eModel.getAllTeachers(callback);
    }

    getTeacherByCi(ci, callback) {
        eModel.getTeacherById(ci, (err, result) => {
            if (err) {
                callback(err, null); // Pasa el error al callback
            } else {
                callback(null, result); // Pasa el resultado al callback
            }
        });
    }
    createTeacher(newTeacher, callback) {
        eModel.createTeacher(newTeacher, callback);
      }
}

module.exports = new DocenteService();