const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atencion = new Schema({
    descripcion: String,
    fecha: String,
    estado: String,
    estado_urgencia: String,
    tipoAtencion: String,
    id_asesor: String,
    id_cliente: String,
    id_tecnico: String
})

module.exports = mongoose.model("atencion", atencion, "atencion");