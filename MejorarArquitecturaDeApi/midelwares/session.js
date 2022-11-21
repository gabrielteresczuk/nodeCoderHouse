const session = require('express-session');
const {config} = require('../config.js'); // => configuracion por argumentos


const MongoStore = require('connect-mongo');
const sessionConfig={
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
};

module.exports = sessionConfig