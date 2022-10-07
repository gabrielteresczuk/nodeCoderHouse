require('dotenv').config()
const parseArgs = require('minimist');

/* ------ variables de entorno ------ */

let config = {
    mongouser : process.env.MONGOUSER,
    mongopass : process.env.MONGOPASS,
    secret : process.env.SECRET
}

/* ----- variables por argumento ---- */

const args = process.argv.slice(2);

const options = { 
    alias: { p:'puerto'},
    default:  {puerto: 8080 }
}

argumento = parseArgs(args,options);

const mongodbConfig = 'mongodb+srv://'+config.mongouser+':'+config.mongopass+'@cluster0.9qtkfe7.mongodb.net/sesiones?retryWrites=true&w=majority';
//const mongodbConfig = 'mongodb://localhost:27017/test';

module.exports = {
    mongodbConfig,
    config,
    argumento
}