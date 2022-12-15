const negociosProductos = require('../../negocios/negocioProductos.js');
const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports ={

    async getProductosTest(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let datos = await negociosProductos.obtenerProductosMock();
        res.json(datos);
    },
    async getProductos(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let datos = await negociosProductos.listarTodo();
        res.json(datos);
    },
    async getProductosPorId(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let datos = await negociosProductos.listarPorId(req.params.id);
        res.json(datos);
    },
    async postProductos(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let id = await negociosProductos.guardarProducto(req.body);
        res.json(id);
        //res.redirect('/home');
    },

    async putProductos(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let datos = await negociosProductos.actualizar(req.body);
        res.json(datos);
    },
    async deleteProductosPorId(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        let datos = await negociosProductos.borrarPorId(req.body.id);
        res.json(datos);
    },
    async vistaProductoPorId(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.render("update_producto",{id:req.params.id})
    }


}