const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todos los estudiantes de la tabla
router.get('/docentes', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM Docente', function (err, rows) {
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
        conn.query('SELECT * FROM docente WHERE id = ?', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Insertar un docente
router.post('/docente/', async (req, res) => {
    const fechaNacimiento = new Date(req.body.fecha_de_nacimiento).toISOString().slice(0, 19).replace('T', ' ');

    const getLastIdQuery = "SELECT MAX(id) AS lastId FROM docente";
    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
        }
        conn.query(getLastIdQuery, function (err, result) {
            if (!err) {
                let lastId = 'DCT-1'; 
                if (result && result[0] && result[0].lastId) {
                    lastId = result[0].lastId;
                    let number = parseInt(lastId.split('-')[1]) + 1;
                    lastId = 'DCT-' + number;
                }
                const data = {
                    id: lastId,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    cedula: req.body.cedula,
                    fechaNacimiento: fechaNacimiento,
                    direccion: req.body.direccion,
                    correo: req.body.correo,
                    celular: req.body.celular,
                    especializacion: req.body.especializacion
                }
                const query = "INSERT INTO docente (id, nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular, especializacion) VALUES(\'" + data.id + "\', \'" + data.nombre + "\', \'" + data.apellido + "\', \'" + data.cedula + "\', \'" + data.fechaNacimiento + "\', \'" + data.direccion + "\', \'" + data.correo + "\', \'" + data.celular + "\', \'" + data.especializacion + "\')";

                conn.query(query, function (err, result) {
                    if (!err) {
                        res.json({ status: 'Registro exitoso' });
                    } else {
                        console.log(err);
                    }
                    conn.release();
                });
            } else {
                console.log(err);
                conn.release();
            }
        });
    });
});

//Actualizar un docente por cedula
router.put('/docente/:ci', (req, res) => {
    const { ci } = req.params;
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        direccion: req.body.direccion,
        correo: req.body.correo,
        celular: req.body.celular,
        especializacion: req.body.especializacion
    }
    const query = 'UPDATE docente SET nombre = ?, apellido = ?, direccion = ?, correo = ?, celular = ?, especializacion = ? WHERE cedula = ?';

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

//Eliminar un docente
router.delete('/docente/:ci', (req, res) => {
    getConnection(function (err, conn) {
        const { ci } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM docente WHERE cedula = ?', [ci], function (err, rows) {
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