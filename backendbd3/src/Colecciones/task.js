const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reclamo = new Schema({
    Nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    dni: String,
    email: String,
    Descripcion: String
})

module.exports = mongoose.model('reclamos', reclamo, "clientes");