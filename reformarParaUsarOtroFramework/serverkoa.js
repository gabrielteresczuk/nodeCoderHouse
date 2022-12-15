const Koa = require('koa');
const app = new Koa();
const { koaBody } = require('koa-body');
const logger = require('./utils/logger/logger.js'); // -> logger
const {argumento} = require('./config.js'); // => configuracion por argumentos
const serve = require('koa-static');

/* ------------- CLUSTER ------------ */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/* ---------- HTTP Y SOCKET --------- */

const IO = require('koa-socket-2');
const io = new IO();

/* ----------- midelwares ----------- */

app.use(serve(__dirname + '/public'));
var views = require('koa-views');
const render = views(__dirname + '/public/views', { extension: 'ejs' });
app.use(render);

app.use(koaBody());

/* ------------ sessions ------------ */

const session = require('koa-session')
app.keys = ['secret']
app.use(session({}, app))


/* ------------ passport ------------ */
const passport = require('./midelwares/passportKoa.js')
app.use(passport.initialize())
app.use(passport.session())

/* ------------ rutas KOA ----------- */

let login = require('./rutas/koa/rutaLogin.js');
let productos = require('./rutas/koa/rutaProducto.js');
let extra = require('./rutas/koa/rutaExtra.js');
let chats = require('./rutas/koa/rutaChat.js')

app.use(login.routes());
app.use(productos.routes());
app.use(extra.routes());

io.attach(app);
io.on('connection',async(socket) => {chats(socket);});


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
        const server = app.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`);});
        server.on('error',(error)=>{logger.log('info', 'hubo un error '+error);});
    }

}else{

    const server = app.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
    server.on('error',(error)=>{logger.log('info', 'hubo un error '+error);});

}