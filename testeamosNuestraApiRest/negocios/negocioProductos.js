const ApiProductosMock = require('../persistencia/dao/productos/ProductosDaoMock.js');
const apiProducto = new ApiProductosMock();

const {productos} = require('../persistencia/repository/index.js');

module.exports = {
    async obtenerProductosMock(){
        return await apiProducto.popular(5);
    },
    async guardarProducto(obj){

        try {
            if(obj.nombre == '') throw new Error
            if(obj.precio == '') throw new Error
            if(obj.foto == '') throw new Error
        } catch (error) {
            return {error:'Campos vacios'};
        }

        let id = await productos.guardar(obj);
        return {id:id}
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

        try {
            if(obj.nombre == '') throw new Error
            if(obj.precio == '') throw new Error
            if(obj.foto == '') throw new Error
        } catch (error) {
            return {error:'Campos vacios'};
        }

        return await productos.actualizar(obj);
    }
}

