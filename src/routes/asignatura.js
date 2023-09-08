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



module.exports = router;