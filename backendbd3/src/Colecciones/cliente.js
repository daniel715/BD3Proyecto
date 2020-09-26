const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema({
    nombre: String,
    apellido: String,
    tipo: String,
    telefono: String,
    dni: String,
    direccion: String,
    prioridad: String,
    correo: String
}, {
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
})

module.exports = mongoose.model("cliente", cliente, "cliente");