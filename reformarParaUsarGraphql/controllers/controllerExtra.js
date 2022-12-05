const {fork} = require('child_process');
const logger = require('../utils/logger/logger.js'); // -> logger
const negociosExtra = require('../negocios/negocioExtra.js')

module.exports={

    async getInfo(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        
        let info = await negociosExtra.info();
        console.log(info); // para testeo de performance
        res.render('info',{info});
    },

    async getRandom(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

        let {cant} = req.query;
        const random = fork('./utils/random.js',[cant]);
        random.send('start');
        random.on('message',obj=>{
            res.json(obj);
        });
    },

    async error404(req,res){
        logger.log('warn', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.status(404).render('routing-error',{});
    }


}