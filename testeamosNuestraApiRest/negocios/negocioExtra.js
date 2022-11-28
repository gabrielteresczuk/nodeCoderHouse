const {argumento} = require('../config.js');
const numCPUs = require('os').cpus().length; // nro de CPUS

module.exports={

    async info(){
        return {
            args : JSON.stringify(argumento),
            plataform: process.platform,
            version : process.version,
            memory: JSON.stringify(process.memoryUsage()),
            path : process.execPath,
            pid : process.pid,
            dir : process.cwd(),
            cpus : numCPUs
        }
    }

}