const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const productos = require('../../model/producto.model.js');

class ProductosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, productos);
  }

}

module.exports = ProductosDaoMongodb;