const express = require('express');
const session = require('express-session');
const app = express();
const logger = require('./utils/logger/logger.js'); // -> logger
const {argumento} = require('./config.js'); // => configuracion por argumentos

/* ------------- GRAPHQL ------------ */

const {graphqlHTTP} = require('express-graphql');

const rutasProductosGraph = require('./rutas/graphql/rutaProductoGraph.js');
const rutasUsuariosGraph = require('./rutas/graphql/rutaUsuarioGraph.js');
const rutasMensajesGraph = require('./rutas/graphql/rutaMensajeGraph.js');
const rutasExtrasGraph = require('./rutas/graphql/rutaExtraGraph.js');

app.use('/productogql', graphqlHTTP(rutasProductosGraph));
app.use('/usuariogql', graphqlHTTP(rutasUsuariosGraph));
app.use('/mensajegql', graphqlHTTP(rutasMensajesGraph));
app.use('/extragql', graphqlHTTP(rutasExtrasGraph));


/* ------------- CLUSTER ------------ */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/* ---------- HTTP Y SOCKET --------- */

const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* ----------- middelwares ---------- */

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/public/views'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

/* ------------ sessions ------------ */

const sessionConfig = require('./midelwares/session.js');
app.use(session(sessionConfig));

/* ------------ passport ------------ */

const passport = require('./midelwares/passportKoa.js');
app.use(passport.initialize());
app.use(passport.session());

/* ------------- routes ------------- */

const rutaProductos = require('./rutas/express/rutaProducto.js');
const rutaLogin = require('./rutas/express/rutaLogin.js');
const rutaExtras = require('./rutas/express/rutaExtra.js');
const rutaChats = require('./rutas/rutaChat.js');

app.use(rutaProductos);
app.use(rutaLogin);
app.use(rutaExtras);
io.on('connection',(socket)=>rutaChats(socket,io));

/* ------------ listener ------------ */
// IMPORTATE - httpServer
const port = argumento.puerto;

if(cluster.isMaster){

    logger.log('info', `ARGUMENTOS puerto: ${argumento.puerto} - modo: ${argumento.modo} - db: ${argumento.database}`);
    logger.log('info', 'master '+process.pid +' is running');

    if (argumento.modo === 'CLUSTER'){
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit',(worker,code,signal)=>{
            logger.log('info', `worker ${worker.process.pid} died`);
        })
    }else{
        const server = httpServer.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`);});
        server.on('error',(error)=>{logger.log('info', 'hubo un error '+error);});
    }

}else{

    const server = httpServer.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
    server.on('error',(error)=>{logger.log('info', 'hubo un error '+error);});

}

