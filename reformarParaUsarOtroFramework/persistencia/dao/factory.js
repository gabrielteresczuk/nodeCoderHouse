const {argumento} = require('../../config.js');

const MensajesDaoArchivo = require('./mensajes/MensajesDaoArchivo.js');
const MensajesDaoMemoria = require('./mensajes/MensajesDaoMemoria.js');
const MensajesDaoMongo = require('./mensajes/MensajesDaoMongodb.js');

const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js');
const ProductosDaoMongodb = require('./productos/ProductosDaoMongodb.js');

const UsuariosDaoArchivo = require('./usuarios/UsuariosDaoArchivo.js');
const UsuariosDaoMemoria = require('./usuarios/UsuariosDaoMemoria.js');
const UsuariosDaoMongodb = require('./usuarios/UsuariosDaoMongodb.js');

const base = argumento.database;

if(base === 'MONGO'){
    exports.mensajesFactory = MensajesDaoMongo;
    exports.productosFactory = ProductosDaoMongodb;
    exports.usuariosFactory = UsuariosDaoMongodb;
}else if(base === 'ARCHIVO'){
    exports.mensajesFactory = MensajesDaoArchivo;
    exports.productosFactory = ProductosDaoArchivo;
    exports.usuariosFactory = UsuariosDaoArchivo;
}else if(base === 'MEMORIA'){
    exports.mensajesFactory = MensajesDaoMemoria;
    exports.productosFactory = ProductosDaoMemoria;
    exports.usuariosFactory = UsuariosDaoMemoria;
}