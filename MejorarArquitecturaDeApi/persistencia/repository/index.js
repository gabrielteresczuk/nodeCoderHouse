const {productosFactory, mensajesFactory} = require('../dao/factory.js');
const ProductoRepository = require('./producto.repository.js');
const MensajesRepository = require('./mensaje.repository.js');

const productos = new ProductoRepository(new productosFactory() );
const mensajes = new MensajesRepository(new mensajesFactory());

module.exports = {productos,mensajes};
//module.exports = mensajes;