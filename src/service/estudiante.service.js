var eModel = require('../model/estudiante')

class EstudianteService{

    getAllStudents(callback){
        eModel.getAllStudents(callback);
    }

}

module.exports = new EstudianteService();