const negociosChat = require('../negocios/negocioChat.js');
const logger = require('../utils/logger/logger.js'); // -> logger

module.exports = {
    async getMensajes(){
        logger.log('info', `ROUTE: getMensajes - METHOD: GET`);
        let datos = await negociosChat.listarTodoGQL();
        console.log(datos);
        return datos;
    },
    async getMensaje({id}){
        logger.log('info', `ROUTE: getMensaje - METHOD: GET`);
        let datos = await negociosChat.listarPorId(id);
        return datos;
    },
    async postMensajes({datos}){
        logger.log('info', `ROUTE: postMensajes - METHOD: POST`);
        let id = await negociosChat.guardarChat(datos);
        return {id:id};
    },
    async putMensajes({id,datos}){
        logger.log('info', `ROUTE: putMensajes - METHOD: PUT`);
        let res = await negociosChat.actualizar({id:id,...datos});
        return res
    },
    async deleteMensajesPorId({id}){
        logger.log('info', `ROUTE: deleteMensajes - METHOD: DELETE`);
        let res = await negociosChat.borrarPorId(id);
        return res
    }
}