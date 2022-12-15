const negociosExtra = require('../../negocios/negocioExtra.js');
const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports = {
    async getInfo(){
        logger.log('info', `ROUTE: getgetInfo - METHOD: GET`);
        let info = await negociosExtra.info();
        console.log(info);
        return info;
    },
}