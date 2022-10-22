const express = require("express");
const { Router } = express;
const router = Router();
const {argumento} = require('../config.js');
const {fork} = require('child_process');
const compression = require('compression');

const numCPUs = require('os').cpus().length; // nro de CPUS

const logger = require('../logger/logger.js'); // -> logger

/* -------- info con process -------- */

router.get("/info",compression(), (req, res) => {

    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

    info = {
        args : JSON.stringify(argumento),
        plataform: process.platform,
        version : process.version,
        memory: JSON.stringify(process.memoryUsage()),
        path : process.execPath,
        pid : process.pid,
        dir : process.cwd(),
        cpus : numCPUs
    }

    console.log(info);

    res.render('info',{info});
});

/* --------- random con fork -------- */

router.get("/api/randoms",(req,res)=>{

    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

    let {cant} = req.query;
    const random = fork('./Api/random.js',[cant]);
    random.send('start');
    random.on('message',obj=>{
        res.json(obj);
    })

});

module.exports = router;