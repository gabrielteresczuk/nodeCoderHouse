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
        console.log(objetoUsuario);
        return await usuarios.guardar(objetoUsuario);
    },


}