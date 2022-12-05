const normalizar = require('../utils/normalizar.js');
const {mensajes} = require('../persistencia/repository/index.js');

module.exports = {
    async listarTodo(){
        chats = await mensajes.listarTodo();
        let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
        return chatNormalizado;
    },
    async listarTodoGQL(){
        chats = await mensajes.listarTodo();
        //let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
        return chats;
    },
    async guardarChat(chat){
        let nuevoChat = await mensajes.guardar(chat);
        return nuevoChat;
    },
    async listarPorId(id){
        return await mensajes.listarPorId(id);
    },
    async borrarPorId(id){
        return await mensajes.borrarPorId(id);
    },
    async borrarTodo(){
        return await mensajes.borrarTodo();
    },
    async actualizar(obj){
        return await mensajes.actualizar(obj);
    }


}