const logger = require('../../utils/logger/logger.js'); // -> logger
const negociosExtra = require('../../negocios/negocioExtra.js');

async function generateRandom () {

    let obj = {}
    let nro = '';
    let cant = 100000000;

    for (let i = 0; i < cant; i++) {

        nro = Math.floor((Math.random() * 1000)+1);
        if(obj[nro]){
            obj[nro] = ++obj[nro]; 
        }else{
            obj[nro] = 1;
        }
        
    }

    return obj;

}

module.exports={

    async getInfo(ctx){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        let info = await negociosExtra.info();
        console.log(info); // para testeo de performance
        await ctx.render('info',{info});
    },

    async getRandom(ctx){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        ctx.request.socket.setTimeout(5 * 60 * 100000); 
        let datos = await generateRandom ();
        ctx.body = datos;
    },

    async error404(ctx){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        await ctx.render('routing-error',{});
    }


}