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

//Obtener estudiante por cedula
router.get('/estudiante/:ci', (req, res)=>{
    getConnection(function (err, conn){
        const {ci} =  req.params;
        if(err){
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM estudiante WHERE cedula = ?', [ci], function(err,rows){
            if(err){
                conn.release();
                return res.sendStatus(400, 'No se puede conectar con la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//Insertar un estudiante
router.post('/estudiante/', (req,res)=>{
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        fechaNacimiento: req.body.fechaNacimiento,
        direccion: req.body.direccion,
        correo: req.body.correo,
        celular: req.body.celular
    }
    const query = "INSERT INTO estudiante (nombre, apellido, cedula, fecha_de_nacimiento, direccion, correo, celular) VALUES(\'"+data.nombre + "\', \'" +data.apellido + "\', \'" +data.cedula+ "\', \'" +data.fechaNacimiento+ "\', \'" +data.direccion+ "\', \'" +data.correo+ "\', \'" +data.celular+"\')";

    getConnection(function (err, conn){
        if(err){
            console.log("No se puede conectar con la base de datos"+ err);
        }
        conn.query(query, function(err, result){
            if(!err){
                res.json({status:'Registro existoso'});
            }else{
                console.log(err);
            }
            conn.release();
        });
    });
});

module.exports = router;