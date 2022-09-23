const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

/* ---------- HTTP Y SOCKET --------- */

const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* -------------- rutas ------------- */

const login = require('./routes/login.js');
const productos = require('./routes/producto.js');
const chats = require('./routes/chat.js');

/* --------------- use -------------- */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    //store: MongoStore.create({mongoUrl:'mongodb://localhost/sesiones'}),
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://gabriel:gabriel@cluster0.9qtkfe7.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true}
    }),
    secret:'shh',
    resave: false,
    saveUninitialized: false,
    rolling: true,                  //-> actualiza la session
    cookie: {
        maxAge: 1000 * 60 * 10      //-> ms * seg * min               
    }
}))

/* ------------- metodos ------------ */

app.use(login);
app.use(productos);

io.on('connection',(socket)=>{
    console.log('Se conecto un cliente');
    chats(socket,io);
});

/* ------------ listener ------------ */
// IMPORTATE - httpServer

const port = 8080;
const server = httpServer.listen(port,()=>{console.log('Server escuchando el puerto '+port)});
server.on('error',(error)=>{console.log('hubo un error '+error)});