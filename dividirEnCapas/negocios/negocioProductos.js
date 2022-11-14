const ApiProductosMock = require('../persistencia/dao/ProcuctosDaoMock.js');
const apiProducto = new ApiProductosMock();

module.exports = {
    async obtenerProductos(){
        return await apiProducto.popular(5);
    }
}