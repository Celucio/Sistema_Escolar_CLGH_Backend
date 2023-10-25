const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todos los estudiantes de la tabla
router.get('/docentes', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT p.id, p.nombre, p.apellido, p.cedula, p.fecha_de_nacimiento, p.direccion, p.correo, p.celular, d.especializacion FROM persona p JOIN docente d ON p.id = d.id', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Obtener docentes por ID
router.get('/docente/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT p.id, p.nombre, p.apellido, p.cedula, p.fecha_de_nacimiento, p.direccion, p.correo, p.celular, d.especializacion FROM persona p JOIN docente d ON p.id = d.id WHERE p.cedula = ?;', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

router.post('/docente/', async (req, res) => {
    const { nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, especializacion } = req.body;

    const getLastIdQuery = "SELECT MAX(id) AS lastId FROM docente";

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
            return;
        }

        conn.query(getLastIdQuery, function (err, result) {
            if (err) {
                console.log(err);
                conn.release();
                return;
            }

            let lastId = 'DCT-1';
            if (result && result[0] && result[0].lastId) {
                lastId = result[0].lastId;
                let number = parseInt(lastId.split('-')[1]) + 1;
                lastId = 'DCT-' + number;
            }

            const personaData = {
                id: lastId,
                nombre,
                apellido,
                cedula,
                fecha_de_nacimiento,
                direccion,
                correo,
                celular
            };

            const docenteData = {
                id: lastId,
                especializacion
            };

            // Iniciar una transacción
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log(err);
                    conn.release();
                    return;
                }

                // Insertar datos en la tabla 'persona'
                conn.query('INSERT INTO persona SET ?', personaData, function (err) {
                    if (err) {
                        console.log(err);
                        // Deshacer la transacción en caso de error
                        conn.rollback(function () {
                            conn.release();
                        });
                    } else {
                        // Insertar datos en la tabla 'estudiante'
                        conn.query('INSERT INTO docente SET ?', docenteData, function (err) {
                            if (err) {
                                console.log(err);
                                // Deshacer la transacción en caso de error
                                conn.rollback(function () {
                                    conn.release();
                                });
                            } else {
                                // Confirmar la transacción
                                conn.commit(function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ status: 'Registro exitoso' });
                                    }
                                    conn.release();
                                });
                            }
                        });
                    }
                });
            });
        });
    });
});

//Actualizar un docente por cedula
router.put('/docente/:id', (req, res) => {
    const { id } = req.params;
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        direccion: req.body.direccion,
        correo: req.body.correo,
        celular: req.body.celular,
        especializacion: req.body.especializacion
    }
    const query = 'UPDATE docente SET nombre = ?, apellido = ?, direccion = ?, correo = ?, celular = ?, especializacion = ? WHERE id = ?';

    getConnection(function (err, conn) {
        if (err) {
            console.log('No se puede acceder a la base de datos', err);
        }
        conn.query(query, [
            data.nombre,
            data.apellido,
            data.direccion,
            data.correo,
            data.celular,
            data.especializacion,
            id
        ], function (err, result) {
            if (!err) {
                res.json({ status: 'El registro se ha actualizado' });
            } else {
                console.log(err);
            }

            conn.release();
        })
    })
})

//Eliminar un docente
router.delete('/docente/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM docente WHERE id = ?', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

module.exports = router;