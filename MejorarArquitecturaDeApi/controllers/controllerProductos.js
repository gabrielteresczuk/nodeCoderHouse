const negociosProductos = require('../negocios/negocioProductos.js');
const logger = require('../utils/logger/logger.js'); // -> logger

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
    async postProductos(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        console.log(req.body);
        let id = await negociosProductos.guardarProducto(req.body);
        //res.json({id:id})
        res.redirect('/home');
    }

}