const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asesor = new Schema({
    nombre: String,
    apellido: String,
    dni: String
})

module.exports = mongoose.model('asesor', asesor, "asesor");