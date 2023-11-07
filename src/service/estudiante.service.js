var eModel = require('../model/estudiante')

class EstudianteService {

    getAllStudents(callback) {
        eModel.getAllStudents(callback);
    }

    getStudentByCi(ci, callback) {
        eModel.getStudentById(ci, (err, result) => {
            if (err) {
                callback(err, null); // Pasa el error al callback
            } else {
                callback(null, result); // Pasa el resultado al callback
            }
        });
    }

}

module.exports = new EstudianteService();