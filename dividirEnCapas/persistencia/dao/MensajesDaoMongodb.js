const ContenedorMongodb = require("../contenedores/ContenedorMongodb.js");
const mongoose = require("mongoose");
const {mongodbConfig} = require('../../config.js');

const mensajesCollection = "mensajes";

const MensajesSchema = new mongoose.Schema({
  author: {  
    id: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    alias: { type: String, require: true },
    avatar: { type: String, require: true },
  },
  date: { type: String, require: true },
  text: { type: String, require: true },
});

const mensajes = mongoose.model(mensajesCollection, MensajesSchema);

class MensajesDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig,mensajes);
  }
}

module.exports = MensajesDaoMongodb;
