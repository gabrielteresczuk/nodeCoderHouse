
const negocioChat = require('../../negocios/negocioChat.js');
// socket.on - escucha 
// io.emit - envia

module.exports = {
    async listarTodo(socket){
        let chatNormalizado = await negocioChat.listarTodo();
        socket.emit('chats',chatNormalizado);
    },

    async nuevoChat(msg,socket){
        let nuevoChat = await negocioChat.guardarChat(msg);
        let chatNormalizado = await negocioChat.listarTodo();
        socket.broadcast.emit('chats',chatNormalizado);
        socket.emit('chats',chatNormalizado);
    }
}