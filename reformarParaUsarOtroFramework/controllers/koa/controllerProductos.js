const negociosProductos = require('../../negocios/negocioProductos.js');
const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports ={

    async getProductosTest(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let datos = await negociosProductos.obtenerProductosMock();
        ctx.body = datos;
    },
    async getProductos(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let datos = await negociosProductos.listarTodo();
        ctx.body = datos;
    },
    async getProductosPorId(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let datos = await negociosProductos.listarPorId(ctx.request.params.id);
        console.log(datos);
        ctx.body = datos;
    },
    async postProductos(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let id = await negociosProductos.guardarProducto(ctx.request.body);
        ctx.body = id;
    },

    async putProductos(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let datos = await negociosProductos.actualizar(ctx.request.body);
        ctx.body = datos;
    },
    async deleteProductosPorId(ctx,next){
        console.log(ctx.request.params.id);
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let datos = await negociosProductos.borrarPorId(ctx.request.params.id);
        ctx.body = datos;
    },
    async vistaProductoPorId(ctx,next){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        await ctx.render("update_producto",{id:ctx.request.params.id})
    }


}