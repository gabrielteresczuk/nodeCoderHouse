const ApiProductosMock = require('../persistencia/dao/productos/ProductosDaoMock.js');
const apiProducto = new ApiProductosMock();

const {productos} = require('../persistencia/repository/index.js');

module.exports = {
    async obtenerProductosMock(){
        return await apiProducto.popular(5);
    },
    async guardarProducto(obj){
        return await productos.guardar(obj);
    },
    async listarPorId(id){
        return await productos.listarPorId(id);
    },
    async listarTodo(){
        return await productos.listarTodo();
    },
    async borrarPorId(id){
        return await productos.borrarPorId(id);
    },
    async borrarTodo(){
        return await productos.borrarTodo();
    },
    async actualizar(obj){
        return await productos.actualizar(obj);
    }
}

