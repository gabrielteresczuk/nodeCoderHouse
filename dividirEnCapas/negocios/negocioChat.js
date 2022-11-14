const MensajesDaoMongodb = require('../persistencia/dao/MensajesDaoMongodb.js');
const DbMensajes = new MensajesDaoMongodb();
const normalizar = require('../utils/normalizar.js');

module.exports = {
    async listarTodo(){
        chats = await DbMensajes.listarTodo();
        let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
        return chatNormalizado;
    },
    async guardarChat(chat){
        let nuevoChat = await DbMensajes.guardar(chat);
        return nuevoChat;
    }


}