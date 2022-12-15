const negociosProductos = require('../../negocios/negocioProductos.js');
const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports = {
    async getProductosTest(){
        logger.log('info', `ROUTE: getProductosTest - METHOD: GET`);
        let datos = await negociosProductos.obtenerProductosMock();
        return datos;
    },
    async getProductos(){
        logger.log('info', `ROUTE: getProductos - METHOD: GET`);
        let datos = await negociosProductos.listarTodo();
        return datos;
    },
    async getProducto({id}){
        logger.log('info', `ROUTE: getProducto - METHOD: GET`);
        let datos = await negociosProductos.listarPorId(id);
        return datos;
    },
    async postProductos({datos}){
        logger.log('info', `ROUTE: postProductos - METHOD: POST`);
        let id = await negociosProductos.guardarProducto(datos);
        return id;
    },
    async putProductos({id,datos}){
        logger.log('info', `ROUTE: putProductos - METHOD: PUT`);
        let res = await negociosProductos.actualizar({id:id,...datos});
        return res
    },
    async deleteProductosPorId({id}){
        logger.log('info', `ROUTE: deleteProductos - METHOD: DELETE`);
        let res = await negociosProductos.borrarPorId(id);
        return res
    }
}