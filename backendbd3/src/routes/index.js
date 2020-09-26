const express = require('express');
const { compile } = require('morgan');
const router = express.Router();
const cliente = require('../Colecciones/cliente');
const atencion = require('../Colecciones/atencion');
const asesor = require('../Colecciones/asesor');
const tecnico = require('../Colecciones/tecnico');


router.post('/ingresarAsesor', (req, res) => {
    if (req.body.nombre != "" && req.body.apellido != "" && req.body.dni != "") {
        console.log(req.body)
        const ase = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni
        }
        const nuevoasesor = new asesor(ase);
        nuevoasesor.save()
            .then(() => { console.log('registrado con exito en coleccion asesor'); })
            .catch((err) => { console.log('error' + err); });
    }

});

router.post('/ingresarTecnico', (req, res) => {
    if (req.body.nombre != "" && req.body.apellido != "" && req.body.dni != "") {
        console.log(req.body)
        const tec = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            id_atenciones: []
        }
        const nuevotecnico = new tecnico(tec);
        nuevotecnico.save()
            .then(() => { console.log('registrado con exito en coleccion tecnico'); })
            .catch((err) => { console.log('error' + err); });
    }

});

router.post('/eliminarEmpleados', (req, res) => {
    console.log(req.body.ide);
    asesor.remove({ _id: req.body.ide }).
    then(() => { console.log("eliminado satisfactoriamente en coleccion asesor") })


    tecnico.remove({ _id: req.body.ide }).
    then(() => { console.log("eliminado satisfactoriamente de coleccion tecnico") })

});


router.post('/actualizarEmpleados', (req, res) => {

    asesor.updateOne({ _id: req.body.ide }, { $set: { nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni } })
        .then(() => { console.log('actualizado con exito en coleccion asesor') })
        .catch((err) => { console.log('error' + err); });

    tecnico.updateOne({ _id: req.body.ide }, { $set: { nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni } })
        .then(() => { console.log('actualizado con exito en coleccion tecnico') })
        .catch((err) => { console.log('error' + err); });


})



router.post('/actualizar', (req, res) => {


    cliente.update({ dni: req.body.dni }, { $set: { prioridad: req.body.prioridad } })
        .then(() => { console.log('actualizado con exito en coleccion clientes') })
        .catch((err) => { console.log('error' + err); });

    atencion.update({ _id: req.body.idAtencion }, {
            $set: {
                estado: req.body.estado,
                estado_urgencia: req.body.estadoUrgencia,
                id_asesor: req.body.id_asesor,
                id_tecnico: req.body.id_tecnico,
            }
        })
        .then(() => { console.log('actualizado con exito en coleccion atencion'); })
        .catch((err) => { console.log('error' + err); });



    tecnico.update({ _id: req.body.id_tecnico }, { $push: { id_atenciones: req.body.idAtencion } })
        .then(() => { console.log('actualizado con exito en coleccion tecnico'); })
        .catch((err) => { console.log('error' + err); });

});



router.get('/tecnicos', (req, res) => {
    tecnico.find()
        .then((data) => {
            res.send(data);
            console.log("tecnicos enviados correctamente")
        }).catch((e) => { console.log('Error al obtener tecnicos ' + e) });
});


router.get('/asesores', (req, res) => {
    asesor.find()
        .then((data) => {
            res.send(data);
            console.log(data);
            console.log("asesores enviados correctamente");
        }).catch((e) => { console.log("Error al obtener asesores " + e) });
});



router.get('/', (req, res) => {
    atencion.find()
        .then((data) => {
            console.log('atenciones enviados correctamente');
            res.send(data);
        }).catch((err) => { console.log('error al enviar atenciones' + err); });

});


router.post('/',
    (req, res) => {

        let tipoAtencion = req.body.atencion;
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let tipoPersona = req.body.tipo;
        let telefono = req.body.telefono;
        let dni = req.body.dni;
        let direccion = req.body.direccion;
        let fecha = req.body.fecha;
        let correo = req.body.correo;
        let descripcion = req.body.descripcion;

        const aten = {
            descripcion,
            fecha,
            estado: 'no asignado',
            estado_urgencia: 'no asignado',
            tipoAtencion,
            id_asesor: 'no asignado',
            id_cliente: dni,
            id_tecnico: 'no asignado'
        }
        const cli = {
            nombre,
            apellido,
            tipoPersona,
            telefono,
            dni,
            direccion,
            prioridad: '',
            correo
        }

        const coleccioncli = new cliente(cli);
        const coleccionatencion = new atencion(aten);

        coleccioncli.save()
            .then(() => { console.log('registrado con exito en coleccion clientes'); })
            .catch((err) => { console.log('error' + err); });

        coleccionatencion.save()
            .then(() => { console.log('registrado con exito en coleccion atenciones') })
            .catch((err) => { console.log('error' + err); });

        let pagina = `<!doctype html>
        <html>
            <head>
            </head>
            <body>
                <h1> Gracias por su feedback</h1>
                <a href="javascript: history.go(-2)">Volver</a> 
            </body>
         `;

        res.send(pagina);
    })


module.exports = router;