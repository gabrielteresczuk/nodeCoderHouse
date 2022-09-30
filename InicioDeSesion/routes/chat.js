const MensajesDaoMongodb = require('../dao/MensajesDaoMongodb.js');
const DbMensajes = new MensajesDaoMongodb();
const normalizar = require('../Api/normalizar.js');

// socket.on - escucha 
// io.emit - envia

chats = (socket,io) =>{

        // emitimos TODOS los chats
        DbMensajes.listarTodo().then(chats =>{
            let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
            io.emit('chats',chatNormalizado);
        })
    
        // guardamos un chat NUEVO y emitimos a TODOS
        socket.on('nuevoChat',chat=>{
            DbMensajes.guardar(chat).then(res =>{
                DbMensajes.listarTodo().then(chats =>{
                    let chatNormalizado = normalizar({id:'mensajes',mensajes:chats});
                    io.sockets.emit('chats',chatNormalizado);
                })
            }
            );
            
        })
}

module.exports = chats