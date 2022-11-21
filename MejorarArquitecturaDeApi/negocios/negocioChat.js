const normalizar = require('../utils/normalizar.js');
const {mensajes} = require('../persistencia/repository/index.js');

module.exports = {
    async listarTodo(){
        chats = await mensajes.listarTodo();
        let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
        return chatNormalizado;
    },
    async guardarChat(chat){
        let nuevoChat = await mensajes.guardar(chat);
        return nuevoChat;
    }


}