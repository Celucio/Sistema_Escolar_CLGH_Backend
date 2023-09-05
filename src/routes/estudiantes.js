const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todos los estudiantes de la tabla
router.get('/estudiantes', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM Estudiante', function (err, rows) {
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