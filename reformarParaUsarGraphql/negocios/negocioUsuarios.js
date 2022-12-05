const {usuariosFactory} = require('../persistencia/dao/factory.js');
const usuarios = new usuariosFactory();

const bCrypt = require("bcrypt");                           //-> encriptado
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

module.exports = {

    async buscarUsuario(objetoUsuario){
        return await usuarios.buscar(objetoUsuario);
    },
    async guardarUsuario(objetoUsuario){
        objetoUsuario.password = createHash(objetoUsuario.password);
        return await usuarios.guardar(objetoUsuario);
    },
    async listarPorId(id){
        return await usuarios.listarPorId(id);
    },
    async listarTodo(){
        return await usuarios.listarTodo();
    },
    async borrarPorId(id){
        return await usuarios.borrarPorId(id);
    },
    async borrarTodo(){
        return await usuarios.borrarTodo();
    },
    async actualizar(obj){
        return await usuarios.actualizar(obj);
    }


}