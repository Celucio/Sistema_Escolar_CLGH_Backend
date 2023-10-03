const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todas las asignaturas de la tabla
router.get('/asignaturas', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        //SELECT a.nrc, a.nombre_materia, d.id, d.nombre, d.apellido FROM asignatura AS a INNER JOIN docente AS d ON d.id = a.id_docente
        conn.query('SELECT * FROM asignatura', function (err, rows) {
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
    
    const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;


    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
        }
        if (!err) {
            const data = {
                nrc: id,
                nombre_materia: req.body.nombre_materia,
                id_docente: req.body.id_docente
            }
            const query = "INSERT INTO asignatura (nrc, nombre_materia, id_docente) VALUES(\'" + data.nrc + "\', \'" + data.nombre_materia + "\' , \'" + data.id_docente + "\')";

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