const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class MensajesDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/mensajes.txt");
    console.log('Archivo Mensajes.txt: conectada');
  }
}

module.exports = MensajesDaoArchivo;
