const logger = require('../../utils/logger/logger.js'); // -> logger
const controllerChat = require('../../controllers/koa/controllerChat.js');

chats = (socket) =>{

        logger.log('info', `Socket: se conecto un cliente`);

        controllerChat.listarTodo(socket);

        socket.on('nuevoChat', async (msg) => {
                controllerChat.nuevoChat(msg,socket);
        })
        
}

module.exports = chats