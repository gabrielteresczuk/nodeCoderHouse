const express = require("express");
const { Router } = express;
const router = Router();
const {argumento} = require('../config.js');
const {fork} = require('child_process');

const numCPUs = require('os').cpus().length; // nro de CPUS

/* -------- info con process -------- */

router.get("/info", (req, res) => {

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

    res.render('info',{info});
});

/* --------- random con fork -------- */

router.get("/api/randoms",(req,res)=>{
    let {cant} = req.query;
    const random = fork('./Api/random.js',[cant]);
    random.send('start');
    random.on('message',obj=>{
        res.json(obj);
    })

});

module.exports = router;