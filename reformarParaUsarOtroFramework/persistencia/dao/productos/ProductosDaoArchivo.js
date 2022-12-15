const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/productos.txt");
    console.log('Archivo Productos.txt: conectada');
  }
}

module.exports = ProductosDaoArchivo;