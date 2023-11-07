var eModel = require('../model/estudiante')

class EstudianteService {

    getAllStudents(callback) {
        eModel.getAllStudents(callback);
    }

    getStudentByCi(ci, callback) {
        eModel.getStudentById(ci, callback);
    }
    createStudent(estudiante, callback) {
        eModel.createStudent(estudiante, callback)
    }

}

module.exports = new EstudianteService();