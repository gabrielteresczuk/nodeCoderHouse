const express = require('express');
const app = express();

/* ---------- HTTP Y SOCKET --------- */
const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* ------------- CLASES ------------- */
const MensajesDaoMongodb = require('./dao/MensajesDaoMongodb.js');
const DbMensajes = new MensajesDaoMongodb();

const ApiProductosMock = require('./Api/ApiProductosMock.js');
const apiProducto = new ApiProductosMock();

/* --------------- API -------------- */

const normalizar = require('./Api/normalizar.js');

/* --------------- use -------------- */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

/* ------------- metodos ------------ */
// socket.on - escucha 
// io.emit - envia

app.get('/api/productos-test',async(req,res)=>{

    res.json(await apiProducto.popular(5));
});

io.on('connection',(socket)=>{

    console.log('Se conecto un cliente');

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
});

/* ------------ listener ------------ */
// IMPORTATE - httpServer

const port = 8080;
const server = httpServer.listen(port,()=>{console.log('Server escuchando el puerto '+port)});
server.on('error',(error)=>{console.log('hubo un error '+error)});