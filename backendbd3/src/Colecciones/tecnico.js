const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tecnico = new Schema({
    nombre: String,
    apellido: String,
    dni: String,
    id_atenciones: []
})

module.exports = mongoose.model("tecnico", tecnico, "tecnico");