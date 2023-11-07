var DocenteService = require('../service/docente.service')

class DocenteController{
    getAllTeachers(req,res){
        DocenteService.getAllTeachers((err,teachers)=>{
            if(err){
                return res.status(500).json({ error: 'Error al obtener docentes' });
            }
            res.json(teachers)
        });
    }

    getTeacherByCi(req, res) {
        const { ci } = req.params;
        DocenteService.getTeacherByCi(ci, (err, teacher) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el docente' });
            }
            res.json(teacher);
        });
    }
    
    createTeacher(req, res){
        const { id, nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, tipo_persona } = req.body;

        const docente = {
            id,
            nombre,
            apellido,
            cedula,
            fecha_de_nacimiento,
            direccion,
            correo,
            celular,
            tipo_persona: tipo_persona || 'D'
        }

        DocenteService.createTeacher(docente, (err, teacher)=>{
            if(err){
                return res.status(500).json({error:'Error al insertar el docente'});
            }
            res.status(201).json(teacher);
        });
    }

}
module.exports = new DocenteController()



//             // Actualizar la tabla 'persona'
//             conn.query('UPDATE persona SET nombre = ?, apellido = ?, direccion = ?, correo = ?, celular = ? WHERE id = ?', [
//                 data.nombre,
//                 data.apellido,
//                 data.direccion,
//                 data.correo,
//                 data.celular,
//                 id
//             ], function (err) {
//                 if (err) {
//                     console.log('Error al actualizar la tabla persona', err);
//                     conn.rollback(function () {
//                         conn.release();
//                     });
//                 } else {
//                     // Actualizar la tabla 'docente'
//                     conn.query('UPDATE docente SET especializacion = ? WHERE id = ?', [
//                         data.especializacion,
//                         id
//                     ], function (err) {
//                         if (err) {
//                             console.log('Error al actualizar la tabla docente', err);
//                             conn.rollback(function () {
//                                 conn.release();
//                             });
//                         } else {
//                             // Confirmar la transacción
//                             conn.commit(function (err) {
//                                 if (err) {
//                                     console.log('Error al confirmar la transacción', err);
//                                 } else {
//                                     res.json({ status: 'El registro se ha actualizado' });
//                                 }
//                                 conn.release();
//                             });
//                         }
//                     });
//                 }
//             });
//         });
//     });
// }

