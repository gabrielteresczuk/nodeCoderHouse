const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const mensajes = require('../../model/mensajes.model.js');


class MensajesDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig,mensajes);
  }
}

module.exports = MensajesDaoMongodb;
