const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

const {argumento,config,mongodbConfig} = require('./config.js'); // => configuracion por argumentos


/* ------------- CLUSTER ------------ */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/* ---------- HTTP Y SOCKET --------- */

const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* -------------- rutas ------------- */

const login = require('./routes/login.js');
const productos = require('./routes/producto.js');
const chats = require('./routes/chat.js');
const extras = require('./routes/extra.js');

/* --------------- use -------------- */

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/public/views'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    //store: MongoStore.create({mongoUrl:'mongodb://localhost:27017/sesiones'}),
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://gabriel:gabriel@cluster0.9qtkfe7.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true}
    }),
    secret:config.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,                  //-> actualiza la session
    cookie: {
        maxAge: 1000 * 60 * 10      //-> ms * seg * min               
    }
}))

/* ------------ passport ------------ */
const passport = require('./routes/passport.js');
app.use(passport.initialize());
app.use(passport.session());


/* ------------- metodos ------------ */
app.use(extras);
app.use(login);
app.use(productos);


io.on('connection',(socket)=>{
    console.log('Se conecto un cliente');
    chats(socket,io);
});



/* ------------ listener ------------ */
// IMPORTATE - httpServer
const port = argumento.puerto;

if(cluster.isMaster){
    console.log(`ARGUMENTOS puerto: ${argumento.puerto} - modo: ${argumento.modo}`);
    console.log('master '+process.pid +' is running');

    if (argumento.modo === 'CLUSTER'){
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit',(worker,code,signal)=>{
            console.log(`worker ${worker.process.pid} died`);
        })
    }else{
        const server = httpServer.listen(port,()=>{console.log(`Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
        server.on('error',(error)=>{console.log('hubo un error '+error)});
    }

}else{

    const server = httpServer.listen(port,()=>{console.log(`Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
    server.on('error',(error)=>{console.log('hubo un error '+error)});

}

