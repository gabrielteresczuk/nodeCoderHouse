const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js');
const generarProducto = require('./generarProducto.js');

class ApiProductosMock extends ContenedorMemoria {
    constructor(){
        super();
    }


    async popular(cant = 5){
        const nuevos = [];

        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto();
            const guardado = await this.guardar(nuevoProducto);
            nuevos.push(guardado);
        }

        return nuevos;
    }

}

module.exports = ApiProductosMock