var EstudianteService = require('../service/estudiante.service')

class EstudianteController{
    getAllStudents(req,res){
        EstudianteService.getAllStudents((err,students)=>{
            if(err){
                return res.status(500).json({ error: 'Error al obtener estudiantes' });
            }
            res.json(students)
        });
    }

}

module.exports = new EstudianteController()
// function getAllStudents(req,res){
//     getConnection(function (err, conn) {

//         if (err) {
//             return res.sendStatus(400);
//         }
//         conn.query('SELECT p.id, p.nombre, p.apellido, p.cedula, p.fecha_de_nacimiento, p.direccion, p.correo, p.celular, e.tipo_sangre FROM persona p INNER JOIN estudiante e ON p.id = e.id;', function (err, rows) {
//             if (err) {
//                 conn.release();
//                 return res.sendStatus(400, 'No se puede conectar a la base de datos');
//             }
//             res.send(rows);
//             conn.release();
//         });
//     });

// }

// function getStudentByCi(req,res){
//     getConnection(function (err, conn) {
//         const { ci } = req.params;
//         if (err) {
//             return res.sendStatus(400);
//         }
//         conn.query('SELECT p.nombre, p.apellido, p.fecha_de_nacimiento, p.direccion, p.correo, p.celular,e.tipo_sangre FROM persona p JOIN estudiante e ON p.id = e.id WHERE p.cedula = ?;', [ci], function (err, rows) {
//             if (err) {
//                 conn.release();
//                 return res.sendStatus(400, 'No se puede conectar con la base de datos');
//             }
//             res.send(rows);
//             conn.release();
//         });
//     });

// }

// async function createStudent(req,res){
//     const { nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, tipo_sangre } = req.body;

//     const getLastIdQuery = "SELECT MAX(id) AS lastId FROM estudiante";

//     getConnection(function (err, conn) {
//         if (err) {
//             console.log("No se puede conectar con la base de datos" + err);
//             return;
//         }

//         conn.query(getLastIdQuery, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 conn.release();
//                 return;
//             }

//             let lastId = 'EST-1';
//             if (result && result[0] && result[0].lastId) {
//                 lastId = result[0].lastId;
//                 let number = parseInt(lastId.split('-')[1]) + 1;
//                 lastId = 'EST-' + number;
//             }

//             const personaData = {
//                 id: lastId,
//                 nombre,
//                 apellido,
//                 cedula,
//                 fecha_de_nacimiento,
//                 direccion,
//                 correo,
//                 celular
//             };

//             const estudianteData = {
//                 id: lastId,
//                 tipo_sangre
//             };
//             conn.beginTransaction(function (err) {
//                 if (err) {
//                     console.log(err);
//                     conn.release();
//                     return;
//                 }
//                 conn.query('INSERT INTO persona SET ?', personaData, function (err) {
//                     if (err) {
//                         console.log(err);
//                         conn.rollback(function () {
//                             conn.release();
//                         });
//                     } else {
//                         conn.query('INSERT INTO estudiante SET ?', estudianteData, function (err) {
//                             if (err) {
//                                 console.log(err);
//                                 conn.rollback(function () {
//                                     conn.release();
//                                 });
//                             } else {
//                                 conn.commit(function (err) {
//                                     if (err) {
//                                         console.log(err);
//                                     } else {
//                                         res.json({ status: 'Registro exitoso' });
//                                     }
//                                     conn.release();
//                                 });
//                             }
//                         });
//                     }
//                 });
//             });
//         });
//     });
// }

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


