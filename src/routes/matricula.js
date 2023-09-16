const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//Consultar todas las matriculas
router.get('/matriculas', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM matricula', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Consultar una matricula por ID
router.get('/matricula/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM matricula WHERE id = ?', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Insertar una matricula
router.post('/matricula/', async (req, res) => {
    
    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
        }
        if (!err) {
            const data = {
                id: req.body.id,
                id_estudiante: req.body.id_estudiante,
                id_docente: req.body.id_docente,
                nrc: req.body.nrc,
                id_periodo: req.body.id_periodo,
                estado: req.body.estado
            }
            const query = "INSERT INTO matricula (id,id_estudiante, id_docente, nrc, id_periodo, estado) VALUES(\'" + data.id + "\', \'" + data.id_estudiante + "\', \'" + data.id_docente + "\', \'" + data.nrc + "\', \'" + data.id_periodo + "\', \'" + data.estado + "\')";
    
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

//Actualizar una matricula


module.exports = router;
