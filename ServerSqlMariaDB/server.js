const express = require('express');
const app = express();

/* ---------- HTTP Y SOCKET --------- */
const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* ------------ CONEXION ------------ */
const {optionsSqlite} = require('./options/sqlite3.js');
const {optionsMariaDB} = require('./options/mariaDB.js');
const knexSqlite = require('knex')(optionsSqlite);
const knexMaria = require('knex')(optionsMariaDB);


/* ------------- CLASES ------------- */
const Archivo = require('./Api/Archivo.js');
const Maria = require('./Api/Maria.js');

const DbMensajes = new Archivo(knexSqlite,'mensajes');
DbMensajes.crearTabla();
DbMensajes.borrarTodo();

const DbProductos = new Maria(knexMaria,'productos');
DbProductos.crearTabla();
DbProductos.borrarTodo();

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
    DbProductos.listarTodo().then(data=>{
        io.emit('productos',data);
    });

    // emitimos TODOS los chats
    DbMensajes.listarTodo().then(chats =>{
        io.emit('chats',chats);
    })

    // guardamos un producto NUEVO y emitimos a TODOS
    socket.on('nuevoProducto',producto =>{
        console.log('se agrego un nuevo producto');
        DbProductos.guardar(producto).then(()=>{
            DbProductos.listarTodo().then(data=>{
                io.sockets.emit('productos', data);
            });
        });
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