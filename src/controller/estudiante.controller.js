var EstudianteService = require('../service/estudiante.service')

class EstudianteController {
    getAllStudents(req, res) {
        EstudianteService.getAllStudents((err, students) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener estudiantes' });
            }
            res.json(students)
        });
    }

    getStudentByCi(req, res) {
        const { ci } = req.params;
        EstudianteService.getStudentByCi(ci, (err, student) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el estudiante' });
            }
            res.json(student);
        });
    }
    createStudent(req, res){
        const { nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, tipo_persona } = req.body;

        const estudiante = {
            nombre,
            apellido,
            cedula,
            fecha_de_nacimiento,
            direccion,
            correo,
            celular,
            tipo_persona: tipo_persona || 'E'
        }

        EstudianteService.createStudent(estudiante, (err, student)=>{
            if(err){
                return res.status(500).json({error:'Error al insertar el estudiante'});
            }
            res.status(201).json(student);
        });
    }

}

module.exports = new EstudianteController()
// function updateStudent(req,res){
//     const { id } = req.params;
//     const data = {
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         direccion: req.body.direccion,
//         correo: req.body.correo,
//         celular: req.body.celular,
//         tipo_sangre: req.body.tipo_sangre
//     };

//     getConnection(function (err, conn) {
//         if (err) {
//             console.log('No se puede acceder a la base de datos', err);
//             return;
//         }

//         // Iniciar una transacción
//         conn.beginTransaction(function (err) {
//             if (err) {
//                 console.log('Error al iniciar la transacción', err);
//                 conn.release();
//                 return;
//             }

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
//                     conn.query('UPDATE estudiante SET tipo_sangre = ? WHERE id = ?', [
//                         data.tipo_sangre,
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
//                         };
//                     });
//                 };
//             });
//         });
//     });
// }


