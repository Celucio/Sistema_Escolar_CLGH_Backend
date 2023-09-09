const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todas las asignaturas de la tabla
router.get('/asignaturas', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM Asignatura', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Obtener asignaturas por NRC
router.get('/asignatura/:nrc', (req, res) => {
    getConnection(function (err, conn) {
        const { nrc } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM asignatura WHERE nrc = ?', [nrc], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Insertar una asignatura
router.post('/asignatura/', async (req, res) => {

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
        }
        if (!err) {
            const data = {
                nrc: req.body.nrc,
                nombre_materia: req.body.nombre_materia,
            }
            const query = "INSERT INTO asignatura (nrc, nombre_materia) VALUES(\'" + data.nrc + "\', \'" + data.nombre_materia + "\')";

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

//Eliminar una asignatura
router.delete('/asignatura/:nrc', (req, res) => {
    getConnection(function (err, conn) {
        const { nrc } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM asignatura WHERE nrc = ?', [nrc], function (err, rows) {
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