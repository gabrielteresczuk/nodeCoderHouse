const express = require('express');
const app = express();
const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

// clase asincronica con file
const Archivo = require('./Api/Archivo.js');
const DbMensajes = new Archivo('mensajes.txt');

// clase temporal con array
const DatosArray = require('./Api/DatosArray.js');
const DbProductos = new DatosArray();

/* --------------- use -------------- */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

/* ------------- metodos ------------ */
// socket.on - escucha 
// io.emit - envia

io.on('connection',(socket)=>{

    console.log('Se conecto un cliente');

    // emitimos TODOS los productos
    io.emit('productos',DbProductos.listarTodo());

    // emitimos TODOS los chats
    DbMensajes.listarTodo().then(chats =>{
        io.emit('chats',chats);
    })

    // guardamos un producto NUEVO y emitimos a TODOS
    socket.on('nuevoProducto',producto =>{
        console.log('se agrego un nuevo producto');
        DbProductos.guardar(producto);
        io.sockets.emit('productos', DbProductos.listarTodo());
    });

    // guardamos un chat NUEVO y emitimos a TODOS
    socket.on('nuevoChat',chat=>{
        DbMensajes.guardar(chat).then(res =>{
            DbMensajes.listarTodo().then(chats =>{
                io.sockets.emit('chats',chats);
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