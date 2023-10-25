const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todos los estudiantes de la tabla
router.get('/estudiantes', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM estudiante', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Obtener estudiante por cedula
router.get('/estudiante/:ci', (req, res) => {
    getConnection(function (err, conn) {
        const { ci } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM estudiante WHERE cedula = ?', [ci], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});


router.post('/estudiante/', async (req, res) => {
    const { nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, tipo_sangre } = req.body;

    const getLastIdQuery = "SELECT MAX(id) AS lastId FROM persona";

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

            let lastId = 'EST-1';
            if (result && result[0] && result[0].lastId) {
                lastId = result[0].lastId;
                let number = parseInt(lastId.split('-')[1]) + 1;
                lastId = 'EST-' + number;
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

            const estudianteData = {
                id: lastId,
                tipo_sangre
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
                        conn.query('INSERT INTO estudiante SET ?', estudianteData, function (err) {
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


//Actualizar un estudiante por cedula
router.put('/estudiante/:ci', (req, res) => {
    const { ci } = req.params;
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        direccion: req.body.direccion,
        correo: req.body.correo,
        celular: req.body.celular
    }
    const query = 'UPDATE estudiante SET nombre = ?, apellido = ?, direccion = ?, correo = ?, celular = ? WHERE cedula = ?';

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
            ci
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

// Eliminar estudiante por ID
router.delete('/estudiante/:ci', (req, res) => {
    getConnection(function (err, conn) {
        const { ci } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM estudiante WHERE cedula = ?', [ci], function (err, rows) {
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