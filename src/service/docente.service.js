var eModel = require('../model/docente')

class DocenteService{

    getAllTeachers(callback){
        eModel.getAllTeachers(callback);
    }
}

module.exports = new DocenteService();