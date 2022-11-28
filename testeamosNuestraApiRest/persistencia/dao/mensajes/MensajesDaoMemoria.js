const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class MensajesDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Menssajes: conectada');
  }
}

module.exports = MensajesDaoMemoria;
