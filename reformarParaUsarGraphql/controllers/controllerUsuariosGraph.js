const negociosUsuarios = require('../negocios/negocioUsuarios.js');
const logger = require('../utils/logger/logger.js'); // -> logger

module.exports = {
    async getUsuarios(){
        logger.log('info', `ROUTE: getUsuarios - METHOD: GET`);
        let datos = await negociosUsuarios.listarTodo();
        return datos;
    },
    async getUsuario({id}){
        logger.log('info', `ROUTE: getUsuario - METHOD: GET`);
        let datos = await negociosUsuarios.listarPorId(id);
        return datos;
    },
    async postUsuarios({datos}){
        logger.log('info', `ROUTE: postUsuario - METHOD: POST`);
        let id = await negociosUsuarios.guardarUsuario(datos);
        return {id:id};
    },
    async putUsuarios({id,datos}){
        logger.log('info', `ROUTE: putUsuario - METHOD: PUT`);
        let res = await negociosUsuarios.actualizar({id:id,...datos});
        return res
    },
    async deleteUsuariosPorId({id}){
        logger.log('info', `ROUTE: deleteUsuarios - METHOD: DELETE`);
        let res = await negociosUsuarios.borrarPorId(id);
        return res
    }
}