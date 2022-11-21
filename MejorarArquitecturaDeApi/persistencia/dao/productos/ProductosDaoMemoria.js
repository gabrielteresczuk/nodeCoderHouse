const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Productos: conectada');
  }
}

module.exports = ProductosDaoMemoria;
