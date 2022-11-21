const logger = require('../utils/logger/logger.js'); // -> logger
const controllerChat = require('../controllers/controllerChat.js');

chats = (socket,io) =>{

        logger.log('info', `Socket: se conecto un cliente`);

        controllerChat.listarTodo(io);

        socket.on('nuevoChat',chat=>controllerChat.nuevoChat(chat,io));

}

module.exports = chats