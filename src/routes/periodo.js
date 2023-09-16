const express = require('express');
const router = express.Router();
var getConnection = require('../../conexion/connection');

//consultar todas las periodos de la tabla
router.get('/periodos', (req, res) => {
    getConnection(function (err, conn) {

        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM periodo', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Obtener periodos por ID
router.get('/periodo/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM periodo WHERE id = ?', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Insertar periodo
router.post('/periodo/', async (req, res) => {
    const fechaInicio = new Date(req.body.fecha_inicio).toISOString().slice(0, 19).replace('T', ' ');
    const fechaFin = new Date(req.body.fecha_fin).toISOString().slice(0, 19).replace('T', ' ');

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar con la base de datos" + err);
        }
        if (!err) {
            const data = {
                id: req.body.id,
                nombre_periodo: req.body.nombre_periodo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            }
            const query = "INSERT INTO periodo (id, nombre_periodo, fecha_inicio, fecha_fin) VALUES(\'" + data.id + "\', \'" + data.nombre_periodo + "\', \'" + data.fechaInicio + "\', \'" + data.fechaFin + "\')";

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

//Actualizar un periodo por ID
router.put('/periodo/:id', (req, res) => {
    const { id } = req.params;
    const data = {
        nombre_periodo: req.body.nombre_periodo,
        fechaInicio: req.body.fecha_inicio,
        fechaFin: req.body.fecha_fin
    }
    const query = 'UPDATE periodo SET nombre_periodo = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?';

    getConnection(function (err, conn) {
        if (err) {
            console.log('No se puede acceder a la base de datos', err);
        }
        conn.query(query, [
            data.nombre_periodo,
            data.fechaInicio,
            data.fechaFin,
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

//Eliminar un periodo por ID
router.delete('/periodo/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM periodo WHERE id = ?', [id], function (err, rows) {
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