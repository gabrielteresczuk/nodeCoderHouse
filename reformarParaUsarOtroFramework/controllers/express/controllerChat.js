
const negocioChat = require('../../negocios/negocioChat.js');
// socket.on - escucha 
// io.emit - envia

module.exports = {
    async listarTodo(io){
        let chatNormalizado = await negocioChat.listarTodo();
        io.emit('chats',chatNormalizado);
    },

    async nuevoChat(chat,io){
        let nuevoChat = await negocioChat.guardarChat(chat);
        let chatNormalizado = await negocioChat.listarTodo();
        io.sockets.emit('chats',chatNormalizado);
    }
}